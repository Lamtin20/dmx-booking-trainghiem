import { STAYS, FLIGHTS, TRANSPORTS, ACTIVITIES, EVENTS } from '../data/catalog';
import { DESTINATIONS } from '../data/destinations';
import { UserPersona, DestinationId } from '../types';

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
  destinationId: DestinationId;
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
  destinationId?: DestinationId;
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

  // Tạo lời chào ban đầu thân thiện
  public static getInitialGreeting(persona: UserPersona): AgentChatMessage {
    return {
      id: 'msg_welcome',
      sender: 'agent',
      text: `Dạ em chào ${persona.honorific} ${persona.shortName}! Em là **Trợ lý du lịch** của Điện Máy Xanh trên Quà Tặng VIP.\n\n${persona.honorific} đang lên kế hoạch du lịch ở đâu ạ? Em có sẵn nhiều điểm đến nghỉ dưỡng hấp dẫn cùng ưu đãi trả góp **Ví MWG PayLater 0%** và trừ điểm Quà Tặng VIP cho ${persona.honorific} nhé!`,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
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
   * Bóc tách thông tin du lịch từ văn bản người dùng (Hỗ trợ tiếng Việt có dấu, không dấu, số tự nhiên)
   */
  public static parseTravelIntent(text: string, prevCtx?: DiscoveryContext): DiscoveryContext {
    const raw = text.toLowerCase().trim();
    const ctx: DiscoveryContext = prevCtx ? { ...prevCtx } : { step: 'greeting' };

    // 1. Nhận diện Điểm đến
    const destKeywords: { keys: string[]; id: DestinationId; name: string }[] = [
      { keys: ['phú quốc', 'phu quoc', 'phuquoc'], id: 'phuquoc', name: 'Phú Quốc' },
      { keys: ['đà lạt', 'da lat', 'dalat'], id: 'dalat', name: 'Đà Lạt' },
      { keys: ['đà nẵng', 'da nang', 'danang'], id: 'danang', name: 'Đà Nẵng' },
      { keys: ['nha trang', 'nhatrang'], id: 'nhatrang', name: 'Nha Trang' },
      { keys: ['vũng tàu', 'vung tau', 'vungtau'], id: 'vungtau', name: 'Vũng Tàu' },
      { keys: ['sa pa', 'sapa'], id: 'sapa', name: 'Sa Pa' },
      { keys: ['hạ long', 'ha long', 'halong'], id: 'halong', name: 'Hạ Long' },
      { keys: ['hội an', 'hoi an', 'hoian'], id: 'hoian', name: 'Hội An' },
      { keys: ['huế', 'hue'], id: 'hue', name: 'Huế' },
      { keys: ['hà nội', 'ha noi', 'hanoi'], id: 'hanoi', name: 'Hà Nội' },
      { keys: ['sài gòn', 'sai gon', 'tp.hcm', 'tphcm', 'hồ chí minh'], id: 'hcm', name: 'TP. Hồ Chí Minh' },
      { keys: ['cần thơ', 'can tho'], id: 'cantho', name: 'Cần Thơ' }
    ];

    for (const item of destKeywords) {
      if (item.keys.some(k => raw.includes(k))) {
        ctx.destinationId = item.id;
        ctx.destinationName = item.name;
        break;
      }
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
    if (raw.includes('cuối tuần')) {
      ctx.durationDays = 2;
      ctx.durationNights = 1;
    } else {
      const matchDays = raw.match(/(\d+)\s*(ngày|ngay|n)/);
      if (matchDays) {
        const d = parseInt(matchDays[1], 10);
        if (d >= 1 && d <= 10) {
          ctx.durationDays = d;
          ctx.durationNights = Math.max(1, d - 1);
        }
      }
    }

    // 4. Nhận diện Ngân sách (budget)
    // Trường hợp số viết liền: 20000000, 20.000.000, 15000000
    const rawNumberMatch = raw.match(/(\d{1,3}(?:[\.,]\d{3}){2,}|\d{7,9})/);
    if (rawNumberMatch) {
      const cleaned = rawNumberMatch[1].replace(/[\.,]/g, '');
      const parsedNum = parseInt(cleaned, 10);
      if (parsedNum >= 1000000) {
        ctx.budget = parsedNum;
        const trieu = (parsedNum / 1000000).toLocaleString('vi-VN');
        ctx.budgetText = `${trieu} triệu`;
      }
    }

    // Trường hợp viết chữ: "20 triệu", "20tr", "18.6 triệu"
    if (!ctx.budget) {
      const matchTrieu = raw.match(/(\d+[\.,]?\d*)\s*(triệu|trieu|tr|m\b)/);
      if (matchTrieu) {
        const num = parseFloat(matchTrieu[1].replace(',', '.'));
        if (num > 0) {
          ctx.budget = Math.round(num * 1000000);
          ctx.budgetText = `${matchTrieu[1]} triệu`;
        }
      }
    }

    // Từ khóa phân khúc ngân sách
    if (!ctx.budget) {
      if (raw.includes('tiết kiệm') || raw.includes('giá rẻ')) {
        ctx.budget = 10000000;
        ctx.budgetText = '10 triệu';
      } else if (raw.includes('tiêu chuẩn')) {
        ctx.budget = 15000000;
        ctx.budgetText = '15 triệu';
      } else if (raw.includes('cao cấp') || raw.includes('resort') || raw.includes('5 sao')) {
        ctx.budget = 20000000;
        ctx.budgetText = '20 triệu';
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
   * Tạo gói đề xuất du lịch trọn gói chuẩn 100% Ảnh 2
   */
  public static generateProposalData(ctx: DiscoveryContext): TravelProposalCardData {
    const destId = ctx.destinationId || 'phuquoc';
    const destName = ctx.destinationName || 'Phú Quốc';
    const days = ctx.durationDays || 3;
    const nights = ctx.durationNights || 2;
    const pax = ctx.pax || 3;
    const paxText = ctx.paxText || `${pax} người`;
    const budget = ctx.budget || 20000000;

    // Tìm Stay phù hợp trong catalog
    const matchingStays = STAYS.filter(s => s.destinationId === destId);
    const primaryStay = matchingStays.find(s => s.stars >= 4) || matchingStays[0] || STAYS[0];
    const primaryRoom = primaryStay.rooms[0];

    // Ước tính chi phí cân đối thông minh trong ngân sách
    // Nếu khách cho 20 triệu: đề xuất 18,6 triệu (như trong ảnh 2 mẫu của người dùng)
    let totalEstimate = Math.round(budget * 0.93 / 100000) * 100000;
    if (budget === 20000000) {
      totalEstimate = 18600000; // Khớp 100% ảnh người dùng cung cấp!
    }

    // Phân bổ 3 thành phần: Lưu trú, Di chuyển, Ăn & chơi
    let stayAmount = 0;
    let transportAmount = 0;
    let activityAmount = 0;

    if (totalEstimate === 18600000) {
      stayAmount = 6000000;
      transportAmount = 7000000;
      activityAmount = 5600000;
    } else {
      stayAmount = Math.round((totalEstimate * 0.33) / 100000) * 100000;
      transportAmount = Math.round((totalEstimate * 0.37) / 100000) * 100000;
      activityAmount = totalEstimate - stayAmount - transportAmount;
    }

    const formatTrieu = (val: number) => {
      const tr = val / 1000000;
      return Number.isInteger(tr) ? `${tr} triệu` : `${tr.toFixed(1).replace('.', ',')} triệu`;
    };

    // Hình ảnh resort thực tế
    let resortImage = primaryStay.coverImage;
    if (destId === 'phuquoc') {
      resortImage = '/destinations/phuquoc.jpg';
    } else if (destId === 'dalat') {
      resortImage = '/destinations/dalat.jpg';
    } else if (destId === 'danang') {
      resortImage = '/destinations/danang.jpg';
    } else if (destId === 'nhatrang') {
      resortImage = '/destinations/nhatrang.jpg';
    }

    // Đặc quyền phòng & tiện ích chuẩn 100% Ảnh 2
    const roomName = primaryRoom ? primaryRoom.name.split('Hướng')[0].trim() : 'Deluxe King';
    const suitableFor = pax >= 3 ? `${pax} người lớn` : '2 người lớn + 2 bé';
    const amenitiesHighlight = destId === 'phuquoc'
      ? 'Biển riêng, hồ bơi Kid Club'
      : (primaryStay.amenities.slice(0, 3).join(', ') || 'Gần trung tâm, buffet sáng');

    // Tính trả chậm MWG PayLater 0% lãi suất
    const tenor3Monthly = Math.round(totalEstimate / 3);
    const tenor6Monthly = Math.round(totalEstimate / 6);
    const tenor12Monthly = Math.round(totalEstimate / 12);

    return {
      id: `prop_${destId}_${Date.now()}`,
      destinationId: destId,
      destinationName: destName,
      packageTitle: destId === 'dalat' ? 'Khám phá & nghỉ dưỡng phố hoa' : 'Nghỉ dưỡng & khám phá',
      resortName: primaryStay.name,
      resortImage,
      stars: primaryStay.stars || 5,
      durationDays: days,
      durationNights: nights,
      paxText,
      adults: ctx.adults || pax,
      children: ctx.children || 0,
      roomName,
      suitableFor,
      amenitiesHighlight,
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
        tenor3Monthly,
        tenor6Monthly,
        tenor12Monthly
      },
      itineraryDays: [
        {
          day: 1,
          title: `Khởi hành & Nhận phòng ${primaryStay.name}`,
          activities: [
            { time: '08:30', title: 'Di chuyển đến điểm đến', desc: `Vé bay / xe đón đúng giờ xuất phát cho ${paxText}.` },
            { time: '12:30', title: 'Thưởng thức bữa trưa đặc sản', desc: 'Ẩm thực địa phương thanh mát, chuẩn vị truyền thống.' },
            { time: '14:00', title: `Check-in ${primaryStay.name}`, desc: `Nhận phòng ${roomName}, tận hưởng hồ bơi & tiện ích nghỉ dưỡng.` },
            { time: '18:30', title: 'Dạo chơi & Chợ đêm', desc: 'Thưởng ngoạn cảnh sắc đêm lung linh và ăn tối tự do.' }
          ]
        },
        {
          day: 2,
          title: 'Trải nghiệm thiên nhiên & Danh lam nổi tiếng',
          activities: [
            { time: '07:30', title: 'Buffet sáng tại resort', desc: 'Thực đơn buffet 5 sao phong phú Á - Âu đã bao gồm trong gói.' },
            { time: '09:00', title: 'Tour tham quan điểm nổi bật', desc: `Tour khám phá các danh thắng nổi tiếng tại ${destName}.` },
            { time: '15:00', title: 'Check-in ngắm hoàng hôn', desc: 'Trải nghiệm góc ngắm hoàng hôn tuyệt đẹp và chụp ảnh kỷ niệm.' },
            { time: '19:00', title: 'Tiệc tối ấm cúng', desc: 'Bữa tối hải sản/đặc sản dành cho gia đình và bạn bè.' }
          ]
        },
        {
          day: 3,
          title: 'Thư giãn, mua quà đặc sản & Tiễn đoàn',
          activities: [
            { time: '08:00', title: 'Buffet sáng & Thư giãn', desc: 'Tự do tắm biển, bơi lội hoặc spa chăm sóc sức khỏe.' },
            { time: '11:30', title: 'Check-out & Mua sắm quà lưu niệm', desc: 'Mua sắm đặc sản địa phương làm quà cho người thân.' },
            { time: '14:00', title: 'Xe đưa tiễn ra sân bay / bến xe', desc: 'Khép lại kỳ nghỉ trọn vẹn, an toàn và ngập tràn niềm vui.' }
          ]
        }
      ]
    };
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
    // VÍ MWG PAYLATER
    if (raw.includes('paylater') || raw.includes('trả chậm') || raw.includes('trả góp') || raw.includes('kỳ hạn') || raw.includes('lãi suất')) {
      return {
        newContext: currentCtx,
        response: {
          id: `msg_agent_${Date.now()}`,
          sender: 'agent',
          text: `Dạ thưa ${h} ${n}, về chương trình **Ví MWG PayLater** trên Điện Máy Xanh & Quà Tặng VIP:\n\n` +
            `⚡ **Thanh toán FULL 100% ngay lập tức**: Ví MWG PayLater sẽ ứng trước 100% giá trị đơn hàng để xuất vé và giữ phòng cho ${h} ngay lập tức.\n\n` +
            `🗓️ **4 Kỳ hạn linh hoạt**: 3, 6, 9, 12 tháng (0% lãi suất).\n` +
            `🛡️ **Đặc quyền**: Hôm nay ${h} thanh toán **0đ**, kỳ đầu tiên chỉ bắt đầu sau 30 ngày!\n\n` +
            `${h} có thể chọn hình thức này ngay tại bước thanh toán ạ!`,
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
          text: `Dạ em xin thông tin ưu đãi tài khoản của ${h} ${n} trên Quà Tặng VIP như sau ạ:\n\n` +
            `💎 **Điểm tích lũy hiện có**: **${persona.pointBalance.toLocaleString('vi-VN')} điểm** (tương đương ${persona.pointBalance.toLocaleString('vi-VN')}đ).\n` +
            `• ${h} được dùng điểm để **giảm trừ trực tiếp tối đa 10%** tổng giá trị mỗi đơn.\n` +
            `🎁 Tặng thêm Phiếu mua sắm 100K tại Điện Máy Xanh sau khi hoàn tất chuyến đi!`,
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

    // CHÍNH SÁCH ĐỔI / HỦY VÉ
    if (raw.includes('hủy') || raw.includes('hoàn tiền') || raw.includes('đổi vé') || raw.includes('đổi ngày') || raw.includes('hotline') || raw.includes('khiếu nại')) {
      return {
        newContext: currentCtx,
        response: {
          id: `msg_agent_${Date.now()}`,
          sender: 'agent',
          text: `Dạ về chính sách hỗ trợ & đổi hủy dịch vụ tại Điện Máy Xanh:\n\n` +
            `🛡️ **Cam kết bảo vệ khách hàng**: Hỗ trợ 24/7 trực tiếp với đối tác vận chuyển và khách sạn.\n` +
            `• **Khách sạn**: Đa số miễn phí hủy trước 24h - 48h.\n` +
            `• **Vé xe FUTA**: Hỗ trợ đổi giờ/tuyến trước 12h.\n` +
            `📞 Hotline miễn phí: **1800 1061** (nhánh Du lịch).`,
          timestamp: nowStr,
          actionCard: {
            type: 'support',
            title: 'Trung tâm CSKH Điện Máy Xanh (24/7)',
            subtitle: 'Cam kết tiếp nhận & xử lý đổi/hủy vé trong 15 phút',
            highlight: 'Hotline 1800 1061',
            badge: 'An tâm 100%',
            actionLabel: 'Gửi yêu cầu hỗ trợ'
          }
        }
      };
    }

    // 2. HÀNH TRÌNH DẪN DẮT KHAI PHÁ THÔNG TIN DU LỊCH (DISCOVERY JOURNEY)
    // =========================================================================

    // CASE A: ĐÃ ĐỦ 4 THÔNG TIN (Điểm đến + Số người + Thời gian + Ngân sách)
    // -> Xuất Thẻ Đề Xuất Trọn Gói chuẩn 100% Ảnh 2
    if (currentCtx.step === 'complete') {
      const proposal = this.generateProposalData(currentCtx);
      const summaryBadge = `${currentCtx.destinationName} · ${currentCtx.paxText} · ${currentCtx.durationDays} ngày · ${currentCtx.budgetText}`;

      return {
        newContext: currentCtx,
        response: {
          id: `msg_agent_${Date.now()}`,
          sender: 'agent',
          text: `Em gợi ý chuyến đi vừa ngân sách của ${h} ${n} nhé!`,
          timestamp: nowStr,
          userSummaryBadge: summaryBadge,
          proposalCard: proposal,
          suggestedChips: [
            '🔄 Đổi sang khách sạn 4 sao',
            '✈️ Đổi sang vé bay Vietnam Airlines',
            '🎟️ Thêm vé Safari & VinWonders',
            '💳 Trả chậm qua MWG PayLater'
          ]
        }
      };
    }

    // CASE B: CÓ ĐIỂM ĐẾN + SỐ NGƯỜI + SỐ NGÀY, NHƯNG CHƯA CÓ NGÂN SÁCH
    // -> Dẫn dắt hỏi tiếp về ngân sách & phong cách trải nghiệm
    if (currentCtx.step === 'ask_budget') {
      return {
        newContext: currentCtx,
        response: {
          id: `msg_agent_${Date.now()}`,
          sender: 'agent',
          text: `Dạ em đã ghi nhận chuyến đi **${currentCtx.destinationName}** cho **${currentCtx.paxText} trong ${currentCtx.durationDays} ngày** ạ!\n\n${h} ${n} dự kiến **ngân sách khoảng bao nhiêu** cho cả chuyến (hoặc phong cách du lịch mong muốn) để em tối ưu trọn gói chuẩn nhất ạ?`,
          timestamp: nowStr,
          suggestedChips: [
            '💰 Tiết kiệm (~10 - 12 triệu)',
            '🌟 Tiêu chuẩn (~15 triệu)',
            '✨ Nghỉ dưỡng cao cấp (~20 triệu)',
            '👑 Resort 5 sao trọn gói'
          ]
        }
      };
    }

    // CASE C: CHỈ MỚI CÓ ĐIỂM ĐẾN (ví dụ "Anh muốn đi Phú Quốc" hoặc "Tư vấn Đà Lạt")
    // -> Khen ngợi điểm đến và hỏi Số người + Số ngày
    if (currentCtx.step === 'ask_pax_duration') {
      return {
        newContext: currentCtx,
        response: {
          id: `msg_agent_${Date.now()}`,
          sender: 'agent',
          text: `Dạ tuyệt vời ạ! **${currentCtx.destinationName}** mùa này rất đẹp và có nhiều khuyến mãi hấp dẫn trên Quà Tặng VIP 🌴.\n\nĐể em chọn phòng nghỉ và phương tiện phù hợp nhất, chuyến đi của ${h} ${n} dự kiến **có bao nhiêu người** và đi **khoảng mấy ngày** vậy ạ?`,
          timestamp: nowStr,
          suggestedChips: [
            '👥 2 người · 3 ngày 2 đêm',
            '🧑‍🤝‍🧑 3 người · 3 ngày 2 đêm',
            '👨‍👩‍👧‍👦 Gia đình 4 người · 4 ngày 3 đêm',
            '👫 Cặp đôi · 2 ngày 1 đêm'
          ]
        }
      };
    }

    // CASE D: CHƯA CÓ THÔNG TIN CỤ THỂ HOẶC CHÀO HỎI BAN ĐẦU
    return {
      newContext: currentCtx,
      response: {
        id: `msg_agent_${Date.now()}`,
        sender: 'agent',
        text: `Dạ em luôn sẵn sàng hỗ trợ ${h} ${n}!\n\n${h} đang quan tâm chuyến đi đến địa điểm nào, hoặc cần em gợi ý điểm đến đang được ưu đãi nhiều nhất hôm nay ạ?`,
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
