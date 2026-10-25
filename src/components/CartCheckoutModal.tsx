import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Tag, 
  Sparkles, 
  Coins, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Ticket,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useDemo } from '../context/DemoContext';
import { CampaignEngine } from '../services/campaignEngine';
import { Order } from '../types';

interface CartCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartCheckoutModal: React.FC<CartCheckoutModalProps> = ({ isOpen, onClose }) => {
  const { 
    cartItems, 
    removeFromCart, 
    clearCart, 
    campaigns, 
    activePersona, 
    createOrderFromCart, 
    chaos, 
    showToast,
    setActiveTab
  } = useDemo();

  const [paymentMethod, setPaymentMethod] = useState<'mwg_paylater' | 'momo' | 'vnpay' | 'vietqr' | 'visa_master'>('mwg_paylater');
  const [paylaterTenure, setPaylaterTenure] = useState<3 | 6 | 9 | 12>(6); // Mặc định 6 tháng
  const [usePoints, setUsePoints] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-pass guest form inputs
  const [passengerName, setPassengerName] = useState<string>(activePersona.name);
  const [passengerPhone, setPassengerPhone] = useState<string>(activePersona.phone);
  const [passengerEmail, setPassengerEmail] = useState<string>('khachhang.demo@dienmayxanh.com');

  if (!isOpen) return null;

  // 1. Tính toán giá gốc
  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  // 2. Tối ưu ưu đãi từ CampaignEngine
  const bestPromo = CampaignEngine.findBestCampaignCombination(campaigns, cartItems, activePersona, paymentMethod);
  const discountTotal = bestPromo.totalDiscount;

  // 3. Quy đổi điểm Quà Tặng VIP (tối đa 10% giá trị còn lại)
  const afterDiscount = Math.max(0, subtotal - discountTotal);
  const maxPointsAllowed = Math.min(activePersona.pointBalance, Math.round(afterDiscount * 0.1));
  const pointsDeducted = usePoints ? maxPointsAllowed : 0;

  const finalTotal = Math.max(0, afterDiscount - pointsDeducted);

  const handleQuickAutofill = () => {
    setPassengerName(activePersona.name);
    setPassengerPhone(activePersona.phone);
    setPassengerEmail('khachhang.demo@dienmayxanh.com');
    showToast('Đã tự động điền thông tin hành khách từ hồ sơ Quà Tặng VIP!');
  };

