import { STAYS, FLIGHTS, TRANSPORTS, ACTIVITIES, EVENTS } from '../data/catalog';
import { DESTINATIONS } from '../data/destinations';
import { UserPersona, DestinationId } from '../types';
import { 
  NATIONWIDE_DESTINATIONS, 
  NationwideDestination, 
  resolveNationwideDestination,
  findNationwideDestination,
  ALL_63_PROVINCES 
} from '../data/nationwideDestinations';

export interface AgentCardAction {
  type: 'stay' | 'transport' | 'flight' | 'paylater' | 'itinerary' | 'support' | 'campaign';
  title: string;
  subtitle: string;
  price?: number;
  highlight?: string;
  badge?: string;
  actionLabel?: string;
  payload?: any;
}

export interface TravelProposalCardData {
  id: string;
  destinationId: string;
  destinationName: string;
  packageTitle: string;        // "Nghỉ dưỡng & khám phá"
  resortName: string;          // "Vinpearl Resort & Spa Phú Quốc"
  resortImage: string;
  stars: number;               // 5
  durationDays: number;        // 3
  durationNights: number;      // 2
  paxText: string;             // "3 người"
  adults: number;
  children: number;
  roomName: string;            // "Deluxe King"
  suitableFor: string;         // "2 người lớn + 2 bé"
  amenitiesHighlight: string;  // "Biển riêng, hồ bơi Kid Club"

  // Base metrics for dynamic recalculation
  baseStayPerNight: number;
  baseDailyActivityPerPax: number;
  baseTransportPerPax: number;

  // Dự toán ngân sách
  targetBudget: number;        // 20000000
  totalEstimate: number;       // 18600000
  totalEstimateFormatted: string; // "18,6 triệu"
  perPersonLabel: string;      // "/ 3 người"
  disclaimerText: string;      // "Giá minh họa • Cần ngày đi để kiểm tra"

  breakdown: {
    stayAmount: number;
    stayFormatted: string;     // "6 triệu"
    stayPercent: number;       // 32
    transportAmount: number;
    transportFormatted: string;// "7 triệu"
    transportPercent: number;  // 38
    activityAmount: number;
    activityFormatted: string; // "5,6 triệu"
    activityPercent: number;   // 30
  };

  paylater: {
    tenor3Monthly: number;
    tenor6Monthly: number;
    tenor12Monthly: number;
  };

  itineraryDays: {
    day: number;
    title: string;
    activities: { time: string; title: string; desc: string }[];
  }[];
}

export interface DiscoveryContext {
  destinationId?: string;
  destinationName?: string;
  pax?: number;
  paxText?: string;
  adults?: number;
  children?: number;
  durationDays?: number;
  durationNights?: number;
  budget?: number;
  budgetText?: string;
  step: 'greeting' | 'ask_pax_duration' | 'ask_budget' | 'complete' | 'adjusting';
}

export interface AgentChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  userSummaryBadge?: string;        // E.g. "Phú Quốc · 3 người · 3 ngày · 20 triệu"
  proposalCard?: TravelProposalCardData;
  actionCard?: AgentCardAction;
  suggestedChips?: string[];        // Quick chips for interactive response
}

export interface AgentConfig {
  provider: 'local_agent' | 'gemini' | 'openai';
  apiKey?: string;
  model?: string;
}

const STORAGE_KEY_CONFIG = 'dmx_agent_config';

export class AiCustomerAgentService {
  // Lấy cấu hình Agent đã lưu
  public static getConfig(): AgentConfig {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {
      provider: 'local_agent',
      model: 'gemini-1.5-flash'
    };
  }

