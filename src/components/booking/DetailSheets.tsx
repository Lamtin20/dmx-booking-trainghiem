import React, { useMemo, useState } from 'react';
import {
  BedDouble,
  CalendarDays,
  Users,
  MapPin,
  Clock,
  Star,
  Heart,
  ShieldCheck,
  Coffee,
  Ruler,
  Briefcase,
  Luggage,
  Plane,
  Armchair,
  Baby,
  Info,
  Ticket,
  CircleAlert,
  LogIn,
  LogOut,
  BusFront,
  Timer,
  FileText,
  Music,
} from 'lucide-react';
import {
  Stay,
  Flight,
  TransportTrip,
  Activity,
  EntertainmentEvent,
  CartItem,
  RoomType,
} from '../../types';
import {
  vnd,
  fmtDay,
  fmtShort,
  fmtFull,
  addDays,
  diffDays,
  BottomSheet,
  CtaButton,
  Stepper,
  GuestSheet,
  DatePickerSheet,
  Chip,
  RatingBadge,
  BackBar,
  CheckList,
  amenityIcon,
  Img,
  CATEGORY_META,
} from './ui';

export interface TripState {
  checkIn: string;
  checkOut: string;
  date: string;
  adults: number;
  children: number;
  rooms: number;
}

interface CommonProps {
  trip: TripState;
  setTrip: (t: TripState) => void;
  destinationName: string;
  onClose: () => void;
  onAdd: (items: CartItem[]) => void;
}

const Shell: React.FC<{
  title: string;
  sub?: string;
  onClose: () => void;
  footer?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, sub, onClose, footer, children }) => (
  <div className="fixed inset-0 z-50 bg-slate-900/55 flex items-end sm:items-center justify-center" onClick={onClose}>
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-lg h-[94vh] sm:h-[90vh] bg-[#F2F4F7] rounded-t-[24px] sm:rounded-[24px] flex flex-col overflow-hidden shadow-2xl"
    >
      <BackBar title={title} sub={sub} onClose={onClose} />
      <div className="flex-1 overflow-y-auto">{children}</div>
      {footer && <div className="shrink-0 bg-white border-t border-slate-200 p-3 shadow-[0_-4px_12px_rgba(0,0,0,.05)]">{footer}</div>}
    </div>
  </div>
);

const Card: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <section className={`bg-white mx-3 mt-3 rounded-2xl border border-slate-200/70 p-4 ${className}`}>
    {title && <h4 className="text-[14px] font-bold text-slate-900 mb-3">{title}</h4>}
    {children}
  </section>
);

