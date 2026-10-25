import { Campaign, CartItem, UserPersona } from '../types';

export interface CampaignEvaluationResult {
  campaign: Campaign;
  isEligible: boolean;
  ineligibleReason?: string;
  eligibleSubtotal: number;
  calculatedDiscount: number;
}

export interface BestCampaignComboResult {
  appliedCampaigns: Campaign[];
  totalDiscount: number;
  shoppingVoucherEarned?: number;
  detailedEvaluations: CampaignEvaluationResult[];
}

export class CampaignEngine {
  /**
   * Đánh giá xem một chiến dịch cụ thể có áp dụng được cho giỏ hàng và khách hàng hay không
   */
  static evaluateCampaign(
    campaign: Campaign,
    cartItems: CartItem[],
    user: UserPersona,
    paymentMethod?: string
  ): CampaignEvaluationResult {
    if (!campaign.isActive) {
      return {
        campaign,
        isEligible: false,
        ineligibleReason: 'Chương trình ưu đãi hiện đã tạm dừng hoặc hết ngân sách.',
        eligibleSubtotal: 0,
        calculatedDiscount: 0
      };
    }

    if (campaign.totalBudgetRemaining <= 0) {
      return {
        campaign,
        isEligible: false,
        ineligibleReason: 'Ngân sách của chương trình đã được dùng hết.',
        eligibleSubtotal: 0,
        calculatedDiscount: 0
      };
    }

    // Kiểm tra điều kiện khách mới (VIPFIRST)
    if (campaign.requiresFirstOrder && user.completedBookingsCount > 0) {
      return {
        campaign,
        isEligible: false,
        ineligibleReason: 'Chỉ áp dụng cho khách hàng chưa có đơn hàng nào trên hệ thống (chuyến đi đầu tiên).',
        eligibleSubtotal: 0,
        calculatedDiscount: 0
      };
    }

    // Kiểm tra điều kiện hạng thành viên (Gold / Diamond)
    if (campaign.memberTierRequired) {
      const tiers = ['Silver', 'Gold', 'Diamond'];
      const userTierRank = tiers.indexOf(user.memberTier);
      const reqTierRank = tiers.indexOf(campaign.memberTierRequired);
      if (userTierRank < reqTierRank) {
        return {
          campaign,
          isEligible: false,
          ineligibleReason: `Đặc quyền chỉ dành cho hội viên hạng ${campaign.memberTierRequired} trở lên (Hạng hiện tại: ${user.memberTier}).`,
          eligibleSubtotal: 0,
          calculatedDiscount: 0
        };
      }
    }

    // Kiểm tra điều kiện thanh toán (PAYLATER50)
    if (campaign.id === 'camp_payment_paylater' && paymentMethod && paymentMethod !== 'mwg_paylater') {
      return {
        campaign,
        isEligible: false,
        ineligibleReason: 'Chỉ áp dụng khi chọn phương thức thanh toán MWG PayLater 0%.',
        eligibleSubtotal: 0,
        calculatedDiscount: 0
      };
    }

    // Tính phần giá trị đủ điều kiện theo ngành hàng và đối tác
    let eligibleSubtotal = 0;
    for (const item of cartItems) {
      let isCategoryMatch = !campaign.eligibleCategories || campaign.eligibleCategories.includes(item.category);
      let isPartnerMatch = !campaign.eligiblePartnerNames || campaign.eligiblePartnerNames.includes(item.partnerName);

      if (isCategoryMatch && isPartnerMatch) {
        eligibleSubtotal += item.totalPrice;
      }
    }

    // Kiểm tra giá trị tối thiểu
    if (eligibleSubtotal < campaign.minOrderValue) {
      const diff = campaign.minOrderValue - eligibleSubtotal;
      return {
        campaign,
        isEligible: false,
        ineligibleReason: `Phần dịch vụ hợp lệ đạt ${eligibleSubtotal.toLocaleString('vi-VN')}đ, còn thiếu ${diff.toLocaleString('vi-VN')}đ để đạt mốc tối thiểu ${campaign.minOrderValue.toLocaleString('vi-VN')}đ.`,
        eligibleSubtotal,
        calculatedDiscount: 0
      };
    }

    // Tính mức giảm
    let calculatedDiscount = 0;
    if (campaign.discountType === 'percentage') {
      const rawDiscount = Math.round((eligibleSubtotal * campaign.discountValue) / 100);
      calculatedDiscount = campaign.maxDiscount ? Math.min(rawDiscount, campaign.maxDiscount) : rawDiscount;
    } else if (campaign.discountType === 'fixed_amount') {
      calculatedDiscount = campaign.discountValue;
    }

    return {
      campaign,
      isEligible: true,
      eligibleSubtotal,
      calculatedDiscount
    };
  }

  /**
   * Thuật toán tự động tìm tổ hợp ưu đãi tốt nhất (Tối ưu hóa tổng tiền giảm và quyền lợi quà tặng)
   */
  static findBestCampaignCombination(
    campaigns: Campaign[],
    cartItems: CartItem[],
    user: UserPersona,
    paymentMethod?: string
  ): BestCampaignComboResult {
    const evaluations = campaigns.map(c => this.evaluateCampaign(c, cartItems, user, paymentMethod));
    const eligibleEvaluations = evaluations.filter(e => e.isEligible && (e.calculatedDiscount > 0 || (e.campaign.rewardShoppingVoucher && e.campaign.rewardShoppingVoucher > 0)));

    if (eligibleEvaluations.length === 0) {
      return {
        appliedCampaigns: [],
        totalDiscount: 0,
        shoppingVoucherEarned: 0,
        detailedEvaluations: evaluations
      };
    }

    // Thử các phương án đơn lẻ (single) và phương án cộng dồn (stackable)
    let bestDiscount = 0;
    let bestCombo: Campaign[] = [];
    let bestShoppingVoucher = 0;

    // 1. Xét các mã không thể cộng dồn (exclusive)
    for (const ev of eligibleEvaluations) {
      if (!ev.campaign.canStackWithOthers) {
        if (ev.calculatedDiscount > bestDiscount) {
          bestDiscount = ev.calculatedDiscount;
          bestCombo = [ev.campaign];
          bestShoppingVoucher = ev.campaign.rewardShoppingVoucher || 0;
        }
      }
    }

    // 2. Xét nhóm các mã CÓ THỂ cộng dồn (stackable)
    const stackableEvaluations = eligibleEvaluations.filter(e => e.campaign.canStackWithOthers);
    if (stackableEvaluations.length > 0) {
      let stackTotal = 0;
      let stackVoucher = 0;
      const stackList: Campaign[] = [];

      for (const ev of stackableEvaluations) {
        stackTotal += ev.calculatedDiscount;
        if (ev.campaign.rewardShoppingVoucher) {
          stackVoucher += ev.campaign.rewardShoppingVoucher;
        }
        stackList.push(ev.campaign);
      }

      if (stackTotal > bestDiscount) {
        bestDiscount = stackTotal;
        bestCombo = stackList;
        bestShoppingVoucher = stackVoucher;
      }
    }

    return {
      appliedCampaigns: bestCombo,
      totalDiscount: bestDiscount,
      shoppingVoucherEarned: bestShoppingVoucher,
      detailedEvaluations: evaluations
    };
  }
}