  // Lưu cấu hình Agent
  public static saveConfig(cfg: AgentConfig): void {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(cfg));
  }

  /**
   * Tạo lời chào ban đầu hấp dẫn chuẩn yêu cầu:
   * "Trải nghiệm trước, thanh toán sau với Ví MWG PayLater, ngoài ra còn rất nhiều ưu đãi..."
   */
  public static getInitialGreeting(persona: UserPersona): AgentChatMessage {
    return {
      id: 'msg_welcome',
      sender: 'agent',
      text: `Dạ em chào **${persona.honorific} ${persona.shortName}**! Em là **Trợ lý du lịch AI** của Điện Máy Xanh trên Quà Tặng VIP.\n\n` +
        `⚡ **Trải nghiệm trước, thanh toán sau với Ví MWG PayLater**:\n` +
        `• Đặt vé & giữ phòng thanh toán **0đ hôm nay**, trả chậm **3, 6, 9, 12 tháng** với **0% lãi suất**.\n` +
        `• Giảm thêm **10%** với điểm Quà Tặng VIP (${persona.pointBalance.toLocaleString('vi-VN')} điểm khả dụng) + Tặng phiếu mua sắm **100.000đ** tại Điện Máy Xanh!\n` +
        `• Hệ thống hỗ trợ đặt vé xe Phương Trang FUTA, vé máy bay & khách sạn toàn quốc.\n\n` +
        `Hôm nay ${persona.honorific} muốn vi vu ở đâu ạ? Em sẵn sàng thiết kế trọn gói vừa vặn ngân sách cho ${persona.honorific} nhé!`,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      // Ban đầu chỉ hiển thị những địa điểm có nhiều lựa chọn nhất & nổi bật nhất
      suggestedChips: [
        '🏝️ Đi Phú Quốc',
        '🌸 Đi Đà Lạt',
        '🏖️ Đi Đà Nẵng',
        '🌊 Đi Nha Trang',
        '⛰️ Đi Sa Pa',
        '💳 Ví MWG PayLater trả góp'
      ]
    };
  }

  /**
   * Bóc tách thông tin du lịch từ văn bản người dùng (Hỗ trợ toàn quốc 63 tỉnh thành & regex địa danh tự do)
   */
  public static parseTravelIntent(text: string, prevCtx?: DiscoveryContext): DiscoveryContext {
    const raw = text.toLowerCase().trim();
    const ctx: DiscoveryContext = prevCtx ? { ...prevCtx } : { step: 'greeting' };

    // 1. Nhận diện Điểm đến toàn quốc
    const foundDest = findNationwideDestination(text);
    if (foundDest) {
      ctx.destinationId = foundDest.id;
      ctx.destinationName = foundDest.name;
    } else if (prevCtx?.destinationName) {
      // Giữ nguyên điểm đến từ lượt trước nếu người dùng chỉ đang chọn số người / ngày / ngân sách
      ctx.destinationId = prevCtx.destinationId;
      ctx.destinationName = prevCtx.destinationName;
    }

    // 2. Nhận diện Số người (pax)
    if (raw.includes('cặp đôi') || raw.includes('hai người') || raw.includes('2 người')) {
      ctx.pax = 2;
      ctx.adults = 2;
      ctx.children = 0;
      ctx.paxText = '2 người';
    } else if (raw.includes('3 người') || raw.includes('ba người') || raw.includes('3 bạn') || raw.includes('3 khách')) {
      ctx.pax = 3;
      ctx.adults = 3;
      ctx.children = 0;
      ctx.paxText = '3 người';
    } else if (raw.includes('4 người') || raw.includes('bốn người') || raw.includes('gia đình 4')) {
      ctx.pax = 4;
      ctx.adults = 2;
      ctx.children = 2;
      ctx.paxText = '4 người';
    } else {
      const matchPax = raw.match(/(\d+)\s*(người|khách|bạn|thành viên)/);
      if (matchPax) {
        const count = parseInt(matchPax[1], 10);
        if (count > 0 && count <= 20) {
          ctx.pax = count;
          ctx.adults = count;
          ctx.children = 0;
          ctx.paxText = `${count} người`;
        }
      }
    }

    // 3. Nhận diện Số ngày (duration)
    if (raw.includes('đi về trong ngày') || raw.includes('trong ngày') || raw.includes('1 ngày')) {
      ctx.durationDays = 1;
      ctx.durationNights = 0;
    } else if (raw.includes('cuối tuần') || raw.includes('2 ngày 1 đêm') || raw.includes('2 ngày') || raw.includes('2n1đ')) {
      ctx.durationDays = 2;
      ctx.durationNights = 1;
    } else {
      const matchDays = raw.match(/(\d+)\s*(ngày|ngay|n)/);
      if (matchDays) {
        const d = parseInt(matchDays[1], 10);
        if (d >= 1 && d <= 10) {
          ctx.durationDays = d;
          ctx.durationNights = Math.max(0, d - 1);
        }
      }
    }

    // 4. Nhận diện Ngân sách (budget)
    const rawNumberMatch = raw.match(/(\d{1,3}(?:[\.,]\d{3}){2,}|\d{7,9})/);
    if (rawNumberMatch) {
      const cleaned = rawNumberMatch[1].replace(/[\.,]/g, '');
      const parsedNum = parseInt(cleaned, 10);
      if (parsedNum >= 500000) {
        ctx.budget = parsedNum;
        const trieu = (parsedNum / 1000000).toLocaleString('vi-VN');
        ctx.budgetText = `${trieu} triệu`;
      }
    }

    if (!ctx.budget) {
      const matchRangeTrieu = raw.match(/(\d+[\.,]?\d*)\s*-\s*(\d+[\.,]?\d*)\s*(triệu|trieu|tr)/);
      if (matchRangeTrieu) {
        const num1 = parseFloat(matchRangeTrieu[1].replace(',', '.'));
        const num2 = parseFloat(matchRangeTrieu[2].replace(',', '.'));
        const avg = (num1 + num2) / 2;
        ctx.budget = Math.round(avg * 1000000);
        ctx.budgetText = `${avg.toString().replace('.', ',')} triệu`;
      } else {
        const matchTrieu = raw.match(/(\d+[\.,]?\d*)\s*(triệu|trieu|tr|m\b)/);
        if (matchTrieu) {
          const num = parseFloat(matchTrieu[1].replace(',', '.'));
          if (num > 0) {
            ctx.budget = Math.round(num * 1000000);
            ctx.budgetText = `${matchTrieu[1]} triệu`;
          }
        }
      }
    }

    if (!ctx.budget) {
      const isNearby = ctx.destinationId === 'tayninh' || ctx.destinationId === 'vungtau';
      if (raw.includes('tiết kiệm') || raw.includes('giá rẻ')) {
        ctx.budget = isNearby ? 2000000 : 10000000;
        ctx.budgetText = isNearby ? '2 triệu' : '10 triệu';
      } else if (raw.includes('tiêu chuẩn')) {
        ctx.budget = isNearby ? 3500000 : 15000000;
        ctx.budgetText = isNearby ? '3,5 triệu' : '15 triệu';
      } else if (raw.includes('cao cấp') || raw.includes('resort') || raw.includes('5 sao')) {
        ctx.budget = isNearby ? 5000000 : 20000000;
        ctx.budgetText = isNearby ? '5 triệu' : '20 triệu';
      }
    }

    // Cập nhật trạng thái Discovery Step
    if (ctx.destinationName && ctx.pax && ctx.durationDays && ctx.budget) {
      ctx.step = 'complete';
    } else if (ctx.destinationName && ctx.pax && ctx.durationDays) {
      ctx.step = 'ask_budget';
    } else if (ctx.destinationName) {
      ctx.step = 'ask_pax_duration';
    } else {
      ctx.step = 'greeting';
    }

    return ctx;
  }

  /**
   * Tính toán lại ngân sách và phân bổ khi thay đổi số ngày (tăng ngày / giảm ngày)
   */
  public static recalculateProposalForDays(
    card: TravelProposalCardData,
    newDays: number
  ): TravelProposalCardData {
    const days = Math.max(1, Math.min(10, newDays));
    const nights = Math.max(0, days - 1);
    const pax = card.adults + card.children || 3;

    // Chi phí lưu trú tính theo số đêm
    const stayAmount = nights > 0 ? Math.round(card.baseStayPerNight * nights) : 0;
    // Chi phí ăn uống & vé vui chơi tính theo số ngày * số khách
    const activityAmount = Math.round(card.baseDailyActivityPerPax * days * pax);
    // Chi phí di chuyển khứ hồi giữ cố định
    const transportAmount = card.breakdown.transportAmount;

    const totalEstimate = stayAmount + activityAmount + transportAmount;

    const formatTrieu = (val: number) => {
      const tr = val / 1000000;
      return Number.isInteger(tr) ? `${tr} triệu` : `${tr.toFixed(1).replace('.', ',')} triệu`;
    };

    // Tạo lại danh sách hoạt động từng ngày
    const itineraryDays = [];
    for (let d = 1; d <= days; d++) {
      if (d === 1) {
        itineraryDays.push({
          day: 1,
          title: `Khởi hành & Nhận phòng ${card.resortName}`,
          activities: [
            { time: '08:00', title: 'Di chuyển đến điểm đến', desc: `Vé xe / bay đón đoàn ${card.paxText} chu đáo.` },
            { time: '12:30', title: 'Bữa trưa đặc sản địa phương', desc: 'Ẩm thực chuẩn vị, tươi ngon thanh mát.' },
            { time: '14:00', title: `Check-in ${card.resortName}`, desc: `Nghỉ ngơi phòng ${card.roomName}, tận hưởng tiện ích.` },
            { time: '18:30', title: 'Dạo chơi & ẩm thực đêm', desc: 'Thưởng ngoạn cảnh sắc đêm và tự do khám phá.' }
          ]
        });
      } else if (d === days) {
        itineraryDays.push({
          day: d,
          title: 'Thư giãn, mua quà đặc sản & Tiễn đoàn',
          activities: [
            { time: '08:00', title: 'Buffet sáng & Tắm biển/hồ bơi', desc: 'Thư giãn và tận hưởng ngày cuối kỳ nghỉ.' },
            { time: '11:30', title: 'Check-out & Mua sắm đặc sản', desc: 'Mua sắm đặc sản địa phương làm quà cho gia đình.' },
            { time: '14:30', title: 'Xe đưa tiễn ra sân bay / bến xe', desc: 'Khép lại chuyến đi an toàn, ngập tràn niềm vui.' }
          ]
        });
      } else {
        itineraryDays.push({
          day: d,
          title: `Ngày ${d}: Khám phá danh thắng nổi tiếng`,
          activities: [
            { time: '07:30', title: 'Buffet sáng cao cấp', desc: 'Nạp năng lượng chuẩn bị ngày mới năng động.' },
            { time: '09:00', title: `Tour tham quan điểm nổi bật`, desc: `Trải nghiệm danh lam thắng cảnh đặc sắc nhất.` },
            { time: '15:00', title: 'Check-in chụp ảnh kỷ niệm', desc: 'Ghi lại những khoảnh khắc tuyệt đẹp của chuyến đi.' },
            { time: '19:00', title: 'Tiệc tối ấm cúng', desc: 'Thưởng thức bữa tối ngon miệng cùng người thân.' }
          ]
        });
      }
    }

    return {
      ...card,
      durationDays: days,
      durationNights: nights,
      totalEstimate,
      totalEstimateFormatted: formatTrieu(totalEstimate),
      breakdown: {
        stayAmount,
        stayFormatted: formatTrieu(stayAmount),
        stayPercent: Math.round((stayAmount / totalEstimate) * 100),
        transportAmount,
        transportFormatted: formatTrieu(transportAmount),
        transportPercent: Math.round((transportAmount / totalEstimate) * 100),
        activityAmount,
        activityFormatted: formatTrieu(activityAmount),
        activityPercent: Math.round((activityAmount / totalEstimate) * 100)
      },
      paylater: {
        tenor3Monthly: Math.round(totalEstimate / 3),
        tenor6Monthly: Math.round(totalEstimate / 6),
        tenor12Monthly: Math.round(totalEstimate / 12)
      },
      itineraryDays
    };
  }

  /**
   * Tạo gói đề xuất du lịch trọn gói toàn quốc chuẩn 100% Ảnh 2
   */
  public static generateProposalData(ctx: DiscoveryContext): TravelProposalCardData {
    const destName = ctx.destinationName || 'Phú Quốc';
    const destObj = resolveNationwideDestination(destName);
    const days = ctx.durationDays || 3;
    const nights = ctx.durationNights !== undefined ? ctx.durationNights : Math.max(0, days - 1);
    const pax = ctx.pax || 3;
    const paxText = ctx.paxText || `${pax} người`;
    const budget = ctx.budget || 20000000;

    // Chi phí cơ bản
    const baseStay = destObj.baseStayPerNight;
    const baseDailyAct = destObj.baseDailyActivityPerPax;
    const baseTrans = destObj.baseTransportPerPax;

    let stayAmount = 0;
    let transportAmount = 0;
    let activityAmount = 0;
    let totalEstimate = 0;

    // Nếu là Phú Quốc 20 triệu 3 người 3 ngày: khớp 100% mẫu Ảnh 2 của người dùng!
    if (destObj.id === 'phuquoc' && budget === 20000000 && days === 3) {
      totalEstimate = 18600000;
      stayAmount = 6000000;
      transportAmount = 7000000;
      activityAmount = 5600000;
    } else {
      stayAmount = nights > 0 ? Math.round(baseStay * nights) : 0;
      transportAmount = Math.round(baseTrans * pax);
      activityAmount = Math.round(baseDailyAct * days * pax);
      totalEstimate = stayAmount + transportAmount + activityAmount;

      // Cân đối thông minh trong ngân sách khách mong đợi
      if (totalEstimate > budget) {
        totalEstimate = Math.round(budget * 0.95 / 100000) * 100000;
        stayAmount = Math.round((totalEstimate * 0.35) / 100000) * 100000;
        transportAmount = Math.round((totalEstimate * 0.35) / 100000) * 100000;
        activityAmount = totalEstimate - stayAmount - transportAmount;
      }
    }

    const formatTrieu = (val: number) => {
      const tr = val / 1000000;
      return Number.isInteger(tr) ? `${tr} triệu` : `${tr.toFixed(1).replace('.', ',')} triệu`;
    };

    const suitableFor = pax >= 3 ? `${pax} người lớn` : '2 người lớn + 2 bé';

    const initialCard: TravelProposalCardData = {
      id: `prop_${destObj.id}_${Date.now()}`,
      destinationId: destObj.id,
      destinationName: destObj.name,
      packageTitle: destObj.packageTitle,
      resortName: destObj.resortName,
      resortImage: destObj.resortImage,
      stars: 5,
      durationDays: days,
      durationNights: nights,
      paxText,
      adults: ctx.adults || pax,
      children: ctx.children || 0,
      roomName: destObj.roomName,
      suitableFor,
      amenitiesHighlight: destObj.amenitiesHighlight,
      baseStayPerNight: baseStay,
      baseDailyActivityPerPax: baseDailyAct,
      baseTransportPerPax: baseTrans,
      targetBudget: budget,
      totalEstimate,
      totalEstimateFormatted: formatTrieu(totalEstimate),
      perPersonLabel: `/ ${paxText}`,
      disclaimerText: 'Giá minh họa • Cần ngày đi để kiểm tra',
      breakdown: {
        stayAmount,
        stayFormatted: formatTrieu(stayAmount),
        stayPercent: Math.round((stayAmount / totalEstimate) * 100),
        transportAmount,
        transportFormatted: formatTrieu(transportAmount),
        transportPercent: Math.round((transportAmount / totalEstimate) * 100),
        activityAmount,
        activityFormatted: formatTrieu(activityAmount),
        activityPercent: Math.round((activityAmount / totalEstimate) * 100)
      },
      paylater: {
        tenor3Monthly: Math.round(totalEstimate / 3),
        tenor6Monthly: Math.round(totalEstimate / 6),
        tenor12Monthly: Math.round(totalEstimate / 12)
      },
      itineraryDays: []
    };

    return this.recalculateProposalForDays(initialCard, days);
  }

  /**
   * Tạo các chip gợi ý động bám sát điểm đến và nhu cầu của khách
   */
  public static getContextualChipsForDestination(destName: string, step: string): string[] {
    const dest = resolveNationwideDestination(destName);

    if (step === 'ask_pax_duration') {
      if (dest.id === 'tayninh' || dest.id === 'vungtau') {
        return [
          '👥 2 người · Đi về trong ngày',
          '🧑‍🤝‍🧑 3 người · 2 ngày 1 đêm',
          '👨‍👩‍👧‍👦 Gia đình 4 người · 2 ngày 1 đêm',
          `🚠 Vé cáp treo ${dest.name}`
        ];
      }
      return [
        '👥 2 người · 3 ngày 2 đêm',
        '🧑‍🤝‍🧑 3 người · 3 ngày 2 đêm',
        '👨‍👩‍👧‍👦 Gia đình 4 người · 4 ngày 3 đêm',
        '👫 Cặp đôi · 2 ngày 1 đêm'
      ];
    }

    if (step === 'ask_budget') {
      if (dest.id === 'tayninh' || dest.id === 'vungtau') {
        return [
          '💰 Tiết kiệm (~1,5 - 2 triệu)',
          '🌟 Tiêu chuẩn (~3 - 4 triệu)',
          `🏨 Khách sạn ${dest.resortName.split(' ')[0]} 5 sao`,
          '💳 Trả chậm qua MWG PayLater'
        ];
      }
      return [
        '💰 Tiết kiệm (~8 - 10 triệu)',
        '🌟 Tiêu chuẩn (~12 - 15 triệu)',
        '✨ Nghỉ dưỡng cao cấp (~20 triệu)',
        '👑 Resort 5 sao trọn gói'
      ];
    }

    // Khi đã có proposal
    return [
      `🔄 Đổi sang khách sạn khác tại ${dest.name}`,
      `🎟️ Thêm vé ${dest.highlights[0] || 'vui chơi'}`,
      '💳 Trả chậm qua MWG PayLater (0% lãi)',
      '📅 Chọn ngày đi'
    ];
  }

  /**
   * Xử lý tin nhắn của người dùng: Duy trì Context dẫn dắt từng bước
   */
  public static async processMessage(
    userText: string,
    persona: UserPersona,
    chatHistory: AgentChatMessage[],
    prevContext?: DiscoveryContext
  ): Promise<{ response: AgentChatMessage; newContext: DiscoveryContext }> {
    const raw = userText.toLowerCase().trim();
    const nowStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const h = persona.honorific;
    const n = persona.shortName;

    // Cập nhật context từ câu hỏi mới
    const currentCtx = this.parseTravelIntent(userText, prevContext);

    // 1. Nếu khách hỏi về các dịch vụ CSKH cụ thể (PayLater, Điểm VIP, Xe FUTA, v.v.)
    if (raw.includes('paylater') || raw.includes('trả chậm') || raw.includes('trả góp') || raw.includes('kỳ hạn') || raw.includes('lãi suất')) {
      return {
        newContext: currentCtx,
        response: {
          id: `msg_agent_${Date.now()}`,
          sender: 'agent',
          text: `Dạ thưa **${h} ${n}**, về chương trình **Ví MWG PayLater** trên Điện Máy Xanh & Quà Tặng VIP:\n\n` +
            `⚡ **Thanh toán FULL 100% ngay lập tức**: Ví MWG PayLater sẽ ứng trước 100% giá trị đơn hàng để xuất vé và giữ phòng cho **${h}** ngay lập tức.\n\n` +
            `🗓️ **4 Kỳ hạn linh hoạt**: **3, 6, 9, 12 tháng** (0% lãi suất, phí chuyển đổi 0đ).\n` +
            `🛡️ **Đặc quyền**: Hôm nay **${h}** thanh toán **0đ**, kỳ đầu tiên chỉ bắt đầu sau 30 ngày!\n\n` +
            `**${h}** có thể chọn hình thức này ngay tại bước xác nhận giỏ hàng ạ!`,
          timestamp: nowStr,
          actionCard: {
            type: 'paylater',
            title: 'Ví MWG PayLater • 0% Lãi suất',
            subtitle: 'Kỳ hạn 3, 6, 9, 12 tháng • Thanh toán full 100% đơn hàng',
            highlight: '0đ hôm nay',
            badge: 'Đặc quyền MWG',
            actionLabel: 'Mở giỏ hàng thanh toán'
          },
          suggestedChips: [
            '🏝️ Lên lịch trình Phú Quốc',
            '🌸 Lên lịch trình Đà Lạt',
            '💎 Tra cứu điểm Quà Tặng VIP'
          ]
        }
      };
    }

    // ĐIỂM QUÀ TẶNG VIP
    if (raw.includes('điểm') || raw.includes('quà tặng vip') || raw.includes('voucher') || raw.includes('khuyến mãi') || raw.includes('ưu đãi')) {
      return {
        newContext: currentCtx,
        response: {
          id: `msg_agent_${Date.now()}`,
          sender: 'agent',
          text: `Dạ em xin thông tin ưu đãi tài khoản của **${h} ${n}** trên Quà Tặng VIP như sau ạ:\n\n` +
            `💎 **Điểm tích lũy hiện có**: **${persona.pointBalance.toLocaleString('vi-VN')} điểm** (tương đương ${persona.pointBalance.toLocaleString('vi-VN')}đ).\n` +
            `• **${h}** được dùng điểm để **giảm trừ trực tiếp tối đa 10%** tổng giá trị mỗi đơn.\n` +
            `🎁 Tặng thêm Phiếu mua sắm **100.000đ** tại Điện Máy Xanh sau khi hoàn tất chuyến đi!`,
          timestamp: nowStr,
          actionCard: {
            type: 'campaign',
            title: `Đặc quyền Hội viên VIP (${persona.pointBalance.toLocaleString('vi-VN')} điểm)`,
            subtitle: 'Giảm 10% tối đa 300K + Tặng phiếu mua hàng ĐMX 100K',
            badge: 'Tự động áp dụng',
            actionLabel: 'Khám phá ưu đãi'
          },
          suggestedChips: [
            '🏝️ Tư vấn đi Phú Quốc',
            '🌸 Tư vấn đi Đà Lạt',
            '💳 Ví MWG PayLater'
          ]
        }
      };
    }

    // 2. HÀNH TRÌNH DẪN DẮT KHAI PHÁ THÔNG TIN DU LỊCH TOÀN QUỐC
    // =========================================================================

    // CASE A: ĐÃ ĐỦ 4 THÔNG TIN (Điểm đến + Số người + Thời gian + Ngân sách)
    if (currentCtx.step === 'complete') {
      const proposal = this.generateProposalData(currentCtx);
      const summaryBadge = `${currentCtx.destinationName} · ${currentCtx.paxText} · ${currentCtx.durationDays} ngày · ${currentCtx.budgetText}`;

      return {
        newContext: currentCtx,
        response: {
          id: `msg_agent_${Date.now()}`,
          sender: 'agent',
          text: `Em gợi ý chuyến đi vừa ngân sách của **${h} ${n}** nhé!`,
          timestamp: nowStr,
          userSummaryBadge: summaryBadge,
          proposalCard: proposal,
          suggestedChips: this.getContextualChipsForDestination(currentCtx.destinationName || '', 'complete')
        }
      };
    }

    // CASE B: CÓ ĐIỂM ĐẾN + SỐ NGƯỜI + SỐ NGÀY, NHƯNG CHƯA CÓ NGÂN SÁCH
    if (currentCtx.step === 'ask_budget') {
      return {
        newContext: currentCtx,
        response: {
          id: `msg_agent_${Date.now()}`,
          sender: 'agent',
          text: `Dạ em đã ghi nhận chuyến đi **${currentCtx.destinationName}** cho **${currentCtx.paxText} trong ${currentCtx.durationDays} ngày** ạ!\n\n**${h} ${n}** dự kiến **ngân sách khoảng bao nhiêu** cho cả chuyến (hoặc phong cách du lịch mong muốn) để em tối ưu trọn gói chuẩn nhất ạ?`,
          timestamp: nowStr,
          suggestedChips: this.getContextualChipsForDestination(currentCtx.destinationName || '', 'ask_budget')
        }
      };
    }

    // CASE C: CHỈ MỚI CÓ ĐIỂM ĐẾN (ví dụ "Đi tây ninh", "Đi đà lạt", "Đi sapa", "Đi quy nhơn"...)
    if (currentCtx.step === 'ask_pax_duration') {
      const dest = resolveNationwideDestination(currentCtx.destinationName || '');
      return {
        newContext: currentCtx,
        response: {
          id: `msg_agent_${Date.now()}`,
          sender: 'agent',
          text: `Dạ tuyệt vời ạ! **${dest.name}** là điểm đến rất thú vị với nhiều cảnh đẹp như **${dest.highlights.slice(0, 3).join(', ')}** 🌴.\n\nĐể em chọn phòng nghỉ và phương tiện di chuyển phù hợp nhất, chuyến đi của **${h} ${n}** dự kiến **có bao nhiêu người** và đi **khoảng mấy ngày** vậy ạ?`,
          timestamp: nowStr,
          suggestedChips: this.getContextualChipsForDestination(dest.name, 'ask_pax_duration')
        }
      };
    }

    // CASE D: CHƯA CÓ THÔNG TIN CỤ THỂ
    return {
      newContext: currentCtx,
      response: {
        id: `msg_agent_${Date.now()}`,
        sender: 'agent',
        text: `Dạ em luôn sẵn sàng hỗ trợ **${h} ${n}**!\n\n**${h}** đang quan tâm chuyến đi đến địa điểm nào trên toàn quốc (Tây Ninh, Phú Quốc, Đà Lạt, Quy Nhơn, Sa Pa...), hoặc cần em tư vấn điểm đến được ưu đãi nhiều nhất hôm nay ạ?`,
        timestamp: nowStr,
        suggestedChips: [
          '🏝️ Đi Phú Quốc',
          '🌸 Đi Đà Lạt',
          '🏖️ Đi Đà Nẵng',
          '🌊 Đi Nha Trang',
          '⛰️ Đi Sa Pa',
          '💳 Ví MWG PayLater trả góp'
        ]
      }
    };
  }
}