  const handleCheckout = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await createOrderFromCart(paymentMethod, pointsDeducted, paylaterTenure);
      if (res.success && res.order) {
        setCompletedOrder(res.order);
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore confetti in non-browser
        }
      } else {
        setErrorMessage(res.error || 'Có lỗi xảy ra khi xử lý đơn hàng mô phỏng.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi không xác định trong quá trình thanh toán giả lập.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
        {/* Header */}
        <div className="bg-[#0074C8] text-white px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm uppercase">Giỏ dịch vụ & Thanh toán</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#FFDF00] text-[#123653]">
              {cartItems.length} dịch vụ
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition cursor-pointer">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {completedOrder ? (
            /* SUCCESS CONFIRMATION VIEW */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900">ĐẶT DỊCH VỤ THÀNH CÔNG!</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Mã đơn hàng: <span className="font-mono font-bold text-sky-700">{completedOrder.orderNumber}</span>
                </p>
                <div className="mt-2 inline-block px-3 py-1 bg-amber-100 text-amber-900 text-[11px] font-bold rounded-full">
                  Bản mô phỏng Demo • Tự động xác nhận đối tác ("Auto-pass")
                </div>
              </div>

              {/* MWG PayLater Payment Detail Banner */}
              {completedOrder.paymentMethod === 'mwg_paylater' && (
                <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-3.5 text-left space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-emerald-950 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-emerald-700" />
                      Ví MWG PayLater (Kỳ hạn {completedOrder.paylaterTenure} tháng)
                    </span>
                    <span className="text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                      ĐÃ THANH TOÁN FULL 100%
                    </span>
                  </div>
                  <div className="text-xs text-slate-700">
                    MWG PayLater đã thanh toán trọn gói <strong>{completedOrder.finalPaidAmount.toLocaleString('vi-VN')}đ</strong> cho toàn bộ vé & dịch vụ.
                  </div>
                  <div className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 p-2 rounded-xl">
                    🗓️ Lịch trả góp: <strong>{completedOrder.paylaterMonthlyPayment?.toLocaleString('vi-VN')}đ / tháng</strong> (Kỳ hạn {completedOrder.paylaterTenure} tháng, 0% lãi suất, 0đ hôm nay).
                  </div>
                </div>
              )}

              {/* Reward Voucher Notice */}
              {completedOrder.rewardVoucherEarned && (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3 text-left flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold text-lg shrink-0">
                    🎁
                  </div>
                  <div>
                    <div className="text-xs font-bold text-rose-900">
                      Tặng Phiếu mua sắm Điện Máy Xanh 100.000đ
                    </div>
                    <div className="text-[11px] text-rose-700">
                      Phiếu đã được cấp vào mục "Quà của tôi" trên app Quà Tặng VIP sau chuyến đi!
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-orders List */}
              <div className="text-left bg-slate-50 rounded-2xl p-3 border border-slate-200 space-y-3">
                <div className="text-xs font-bold uppercase text-slate-600">Đơn dịch vụ đã xuất vé Demo:</div>
                {completedOrder.subOrders.map((sub, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-slate-200 flex items-start justify-between gap-2 shadow-2xs">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-slate-800">{sub.items[0]?.title}</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-sky-100 text-sky-800">
                          {sub.partnerName}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Mã vé demo: <span className="font-mono font-bold text-slate-700">{sub.demoTicket?.ticketCode}</span>
                      </div>
                      <div className="text-[10px] text-emerald-700 font-medium mt-1">
                        ✓ {sub.demoTicket?.instructions}
                      </div>
                    </div>
                    <Ticket className="w-5 h-5 text-sky-600 shrink-0" />
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => {
                    onClose();
                    setActiveTab('trips');
                  }}
                  className="flex-1 py-3 bg-[#0074C8] hover:bg-[#005A9E] text-white font-bold text-xs rounded-xl shadow transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Xem vé & Chuyến đi của tôi</span>
                </button>
                <button
                  onClick={onClose}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            /* EMPTY CART */
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
                🛒
              </div>
              <h3 className="font-bold text-sm text-slate-700">Giỏ dịch vụ đang trống</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Hãy khám phá các khách sạn, vé xe, chuyến bay hoặc dùng AI để lập kế hoạch trọn gói nhé!
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 rounded-xl bg-[#0074C8] text-white text-xs font-bold cursor-pointer hover:bg-[#005A9E] transition"
              >
                Khám phá dịch vụ
              </button>
            </div>
          ) : (
            /* REGULAR CHECKOUT FLOW */
            <>
              {/* Error Banner if any */}
              {errorMessage && (
                <div className="bg-rose-50 border border-rose-300 rounded-2xl p-3 flex items-start gap-2.5 text-rose-800 text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="flex-1">{errorMessage}</div>
                </div>
              )}

              {/* 1. Danh sách sản phẩm trong giỏ */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase">
                  <span>Dịch vụ đã chọn ({cartItems.length})</span>
                  <button onClick={clearCart} className="text-rose-600 hover:underline text-[11px] font-medium cursor-pointer">
                    Xóa tất cả
                  </button>
                </div>

                {cartItems.map((item) => (
                  <div key={item.cartItemId} className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3 flex items-start justify-between gap-3 shadow-2xs">
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#0074C8]/10 text-[#0074C8]">
                          {item.partnerName}
                        </span>
                        <span className="text-[10px] text-slate-500">📍 {item.destinationName}</span>
                      </div>
                      <div className="font-bold text-xs text-slate-900 leading-tight">{item.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{item.subtitle}</div>
                      <div className="text-xs font-extrabold text-[#0074C8] mt-1.5">
                        {item.totalPrice.toLocaleString('vi-VN')}đ
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                      title="Xóa dịch vụ này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* 2. Điền thông tin hành khách (với nút Auto-pass) */}
              <div className="bg-sky-50/60 border border-sky-200 rounded-2xl p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-800">Thông tin người liên hệ / hành khách</div>
                  <button
                    onClick={handleQuickAutofill}
                    className="px-2 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[10px] flex items-center gap-1 transition cursor-pointer shadow-2xs"
                  >
                    <Sparkles className="w-3 h-3 text-slate-950" />
                    <span>Điền nhanh demo</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] font-medium text-slate-600">Họ và tên</label>
                    <input 
                      type="text" 
                      value={passengerName} 
                      onChange={(e) => setPassengerName(e.target.value)}
                      className="w-full mt-0.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-medium text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-medium text-slate-600">Số điện thoại</label>
                    <input 
                      type="text" 
                      value={passengerPhone} 
                      onChange={(e) => setPassengerPhone(e.target.value)}
                      className="w-full mt-0.5 px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-medium text-slate-800 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Ưu đãi & Voucher (CampaignEngine) */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                    <Tag className="w-4 h-4 text-amber-600" />
                    <span>Ưu đãi áp dụng ({bestPromo.appliedCampaigns.length})</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    Đã tối ưu mức giảm cao nhất
                  </span>
                </div>

                {bestPromo.appliedCampaigns.length > 0 ? (
                  <div className="space-y-1.5">
                    {bestPromo.appliedCampaigns.map((camp) => (
                      <div key={camp.id} className="bg-white p-2.5 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-slate-900">{camp.name}</div>
                          <div className="text-[10px] text-slate-500">{camp.shortTag}</div>
                        </div>
                        <span className="font-extrabold text-emerald-600">
                          {camp.discountType === 'percentage' 
                            ? `-${camp.discountValue}%` 
                            : `-${camp.discountValue.toLocaleString('vi-VN')}đ`}
                        </span>
                      </div>
                    ))}
                    {bestPromo.shoppingVoucherEarned ? (
                      <div className="bg-rose-50 p-2 rounded-xl text-[11px] text-rose-800 font-medium">
                        🎁 Tặng thêm Phiếu mua sắm Điện Máy Xanh 100K sau khi hoàn tất kỳ nghỉ.
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="text-xs text-slate-500">
                    Chưa có ưu đãi nào đạt giá trị tối thiểu cho đơn này.
                  </div>
                )}
              </div>

              {/* 4. Dùng điểm tích lũy Quà Tặng VIP */}
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-amber-500" />
                  <div>
                    <div className="text-xs font-bold text-slate-800">Dùng điểm Quà Tặng VIP</div>
                    <div className="text-[11px] text-slate-500">
                      Khả dụng: <span className="font-bold text-amber-600">{activePersona.pointBalance.toLocaleString('vi-VN')}</span> điểm (Giảm tối đa 10% đơn)
                    </div>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={usePoints} 
                    onChange={(e) => setUsePoints(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0074C8]"></div>
                </label>
              </div>

              {/* 5. Chọn phương thức thanh toán giả lập */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase">Phương thức thanh toán giả lập</span>
                  {paymentMethod === 'mwg_paylater' && (
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ⚡ Trả góp 0% Lãi suất
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setPaymentMethod('mwg_paylater')}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center gap-2 ${
                      paymentMethod === 'mwg_paylater' 
                        ? 'border-[#0074C8] bg-sky-50 text-[#0074C8] font-bold ring-2 ring-[#0074C8]' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-black text-xs shrink-0">
                      MWG
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 leading-tight">Ví MWG PayLater</div>
                      <div className="text-[10px] text-emerald-600 font-bold">Thanh toán Full 100%</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('momo')}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center gap-2 ${
                      paymentMethod === 'momo' 
                        ? 'border-[#0074C8] bg-sky-50 text-[#0074C8] font-bold ring-2 ring-[#0074C8]' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span className="w-7 h-7 rounded-lg bg-pink-500 text-white text-xs font-black flex items-center justify-center shrink-0">
                      MoMo
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">Ví MoMo</div>
                      <div className="text-[10px] text-slate-500">Quét mã MoMo</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('vnpay')}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center gap-2 ${
                      paymentMethod === 'vnpay' 
                        ? 'border-[#0074C8] bg-sky-50 text-[#0074C8] font-bold ring-2 ring-[#0074C8]' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0">
                      VNPAY
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">VNPAY-QR</div>
                      <div className="text-[10px] text-slate-500">Mã QR ngân hàng</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('vietqr')}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center gap-2 ${
                      paymentMethod === 'vietqr' 
                        ? 'border-[#0074C8] bg-sky-50 text-[#0074C8] font-bold ring-2 ring-[#0074C8]' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-xs font-black flex items-center justify-center shrink-0">
                      VietQR
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">Chuyển khoản</div>
                      <div className="text-[10px] text-slate-500">24/7 tự động</div>
                    </div>
                  </button>
                </div>

                {/* KHỐI CHỌN KỲ HẠN TRẢ CHẬM MWG PAYLATER (3, 6, 9, 12 THÁNG) */}
                {paymentMethod === 'mwg_paylater' && (
                  <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 border-2 border-emerald-300/80 rounded-2xl p-3.5 space-y-3 animate-in fade-in duration-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-emerald-700" />
                        <span className="font-black text-xs text-emerald-950">
                          Chọn kỳ hạn trả chậm MWG PayLater:
                        </span>
                      </div>
                      <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded-md">
                        0% LÃI SUẤT
                      </span>
                    </div>

                    {/* 4 Lựa chọn kỳ hạn 3, 6, 9, 12 tháng */}
                    <div className="grid grid-cols-4 gap-1.5">
                      {([3, 6, 9, 12] as const).map((tenure) => {
                        const monthlyVal = Math.round(finalTotal / tenure);
                        const isSelected = paylaterTenure === tenure;
                        return (
                          <button
                            key={tenure}
                            type="button"
                            onClick={() => setPaylaterTenure(tenure)}
                            className={`p-2 rounded-xl text-center transition cursor-pointer border flex flex-col justify-between ${
                              isSelected
                                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-400 scale-[1.02]'
                                : 'bg-white text-slate-700 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/50'
                            }`}
                          >
                            <div className="font-black text-xs leading-none">
                              {tenure} tháng
                            </div>
                            <div className={`text-[10px] font-bold mt-1.5 leading-tight ${isSelected ? 'text-amber-200' : 'text-emerald-700'}`}>
                              {monthlyVal.toLocaleString('vi-VN')}đ
                              <span className="text-[8px] block opacity-80 font-normal">/tháng</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* BẢNG CAM KẾT THANH TOÁN FULL 100% GIÁ TRỊ ĐƠN HÀNG */}
                    <div className="bg-white/90 border border-emerald-200/90 rounded-xl p-2.5 text-xs space-y-1.5">
                      <div className="flex items-start gap-2">
                        <span className="text-base shrink-0">⚡</span>
                        <div className="text-[11px] text-slate-800 leading-snug">
                          <strong className="text-emerald-800">Cam kết giải ngân tức thì:</strong> Ví MWG PayLater sẽ <strong>thanh toán FULL 100%</strong> toàn bộ giá trị đơn hàng (<span className="text-emerald-700 font-extrabold">{finalTotal.toLocaleString('vi-VN')}đ</span>) ngay lập tức cho đối tác (vé xe, phòng khách sạn, chuyến bay được xác nhận ngay).
                        </div>
                      </div>
                      
                      <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-medium">Hôm nay thanh toán:</span>
                        <span className="font-black text-emerald-700 text-xs">0đ (Không tốn tiền mặt)</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-medium">Trả góp định kỳ {paylaterTenure} tháng:</span>
                        <span className="font-extrabold text-slate-800">
                          {Math.round(finalTotal / paylaterTenure).toLocaleString('vi-VN')}đ / tháng
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 6. Chi tiết tổng tiền */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Tổng tiền dịch vụ:</span>
                  <span>{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>
                {discountTotal > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Ưu đãi chiến dịch:</span>
                    <span>-{discountTotal.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                {pointsDeducted > 0 && (
                  <div className="flex justify-between text-amber-600 font-medium">
                    <span>Trừ điểm Quà Tặng VIP ({pointsDeducted.toLocaleString('vi-VN')} điểm):</span>
                    <span>-{pointsDeducted.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-2 flex justify-between items-baseline font-bold text-sm">
                  <span className="text-slate-900">Thanh toán giả lập:</span>
                  <span className="text-lg font-black text-[#0074C8]">{finalTotal.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer CTA */}
        {!completedOrder && cartItems.length > 0 && (
          <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] text-slate-500 font-medium">Tổng thanh toán</div>
              <div className="text-base font-black text-[#0074C8]">
                {finalTotal.toLocaleString('vi-VN')}đ
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition shadow cursor-pointer ${
                isSubmitting 
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                  : 'bg-[#FFDF00] hover:bg-amber-400 text-[#123653] font-black'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full animate-spin" />
                  <span>Đang xử lý mô phỏng...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Xác nhận & Thanh toán Demo</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
