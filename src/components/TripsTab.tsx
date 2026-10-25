import React, { useState } from 'react';
import { 
  Luggage, 
  Calendar, 
  MapPin, 
  Ticket, 
  Clock, 
  ChevronRight, 
  QrCode, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RefreshCw, 
  FileText, 
  ShieldCheck, 
  X,
  CreditCard
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { Order } from '../types';

export const TripsTab: React.FC<{ onOpenSupport: () => void }> = ({ onOpenSupport }) => {
  const { 
    orders, 
    cancelOrder, 
    showToast, 
    draftPlan, 
    setActiveTab 
  } = useDemo();

  const [filterStatus, setFilterStatus] = useState<'upcoming' | 'ongoing' | 'completed' | 'cancelled'>('upcoming');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [cancelReason, setCancelReason] = useState<string>('Thay đổi lịch trình gia đình');
  const [isCancelling, setIsCancelling] = useState<boolean>(false);

  const filteredOrders = orders.filter(o => {
    if (filterStatus === 'upcoming') {
      return o.overallStatus === 'confirmed' || o.overallStatus === 'paid_processing_partners';
    }
    if (filterStatus === 'ongoing') {
      return o.overallStatus === 'partially_confirmed';
    }
    if (filterStatus === 'completed') {
      return o.overallStatus === 'completed';
    }
    if (filterStatus === 'cancelled') {
      return o.overallStatus === 'cancelled' || o.overallStatus === 'refunded' || o.overallStatus === 'failed';
    }
    return true;
  });

  const handleConfirmCancel = async () => {
    if (!selectedOrder) return;
    setIsCancelling(true);

    const res = await cancelOrder(selectedOrder.orderId, cancelReason);
    setIsCancelling(false);
    setShowCancelModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="w-full min-h-full bg-slate-50 flex flex-col pb-24">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#0074C8] to-sky-700 text-white px-4 py-4 rounded-b-3xl shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Luggage className="w-5 h-5 text-[#FFDF00]" />
          <h1 className="font-extrabold text-sm sm:text-base uppercase tracking-tight">
            Chuyến Đi Của Tôi
          </h1>
        </div>
        <p className="text-xs text-sky-100">
          Quản lý toàn bộ vé điện tử demo, mã đặt phòng khách sạn và yêu cầu hỗ trợ hậu mãi.
        </p>
      </div>

      {/* 2. Filter Status Tabs */}
      <div className="px-4 mt-3">
        <div className="grid grid-cols-4 gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs text-[11px] font-bold text-center">
          <button
            onClick={() => setFilterStatus('upcoming')}
            className={`py-2 rounded-xl transition cursor-pointer ${
              filterStatus === 'upcoming' ? 'bg-[#0074C8] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Sắp tới
          </button>
          <button
            onClick={() => setFilterStatus('ongoing')}
            className={`py-2 rounded-xl transition cursor-pointer ${
              filterStatus === 'ongoing' ? 'bg-[#0074C8] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Đang đi
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`py-2 rounded-xl transition cursor-pointer ${
              filterStatus === 'completed' ? 'bg-[#0074C8] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Đã xong
          </button>
          <button
            onClick={() => setFilterStatus('cancelled')}
            className={`py-2 rounded-xl transition cursor-pointer ${
              filterStatus === 'cancelled' ? 'bg-[#0074C8] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Đã hủy
          </button>
        </div>
      </div>

      {/* Draft plan card if exists */}
      {draftPlan && filterStatus === 'upcoming' && (
        <div className="px-4 mt-3">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-amber-800 uppercase">Bản nháp kế hoạch</span>
              <div className="text-xs font-bold text-slate-800">{draftPlan.parsed.destinationName} ({draftPlan.selectedOption.name})</div>
              <div className="text-[11px] text-amber-700 font-bold">{draftPlan.selectedOption.estimatedTotalCost.toLocaleString('vi-VN')}đ</div>
            </div>
            <button
              onClick={() => setActiveTab('planner')}
              className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold shadow-2xs hover:bg-amber-300 transition"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      )}

      {/* 3. Orders List */}
      <div className="px-4 mt-3 space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center text-slate-500 border border-slate-200 space-y-2">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 text-xl">
              🧳
            </div>
            <div className="font-bold text-xs text-slate-700">Chưa có chuyến đi nào trong mục này</div>
            <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
              Bạn có thể đặt vé hoặc để AI hỗ trợ lên lịch trình cho chuyến đi tiếp theo nhé!
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const firstItem = order.subOrders[0]?.items[0];
            const isConfirmed = order.overallStatus === 'confirmed';
            const isRefunded = order.overallStatus === 'refunded';

            return (
              <div
                key={order.orderId}
                onClick={() => setSelectedOrder(order)}
                className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs hover:shadow-md transition cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-xs text-sky-800">{order.orderNumber}</span>
                    <span className="text-[10px] text-slate-400">• {order.createdAt}</span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isConfirmed
                        ? 'bg-emerald-100 text-emerald-800'
                        : isRefunded
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isConfirmed ? 'Đã xác nhận' : isRefunded ? 'Đã hoàn tiền demo' : order.overallStatus}
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-2 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-xs text-slate-900 line-clamp-1">{firstItem?.title}</h3>
                    <div className="text-[11px] text-slate-500 mt-0.5">{firstItem?.subtitle}</div>
                    <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-sky-600" />
                      <span>Khởi hành: {firstItem?.dateStart}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-black text-[#0074C8]">
                      {order.finalPaidAmount.toLocaleString('vi-VN')}đ
                    </div>
                    <div className="text-[9px] text-slate-400">
                      {order.subOrders.length} dịch vụ
                    </div>
                  </div>
                </div>

                {/* Sub-orders preview pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {order.subOrders.map((sub, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-lg bg-sky-50 text-[#0074C8] text-[10px] font-semibold border border-sky-100">
                      {sub.partnerName}: {sub.items[0]?.title.substring(0, 20)}...
                    </span>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ==================================================== */}
      {/* ORDER / TICKET DETAIL MODAL                          */}
      {/* ==================================================== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
            {/* Modal Header */}
            <div className="bg-[#0074C8] text-white p-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold text-sky-200">Chi tiết chuyến đi & Vé điện tử Demo</div>
                <h3 className="font-mono font-bold text-sm">{selectedOrder.orderNumber}</h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-1 rounded-full hover:bg-white/20 transition cursor-pointer">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Status Banner */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-emerald-900">Đơn hàng đã được xác nhận từ đối tác</div>
                  <div className="text-emerald-700 text-[11px]">Toàn bộ vé demo đã sẵn sàng để check-in.</div>
                </div>
              </div>

              {/* Passenger Info */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-1">
                <div className="font-bold text-slate-700 text-[11px] uppercase">Thông tin hành khách:</div>
                <div className="text-slate-800 font-semibold">{selectedOrder.userName} • {selectedOrder.userPhone}</div>
              </div>

              {/* Sub-orders with Barcodes & QR */}
              <div className="space-y-3">
                <div className="font-bold text-slate-700 text-xs uppercase tracking-wider">
                  Vé & Chứng từ dịch vụ ({selectedOrder.subOrders.length}):
                </div>

                {selectedOrder.subOrders.map((sub, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-3.5 border-2 border-dashed border-sky-300 shadow-2xs space-y-2.5">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-slate-900">{sub.items[0]?.title}</span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#0074C8] text-white">
                            {sub.partnerName}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{sub.items[0]?.subtitle}</div>
                      </div>
                      <Ticket className="w-5 h-5 text-sky-600 shrink-0" />
                    </div>

                    {/* Simulated QR Code Card */}
                    <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between gap-3 border border-slate-200">
                      <div>
                        <div className="text-[9px] text-slate-400 uppercase font-mono font-bold">Mã xác nhận đối tác</div>
                        <div className="font-mono font-black text-sm text-sky-800 tracking-wider">
                          {sub.partnerConfirmationCode}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1">
                          {sub.demoTicket?.instructions || 'Xuất trình mã này tại quầy đối tác.'}
                        </div>
                      </div>

                      {/* Mock QR visual */}
                      <div className="w-14 h-14 bg-white p-1 rounded-lg border border-slate-300 flex items-center justify-center shrink-0">
                        <QrCode className="w-12 h-12 text-slate-900" />
                      </div>
                    </div>

                    <div className="text-[9px] text-center text-slate-400 italic">
                      DEMO ONLY • Mã mô phỏng kiểm thử giao diện
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Summary */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Giá gốc dịch vụ:</span>
                  <span>{selectedOrder.totalOriginalAmount.toLocaleString('vi-VN')}đ</span>
                </div>
                {selectedOrder.campaignDiscountTotal > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Ưu đãi áp dụng:</span>
                    <span>-{selectedOrder.campaignDiscountTotal.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                {selectedOrder.pointsRedeemed > 0 && (
                  <div className="flex justify-between text-amber-600 font-medium">
                    <span>Điểm Quà Tặng VIP:</span>
                    <span>-{selectedOrder.pointsRedeemed.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-1.5 flex justify-between font-black text-sm text-[#0074C8]">
                  <span>Tổng tiền đã thanh toán:</span>
                  <span>{selectedOrder.finalPaidAmount.toLocaleString('vi-VN')}đ</span>
                </div>

                {selectedOrder.paymentMethod === 'mwg_paylater' && (
                  <div className="mt-2 bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-[11px] text-emerald-900 font-bold space-y-0.5">
                    <div className="flex items-center justify-between text-emerald-800">
                      <span>Ví MWG PayLater (Kỳ hạn {selectedOrder.paylaterTenure || 6} tháng)</span>
                      <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-black">FULL 100%</span>
                    </div>
                    <div className="text-[10px] text-emerald-700 font-medium">
                      Đã thanh toán đủ toàn bộ {selectedOrder.finalPaidAmount.toLocaleString('vi-VN')}đ cho đối tác • Trả chậm: {selectedOrder.paylaterMonthlyPayment?.toLocaleString('vi-VN')}đ/tháng (0% lãi suất).
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setSelectedOrder(null);
                  onOpenSupport();
                }}
                className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition cursor-pointer"
              >
                Cần hỗ trợ
              </button>

              {selectedOrder.overallStatus === 'confirmed' && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition cursor-pointer"
                >
                  Yêu cầu đổi / hủy vé
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      {showCancelModal && selectedOrder && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-2">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">Xác nhận yêu cầu hủy chuyến</h3>
              <p className="text-xs text-slate-500 mt-1">
                Theo chính sách hoàn hủy demo, bạn sẽ được hoàn lại 90% số tiền ({Math.round(selectedOrder.finalPaidAmount * 0.9).toLocaleString('vi-VN')}đ).
              </p>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700">Lý do hủy:</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full mt-1 p-2 rounded-xl border border-slate-300 text-xs bg-slate-50 text-slate-800"
              >
                <option value="Thay đổi lịch trình gia đình">Thay đổi lịch trình gia đình</option>
                <option value="Thời tiết không thuận lợi">Thời tiết không thuận lợi</option>
                <option value="Có việc đột xuất">Có việc đột xuất</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Giữ chuyến đi
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={isCancelling}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow transition cursor-pointer"
              >
                {isCancelling ? 'Đang hủy...' : 'Xác nhận hủy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
