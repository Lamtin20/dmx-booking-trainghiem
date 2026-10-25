import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Building2, 
  Plane, 
  Bus, 
  Camera, 
  Ticket, 
  Star, 
  MapPin, 
  Heart, 
  ChevronRight, 
  Check, 
  ShieldCheck, 
  Calendar, 
  Users, 
  Clock, 
  X,
  Filter,
  CheckCircle2,
  Bot
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { DESTINATIONS } from '../data/destinations';
import { STAYS, FLIGHTS, TRANSPORTS, ACTIVITIES, EVENTS } from '../data/catalog';
import { ServiceCategory, Stay, Flight, TransportTrip, Activity, EntertainmentEvent, CartItem } from '../types';

export const ExploreTab: React.FC<{ onOpenCart: () => void }> = ({ onOpenCart }) => {
  const { 
    addToCart, 
    wishlistIds, 
    toggleWishlist, 
    setActiveTab, 
    campaigns, 
    showToast,
    activeServiceCategory,
    setActiveServiceCategory
  } = useDemo();

  const [selectedDestinationId, setSelectedDestinationId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterFreeCancel, setFilterFreeCancel] = useState<boolean>(false);
  const [filterBreakfast, setFilterBreakfast] = useState<boolean>(false);

  // Active Detail Modal item
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedTransport, setSelectedTransport] = useState<TransportTrip | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EntertainmentEvent | null>(null);

  // Seat picking state for bus/train
  const [chosenSeatNumber, setChosenSeatNumber] = useState<string>('A2');

  // Filter items
  const filteredStays = STAYS.filter(s => {
    if (selectedDestinationId !== 'all' && s.destinationId !== selectedDestinationId) return false;
    if (filterFreeCancel && !s.policies.cancellationSummary.toLowerCase().includes('miễn phí')) return false;
    if (filterBreakfast && !s.amenities.some(a => a.toLowerCase().includes('sáng'))) return false;
    if (searchQuery && !s.name.toLowerCase().includes(searchQuery.toLowerCase()) && !s.address.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const filteredFlights = FLIGHTS.filter(f => {
    if (searchQuery && !f.airline.toLowerCase().includes(searchQuery.toLowerCase()) && !f.toCity.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const filteredTransports = TRANSPORTS.filter(t => {
    if (searchQuery && !t.operator.toLowerCase().includes(searchQuery.toLowerCase()) && !t.toCity.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const filteredActivities = ACTIVITIES.filter(a => {
    if (selectedDestinationId !== 'all' && a.destinationId !== selectedDestinationId) return false;
    if (searchQuery && !a.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const filteredEvents = EVENTS.filter(e => {
    if (selectedDestinationId !== 'all' && e.destinationId !== selectedDestinationId) return false;
    if (searchQuery && !e.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Direct Booking Handlers
  const handleBookStayRoom = (stay: Stay, room: any) => {
    const item: CartItem = {
      cartItemId: `cart_stay_${stay.id}_${Date.now()}`,
      category: 'stay',
      partnerName: stay.partner,
      title: stay.name,
      subtitle: `${room.name} • 2 đêm (15/11 - 17/11)`,
      destinationName: DESTINATIONS.find(d => d.id === stay.destinationId)?.name || 'Việt Nam',
      dateStart: '2026-11-15',
      dateEnd: '2026-11-17',
      quantity: 1,
      unitPrice: room.pricePerNight * 2,
      totalPrice: room.pricePerNight * 2,
      details: {
        roomName: room.name,
        nights: 2,
        adults: room.maxAdults,
        children: room.maxChildren
      },
      eligibleForCampaignIds: stay.campaignIds || ['camp_vip10', 'camp_family200']
    };
    addToCart(item);
    setSelectedStay(null);
    onOpenCart();
  };

  const handleBookFlight = (flight: Flight) => {
    const item: CartItem = {
      cartItemId: `cart_flight_${flight.id}_${Date.now()}`,
      category: 'flight',
      partnerName: flight.partner,
      title: `${flight.airline} (${flight.flightNumber})`,
      subtitle: `${flight.fromCity} ➔ ${flight.toCity} • ${flight.departureTime}`,
      destinationName: flight.toCity,
      dateStart: flight.date,
      timeSlot: flight.departureTime,
      quantity: 1,
      unitPrice: flight.pricePerAdult,
      totalPrice: flight.pricePerAdult,
      details: {
        flightNumber: flight.flightNumber,
        cabinClass: flight.cabinClass,
        baggage: flight.baggageAllowance
      },
      eligibleForCampaignIds: flight.campaignIds || ['camp_vip10']
    };
    addToCart(item);
    setSelectedFlight(null);
    onOpenCart();
  };

  const handleBookTransport = (trip: TransportTrip) => {
    const item: CartItem = {
      cartItemId: `cart_trans_${trip.id}_${Date.now()}`,
      category: 'bus_train',
      partnerName: trip.partner,
      title: `${trip.operator} • Ghế ${chosenSeatNumber}`,
      subtitle: `${trip.fromCity} ➔ ${trip.toCity} • ${trip.departureTime}`,
      destinationName: trip.toCity,
      dateStart: trip.date,
      timeSlot: trip.departureTime,
      quantity: 1,
      unitPrice: trip.pricePerTicket,
      totalPrice: trip.pricePerTicket,
      details: {
        seatNumber: chosenSeatNumber,
        tripNumber: trip.trainOrBusNumber
      },
      eligibleForCampaignIds: trip.campaignIds || ['camp_vip10']
    };
    addToCart(item);
    setSelectedTransport(null);
    onOpenCart();
  };

  const handleBookActivity = (act: Activity, option: any) => {
    const item: CartItem = {
      cartItemId: `cart_act_${act.id}_${Date.now()}`,
      category: 'activity',
      partnerName: act.partner,
      title: act.name,
      subtitle: `${option.name} • 1 vé`,
      destinationName: DESTINATIONS.find(d => d.id === act.destinationId)?.name || 'Việt Nam',
      dateStart: '2026-11-20',
      quantity: 1,
      unitPrice: option.price,
      totalPrice: option.price,
      details: {
        optionName: option.name,
        timeSlot: act.timeSlots[0]
      },
      eligibleForCampaignIds: act.campaignIds || ['camp_vip10', 'camp_attraction15']
    };
    addToCart(item);
    setSelectedActivity(null);
    onOpenCart();
  };

  const handleBookEvent = (evt: EntertainmentEvent, tier: any) => {
    const item: CartItem = {
      cartItemId: `cart_evt_${evt.id}_${Date.now()}`,
      category: 'event',
      partnerName: evt.partner,
      title: evt.title,
      subtitle: `Hạng vé: ${tier.tierName} • 1 vé`,
      destinationName: DESTINATIONS.find(d => d.id === evt.destinationId)?.name || 'Việt Nam',
      dateStart: '2026-11-28',
      quantity: 1,
      unitPrice: tier.price,
      totalPrice: tier.price,
      details: {
        tierName: tier.tierName,
        venue: evt.venue
      },
      eligibleForCampaignIds: evt.campaignIds || ['camp_vip10']
    };
    addToCart(item);
    setSelectedEvent(null);
    onOpenCart();
  };

  return (
    <div className="w-full min-h-full bg-[#F4F6F8] flex flex-col pb-24 font-sans">
      {/* 1. Hero Banner chuẩn phong cách Điện Máy Xanh */}
      <div className="px-3.5 pt-3">
        <div 
          onClick={() => setActiveTab('planner')}
          className="bg-gradient-to-r from-[#0071AF] via-[#0082CA] to-[#009AE0] text-white rounded-2xl p-4 shadow-sm relative overflow-hidden cursor-pointer hover:shadow-md transition group"
        >
          <div className="relative z-10 max-w-[85%]">
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#FED100] text-[#1D2129] uppercase tracking-wider inline-flex items-center gap-1">
              <Bot className="w-3 h-3 text-[#1D2129]" />
              Đặc quyền Quà Tặng VIP • Giảm 10%
            </span>
            <div className="font-bold text-base sm:text-lg mt-2 text-white leading-tight">
              Chuyến đi theo ý bạn • Tư vấn bởi AI
            </div>
            <p className="text-[11px] text-white/90 mt-1">
              Khách sạn, vé xe Phương Trang FUTA, chuyến bay & tour vui chơi giá tốt nhất.
            </p>
            <div className="mt-3 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#FED100] hover:bg-[#E5BC00] text-[#1D2129] font-black text-xs shadow-xs transition">
              <span>Trò chuyện cùng Chatbot</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Ngành hàng dịch vụ chuẩn e-commerce Điện Máy Xanh */}
      <div className="px-3.5 mt-3.5">
        <div className="grid grid-cols-5 gap-2 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs text-center text-xs">
          {[
            { id: null, label: 'Tất cả', icon: '🌟', bg: 'bg-amber-50 text-amber-600' },
            { id: 'stay', label: 'Khách sạn', icon: '🏨', bg: 'bg-blue-50 text-[#0071AF]' },
            { id: 'flight', label: 'Máy bay', icon: '✈️', bg: 'bg-sky-50 text-sky-600' },
            { id: 'bus_train', label: 'Xe khách', icon: '🚌', bg: 'bg-orange-50 text-orange-600' },
            { id: 'activity', label: 'Vui chơi', icon: '🎡', bg: 'bg-emerald-50 text-emerald-600' }
          ].map((cat) => {
            const isSelected = activeServiceCategory === cat.id;
            return (
              <button
                key={cat.label}
                onClick={() => setActiveServiceCategory(cat.id as any)}
                className={`flex flex-col items-center py-1.5 px-0.5 rounded-xl transition cursor-pointer ${
                  isSelected
                    ? 'bg-sky-50 text-[#0071AF] font-bold ring-1.5 ring-[#0071AF]'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl ${cat.bg} flex items-center justify-center text-base mb-1 shadow-2xs`}>
                  {cat.icon}
                </div>
                <span className="text-[11px] font-medium leading-tight">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Search Bar & Destination Filter */}
      <div className="px-3.5 mt-3 space-y-2">
        <div className="bg-white rounded-xl px-3 py-2 flex items-center gap-2 border border-slate-200 shadow-2xs focus-within:border-[#0071AF] focus-within:ring-1 focus-within:ring-[#0071AF] transition">
          <Search className="w-4 h-4 text-[#0071AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên khách sạn, địa điểm, hãng xe..."
            className="w-full text-xs text-[#1D2129] outline-none placeholder:text-slate-400 font-normal"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="p-0.5 text-slate-400 hover:text-slate-600 cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Destination Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setSelectedDestinationId('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedDestinationId === 'all'
                ? 'bg-[#0071AF] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Tất cả điểm đến
          </button>
          {DESTINATIONS.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDestinationId(d.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedDestinationId === d.id
                  ? 'bg-[#0071AF] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Active Catalog List */}
      <div className="px-3.5 mt-3.5 space-y-4">
        {/* SECTION 1: LƯU TRÚ (HOTELS / RESORTS) */}
        {(activeServiceCategory === null || activeServiceCategory === 'stay') && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-sm font-bold text-[#1D2129] flex items-center gap-1.5">
                  <span className="w-2 h-4 rounded-xs bg-[#0071AF] inline-block" />
                  <span>Khách sạn & Resort nổi bật</span>
                </h2>
                <span className="text-[11px] text-slate-500">Giá rõ ràng, miễn phí ăn sáng buffet, thang máy</span>
              </div>
              <span className="text-xs font-bold text-[#0071AF]">{filteredStays.length} cơ sở</span>
            </div>

            {filteredStays.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl text-center text-xs text-slate-500 border border-slate-200">
                Không tìm thấy khách sạn phù hợp với bộ lọc hiện tại.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredStays.map((stay) => {
                  const isSaved = wishlistIds.includes(stay.id);
                  const minPrice = Math.min(...stay.rooms.map(r => r.pricePerNight));
                  const originalPrice = Math.round(minPrice * 1.15);

                  return (
                    <div
                      key={stay.id}
                      onClick={() => setSelectedStay(stay)}
                      className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-2xs hover:shadow-md transition cursor-pointer flex gap-3 group"
                    >
                      {/* Ảnh Khách sạn */}
                      <div className="relative w-32 h-28 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                        <img 
                          src={stay.coverImage} 
                          alt={stay.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(stay.id);
                          }}
                          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/40 backdrop-blur text-white hover:text-rose-400 transition"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                        <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#0071AF] text-white">
                          {stay.partner}
                        </span>
                      </div>

                      {/* Thông tin Khách sạn */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{stay.rating}</span>
                            <span className="text-slate-400 font-normal">({stay.reviewCount})</span>
                          </div>

                          <h3 className="font-bold text-xs sm:text-sm text-[#1D2129] line-clamp-1 mt-0.5 group-hover:text-[#0071AF] transition">
                            {stay.name}
                          </h3>

                          <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{stay.address}</span>
                          </div>

                          <div className="flex flex-wrap gap-1 mt-1">
                            {stay.tags.slice(0, 2).map((t, idx) => (
                              <span key={idx} className="px-1.5 py-0.2 rounded text-[9px] bg-slate-100 text-slate-600 font-medium">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Giá tiền chuẩn phong cách Điện Máy Xanh */}
                        <div className="flex items-end justify-between mt-2 pt-1.5 border-t border-slate-100">
                          <div>
                            <div className="text-[10px] text-slate-400 line-through">
                              {originalPrice.toLocaleString('vi-VN')}₫
                            </div>
                            <div className="text-sm font-extrabold text-[#E11B1E] leading-none">
                              {minPrice.toLocaleString('vi-VN')}₫
                              <span className="text-[10px] text-slate-500 font-normal ml-0.5">/đêm</span>
                            </div>
                          </div>

                          <button className="px-2.5 py-1 rounded-lg bg-[#FED100] hover:bg-[#E5BC00] text-[#1D2129] font-bold text-[11px] shadow-2xs transition">
                            Chọn phòng
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SECTION 2: CHUYẾN BAY (FLIGHTS) */}
        {(activeServiceCategory === null || activeServiceCategory === 'flight') && (
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Plane className="w-4 h-4 text-sky-600" />
                  <span>Vé máy bay giá tốt</span>
                </h2>
                <span className="text-[10px] text-slate-400">Giờ bay đẹp, Vietnam Airlines, Vietjet</span>
              </div>
              <span className="text-xs font-bold text-sky-600">{filteredFlights.length} chuyến</span>
            </div>

            <div className="space-y-2.5">
              {filteredFlights.map((flight) => (
                <div
                  key={flight.id}
                  onClick={() => setSelectedFlight(flight)}
                  className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-2xs hover:shadow-md transition cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-xs text-sky-900">{flight.airline}</span>
                      <span className="text-[10px] font-mono text-slate-400">{flight.flightNumber}</span>
                      <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-sky-100 text-sky-800">
                        {flight.partner}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-800">
                      <div>
                        <div className="font-black text-sm">{flight.departureTime}</div>
                        <div className="text-[10px] text-slate-400">{flight.fromCode}</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] text-slate-400 font-mono">{flight.duration}</span>
                        <div className="w-16 h-0.5 bg-slate-300 relative my-0.5">
                          <Plane className="w-2.5 h-2.5 text-sky-600 absolute -top-1 left-1/2 -translate-x-1/2" />
                        </div>
                        <span className="text-[8px] text-emerald-600 font-semibold">Bay thẳng</span>
                      </div>
                      <div>
                        <div className="font-black text-sm">{flight.arrivalTime}</div>
                        <div className="text-[10px] text-slate-400">{flight.toCode}</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-black text-[#0074C8]">
                      {flight.pricePerAdult.toLocaleString('vi-VN')}đ
                    </div>
                    <div className="text-[10px] text-slate-400">/{flight.cabinClass}</div>
                    <button className="mt-1 px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[10px] shadow-2xs cursor-pointer">
                      Chọn vé
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: VÉ XE KHÁCH & TÀU HỎA */}
        {(activeServiceCategory === null || activeServiceCategory === 'bus_train') && (
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Bus className="w-4 h-4 text-amber-600" />
                  <span>Vé xe khách & Tàu hỏa (Vexere)</span>
                </h2>
                <span className="text-[10px] text-slate-400">Phương Trang FUTA, Hoa Mai VIP, Tàu SE Thống Nhất</span>
              </div>
              <span className="text-xs font-bold text-amber-600">{filteredTransports.length} tuyến</span>
            </div>

            <div className="space-y-2.5">
              {filteredTransports.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => setSelectedTransport(trip)}
                  className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-2xs hover:shadow-md transition cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-bold text-xs text-slate-900">{trip.operator}</span>
                      <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-amber-100 text-amber-900">
                        {trip.seatClass}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-slate-800">
                      {trip.fromCity} ➔ {trip.toCity}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Khởi hành: <span className="font-bold text-slate-700">{trip.departureTime}</span> ({trip.duration})
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-black text-[#0074C8]">
                      {trip.pricePerTicket.toLocaleString('vi-VN')}đ
                    </div>
                    <div className="text-[9px] text-emerald-600 font-semibold">Còn {trip.availableSeats} chỗ</div>
                    <button className="mt-1 px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[10px] shadow-2xs cursor-pointer">
                      Chọn chỗ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: TOUR & VÉ THAM QUAN (ACTIVITIES) */}
        {(activeServiceCategory === null || activeServiceCategory === 'activity') && (
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-emerald-600" />
                  <span>Vé vui chơi & Tour tham quan</span>
                </h2>
                <span className="text-[10px] text-slate-400">Bà Nà Hills, Ký ức Hội An, Datanla, VinWonders</span>
              </div>
              <span className="text-xs font-bold text-emerald-600">{filteredActivities.length} hoạt động</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredActivities.map((act) => (
                <div
                  key={act.id}
                  onClick={() => setSelectedActivity(act)}
                  className="bg-white rounded-3xl p-3 border border-slate-200/90 shadow-2xs hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-slate-100 mb-2">
                      <img src={act.coverImage} alt={act.name} className="w-full h-full object-cover" />
                      <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.2 rounded text-[8px] font-bold bg-emerald-600 text-white">
                        {act.partner}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{act.rating}</span>
                      <span className="text-slate-400 font-normal">({act.reviewCount})</span>
                    </div>
                    <h3 className="font-bold text-xs text-slate-900 mt-1 line-clamp-2">{act.name}</h3>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-400">Từ</span>
                      <div className="text-xs font-black text-[#0074C8]">
                        {act.options[0].price.toLocaleString('vi-VN')}đ
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Giảm 15% VUIHE15
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5: SỰ KIỆN & CONCERT */}
        {(activeServiceCategory === null || activeServiceCategory === 'event') && (
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Ticket className="w-4 h-4 text-rose-600" />
                  <span>Sự kiện & Concert âm nhạc (Ticketbox)</span>
                </h2>
                <span className="text-[10px] text-slate-400">Hà Anh Tuấn Live Concert, Vũ Tour, DIFF Pháo hoa</span>
              </div>
              <span className="text-xs font-bold text-rose-600">{filteredEvents.length} sự kiện</span>
            </div>

            <div className="space-y-3">
              {filteredEvents.map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt)}
                  className="bg-white rounded-3xl p-3 border border-slate-200/90 shadow-2xs hover:shadow-md transition cursor-pointer flex gap-3"
                >
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-950">
                    <img src={evt.coverImage} alt={evt.title} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.2 rounded text-[8px] font-bold bg-rose-600 text-white">
                      {evt.partner}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-xs text-slate-900 line-clamp-1">{evt.title}</h3>
                      <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{evt.dateTime}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="line-clamp-1">{evt.venue}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                      <div>
                        <span className="text-[9px] text-slate-400">Từ</span>
                        <div className="text-xs font-black text-rose-600">
                          {evt.tiers[evt.tiers.length - 1].price.toLocaleString('vi-VN')}đ
                        </div>
                      </div>
                      <button className="px-2.5 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[10px] shadow-2xs">
                        Mua vé
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* DETAIL MODALS FOR 1-CLICK BOOKING                     */}
      {/* ==================================================== */}

      {/* 1. Stay Detail Modal */}
      {selectedStay && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
            <div className="relative h-44 shrink-0 bg-slate-900">
              <img src={selectedStay.coverImage} alt={selectedStay.name} className="w-full h-full object-cover" />
              <button onClick={() => setSelectedStay(null)} className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition">
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0074C8] text-white">
                Đối tác: {selectedStay.partner}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <h3 className="font-black text-base text-slate-900">{selectedStay.name}</h3>
                <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>{selectedStay.address}</span>
                </div>
                <div className="mt-2 text-xs text-slate-600">{selectedStay.description}</div>
              </div>

              {/* Amenities */}
              <div>
                <div className="text-xs font-bold uppercase text-slate-700 mb-1.5">Tiện nghi nổi bật:</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStay.amenities.map((a, i) => (
                    <span key={i} className="px-2 py-1 rounded-lg bg-sky-50 text-sky-800 text-[11px] font-medium flex items-center gap-1">
                      <Check className="w-3 h-3 text-sky-600" />
                      <span>{a}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Room Selection */}
              <div>
                <div className="text-xs font-bold uppercase text-slate-700 mb-2">Chọn loại phòng:</div>
                <div className="space-y-2.5">
                  {selectedStay.rooms.map((room) => (
                    <div key={room.id} className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-xs text-slate-900">{room.name}</div>
                        <div className="text-[11px] text-slate-500">{room.bedType} • {room.areaM2}m²</div>
                        <div className="text-[10px] text-emerald-700 font-semibold mt-1">
                          ✓ {room.includesBreakfast ? 'Bao gồm ăn sáng' : 'Chưa có ăn sáng'} • Miễn phí hủy trước {room.freeCancellationBeforeDays} ngày
                        </div>
                        <div className="text-xs font-black text-[#0074C8] mt-1">
                          {room.pricePerNight.toLocaleString('vi-VN')}đ <span className="text-[10px] font-normal text-slate-400">/đêm</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleBookStayRoom(selectedStay, room)}
                        className="px-3.5 py-2 rounded-xl bg-[#FFDF00] hover:bg-amber-400 text-[#123653] font-black text-xs transition shadow-xs cursor-pointer shrink-0"
                      >
                        Đặt phòng
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Bus / Train Seat Picker Modal */}
      {selectedTransport && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
            <div className="bg-[#0074C8] text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm">{selectedTransport.operator}</h3>
                <div className="text-xs text-sky-100">
                  {selectedTransport.fromCity} ➔ {selectedTransport.toCity} • Giờ đi: {selectedTransport.departureTime}
                </div>
              </div>
              <button onClick={() => setSelectedTransport(null)} className="p-1 text-white hover:bg-white/20 rounded-full transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs text-amber-900">
                Sơ đồ chỗ ngồi mô phỏng ({selectedTransport.seatClass}). Chọn vị trí ưng ý nhất cho hành trình của bạn.
              </div>

              {/* Interactive Seat Layout Grid */}
              <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 text-center">
                <div className="text-xs font-bold text-slate-600 mb-3">TẦNG 1 (SƠ ĐỒ GIƯỜNG NẰM DEMO)</div>
                <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                  {['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'].map((seat) => {
                    const isOccupied = selectedTransport.seatLayout.occupiedSeatNumbers.includes(seat);
                    const isSelected = chosenSeatNumber === seat;

                    return (
                      <button
                        key={seat}
                        disabled={isOccupied}
                        onClick={() => setChosenSeatNumber(seat)}
                        className={`p-3 rounded-2xl border text-xs font-bold transition flex flex-col items-center justify-center gap-1 ${
                          isOccupied
                            ? 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
                            : isSelected
                            ? 'bg-[#0074C8] text-white border-[#0074C8] ring-2 ring-sky-300 shadow-md'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-sky-400 cursor-pointer'
                        }`}
                      >
                        <Bus className="w-4 h-4" />
                        <span>{seat}</span>
                        <span className="text-[9px] font-normal">{isOccupied ? 'Đã đặt' : isSelected ? 'Đang chọn' : 'Còn trống'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs p-3 bg-white border border-slate-200 rounded-2xl">
                <div>
                  <div className="text-slate-500">Ghế đang chọn: <span className="font-bold text-slate-900">{chosenSeatNumber}</span></div>
                  <div className="font-black text-sm text-[#0074C8] mt-0.5">
                    {selectedTransport.pricePerTicket.toLocaleString('vi-VN')}đ
                  </div>
                </div>
                <button
                  onClick={() => handleBookTransport(selectedTransport)}
                  className="px-4 py-2.5 rounded-xl bg-[#FFDF00] hover:bg-amber-400 text-[#123653] font-black text-xs transition shadow-xs cursor-pointer"
                >
                  Xác nhận đặt chỗ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Flight Booking Modal */}
      {selectedFlight && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
            <div className="bg-[#0074C8] text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm">{selectedFlight.airline} ({selectedFlight.flightNumber})</h3>
                <div className="text-xs text-sky-100">{selectedFlight.fromCity} ➔ {selectedFlight.toCity}</div>
              </div>
              <button onClick={() => setSelectedFlight(null)} className="p-1 text-white hover:bg-white/20 rounded-full transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Hạng vé:</span>
                  <span className="font-bold text-slate-800">{selectedFlight.cabinClass}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hành lý xách tay:</span>
                  <span className="font-bold text-slate-800">{selectedFlight.baggageAllowance.carryOnKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hành lý ký gửi:</span>
                  <span className="font-bold text-slate-800">{selectedFlight.baggageAllowance.checkedKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Giá vé người lớn:</span>
                  <span className="font-black text-[#0074C8]">{selectedFlight.pricePerAdult.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              <button
                onClick={() => handleBookFlight(selectedFlight)}
                className="w-full py-3 bg-[#FFDF00] hover:bg-amber-400 text-[#123653] font-black text-xs rounded-xl shadow-md transition cursor-pointer"
              >
                Đặt vé chuyến bay này
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Activity Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
            <div className="relative h-40 shrink-0 bg-slate-900">
              <img src={selectedActivity.coverImage} alt={selectedActivity.name} className="w-full h-full object-cover" />
              <button onClick={() => setSelectedActivity(null)} className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <h3 className="font-black text-sm text-slate-900">{selectedActivity.name}</h3>
              <p className="text-xs text-slate-600">{selectedActivity.shortDescription}</p>

              <div className="text-xs font-bold uppercase text-slate-700">Chọn loại vé:</div>
              <div className="space-y-2">
                {selectedActivity.options.map((opt) => (
                  <div key={opt.id} className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-xs text-slate-800">{opt.name}</div>
                      <div className="text-[10px] text-slate-500">{opt.description}</div>
                      <div className="text-xs font-black text-[#0074C8] mt-1">{opt.price.toLocaleString('vi-VN')}đ</div>
                    </div>
                    <button
                      onClick={() => handleBookActivity(selectedActivity, opt)}
                      className="px-3 py-1.5 rounded-xl bg-[#FFDF00] hover:bg-amber-400 text-[#123653] font-bold text-xs transition shadow-2xs shrink-0 cursor-pointer"
                    >
                      Đặt vé
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
            <div className="bg-[#0074C8] text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm">{selectedEvent.title}</h3>
                <div className="text-xs text-sky-100">{selectedEvent.venue}</div>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="p-1 text-white hover:bg-white/20 rounded-full transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="text-xs text-slate-600">{selectedEvent.description}</div>
              <div className="text-xs font-bold uppercase text-slate-700">Chọn hạng vé:</div>
              <div className="space-y-2">
                {selectedEvent.tiers.map((tier) => (
                  <div key={tier.id} className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-xs text-slate-800">{tier.tierName}</div>
                      <div className="text-[10px] text-slate-500">{tier.benefits.join(' • ')}</div>
                      <div className="text-xs font-black text-rose-600 mt-1">{tier.price.toLocaleString('vi-VN')}đ</div>
                    </div>
                    <button
                      onClick={() => handleBookEvent(selectedEvent, tier)}
                      className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition shadow-2xs shrink-0 cursor-pointer"
                    >
                      Chọn hạng này
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
