import React, { useState } from 'react';
import { 
  Flame, 
  ShoppingCart, 
  Coins, 
  Wrench, 
  Compass, 
  Receipt, 
  Gift, 
  Handshake, 
  Grid, 
  QrCode, 
  Bell, 
  User, 
  ChevronRight, 
  Edit3, 
  Check, 
  Clock, 
  Ticket, 
  Sparkles,
  Heart,
  Film
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { CinemaBookingSystem } from './booking/CinemaBookingSystem';

export const QuaTangVIPHome: React.FC = () => {
  const { 
    activePersona, 
    updateUserProfile,
    setIsInsideMiniApp, 
    setActiveTab, 
    orders, 
    draftPlan,
    showToast 
  } = useDemo();

  const [showEditProfileModal, setShowEditProfileModal] = useState<boolean>(false);
  const [showCinemaSystem, setShowCinemaSystem] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(activePersona.name);
  const [tempHonorific, setTempHonorific] = useState<'Anh' | 'Chị' | 'Bạn'>(activePersona.honorific);

  const upcomingOrder = orders.find(o => o.overallStatus === 'confirmed');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempName.trim()) return;
    updateUserProfile(tempName.trim(), tempHonorific);
    setShowEditProfileModal(false);
  };

  return (
    <div className="w-full min-h-full bg-[#FAFAFA] flex flex-col pb-24 select-none relative font-sans">
      {/* 1. Warm Champagne Golden Gradient Header (Thực tế từ app Quà Tặng VIP) */}
      <div className="bg-gradient-to-b from-[#FEF7DE] via-[#FFFDF8] to-[#FAFAFA] px-4 pt-3 pb-2">
        {/* User Name & Quick Edit */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {activePersona.name}
            </h1>
            <button
              onClick={() => {
                setTempName(activePersona.name);
                setTempHonorific(activePersona.honorific);
                setShowEditProfileModal(true);
              }}
              className="p-1 rounded-full text-slate-400 hover:text-amber-600 hover:bg-amber-100/50 transition cursor-pointer"
              title="Đổi tên & Danh xưng cho AI"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/20 border border-amber-300 text-amber-900 text-[11px] font-bold">
            <span>{activePersona.honorific} {activePersona.shortName}</span>
          </div>
        </div>

        {/* 2. Barcode Card (Khớp 100% ảnh thực tế) */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col items-center">
          <div className="text-xs text-slate-600 font-medium text-center mb-3">
            Đưa mã cho nhân viên để tích, sử dụng điểm
          </div>

          {/* Barcode Graphic */}
          <div className="w-full max-w-[280px] h-14 flex items-center justify-center gap-[2.5px] px-2 overflow-hidden">
            {[3,1,2,1,4,1,2,3,1,1,3,2,1,4,2,1,1,3,1,2,4,1,2,1,3,2,1,4,1,2,3,1,2,1,4,2,1,3,1,2,3,1,4,2].map((w, idx) => (
              <div 
                key={idx} 
                className="bg-black h-full rounded-[0.5px]" 
                style={{ width: `${w * 1.4}px` }} 
              />
            ))}
          </div>

          {/* Barcode Number underneath */}
          <div className="text-sm font-semibold tracking-widest text-slate-800 mt-2 font-mono">
            {activePersona.barcodeNumber || '7785'}
          </div>
        </div>

        {/* 3. Two Sub-metric Pills (Khớp 100% ảnh: 44.358 điểm & 2 quà tặng) */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          {/* Left Pill: Điểm */}
          <div 
            onClick={() => showToast(`Số dư điểm khả dụng: ${activePersona.pointBalance.toLocaleString('vi-VN')} điểm`)}
            className="bg-white rounded-2xl p-3 border border-amber-100/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-between cursor-pointer hover:border-amber-300 transition"
          >
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-extrabold text-slate-900">
                  {activePersona.pointBalance.toLocaleString('vi-VN')}
                </span>
                <span className="text-xs text-slate-500 font-medium">điểm</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium flex items-center gap-0.5 mt-0.5">
                <span>Xem lịch sử</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </div>
            </div>

            {/* Wallet illustration */}
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-xl shrink-0">
              👛
            </div>
          </div>

          {/* Right Pill: Quà tặng */}
          <div 
            onClick={() => showToast(`Bạn đang có ${activePersona.voucherCount || 2} phiếu quà tặng chưa sử dụng`)}
            className="bg-white rounded-2xl p-3 border border-amber-100/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-between cursor-pointer hover:border-amber-300 transition"
          >
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-extrabold text-slate-900">
                  {activePersona.voucherCount || 2}
                </span>
                <span className="text-xs text-slate-500 font-medium">quà tặng</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium flex items-center gap-0.5 mt-0.5">
                <span>Xem quà</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </div>
            </div>

            {/* Gift Box illustration */}
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-xl shrink-0">
              🎁
            </div>
          </div>
        </div>
      </div>

      {/* 4. Grid of 8 Utilities (Khớp chính xác icon và nhãn từ ảnh chụp) */}
      <div className="px-4 mt-3">
        <div className="bg-white rounded-2xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-slate-100">
          <div className="grid grid-cols-4 gap-y-4 gap-x-2 text-center text-xs">
            {/* 1. Hot DEAL */}
            <button 
              onClick={() => showToast('Xem các ưu đãi Hot DEAL giảm giá sốc hôm nay')}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center group-hover:scale-105 transition shadow-2xs">
                <Flame className="w-6 h-6 fill-rose-500 text-rose-500" />
              </div>
              <span className="text-[11px] font-medium text-slate-700 mt-1.5 leading-tight">Hot DEAL</span>
            </button>

            {/* 2. Mua sắm (-50%) */}
            <button 
              onClick={() => showToast('Khám phá siêu thị mua sắm online MWG')}
              className="flex flex-col items-center group cursor-pointer relative"
            >
              <span className="absolute -top-1 -right-0.5 px-1 py-0.2 rounded-full text-[8px] font-black bg-rose-600 text-white">
                -50%
              </span>
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition shadow-2xs">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-medium text-slate-700 mt-1.5 leading-tight">Mua sắm</span>
            </button>

            {/* 3. Tài chính tiêu dùng (Mới) */}
            <button 
              onClick={() => showToast('Tiện ích tài chính & vay tiêu dùng đối tác')}
              className="flex flex-col items-center group cursor-pointer relative"
            >
              <span className="absolute -top-1 -right-0.5 px-1 py-0.2 rounded-full text-[8px] font-black bg-rose-600 text-white">
                Mới
              </span>
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition shadow-2xs">
                <Coins className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-medium text-slate-700 mt-1.5 leading-tight">Tài chính<br />tiêu dùng</span>
            </button>

            {/* 4. Thợ Điện máy XANH */}
            <button 
              onClick={() => showToast('Dịch vụ vệ sinh máy lạnh, sửa chữa tận nhà của Thợ Điện Máy Xanh')}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-sky-50 text-[#0074C8] flex items-center justify-center group-hover:scale-105 transition shadow-2xs">
                <Wrench className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-medium text-slate-700 mt-1.5 leading-tight">Thợ Điện<br />máy XANH</span>
            </button>

            {/* 5. CỔNG MINI APP CHỦ ĐẠO: "Đi & Trải nghiệm" (Điện Máy Xanh) */}
            <button 
              data-testid="di-trai-nghiem-btn"
              onClick={() => {
                setIsInsideMiniApp(true);
                setActiveTab('explore');
              }}
              className="flex flex-col items-center group cursor-pointer relative"
            >
              <span className="absolute -top-1 -right-0.5 px-1.5 py-0.2 rounded-full text-[8px] font-black bg-rose-600 text-white animate-pulse shadow">
                Mới
              </span>
              <img
                src="/icons/di-trai-nghiem.svg"
                alt="Đi & Trải nghiệm"
                className="w-[52px] h-[52px] rounded-[16px] group-hover:scale-110 transition shadow-md shadow-sky-600/30"
              />
              <span className="text-[11px] font-bold text-[#0074C8] mt-1.5 leading-tight">Đi & Trải<br />nghiệm</span>
            </button>

            {/* 6. VÉ XEM PHIM - HỆ THỐNG ĐẶT VÉ LIÊN RẠP (CGV, Lotte, Galaxy, BHD, Beta) */}
            <button 
              data-testid="cinema-btn"
              title="Vé xem phim"
              onClick={() => setShowCinemaSystem(true)}
              className="flex flex-col items-center group cursor-pointer relative"
            >
              <span className="absolute -top-1 -right-0.5 px-1.5 py-0.2 rounded-full text-[8px] font-black bg-rose-600 text-white animate-pulse shadow">
                HOT
              </span>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-600 to-indigo-600 text-white flex items-center justify-center group-hover:scale-110 transition shadow-md shadow-rose-500/30">
                <Film className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-bold text-slate-800 mt-1.5 leading-tight">Vé xem<br />phim</span>
            </button>

            {/* 7. Dịch vụ tiện ích */}
            <button 
              onClick={() => showToast('Thanh toán tiền điện, nước, internet, học phí')}
              className="flex flex-col items-center group cursor-pointer relative"
            >
              <span className="absolute -top-1 -right-0.5 px-1 py-0.2 rounded-full text-[8px] font-black bg-rose-600 text-white">
                Mới
              </span>
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition shadow-2xs">
                <Receipt className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-medium text-slate-700 mt-1.5 leading-tight">Dịch vụ<br />tiện ích</span>
            </button>

            {/* 7. Phiếu quà tặng */}
            <button 
              onClick={() => showToast('Quản lý phiếu quà tặng và mã giảm giá')}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center group-hover:scale-105 transition shadow-2xs">
                <Gift className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-medium text-slate-700 mt-1.5 leading-tight">Phiếu quà<br />tặng</span>
            </button>

            {/* 8. Đối tác liên kết */}
            <button 
              onClick={() => showToast('Mạng lưới đối tác liên kết độc quyền cùng MWG')}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-105 transition shadow-2xs">
                <Handshake className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-medium text-slate-700 mt-1.5 leading-tight">Đối tác<br />liên kết</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Smart Dynamic Cards: Upcoming Booking or Saved Plan */}
      {upcomingOrder && (
        <div className="px-4 mt-3">
          <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white rounded-2xl p-3.5 shadow-md border border-sky-400/30 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-1 text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                <Clock className="w-3 h-3" />
                <span>Chuyến đi sắp tới của {activePersona.honorific} {activePersona.shortName}</span>
              </div>
              <div className="font-bold text-xs text-white mt-1 line-clamp-1">
                {upcomingOrder.subOrders[0]?.items[0]?.title}
              </div>
              <div className="text-[11px] text-sky-100 mt-0.5">
                {upcomingOrder.subOrders[0]?.items[0]?.dateStart} • {upcomingOrder.subOrders[0]?.items[0]?.destinationName}
              </div>
            </div>

            <button
              onClick={() => {
                setIsInsideMiniApp(true);
                setActiveTab('trips');
              }}
              className="px-3 py-2 bg-[#FFDF00] hover:bg-amber-400 text-[#123653] font-bold text-xs rounded-xl shadow transition cursor-pointer shrink-0 ml-2"
            >
              Xem vé
            </button>
          </div>
        </div>
      )}

      {/* 6. Section "🔥 Khuyến mãi HOT" (Bám sát ảnh thực tế) */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
            <span>🔥</span>
            <span>Khuyến mãi HOT</span>
          </h2>
        </div>

        {/* Carousel Banner Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-100">
          <div 
            onClick={() => {
              setIsInsideMiniApp(true);
              setActiveTab('explore');
            }}
            className="bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-800 text-white p-4 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-[#FFDF00] text-[#123653]">
                  ĐẶC QUYỀN ĐIỆN MÁY XANH
                </span>
                <h3 className="font-extrabold text-sm sm:text-base text-white mt-2 leading-tight">
                  ĐI & TRẢI NGHIỆM — GIẢM NGAY 10%
                </h3>
                <p className="text-[11px] text-sky-100 mt-1 max-w-[240px]">
                  Tối đa 300.000đ khi đặt khách sạn, vé xe và tour. Tặng phiếu mua hàng ĐMX 100K!
                </p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-3xl shrink-0">
                🏖️
              </div>
            </div>
          </div>

          {/* Dots Pagination */}
          <div className="py-2 bg-white flex justify-center items-center gap-1">
            <span className="w-4 h-1.5 rounded-full bg-amber-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          </div>
        </div>
      </div>

      {/* 7. Super Star Virtual Assistant (Khớp 100% hình bé sao vàng đáng yêu và bóng thoại) */}
      <div className="px-4 mt-4">
        <div className="text-xs font-bold text-slate-700 mb-2">Đặc quyền hội viên</div>

        <div 
          onClick={() => {
            setIsInsideMiniApp(true);
            setActiveTab('planner');
          }}
          className="bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50 rounded-2xl p-3 border border-pink-100 shadow-2xs flex items-center gap-3 cursor-pointer hover:border-pink-300 transition relative"
        >
          {/* Bé sao vàng Super Star có má hồng đáng yêu */}
          <div className="w-12 h-12 rounded-full bg-amber-300 flex items-center justify-center text-2xl shadow-sm shrink-0 border-2 border-white animate-bounce-slow">
            ⭐
          </div>

          <div className="flex-1">
            {/* Speech bubble */}
            <div className="inline-block bg-white px-2.5 py-1 rounded-xl rounded-bl-xs text-[11px] font-bold text-slate-800 shadow-xs border border-slate-100 mb-1">
              "Chatbot Trợ lý Du lịch Điện Máy Xanh"
            </div>
            <div className="text-[11px] text-slate-600">
              Chạm để mở Chatbot tư vấn phòng, vé xe FUTA & lên lịch trình cho {activePersona.honorific} {activePersona.shortName} nhé!
            </div>
          </div>
        </div>
      </div>

      {/* 8. Bottom Navigation Bar (Khớp 100% cấu trúc Quà Tặng VIP: Trang chủ, Mua sắm, Quét QR, Thông báo, Tài khoản) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[440px] mx-auto bg-white/95 backdrop-blur border-t border-slate-200 py-2 px-4 flex items-center justify-between text-[10px] text-slate-500 z-30 shadow-lg">
        {/* 1. Trang chủ */}
        <button className="flex flex-col items-center text-amber-500 font-bold">
          <div className="w-5 h-5 flex items-center justify-center">
            🏠
          </div>
          <span className="mt-0.5">Trang chủ</span>
        </button>

        {/* 2. Mua sắm */}
        <button 
          onClick={() => showToast('Chuyển sang gian hàng mua sắm')}
          className="flex flex-col items-center hover:text-slate-800 transition"
        >
          <ShoppingCart className="w-5 h-5 text-emerald-600" />
          <span className="mt-0.5">Mua sắm</span>
        </button>

        {/* 3. Nút Quét QR To Nổi Ở Giữa (Khớp 100% ảnh) */}
        <button 
          onClick={() => showToast('Mở máy ảnh quét mã QR tại quầy thanh toán')}
          className="w-13 h-13 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 text-white shadow-lg flex items-center justify-center -mt-6 border-4 border-white cursor-pointer active:scale-95 transition"
        >
          <QrCode className="w-6 h-6 text-white" />
        </button>

        {/* 4. Thông báo (Badge đỏ 6) */}
        <button 
          onClick={() => showToast('Bạn có 6 thông báo ưu đãi chưa đọc')}
          className="flex flex-col items-center hover:text-slate-800 transition relative"
        >
          <div className="relative">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full bg-rose-600 text-white text-[8px] font-black flex items-center justify-center">
              6
            </span>
          </div>
          <span className="mt-0.5">Thông báo</span>
        </button>

        {/* 5. Tài khoản */}
        <button 
          onClick={() => setShowEditProfileModal(true)}
          className="flex flex-col items-center hover:text-slate-800 transition"
        >
          <User className="w-5 h-5 text-slate-600" />
          <span className="mt-0.5">Tài khoản</span>
        </button>
      </div>

      {/* ======================================================= */}
      {/* MODAL: ĐỔI TÊN NGƯỜI DÙNG & QUY TẮC XƯNG HÔ CHO AI     */}
      {/* ======================================================= */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">👤</span>
                <h3 className="font-extrabold text-sm text-slate-900">Thiết lập Tên & Xưng hô</h3>
              </div>
              <button onClick={() => setShowEditProfileModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              AI sẽ xưng hô đúng danh xưng và tên của bạn xuyên suốt các cuộc trò chuyện và lịch trình.
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">Danh xưng mong muốn</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {(['Anh', 'Chị', 'Bạn'] as const).map((hon) => (
                    <button
                      key={hon}
                      type="button"
                      onClick={() => setTempHonorific(hon)}
                      className={`py-2 rounded-xl border font-bold transition cursor-pointer text-center ${
                        tempHonorific === hon
                          ? 'border-[#0074C8] bg-sky-50 text-[#0074C8]'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {hon}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">Họ và Tên</label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Ví dụ: Lâm Tín"
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:border-[#0074C8] outline-none font-bold"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                💬 <span className="font-bold">Ví dụ AI chào:</span> "Dạ em chào {tempHonorific} {tempName.trim().split(' ').slice(-1)[0] || 'bạn'}! Em có thể giúp gì cho chuyến đi của {tempHonorific} ạ?"
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0074C8] hover:bg-[#005A9E] text-white font-bold rounded-xl shadow"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hệ thống đặt vé xem phim liên rạp (CGV, Lotte, Galaxy, BHD, Beta) */}
      {showCinemaSystem && (
        <CinemaBookingSystem onClose={() => setShowCinemaSystem(false)} />
      )}
    </div>
  );
};
