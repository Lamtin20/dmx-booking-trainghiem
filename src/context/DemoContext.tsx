import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserPersona, 
  Campaign, 
  CartItem, 
  Order, 
  SubOrder,
  ItineraryOption, 
  ParsedUserInput,
  SupportTicket 
} from '../types';
import { USER_PERSONAS } from '../data/personas';
import { INITIAL_CAMPAIGNS } from '../data/campaigns';
import { INITIAL_ORDERS } from '../data/initialOrders';
import { CampaignEngine } from '../services/campaignEngine';
import { TEST_SCENARIOS, TestScenario } from '../data/scenarios';

export interface ChaosSettings {
  paymentOutcome: 'success' | 'failed' | 'processing' | 'partial_failure';
  networkDelayMs: number;
  simulateOutOfStock: boolean;
  simulatePriceSurge: boolean;
  isOffline: boolean;
  autoPassDemo: boolean;
}

export interface DemoContextType {
  // Navigation
  activeTab: 'explore' | 'planner' | 'trips' | 'support';
  setActiveTab: (tab: 'explore' | 'planner' | 'trips' | 'support') => void;
  activeServiceCategory: 'stay' | 'flight' | 'bus_train' | 'activity' | 'event' | null;
  setActiveServiceCategory: (cat: 'stay' | 'flight' | 'bus_train' | 'activity' | 'event' | null) => void;
  isInsideMiniApp: boolean;
  setIsInsideMiniApp: (val: boolean) => void;
  showControlCenter: boolean;
  setShowControlCenter: (val: boolean) => void;

  // Persona & User Profile Settings
  activePersona: UserPersona;
  setActivePersonaId: (id: string) => void;
  updateUserProfile: (name: string, honorific: 'Anh' | 'Chị' | 'Bạn') => void;

  // View Mode Settings
  viewMode: 'auto' | 'mobile_frame' | 'desktop_wide' | 'split_view';
  setViewMode: (mode: 'auto' | 'mobile_frame' | 'desktop_wide' | 'split_view') => void;

  // System & Time
  demoDate: string;
  setDemoDate: (d: string) => void;

  // Campaigns
  campaigns: Campaign[];
  toggleCampaignActive: (id: string) => void;
  updateCampaignBudget: (id: string, budget: number) => void;

  // Cart & Planning
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  draftPlan: {
    parsed: ParsedUserInput;
    selectedOption: ItineraryOption;
  } | null;
  setDraftPlan: (plan: { parsed: ParsedUserInput; selectedOption: ItineraryOption } | null) => void;

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (id: string) => void;

