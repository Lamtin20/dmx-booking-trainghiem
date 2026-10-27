import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Check, 
  ArrowRight, 
  Percent, 
  Calendar, 
  CheckCircle2,
  ChevronRight,
  Info,
  Gift
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export interface PayLaterPackage {
  id: string;
  destinationId: string;
  destinationName: string;
  title: string;
  hotelName: string;
  transportInfo: string;
  durationText: string;
  totalPrice: number;
  monthly12: number;
  monthly6: number;
  monthly3: number;
  image: string;
  tags: string[];
}

export const PAYLATER_PACKAGES: PayLaterPackage[] = [
  {
    id: 'pkg_phuquoc_vinpearl',
    destinationId: 'phuquoc',
    destinationName: 'Phú Quốc',
    title: 'Combo Phú Quốc 3N2Đ Vinpearl Resort & Vé Máy Bay Khứ Hồi',
    hotelName: 'Vinpearl Resort & Spa Phú Quốc 5★',
    transportInfo: 'Vé bay Vietnam Airlines khứ hồi',
    durationText: '3 ngày 2 đêm',
    totalPrice: 6200000,
    monthly12: 516000,
    monthly6: 1033000,
    monthly3: 2066000,
    image: '/destinations/phuquoc.jpg',
    tags: ['0% Lãi suất', 'Hot nhất', 'Tài trợ 100%']
  },
  {
    id: 'pkg_dalat_colline',
    destinationId: 'dalat',
    destinationName: 'Đà Lạt',
    title: 'Combo Đà Lạt Săn Mây 3N2Đ Hôtel Colline & Limousine VIP',
    hotelName: 'Hôtel Colline Đà Lạt 4★ (Ngay chợ)',
    transportInfo: 'Xe Limousine VIP khứ hồi đón tận nơi',
    durationText: '3 ngày 2 đêm',
    totalPrice: 3900000,
    monthly12: 325000,
    monthly6: 650000,
    monthly3: 1300000,
    image: '/destinations/dalat.jpg',
    tags: ['Săn mây', 'Trả chậm 325K/tháng']
  },
  {
    id: 'pkg_tayninh_baden',
    destinationId: 'tayninh',
    destinationName: 'Tây Ninh',
    title: 'Combo Tây Ninh Tâm Linh 2N1Đ Sun World Bà Đen & Vinpearl Hotel',
    hotelName: 'Melia Vinpearl Tây Ninh 5★',
    transportInfo: 'Vé cáp treo đỉnh Bà Đen + Buffet chay',
    durationText: '2 ngày 1 đêm',
    totalPrice: 2450000,
    monthly12: 204000,
    monthly6: 408000,
    monthly3: 816000,
    image: '/destinations/tayninh.jpg',
    tags: ['Tâm linh', 'Chỉ 204K/tháng']
  },
  {
    id: 'pkg_nhatrang_muongthanh',
    destinationId: 'nhatrang',
    destinationName: 'Nha Trang',
    title: 'Combo Nha Trang Biển Xanh 3N2Đ Mường Thanh Luxury & Vé Bay',
    hotelName: 'Mường Thanh Luxury Nha Trang 5★',
    transportInfo: 'Vé bay Vietjet Air khứ hồi',
    durationText: '3 ngày 2 đêm',
    totalPrice: 5400000,
    monthly12: 450000,
    monthly6: 900000,
    monthly3: 1800000,
    image: '/destinations/nhatrang.jpg',
    tags: ['View biển', 'Trả góp 0%']
  }
];

interface PayLaterConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPackage?: (pkg: PayLaterPackage) => void;
  currentAmount?: number;
}

