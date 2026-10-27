import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  MoreHorizontal, 
  Sparkles, 
  Send, 
  MapPin, 
  Camera, 
  Bed, 
  Users, 
  Palmtree, 
  Wallet, 
  Plane, 
  Utensils, 
  Calendar, 
  SlidersHorizontal, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  Clock, 
  X, 
  CreditCard, 
  ShieldCheck, 
  ShoppingBag,
  RotateCcw,
  Minus,
  Plus,
  Building2
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { 
  AiCustomerAgentService, 
  AgentChatMessage, 
  TravelProposalCardData, 
  DiscoveryContext 
} from '../services/aiCustomerAgent';
import { DatePickerSheet, addDays, toISO, fmtDay, diffDays } from './booking/ui';
import { STAYS, TRANSPORTS, FLIGHTS } from '../data/catalog';
import { AlternativeOffersCarousel } from './booking/AlternativeOffersCarousel';
import { PayLaterConsultationModal, PayLaterPackage } from './booking/PayLaterConsultationModal';

/* ------------------------------------------------------------------ */
/* Cute Robot Avatar matching Photo 2                                 */
/* ------------------------------------------------------------------ */
export const CuteRobotAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const dim = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  return (
    <div className={`${dim} rounded-full bg-[#FED100] p-1 flex items-center justify-center shrink-0 shadow-xs border border-amber-300/80`}>
      <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
        {/* Antenna */}
        <line x1="18" y1="2" x2="18" y2="8" stroke="#0071AF" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="18" cy="3" r="2.2" fill="#0071AF" />
        {/* Ears */}
        <rect x="2.5" y="14" width="3" height="6" rx="1.5" fill="#0071AF" />
        <rect x="30.5" y="14" width="3" height="6" rx="1.5" fill="#0071AF" />
        {/* Head */}
        <rect x="5.5" y="8" width="25" height="20" rx="6" fill="#0071AF" />
        {/* Face Screen */}
        <rect x="8.5" y="11" width="19" height="14" rx="4" fill="#005A8C" />
        {/* Eyes */}
        <ellipse cx="13.5" cy="16.5" rx="2.5" ry="3" fill="#FFFFFF" />
        <ellipse cx="22.5" cy="16.5" rx="2.5" ry="3" fill="#FFFFFF" />
        <ellipse cx="14.2" cy="16.2" rx="1" ry="1.2" fill="#005A8C" />
        <ellipse cx="23.2" cy="16.2" rx="1" ry="1.2" fill="#005A8C" />
        {/* Smile */}
        <path d="M14 21 Q18 24.5 22 21" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Helper render markdown bold & highlights:                          */
/* Làm nổi bật **Trợ lý du lịch**, **Ví MWG PayLater**, **0%**...    */
/* ------------------------------------------------------------------ */
export const FormattedChatMessage: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  const lines = text.split('\n');

  return (
    <div className="space-y-1 text-xs sm:text-[13px] leading-relaxed">
      {lines.map((line, lIdx) => {
        // Tách các đoạn **in đậm**
        const parts = line.split(/(\*\*.*?\*\*)/g);

        return (
          <div key={lIdx} className="min-h-[1.1rem]">
            {parts.map((part, pIdx) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                const content = part.slice(2, -2);
                const isHighlight = 
                  content.includes('Trợ lý') || 
                  content.includes('PayLater') || 
                  content.includes('Điện Máy Xanh') || 
                  content.includes('Quà Tặng VIP') ||
                  content.includes('0% lãi suất') ||
                  content.includes('0đ hôm nay');

                return (
                  <strong
                    key={pIdx}
                    className={`font-black ${
                      isHighlight
                        ? 'text-[#0071AF] bg-sky-100/70 px-1.5 py-0.5 rounded border border-sky-200/60 inline-block shadow-2xs mx-0.5'
                        : 'text-slate-900 font-extrabold'
                    }`}
                  >
                    {content}
                  </strong>
                );
              }
              return <span key={pIdx}>{part}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export const AiPlannerView: React.FC<{ onOpenCart: () => void }> = ({ onOpenCart }) => {
  const { 
    activePersona, 
    addToCart, 
    showToast,
    setActiveTab,
    setIsInsideMiniApp
  } = useDemo();

  // State hội thoại và bóc tách
  const [messages, setMessages] = useState<AgentChatMessage[]>([
    AiCustomerAgentService.getInitialGreeting(activePersona)
  ]);
  const [discoveryCtx, setDiscoveryCtx] = useState<DiscoveryContext>({ step: 'greeting' });
  const [inputText, setInputText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Modal lịch trình chi tiết
  const [activeProposalModal, setActiveProposalModal] = useState<TravelProposalCardData | null>(null);

  // Modal chọn ngày đi
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState<string>(() => addDays(toISO(new Date()), 7));
  const [selectedEndDate, setSelectedEndDate] = useState<string>(() => addDays(toISO(new Date()), 10));

  // Modal chỉnh ngân sách & thêm lựa chọn
  const [isBudgetSheetOpen, setIsBudgetSheetOpen] = useState<boolean>(false);
  const [isOptionSheetOpen, setIsOptionSheetOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // PayLater modal & Alternative Offers Carousel states
  const [isPayLaterModalOpen, setIsPayLaterModalOpen] = useState<boolean>(false);
  const [isAlternativeSheetOpen, setIsAlternativeSheetOpen] = useState<boolean>(false);
  const [alternativeTab, setAlternativeTab] = useState<'stay' | 'flight' | 'transport' | 'activity'>('stay');

  const handleSelectAlternativeStay = (stay: any) => {
    const lastProposalMsg = [...messages].reverse().find(m => m.proposalCard);
    if (lastProposalMsg && lastProposalMsg.proposalCard) {
      const prevCard = lastProposalMsg.proposalCard;
      const newRoom = stay.rooms?.[0];
      const newPrice = newRoom?.pricePerNight || 1500000;
      
      const updatedCard: TravelProposalCardData = {
        ...prevCard,
        resortName: stay.name,
        resortImage: stay.coverImage,
        stars: stay.stars || 4,
        roomName: newRoom?.name || 'Deluxe King',
        amenitiesHighlight: stay.amenities?.slice(0, 3).join(', ') || prevCard.amenitiesHighlight,
        baseStayPerNight: newPrice
      };

      const recalculated = AiCustomerAgentService.recalculateProposalForDays(updatedCard, updatedCard.durationDays);
      setMessages(prev => prev.map(m => m.id === lastProposalMsg.id ? { ...m, proposalCard: recalculated } : m));
      if (activeProposalModal?.id === prevCard.id) {
        setActiveProposalModal(recalculated);
      }
      setIsAlternativeSheetOpen(false);
      showToast(`Đã đổi sang ${stay.name} (${recalculated.totalEstimateFormatted})!`);
    }
  };

  const handleSelectAlternativeFlight = (flight: any) => {
    showToast(`Đã chọn chuyến bay ${flight.airline} (${flight.flightNumber}) lúc ${flight.departureTime}!`);
    setIsAlternativeSheetOpen(false);
  };

  const handleSelectAlternativeTransport = (trans: any) => {
    showToast(`Đã chọn xe ${trans.operator} lúc ${trans.departureTime}!`);
    setIsAlternativeSheetOpen(false);
  };

  const handleSelectPayLaterPackage = (pkg: PayLaterPackage) => {
    setIsPayLaterModalOpen(false);
    handleSendMessage(`Gói ${pkg.destinationName} (${pkg.monthly12.toLocaleString('vi-VN')}đ/tháng)`);
  };

  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Tự động cuộn xuống cuối đoạn chat
  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  // Cập nhật khi đổi Persona
  useEffect(() => {
    setMessages([AiCustomerAgentService.getInitialGreeting(activePersona)]);
    setDiscoveryCtx({ step: 'greeting' });
  }, [activePersona.id, activePersona.name, activePersona.honorific]);

  // Xử lý tăng / giảm số ngày và cập nhật lại chi phí tương ứng
  const handleAdjustDays = (msgId: string, currentCard: TravelProposalCardData, delta: number) => {
    const newDays = currentCard.durationDays + delta;
    if (newDays < 1 || newDays > 10) return;

    const updatedCard = AiCustomerAgentService.recalculateProposalForDays(currentCard, newDays);

    // Cập nhật thẻ trong messages
    setMessages(prev => prev.map(m => {
      if (m.id === msgId && m.proposalCard) {
        return { ...m, proposalCard: updatedCard };
      }
      return m;
    }));

    if (activeProposalModal && activeProposalModal.id === currentCard.id) {
      setActiveProposalModal(updatedCard);
    }

    showToast(`Đã cập nhật: ${updatedCard.durationDays} ngày ${updatedCard.durationNights} đêm (${updatedCard.totalEstimateFormatted})`);
  };

  // Gửi tin nhắn
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isProcessing) return;

    const userText = textToSend.trim();
    const nowStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

    // Tin nhắn của người dùng
    const userMsg: AgentChatMessage = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: nowStr
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsProcessing(true);

    try {
      // Gọi service xử lý hội thoại theo chu trình Discovery toàn quốc
      const { response, newContext } = await AiCustomerAgentService.processMessage(
        userText,
        activePersona,
        messages,
        discoveryCtx
      );

      setDiscoveryCtx(newContext);

      // Nếu có userSummaryBadge (chuỗi tóm tắt như Ảnh 2: "Phú Quốc · 3 người · 3 ngày · 20 triệu"),
      // cập nhật vào tin nhắn của user vừa gửi để hiển thị đúng chuẩn pill!
      if (response.userSummaryBadge) {
        setMessages(prev => prev.map(m => m.id === userMsg.id ? { ...m, userSummaryBadge: response.userSummaryBadge } : m));
      }

      setMessages(prev => [...prev, response]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: `msg_err_${Date.now()}`,
          sender: 'agent',
          text: `Dạ em xin lỗi ${activePersona.honorific}, hệ thống gặp chút gián đoạn. ${activePersona.honorific} vui lòng thử lại nhé ạ!`,
          timestamp: nowStr
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset cuộc trò chuyện
  const handleResetConversation = () => {
    setMessages([AiCustomerAgentService.getInitialGreeting(activePersona)]);
    setDiscoveryCtx({ step: 'greeting' });
    setIsMenuOpen(false);
    showToast('Đã làm mới cuộc trò chuyện với Trợ lý AI.');
  };

  // Thêm gói du lịch vào Giỏ hàng & Mở thanh toán MWG PayLater
  const handleBookProposal = (proposal: TravelProposalCardData) => {
    // 1. Lưu trú
    addToCart({
      cartItemId: `prop_stay_${Date.now()}`,
      category: 'stay',
      partnerName: 'Điện Máy Xanh Du Lịch',
      title: `${proposal.resortName} (${proposal.roomName})`,
      subtitle: `${proposal.durationDays} ngày ${proposal.durationNights} đêm • ${proposal.paxText}`,
      destinationName: proposal.destinationName,
      dateStart: selectedStartDate,
      quantity: 1,
      unitPrice: proposal.breakdown.stayAmount,
      totalPrice: proposal.breakdown.stayAmount,
      details: {
        roomName: proposal.roomName,
        amenities: proposal.amenitiesHighlight,
        policy: 'Miễn phí hủy trước 48h'
      },
      eligibleForCampaignIds: ['camp_vip10', 'camp_family200']
    });

    // 2. Di chuyển
    if (proposal.breakdown.transportAmount > 0) {
      addToCart({
        cartItemId: `prop_trans_${Date.now()}`,
        category: proposal.destinationId === 'phuquoc' ? 'flight' : 'bus_train',
        partnerName: proposal.destinationId === 'phuquoc' ? 'Vietnam Airlines' : 'Phương Trang FUTA',
        title: `Vé khứ hồi ${proposal.destinationName} (${proposal.paxText})`,
        subtitle: `Khởi hành ${selectedStartDate} ➔ Về ${selectedEndDate}`,
        destinationName: proposal.destinationName,
        dateStart: selectedStartDate,
        quantity: proposal.adults,
        unitPrice: Math.round(proposal.breakdown.transportAmount / Math.max(1, proposal.adults)),
        totalPrice: proposal.breakdown.transportAmount,
        details: {
          departureTime: '08:30',
          seatClass: 'Khứ hồi tiêu chuẩn'
        },
        eligibleForCampaignIds: ['camp_vip10']
      });
    }

    setActiveProposalModal(null);
    showToast(`Đã thêm trọn gói ${proposal.packageTitle} vào giỏ hàng!`);
    onOpenCart();
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col font-sans select-none relative">
      {/* ============================================================ */}
      {/* 1. Header chuẩn Ảnh 2: Back | Robot Avatar | Trợ lý du lịch | ... */}
      {/* ============================================================ */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-3.5 py-2.5 border-b border-slate-100 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2.5">
          {/* Nút quay lại */}
          <button
            onClick={() => setActiveTab('explore')}
            className="p-1 -ml-1 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-full transition cursor-pointer"
            title="Quay lại Khám phá"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.2] text-[#0071AF]" />
          </button>

          {/* Robot Avatar & Title */}
          <CuteRobotAvatar size="md" />

          <div className="flex flex-col leading-tight">
            <span className="font-extrabold text-[15px] text-slate-900 tracking-tight">Trợ lý du lịch</span>
            <span className="text-[11px] font-medium text-slate-400">Quà Tặng VIP</span>
          </div>
        </div>

        {/* Nút menu 3 chấm */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition cursor-pointer"
            title="Tùy chọn"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-40 text-xs animate-in fade-in zoom-in-95">
              <button
                onClick={handleResetConversation}
                className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 font-medium text-slate-700 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>Bắt đầu lại đoạn chat</span>
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsPayLaterModalOpen(true);
                }}
                className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 font-medium text-slate-700 cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-[#0071AF]" />
                <span>Ví MWG PayLater (0% lãi)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. Chat Stream & Thẻ Đề Xuất Chuẩn Ảnh 2                      */}
      {/* ============================================================ */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-28">
        {messages.map((msg) => {
          // --- TIN NHẮN TỪ KHÁCH HÀNG (USER) ---
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex flex-col items-end gap-1">
                {/* Nếu có badge tóm tắt (chuẩn Ảnh 2: [Icon User] Phú Quốc · 3 người · 3 ngày · 20 triệu) */}
                {msg.userSummaryBadge ? (
                  <div className="bg-[#0071AF] text-white rounded-2xl rounded-tr-xs px-4 py-2.5 shadow-xs flex items-center gap-2 max-w-[90%]">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <Users className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-xs font-semibold tracking-tight">{msg.userSummaryBadge}</span>
                  </div>
                ) : (
                  <div className="bg-[#0071AF] text-white rounded-2xl rounded-tr-xs px-4 py-2.5 shadow-xs text-xs font-medium leading-relaxed max-w-[85%]">
                    {msg.text}
                  </div>
                )}
                <span className="text-[10px] text-slate-400 pr-1">{msg.timestamp}</span>
              </div>
            );
          }

          // --- TIN NHẮN TỪ TRỢ LÝ (AGENT) ---
          return (
            <div key={msg.id} className="space-y-3">
              {/* Lời chào / Phản hồi format đậm rõ nét */}
              <div className="flex items-start gap-2.5">
                <CuteRobotAvatar size="sm" />
                <div className="max-w-[88%] space-y-1">
                  <div className="bg-[#F1F5F9] text-slate-800 rounded-2xl rounded-tl-xs px-4 py-2.5 shadow-2xs font-normal">
                    <FormattedChatMessage text={msg.text} />
                  </div>
                  <span className="text-[10px] text-slate-400 pl-1 block">{msg.timestamp}</span>
                </div>
              </div>

              {/* ACTION CARD (Nếu có trả lời về PayLater, FUTA, Support...) */}
              {msg.actionCard && (
                <div className="ml-9 max-w-sm bg-white rounded-2xl p-3.5 border-2 border-sky-200 shadow-sm space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-slate-900">{msg.actionCard.title}</span>
                        {msg.actionCard.badge && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#0071AF]/10 text-[#0071AF]">
                            {msg.actionCard.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{msg.actionCard.subtitle}</div>
                    </div>
                  </div>

                  {msg.actionCard.highlight && (
                    <div className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                      ✓ {msg.actionCard.highlight}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (msg.actionCard?.type === 'paylater') setIsPayLaterModalOpen(true);
                      else if (msg.actionCard?.type === 'support') setActiveTab('support');
                      else onOpenCart();
                    }}
                    className="w-full py-2 bg-[#FED100] hover:bg-[#E5BC00] text-[#1D2129] font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                  >
                    {msg.actionCard.actionLabel || 'Xem chi tiết'}
                  </button>
                </div>
              )}

              {/* ========================================================= */}
              {/* THẺ ĐỀ XUẤT CHUYẾN ĐI (RICH TRAVEL PROPOSAL CARD - ẢNH 2) */}
              {/* ========================================================= */}
              {msg.proposalCard && (
                <div className="ml-1 sm:ml-9 max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100/90 space-y-0 animate-in fade-in duration-300">
                  {/* Hero Image */}
                  <div className="relative w-full h-48 sm:h-52 bg-slate-200 overflow-hidden">
                    <img
                      src={msg.proposalCard.resortImage}
                      alt={msg.proposalCard.resortName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/destinations/phuquoc.jpg';
                      }}
                    />

                    {/* Overlay Top-Left: Điểm đến + Số ngày đêm */}
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-sm">
                      <MapPin className="w-4 h-4 text-white shrink-0" />
                      <div className="leading-tight">
                        <div className="font-extrabold text-xs text-white">{msg.proposalCard.destinationName}</div>
                        <div className="text-[10px] text-white/90">{msg.proposalCard.durationDays} ngày {msg.proposalCard.durationNights} đêm</div>
                      </div>
                    </div>

                    {/* Overlay Bottom-Right: Tên Resort */}
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white rounded-lg px-2.5 py-1 flex items-center gap-1.5 text-[11px] font-medium shadow-sm">
                      <Camera className="w-3.5 h-3.5 text-white/90" />
                      <span className="truncate max-w-[200px]">{msg.proposalCard.resortName}</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-4 space-y-3">
                    {/* Title, Subtitle & Stars */}
                    <div>
                      <h3 className="text-lg font-black text-slate-900 tracking-tight">
                        {msg.proposalCard.packageTitle}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {msg.proposalCard.resortName}
                      </p>
                      {/* 5 Stars */}
                      <div className="flex items-center gap-0.5 text-amber-400 text-xs mt-1">
                        {'★'.repeat(msg.proposalCard.stars)}
                      </div>
                    </div>

                    {/* Bộ điều chỉnh số ngày (+ / -) kèm tự động tính lại chi phí */}
                    <div className="flex items-center justify-between bg-[#F8FAFC] border border-slate-200/90 rounded-2xl px-3.5 py-2 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-[#0071AF]" />
                        <span>Thời gian:</span>
                        <span className="font-extrabold text-[#0071AF]">
                          {msg.proposalCard.durationDays} ngày {msg.proposalCard.durationNights} đêm
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-0.5 shadow-2xs">
                        <button
                          onClick={() => handleAdjustDays(msg.id, msg.proposalCard!, -1)}
                          disabled={msg.proposalCard.durationDays <= 1}
                          className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                          title="Giảm 1 ngày (tự giảm chi phí)"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-[11px] font-bold text-slate-600 px-1 min-w-[28px] text-center">
                          {msg.proposalCard.durationDays}N
                        </span>
                        <button
                          onClick={() => handleAdjustDays(msg.id, msg.proposalCard!, 1)}
                          disabled={msg.proposalCard.durationDays >= 10}
                          className="w-6 h-6 rounded-lg bg-[#FED100] hover:bg-[#E5BC00] text-[#1D2129] font-black text-xs flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer shadow-2xs"
                          title="Tăng 1 ngày (tự tăng chi phí tương ứng)"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* 3 Feature Tiles */}
                    <div className="grid grid-cols-3 gap-2">
                      {/* Tile 1: Phòng */}
                      <div className="bg-[#F1F5F9] rounded-2xl p-2.5 flex flex-col items-start gap-1">
                        <Bed className="w-4 h-4 text-[#0071AF]" />
                        <span className="text-[11px] font-bold text-slate-800">Phòng</span>
                        <span className="text-[10px] text-slate-500 truncate w-full">{msg.proposalCard.roomName}</span>
                      </div>

                      {/* Tile 2: Phù hợp */}
                      <div className="bg-[#F1F5F9] rounded-2xl p-2.5 flex flex-col items-start gap-1">
                        <Users className="w-4 h-4 text-[#0071AF]" />
                        <span className="text-[11px] font-bold text-slate-800">Phù hợp</span>
                        <span className="text-[10px] text-slate-500 truncate w-full">{msg.proposalCard.suitableFor}</span>
                      </div>

                      {/* Tile 3: Tiện ích */}
                      <div className="bg-[#F1F5F9] rounded-2xl p-2.5 flex flex-col items-start gap-1">
                        <Palmtree className="w-4 h-4 text-[#0071AF]" />
                        <span className="text-[11px] font-bold text-slate-800">Tiện ích</span>
                        <span className="text-[10px] text-slate-500 line-clamp-2 leading-tight">{msg.proposalCard.amenitiesHighlight}</span>
                      </div>
                    </div>

                    {/* Bảng Dự Toán Ngân Sách (Màu Vàng Ấm Áp) */}
                    <div className="bg-[#FFF9EA] border border-[#FDE68A]/70 rounded-2xl p-3.5 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-600 flex items-center justify-center shrink-0">
                            <Wallet className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-slate-600">Dự toán</div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-xl font-black text-[#0071AF]">
                                {msg.proposalCard.totalEstimateFormatted}
                              </span>
                              <span className="text-xs text-slate-500 font-normal">
                                {msg.proposalCard.perPersonLabel}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-[10px] text-slate-400 text-right leading-tight max-w-[120px]">
                          ⓘ {msg.proposalCard.disclaimerText}
                        </div>
                      </div>

                      {/* Thanh phân bổ ngân sách 3 màu */}
                      <div className="h-2 rounded-full flex gap-1 overflow-hidden bg-slate-200/50">
                        <div 
                          className="bg-[#70A5F9] rounded-full h-full transition-all duration-500" 
                          style={{ width: `${msg.proposalCard.breakdown.stayPercent}%` }} 
                          title="Lưu trú"
                        />
                        <div 
                          className="bg-[#78DCF9] rounded-full h-full transition-all duration-500" 
                          style={{ width: `${msg.proposalCard.breakdown.transportPercent}%` }} 
                          title="Di chuyển"
                        />
                        <div 
                          className="bg-[#F9DE75] rounded-full h-full transition-all duration-500" 
                          style={{ width: `${msg.proposalCard.breakdown.activityPercent}%` }} 
                          title="Ăn & chơi"
                        />
                      </div>

                      {/* 3 Mục chi phí */}
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 pt-0.5">
                        <div className="flex items-center gap-1.5">
                          <Bed className="w-3.5 h-3.5 text-sky-600" />
                          <span>Lưu trú: {msg.proposalCard.breakdown.stayFormatted}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Plane className="w-3.5 h-3.5 text-sky-600" />
                          <span>Di chuyển: {msg.proposalCard.breakdown.transportFormatted}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Utensils className="w-3.5 h-3.5 text-amber-600" />
                          <span>Ăn &amp; chơi: {msg.proposalCard.breakdown.activityFormatted}</span>
                        </div>
                      </div>
                    </div>

                    {/* Nút Xem lịch trình ➔ */}
                    <button
                      onClick={() => setActiveProposalModal(msg.proposalCard!)}
                      className="w-full py-3.5 bg-[#FFDF00] hover:bg-amber-400 active:scale-[0.98] text-slate-950 font-black text-sm rounded-2xl shadow-sm flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <span>Xem lịch trình</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>

                    {/* Nút Cuộn ngang đổi phòng & chuyến đi */}
                    <button
                      data-testid="alt-offers-btn"
                      onClick={() => {
                        setAlternativeTab('stay');
                        setIsAlternativeSheetOpen(true);
                      }}
                      className="w-full py-2.5 px-3 rounded-2xl bg-sky-50 hover:bg-sky-100 text-[#0071AF] font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer border border-sky-200 shadow-2xs"
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Đổi Khách Sạn / Hãng Bay / Xe (20+ Lựa chọn)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Link Chỉnh ngân sách */}
                    <button
                      onClick={() => setIsBudgetSheetOpen(true)}
                      className="w-full text-center text-xs font-bold text-[#0071AF] hover:underline cursor-pointer py-0.5"
                    >
                      Chỉnh ngân sách
                    </button>
                  </div>
                </div>
              )}

              {/* Quick Action Pills bên dưới Card (Chuẩn Ảnh 2) */}
              {msg.proposalCard && (
                <div className="ml-1 sm:ml-9 flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => setIsDatePickerOpen(true)}
                    className="bg-white border border-sky-200 hover:border-[#0071AF] text-[#0071AF] hover:bg-sky-50 px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#0071AF]" />
                    <span>Chọn ngày đi</span>
                  </button>

                  <button
                    onClick={() => {
                      setAlternativeTab('stay');
                      setIsAlternativeSheetOpen(true);
                    }}
                    className="bg-white border border-sky-200 hover:border-[#0071AF] text-[#0071AF] hover:bg-sky-50 px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5 text-[#0071AF]" />
                    <span>Đổi phòng (~20 KS)</span>
                  </button>

                  <button
                    onClick={() => setIsPayLaterModalOpen(true)}
                    className="bg-white border border-amber-300 hover:border-amber-500 text-amber-800 hover:bg-amber-50 px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-amber-600" />
                    <span>Ví MWG PayLater (0% lãi)</span>
                  </button>
                </div>
              )}

              {/* Các nút bấm nhanh (Suggested Chips) dẫn dắt theo nhu cầu của khách */}
              {msg.suggestedChips && msg.suggestedChips.length > 0 && (
                <div className="ml-1 sm:ml-9 flex flex-wrap gap-1.5 pt-1">
                  {msg.suggestedChips.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(chip)}
                      className="bg-white border border-slate-200 hover:border-[#0071AF] hover:bg-sky-50 text-slate-700 hover:text-[#0071AF] px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer shadow-2xs"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isProcessing && (
          <div className="flex items-center gap-2 text-slate-400 text-xs pl-2 animate-pulse">
            <CuteRobotAvatar size="sm" />
            <span>Trợ lý đang suy nghĩ và tính toán chi phí tối ưu nhất...</span>
          </div>
        )}

        <div ref={chatScrollRef} />
      </div>

      {/* ============================================================ */}
      {/* 3. Bottom Chat Input (Chuẩn Ảnh 2 & Khắc phục hoàn toàn lỗi Zoom) */}
      {/* ============================================================ */}
      <div className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-100 p-3 flex items-center gap-2">
        {/* Input Wrapper */}
        <div className="flex-1 flex items-center gap-2 bg-[#F1F5F9] rounded-full px-4 py-2 border border-transparent focus-within:border-sky-400 focus-within:bg-white transition shadow-2xs">
          <Sparkles className="w-4 h-4 text-sky-500 shrink-0" />
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(inputText);
              }
            }}
            placeholder={`${activePersona.honorific} muốn điều chỉnh gì?`}
            /* ĐẶC BIỆT: Khóa cứng font-size 16px để Safari/Android không bao giờ phóng to (auto-zoom) */
            style={{ fontSize: '16px' }}
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 outline-none text-base"
          />
        </div>

        {/* Nút gửi hình tròn màu xanh chuẩn Ảnh 2 */}
        <button
          onClick={() => handleSendMessage(inputText)}
          disabled={!inputText.trim() || isProcessing}
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-md transition cursor-pointer ${
            inputText.trim() && !isProcessing
              ? 'bg-[#0071AF] text-white hover:bg-[#005E93] active:scale-95'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
          title="Gửi tin nhắn"
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </div>

      {/* ============================================================ */}
      {/* 4. Modal Chi Tiết Lịch Trình (Xem Lịch Trình ➔)               */}
      {/* ============================================================ */}
      {activeProposalModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom-5">
            {/* Header Modal */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 rounded-t-3xl">
              <div>
                <h3 className="font-black text-base text-slate-900">
                  Lịch trình {activeProposalModal.destinationName} ({activeProposalModal.durationDays}N{activeProposalModal.durationNights}Đ)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {activeProposalModal.packageTitle} • {activeProposalModal.paxText}
                </p>
              </div>
              <button
                onClick={() => setActiveProposalModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              {/* Ảnh & Khách sạn */}
              <div className="relative rounded-2xl overflow-hidden h-36 bg-slate-200">
                <img
                  src={activeProposalModal.resortImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end text-white">
                  <div className="font-bold text-sm">{activeProposalModal.resortName}</div>
                  <div className="text-[11px] text-white/90">Hạng phòng: {activeProposalModal.roomName} • {activeProposalModal.amenitiesHighlight}</div>
                </div>
              </div>

              {/* Điều chỉnh số ngày ngay trong Modal */}
              <div className="flex items-center justify-between bg-slate-100 p-3 rounded-2xl">
                <span className="font-bold text-slate-800">Thời lượng chuyến đi:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const updated = AiCustomerAgentService.recalculateProposalForDays(activeProposalModal, activeProposalModal.durationDays - 1);
                      setActiveProposalModal(updated);
                      // Đồng bộ ra message
                      setMessages(prev => prev.map(m => m.proposalCard?.id === updated.id ? { ...m, proposalCard: updated } : m));
                    }}
                    disabled={activeProposalModal.durationDays <= 1}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-black flex items-center justify-center disabled:opacity-30 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-extrabold text-[#0071AF]">
                    {activeProposalModal.durationDays} ngày {activeProposalModal.durationNights} đêm
                  </span>
                  <button
                    onClick={() => {
                      const updated = AiCustomerAgentService.recalculateProposalForDays(activeProposalModal, activeProposalModal.durationDays + 1);
                      setActiveProposalModal(updated);
                      setMessages(prev => prev.map(m => m.proposalCard?.id === updated.id ? { ...m, proposalCard: updated } : m));
                    }}
                    disabled={activeProposalModal.durationDays >= 10}
                    className="w-7 h-7 rounded-lg bg-[#FED100] text-[#1D2129] font-black flex items-center justify-center disabled:opacity-30 cursor-pointer shadow-xs"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Bảng Lịch Trình Từng Ngày */}
              <div className="space-y-3">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  Chi tiết hoạt động từng ngày
                </div>

                {activeProposalModal.itineraryDays.map((d) => (
                  <div key={d.day} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-2">
                    <div className="font-extrabold text-xs text-[#0071AF] flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-sky-100 text-[#0071AF] flex items-center justify-center text-[11px]">
                        {d.day}
                      </span>
                      <span>Ngày {d.day}: {d.title}</span>
                    </div>

                    <div className="space-y-2 pt-1 border-t border-slate-200/60">
                      {d.activities.map((act, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2.5 text-[11px]">
                          <span className="font-mono font-bold text-slate-500 shrink-0">{act.time}</span>
                          <div>
                            <span className="font-bold text-slate-800">{act.title}: </span>
                            <span className="text-slate-600">{act.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bảng Chi Phí & Ưu Đãi */}
              <div className="bg-[#FFF9EA] border border-amber-200 rounded-2xl p-3.5 space-y-2">
                <div className="font-bold text-slate-800 flex items-center justify-between">
                  <span>Tổng dự toán trọn gói:</span>
                  <span className="text-sm font-black text-[#0071AF]">{activeProposalModal.totalEstimateFormatted}</span>
                </div>
                <div className="space-y-1 text-[11px] text-slate-600 pt-1 border-t border-amber-200/60">
                  <div className="flex justify-between">
                    <span>Lưu trú ({activeProposalModal.resortName}):</span>
                    <span className="font-bold">{activeProposalModal.breakdown.stayFormatted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vé bay / xe khứ hồi ({activeProposalModal.paxText}):</span>
                    <span className="font-bold">{activeProposalModal.breakdown.transportFormatted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hoạt động, vé tham quan &amp; ẩm thực:</span>
                    <span className="font-bold">{activeProposalModal.breakdown.activityFormatted}</span>
                  </div>
                </div>
              </div>

              {/* Đặc quyền Trả Chậm Ví MWG PayLater 0% */}
              <div 
                onClick={() => setIsPayLaterModalOpen(true)}
                className="bg-sky-50 hover:bg-sky-100/70 border border-sky-200 rounded-2xl p-3.5 space-y-2 cursor-pointer transition"
                title="Bấm để xem chi tiết hạn mức & gói ưu đãi PayLater"
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#0071AF]" />
                  <span className="font-bold text-xs text-slate-900">Trả góp qua Ví MWG PayLater (0% Lãi suất)</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                  <div className="bg-white p-2 rounded-xl border border-sky-100 shadow-2xs">
                    <div className="font-bold text-slate-700">3 Tháng</div>
                    <div className="font-black text-[#0071AF] mt-0.5">{activeProposalModal.paylater.tenor3Monthly.toLocaleString('vi-VN')}đ/tháng</div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border-2 border-sky-400 shadow-2xs">
                    <div className="font-bold text-[#0071AF]">6 Tháng (Gợi ý)</div>
                    <div className="font-black text-[#0071AF] mt-0.5">{activeProposalModal.paylater.tenor6Monthly.toLocaleString('vi-VN')}đ/tháng</div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-sky-100 shadow-2xs">
                    <div className="font-bold text-slate-700">12 Tháng</div>
                    <div className="font-black text-[#0071AF] mt-0.5">{activeProposalModal.paylater.tenor12Monthly.toLocaleString('vi-VN')}đ/tháng</div>
                  </div>
                </div>
                <p className="text-[10px] text-sky-800">
                  🛡️ Thanh toán 0đ hôm nay, giải ngân 100% giữ phòng và vé tức thì.
                </p>
              </div>
            </div>

            {/* Footer Modal CTA */}
            <div className="p-4 border-t border-slate-100 bg-white sticky bottom-0 rounded-b-3xl">
              <button
                onClick={() => handleBookProposal(activeProposalModal)}
                className="w-full py-3.5 bg-[#FFDF00] hover:bg-amber-400 text-slate-950 font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition active:scale-[0.98]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Đặt trọn gói này (MWG PayLater / Tiền mặt)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. DatePickerSheet (Chọn ngày đi)                             */}
      {/* ============================================================ */}
      {isDatePickerOpen && (
        <DatePickerSheet
          title="Chọn ngày khởi hành & về"
          mode="range"
          start={selectedStartDate}
          end={selectedEndDate}
          onClose={() => setIsDatePickerOpen(false)}
          onApply={(start: string, end?: string) => {
            setSelectedStartDate(start);
            if (end) {
              setSelectedEndDate(end);
              const daysCount = Math.max(1, diffDays(start, end) + 1);

              // Tự động cập nhật số ngày trên proposal card
              setMessages(prev => {
                const lastWithProposal = [...prev].reverse().find(m => m.proposalCard);
                if (lastWithProposal && lastWithProposal.proposalCard) {
                  const updated = AiCustomerAgentService.recalculateProposalForDays(lastWithProposal.proposalCard, daysCount);
                  return prev.map(m => m.id === lastWithProposal.id ? { ...m, proposalCard: updated } : m);
                }
                return prev;
              });

              setIsDatePickerOpen(false);
              handleSendMessage(`Em chọn ngày đi từ ${fmtDay(start)} đến ${fmtDay(end)} (${daysCount} ngày) nhé!`);
            } else {
              setIsDatePickerOpen(false);
              handleSendMessage(`Em chọn ngày đi ${fmtDay(start)} nhé!`);
            }
          }}
        />
      )}

      {/* ============================================================ */}
      {/* 6. Chỉnh ngân sách Sheet                                     */}
      {/* ============================================================ */}
      {isBudgetSheetOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900">Chọn mức ngân sách dự kiến</h3>
              <button onClick={() => setIsBudgetSheetOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { label: 'Tiết kiệm (~5 - 8 triệu)', value: 'ngân sách 6 triệu tiết kiệm' },
                { label: 'Tiêu chuẩn (~10 - 15 triệu)', value: 'ngân sách 12 triệu tiêu chuẩn' },
                { label: 'Nghỉ dưỡng cao cấp (~20 triệu)', value: 'ngân sách 20 triệu nghỉ dưỡng' },
                { label: 'Cao cấp VIP Villa (~25 - 30 triệu)', value: 'ngân sách 25 triệu cao cấp villa' }
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsBudgetSheetOpen(false);
                    handleSendMessage(opt.value);
                  }}
                  className="w-full p-3 rounded-2xl border border-slate-200 hover:border-[#0071AF] hover:bg-sky-50 text-left font-bold text-slate-800 transition cursor-pointer flex items-center justify-between"
                >
                  <span>{opt.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 7. Thêm lựa chọn Sheet                                       */}
      {/* ============================================================ */}
      {isOptionSheetOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900">Thêm lựa chọn tùy chỉnh</h3>
              <button onClick={() => setIsOptionSheetOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { label: 'Đổi sang khách sạn gần trung tâm hơn', val: 'Đổi sang khách sạn gần trung tâm hơn' },
                { label: 'Nâng cấp phòng hướng biển / view đẹp', val: 'Nâng cấp phòng hướng biển trực diện' },
                { label: 'Đổi sang chuyến bay giờ đẹp nhất', val: 'Đổi sang giờ bay sớm nhất của Vietnam Airlines' },
                { label: 'Thêm vé cáp treo & khu vui chơi', val: 'Thêm vé cáp treo và khu vui chơi' },
                { label: 'Chuyển sang xe Limousine đón tận nơi', val: 'Chuyển sang xe Limousine đón tận nơi' }
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsOptionSheetOpen(false);
                    handleSendMessage(opt.val);
                  }}
                  className="w-full p-3 rounded-2xl border border-slate-200 hover:border-[#0071AF] hover:bg-sky-50 text-left font-bold text-slate-800 transition cursor-pointer flex items-center justify-between"
                >
                  <span>{opt.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 8. Alternative Offers Sheet (Cuộn ngang chọn offer thay thế)   */}
      {/* ============================================================ */}
      {isAlternativeSheetOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5">
            <div className="p-4 px-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h3 className="font-black text-sm sm:text-base text-slate-900">
                  Lựa chọn thay thế tại {discoveryCtx.destinationName || 'điểm đến'}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Hơn 20 khách sạn/resort, chuyến bay có logo hãng bay &amp; xe FUTA
                </p>
              </div>
              <button
                onClick={() => setIsAlternativeSheetOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              <AlternativeOffersCarousel
                destinationId={discoveryCtx.destinationId || 'phuquoc'}
                destinationName={discoveryCtx.destinationName || 'Phú Quốc'}
                initialTab={alternativeTab}
                onSelectStay={handleSelectAlternativeStay}
                onSelectFlight={handleSelectAlternativeFlight}
                onSelectTransport={handleSelectAlternativeTransport}
              />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 9. Modal Tư Vấn & Gói Hỗ Trợ Ví MWG PayLater                */}
      {/* ============================================================ */}
      <PayLaterConsultationModal
        isOpen={isPayLaterModalOpen}
        onClose={() => setIsPayLaterModalOpen(false)}
        currentAmount={activeProposalModal?.totalEstimate || 18600000}
        onSelectPackage={handleSelectPayLaterPackage}
      />
    </div>
  );
};