  // Orders & Tickets
  orders: Order[];
  createOrderFromCart: (
    paymentMethod: 'mwg_paylater' | 'momo' | 'vnpay' | 'vietqr' | 'visa_master',
    redeemPoints: number,
    paylaterTenure?: 3 | 6 | 9 | 12
  ) => Promise<{ success: boolean; order?: Order; error?: string }>;
  cancelOrder: (orderId: string, reason: string) => Promise<{ success: boolean; refundAmount: number }>;
  supportTickets: SupportTicket[];
  createSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'status'>) => void;

  // Chaos & Testing
  chaos: ChaosSettings;
  setChaos: React.Dispatch<React.SetStateAction<ChaosSettings>>;
  runScenario: (scenario: TestScenario) => void;
  activeScenarioId: number | null;
  resetDemoData: () => void;

  // Toast / Feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [isInsideMiniApp, setIsInsideMiniApp] = useState<boolean>(() => {
    return localStorage.getItem('dmx_is_inside_mini_app') === 'true';
  });
  const [activeTab, setActiveTab] = useState<'explore' | 'planner' | 'trips' | 'support'>('explore');
  const [activeServiceCategory, setActiveServiceCategory] = useState<'stay' | 'flight' | 'bus_train' | 'activity' | 'event' | null>(null);
  const [showControlCenter, setShowControlCenter] = useState<boolean>(false);

  // Persona (Mặc định lấy Lâm Tín từ ảnh thực tế của người dùng)
  const [personas, setPersonas] = useState<UserPersona[]>(USER_PERSONAS);
  const [personaId, setPersonaId] = useState<string>('user_lam_tin');
  const activePersona = personas.find(p => p.id === personaId) || personas[0];

  const updateUserProfile = (name: string, honorific: 'Anh' | 'Chị' | 'Bạn') => {
    const parts = name.trim().split(' ');
    const shortName = parts.length > 0 ? parts[parts.length - 1] : name;
    setPersonas(prev => prev.map(p => {
      if (p.id === activePersona.id) {
        return {
          ...p,
          name,
          shortName,
          honorific
        };
      }
      return p;
    }));
    showToast(`Đã cập nhật tên: "${name}" (${honorific} ${shortName})`);
  };

  // View Mode: 'auto' (tự động nhận diện thiết bị), 'mobile_frame', 'desktop_wide', 'split_view'
  const [viewMode, setViewMode] = useState<'auto' | 'mobile_frame' | 'desktop_wide' | 'split_view'>('auto');

  // System Date
  const [demoDate, setDemoDate] = useState<string>('2026-10-26');

  // Campaigns
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem('dmx_demo_campaigns');
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  // Cart
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('dmx_demo_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Draft Plan
  const [draftPlan, setDraftPlan] = useState<{ parsed: ParsedUserInput; selectedOption: ItineraryOption } | null>(() => {
    const saved = localStorage.getItem('dmx_demo_draft_plan');
    return saved ? JSON.parse(saved) : null;
  });

  // Wishlist
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('dmx_demo_wishlist');
    return saved ? JSON.parse(saved) : ['stay_dalat_colline', 'act_bana_hills'];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('dmx_demo_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Support Tickets
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([
    {
      id: 'tkt_01',
      orderNumber: 'DMX-20261025-4512',
      serviceName: 'Vé cáp treo Bà Nà Hills',
      issueCategory: 'doi_ngay',
      description: 'Tôi muốn đổi ngày vé sang chủ nhật do bé bị cảm nhẹ.',
      createdAt: '2026-10-25 14:00',
      status: 'dang_xu_ly',
      aiResolutionNote: 'Chính sách Klook: Được phép đổi ngày miễn phí trước 24 giờ kể từ ngày đặt (20/11). Yêu cầu hợp lệ.',
      agentResponse: 'Nhân viên hỗ trợ DMX đã ghi nhận và liên hệ đối tác Klook hỗ trợ cấp lại mã QR mới.',
      estimatedResponseTime: 'Trong vòng 15 phút'
    }
  ]);

  // Chaos settings
  const [chaos, setChaos] = useState<ChaosSettings>({
    paymentOutcome: 'success',
    networkDelayMs: 600,
    simulateOutOfStock: false,
    simulatePriceSurge: false,
    isOffline: false,
    autoPassDemo: true
  });

  // Test Scenarios
  const [activeScenarioId, setActiveScenarioId] = useState<number | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3500);
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('dmx_is_inside_mini_app', String(isInsideMiniApp));
  }, [isInsideMiniApp]);

  useEffect(() => {
    localStorage.setItem('dmx_demo_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('dmx_demo_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('dmx_demo_draft_plan', JSON.stringify(draftPlan));
  }, [draftPlan]);

  useEffect(() => {
    localStorage.setItem('dmx_demo_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('dmx_demo_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
    showToast(`Đã thêm "${item.title}" vào giỏ dịch vụ.`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(i => i.cartItemId !== cartItemId));
    showToast('Đã xóa dịch vụ khỏi giỏ.');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (id: string) => {
    setWishlistIds(prev => {
      if (prev.includes(id)) {
        showToast('Đã bỏ lưu khỏi mục Yêu thích.');
        return prev.filter(x => x !== id);
      } else {
        showToast('Đã lưu vào danh sách Yêu thích.');
        return [...prev, id];
      }
    });
  };

  const toggleCampaignActive = (id: string) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const updateCampaignBudget = (id: string, budget: number) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, totalBudgetRemaining: budget } : c));
  };

  // Order Placement & Payment Flow with Chaos simulation
  const createOrderFromCart = async (
    paymentMethod: 'mwg_paylater' | 'momo' | 'vnpay' | 'vietqr' | 'visa_master',
    redeemPoints: number,
    paylaterTenure?: 3 | 6 | 9 | 12
  ): Promise<{ success: boolean; order?: Order; error?: string }> => {
    // 1. Kiểm tra mô phỏng rớt mạng
    if (chaos.isOffline) {
      return { success: false, error: 'Mất kết nối mạng mô phỏng. Vui lòng kiểm tra lại đường truyền.' };
    }

    // 2. Chờ độ trễ mạng giả lập
    if (chaos.networkDelayMs > 0) {
      await new Promise(r => setTimeout(r, chaos.networkDelayMs));
    }

    // 3. Kiểm tra mô phỏng hết phòng / hết chỗ
    if (chaos.simulateOutOfStock) {
      return { success: false, error: 'Rất tiếc! Phòng hoặc ghế bạn chọn vừa có khách khác đặt trước từ đối tác. Vui lòng chọn hạng dịch vụ khác.' };
    }

    // 4. Kiểm tra mô phỏng tăng giá đột xuất
    if (chaos.simulatePriceSurge) {
      return { success: false, error: 'Đối tác vừa cập nhật giá vé mới (+15%). Vui lòng tải lại giỏ hàng để cập nhật bảng giá chính xác nhất.' };
    }

    // 5. Kiểm tra mô phỏng lỗi thanh toán
    if (chaos.paymentOutcome === 'failed') {
      return { success: false, error: 'Thanh toán giả lập không thành công: Thẻ/Tài khoản không đủ hạn mức hoặc bị từ chối bởi cổng đối tác.' };
    }

    // 6. Tính toán đơn hàng
    const totalOriginalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    // Tính ưu đãi tối ưu từ CampaignEngine
    const bestPromo = CampaignEngine.findBestCampaignCombination(campaigns, cartItems, activePersona, paymentMethod);
    const campaignDiscountTotal = bestPromo.totalDiscount;

    // Trừ điểm thưởng Quà Tặng VIP (tối đa 10% tổng đơn sau giảm giá)
    const afterPromo = Math.max(0, totalOriginalAmount - campaignDiscountTotal);
    const maxPointsUsable = Math.min(activePersona.pointBalance, Math.round(afterPromo * 0.1));
    const pointsActuallyUsed = Math.min(redeemPoints, maxPointsUsable);

    const finalPaidAmount = Math.max(0, afterPromo - pointsActuallyUsed);

    // Tách đơn con theo từng đối tác
    const partnerGroups: Record<string, CartItem[]> = {};
    for (const item of cartItems) {
      if (!partnerGroups[item.partnerName]) {
        partnerGroups[item.partnerName] = [];
      }
      partnerGroups[item.partnerName].push(item);
    }

    const subOrders: SubOrder[] = Object.entries(partnerGroups).map(([partner, items], idx) => {
      const subTotal = items.reduce((s, i) => s + i.totalPrice, 0);
      const isPartialFail = chaos.paymentOutcome === 'partial_failure' && idx === 1; // Partner thứ 2 bị lỗi nếu chọn partial

      return {
        subOrderId: `sub_ord_${Date.now()}_${idx}`,
        partnerName: partner,
        category: items[0].category,
        items,
        subTotal,
        discountAmount: Math.round((subTotal / totalOriginalAmount) * campaignDiscountTotal),
        totalPayable: subTotal,
        status: isPartialFail ? 'failed' : 'confirmed',
        partnerConfirmationCode: isPartialFail ? 'FAILED_API' : `${partner.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-5)}`,
        demoTicket: isPartialFail ? undefined : {
          ticketCode: `TICKET-${Date.now().toString().slice(-6)}`,
          qrData: `DEMO_QR_${partner}_${items[0].title}_${Date.now()}`,
          instructions: `Xuất trình mã QR demo này tại điểm cung cấp dịch vụ ${partner}.`,
          passengerNames: [activePersona.name]
        }
      };
    });

    const isPartial = subOrders.some(s => s.status === 'failed') && subOrders.some(s => s.status === 'confirmed');

    const newOrder: Order = {
      orderId: `ord_${Date.now()}`,
      orderNumber: `DMX-${demoDate.replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: `${demoDate} 08:30`,
      updatedAt: `${demoDate} 08:32`,
      userId: activePersona.id,
      userName: activePersona.name,
      userPhone: activePersona.phone,
      subOrders,
      totalOriginalAmount,
      appliedCampaignIds: bestPromo.appliedCampaigns.map(c => c.id),
      campaignDiscountTotal,
      pointsRedeemed: pointsActuallyUsed,
      finalPaidAmount,
      paymentMethod,
      paylaterTenure: paymentMethod === 'mwg_paylater' ? (paylaterTenure || 6) : undefined,
      paylaterMonthlyPayment: paymentMethod === 'mwg_paylater' ? Math.round(finalPaidAmount / (paylaterTenure || 6)) : undefined,
      paymentStatus: chaos.paymentOutcome === 'processing' ? 'processing' : (isPartial ? 'paid' : 'paid'),
      overallStatus: chaos.paymentOutcome === 'processing' 
        ? 'paid_processing_partners' 
        : (isPartial ? 'partially_confirmed' : 'confirmed'),
      rewardVoucherEarned: bestPromo.shoppingVoucherEarned ? {
        code: `DMX-GIFT-100K-${Date.now().toString().slice(-4)}`,
        amount: bestPromo.shoppingVoucherEarned,
        expiryDate: '2026-12-31',
        status: 'pending_issue'
      } : undefined
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    return { success: true, order: newOrder };
  };

  const cancelOrder = async (orderId: string, reason: string): Promise<{ success: boolean; refundAmount: number }> => {
    const target = orders.find(o => o.orderId === orderId);
    if (!target) return { success: false, refundAmount: 0 };

    // Mô phỏng tính phí hoàn hủy (nếu trước 3 ngày: hoàn 100%, hủy sát giờ: phạt 10% - 20%)
    const refundAmount = Math.round(target.finalPaidAmount * 0.9); // Phí 10% minh họa

    setOrders(prev => prev.map(o => {
      if (o.orderId === orderId) {
        return {
          ...o,
          overallStatus: 'refunded',
          paymentStatus: 'refunded',
          updatedAt: `${demoDate} 15:45`
        };
      }
      return o;
    }));

    showToast(`Đã gửi yêu cầu hủy đơn thành công. Số tiền hoàn dự kiến: ${refundAmount.toLocaleString('vi-VN')}đ.`);
    return { success: true, refundAmount };
  };

  const createSupportTicket = (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'status'>) => {
    const newTkt: SupportTicket = {
      ...ticket,
      id: `tkt_${Date.now()}`,
      createdAt: `${demoDate} 10:15`,
      status: 'dang_tiep_nhan',
      estimatedResponseTime: 'Trong vòng 10 phút'
    };
    setSupportTickets(prev => [newTkt, ...prev]);
    showToast('Yêu cầu hỗ trợ đã được gửi. Đội ngũ CSKH Điện Máy Xanh sẽ phản hồi trong 10 phút.');
  };

  const runScenario = (scenario: TestScenario) => {
    setActiveScenarioId(scenario.id);
    if (scenario.presetPersonaId) {
      setPersonaId(scenario.presetPersonaId);
    }
    showToast(`Đang nạp kịch bản #${scenario.id}: "${scenario.title}"`);
  };

  const resetDemoData = () => {
    localStorage.removeItem('dmx_demo_campaigns');
    localStorage.removeItem('dmx_demo_cart');
    localStorage.removeItem('dmx_demo_draft_plan');
    localStorage.removeItem('dmx_demo_orders');
    localStorage.removeItem('dmx_demo_wishlist');
    setCampaigns(INITIAL_CAMPAIGNS);
    setCartItems([]);
    setDraftPlan(null);
    setOrders(INITIAL_ORDERS);
    setWishlistIds(['stay_dalat_colline', 'act_bana_hills']);
    setPersonaId('user_family');
    setActiveScenarioId(null);
    showToast('Đã khôi phục toàn bộ dữ liệu demo về trạng thái ban đầu.');
  };

  return (
    <DemoContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeServiceCategory,
        setActiveServiceCategory,
        isInsideMiniApp,
        setIsInsideMiniApp,
        showControlCenter,
        setShowControlCenter,
        activePersona,
        setActivePersonaId: setPersonaId,
        updateUserProfile,
        viewMode,
        setViewMode,
        demoDate,
        setDemoDate,
        campaigns,
        toggleCampaignActive,
        updateCampaignBudget,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        draftPlan,
        setDraftPlan,
        wishlistIds,
        toggleWishlist,
        orders,
        createOrderFromCart,
        cancelOrder,
        supportTickets,
        createSupportTicket,
        chaos,
        setChaos,
        runScenario,
        activeScenarioId,
        resetDemoData,
        toastMessage,
        showToast
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemo must be used within a DemoProvider');
  return ctx;
};
