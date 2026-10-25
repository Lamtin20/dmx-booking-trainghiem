import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  MapPin, 
  Check, 
  Building2, 
  Bus, 
  Plane, 
  Camera, 
  ChevronDown, 
  ChevronUp, 
  ShoppingBag,
  Info,
  Clock,
  Bot,
  MessageSquare,
  Settings,
  CreditCard,
  Tag,
  HelpCircle,
  PhoneCall,
  ShieldCheck,
  Compass,
  ArrowRight,
  ExternalLink,
  Key
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { AiPlannerEngine, ParsedUserInput } from '../services/aiPlannerEngine';
import { AiCustomerAgentService, AgentChatMessage, AgentConfig, AgentCardAction } from '../services/aiCustomerAgent';
import { ItineraryOption, Stay, TransportTrip, Flight, DayItinerary, ItineraryActivity } from '../types';

export const AiPlannerView: React.FC<{ onOpenCart: () => void }> = ({ onOpenCart }) => {
  const { 
    activePersona, 
    addToCart, 
    draftPlan, 
    setDraftPlan, 
    showToast,
    setActiveTab
  } = useDemo();

  // Mode: 'advisor' (Tư vấn & CSKH 24/7) hoặc 'planner' (Lên lịch trình thông minh)
  const [activeMode, setActiveMode] = useState<'advisor' | 'planner'>('advisor');

  // Input & Status
  const [inputText, setInputText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Settings Modal
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [agentConfig, setAgentConfig] = useState<AgentConfig>(() => AiCustomerAgentService.getConfig());
  const [tempApiKey, setTempApiKey] = useState<string>(agentConfig.apiKey || '');
  const [tempProvider, setTempProvider] = useState<'local_agent' | 'gemini'>(agentConfig.provider === 'gemini' ? 'gemini' : 'local_agent');

  // ==========================================
  // 1. Advisor Chat Messages (Tư vấn CSKH)
  // ==========================================
  const [advisorMessages, setAdvisorMessages] = useState<AgentChatMessage[]>([
    AiCustomerAgentService.getInitialGreeting(activePersona)
  ]);

  // Quick Prompt Chips cho Chế độ Tư Vấn CSKH
  const advisorPromptChips = [
    { label: '💳 Ví MWG PayLater trả góp', query: 'Ví MWG PayLater trả góp như thế nào, có những kỳ hạn nào?' },
    { label: '💎 Điểm VIP & Ưu đãi', query: `Tôi có bao nhiêu điểm Quà Tặng VIP và dùng được giảm giá gì?` },
    { label: '🚌 Xe Phương Trang đi Đà Lạt', query: 'Xe khách Phương Trang đi Đà Lạt giá vé và giờ chạy ra sao?' },
    { label: '🏨 Khách sạn Vũng Tàu đẹp', query: 'Gợi ý khách sạn Vũng Tàu gần biển có buffet sáng?' },
    { label: '✈️ Vé bay Vietnam Airlines', query: 'Vé máy bay Vietnam Airlines đã gồm hành lý ký gửi chưa?' },
    { label: '🛡️ Chính sách đổi/hủy vé', query: 'Chính sách hoàn hủy đổi vé xe và khách sạn như thế nào?' }
  ];

  // ==========================================
  // 2. Planner State (Lập lịch trình)
  // ==========================================
  const [parsedInput, setParsedInput] = useState<ParsedUserInput | null>(() => draftPlan?.parsed || null);
  const [itineraryOptions, setItineraryOptions] = useState<ItineraryOption[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<'budget' | 'balanced' | 'luxury'>('balanced');
  const [expandedDay, setExpandedDay] = useState<number>(1);

  const [plannerMessages, setPlannerMessages] = useState<{ sender: 'user' | 'ai'; text: string; delta?: string }[]>([
    {
      sender: 'ai',
      text: `Dạ em là AI Lập Lịch Trình của Điện Máy Xanh. ${activePersona.honorific} ${activePersona.shortName} chỉ cần nói nhu cầu chuyến đi (đi đâu, mấy ngày, mấy người, ngân sách...), em sẽ tự động ghép trọn gói khách sạn, vé xe và điểm vui chơi tối ưu nhất nhé ạ!`
    }
  ]);

  const plannerPromptChips = [
    `Đi Đà Lạt 3 ngày, 2 người lớn 1 bé 5 tuổi, tổng 10 triệu, cần thang máy`,
    `Đi Hội An 2 ngày cuối tuần, ưu tiên yên tĩnh và ẩm thực phố cổ`,
    `Nhóm 6 người đi Nha Trang 3 ngày 2 đêm, cần chia phòng hợp lý`,
    `Công tác Hà Nội 2 ngày 1 đêm, bay sớm về muộn, khách sạn trung tâm`,
    `Nghỉ dưỡng Sa Pa săn mây 3 ngày, lịch nhẹ nhàng`
  ];

  // Auto scroll chat to bottom
  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [advisorMessages, plannerMessages, isProcessing]);

  // Cập nhật lời chào khi đổi Persona
  useEffect(() => {
    setAdvisorMessages([AiCustomerAgentService.getInitialGreeting(activePersona)]);
  }, [activePersona.id, activePersona.name, activePersona.honorific]);

  // Gửi tin nhắn trong chế độ Tư vấn CSKH
  const handleSendAdvisorMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isProcessing) return;

    const userMsg: AgentChatMessage = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setAdvisorMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsProcessing(true);

    try {
      const response = await AiCustomerAgentService.processMessage(userMsg.text, activePersona, advisorMessages);
      setAdvisorMessages(prev => [...prev, response]);
    } catch (error) {
      setAdvisorMessages(prev => [
        ...prev,
        {
          id: `msg_err_${Date.now()}`,
          sender: 'agent',
          text: `Dạ em xin lỗi ${activePersona.honorific}, hệ thống gặp chút gián đoạn. ${activePersona.honorific} vui lòng thử lại hoặc gọi tổng đài miễn phí 1800 1061 nhé ạ!`,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Xử lý gửi prompt trong chế độ Lập Lịch Trình
  const handleGeneratePlanner = (promptText: string) => {
    if (!promptText.trim()) return;

    setIsProcessing(true);
    const userMsg = promptText;
    setPlannerMessages(prev => [...prev, { sender: 'user', text: userMsg }]);

    setTimeout(() => {
      const parsed = AiPlannerEngine.parsePrompt(userMsg);
      setParsedInput(parsed);

      const options = AiPlannerEngine.generateItineraryOptions(parsed);
      setItineraryOptions(options);
      setSelectedOptionId('balanced');

      setDraftPlan({
        parsed,
        selectedOption: options[1]
      });

      setPlannerMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Dạ em đã hoàn thành 3 phương án tối ưu cho ${activePersona.honorific} ${activePersona.shortName} tại ${parsed.destinationName} (${parsed.durationDays} ngày, ${parsed.adults} người lớn${parsed.children > 0 ? `, ${parsed.children} bé` : ''}). ${activePersona.honorific} xem qua và bảo em điều chỉnh nhé ạ!`
        }
      ]);

      setIsProcessing(false);
      setInputText('');
    }, 600);
  };

  // Sửa lịch trình bằng chat
  const handleRefinePlanner = (action: string) => {
    if (!parsedInput || itineraryOptions.length === 0) return;

    setIsProcessing(true);
    setPlannerMessages(prev => [...prev, { sender: 'user', text: action }]);

    setTimeout(() => {
      let deltaText = '';
      if (action.includes('Đổi khách sạn')) {
        deltaText = `Dạ em đã đổi sang khách sạn Colline ngay sát chợ Đà Lạt cho ${activePersona.honorific} (+200.000đ/đêm).`;
      } else if (action.includes('Bỏ một điểm') || action.includes('nghỉ')) {
        deltaText = `Dạ em đã giảm bớt 1 điểm tham quan buổi chiều để bé có thêm thời gian nghỉ ngơi (-150.000đ).`;
      } else if (action.includes('Giảm 1 triệu')) {
        deltaText = `Dạ em đã chuyển sang phương án Tiết Kiệm Hơn: xe giường nằm cao cấp (-1.100.000đ).`;
        setSelectedOptionId('budget');
      } else if (action.includes('máy bay')) {
        deltaText = `Dạ em đã đổi sang vé bay Vietnam Airlines khứ hồi giờ đẹp cho ${activePersona.honorific} (+1.320.000đ).`;
        setSelectedOptionId('luxury');
      } else if (action.includes('tuần sau')) {
        deltaText = `Dạ em đã dời toàn bộ lịch sang tuần sau (17/11 - 19/11). Ưu đãi vẫn được giữ nguyên ạ!`;
      } else {
        deltaText = `Dạ em đã cập nhật theo đúng yêu cầu của ${activePersona.honorific} rồi nhé ạ!`;
      }
      showToast(deltaText);

      setPlannerMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: deltaText,
          delta: deltaText
        }
      ]);

      setIsProcessing(false);
    }, 500);
  };

  // Xử lý khi click vào Action Card của Agent
  const handleCardAction = (card: AgentCardAction) => {
    if (card.type === 'paylater') {
      onOpenCart();
    } else if (card.type === 'itinerary') {
      setActiveMode('planner');
      handleGeneratePlanner('Đi Đà Lạt 3 ngày, 2 người lớn 1 bé 5 tuổi, tổng 10 triệu');
    } else if (card.type === 'support') {
      setActiveTab('support');
    } else if (card.type === 'transport' && card.payload) {
      const t = card.payload as TransportTrip;
      addToCart({
        cartItemId: `trans_${t.id}_${Date.now()}`,
        category: 'bus_train',
        partnerName: t.operator,
        title: `${t.operator} - ${t.seatClass}`,
        subtitle: `${t.fromCity} ➔ ${t.toCity} (${t.departureTime})`,
        destinationName: t.toCity,
        dateStart: t.date,
        quantity: 1,
        unitPrice: t.pricePerTicket,
        totalPrice: t.pricePerTicket,
        details: { seatClass: t.seatClass, departureTime: t.departureTime },
        eligibleForCampaignIds: ['camp_vip10']
      });
      onOpenCart();
    } else if (card.type === 'stay' && card.payload) {
      const s = card.payload as Stay;
      const room = s.rooms[0];
      addToCart({
        cartItemId: `stay_${s.id}_${Date.now()}`,
        category: 'stay',
        partnerName: s.partner,
        title: s.name,
        subtitle: `${room.name} • 2 đêm (15/11 - 17/11)`,
        destinationName: s.address.split(',').pop()?.trim() || 'Việt Nam',
        dateStart: '2026-11-15',
        dateEnd: '2026-11-17',
        quantity: 1,
        unitPrice: room.pricePerNight * 2,
        totalPrice: room.pricePerNight * 2,
        details: { roomName: room.name, nights: 2, adults: 2 },
        eligibleForCampaignIds: s.campaignIds || ['camp_vip10']
      });
      onOpenCart();
    } else if (card.type === 'flight' && card.payload) {
      const f = card.payload as Flight;
      addToCart({
        cartItemId: `flight_${f.id}_${Date.now()}`,
        category: 'flight',
        partnerName: f.airline,
        title: `${f.airline} (${f.flightNumber})`,
        subtitle: `${f.fromCity} ➔ ${f.toCity} (${f.departureTime})`,
        destinationName: f.toCity,
        dateStart: f.date,
        quantity: 1,
        unitPrice: f.pricePerAdult,
        totalPrice: f.pricePerAdult,
        details: { flightNumber: f.flightNumber, cabinClass: f.cabinClass },
        eligibleForCampaignIds: f.campaignIds || ['camp_vip10']
      });
      onOpenCart();
    } else {
      onOpenCart();
    }
  };

  const currentOption = itineraryOptions.find(o => o.id === selectedOptionId) || itineraryOptions[1];

  const handleCreateCartFromPlanner = () => {
    if (!currentOption || !parsedInput) return;
    const items = AiPlannerEngine.convertOptionToCartItems(currentOption, parsedInput);
    for (const item of items) {
      addToCart(item);
    }
    showToast(`Đã tạo giỏ thành công với ${items.length} dịch vụ từ kế hoạch AI!`);
    onOpenCart();
  };

  const handleSaveSettings = () => {
    const newCfg: AgentConfig = {
      provider: tempProvider,
      apiKey: tempApiKey.trim(),
      model: 'gemini-1.5-flash'
    };
    AiCustomerAgentService.saveConfig(newCfg);
    setAgentConfig(newCfg);
    setShowSettingsModal(false);
    showToast(`Đã cập nhật chế độ: ${tempProvider === 'gemini' ? 'Google Gemini 1.5 Flash (Live AI)' : 'Agent Tích Hợp Sẵn'}`);
  };

  return (
    <div className="w-full min-h-full bg-[#FAFAFA] flex flex-col pb-28 select-none font-sans relative">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#0071AF] to-[#005E93] text-white px-4 py-3 shadow-md sticky top-0 z-20 font-sans">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center shadow-xs">
                <Bot className="w-5 h-5 text-[#FED100]" />
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 ring-2 ring-[#0071AF] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm tracking-tight">AI Trợ Lý Khách Hàng</h1>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-[#FED100] text-[#1D2129]">
                  {agentConfig.provider === 'gemini' && agentConfig.apiKey ? 'GEMINI LIVE' : 'AGENT 24/7'}
                </span>
              </div>
              <p className="text-[10px] text-white/80 font-normal">
                Tư vấn dịch vụ, ví MWG PayLater & Quà Tặng VIP cho {activePersona.honorific} {activePersona.shortName}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowSettingsModal(true)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer text-white"
            title="Cài đặt mô hình AI Agent"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switcher Pill */}
        <div className="mt-2.5 grid grid-cols-2 gap-1 bg-black/20 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveMode('advisor')}
            className={`py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMode === 'advisor'
                ? 'bg-white text-[#0071AF] shadow-xs'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Tư vấn & CSKH 24/7</span>
          </button>

          <button
            onClick={() => setActiveMode('planner')}
            className={`py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMode === 'planner'
                ? 'bg-white text-[#0071AF] shadow-xs'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FED100]" />
            <span>Lập lịch trình thông minh</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODE 1: TƯ VẤN & CHĂM SÓC KHÁCH HÀNG (CUSTOMER CARE AGENT)   */}
      {/* ============================================================ */}
      {activeMode === 'advisor' && (
        <div className="px-3.5 py-3 space-y-3 flex-1 overflow-y-auto">
          {/* Quick Prompts Bar */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Chủ đề tư vấn nhanh:</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
              {advisorPromptChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendAdvisorMessage(chip.query)}
                  className="px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-[#0074C8] hover:bg-sky-50 text-slate-700 whitespace-nowrap font-medium transition cursor-pointer shadow-2xs shrink-0"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages Stream */}
          <div className="space-y-3 pt-1">
            {advisorMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'agent' && (
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-sm font-bold shrink-0 shadow-xs ring-2 ring-white">
                    ⭐
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#0074C8] text-white rounded-br-xs font-medium'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>
                    <div className={`text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-sky-200' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </div>
                  </div>

                  {/* Action Card đính kèm câu trả lời của Agent */}
                  {msg.actionCard && (
                    <div className="bg-white rounded-2xl p-3 border-2 border-sky-300 shadow-md space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-xs text-slate-900">{msg.actionCard.title}</span>
                            {msg.actionCard.badge && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#0074C8]/10 text-[#0074C8]">
                                {msg.actionCard.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{msg.actionCard.subtitle}</div>
                        </div>

                        {msg.actionCard.price && (
                          <div className="text-right shrink-0 font-black text-xs text-[#0074C8]">
                            {msg.actionCard.price.toLocaleString('vi-VN')}đ
                          </div>
                        )}
                      </div>

                      {msg.actionCard.highlight && (
                        <div className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                          ✓ {msg.actionCard.highlight}
                        </div>
                      )}

                      <button
                        onClick={() => handleCardAction(msg.actionCard!)}
                        className="w-full py-2 bg-[#FED100] hover:bg-[#E5BC00] text-[#1D2129] font-black text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>{msg.actionCard.actionLabel || 'Xem ngay'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex items-center gap-2 text-xs text-slate-400 pl-10">
                <div className="w-2 h-2 rounded-full bg-[#0074C8] animate-ping" />
                <span>AI Agent đang tra cứu catalog & chính sách Điện Máy Xanh...</span>
              </div>
            )}
            <div ref={chatScrollRef} />
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODE 2: LẬP LỊCH TRÌNH THÔNG MINH (AI PLANNER & CART GENERATOR) */}
      {/* ============================================================ */}
      {activeMode === 'planner' && (
        <div className="px-3.5 py-3 space-y-3 flex-1 overflow-y-auto">
          {/* Quick Prompts Bar */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Gợi ý chuyến đi mẫu:</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
              {plannerPromptChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleGeneratePlanner(chip)}
                  className="px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-[#0074C8] hover:bg-sky-50 text-slate-700 whitespace-nowrap font-medium transition cursor-pointer shadow-2xs shrink-0"
                >
                  {chip.split(',')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="space-y-3 pt-1">
            {plannerMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-2.5 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-sm font-bold shrink-0 shadow-xs ring-2 ring-white">
                    ⭐
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#0074C8] text-white rounded-br-xs font-medium'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.delta && (
                    <div className="mt-1.5 pt-1.5 border-t border-slate-100 text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>{msg.delta}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex items-center gap-2 text-xs text-slate-400 pl-10">
                <div className="w-2 h-2 rounded-full bg-[#0074C8] animate-ping" />
                <span>AI đang tìm phương án tối ưu theo catalog...</span>
              </div>
            )}
          </div>

          {/* 3 Options Tabs (Tiết kiệm, Cân bằng, Sang trọng) */}
          {itineraryOptions.length > 0 && parsedInput && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase">
                <span>3 Phương án gợi ý:</span>
                <span className="text-[10px] text-[#0074C8] font-bold lowercase">
                  (đã khớp budget {parsedInput.budgetTotal?.toLocaleString('vi-VN')}đ)
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {itineraryOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSelectedOptionId(opt.id);
                      setDraftPlan({ parsed: parsedInput, selectedOption: opt });
                    }}
                    className={`p-2.5 rounded-2xl border text-center transition cursor-pointer flex flex-col justify-between ${
                      selectedOptionId === opt.id
                        ? 'border-[#0074C8] bg-sky-50 text-[#0074C8] font-bold ring-2 ring-[#0074C8] shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-[10px] text-slate-500 font-semibold line-clamp-1">{opt.name}</div>
                    <div className="font-extrabold text-xs text-[#0074C8] mt-1">
                      {opt.estimatedTotalCost.toLocaleString('vi-VN')}đ
                    </div>
                  </button>
                ))}
              </div>

              {/* Chi tiết từng ngày */}
              {currentOption && (
                <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{currentOption.name}</div>
                      <div className="text-[11px] text-slate-500">{currentOption.tagline}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-black text-[#0074C8]">
                        {currentOption.estimatedTotalCost.toLocaleString('vi-VN')}đ
                      </div>
                      <div className="text-[9px] text-slate-400">trọn gói dự kiến</div>
                    </div>
                  </div>

                  {/* Lịch ngày */}
                  <div className="space-y-2 pt-1 border-t border-slate-100">
                    {currentOption.days.map((day: DayItinerary) => (
                      <div key={day.dayNumber} className="border border-slate-100 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setExpandedDay(expandedDay === day.dayNumber ? 0 : day.dayNumber)}
                          className="w-full p-2 bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-700 cursor-pointer"
                        >
                          <span>Ngày {day.dayNumber}: {day.theme}</span>
                          {expandedDay === day.dayNumber ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        {expandedDay === day.dayNumber && (
                          <div className="p-2 space-y-1.5 bg-white text-xs">
                            {day.activities.map((act: ItineraryActivity, idx: number) => (
                              <div key={idx} className="flex items-start gap-2 border-b border-slate-100 pb-1.5 last:border-b-0">
                                <span className="font-mono text-[10px] text-slate-500 w-16 shrink-0">{act.timeSlot}</span>
                                <div className="flex-1">
                                  <div className="font-semibold text-slate-800">{act.title}</div>
                                  <div className="text-[10px] text-slate-500">{act.description}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Fast Refinement Chips */}
                  <div className="pt-2 space-y-1.5">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Bot className="w-3.5 h-3.5 text-[#0074C8]" />
                      <span>Yêu cầu Chatbot điều chỉnh nhanh:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 text-[11px]">
                      <button
                        onClick={() => handleRefinePlanner('Đổi khách sạn gần trung tâm hơn')}
                        className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 border border-slate-200 transition cursor-pointer"
                      >
                        🏨 Đổi khách sạn gần trung tâm
                      </button>
                      <button
                        onClick={() => handleRefinePlanner('Bỏ một điểm để bé nghỉ')}
                        className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 border border-slate-200 transition cursor-pointer"
                      >
                        👶 Bỏ bớt 1 điểm để bé nghỉ trưa
                      </button>
                      <button
                        onClick={() => handleRefinePlanner('Giảm 1 triệu')}
                        className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 border border-slate-200 transition cursor-pointer"
                      >
                        💰 Giảm 1 triệu
                      </button>
                      <button
                        onClick={() => handleRefinePlanner('Chuyển sang đi máy bay')}
                        className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 border border-slate-200 transition cursor-pointer"
                      >
                        ✈️ Chuyển sang đi máy bay
                      </button>
                    </div>
                  </div>

                  {/* Create Cart Button */}
                  <div className="pt-2">
                    <button
                      onClick={handleCreateCartFromPlanner}
                      className="w-full py-3 bg-[#FED100] hover:bg-[#E5BC00] text-[#1D2129] font-black text-xs sm:text-sm rounded-xl shadow transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#1D2129] stroke-[2.2]" />
                      <span>Tạo giỏ dịch vụ & Đặt ngay ({currentOption.estimatedTotalCost.toLocaleString('vi-VN')}₫)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          <div ref={chatScrollRef} />
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. STICKY BOTTOM INPUT BAR                                   */}
      {/* ============================================================ */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[440px] mx-auto bg-white/95 backdrop-blur border-t border-slate-200 p-2.5 z-30 shadow-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (activeMode === 'advisor') {
              handleSendAdvisorMessage(inputText);
            } else {
              handleGeneratePlanner(inputText);
            }
          }}
          className="flex items-center gap-2 bg-slate-100 rounded-2xl px-3 py-2 border border-slate-200 focus-within:border-[#0071AF] focus-within:bg-white transition"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              activeMode === 'advisor'
                ? `Nhắn tin cho Trợ lý AI (VD: "Ví PayLater trả góp ra sao?")...`
                : `Nhắn cho Chatbot (VD: "Đi Đà Lạt 3 ngày, 2 người lớn 1 bé...")...`
            }
            className="flex-1 bg-transparent text-xs text-[#1D2129] outline-none placeholder:text-slate-400 font-normal"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isProcessing}
            className={`p-2 rounded-xl transition cursor-pointer ${
              inputText.trim() && !isProcessing
                ? 'bg-[#0071AF] text-white shadow-xs hover:bg-[#005E93]'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* ============================================================ */}
      {/* 4. MODAL CÀI ĐẶT AGENT (AGENT SETTINGS & GEMINI LIVE)         */}
      {/* ============================================================ */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-100 text-[#0074C8] flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-slate-900">Cấu hình AI Agent</h3>
                  <p className="text-[10px] text-slate-500">Tùy chọn mô hình tư vấn khách hàng</p>
                </div>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">Chọn mô hình xử lý:</label>

                {/* Option 1: Local Intelligent Agent */}
                <div
                  onClick={() => setTempProvider('local_agent')}
                  className={`p-3 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                    tempProvider === 'local_agent'
                      ? 'border-[#0074C8] bg-sky-50/70 ring-2 ring-[#0074C8]'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xl shrink-0">🤖</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Agent Tích Hợp Sẵn (Mặc định)</span>
                      <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                        Khuyên dùng
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Phản hồi tức thì, 100% nghiệp vụ Điện Máy Xanh, Quà Tặng VIP, MWG PayLater & FUTA. Không cần API Key.
                    </p>
                  </div>
                </div>

                {/* Option 2: Live Google Gemini */}
                <div
                  onClick={() => setTempProvider('gemini')}
                  className={`p-3 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                    tempProvider === 'gemini'
                      ? 'border-[#0074C8] bg-sky-50/70 ring-2 ring-[#0074C8]'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xl shrink-0">✨</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Google Gemini 1.5 Flash (Live AI)</span>
                      <span className="text-[9px] font-black bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                        LLM Trực tiếp
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Gọi trực tiếp mô hình ngôn ngữ lớn của Google để tư vấn và trò chuyện mở theo ngữ cảnh thực.
                    </p>
                  </div>
                </div>
              </div>

              {/* Input API Key nếu chọn Gemini */}
              {tempProvider === 'gemini' && (
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2 animate-in fade-in duration-200">
                  <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-amber-500" />
                    <span>Nhập Google Gemini API Key:</span>
                  </label>
                  <input
                    type="password"
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 font-mono text-xs text-slate-900 outline-none focus:border-[#0074C8]"
                  />
                  <p className="text-[10px] text-slate-500">
                    * Khóa được bảo mật trong LocalStorage trình duyệt của bạn, không gửi về bất kỳ máy chủ trung gian nào.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSaveSettings}
                className="px-5 py-2 rounded-xl bg-[#0074C8] hover:bg-[#005A9E] text-white text-xs font-black shadow transition cursor-pointer"
              >
                Lưu cấu hình Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
