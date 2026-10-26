import React, { useMemo, useState } from 'react';
import {
  BedDouble,
  Plane,
  BusFront,
  Ticket,
  Music,
  X,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Waves,
  Utensils,
  CarFront,
  Snowflake,
  Dumbbell,
  Sparkles,
  MoveVertical,
  Coffee,
  ConciergeBell,
  ShowerHead,
  Tv,
  Trees,
  Building2,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

export const vnd = (n: number) => `${Math.round(n).toLocaleString('vi-VN')}₫`;

const pad = (n: number) => String(n).padStart(2, '0');

export const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const fromISO = (s: string) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
};

export const addDays = (iso: string, days: number) => {
  const d = fromISO(iso);
  d.setDate(d.getDate() + days);
  return toISO(d);
};

export const diffDays = (a: string, b: string) =>
  Math.max(0, Math.round((fromISO(b).getTime() - fromISO(a).getTime()) / 86400000));

const WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

/** "T6, 15 thg 11" */
export const fmtDay = (iso: string) => {
  const d = fromISO(iso);
  return `${WEEKDAYS[d.getDay()]}, ${d.getDate()} thg ${d.getMonth() + 1}`;
};

/** "15/11" */
export const fmtShort = (iso: string) => {
  const d = fromISO(iso);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
};

/** "15/11/2026" */
export const fmtFull = (iso: string) => {
  const d = fromISO(iso);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

export const todayISO = () => toISO(new Date());

export const ratingLabel = (r: number) => (r >= 4.8 ? 'Xuất sắc' : r >= 4.5 ? 'Tuyệt vời' : r >= 4 ? 'Rất tốt' : 'Tốt');

/* ------------------------------------------------------------------ */
/* Category icons                                                       */
/* ------------------------------------------------------------------ */

export type CatId = 'stay' | 'flight' | 'bus_train' | 'activity' | 'event';

export const CATEGORY_META: Record<
  CatId,
  { label: string; icon: LucideIcon; solid: string; soft: string; text: string }
> = {
  stay: { label: 'Khách sạn', icon: BedDouble, solid: 'bg-[#0071AF]', soft: 'bg-[#E6F3FB]', text: 'text-[#0071AF]' },
  flight: { label: 'Máy bay', icon: Plane, solid: 'bg-[#0A8FD6]', soft: 'bg-[#E3F4FD]', text: 'text-[#0A8FD6]' },
  bus_train: { label: 'Xe khách', icon: BusFront, solid: 'bg-[#F58220]', soft: 'bg-[#FFF1E3]', text: 'text-[#D96A0B]' },
  activity: { label: 'Vui chơi', icon: Ticket, solid: 'bg-[#12A150]', soft: 'bg-[#E4F6EC]', text: 'text-[#0E8A43]' },
  event: { label: 'Sự kiện', icon: Music, solid: 'bg-[#E11B5A]', soft: 'bg-[#FDE8EF]', text: 'text-[#C2154B]' },
};

export const CategoryTile: React.FC<{ id: CatId; size?: number; active?: boolean }> = ({ id, size = 44, active = true }) => {
  const m = CATEGORY_META[id];
  const Icon = m.icon;
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[14px] shrink-0 transition ${
        active ? `${m.solid} text-white shadow-sm` : `${m.soft} ${m.text}`
      }`}
      style={{ width: size, height: size }}
    >
      <Icon style={{ width: size * 0.5, height: size * 0.5 }} strokeWidth={2.1} />
    </span>
  );
};

/* ------------------------------------------------------------------ */
/* Amenity icon mapper                                                  */
/* ------------------------------------------------------------------ */

export const amenityIcon = (name: string): LucideIcon => {
  const n = name.toLowerCase();
  if (n.includes('wifi') || n.includes('wi-fi')) return Wifi;
  if (n.includes('bơi') || n.includes('hồ') || n.includes('biển') || n.includes('spa')) return Waves;
  if (n.includes('sáng') || n.includes('buffet') || n.includes('nhà hàng') || n.includes('ăn')) return Utensils;
  if (n.includes('xe') || n.includes('đưa đón') || n.includes('đỗ')) return CarFront;
  if (n.includes('điều hòa') || n.includes('lạnh') || n.includes('máy lạnh')) return Snowflake;
  if (n.includes('gym') || n.includes('thể dục')) return Dumbbell;
  if (n.includes('thang máy')) return MoveVertical;
  if (n.includes('cà phê') || n.includes('cafe') || n.includes('bar')) return Coffee;
  if (n.includes('lễ tân') || n.includes('24')) return ConciergeBell;
  if (n.includes('tắm') || n.includes('bồn')) return ShowerHead;
  if (n.includes('tv')) return Tv;
  if (n.includes('vườn') || n.includes('núi') || n.includes('view')) return Trees;
  if (n.includes('resort')) return Building2;
  return Sparkles;
};

/* ------------------------------------------------------------------ */
/* Image with graceful fallback                                         */
/* ------------------------------------------------------------------ */

export const Img: React.FC<{
  src?: string;
  alt: string;
  cat?: CatId;
  className?: string;
  loading?: 'lazy' | 'eager';
}> = ({ src, alt, cat = 'stay', className = '', loading = 'lazy' }) => {
  const [failed, setFailed] = useState(!src);
  const m = CATEGORY_META[cat];
  const Icon = m.icon;
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`${className} flex flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-[#E6F3FB] to-[#CFE8F7] text-[#0071AF]`}
      >
        <Icon className="w-9 h-9 opacity-70" strokeWidth={1.6} />
        <span className="text-[10px] font-semibold opacity-70">Ảnh minh họa</span>
      </div>
    );
  }
  return <img src={src} alt={alt} loading={loading} onError={() => setFailed(true)} className={className} />;
};