export const PayLaterConsultationModal: React.FC<PayLaterConsultationModalProps> = ({
  isOpen,
  onClose,
  onSelectPackage,
  currentAmount = 18600000
}) => {
  const { activePersona } = useDemo();
  const [sliderAmount, setSliderAmount] = useState<number>(currentAmount || 15000000);
  const [selectedTenor, setSelectedTenor] = useState<3 | 6 | 9 | 12>(6);
  const [isActivated, setIsActivated] = useState<boolean>(true);

  if (!isOpen) return null;

  const monthlyPayment = Math.round(sliderAmount / selectedTenor);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 font-sans select-none animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-[#0071AF] via-sky-700 to-blue-800 text-white p-4 px-5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FED100] text-slate-900 flex items-center justify-center font-black text-sm shadow-sm">
              MWG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                  Ví MWG PayLater • 0% Lãi Suất
                </h3>
                <span className="px-2 py-0.2 rounded-full text-[9px] font-black uppercase bg-[#FED100] text-slate-900">
                  ĐẶC QUYỀN
                </span>
              </div>
              <p className="text-[11px] text-sky-100">
                Tài trợ du lịch & vé xem phim • Trả trước 0đ hôm nay
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs">
          {/* User Approved Limit Card */}
          <div className="bg-gradient-to-br from-[#FFF9EA] via-[#FEF7DE] to-[#FFFDF8] border border-amber-300/80 rounded-3xl p-4 shadow-sm relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                  HẠN MỨC ĐÃ PHÊ DUYỆT TỰ ĐỘNG
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-[#0071AF]">
                    30.000.000
                  </span>
                  <span className="text-sm font-extrabold text-slate-700">đ</span>
                </div>
                <div className="text-[11px] text-slate-600 font-medium mt-1">
                  Chủ tài khoản: <strong>{activePersona.honorific} {activePersona.name}</strong> • SĐT: <strong>{activePersona.phone || '0988.***.789'}</strong>
                </div>
              </div>

              <div className="px-2.5 py-1 bg-emerald-600 text-white rounded-full text-[10px] font-bold flex items-center gap-1 shadow-xs">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>Đã kích hoạt</span>
              </div>
            </div>

            {/* 3 USPs */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-amber-200/60 text-center">
              <div>
                <div className="font-extrabold text-slate-900 text-[11px]">0đ hôm nay</div>
                <div className="text-[10px] text-slate-500">Giữ vé & phòng ngay</div>
              </div>
              <div>
                <div className="font-extrabold text-emerald-700 text-[11px]">0% Lãi suất</div>
                <div className="text-[10px] text-slate-500">Kỳ hạn đến 12 tháng</div>
              </div>
              <div>
                <div className="font-extrabold text-[#0071AF] text-[11px]">30 giây duyệt</div>
                <div className="text-[10px] text-slate-500">Không cần chứng minh</div>
              </div>
            </div>
          </div>

          {/* Interactive Repayment Calculator */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#0071AF]" />
                <span>Bảng tính trả chậm linh hoạt</span>
              </span>
              <span className="text-xs font-bold text-[#0071AF]">
                {sliderAmount.toLocaleString('vi-VN')}đ
              </span>
            </div>

            {/* Slider */}
            <div>
              <input
                type="range"
                min={2000000}
                max={30000000}
                step={500000}
                value={sliderAmount}
                onChange={(e) => setSliderAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0071AF]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>2 triệu</span>
                <span>15 triệu</span>
                <span>30 triệu (Tối đa)</span>
              </div>
            </div>

            {/* Tenor Selection */}
            <div>
              <div className="text-[11px] font-bold text-slate-700 mb-1.5">Chọn số tháng trả góp:</div>
              <div className="grid grid-cols-4 gap-1.5">
                {([3, 6, 9, 12] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedTenor(t)}
                    className={`py-2 rounded-xl font-bold text-xs transition cursor-pointer border text-center ${
                      selectedTenor === t
                        ? 'bg-[#0071AF] text-white border-[#0071AF] shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <div>{t} Tháng</div>
                    {t === 6 && <span className="text-[8px] text-[#FED100] block">Gợi ý</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly payment result */}
            <div className="bg-[#F8FAFC] border border-sky-100 rounded-2xl p-3 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-500">Mỗi tháng trả góp chỉ:</div>
                <div className="text-xl font-black text-[#0071AF]">
                  {monthlyPayment.toLocaleString('vi-VN')}đ
                  <span className="text-xs font-normal text-slate-500"> /tháng</span>
                </div>
              </div>
              <div className="text-right text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                ✓ 0% Lãi suất • 0đ phí ẩn
              </div>
            </div>
          </div>

          {/* Supported PayLater Tour & Travel Packages */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs text-slate-900">
                Gói du lịch tài trợ 100% qua PayLater:
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Bấm chọn để lên lịch trình</span>
            </div>

            <div className="space-y-2.5">
              {PAYLATER_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-2xl p-3 border border-slate-200 hover:border-[#0071AF] transition shadow-2xs hover:shadow-md flex gap-3 cursor-pointer group"
                  onClick={() => {
                    if (onSelectPackage) onSelectPackage(pkg);
                    onClose();
                  }}
                >
                  <img
                    src={pkg.image}
                    alt={pkg.destinationName}
                    className="w-20 h-24 rounded-xl object-cover shrink-0 shadow-xs group-hover:scale-102 transition"
                  />

                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {pkg.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-1.5 py-0.2 bg-sky-50 text-[#0071AF] rounded text-[9px] font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="font-black text-xs text-slate-900 mt-1 line-clamp-1">
                        {pkg.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {pkg.hotelName} • {pkg.transportInfo}
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between mt-2 pt-1.5 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400">Trả chậm chỉ:</span>
                        <div className="text-xs font-black text-[#0071AF]">
                          {pkg.monthly12.toLocaleString('vi-VN')}đ<span className="text-[10px] font-normal text-slate-500">/tháng</span>
                        </div>
                      </div>

                      <button className="px-2.5 py-1 bg-[#FFDF00] group-hover:bg-amber-400 text-slate-900 font-extrabold text-[10px] rounded-lg transition shadow-2xs flex items-center gap-1">
                        <span>Chọn gói</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 border-t border-slate-100 bg-white sticky bottom-0 rounded-b-3xl flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
          >
            Đóng
          </button>
          <button
            onClick={() => {
              if (onSelectPackage) onSelectPackage(PAYLATER_PACKAGES[0]);
              onClose();
            }}
            className="flex-2 py-3 bg-[#FFDF00] hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Áp dụng PayLater vào lịch trình</span>
          </button>
        </div>
      </div>
    </div>
  );
};