const SummaryTile: React.FC<{ icon: React.ElementType; label: string; value: string; sub?: string; onClick?: () => void }> = ({
  icon: Icon,
  label,
  value,
  sub,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="flex-1 min-w-0 text-left rounded-xl border border-slate-200 hover:border-[#0071AF] px-3 py-2.5 transition cursor-pointer bg-white"
  >
    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
      <Icon className="w-3.5 h-3.5 text-[#0071AF]" />
      {label}
    </div>
    <div className="text-[13.5px] font-bold text-slate-900 mt-0.5 truncate">{value}</div>
    {sub && <div className="text-[11px] text-slate-500 truncate">{sub}</div>}
  </button>
);

const paxText = (t: TripState, rooms = false) =>
  `${t.adults} người lớn${t.children ? `, ${t.children} trẻ em` : ''}${rooms ? ` • ${t.rooms} phòng` : ''}`;

/* ================================================================== */
/* STAY                                                                 */
/* ================================================================== */

export const StayDetail: React.FC<CommonProps & { stay: Stay; saved: boolean; onToggleSave: () => void }> = ({
  stay,
  trip,
  setTrip,
  destinationName,
  onClose,
  onAdd,
  saved,
  onToggleSave,
}) => {
  const [img, setImg] = useState(0);
  const [pickDates, setPickDates] = useState(false);
  const [pickGuests, setPickGuests] = useState(false);
  const nights = Math.max(1, diffDays(trip.checkIn, trip.checkOut));
  const gallery = stay.images?.length ? stay.images : [stay.coverImage];

  const book = (room: RoomType) => {
    const total = room.pricePerNight * nights * trip.rooms;
    onAdd([
      {
        cartItemId: `cart_stay_${stay.id}_${room.id}_${Date.now()}`,
        category: 'stay',
        partnerName: stay.partner,
        title: stay.name,
        subtitle: `${room.name} • ${nights} đêm (${fmtShort(trip.checkIn)} - ${fmtShort(trip.checkOut)}) • ${trip.rooms} phòng • ${paxText(trip)}`,
        destinationName,
        dateStart: trip.checkIn,
        dateEnd: trip.checkOut,
        quantity: 1,
        unitPrice: total,
        totalPrice: total,
        details: {
          roomName: room.name,
          nights,
          rooms: trip.rooms,
          adults: trip.adults,
          children: trip.children,
        },
        eligibleForCampaignIds: stay.campaignIds || ['camp_vip10', 'camp_family200'],
      },
    ]);
  };

  return (
    <Shell title={stay.name} sub={destinationName} onClose={onClose}>
      {/* Gallery */}
      <div className="bg-white">
        <div className="relative aspect-[16/10] bg-slate-200">
          <Img src={gallery[img] || stay.coverImage} alt={stay.name} cat="stay" className="w-full h-full object-cover" />
          <button
            onClick={onToggleSave}
            aria-label="Yêu thích"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 shadow flex items-center justify-center cursor-pointer"
          >
            <Heart className={`w-5 h-5 ${saved ? 'fill-[#E11B1E] text-[#E11B1E]' : 'text-slate-600'}`} />
          </button>
          <span className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/60 text-white text-[11px] font-semibold">
            {img + 1}/{gallery.length}
          </span>
          <span className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-white/95 text-[11px] font-bold text-slate-700">
            Đối tác: {stay.partner}
          </span>
        </div>
        {gallery.length > 1 && (
          <div className="flex gap-1.5 p-2 overflow-x-auto no-scrollbar">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setImg(i)}
                className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 cursor-pointer ${i === img ? 'border-[#0071AF]' : 'border-transparent opacity-80'}`}
              >
                <img src={g} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
        <div className="p-4 pt-2">
          <div className="flex items-center gap-0.5 mb-1">
            {Array.from({ length: stay.stars }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#FFB400] text-[#FFB400]" />
            ))}
            <span className="ml-1.5 text-[11px] font-semibold text-slate-500 uppercase">
              {stay.subType === 'resort' ? 'Resort' : stay.subType === 'homestay' ? 'Homestay' : 'Khách sạn'}
            </span>
          </div>
          <h3 className="text-[19px] font-bold text-slate-900 leading-tight">{stay.name}</h3>
          <div className="mt-2">
            <RatingBadge rating={stay.rating} count={stay.reviewCount} />
          </div>
          <div className="mt-2 flex items-start gap-1.5 text-[13px] text-slate-600">
            <MapPin className="w-4 h-4 text-[#0071AF] shrink-0 mt-px" />
            {stay.address}
          </div>
        </div>
      </div>

      {/* Trip summary */}
      <Card title="Thông tin lưu trú của bạn">
        <div className="flex gap-2">
          <SummaryTile
            icon={CalendarDays}
            label="Nhận → Trả phòng"
            value={`${fmtShort(trip.checkIn)} → ${fmtShort(trip.checkOut)}`}
            sub={`${nights} đêm`}
            onClick={() => setPickDates(true)}
          />
          <SummaryTile icon={Users} label="Khách & phòng" value={`${trip.adults + trip.children} khách`} sub={`${trip.rooms} phòng`} onClick={() => setPickGuests(true)} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
            <LogIn className="w-4 h-4 text-[#12A150]" />
            <span>
              Nhận phòng từ <b>{stay.policies.checkInTime}</b>
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
            <LogOut className="w-4 h-4 text-[#E11B1E]" />
            <span>
              Trả phòng trước <b>{stay.policies.checkOutTime}</b>
            </span>
          </div>
        </div>
      </Card>

      {/* Amenities */}
      <Card title="Tiện nghi nổi bật">
        <div className="grid grid-cols-4 gap-y-4 gap-x-1">
          {stay.amenities.slice(0, 8).map((a, i) => {
            const Icon = amenityIcon(a);
            return (
              <div key={i} className="flex flex-col items-center text-center gap-1.5">
                <span className="w-11 h-11 rounded-full bg-[#E6F3FB] text-[#0071AF] flex items-center justify-center">
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </span>
                <span className="text-[11px] text-slate-700 leading-tight line-clamp-2">{a}</span>
              </div>
            );
          })}
        </div>
        <p className="text-[13px] text-slate-600 mt-4 leading-relaxed">{stay.description}</p>
      </Card>

      {/* Rooms */}
      <div className="px-3 mt-4 mb-1 text-[15px] font-bold text-slate-900">Chọn phòng</div>
      {stay.rooms.map((room) => {
        const fits = trip.adults <= room.maxAdults * trip.rooms && trip.children <= room.maxChildren * trip.rooms;
        const total = room.pricePerNight * nights * trip.rooms;
        const orig = room.originalPrice ?? Math.round(room.pricePerNight * 1.15);
        return (
          <section key={room.id} className="bg-white mx-3 mt-2.5 rounded-2xl border border-slate-200/70 overflow-hidden">
            <div className="flex gap-3 p-3">
              <Img src={room.images?.[0] || stay.coverImage} alt={room.name} cat="stay" className="w-24 h-24 rounded-xl object-cover shrink-0 bg-slate-100" />
              <div className="min-w-0 flex-1">
                <div className="font-bold text-[14.5px] text-slate-900 leading-snug">{room.name}</div>
                <div className="mt-1.5 space-y-1 text-[12px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <BedDouble className="w-3.5 h-3.5 text-slate-400" /> {room.bedType}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-slate-400" /> {room.areaM2} m²
                    <span className="text-slate-300">•</span>
                    <Users className="w-3.5 h-3.5 text-slate-400" /> {room.maxAdults} NL{room.maxChildren ? ` + ${room.maxChildren} TE` : ''}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-3 flex flex-wrap gap-1.5">
              <Chip tone={room.includesBreakfast ? 'green' : 'slate'} icon={Coffee}>
                {room.includesBreakfast ? 'Gồm bữa sáng' : 'Không gồm bữa sáng'}
              </Chip>
              <Chip tone="green" icon={ShieldCheck}>
                Hủy miễn phí trước {room.freeCancellationBeforeDays} ngày
              </Chip>
              {room.availableRooms <= 3 && <Chip tone="red">Chỉ còn {room.availableRooms} phòng</Chip>}
            </div>
            <div className="flex items-end justify-between gap-3 p-3 mt-1 border-t border-dashed border-slate-200 mt-3">
              <div>
                <div className="text-[11px] text-slate-400 line-through">{vnd(orig)}</div>
                <div className="text-[18px] font-bold text-[#E11B1E] leading-none">{vnd(room.pricePerNight)}</div>
                <div className="text-[11px] text-slate-500 mt-1">/đêm • Tổng {nights} đêm × {trip.rooms} phòng: <b className="text-slate-800">{vnd(total)}</b></div>
              </div>
              <CtaButton className="h-10 px-4 text-[13px] shrink-0" disabled={!fits} onClick={() => book(room)}>
                {fits ? 'Chọn phòng' : 'Thêm phòng'}
              </CtaButton>
            </div>
            {!fits && (
              <div className="mx-3 mb-3 -mt-1 flex items-start gap-1.5 text-[11.5px] text-[#B85500] bg-[#FFF1E3] rounded-lg px-2.5 py-1.5">
                <CircleAlert className="w-3.5 h-3.5 shrink-0 mt-px" />
                Phòng này chứa tối đa {room.maxAdults} người lớn{room.maxChildren ? ` + ${room.maxChildren} trẻ em` : ''}. Hãy tăng số phòng hoặc giảm số khách.
              </div>
            )}
          </section>
        );
      })}

      <Card title="Chính sách lưu trú">
        <div className="space-y-3 text-[13px] text-slate-700">
          <div className="flex gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#12A150] shrink-0 mt-0.5" />
            <div>
              <b>Hủy phòng:</b> {stay.policies.cancellationSummary}
            </div>
          </div>
          <div className="flex gap-2.5">
            <Baby className="w-4 h-4 text-[#0071AF] shrink-0 mt-0.5" />
            <div>
              <b>Trẻ em:</b> {stay.policies.childPolicy}
            </div>
          </div>
          <div className="flex gap-2.5">
            <BedDouble className="w-4 h-4 text-[#F58220] shrink-0 mt-0.5" />
            <div>
              <b>Giường phụ:</b> {stay.policies.extraBedFee > 0 ? `${vnd(stay.policies.extraBedFee)}/đêm` : 'Miễn phí'}
            </div>
          </div>
        </div>
      </Card>
      <div className="h-6" />

      {pickDates && (
        <DatePickerSheet
          mode="range"
          start={trip.checkIn}
          end={trip.checkOut}
          onClose={() => setPickDates(false)}
          onApply={(s, e) => {
            setTrip({ ...trip, checkIn: s, checkOut: e || addDays(s, 1), date: s });
            setPickDates(false);
          }}
        />
      )}
      {pickGuests && (
        <GuestSheet
          value={{ adults: trip.adults, children: trip.children, rooms: trip.rooms }}
          showRooms
          title="Khách & số phòng"
          onClose={() => setPickGuests(false)}
          onApply={(g) => {
            setTrip({ ...trip, ...g });
            setPickGuests(false);
          }}
        />
      )}
    </Shell>
  );
};

/* ================================================================== */
/* FLIGHT                                                               */
/* ================================================================== */

export const FlightDetail: React.FC<CommonProps & { flight: Flight }> = ({ flight, trip, setTrip, destinationName, onClose, onAdd }) => {
  const [pickDate, setPickDate] = useState(false);
  const [pickGuests, setPickGuests] = useState(false);
  const total = flight.pricePerAdult * trip.adults + flight.pricePerChild * trip.children;
  const pax = trip.adults + trip.children;

  const book = () =>
    onAdd([
      {
        cartItemId: `cart_flight_${flight.id}_${Date.now()}`,
        category: 'flight',
        partnerName: flight.partner,
        title: `${flight.airline} (${flight.flightNumber})`,
        subtitle: `${flight.fromCity} ➔ ${flight.toCity} • ${fmtShort(trip.date)} ${flight.departureTime} • ${paxText(trip)}`,
        destinationName,
        dateStart: trip.date,
        timeSlot: flight.departureTime,
        quantity: pax,
        unitPrice: Math.round(total / pax),
        totalPrice: total,
        details: {
          flightNumber: flight.flightNumber,
          cabinClass: flight.cabinClass,
          baggage: flight.baggageAllowance,
          adults: trip.adults,
          children: trip.children,
        },
        eligibleForCampaignIds: flight.campaignIds || ['camp_vip10'],
      },
    ]);

  return (
    <Shell
      title={`${flight.fromCity} → ${flight.toCity}`}
      sub={`${flight.airline} • ${flight.flightNumber}`}
      onClose={onClose}
      footer={
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-[11px] text-slate-500">Tổng cho {pax} hành khách</div>
            <div className="text-[19px] font-bold text-[#E11B1E] leading-tight">{vnd(total)}</div>
          </div>
          <CtaButton onClick={book}>Đặt vé</CtaButton>
        </div>
      }
    >
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-9 h-9 rounded-xl bg-[#E3F4FD] text-[#0A8FD6] flex items-center justify-center">
            <Plane className="w-5 h-5" />
          </span>
          <div>
            <div className="font-bold text-[14px] text-slate-900">{flight.airline}</div>
            <div className="text-[12px] text-slate-500">
              {flight.flightNumber} • {flight.cabinClass}
            </div>
          </div>
        </div>
        <div className="flex items-stretch gap-3">
          <div className="text-left">
            <div className="text-[24px] font-bold text-slate-900 leading-none">{flight.departureTime}</div>
            <div className="text-[12px] text-slate-500 mt-1">{fmtDay(trip.date)}</div>
            <div className="text-[13px] font-semibold text-slate-800 mt-2">
              {flight.fromCity} <span className="text-slate-400">({flight.fromCode})</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center px-1">
            <span className="text-[11px] text-slate-500">{flight.duration}</span>
            <div className="relative w-full my-1.5 flex items-center">
              <span className="w-2 h-2 rounded-full border-2 border-slate-400 bg-white" />
              <span className="flex-1 border-t-2 border-dashed border-slate-300" />
              <Plane className="w-4 h-4 text-[#0A8FD6] mx-0.5" />
              <span className="flex-1 border-t-2 border-dashed border-slate-300" />
              <span className="w-2 h-2 rounded-full bg-slate-400" />
            </div>
            <span className="text-[11px] font-semibold text-[#12A150]">Bay thẳng</span>
          </div>
          <div className="text-right">
            <div className="text-[24px] font-bold text-slate-900 leading-none">{flight.arrivalTime}</div>
            <div className="text-[12px] text-slate-500 mt-1">{fmtDay(trip.date)}</div>
            <div className="text-[13px] font-semibold text-slate-800 mt-2">
              {flight.toCity} <span className="text-slate-400">({flight.toCode})</span>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Thông tin chuyến đi">
        <div className="flex gap-2">
          <SummaryTile icon={CalendarDays} label="Ngày bay" value={fmtDay(trip.date)} onClick={() => setPickDate(true)} />
          <SummaryTile icon={Users} label="Hành khách" value={`${pax} khách`} sub={paxText(trip)} onClick={() => setPickGuests(true)} />
        </div>
      </Card>

      <Card title="Hành lý & hạng vé">
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-xl bg-[#E3F4FD] p-3 flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-[#0A8FD6]" />
            <div>
              <div className="text-[11px] text-slate-500">Xách tay</div>
              <div className="font-bold text-[14px]">{flight.baggageAllowance.carryOnKg} kg</div>
            </div>
          </div>
          <div className="rounded-xl bg-[#FFF1E3] p-3 flex items-center gap-2.5">
            <Luggage className="w-6 h-6 text-[#D96A0B]" />
            <div>
              <div className="text-[11px] text-slate-500">Ký gửi</div>
              <div className="font-bold text-[14px]">{flight.baggageAllowance.checkedKg ? `${flight.baggageAllowance.checkedKg} kg` : 'Không gồm'}</div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[12px] text-slate-600">
          <Armchair className="w-4 h-4 text-slate-400" />
          Còn {flight.availableSeats} chỗ • Hạng {flight.cabinClass}
        </div>
      </Card>

      <Card title="Chi tiết giá">
        <div className="space-y-2 text-[13px]">
          <div className="flex justify-between">
            <span className="text-slate-600">
              Người lớn × {trip.adults}
            </span>
            <span className="font-semibold">{vnd(flight.pricePerAdult * trip.adults)}</span>
          </div>
          {trip.children > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-600">Trẻ em × {trip.children}</span>
              <span className="font-semibold">{vnd(flight.pricePerChild * trip.children)}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-slate-100 font-bold text-[14px]">
            <span>Tổng cộng</span>
            <span className="text-[#E11B1E]">{vnd(total)}</span>
          </div>
        </div>
      </Card>
      <div className="h-6" />

      {pickDate && (
        <DatePickerSheet
          mode="single"
          start={trip.date}
          title="Chọn ngày bay"
          onClose={() => setPickDate(false)}
          onApply={(s) => {
            setTrip({ ...trip, date: s, checkIn: s, checkOut: addDays(s, Math.max(1, diffDays(trip.checkIn, trip.checkOut))) });
            setPickDate(false);
          }}
        />
      )}
      {pickGuests && (
        <GuestSheet
          value={{ adults: trip.adults, children: trip.children, rooms: trip.rooms }}
          title="Hành khách"
          childHint="Từ 2 đến dưới 12 tuổi"
          onClose={() => setPickGuests(false)}
          onApply={(g) => {
            setTrip({ ...trip, ...g });
            setPickGuests(false);
          }}
        />
      )}
    </Shell>
  );
};

/* ================================================================== */
/* BUS / TRAIN                                                          */
/* ================================================================== */

export const TransportDetail: React.FC<CommonProps & { tripData: TransportTrip }> = ({ tripData, trip, setTrip, destinationName, onClose, onAdd }) => {
  const [pickDate, setPickDate] = useState(false);
  const [pickGuests, setPickGuests] = useState(false);
  const pax = trip.adults + trip.children;
  const [chosen, setChosen] = useState<string[]>([]);
  const [pickup, setPickup] = useState(tripData.pickupPoints[0]);
  const [dropoff, setDropoff] = useState(tripData.dropoffPoints[0]);

  const decks = useMemo(() => {
    const { totalSeats, decks: d } = tripData.seatLayout;
    const perDeck = Math.ceil(totalSeats / d);
    return Array.from({ length: d }, (_, di) => ({
      name: d === 2 ? (di === 0 ? 'Tầng dưới' : 'Tầng trên') : tripData.type === 'train' ? 'Toa tàu' : 'Sơ đồ ghế',
      seats: Array.from({ length: perDeck }, (_, i) => `${di === 0 ? 'A' : 'B'}${i + 1}`),
    }));
  }, [tripData]);

  const occupied = tripData.seatLayout.occupiedSeatNumbers;
  const cols = tripData.seatLayout.cols || 3;
  const total = tripData.pricePerTicket * chosen.length;

  const toggle = (s: string) => {
    setChosen((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : prev.length >= pax ? [...prev.slice(1), s] : [...prev, s]));
  };

  const book = () =>
    onAdd([
      {
        cartItemId: `cart_trans_${tripData.id}_${Date.now()}`,
        category: 'bus_train',
        partnerName: tripData.partner,
        title: `${tripData.operator} • Ghế ${chosen.join(', ')}`,
        subtitle: `${tripData.fromCity} ➔ ${tripData.toCity} • ${fmtShort(trip.date)} ${tripData.departureTime} • Đón: ${pickup}`,
        destinationName,
        dateStart: trip.date,
        timeSlot: tripData.departureTime,
        quantity: chosen.length,
        unitPrice: tripData.pricePerTicket,
        totalPrice: total,
        details: {
          seatNumber: chosen.join(', '),
          tripNumber: tripData.trainOrBusNumber,
          pickup,
          dropoff,
        },
        eligibleForCampaignIds: tripData.campaignIds || ['camp_vip10'],
      },
    ]);

  return (
    <Shell
      title={tripData.operator}
      sub={`${tripData.fromCity} → ${tripData.toCity}`}
      onClose={onClose}
      footer={
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-[11px] text-slate-500">
              {chosen.length ? `Ghế ${chosen.join(', ')}` : `Chọn ${pax} ghế`}
            </div>
            <div className="text-[19px] font-bold text-[#E11B1E] leading-tight">{chosen.length ? vnd(total) : vnd(tripData.pricePerTicket)}</div>
          </div>
          <CtaButton disabled={chosen.length !== pax} onClick={book}>
            {chosen.length === pax ? 'Đặt chỗ' : `Còn ${pax - chosen.length} ghế`}
          </CtaButton>
        </div>
      }
    >
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-9 h-9 rounded-xl bg-[#FFF1E3] text-[#D96A0B] flex items-center justify-center">
            <BusFront className="w-5 h-5" />
          </span>
          <div className="flex-1">
            <div className="font-bold text-[14px] text-slate-900">{tripData.operator}</div>
            <div className="text-[12px] text-slate-500">{tripData.seatClass}</div>
          </div>
          <Chip tone={tripData.availableSeats < 10 ? 'red' : 'green'}>Còn {tripData.availableSeats} chỗ</Chip>
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col items-center pt-1">
            <span className="w-3 h-3 rounded-full border-[3px] border-[#0071AF] bg-white" />
            <span className="flex-1 w-px border-l-2 border-dashed border-slate-300 my-1" />
            <span className="w-3 h-3 rounded-full bg-[#E11B1E]" />
          </div>
          <div className="flex-1 flex flex-col justify-between gap-5">
            <div>
              <div className="text-[18px] font-bold text-slate-900 leading-none">{tripData.departureTime}</div>
              <div className="text-[12.5px] text-slate-600 mt-1">{tripData.fromStation}</div>
            </div>
            <div className="text-[12px] text-slate-500 flex items-center gap-1">
              <Timer className="w-3.5 h-3.5" /> {tripData.duration}
            </div>
            <div>
              <div className="text-[18px] font-bold text-slate-900 leading-none">{tripData.arrivalTime}</div>
              <div className="text-[12.5px] text-slate-600 mt-1">{tripData.toStation}</div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Ngày đi & hành khách">
        <div className="flex gap-2">
          <SummaryTile icon={CalendarDays} label="Ngày khởi hành" value={fmtDay(trip.date)} onClick={() => setPickDate(true)} />
          <SummaryTile icon={Users} label="Số ghế cần đặt" value={`${pax} ghế`} sub={paxText(trip)} onClick={() => setPickGuests(true)} />
        </div>
      </Card>

      <Card title="Chọn ghế">
        <div className="flex items-center gap-3 text-[11.5px] text-slate-600 mb-3">
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded border border-slate-300 bg-white" /> Còn trống
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded bg-[#0071AF]" /> Đang chọn
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded bg-slate-200" /> Đã đặt
          </span>
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          {decks.map((deck) => (
            <div key={deck.name} className="flex-1 min-w-[140px] max-w-[190px] rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div className="text-[11px] font-bold text-slate-500 uppercase text-center mb-2">{deck.name}</div>
              <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                {deck.seats.map((s) => {
                  const isOcc = occupied.includes(s);
                  const isSel = chosen.includes(s);
                  return (
                    <button
                      key={s}
                      disabled={isOcc}
                      onClick={() => toggle(s)}
                      className={`h-9 rounded-lg text-[11.5px] font-bold border transition cursor-pointer disabled:cursor-not-allowed ${
                        isOcc
                          ? 'bg-slate-200 text-slate-400 border-slate-200'
                          : isSel
                          ? 'bg-[#0071AF] text-white border-[#0071AF] shadow'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-[#0071AF]'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Điểm đón & trả">
        <div className="space-y-3">
          <PointSelect label="Điểm đón" value={pickup} options={tripData.pickupPoints} onChange={setPickup} tone="text-[#0071AF]" />
          <PointSelect label="Điểm trả" value={dropoff} options={tripData.dropoffPoints} onChange={setDropoff} tone="text-[#E11B1E]" />
        </div>
      </Card>
      <div className="h-6" />

      {pickDate && (
        <DatePickerSheet
          mode="single"
          start={trip.date}
          title="Chọn ngày khởi hành"
          onClose={() => setPickDate(false)}
          onApply={(s) => {
            setTrip({ ...trip, date: s, checkIn: s, checkOut: addDays(s, Math.max(1, diffDays(trip.checkIn, trip.checkOut))) });
            setPickDate(false);
          }}
        />
      )}
      {pickGuests && (
        <GuestSheet
          value={{ adults: trip.adults, children: trip.children, rooms: trip.rooms }}
          title="Số hành khách"
          childHint="Dưới 12 tuổi (tính 1 ghế)"
          onClose={() => {
            setPickGuests(false);
          }}
          onApply={(g) => {
            setTrip({ ...trip, ...g });
            setChosen([]);
            setPickGuests(false);
          }}
        />
      )}
    </Shell>
  );
};

const PointSelect: React.FC<{ label: string; value: string; options: string[]; onChange: (v: string) => void; tone: string }> = ({
  label,
  value,
  options,
  onChange,
  tone,
}) => (
  <div>
    <div className={`text-[12px] font-bold mb-1.5 flex items-center gap-1.5 ${tone}`}>
      <MapPin className="w-3.5 h-3.5" />
      {label}
    </div>
    <div className="space-y-1.5">
      {options.map((o) => (
        <label
          key={o}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-pointer text-[13px] ${
            value === o ? 'border-[#0071AF] bg-[#E6F3FB] font-semibold' : 'border-slate-200 bg-white'
          }`}
        >
          <input type="radio" checked={value === o} onChange={() => onChange(o)} className="accent-[#0071AF]" />
          {o}
        </label>
      ))}
    </div>
  </div>
);

/* ================================================================== */
/* ACTIVITY                                                             */
/* ================================================================== */

export const ActivityDetail: React.FC<CommonProps & { act: Activity }> = ({ act, trip, setTrip, destinationName, onClose, onAdd }) => {
  const [pickDate, setPickDate] = useState(false);
  const [slot, setSlot] = useState(act.timeSlots[0]);
  const [qty, setQty] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    act.options.forEach((o) => {
      init[o.id] = o.type === 'adult' ? trip.adults : o.type === 'child' ? trip.children : 0;
    });
    if (!Object.values(init).some((v) => v > 0)) init[act.options[0].id] = 1;
    return init;
  });

  const lines = act.options.filter((o) => (qty[o.id] || 0) > 0);
  const total = lines.reduce((s, o) => s + o.price * qty[o.id], 0);
  const count = lines.reduce((s, o) => s + qty[o.id], 0);

  const book = () =>
    onAdd(
      lines.map((o) => ({
        cartItemId: `cart_act_${act.id}_${o.id}_${Date.now()}`,
        category: 'activity' as const,
        partnerName: act.partner,
        title: act.name,
        subtitle: `${o.name} × ${qty[o.id]} • ${fmtShort(trip.date)} ${slot}`,
        destinationName,
        dateStart: trip.date,
        timeSlot: slot,
        quantity: qty[o.id],
        unitPrice: o.price,
        totalPrice: o.price * qty[o.id],
        details: { optionName: o.name, timeSlot: slot },
        eligibleForCampaignIds: act.campaignIds || ['camp_vip10', 'camp_attraction15'],
      }))
    );

  return (
    <Shell
      title={act.name}
      sub={destinationName}
      onClose={onClose}
      footer={
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-[11px] text-slate-500">{count} vé</div>
            <div className="text-[19px] font-bold text-[#E11B1E] leading-tight">{vnd(total)}</div>
          </div>
          <CtaButton disabled={count === 0} onClick={book}>
            Đặt vé
          </CtaButton>
        </div>
      }
    >
      <div className="bg-white">
        <div className="relative aspect-[16/10] bg-slate-200">
          <Img src={act.coverImage} alt={act.name} cat="activity" className="w-full h-full object-cover" />
          <span className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-white/95 text-[11px] font-bold text-slate-700">Đối tác: {act.partner}</span>
        </div>
        <div className="p-4">
          <h3 className="text-[19px] font-bold text-slate-900 leading-tight">{act.name}</h3>
          <div className="mt-2">
            <RatingBadge rating={act.rating} count={act.reviewCount} />
          </div>
          <div className="mt-3 grid gap-1.5 text-[13px] text-slate-600">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#0071AF] shrink-0 mt-px" /> {act.address}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0071AF]" /> Giờ mở cửa: {act.openingHours}
            </div>
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-[#0071AF]" /> Thời lượng: {act.duration}
            </div>
          </div>
        </div>
      </div>

      <Card title="Chọn ngày & giờ tham quan">
        <SummaryTile icon={CalendarDays} label="Ngày tham quan" value={fmtDay(trip.date)} onClick={() => setPickDate(true)} />
        <div className="mt-3 flex flex-wrap gap-2">
          {act.timeSlots.map((t) => (
            <button
              key={t}
              onClick={() => setSlot(t)}
              className={`px-4 h-10 rounded-xl border text-[13px] font-bold cursor-pointer transition ${
                slot === t ? 'bg-[#0071AF] text-white border-[#0071AF]' : 'bg-white text-slate-700 border-slate-300 hover:border-[#0071AF]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Card>

      <Card title="Chọn loại vé">
        <div className="space-y-2.5">
          {act.options.map((o) => (
            <div key={o.id} className={`rounded-xl border p-3 ${qty[o.id] > 0 ? 'border-[#0071AF] bg-[#F3F9FD]' : 'border-slate-200'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-bold text-[14px] text-slate-900">{o.name}</div>
                  <div className="text-[12px] text-slate-500 mt-0.5 leading-snug">{o.description}</div>
                  {o.heightCondition && (
                    <div className="mt-1">
                      <Chip tone="blue" icon={Ruler}>
                        {o.heightCondition}
                      </Chip>
                    </div>
                  )}
                </div>
                <Stepper value={qty[o.id] || 0} min={0} max={10} onChange={(v) => setQty({ ...qty, [o.id]: v })} />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[16px] font-bold text-[#E11B1E]">{vnd(o.price)}</span>
                {o.originalPrice && o.originalPrice > o.price && <span className="text-[12px] text-slate-400 line-through">{vnd(o.originalPrice)}</span>}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {act.highlights?.length > 0 && (
        <Card title="Điểm nổi bật">
          <CheckList items={act.highlights} />
        </Card>
      )}
      {(act.inclusions?.length > 0 || act.exclusions?.length > 0) && (
        <Card title="Giá vé đã bao gồm">
          {act.inclusions?.length > 0 && <CheckList items={act.inclusions} />}
          {act.exclusions?.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-100">
              <div className="text-[12px] font-bold text-slate-500 mb-1.5">Không bao gồm</div>
              <CheckList items={act.exclusions} tone="no" />
            </div>
          )}
        </Card>
      )}
      <Card title="Cách sử dụng & chính sách hủy">
        <div className="space-y-3 text-[13px] text-slate-700">
          <div className="flex gap-2.5">
            <Info className="w-4 h-4 text-[#0071AF] shrink-0 mt-0.5" />
            <div>{act.usageInstructions}</div>
          </div>
          <div className="flex gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#12A150] shrink-0 mt-0.5" />
            <div>{act.cancellationPolicy}</div>
          </div>
        </div>
      </Card>
      <div className="h-6" />

      {pickDate && (
        <DatePickerSheet
          mode="single"
          start={trip.date}
          title="Chọn ngày tham quan"
          onClose={() => setPickDate(false)}
          onApply={(s) => {
            setTrip({ ...trip, date: s, checkIn: s, checkOut: addDays(s, Math.max(1, diffDays(trip.checkIn, trip.checkOut))) });
            setPickDate(false);
          }}
        />
      )}
    </Shell>
  );
};

/* ================================================================== */
/* EVENT                                                                */
/* ================================================================== */

export const EventDetail: React.FC<CommonProps & { evt: EntertainmentEvent }> = ({ evt, destinationName, onClose, onAdd }) => {
  const [qty, setQty] = useState<Record<string, number>>({});
  const lines = evt.tiers.filter((t) => (qty[t.id] || 0) > 0);
  const total = lines.reduce((s, t) => s + t.price * qty[t.id], 0);
  const count = lines.reduce((s, t) => s + qty[t.id], 0);
  const open = evt.status === 'open_for_sale';
  const setTier = (id: string, v: number) => {
    const others = Object.entries(qty).reduce((s, [k, n]) => (k === id ? s : s + n), 0);
    setQty({ ...qty, [id]: Math.min(v, 6 - others) });
  };

  const book = () =>
    onAdd(
      lines.map((t) => ({
        cartItemId: `cart_evt_${evt.id}_${t.id}_${Date.now()}`,
        category: 'event' as const,
        partnerName: evt.partner,
        title: evt.title,
        subtitle: `Hạng ${t.tierName} × ${qty[t.id]} • ${evt.dateTime}`,
        destinationName,
        dateStart: (() => {
          const m = evt.dateTime.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
          return m ? `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` : '2026-11-28';
        })(),
        quantity: qty[t.id],
        unitPrice: t.price,
        totalPrice: t.price * qty[t.id],
        details: { tierName: t.tierName, venue: evt.venue },
        eligibleForCampaignIds: evt.campaignIds || ['camp_vip10'],
      }))
    );

  return (
    <Shell
      title={evt.title}
      sub={evt.venue}
      onClose={onClose}
      footer={
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-[11px] text-slate-500">{count ? `${count} vé (tối đa 6)` : 'Chọn hạng vé'}</div>
            <div className="text-[19px] font-bold text-[#E11B1E] leading-tight">{vnd(total)}</div>
          </div>
          <CtaButton disabled={!open || count === 0} onClick={book}>
            {open ? 'Mua vé' : 'Chưa mở bán'}
          </CtaButton>
        </div>
      }
    >
      <div className="bg-white">
        <div className="relative aspect-[16/9] bg-slate-900">
          <Img src={evt.bannerImage || evt.coverImage} alt={evt.title} cat="event" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold text-white ${open ? 'bg-[#12A150]' : 'bg-slate-600'}`}>
            {open ? 'Đang mở bán' : evt.status === 'sold_out' ? 'Hết vé' : 'Sắp mở bán'}
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-[19px] font-bold text-slate-900 leading-tight">{evt.title}</h3>
          <div className="mt-3 grid gap-1.5 text-[13px] text-slate-700">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-[#E11B5A]" /> {evt.dateTime}
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#E11B5A] shrink-0 mt-px" /> {evt.venue}
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#E11B5A]" /> {evt.ageRestriction}
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Music className="w-4 h-4" /> Bán bởi {evt.partner}
            </div>
          </div>
        </div>
      </div>

      <Card title="Giới thiệu">
        <p className="text-[13px] text-slate-700 leading-relaxed">{evt.description}</p>
      </Card>

      <Card title="Chọn hạng vé">
        <div className="space-y-2.5">
          {evt.tiers.map((t) => (
            <div key={t.id} className={`rounded-xl border p-3 ${qty[t.id] > 0 ? 'border-[#E11B5A] bg-[#FFF5F8]' : 'border-slate-200'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <Ticket className="w-4 h-4 text-[#E11B5A]" />
                    <span className="font-bold text-[14.5px] text-slate-900">{t.tierName}</span>
                  </div>
                  <div className="text-[18px] font-bold text-[#E11B1E] mt-1 leading-none">{vnd(t.price)}</div>
                </div>
                <Stepper value={qty[t.id] || 0} min={0} max={6} onChange={(v) => setTier(t.id, v)} />
              </div>
              {t.benefits?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {t.benefits.map((b, i) => (
                    <Chip key={i} tone="slate">
                      {b}
                    </Chip>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card title="Điều kiện vé">
        <div className="flex gap-2.5 text-[13px] text-slate-700">
          <FileText className="w-4 h-4 text-[#E11B5A] shrink-0 mt-0.5" />
          <div>{evt.transferRules}</div>
        </div>
      </Card>
      <div className="h-6" />
    </Shell>
  );
};

export { CATEGORY_META };