/* ------------------------------------------------------------------ */
/* Bottom sheet                                                         */
/* ------------------------------------------------------------------ */

export const BottomSheet: React.FC<{
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  z?: number;
  tall?: boolean;
}> = ({ title, onClose, children, footer, z = 60, tall }) => (
  <div
    className="fixed inset-0 bg-slate-900/55 flex items-end sm:items-center justify-center"
    style={{ zIndex: z }}
    onClick={onClose}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className={`w-full max-w-lg bg-white rounded-t-[24px] sm:rounded-[24px] flex flex-col overflow-hidden shadow-2xl ${
        tall ? 'h-[92vh]' : 'max-h-[88vh]'
      }`}
    >
      <div className="relative flex items-center justify-center px-4 pt-3 pb-3 border-b border-slate-100 shrink-0">
        <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-9 h-1 rounded-full bg-slate-200" />
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="absolute left-3 top-2.5 w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-[15px] font-bold text-slate-900 mt-1">{title}</h3>
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
      {footer && <div className="shrink-0 border-t border-slate-100 bg-white p-3">{footer}</div>}
    </div>
  </div>
);

export const CtaButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }
> = ({ children, className = '', ...rest }) => (
  <button
    {...rest}
    className={`h-11 px-5 rounded-xl bg-[#FED100] hover:bg-[#F2C500] active:scale-[.98] text-[#1D2129] font-bold text-[14px] shadow-sm transition cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

/* ------------------------------------------------------------------ */
/* Stepper                                                              */
/* ------------------------------------------------------------------ */

export const Stepper: React.FC<{
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
}> = ({ value, min = 0, max = 99, onChange }) => (
  <div className="inline-flex items-center gap-3">
    <button
      aria-label="Giảm"
      disabled={value <= min}
      onClick={() => onChange(Math.max(min, value - 1))}
      className="w-8 h-8 rounded-full border border-slate-300 text-[#0071AF] flex items-center justify-center disabled:text-slate-300 disabled:border-slate-200 cursor-pointer disabled:cursor-not-allowed hover:bg-sky-50"
    >
      <Minus className="w-4 h-4" strokeWidth={2.5} />
    </button>
    <span className="w-5 text-center text-[15px] font-bold text-slate-900 tabular-nums">{value}</span>
    <button
      aria-label="Tăng"
      disabled={value >= max}
      onClick={() => onChange(Math.min(max, value + 1))}
      className="w-8 h-8 rounded-full border border-[#0071AF] text-[#0071AF] flex items-center justify-center disabled:text-slate-300 disabled:border-slate-200 cursor-pointer disabled:cursor-not-allowed hover:bg-sky-50"
    >
      <Plus className="w-4 h-4" strokeWidth={2.5} />
    </button>
  </div>
);

/* ------------------------------------------------------------------ */
/* Guest sheet                                                          */
/* ------------------------------------------------------------------ */

export interface Guests {
  adults: number;
  children: number;
  rooms: number;
}

export const GuestSheet: React.FC<{
  value: Guests;
  showRooms?: boolean;
  adultLabel?: string;
  childLabel?: string;
  childHint?: string;
  title?: string;
  onClose: () => void;
  onApply: (g: Guests) => void;
}> = ({
  value,
  showRooms,
  adultLabel = 'Người lớn',
  childLabel = 'Trẻ em',
  childHint = 'Dưới 12 tuổi',
  title = 'Số khách',
  onClose,
  onApply,
}) => {
  const [g, setG] = useState<Guests>(value);
  const Row: React.FC<{ label: string; hint: string; node: React.ReactNode }> = ({ label, hint, node }) => (
    <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
      <div>
        <div className="text-[15px] font-semibold text-slate-900">{label}</div>
        <div className="text-xs text-slate-500 mt-0.5">{hint}</div>
      </div>
      {node}
    </div>
  );
  return (
    <BottomSheet
      title={title}
      onClose={onClose}
      z={80}
      footer={
        <CtaButton className="w-full" onClick={() => onApply(g)}>
          Áp dụng
        </CtaButton>
      }
    >
      <div className="px-5 py-1">
        <Row
          label={adultLabel}
          hint="Từ 12 tuổi trở lên"
          node={<Stepper value={g.adults} min={1} max={10} onChange={(v) => setG({ ...g, adults: v })} />}
        />
        <Row
          label={childLabel}
          hint={childHint}
          node={<Stepper value={g.children} min={0} max={6} onChange={(v) => setG({ ...g, children: v })} />}
        />
        {showRooms && (
          <Row
            label="Số phòng"
            hint="Tối đa 5 phòng mỗi lần đặt"
            node={<Stepper value={g.rooms} min={1} max={5} onChange={(v) => setG({ ...g, rooms: v })} />}
          />
        )}
      </div>
    </BottomSheet>
  );
};

/* ------------------------------------------------------------------ */
/* Calendar / date picker sheet                                         */
/* ------------------------------------------------------------------ */

const MONTH_COUNT = 8;

export const DatePickerSheet: React.FC<{
  mode: 'single' | 'range';
  start: string;
  end?: string;
  title?: string;
  onClose: () => void;
  onApply: (start: string, end?: string) => void;
}> = ({ mode, start, end, title, onClose, onApply }) => {
  const today = todayISO();
  const [s, setS] = useState<string>(start);
  const [e, setE] = useState<string | undefined>(mode === 'range' ? end : undefined);

  const months = useMemo(() => {
    const base = new Date();
    base.setDate(1);
    return Array.from({ length: MONTH_COUNT }, (_, i) => {
      const first = new Date(base.getFullYear(), base.getMonth() + i, 1);
      const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
      const offset = (first.getDay() + 6) % 7; // Monday first
      return { year: first.getFullYear(), month: first.getMonth(), daysInMonth, offset };
    });
  }, []);

  const pick = (iso: string) => {
    if (mode === 'single') {
      setS(iso);
      return;
    }
    if (!s || (s && e)) {
      setS(iso);
      setE(undefined);
    } else if (iso > s) {
      setE(iso);
    } else {
      setS(iso);
      setE(undefined);
    }
  };

  const canApply = mode === 'single' ? !!s : !!(s && e);
  const nights = s && e ? diffDays(s, e) : 0;

  return (
    <BottomSheet
      title={title || (mode === 'range' ? 'Chọn ngày nhận & trả phòng' : 'Chọn ngày đi')}
      onClose={onClose}
      tall
      z={80}
      footer={
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            {mode === 'range' ? (
              <>
                <div className="text-[11px] text-slate-500">
                  {s && !e ? 'Chọn tiếp ngày trả phòng' : s && e ? `${nights} đêm` : 'Chọn ngày nhận phòng'}
                </div>
                <div className="text-[13px] font-bold text-slate-900 truncate">
                  {s ? fmtDay(s) : '—'} {e ? `→ ${fmtDay(e)}` : ''}
                </div>
              </>
            ) : (
              <>
                <div className="text-[11px] text-slate-500">Ngày đã chọn</div>
                <div className="text-[13px] font-bold text-slate-900 truncate">{s ? fmtDay(s) : '—'}</div>
              </>
            )}
          </div>
          <CtaButton disabled={!canApply} onClick={() => onApply(s, e)}>
            Xác nhận
          </CtaButton>
        </div>
      }
    >
      <div className="sticky top-0 z-10 bg-white grid grid-cols-7 text-center text-[11px] font-semibold text-slate-500 py-2 px-3 border-b border-slate-100">
        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((w, i) => (
          <span key={w} className={i >= 5 ? 'text-[#E11B1E]' : ''}>
            {w}
          </span>
        ))}
      </div>
      <div className="px-3 pb-6">
        {months.map((m) => (
          <div key={`${m.year}-${m.month}`} className="mt-4">
            <div className="text-[14px] font-bold text-slate-900 px-1 mb-1.5">
              Tháng {m.month + 1}, {m.year}
            </div>
            <div className="grid grid-cols-7 gap-y-1">
              {Array.from({ length: m.offset }).map((_, i) => (
                <span key={`b${i}`} />
              ))}
              {Array.from({ length: m.daysInMonth }, (_, i) => i + 1).map((day) => {
                const iso = `${m.year}-${pad(m.month + 1)}-${pad(day)}`;
                const disabled = iso < today;
                const isStart = iso === s;
                const isEnd = !!e && iso === e;
                const inRange = !!(s && e && iso > s && iso < e);
                const dow = (m.offset + day - 1) % 7;
                const weekend = dow >= 5;
                return (
                  <button
                    key={iso}
                    disabled={disabled}
                    onClick={() => pick(iso)}
                    className={`relative h-11 flex items-center justify-center text-[14px] font-medium transition cursor-pointer disabled:cursor-not-allowed ${
                      inRange ? 'bg-[#E6F3FB]' : ''
                    } ${isStart && e ? 'bg-gradient-to-r from-transparent from-50% to-[#E6F3FB] to-50%' : ''} ${
                      isEnd ? 'bg-gradient-to-l from-transparent from-50% to-[#E6F3FB] to-50%' : ''
                    }`}
                  >
                    <span
                      className={`w-10 h-10 rounded-full flex flex-col items-center justify-center leading-none ${
                        isStart || isEnd
                          ? 'bg-[#0071AF] text-white font-bold shadow'
                          : disabled
                          ? 'text-slate-300'
                          : weekend
                          ? 'text-[#E11B1E]'
                          : 'text-slate-800'
                      } ${!disabled && !isStart && !isEnd ? 'hover:bg-slate-100' : ''}`}
                    >
                      {day}
                      {iso === today && !isStart && !isEnd && (
                        <span className="w-1 h-1 rounded-full bg-[#0071AF] mt-0.5" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </BottomSheet>
  );
};

/* ------------------------------------------------------------------ */
/* Small shared pieces                                                  */
/* ------------------------------------------------------------------ */

export const Chip: React.FC<{ tone?: 'green' | 'blue' | 'orange' | 'red' | 'slate'; icon?: LucideIcon; children: React.ReactNode }> = ({
  tone = 'slate',
  icon: Icon,
  children,
}) => {
  const tones: Record<string, string> = {
    green: 'bg-[#E4F6EC] text-[#0E7A3E]',
    blue: 'bg-[#E6F3FB] text-[#005B93]',
    orange: 'bg-[#FFF1E3] text-[#B85500]',
    red: 'bg-[#FDECEC] text-[#C41418]',
    slate: 'bg-slate-100 text-slate-600',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-[3px] rounded-md text-[11px] font-semibold ${tones[tone]}`}>
      {Icon && <Icon className="w-3 h-3" strokeWidth={2.4} />}
      {children}
    </span>
  );
};

