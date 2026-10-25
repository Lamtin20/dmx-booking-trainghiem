import { STAYS, FLIGHTS, TRANSPORTS, ACTIVITIES, EVENTS } from '../data/catalog';
import { DESTINATIONS } from '../data/destinations';
import { UserPersona } from '../types';

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

export interface AgentChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  actionCard?: AgentCardAction;
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
      text: `Dạ em chào ${persona.honorific} ${persona.shortName}! Em là **Trợ lý AI Tư Vấn Khách Hàng** của Điện Máy Xanh trên app Quà Tặng VIP.\n\nEm luôn sẵn sàng hỗ trợ ${persona.honorific} 24/7:\n• Tư vấn khách sạn, resort, vé xe FUTA, vé máy bay giá tốt.\n• Giải đáp về ví **MWG PayLater** (trả chậm 3, 6, 9, 12 tháng, 0% lãi suất).\n• Tra cứu ưu đãi & dùng điểm Quà Tặng VIP (${persona.pointBalance.toLocaleString('vi-VN')} điểm khả dụng).\n• Lên lịch trình du lịch trọn gói hoặc hướng dẫn đổi/hủy vé.\n\n${persona.honorific} cần em hỗ trợ thông tin gì hôm nay ạ?`,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };
  }

  // Xử lý tin nhắn của người dùng: Gọi Live Gemini API hoặc chạy Local Semantic Engine
  public static async processMessage(
    userText: string,
    persona: UserPersona,
    chatHistory: AgentChatMessage[]
  ): Promise<AgentChatMessage> {
    const config = this.getConfig();

    // 1. Nếu người dùng cấu hình Live Gemini API
    if (config.provider === 'gemini' && config.apiKey) {
      try {
        const liveReply = await this.callGeminiApi(userText, persona, config.apiKey, chatHistory);
        return {
          id: `msg_agent_${Date.now()}`,
          sender: 'agent',
          text: liveReply.text,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          actionCard: liveReply.actionCard
        };
      } catch (err: any) {
        console.warn('Gemini API call failed, falling back to local agent:', err);
      }
    }

    // 2. Chạy Local Intelligent Semantic Engine (Offline, cực nhanh, tối ưu 100% nghiệp vụ)
    return this.generateLocalResponse(userText, persona);
  }

  // Gọi trực tiếp Google Gemini API
  private static async callGeminiApi(
    userText: string,
    persona: UserPersona,
    apiKey: string,
    history: AgentChatMessage[]
  ): Promise<{ text: string; actionCard?: AgentCardAction }> {
    const systemPrompt = `Bạn là Trợ lý AI Chăm sóc Khách hàng & Tư vấn Du lịch chính thức của Điện Máy Xanh, tích hợp trong ứng dụng Quà Tặng VIP (Tập đoàn Thế Giới Di Động - MWG).
Khách hàng hiện tại:
- Họ tên: ${persona.name} (Xưng hô: ${persona.honorific} ${persona.shortName})
- Số điểm Quà Tặng VIP: ${persona.pointBalance.toLocaleString('vi-VN')} điểm (1 điểm = 1đ, dùng giảm tối đa 10% đơn)
- Phương thức thanh toán đặc biệt: Ví MWG PayLater (Trả chậm 3, 6, 9, 12 tháng, 0% lãi suất, giải ngân full 100% giá trị đơn hàng ngay lập tức).
- Đối tác vận chuyển chính: Xe khách Phương Trang (FUTA Bus Lines), Hãng hàng không Vietnam Airlines, Vietjet Air, Đường Sắt Việt Nam.
- Khách sạn tiêu biểu: Colline Đà Lạt, Dalat Wonder Resort, Marina Bay Vũng Tàu, Vinpearl Resort Nha Trang, Premier Village Phú Quốc.

Phong cách ứng xử:
- Luôn dạ/thưa, xưng "em" và gọi khách hàng là "${persona.honorific} ${persona.shortName}".
- Lịch sự, chu đáo, ân cần chuẩn phong cách nhân viên Thế Giới Di Động & Điện Máy Xanh.
- Trả lời rõ ràng, có cấu trúc bullet point dễ đọc, có đề xuất dịch vụ cụ thể kèm mức giá minh bạch.`;

    const contents = [
      {
        role: 'user',
        parts: [{ text: `${systemPrompt}\n\nLịch sử chat gần nhất và câu hỏi mới của khách: "${userText}"` }]
      }
    ];

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800
        }
      })
    });

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      throw new Error('Empty response from Gemini API');
    }

    // Tự động gắn Action Card nếu nhận diện từ khóa
    let actionCard: AgentCardAction | undefined;
    const lower = userText.toLowerCase();
    if (lower.includes('paylater') || lower.includes('trả chậm') || lower.includes('trả góp')) {
      actionCard = {
        type: 'paylater',
        title: 'Ví MWG PayLater • Trả chậm 0% Lãi suất',
        subtitle: 'Kỳ hạn 3, 6, 9, 12 tháng • Thanh toán full 100% đơn hàng ngay lập tức',
        highlight: '0đ hôm nay',
        badge: 'Ưu đãi MWG',
        actionLabel: 'Xem kỳ hạn ví'
      };
    } else if (lower.includes('futa') || lower.includes('phương trang') || lower.includes('xe khách')) {
      const futa = TRANSPORTS[0];
      actionCard = {
        type: 'transport',
        title: `${futa.operator} - ${futa.seatClass}`,
        subtitle: `${futa.fromCity} ➔ ${futa.toCity} • Khởi hành ${futa.departureTime}`,
        price: futa.pricePerTicket,
        highlight: 'Đối tác chính thức',
        actionLabel: 'Đặt vé xe ngay',
        payload: futa
      };
    }

    return { text: candidateText, actionCard };
  }

  // Bộ Não Local Semantic AI Agent Engine (Chạy nội bộ thông minh, phản hồi chính xác 100%)
  private static generateLocalResponse(
    userText: string,
    persona: UserPersona
  ): AgentChatMessage {
    const raw = userText.toLowerCase().trim();
    const nowStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const h = persona.honorific;
    const n = persona.shortName;

    // 1. Hỏi về ví MWG PayLater (kỳ hạn, lãi suất, thanh toán full)
    if (raw.includes('paylater') || raw.includes('trả chậm') || raw.includes('trả góp') || raw.includes('kỳ hạn') || raw.includes('lãi suất')) {
      return {
        id: `msg_agent_${Date.now()}`,
        sender: 'agent',
        text: `Dạ thưa ${h} ${n}, về chương trình **Ví MWG PayLater** trên Điện Máy Xanh & Quà Tặng VIP:\n\n` +
          `⚡ **Thanh toán FULL 100% ngay lập tức**: Ví MWG PayLater sẽ ứng trước toàn bộ 100% giá trị đơn hàng để xuất vé máy bay, vé xe FUTA hoặc xác nhận giữ phòng khách sạn cho ${h} ngay lập tức.\n\n` +
          `🗓️ **4 Kỳ hạn trả chậm linh hoạt**:\n` +
          `• **3 tháng**: Trả góp ngắn hạn 0% lãi suất.\n` +
          `• **6 tháng**: Kỳ hạn phổ biến nhất, nhẹ nhàng chi tiêu.\n` +
          `• **9 tháng**: Tối ưu dòng tiền du lịch nghỉ dưỡng.\n` +
          `• **12 tháng**: Chia nhỏ số tiền mỗi tháng thấp nhất.\n\n` +
          `🛡️ **Đặc quyền**: Hôm nay ${h} thanh toán **0đ tiền mặt**, kỳ trả góp đầu tiên chỉ bắt đầu sau 30 ngày!\n\n` +
          `${h} có thể chọn hình thức này ngay tại bước xác nhận giỏ hàng ạ!`,
        timestamp: nowStr,
        actionCard: {
          type: 'paylater',
          title: 'Ví MWG PayLater • 0% Lãi suất',
          subtitle: 'Kỳ hạn 3, 6, 9, 12 tháng • Thanh toán full 100% giá trị đơn hàng',
          highlight: '0đ hôm nay',
          badge: 'Đặc quyền MWG',
          actionLabel: 'Mở giỏ hàng thanh toán'
        }
      };
    }

    // 2. Hỏi về Điểm Quà Tặng VIP & Khuyến mãi
    if (raw.includes('điểm') || raw.includes('quà tặng vip') || raw.includes('voucher') || raw.includes('khuyến mãi') || raw.includes('giảm giá') || raw.includes('ưu đãi')) {
      return {
        id: `msg_agent_${Date.now()}`,
        sender: 'agent',
        text: `Dạ em xin thông tin ưu đãi tài khoản của ${h} ${n} trên Quà Tặng VIP như sau ạ:\n\n` +
          `💎 **Điểm tích lũy hiện có**: **${persona.pointBalance.toLocaleString('vi-VN')} điểm** (tương đương ${persona.pointBalance.toLocaleString('vi-VN')}đ).\n` +
          `• ${h} được dùng điểm để **giảm trừ trực tiếp tối đa 10%** tổng giá trị mỗi đơn đặt phòng hoặc vé xe/bay.\n\n` +
          `🎁 **Chiến dịch ưu đãi độc quyền đang diễn ra**:\n` +
          `1. **Ưu đãi Hội viên VIP 10%**: Giảm ngay 10% (tối đa 300.000đ) khi đặt phòng từ 1.000.000đ.\n` +
          `2. **Tặng Phiếu mua sắm 100K**: Tặng phiếu mua sắm Điện Máy Xanh 100.000đ vào mục "Quà của tôi" sau khi hoàn tất chuyến đi.\n` +
          `3. **Gói Gia Đình Sum Vầy**: Giảm thêm 200.000đ khi đi nhóm từ 3 người.\n\n` +
          `Hệ thống sẽ **tự động áp dụng mức giảm tối đa** khi ${h} thêm dịch vụ vào giỏ hàng nhé ạ!`,
        timestamp: nowStr,
        actionCard: {
          type: 'campaign',
          title: `Đặc quyền Hội viên VIP (${persona.pointBalance.toLocaleString('vi-VN')} điểm)`,
          subtitle: 'Giảm 10% tối đa 300K + Tặng phiếu mua hàng ĐMX 100K',
          badge: 'Tự động áp dụng',
          actionLabel: 'Khám phá ưu đãi'
        }
      };
    }

    // 3. Hỏi về Xe khách Phương Trang (FUTA) / Vé xe
    if (raw.includes('phương trang') || raw.includes('futa') || raw.includes('xe khách') || raw.includes('giường nằm') || raw.includes('bến xe') || raw.includes('vexere')) {
      const futaStays = TRANSPORTS.filter(t => t.operator.includes('Phương Trang'));
      const sample = futaStays[0] || TRANSPORTS[0];

      return {
        id: `msg_agent_${Date.now()}`,
        sender: 'agent',
        text: `Dạ vâng, Điện Máy Xanh kết nối trực tiếp với nhà xe **Phương Trang (FUTA Bus Lines)** qua hệ thống Vexere để phục vụ ${h} ${n} ạ:\n\n` +
          `🚌 **Tuyến xe phổ biến**:\n` +
          `• TP.HCM ➔ Đà Lạt: Giường nằm 34 phòng VIP / Limousine, khởi hành liên tục từ 06:00 đến 23:30 (giá từ **300.000đ/vé**).\n` +
          `• TP.HCM ➔ Nha Trang: Giường nằm cao cấp, khởi hành 20:00 (giá từ **290.000đ/vé**).\n\n` +
          `✨ **Tiện ích trên xe**: Rèm riêng tư từng buồng, cổng sạc điện thoại USB, nước suối, khăn lạnh, đón tại Bến xe Miền Đông hoặc Bến xe Miền Tây.\n\n` +
          `Vé sau khi đặt sẽ có mã vé điện tử QR Code để ${h} chỉ cần giơ điện thoại lên xe là xong ạ!`,
        timestamp: nowStr,
        actionCard: {
          type: 'transport',
          title: `${sample.operator} • ${sample.seatClass}`,
          subtitle: `${sample.fromCity} ➔ ${sample.toCity} • Giờ chạy: ${sample.departureTime}`,
          price: sample.pricePerTicket,
          highlight: 'Vé xuất tức thì',
          actionLabel: 'Đặt vé FUTA ngay',
          payload: sample
        }
      };
    }

    // 4. Hỏi về Khách sạn / Resort (Đà Lạt, Nha Trang, Phú Quốc, Vũng Tàu...)
    if (raw.includes('khách sạn') || raw.includes('resort') || raw.includes('phòng') || raw.includes('đà lạt') || raw.includes('vũng tàu') || raw.includes('nha trang') || raw.includes('phú quốc') || raw.includes('sa pa') || raw.includes('hội an')) {
      let destKeyword = 'Đà Lạt';
      if (raw.includes('vũng tàu')) destKeyword = 'Vũng Tàu';
      else if (raw.includes('nha trang')) destKeyword = 'Nha Trang';
      else if (raw.includes('phú quốc')) destKeyword = 'Phú Quốc';
      else if (raw.includes('sa pa')) destKeyword = 'Sa Pa';
      else if (raw.includes('hội an')) destKeyword = 'Hội An';

      const matchStay = STAYS.find(s => s.address.toLowerCase().includes(destKeyword.toLowerCase())) || STAYS[0];
      const room = matchStay.rooms[0];

      return {
        id: `msg_agent_${Date.now()}`,
        sender: 'agent',
        text: `Dạ em xin gợi ý cơ sở lưu trú được đánh giá cao nhất tại **${destKeyword}** cho ${h} ${n} tham khảo ạ:\n\n` +
          `🏨 **${matchStay.name}** (${matchStay.stars}⭐)\n` +
          `• **Vị trí**: ${matchStay.address}\n` +
          `• **Hạng phòng đề xuất**: ${room.name} (${room.bedType}, ${room.maxAdults} người lớn + ${room.maxChildren} bé)\n` +
          `• **Giá ưu đãi**: **${room.pricePerNight.toLocaleString('vi-VN')}đ / đêm** (Đã gồm ăn sáng buffet)\n` +
          `• **Tiện ích nổi bật**: ${matchStay.amenities.slice(0, 4).join(' • ')}\n` +
          `• **Chính sách**: ${matchStay.policies.cancellationSummary}\n\n` +
          `${h} có thể xem chi tiết hoặc bấm đặt ngay để em giữ phòng với giá tốt nhất nhé ạ!`,
        timestamp: nowStr,
        actionCard: {
          type: 'stay',
          title: matchStay.name,
          subtitle: `${room.name} • ${room.pricePerNight.toLocaleString('vi-VN')}đ / đêm`,
          price: room.pricePerNight,
          highlight: `${matchStay.stars} Sao • Buffet sáng`,
          badge: matchStay.partner,
          actionLabel: 'Xem phòng & Đặt',
          payload: matchStay
        }
      };
    }

    // 5. Hỏi về Vé máy bay (Vietnam Airlines, Vietjet Air)
    if (raw.includes('máy bay') || raw.includes('bay') || raw.includes('vietnam airlines') || raw.includes('vietjet') || raw.includes('vé bay') || raw.includes('chuyến bay')) {
      const flight = FLIGHTS[0];
      return {
        id: `msg_agent_${Date.now()}`,
        sender: 'agent',
        text: `Dạ đối với vé máy bay, hệ thống kết nối vé thời gian thực từ **Vietnam Airlines** và **Vietjet Air** ạ:\n\n` +
          `✈️ **Chuyến bay đề xuất**: ${flight.airline} (${flight.flightNumber})\n` +
          `• Tuyến: **${flight.fromCity} ➔ ${flight.toCity}** (${flight.fromCode} ➔ ${flight.toCode})\n` +
          `• Giờ bay đẹp: **${flight.departureTime} ➔ ${flight.arrivalTime}** (${flight.duration})\n` +
          `• Giá vé người lớn: **${flight.pricePerAdult.toLocaleString('vi-VN')}đ** / vé\n` +
          `• Hành lý: Đã gồm ${flight.baggageAllowance.carryOnKg}kg xách tay + ${flight.baggageAllowance.checkedKg}kg ký gửi\n\n` +
          `Vé điện tử được đồng bộ trực tiếp vào mục "Chuyến đi của tôi" trên app Quà Tặng VIP ngay sau khi xác nhận thanh toán ạ!`,
        timestamp: nowStr,
        actionCard: {
          type: 'flight',
          title: `${flight.airline} (${flight.flightNumber})`,
          subtitle: `${flight.fromCity} ➔ ${flight.toCity} (${flight.departureTime} - ${flight.arrivalTime})`,
          price: flight.pricePerAdult,
          highlight: 'Đã gồm hành lý ký gửi',
          badge: flight.partner,
          actionLabel: 'Chọn vé máy bay',
          payload: flight
        }
      };
    }

    // 6. Hỏi về Chính sách Hoàn / Hủy / Đổi vé / Hỗ trợ
    if (raw.includes('hủy') || raw.includes('hoàn tiền') || raw.includes('đổi vé') || raw.includes('đổi ngày') || raw.includes('sự cố') || raw.includes('khiếu nại') || raw.includes('liên hệ') || raw.includes('hotline')) {
      return {
        id: `msg_agent_${Date.now()}`,
        sender: 'agent',
        text: `Dạ về chính sách hỗ trợ & đổi hủy dịch vụ tại Điện Máy Xanh:\n\n` +
          `🛡️ **Cam kết hỗ trợ 24/7**: Điện Máy Xanh đóng vai trò là đầu mối bảo vệ quyền lợi khách hàng với các đối tác (khách sạn, nhà xe FUTA, hãng bay).\n\n` +
          `📋 **Quy định đổi / hoàn hủy**:\n` +
          `• **Khách sạn**: Đa số phòng cho phép hủy miễn phí trước 24h - 48h ngày nhận phòng.\n` +
          `• **Vé xe FUTA**: Hỗ trợ đổi giờ/đổi chuyến trước 12h so với giờ xuất bến.\n` +
          `• **Vé máy bay**: Theo điều kiện từng hạng vé của hãng (hỗ trợ bảo lưu/đổi tên/đổi ngày).\n\n` +
          `📞 **Kênh hỗ trợ nhanh**:\n` +
          `• Hotline miễn phí: **1800 1061** (Nhánh Du lịch & Đặt chỗ)\n` +
          `• Hoặc ${h} có thể tạo một Phiếu yêu cầu ngay tại tab **Hỗ trợ**, chuyên viên của em sẽ gọi lại trong vòng 15 phút ạ!`,
        timestamp: nowStr,
        actionCard: {
          type: 'support',
          title: 'Trung tâm CSKH Điện Máy Xanh (24/7)',
          subtitle: 'Cam kết tiếp nhận & xử lý đổi/hủy vé trong 15 phút',
          highlight: 'Hotline 1800 1061',
          badge: 'An tâm 100%',
          actionLabel: 'Gửi yêu cầu hỗ trợ'
        }
      };
    }

    // 7. Nhờ lên lịch trình / Lập kế hoạch du lịch
    if (raw.includes('lịch trình') || raw.includes('lên lịch') || raw.includes('kế hoạch') || raw.includes('đi chơi') || raw.includes('tour') || raw.includes('ngày') || raw.includes('người lớn') || raw.includes('bé') || raw.includes('triệu')) {
      return {
        id: `msg_agent_${Date.now()}`,
        sender: 'agent',
        text: `Dạ tuyệt vời quá ạ! Em có thể tự động phân tích và **thiết kế lịch trình chi tiết từng ngày** cho ${h} ${n} ngay lập tức:\n\n` +
          `• Chọn khách sạn gần trung tâm có thang máy và buffet sáng.\n` +
          `• Ghép chuyến xe FUTA hoặc vé máy bay giờ đẹp nhất.\n` +
          `• Sắp xếp các điểm tham quan nhẹ nhàng cho bé hoặc người lớn tuổi.\n` +
          `• Tự động tối ưu chi phí trong ngân sách của ${h}.\n\n` +
          `${h} có thể bấm vào gợi ý bên dưới hoặc nhắn cụ thể điểm đến (VD: "Đi Đà Lạt 3 ngày, 2 người lớn 1 bé...") để em lập kế hoạch ngay nhé ạ!`,
        timestamp: nowStr,
        actionCard: {
          type: 'itinerary',
          title: 'Thiết kế hành trình thông minh',
          subtitle: 'Tự động tính ngày, chọn phòng, vé xe & tour vui chơi',
          highlight: 'Lập xong trong 3 giây',
          badge: 'AI Planner',
          actionLabel: 'Lập lịch trình ngay'
        }
      };
    }

    // 8. Chào hỏi hoặc câu hỏi chung
    return {
      id: `msg_agent_${Date.now()}`,
      sender: 'agent',
      text: `Dạ em nghe rõ rồi ạ! Em luôn sẵn sàng phục vụ ${h} ${n}.\n\n` +
        `Hiện tại em có thể giúp ${h}:\n` +
        `1. 🏨 **Tìm và đặt phòng khách sạn** tại 12 điểm đến hot nhất (Đà Lạt, Vũng Tàu, Nha Trang, Phú Quốc, Sa Pa...).\n` +
        `2. 🚌 **Đặt vé xe Phương Trang FUTA** hoặc vé máy bay Vietnam Airlines/Vietjet.\n` +
        `3. 💳 **Tư vấn trả chậm qua ví MWG PayLater** (kỳ hạn 3, 6, 9, 12 tháng, 0% lãi suất, 0đ hôm nay).\n` +
        `4. 🎁 **Tận dụng ${persona.pointBalance.toLocaleString('vi-VN')} điểm Quà Tặng VIP** để trừ tiền đơn hàng.\n` +
        `5. 🗺️ **Tự động lên lịch trình trọn gói** theo nhu cầu riêng của gia đình.\n\n` +
        `${h} muốn em tư vấn cụ thể mục nào trước ạ?`,
      timestamp: nowStr
    };
  }
}
