import React, { useState } from 'react';
import { 
  Building2, 
  Plane, 
  Bus, 
  Camera, 
  Ticket, 
  Search, 
  MapPin, 
  Star, 
  Calendar, 
  Users, 
  Sparkles, 
  Tag, 
  ShoppingBag, 
  ChevronRight,
  ShieldCheck,
  Check,
  ArrowRight,
  CreditCard,
  Edit3,
  Compass,
  Bot
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { DESTINATIONS } from '../data/destinations';
import { STAYS, FLIGHTS, TRANSPORTS, ACTIVITIES, EVENTS } from '../data/catalog';
import { TEST_SCENARIOS } from '../data/scenarios';

export const DesktopLaptopView: React.FC<{ onOpenCart: () => void }> = ({ onOpenCart }) => {
  const { 
    activePersona, 
    cartItems, 
    addToCart, 
    setActiveTab, 
    setIsInsideMiniApp,
    runScenario,
    showToast
  } = useDemo();

  const [activeCategory, setActiveCategory] = useState<'all' | 'stay' | 'flight' | 'bus_train' | 'activity' | 'event'>('all');
  const [selectedDestId, setSelectedDestId] = useState<string>('all');
  const [searchKw, setSearchKw] = useState<string>('');

  const filteredStays = STAYS.filter(s => {
    if (selectedDestId !== 'all' && s.destinationId !== selectedDestId) return false;
    if (searchKw && !s.name.toLowerCase().includes(searchKw.toLowerCase())) return false;
    return true;
  });

  const filteredFlights = FLIGHTS.filter(f => {
    if (searchKw && !f.airline.toLowerCase().includes(searchKw.toLowerCase()) && !f.toCity.toLowerCase().includes(searchKw.toLowerCase())) return false;
    return true;
  });

  const filteredTransports = TRANSPORTS.filter(t => {
    if (searchKw && !t.operator.toLowerCase().includes(searchKw.toLowerCase()) && !t.toCity.toLowerCase().includes(searchKw.toLowerCase())) return false;
    return true;
  });

  const filteredActivities = ACTIVITIES.filter(a => {
    if (selectedDestId !== 'all' && a.destinationId !== selectedDestId) return false;
    if (searchKw && !a.name.toLowerCase().includes(searchKw.toLowerCase())) return false;
    return true;
  });

  const handleBookStay = (stay: typeof STAYS[0]) => {
    const room = stay.rooms[0];
    addToCart({
      cartItemId: `desktop_stay_${stay.id}_${Date.now()}`,
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
        adults: 2
      },
      eligibleForCampaignIds: stay.campaignIds || ['camp_vip10', 'camp_family200']
    });
    onOpenCart();
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F7FB] text-slate-900 flex flex-col font-sans">
      {/* 1. Desktop Top Brand Header */}
      <header className="bg-[#0074C8] text-white px-6 py-3.5 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00A5FF] to-white/90 flex items-center justify-center shadow">
                <Compass className="w-5 h-5 text-[#0074C8]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg tracking-tight uppercase">Đi & Trải nghiệm</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#FFDF00] text-[#123653]">
                    ĐIỆN MÁY XANH
                  </span>
                </div>
                <span className="text-xs text-sky-100 italic">"Chuyến đi theo ý bạn • Kênh du lịch trên Quà Tặng VIP"</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-semibold">
              <span>Xin chào, {activePersona.honorific} <strong className="text-amber-300">{activePersona.name}</strong></span>
              <span className="text-amber-300">• {activePersona.pointBalance.toLocaleString('vi-VN')} điểm VIP</span>
            </div>

            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFDF00] hover:bg-amber-400 text-[#123653] font-black text-xs transition cursor-pointer shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Giỏ dịch vụ ({cartItems.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Desktop Hero Search Bar (Phong cách hiện đại Booking.com / Agoda) */}
      <section className="bg-gradient-to-b from-[#0074C8] to-[#005A9E] text-white pt-8 pb-14 px-6 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-[#FFDF00] text-[#123653] inline-flex items-center gap-1.5 uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              Đặc quyền Quà Tặng VIP — Giảm ngay 10% tối đa 300K
            </span>
            <h1 className="text-3xl sm:text-4xl font-black mt-3 tracking-tight">
              Khám phá kỳ nghỉ & Lên hành trình thông minh
            </h1>
            <p className="text-sm text-sky-100 mt-2">
              Khách sạn 4-5 sao, vé xe giường nằm FUTA, vé bay Vietnam Airlines và tour vui chơi Bà Nà Hills, VinWonders.
            </p>
          </div>

          {/* Integrated Search Box */}
          <div className="mt-6 bg-white rounded-2xl p-3 shadow-xl border border-slate-100 text-slate-800 grid grid-cols-1 md:grid-cols-4 gap-2">
            <div className="p-2 border-b md:border-b-0 md:border-r border-slate-200">
              <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#0074C8]" />
                <span>Điểm đến</span>
              </label>
              <select
                value={selectedDestId}
                onChange={(e) => setSelectedDestId(e.target.value)}
                className="w-full text-xs font-bold text-slate-900 bg-transparent outline-none mt-1"
              >
                <option value="all">Tất cả 12 điểm đến Việt Nam</option>
                {DESTINATIONS.map(d => (
                  <option key={d.id} value={d.id}>{d.name} ({d.region})</option>
                ))}
              </select>
            </div>

            <div className="p-2 border-b md:border-b-0 md:border-r border-slate-200">
              <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#0074C8]" />
                <span>Thời gian lưu trú</span>
              </label>
              <div className="text-xs font-bold text-slate-900 mt-1">15/11/2026 ➔ 17/11/2026 (2 đêm)</div>
            </div>

            <div className="p-2 border-b md:border-b-0 md:border-r border-slate-200">
              <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#0074C8]" />
                <span>Số khách</span>
              </label>
              <div className="text-xs font-bold text-slate-900 mt-1">2 người lớn, 1 bé (5 tuổi)</div>
            </div>

            <div className="p-1 flex items-center">
              <button
                onClick={() => showToast('Đang lọc các khách sạn và dịch vụ có sẵn theo nhu cầu...')}
                className="w-full h-full py-3 bg-[#FFDF00] hover:bg-amber-400 text-[#123653] font-black text-xs rounded-xl shadow transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Tìm kiếm ngay</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Grid (3 Columns Desktop View) */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 w-full -mt-6">
        {/* Left Sidebar: Filters & AI Banner */}
        <aside className="lg:col-span-1 space-y-4">
          {/* AI Banner Card */}
          <div className="bg-gradient-to-br from-[#0074C8] to-[#004B87] text-white rounded-2xl p-5 shadow-md">
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#FFDF00] text-[#123653] uppercase flex items-center gap-1 w-max">
              <Bot className="w-3 h-3 text-[#123653]" />
              Chatbot Trợ lý Du lịch
            </span>
            <h3 className="font-black text-base text-white mt-2">Trò chuyện cùng Chatbot AI</h3>
            <p className="text-xs text-sky-100 mt-1">
              {activePersona.honorific} {activePersona.shortName} chỉ cần nhắn nhu cầu, Chatbot sẽ tính toán ghép phòng, vé xe FUTA, vé bay và tour trọn gói.
            </p>
            <button
              onClick={() => {
                setIsInsideMiniApp(true);
                setActiveTab('planner');
              }}
              className="mt-3 w-full py-2 bg-white text-[#0074C8] hover:bg-amber-300 hover:text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Bot className="w-4 h-4 text-[#0074C8]" />
              <span>Mở Chatbot AI</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Category Filter Widget */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-2">
            <div className="text-xs font-bold uppercase text-slate-700">Ngành hàng đặt chỗ</div>
            <div className="space-y-1">
              {[
                { id: 'all', label: 'Tất cả dịch vụ', icon: '🌟' },
                { id: 'stay', label: 'Khách sạn & Resort', icon: '🏨' },
                { id: 'flight', label: 'Vé máy bay', icon: '✈️' },
                { id: 'bus_train', label: 'Vé xe khách & Tàu', icon: '🚌' },
                { id: 'activity', label: 'Vé vui chơi & Tour', icon: '🎡' },
                { id: 'event', label: 'Concert & Sự kiện', icon: '🎟️' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                    activeCategory === cat.id 
                      ? 'bg-sky-50 text-[#0074C8] font-bold' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </span>
                  {activeCategory === cat.id && <Check className="w-4 h-4 text-[#0074C8]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Scenario Runner on Laptop */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-2">
            <div className="text-xs font-bold uppercase text-slate-700">Kịch bản kiểm thử nhanh</div>
            <div className="space-y-1.5 text-xs">
              {TEST_SCENARIOS.slice(0, 4).map(sc => (
                <button
                  key={sc.id}
                  onClick={() => runScenario(sc)}
                  className="w-full text-left p-2 rounded-xl bg-slate-50 hover:bg-sky-50 hover:text-[#0074C8] border border-slate-200/60 transition cursor-pointer flex items-center justify-between"
                >
                  <span className="line-clamp-1 font-medium">#{sc.id}: {sc.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Center / Right Content: Large Product Grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Stays Section */}
          {(activeCategory === 'all' || activeCategory === 'stay') && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#0074C8]" />
                    <span>Khách Sạn & Resort Nổi Bật (Có Thang Máy & Ăn Sáng)</span>
                  </h2>
                  <p className="text-xs text-slate-500">Đối tác Traveloka, Trip.com • Hưởng ưu đãi VIP10 giảm thêm 10%</p>
                </div>
                <span className="text-xs font-bold text-sky-600">{filteredStays.length} cơ sở</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredStays.map(stay => (
                  <div 
                    key={stay.id}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
                  >
                    <div className="relative h-44 bg-slate-100 overflow-hidden">
                      <img src={stay.coverImage} alt={stay.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#0074C8] text-white">
                        {stay.partner}
                      </span>
                      <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-400 text-slate-950">
                        Giảm 10% VIP
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="flex items-center gap-1 font-bold text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{stay.rating}</span>
                            <span className="text-slate-400 font-normal">({stay.reviewCount})</span>
                          </span>
                          <span className="text-[11px] text-slate-400">{stay.address.split(',')[0]}</span>
                        </div>
                        <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#0074C8] transition">
                          {stay.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{stay.description}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400">Giá 1 đêm từ</span>
                          <div className="text-base font-black text-[#0074C8]">
                            {stay.rooms[0].pricePerNight.toLocaleString('vi-VN')}đ
                          </div>
                        </div>

                        <button
                          onClick={() => handleBookStay(stay)}
                          className="px-4 py-2 rounded-xl bg-[#FFDF00] hover:bg-amber-400 text-[#123653] font-black text-xs transition cursor-pointer shadow-xs"
                        >
                          Chọn phòng
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Flights Section */}
          {(activeCategory === 'all' || activeCategory === 'flight') && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Plane className="w-5 h-5 text-sky-600" />
                    <span>Vé Máy Bay Giờ Đẹp (Vietnam Airlines, Vietjet)</span>
                  </h2>
                </div>
                <span className="text-xs font-bold text-sky-600">{filteredFlights.length} chuyến</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredFlights.map(flight => (
                  <div key={flight.id} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{flight.airline}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{flight.flightNumber}</span>
                      </div>
                      <div className="text-sm font-black text-slate-800 mt-1">
                        {flight.departureTime} ({flight.fromCode}) ➔ {flight.arrivalTime} ({flight.toCode})
                      </div>
                      <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
                        Bay thẳng ({flight.duration}) • Suất ăn & 23kg hành lý
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-[#0074C8]">
                        {flight.pricePerAdult.toLocaleString('vi-VN')}đ
                      </div>
                      <button
                        onClick={() => showToast(`Đã chọn vé máy bay ${flight.flightNumber}`)}
                        className="mt-1 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs cursor-pointer"
                      >
                        Đặt vé
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Floating Chatbot FAB for Laptop/Desktop */}
      <button
        onClick={() => {
          setIsInsideMiniApp(true);
          setActiveTab('planner');
        }}
        className="fixed bottom-6 right-8 z-40 bg-gradient-to-r from-[#0074C8] to-[#00A5FF] hover:from-[#005A9E] hover:to-[#0074C8] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 border-2 border-white cursor-pointer group animate-in fade-in slide-in-from-bottom-3"
        title="Mở Chatbot Trợ lý Du lịch AI"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-white" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFDF00] absolute -top-1 -right-1 border-2 border-[#0074C8] animate-pulse" />
        </div>
        <div className="text-left leading-tight">
          <span className="block text-xs font-black uppercase tracking-tight">Chatbot Du Lịch</span>
          <span className="block text-[10px] text-amber-200 font-bold">Hỏi đáp & Lập lịch trình</span>
        </div>
      </button>
    </div>
  );
};