export const RatingBadge: React.FC<{ rating: number; count: number }> = ({ rating, count }) => (
  <div className="flex items-center gap-1.5">
    <span className="inline-flex items-center justify-center h-6 min-w-[34px] px-1.5 rounded-md rounded-bl-none bg-[#0071AF] text-white text-[12px] font-bold">
      {rating.toFixed(1)}
    </span>
    <span className="text-[12px] font-semibold text-[#0071AF]">{ratingLabel(rating)}</span>
    <span className="text-[11px] text-slate-400">({count.toLocaleString('vi-VN')})</span>
  </div>
);

export const SectionTitle: React.FC<{ title: string; sub?: string; right?: React.ReactNode }> = ({ title, sub, right }) => (
  <div className="flex items-end justify-between gap-2 mb-2.5">
    <div>
      <h2 className="text-[16px] font-bold text-slate-900 leading-tight">{title}</h2>
      {sub && <p className="text-[12px] text-slate-500 mt-0.5">{sub}</p>}
    </div>
    {right}
  </div>
);

export const FieldRow: React.FC<{
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  onClick?: () => void;
  trailing?: React.ReactNode;
}> = ({ icon: Icon, label, value, onClick, trailing }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left hover:bg-slate-50 transition cursor-pointer"
  >
    <Icon className="w-5 h-5 text-[#0071AF] shrink-0" strokeWidth={2} />
    <span className="flex-1 min-w-0">
      <span className="block text-[11px] text-slate-500 leading-tight">{label}</span>
      <span className="block text-[14px] font-bold text-slate-900 leading-snug truncate">{value}</span>
    </span>
    {trailing ?? <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />}
  </button>
);

