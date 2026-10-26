import React, { useMemo, useRef, useState } from 'react';
import {
  Search,
  MapPin,
  CalendarDays,
  Users,
  Heart,
  Star,
  ShieldCheck,
  Coffee,
  Plane,
  Clock,
  ArrowRightLeft,
  Armchair,
  Timer,
  Ticket,
  Percent,
  SlidersHorizontal,
  X,
  BusFront,
  Bot,
  ChevronRight,
  Briefcase,
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { DESTINATIONS } from '../data/destinations';
import { STAYS, FLIGHTS, TRANSPORTS, ACTIVITIES, EVENTS } from '../data/catalog';
import { Stay, Flight, TransportTrip, Activity, EntertainmentEvent, CartItem } from '../types';
import {
  CATEGORY_META,
  Img,
  CategoryTile,
  CatId,
  DatePickerSheet,
  GuestSheet,
  FieldRow,
  SectionTitle,
  Chip,
  RatingBadge,
  vnd,
  fmtDay,
  fmtShort,
  addDays,
  diffDays,
  todayISO,
} from './booking/ui';
import {
  StayDetail,
  FlightDetail,
  TransportDetail,
  ActivityDetail,
  EventDetail,
  TripState,
} from './booking/DetailSheets';

const CAT_ORDER: CatId[] = ['stay', 'flight', 'bus_train', 'activity', 'event'];

type Sort = 'popular' | 'price' | 'rating';

const SelectRow: React.FC<{
  icon: React.ElementType;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}> = ({ icon: Icon, label, value, options, onChange }) => {
  const current = options.find((o) => o.value === value)?.label ?? '';
  return (
    <div className="relative">
      <div className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left">
        <Icon className="w-5 h-5 text-[#0071AF] shrink-0" strokeWidth={2} />
        <span className="flex-1 min-w-0">
          <span className="block text-[11px] text-slate-500 leading-tight">{label}</span>
          <span className="block text-[14px] font-bold text-slate-900 leading-snug truncate">{current}</span>
        </span>
        <ChevronRight className="w-4 h-4 text-slate-300 rotate-90 shrink-0" />
      </div>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const ExploreTab: React.FC<{ onOpenCart: () => void }> = ({ onOpenCart }) => {
  const { addToCart, wishlistIds, toggleWishlist, setActiveTab, campaigns, showToast, activeServiceCategory, setActiveServiceCategory } = useDemo();

  const cat: CatId = (activeServiceCategory as CatId | null) ?? 'stay';
  const resultsRef = useRef<HTMLDivElement>(null);

  /* ---------- Trip / search state ---------- */
  const startDay = addDays(todayISO(), 14);
  const [trip, setTrip] = useState<TripState>({
    checkIn: startDay,
    checkOut: addDays(startDay, 2),
    date: startDay,
    adults: 2,
    children: 0,
    rooms: 1,
  });
  const [destId, setDestId] = useState('all');
  const [fromCity, setFromCity] = useState('all');
  const [toCity, setToCity] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>('popular');
  const [fFree, setFFree] = useState(false);
  const [fBreakfast, setFBreakfast] = useState(false);

  const [pickDates, setPickDates] = useState(false);
  const [pickGuests, setPickGuests] = useState(false);

  const [selStay, setSelStay] = useState<Stay | null>(null);
  const [selFlight, setSelFlight] = useState<Flight | null>(null);
  const [selTrans, setSelTrans] = useState<TransportTrip | null>(null);
  const [selAct, setSelAct] = useState<Activity | null>(null);
  const [selEvt, setSelEvt] = useState<EntertainmentEvent | null>(null);

  const nights = Math.max(1, diffDays(trip.checkIn, trip.checkOut));
  const destName = (id: string) => DESTINATIONS.find((d) => d.id === id)?.name || 'Việt Nam';
  const q = query.trim().toLowerCase();

  /* ---------- Derived option lists ---------- */
  const destOptions = [{ value: 'all', label: 'Tất cả điểm đến' }, ...DESTINATIONS.map((d) => ({ value: d.id, label: d.name }))];
  const flightFrom = useMemo(() => ['all', ...Array.from(new Set(FLIGHTS.map((f) => f.fromCity)))], []);
  const flightTo = useMemo(() => ['all', ...Array.from(new Set(FLIGHTS.map((f) => f.toCity)))], []);
  const busFrom = useMemo(() => ['all', ...Array.from(new Set(TRANSPORTS.map((t) => t.fromCity)))], []);
  const busTo = useMemo(() => ['all', ...Array.from(new Set(TRANSPORTS.map((t) => t.toCity)))], []);
  const cityOpts = (arr: string[], all: string) => arr.map((c) => ({ value: c, label: c === 'all' ? all : c }));

  /* ---------- Filtering ---------- */
  const stays = useMemo(() => {
    let r = STAYS.filter((s) => {
      if (destId !== 'all' && s.destinationId !== destId) return false;
      if (fFree && !s.policies.cancellationSummary.toLowerCase().includes('miễn phí')) return false;
      if (fBreakfast && !s.rooms.some((x) => x.includesBreakfast) && !s.amenities.some((a) => a.toLowerCase().includes('sáng'))) return false;
      if (q && !s.name.toLowerCase().includes(q) && !s.address.toLowerCase().includes(q)) return false;
      return true;
    });
    const minP = (s: Stay) => Math.min(...s.rooms.map((x) => x.pricePerNight));
    if (sort === 'price') r = [...r].sort((a, b) => minP(a) - minP(b));
    if (sort === 'rating') r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [destId, fFree, fBreakfast, q, sort]);

  const flights = useMemo(() => {
    let r = FLIGHTS.filter(
      (f) =>
        (fromCity === 'all' || f.fromCity === fromCity) &&
        (toCity === 'all' || f.toCity === toCity) &&
        (!q || f.airline.toLowerCase().includes(q) || f.toCity.toLowerCase().includes(q) || f.fromCity.toLowerCase().includes(q))
    );
    if (sort === 'price') r = [...r].sort((a, b) => a.pricePerAdult - b.pricePerAdult);
    return r;
  }, [fromCity, toCity, q, sort]);

  const trans = useMemo(() => {
    let r = TRANSPORTS.filter(
      (t) =>
        (fromCity === 'all' || t.fromCity === fromCity) &&
        (toCity === 'all' || t.toCity === toCity) &&
        (!q || t.operator.toLowerCase().includes(q) || t.toCity.toLowerCase().includes(q) || t.fromCity.toLowerCase().includes(q))
    );
    if (sort === 'price') r = [...r].sort((a, b) => a.pricePerTicket - b.pricePerTicket);
    return r;
  }, [fromCity, toCity, q, sort]);

  const acts = useMemo(() => {
    let r = ACTIVITIES.filter((a) => (destId === 'all' || a.destinationId === destId) && (!q || a.name.toLowerCase().includes(q)));
    if (sort === 'price') r = [...r].sort((a, b) => a.options[0].price - b.options[0].price);
    if (sort === 'rating') r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [destId, q, sort]);

  const events = useMemo(
    () => EVENTS.filter((e) => (destId === 'all' || e.destinationId === destId) && (!q || e.title.toLowerCase().includes(q))),
    [destId, q]
  );

  const resultCount = cat === 'stay' ? stays.length : cat === 'flight' ? flights.length : cat === 'bus_train' ? trans.length : cat === 'activity' ? acts.length : events.length;

  const switchCat = (c: CatId) => {
    setActiveServiceCategory(c as any);
    setFromCity('all');
    setToCity('all');
    setQuery('');
    setSort('popular');
  };

  const doSearch = () => {
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast(`Tìm thấy ${resultCount} kết quả phù hợp.`);
  };

  const addItems = (items: CartItem[]) => {
    items.forEach((i) => addToCart(i));
    setSelStay(null);
    setSelFlight(null);
    setSelTrans(null);
    setSelAct(null);
    setSelEvt(null);
    onOpenCart();
  };

  const guestSummary =
    cat === 'stay'
      ? `${trip.adults + trip.children} khách • ${trip.rooms} phòng`
      : cat === 'activity'
      ? `${trip.adults + trip.children} vé (${trip.adults} NL${trip.children ? `, ${trip.children} TE` : ''})`
      : `${trip.adults} người lớn${trip.children ? `, ${trip.children} trẻ em` : ''}`;

  const swap = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const promos = campaigns.filter((c) => c.isActive).slice(0, 5);
  const resultsTitle: Record<CatId, string> = {
    stay: 'Khách sạn & Resort',
    flight: 'Chuyến bay',
    bus_train: 'Chuyến xe & tàu',
    activity: 'Vé vui chơi & Tour',
    event: 'Sự kiện & Concert',
  };

  /* ================================================================ */
  return (
    <div className="@container w-full min-h-full bg-[#F2F4F7] pb-28 font-sans">
      {/* ---- Intro band ---- */}
      <div className="bg-[#0071AF] px-4 pt-4 pb-[72px] text-white">
        <h1 className="text-[20px] font-bold leading-tight">Bạn muốn đi đâu hôm nay?</h1>
        <p className="text-[13px] text-white/85 mt-1">Thành viên Quà Tặng VIP giảm thêm 10% mọi chuyến đi.</p>
      </div>

      {/* ---- Search card ---- */}
      <div className="px-3 -mt-[58px] relative z-10">
        <div className="bg-white rounded-2xl shadow-[0_6px_24px_rgba(0,60,110,.14)] border border-slate-100 overflow-hidden">
          {/* category tabs */}
          <div className="grid grid-cols-5 px-1.5 pt-3 pb-2 border-b border-slate-100">
            {CAT_ORDER.map((c) => {
              const on = cat === c;
              return (
                <button key={c} onClick={() => switchCat(c)} className="flex flex-col items-center gap-1.5 cursor-pointer group" aria-pressed={on}>
                  <CategoryTile id={c} size={44} active={on} />
                  <span className={`text-[11.5px] leading-none pb-1.5 border-b-[3px] ${on ? 'font-bold text-slate-900 border-[#FED100]' : 'font-medium text-slate-600 border-transparent'}`}>
                    {CATEGORY_META[c].label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* form */}
          <div className="divide-y divide-slate-100">
            {(cat === 'stay' || cat === 'activity' || cat === 'event') && (
              <SelectRow icon={MapPin} label="Điểm đến" value={destId} options={destOptions} onChange={setDestId} />
            )}

            {(cat === 'flight' || cat === 'bus_train') && (
              <div className="flex items-stretch">
                <div className="flex-1 min-w-0">
                  <SelectRow
                    icon={cat === 'flight' ? Plane : BusFront}
                    label="Điểm đi"
                    value={fromCity}
                    options={cityOpts(cat === 'flight' ? flightFrom : busFrom, 'Tất cả điểm đi')}
                    onChange={setFromCity}
                  />
                </div>
                <button onClick={swap} aria-label="Đổi chiều" className="self-center -mx-3 z-10 w-9 h-9 rounded-full bg-white border border-slate-200 shadow flex items-center justify-center text-[#0071AF] cursor-pointer hover:bg-sky-50">
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
                <div className="flex-1 min-w-0">
                  <SelectRow
                    icon={MapPin}
                    label="Điểm đến"
                    value={toCity}
                    options={cityOpts(cat === 'flight' ? flightTo : busTo, 'Tất cả điểm đến')}
                    onChange={setToCity}
                  />
                </div>
              </div>
            )}

            {cat === 'stay' && (
              <FieldRow
                icon={CalendarDays}
                label="Nhận phòng → Trả phòng"
                value={`${fmtDay(trip.checkIn)} → ${fmtDay(trip.checkOut)}`}
                trailing={<span className="text-[11px] font-bold text-[#0071AF] bg-[#E6F3FB] px-2 py-1 rounded-md shrink-0">{nights} đêm</span>}
                onClick={() => setPickDates(true)}
              />
            )}
            {(cat === 'flight' || cat === 'bus_train' || cat === 'activity') && (
              <FieldRow
                icon={CalendarDays}
                label={cat === 'activity' ? 'Ngày tham quan' : 'Ngày khởi hành'}
                value={fmtDay(trip.date)}
                onClick={() => setPickDates(true)}
              />
            )}
            {cat === 'event' && (
              <div className="flex items-center gap-3 px-3.5 py-3 text-[13px] text-slate-600 bg-slate-50">
                <CalendarDays className="w-5 h-5 text-[#0071AF] shrink-0" />
                Mỗi sự kiện có lịch diễn cố định — xem ngày giờ ở từng thẻ bên dưới.
              </div>
            )}

            {cat !== 'event' && (
              <FieldRow
                icon={Users}
                label={cat === 'stay' ? 'Khách & phòng' : cat === 'activity' ? 'Số lượng vé' : 'Hành khách'}
                value={guestSummary}
                onClick={() => setPickGuests(true)}
              />
            )}

            <div className="flex items-center gap-3 px-3.5 py-2.5">
              <Search className="w-5 h-5 text-[#0071AF] shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  cat === 'stay'
                    ? 'Tên khách sạn, khu vực...'
                    : cat === 'flight'
                    ? 'Hãng bay, thành phố...'
                    : cat === 'bus_train'
                    ? 'Nhà xe, tuyến đường...'
                    : cat === 'activity'
                    ? 'Tên tour, khu vui chơi...'
                    : 'Tên sự kiện, nghệ sĩ...'
                }
                className="flex-1 min-w-0 text-[14px] text-slate-900 outline-none placeholder:text-slate-400"
              />
              {query && (
                <button onClick={() => setQuery('')} aria-label="Xóa" className="text-slate-400 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="p-3 pt-2">
            <button
              onClick={doSearch}
              className="w-full h-12 rounded-xl bg-[#FED100] hover:bg-[#F2C500] active:scale-[.99] text-[#1D2129] font-bold text-[15px] shadow-sm transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" strokeWidth={2.4} />
              Tìm {CATEGORY_META[cat].label.toLowerCase()}
            </button>
          </div>
        </div>
      </div>

      {/* ---- AI banner ---- */}
      <div className="px-3 mt-3">
        <button
          onClick={() => setActiveTab('planner')}
          className="w-full flex items-center gap-3 bg-white rounded-2xl border border-slate-200/70 px-3.5 py-3 text-left cursor-pointer hover:shadow-md transition"
        >
          <span className="w-11 h-11 rounded-full bg-[#E6F3FB] text-[#0071AF] flex items-center justify-center shrink-0">
            <Bot className="w-6 h-6" />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-[14px] font-bold text-slate-900">Chưa biết đi đâu? Hỏi Chatbot AI</span>
            <span className="block text-[12px] text-slate-500">Nhập nhu cầu — nhận lịch trình & giỏ dịch vụ trong 1 phút.</span>
          </span>
          <ChevronRight className="w-5 h-5 text-slate-300 shrink-0" />
        </button>
      </div>

      {/* ---- Promos ---- */}
      {promos.length > 0 && (
        <div className="mt-5">
          <div className="px-3">
            <SectionTitle title="Ưu đãi dành cho bạn" sub="Tự động áp dụng ở bước thanh toán" />
          </div>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-3 pb-1">
            {promos.map((p) => (
              <div key={p.id} className="relative shrink-0 w-[250px] bg-white rounded-2xl border border-slate-200/70 flex overflow-hidden">
                <div className="w-14 bg-[#FED100] flex flex-col items-center justify-center text-[#1D2129]">
                  <Percent className="w-6 h-6" strokeWidth={2.4} />
                </div>
                <span className="absolute left-[52px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#F2F4F7] border border-slate-200/70" />
                <div className="p-3 pl-5 min-w-0">
                  <div className="text-[13px] font-bold text-slate-900 leading-snug line-clamp-2">{p.name}</div>
                  <div className="mt-1.5 inline-block px-2 py-0.5 rounded border border-dashed border-[#0071AF] text-[11px] font-bold text-[#0071AF]">
                    {p.code || p.shortTag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---- Destinations ---- */}
      {(cat === 'stay' || cat === 'activity' || cat === 'event') && (
        <div className="mt-5">
          <div className="px-3">
            <SectionTitle title="Điểm đến yêu thích" sub="Chạm để lọc • Ảnh: Wikimedia Commons (CC)" />
          </div>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-3 pb-1">
            {DESTINATIONS.map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  setDestId(d.id === destId ? 'all' : d.id);
                  resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`relative shrink-0 w-[112px] h-[148px] rounded-2xl overflow-hidden cursor-pointer text-left ring-2 transition ${destId === d.id ? 'ring-[#FED100]' : 'ring-transparent'}`}
              >
                <Img src={d.image} alt={d.name} cat="stay" className="absolute inset-0 w-full h-full object-cover bg-slate-200" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <span className="absolute bottom-2 left-2.5 right-2 text-white">
                  <span className="block text-[14px] font-bold leading-tight">{d.name}</span>
                  <span className="block text-[10.5px] text-white/85 leading-tight mt-0.5">{d.region}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ---- Results ---- */}
      <div ref={resultsRef} className="px-3 mt-5 scroll-mt-16">
        <SectionTitle
          title={resultsTitle[cat]}
          sub={
            cat === 'stay'
              ? `${fmtDay(trip.checkIn)} - ${fmtDay(trip.checkOut)} • ${nights} đêm`
              : cat === 'flight' || cat === 'bus_train' || cat === 'activity'
              ? fmtDay(trip.date)
              : 'Mở bán theo lịch của đơn vị tổ chức'
          }
          right={<span className="text-[12px] font-bold text-[#0071AF] bg-[#E6F3FB] rounded-full px-2.5 py-1">{resultCount} kết quả</span>}
        />

        {/* Sort / filter chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 -mx-3 px-3">
          <span className="shrink-0 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500">
            <SlidersHorizontal className="w-4 h-4" />
          </span>
          {(
            [
              ['popular', 'Phổ biến'],
              ['price', 'Giá thấp nhất'],
              ...(cat === 'stay' || cat === 'activity' ? [['rating', 'Đánh giá cao']] : []),
            ] as [Sort, string][]
          ).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setSort(k)}
              className={`shrink-0 h-8 px-3.5 rounded-full text-[12.5px] font-semibold border cursor-pointer transition ${
                sort === k ? 'bg-[#0071AF] border-[#0071AF] text-white' : 'bg-white border-slate-200 text-slate-700 hover:border-[#0071AF]'
              }`}
            >
              {label}
            </button>
          ))}
          {cat === 'stay' && (
            <>
              <button
                onClick={() => setFFree(!fFree)}
                className={`shrink-0 h-8 px-3.5 rounded-full text-[12.5px] font-semibold border cursor-pointer transition flex items-center gap-1.5 ${
                  fFree ? 'bg-[#E4F6EC] border-[#12A150] text-[#0E7A3E]' : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Hủy miễn phí
              </button>
              <button
                onClick={() => setFBreakfast(!fBreakfast)}
                className={`shrink-0 h-8 px-3.5 rounded-full text-[12.5px] font-semibold border cursor-pointer transition flex items-center gap-1.5 ${
                  fBreakfast ? 'bg-[#E4F6EC] border-[#12A150] text-[#0E7A3E]' : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <Coffee className="w-3.5 h-3.5" /> Gồm bữa sáng
              </button>
            </>
          )}
        </div>

        {resultCount === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <Search className="w-9 h-9 text-slate-300 mx-auto" />
            <div className="font-bold text-slate-800 mt-2">Không tìm thấy kết quả</div>
            <div className="text-[13px] text-slate-500 mt-1">Hãy thử đổi điểm đến hoặc bỏ bớt bộ lọc.</div>
            <button
              onClick={() => {
                setDestId('all');
                setFromCity('all');
                setToCity('all');
                setQuery('');
                setFFree(false);
                setFBreakfast(false);
              }}
              className="mt-3 h-9 px-4 rounded-lg bg-[#0071AF] text-white text-[13px] font-semibold cursor-pointer"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}

        {/* STAYS */}
        {cat === 'stay' && (
          <div className="grid grid-cols-1 @xl:grid-cols-2 gap-3">
            {stays.map((s) => {
              const minPrice = Math.min(...s.rooms.map((r) => r.pricePerNight));
              const orig = Math.round(minPrice * 1.15);
              const saved = wishlistIds.includes(s.id);
              const free = s.policies.cancellationSummary.toLowerCase().includes('miễn phí');
              const bf = s.rooms.some((r) => r.includesBreakfast);
              return (
                <article key={s.id} onClick={() => setSelStay(s)} className="bg-white rounded-2xl overflow-hidden border border-slate-200/70 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col">
                  <div className="relative aspect-[16/9] bg-slate-200">
                    <Img src={s.coverImage} alt={s.name} cat="stay" className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 px-2 py-1 rounded-md bg-[#E11B1E] text-white text-[11px] font-bold">Giảm 13%</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(s.id);
                      }}
                      aria-label="Yêu thích"
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 shadow flex items-center justify-center cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${saved ? 'fill-[#E11B1E] text-[#E11B1E]' : 'text-slate-600'}`} />
                    </button>
                    <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-white/95 text-[10.5px] font-bold text-slate-700">{s.partner}</span>
                  </div>
                  <div className="p-3.5 flex-1 flex flex-col">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: s.stars }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#FFB400] text-[#FFB400]" />
                      ))}
                    </div>
                    <h3 className="text-[16px] font-bold text-slate-900 leading-snug mt-1 line-clamp-2">{s.name}</h3>
                    <div className="mt-1.5">
                      <RatingBadge rating={s.rating} count={s.reviewCount} />
                    </div>
                    <div className="mt-2 flex items-start gap-1.5 text-[12.5px] text-slate-500">
                      <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{s.address}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {free && (
                        <Chip tone="green" icon={ShieldCheck}>
                          Hủy miễn phí
                        </Chip>
                      )}
                      {bf && (
                        <Chip tone="green" icon={Coffee}>
                          Gồm bữa sáng
                        </Chip>
                      )}
                    </div>
                    <div className="mt-3 pt-3 border-t border-dashed border-slate-200 flex items-end justify-between gap-2 mt-auto">
                      <div className="text-[11px] text-slate-500 leading-snug">
                        {nights} đêm, {trip.adults + trip.children} khách
                        <div className="text-[11px] text-slate-400">Đã gồm thuế & phí</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[12px] text-slate-400 line-through leading-none">{vnd(orig)}</div>
                        <div className="text-[20px] font-bold text-[#E11B1E] leading-tight">{vnd(minPrice)}</div>
                        <div className="text-[11px] text-slate-500">/đêm</div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* FLIGHTS */}
        {cat === 'flight' && (
          <div className="space-y-3">
            {flights.map((f) => (
              <article key={f.id} onClick={() => setSelFlight(f)} className="bg-white rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md transition cursor-pointer p-4">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-[#E3F4FD] text-[#0A8FD6] flex items-center justify-center">
                      <Plane className="w-5 h-5" />
                    </span>
                    <div>
                      <div className="text-[14px] font-bold text-slate-900 leading-tight">{f.airline}</div>
                      <div className="text-[11.5px] text-slate-500">
                        {f.flightNumber} • {f.cabinClass}
                      </div>
                    </div>
                  </div>
                  {f.availableSeats <= 8 && <Chip tone="red">Còn {f.availableSeats} chỗ</Chip>}
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <div className="text-[22px] font-bold text-slate-900 leading-none">{f.departureTime}</div>
                    <div className="text-[12px] font-semibold text-slate-500 mt-1">{f.fromCode}</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center px-1">
                    <span className="text-[11px] text-slate-500">{f.duration}</span>
                    <div className="w-full flex items-center my-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <span className="flex-1 border-t border-slate-300" />
                      <Plane className="w-3.5 h-3.5 text-[#0A8FD6] mx-0.5" />
                      <span className="flex-1 border-t border-slate-300" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#12A150]">Bay thẳng</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[22px] font-bold text-slate-900 leading-none">{f.arrivalTime}</div>
                    <div className="text-[12px] font-semibold text-slate-500 mt-1">{f.toCode}</div>
                  </div>
                </div>
                <div className="mt-3.5 pt-3 border-t border-dashed border-slate-200 flex items-end justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    <Chip icon={Briefcase}>{f.baggageAllowance.carryOnKg}kg xách tay</Chip>
                    {f.baggageAllowance.checkedKg > 0 && <Chip tone="green">{f.baggageAllowance.checkedKg}kg ký gửi</Chip>}
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[19px] font-bold text-[#E11B1E] leading-none">{vnd(f.pricePerAdult)}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">/khách</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* BUS / TRAIN */}
        {cat === 'bus_train' && (
          <div className="space-y-3">
            {trans.map((t) => (
              <article key={t.id} onClick={() => setSelTrans(t)} className="bg-white rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md transition cursor-pointer p-4">
                <div className="flex items-start justify-between gap-2 mb-3.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-9 h-9 rounded-xl bg-[#FFF1E3] text-[#D96A0B] flex items-center justify-center shrink-0">
                      <BusFront className="w-5 h-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[14px] font-bold text-slate-900 leading-tight truncate">{t.operator}</div>
                      <div className="text-[11.5px] text-slate-500 truncate">{t.seatClass}</div>
                    </div>
                  </div>
                  <Chip tone={t.availableSeats < 10 ? 'red' : 'green'} icon={Armchair}>
                    Còn {t.availableSeats} chỗ
                  </Chip>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <div className="text-[22px] font-bold text-slate-900 leading-none">{t.departureTime}</div>
                    <div className="text-[12px] text-slate-500 mt-1 max-w-[88px] leading-tight">{t.fromCity}</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center px-1">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Timer className="w-3 h-3" />
                      {t.duration}
                    </span>
                    <div className="w-full flex items-center my-1">
                      <span className="w-1.5 h-1.5 rounded-full border border-slate-400" />
                      <span className="flex-1 border-t border-dashed border-slate-300" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[22px] font-bold text-slate-900 leading-none">{t.arrivalTime}</div>
                    <div className="text-[12px] text-slate-500 mt-1 max-w-[88px] leading-tight ml-auto">{t.toCity}</div>
                  </div>
                </div>
                <div className="mt-3.5 pt-3 border-t border-dashed border-slate-200 flex items-end justify-between">
                  <div className="text-[12px] text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="line-clamp-1 max-w-[170px]">{t.fromStation}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[19px] font-bold text-[#E11B1E] leading-none">{vnd(t.pricePerTicket)}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">/vé</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ACTIVITIES */}
        {cat === 'activity' && (
          <div className="grid grid-cols-1 @xl:grid-cols-2 gap-3">
            {acts.map((a) => {
              const from = Math.min(...a.options.map((o) => o.price));
              return (
                <article key={a.id} onClick={() => setSelAct(a)} className="bg-white rounded-2xl overflow-hidden border border-slate-200/70 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col">
                  <div className="relative aspect-[16/10] bg-slate-200">
                    <Img src={a.coverImage} alt={a.name} cat="activity" className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 px-2 py-1 rounded-md bg-[#12A150] text-white text-[11px] font-bold">Giảm 15%</span>
                    <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-white/95 text-[10.5px] font-bold text-slate-700">{a.partner}</span>
                  </div>
                  <div className="p-3.5 flex-1 flex flex-col">
                    <h3 className="text-[15.5px] font-bold text-slate-900 leading-snug line-clamp-2">{a.name}</h3>
                    <div className="mt-1.5">
                      <RatingBadge rating={a.rating} count={a.reviewCount} />
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-[12px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {a.duration}
                      </span>
                      <span className="flex items-center gap-1 min-w-0">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{destName(a.destinationId)}</span>
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-dashed border-slate-200 flex items-end justify-between mt-auto">
                      <span className="text-[11px] text-slate-500">Giá từ</span>
                      <div className="text-right">
                        <div className="text-[19px] font-bold text-[#E11B1E] leading-none">{vnd(from)}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">/vé</div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* EVENTS */}
        {cat === 'event' && (
          <div className="space-y-3">
            {events.map((e) => {
              const open = e.status === 'open_for_sale';
              const min = Math.min(...e.tiers.map((t) => t.price));
              const dm = e.dateTime.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
              const m = dm ? [dm[0], dm[1], dm[2]] : null;
              return (
                <article key={e.id} onClick={() => setSelEvt(e)} className="bg-white rounded-2xl overflow-hidden border border-slate-200/70 shadow-sm hover:shadow-md transition cursor-pointer flex">
                  <div className="relative w-[112px] shrink-0 bg-slate-900">
                    <Img src={e.coverImage} alt={e.title} cat="event" className="absolute inset-0 w-full h-full object-cover" />
                    {m && (
                      <span className="absolute top-2 left-2 w-11 rounded-lg bg-white text-center overflow-hidden shadow">
                        <span className="block bg-[#E11B5A] text-white text-[9px] font-bold leading-4">THG {Number(m[2])}</span>
                        <span className="block text-[16px] font-bold text-slate-900 leading-6">{m[1]}</span>
                      </span>
                    )}
                  </div>
                  <div className="p-3.5 flex-1 min-w-0 flex flex-col">
                    <h3 className="text-[15px] font-bold text-slate-900 leading-snug line-clamp-2">{e.title}</h3>
                    <div className="mt-1.5 space-y-1 text-[12px] text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{e.dateTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{e.venue}</span>
                      </div>
                    </div>
                    <div className="mt-auto pt-2.5 flex items-end justify-between gap-2">
                      <Chip tone={open ? 'green' : 'slate'} icon={Ticket}>
                        {open ? 'Đang mở bán' : e.status === 'sold_out' ? 'Hết vé' : 'Sắp mở bán'}
                      </Chip>
                      <div className="text-right">
                        <div className="text-[10.5px] text-slate-500 leading-none">Từ</div>
                        <div className="text-[17px] font-bold text-[#E11B1E] leading-tight">{vnd(min)}</div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      <p className="px-5 mt-5 text-center text-[11px] leading-relaxed text-slate-400">
        Bản demo mô phỏng — dữ liệu, giá và hình ảnh cơ sở lưu trú, tour, sự kiện chỉ mang tính minh họa, không phải dịch vụ thật.
      </p>

      {/* ---- Pickers ---- */}
      {pickDates && (
        <DatePickerSheet
          mode={cat === 'stay' ? 'range' : 'single'}
          start={cat === 'stay' ? trip.checkIn : trip.date}
          end={trip.checkOut}
          title={cat === 'stay' ? undefined : cat === 'activity' ? 'Chọn ngày tham quan' : 'Chọn ngày khởi hành'}
          onClose={() => setPickDates(false)}
          onApply={(s, e) => {
            const span = Math.max(1, diffDays(trip.checkIn, trip.checkOut));
            setTrip({ ...trip, checkIn: s, checkOut: e || addDays(s, span), date: s });
            setPickDates(false);
          }}
        />
      )}
      {pickGuests && (
        <GuestSheet
          value={{ adults: trip.adults, children: trip.children, rooms: trip.rooms }}
          showRooms={cat === 'stay'}
          title={cat === 'stay' ? 'Khách & số phòng' : cat === 'activity' ? 'Số lượng vé' : 'Hành khách'}
          adultLabel={cat === 'activity' ? 'Vé người lớn' : 'Người lớn'}
          childLabel={cat === 'activity' ? 'Vé trẻ em' : 'Trẻ em'}
          onClose={() => setPickGuests(false)}
          onApply={(g) => {
            setTrip({ ...trip, ...g });
            setPickGuests(false);
          }}
        />
      )}

      {/* ---- Detail sheets ---- */}
      {selStay && (
        <StayDetail
          stay={selStay}
          trip={trip}
          setTrip={setTrip}
          destinationName={destName(selStay.destinationId)}
          saved={wishlistIds.includes(selStay.id)}
          onToggleSave={() => toggleWishlist(selStay.id)}
          onClose={() => setSelStay(null)}
          onAdd={addItems}
        />
      )}
      {selFlight && (
        <FlightDetail flight={selFlight} trip={trip} setTrip={setTrip} destinationName={selFlight.toCity} onClose={() => setSelFlight(null)} onAdd={addItems} />
      )}
      {selTrans && (
        <TransportDetail tripData={selTrans} trip={trip} setTrip={setTrip} destinationName={selTrans.toCity} onClose={() => setSelTrans(null)} onAdd={addItems} />
      )}
      {selAct && (
        <ActivityDetail act={selAct} trip={trip} setTrip={setTrip} destinationName={destName(selAct.destinationId)} onClose={() => setSelAct(null)} onAdd={addItems} />
      )}
      {selEvt && (
        <EventDetail evt={selEvt} trip={trip} setTrip={setTrip} destinationName={destName(selEvt.destinationId)} onClose={() => setSelEvt(null)} onAdd={addItems} />
      )}
    </div>
  );
};
