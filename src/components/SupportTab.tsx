import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageSquare, 
  PhoneCall, 
  ShieldCheck, 
  Clock, 
  Send, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';

export const SupportTab: React.FC = () => {
  const { supportTickets, createSupportTicket, orders, showToast } = useDemo();

  const [selectedOrderNumber, setSelectedOrderNumber] = useState<string>(orders[0]?.orderNumber || '');
  const [serviceName, setServiceName] = useState<string>(orders[0]?.subOrders[0]?.items[0]?.title || 'Khách sạn / Vé máy bay');
  const [issueCategory, setIssueCategory] = useState<'hoan_huy' | 'doi_ngay' | 'chua_nhan_ve' | 'khieu_nai_dich_vu' | 'khac'>('doi_ngay');
  const [description, setDescription] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      showToast('Vui lòng mô tả chi tiết vấn đề bạn cần hỗ trợ.');
      return;
    }

    createSupportTicket({
      orderNumber: selectedOrderNumber,
      serviceName,
      issueCategory,
      description,
      aiResolutionNote: 'Chính sách hỗ trợ Điện Máy Xanh: Tiếp nhận tự động và chuyển chuyên viên đối tác xử lý theo SLA cam kết.',
      agentResponse: 'Chuyên viên CSKH ĐMX đã tiếp nhận thông tin và đang tra soát trên hệ thống đối tác.',
      estimatedResponseTime: 'Trong vòng 15 phút'
    });

    setDescription('');
    setShowCreateModal(false);
  };

  return (
    <div className="w-full min-h-full bg-slate-50 flex flex-col pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0074C8] to-sky-700 text-white px-4 py-4 rounded-b-3xl shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <HelpCircle className="w-5 h-5 text-[#FFDF00]" />
          <h1 className="font-extrabold text-sm sm:text-base uppercase tracking-tight">
            Trung Tâm Hỗ Trợ Khách Hàng
          </h1>
        </div>
        <p className="text-xs text-sky-100">
          Đầu mối hỗ trợ xuyên suốt của Điện Máy Xanh cho mọi dịch vụ đặt qua Quà Tặng VIP.
        </p>
      </div>

      {/* Quick Contact Cards */}
      <div className="px-4 mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-100 text-[#0074C8] flex items-center justify-center shrink-0">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-800">Hotline 24/7</div>
            <div className="text-[11px] font-mono text-sky-700 font-bold">1800 1061 (Demo)</div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-800">Cam kết SLA</div>
            <div className="text-[10px] text-slate-500">Phản hồi &lt;15 phút</div>
          </div>
        </div>
      </div>

      {/* Create Ticket CTA */}
      <div className="px-4 mt-3">
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-full py-3 bg-[#FFDF00] hover:bg-amber-400 text-[#123653] font-black text-xs rounded-2xl shadow transition cursor-pointer flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Gửi yêu cầu hỗ trợ mới (Đổi / Hủy / Vé)</span>
        </button>
      </div>

      {/* Tickets History List */}
      <div className="px-4 mt-4 space-y-3">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Yêu cầu đã gửi ({supportTickets.length})
        </div>

        {supportTickets.map((tkt) => (
          <div key={tkt.id} className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-sky-800">{tkt.orderNumber}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                {tkt.status === 'dang_xu_ly' ? 'Đang xử lý' : 'Đang tiếp nhận'}
              </span>
            </div>

            <div className="font-bold text-xs text-slate-900">{tkt.serviceName}</div>
            <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              "{tkt.description}"
            </div>

            {tkt.aiResolutionNote && (
              <div className="text-[11px] text-sky-800 bg-sky-50/70 p-2 rounded-xl border border-sky-200">
                🤖 <span className="font-bold">Trợ lý chính sách:</span> {tkt.aiResolutionNote}
              </div>
            )}

            {tkt.agentResponse && (
              <div className="text-[11px] text-slate-700 bg-emerald-50/60 p-2 rounded-xl border border-emerald-200">
                👨‍💼 <span className="font-bold text-emerald-900">Phản hồi CSKH:</span> {tkt.agentResponse}
              </div>
            )}

            <div className="text-[10px] text-slate-400 pt-1 flex items-center justify-between">
              <span>Gửi lúc: {tkt.createdAt}</span>
              <span>Thời gian ước tính: {tkt.estimatedResponseTime}</span>
            </div>
          </div>
        ))}
      </div>

      {/* New Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900">Tạo yêu cầu hỗ trợ mới</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">Mã đơn hàng liên quan</label>
                <select
                  value={selectedOrderNumber}
                  onChange={(e) => setSelectedOrderNumber(e.target.value)}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-800"
                >
                  {orders.map((o) => (
                    <option key={o.orderId} value={o.orderNumber}>
                      {o.orderNumber} ({o.subOrders[0]?.items[0]?.title})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700">Chủ đề cần hỗ trợ</label>
                <select
                  value={issueCategory}
                  onChange={(e) => setIssueCategory(e.target.value as any)}
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-800"
                >
                  <option value="doi_ngay">Đổi ngày / Đổi giờ dịch vụ</option>
                  <option value="hoan_huy">Hủy vé & Yêu cầu hoàn tiền</option>
                  <option value="chua_nhan_ve">Chưa nhận được mã QR / Vé</option>
                  <option value="khieu_nai_dich_vu">Khiếu nại chất lượng đối tác</option>
                  <option value="khac">Vấn đề khác</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700">Mô tả cụ thể</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ví dụ: Tôi muốn đổi giờ khởi hành xe FUTA sang 08:00 sáng..."
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 outline-none focus:border-sky-500"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0074C8] hover:bg-[#005A9E] text-white font-bold rounded-xl shadow"
                >
                  Gửi yêu cầu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