export const BackBar: React.FC<{ title: string; sub?: string; onClose: () => void }> = ({ title, sub, onClose }) => (
  <div className="bg-[#0071AF] text-white px-2 py-2.5 flex items-center gap-1 shrink-0">
    <button onClick={onClose} aria-label="Quay lại" className="w-9 h-9 rounded-full hover:bg-white/15 flex items-center justify-center cursor-pointer">
      <ChevronLeft className="w-6 h-6" />
    </button>
    <div className="min-w-0">
      <div className="text-[15px] font-bold leading-tight truncate">{title}</div>
      {sub && <div className="text-[12px] text-white/85 truncate">{sub}</div>}
    </div>
  </div>
);

export const CheckList: React.FC<{ items: string[]; tone?: 'ok' | 'no' }> = ({ items, tone = 'ok' }) => (
  <ul className="space-y-1.5">
    {items.map((it, i) => (
      <li key={i} className="flex items-start gap-2 text-[13px] text-slate-700 leading-snug">
        {tone === 'ok' ? (
          <CheckCircle2 className="w-4 h-4 text-[#12A150] shrink-0 mt-px" />
        ) : (
          <X className="w-4 h-4 text-[#E11B1E] shrink-0 mt-px" />
        )}
        <span>{it}</span>
      </li>
    ))}
  </ul>
);
