import React, { useState } from 'react';
import { 
  Building2, 
  Plane, 
  Bus, 
  Ticket, 
  Star, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import { Stay, Flight, TransportTrip, Activity } from '../../types';
import { STAYS, FLIGHTS, TRANSPORTS, ACTIVITIES } from '../../data/catalog';
import { AIRLINE_LOGOS, getStaysForDestination, MASSIVE_FLIGHTS, MASSIVE_TRANSPORTS } from '../../data/massiveCatalog';

interface AlternativeOffersCarouselProps {
  destinationId?: string;
  destinationName?: string;
  currentStayId?: string;
  initialTab?: 'stay' | 'flight' | 'transport' | 'activity';
  onSelectStay?: (stay: Stay) => void;
  onSelectFlight?: (flight: Flight) => void;
  onSelectTransport?: (transport: TransportTrip) => void;
  onSelectActivity?: (activity: Activity) => void;
}

export const AlternativeOffersCarousel: React.FC<AlternativeOffersCarouselProps> = ({
  destinationId = 'phuquoc',
  destinationName = 'Phú Quốc',
  currentStayId,
  initialTab = 'stay',
  onSelectStay,
  onSelectFlight,
  onSelectTransport,
  onSelectActivity
}) => {
  const [activeTab, setActiveTab] = useState<'stay' | 'flight' | 'transport' | 'activity'>(initialTab);

  // Lấy 20 khách sạn/resort phong phú từ getStaysForDestination
  const stays = getStaysForDestination(destinationId);
  const flights = MASSIVE_FLIGHTS;
  const transports = MASSIVE_TRANSPORTS;
  const activities = ACTIVITIES.filter(a => a.destinationId === destinationId || a.name.toLowerCase().includes(destinationName.toLowerCase()));

  return (
    <div className="w-full bg-white rounded-3xl p-3.5 border border-sky-100 shadow-sm space-y-3 font-sans">
      {/* Header & Tabs */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#0071AF]" />
          <span className="font-extrabold text-xs text-slate-900">
            Lựa chọn thay thế tại {destinationName}
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">Cuộn ngang để xem thêm 👉</span>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar text-xs">
        <button
          onClick={() => setActiveTab('stay')}
          className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shrink-0 transition cursor-pointer ${
            activeTab === 'stay'
              ? 'bg-[#0071AF] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Khách sạn & Resort ({stays.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('flight')}
          className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shrink-0 transition cursor-pointer ${
            activeTab === 'flight'
              ? 'bg-[#0071AF] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Plane className="w-3.5 h-3.5" />
          <span>Chuyến bay ({flights.length || 4})</span>
        </button>

        <button
          onClick={() => setActiveTab('transport')}
          className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shrink-0 transition cursor-pointer ${
            activeTab === 'transport'
              ? 'bg-[#0071AF] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Bus className="w-3.5 h-3.5" />
          <span>Xe khách FUTA ({transports.length || 3})</span>
        </button>

        <button
          onClick={() => setActiveTab('activity')}
          className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shrink-0 transition cursor-pointer ${
            activeTab === 'activity'
              ? 'bg-[#0071AF] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Ticket className="w-3.5 h-3.5" />
          <span>Tour & Vui chơi ({activities.length || 5})</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* 1. KHÁCH SẠN CUỘN NGANG                                      */}
      {/* ============================================================ */}
      {activeTab === 'stay' && (
        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar snap-x">
          {stays.map((stay) => {
            const room = stay.rooms[0];
            const isCurrent = stay.id === currentStayId;

            return (
              <div
                key={stay.id}
                className={`w-[220px] sm:w-[240px] shrink-0 bg-white rounded-2xl border ${
                  isCurrent ? 'border-[#0071AF] ring-2 ring-sky-200' : 'border-slate-200'
                } overflow-hidden shadow-xs flex flex-col justify-between snap-start hover:shadow-md transition`}
              >
                <div>
                  <div className="relative h-28 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={stay.coverImage}
                      alt={stay.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/destinations/phuquoc.jpg';
                      }}
                    />
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      {stay.stars}★ • {stay.rating}
                    </div>
                    <div className="absolute top-2 right-2 bg-white/90 text-[#0071AF] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                      {stay.partner}
                    </div>
                  </div>

                  <div className="p-2.5 space-y-1">
                    <h4 className="font-extrabold text-xs text-slate-900 line-clamp-1" title={stay.name}>
                      {stay.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{room ? room.name : 'Phòng Tiêu chuẩn'}</p>
                    <p className="text-[9px] text-emerald-700 font-semibold line-clamp-1">
                      ✓ {stay.amenities[0] || 'Buffet sáng miễn phí'}
                    </p>
                  </div>
                </div>

                <div className="p-2.5 pt-0 border-t border-slate-50 flex items-center justify-between mt-1">
                  <div>
                    <div className="text-[9px] text-slate-400">Chỉ từ</div>
                    <div className="font-black text-xs text-[#0071AF]">
                      {(room?.pricePerNight || 1200000).toLocaleString('vi-VN')}đ
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectStay && onSelectStay(stay)}
                    className="px-2.5 py-1.5 bg-[#FED100] hover:bg-[#E5BC00] text-slate-900 text-[10px] font-black rounded-lg shadow-2xs transition cursor-pointer"
                  >
                    {isCurrent ? 'Đang chọn' : 'Đổi phòng này'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. CHUYẾN BAY CUỘN NGANG VỚI LOGO HÃNG                      */}
      {/* ============================================================ */}
      {activeTab === 'flight' && (
        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar snap-x">
          {(flights.length > 0 ? flights : FLIGHTS).map((flight) => {
            const logoSrc = AIRLINE_LOGOS[flight.airline] || '/logos/vietnam-airlines.svg';

            return (
              <div
                key={flight.id}
                className="w-[230px] sm:w-[250px] shrink-0 bg-white rounded-2xl border border-slate-200 p-3 shadow-xs flex flex-col justify-between snap-start hover:shadow-md transition space-y-2.5"
              >
                <div>
                  {/* Airline Logo Header */}
                  <div className="flex items-center justify-between gap-1 pb-1.5 border-b border-slate-100">
                    <img
                      src={logoSrc}
                      alt={flight.airline}
                      className="h-6 object-contain rounded"
                    />
                    <span className="text-[9px] font-bold text-slate-400 font-mono">{flight.flightNumber}</span>
                  </div>

                  {/* Route & Times */}
                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <div className="font-black text-xs text-slate-900">{flight.departureTime}</div>
                      <div className="text-[10px] text-slate-500">{flight.fromCode}</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] text-slate-400">{flight.duration}</span>
                      <div className="w-12 h-[1px] bg-slate-300 relative my-0.5">
                        <div className="absolute right-0 -top-1 w-2 h-2 border-t border-r border-slate-400 rotate-45" />
                      </div>
                      <span className="text-[8px] text-emerald-600 font-semibold">Bay thẳng</span>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-xs text-slate-900">{flight.arrivalTime}</div>
                      <div className="text-[10px] text-slate-500">{flight.toCode}</div>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 mt-2">
                    Hành lý: {flight.baggageAllowance.checkedKg > 0 ? `${flight.baggageAllowance.checkedKg}kg ký gửi` : 'Xách tay 7kg'}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="font-black text-xs text-[#0071AF]">
                    {flight.pricePerAdult.toLocaleString('vi-VN')}đ
                  </div>
                  <button
                    onClick={() => onSelectFlight && onSelectFlight(flight)}
                    className="px-2.5 py-1.5 bg-[#FED100] hover:bg-[#E5BC00] text-slate-900 text-[10px] font-black rounded-lg shadow-2xs transition cursor-pointer"
                  >
                    Chọn chuyến bay
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. XE KHÁCH CUỘN NGANG                                       */}
      {/* ============================================================ */}
      {activeTab === 'transport' && (
        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar snap-x">
          {(transports.length > 0 ? transports : TRANSPORTS).map((t) => (
            <div
              key={t.id}
              className="w-[230px] sm:w-[250px] shrink-0 bg-white rounded-2xl border border-slate-200 p-3 shadow-xs flex flex-col justify-between snap-start hover:shadow-md transition space-y-2.5"
            >
              <div>
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span className="font-bold text-xs text-orange-600 truncate">{t.operator}</span>
                  <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">FUTA</span>
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-2">{t.seatClass}</div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Xuất bến: <strong className="text-slate-800">{t.departureTime}</strong> ({t.duration})
                </div>
                <div className="text-[9px] text-slate-400 mt-0.5 line-clamp-1">Đón: {t.pickupPoints[0]}</div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="font-black text-xs text-[#0071AF]">
                  {t.pricePerTicket.toLocaleString('vi-VN')}đ
                </div>
                <button
                  onClick={() => onSelectTransport && onSelectTransport(t)}
                  className="px-2.5 py-1.5 bg-[#FED100] hover:bg-[#E5BC00] text-slate-900 text-[10px] font-black rounded-lg shadow-2xs transition cursor-pointer"
                >
                  Chọn vé xe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. TOUR & VÉ THAM QUAN CUỘN NGANG                            */}
      {/* ============================================================ */}
      {activeTab === 'activity' && (
        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar snap-x">
          {(activities.length > 0 ? activities : ACTIVITIES).map((act) => (
            <div
              key={act.id}
              className="w-[220px] sm:w-[240px] shrink-0 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between snap-start hover:shadow-md transition"
            >
              <div>
                <div className="h-24 w-full bg-slate-200 overflow-hidden relative">
                  <img src={act.coverImage} alt={act.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    {act.duration}
                  </div>
                </div>
                <div className="p-2.5 space-y-1">
                  <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{act.name}</h4>
                  <p className="text-[10px] text-slate-500 line-clamp-2">{act.shortDescription}</p>
                </div>
              </div>

              <div className="p-2.5 pt-0 border-t border-slate-50 flex items-center justify-between mt-1">
                <div className="font-black text-xs text-[#0071AF]">
                  {(act.options?.[0]?.price || 500000).toLocaleString('vi-VN')}đ
                </div>
                <button
                  onClick={() => onSelectActivity && onSelectActivity(act)}
                  className="px-2.5 py-1.5 bg-[#FED100] hover:bg-[#E5BC00] text-slate-900 text-[10px] font-black rounded-lg shadow-2xs transition cursor-pointer"
                >
                  + Thêm tour
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
