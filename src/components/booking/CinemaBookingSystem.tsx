import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Film, 
  Clock, 
  MapPin, 
  Star, 
  Calendar, 
  Armchair, 
  Coffee, 
  CreditCard, 
  CheckCircle2, 
  QrCode, 
  Share2, 
  Download, 
  Sparkles, 
  ShieldCheck,
  Info,
  ChevronRight,
  Plus,
  Minus,
  Check
} from 'lucide-react';

export interface Movie {
  id: string;
  title: string;
  englishTitle: string;
  genre: string;
  duration: string;
  rating: string;
  ageRating: string;
  poster: string;
  banner: string;
  synopsis: string;
  formats: string[];
}

export interface CinemaBrand {
  id: string;
  name: string;
  shortName: string;
  color: string;
  locationsCount: number;
  highlight: string;
}

export const CINEMA_BRANDS: CinemaBrand[] = [
  { id: 'all', name: 'Tất cả rạp', shortName: 'Tất cả', color: '#0071AF', locationsCount: 120, highlight: 'Toàn quốc' },
  { id: 'cgv', name: 'CGV Cinemas', shortName: 'CGV', color: '#E71A0F', locationsCount: 82, highlight: 'IMAX & ScreenX' },
  { id: 'lotte', name: 'Lotte Cinema', shortName: 'Lotte', color: '#ED1B24', locationsCount: 46, highlight: 'Superplex 4K' },
  { id: 'galaxy', name: 'Galaxy Cinema', shortName: 'Galaxy', color: '#0C4CA3', locationsCount: 22, highlight: 'Giá vé học sinh' },
  { id: 'bhd', name: 'BHD Star Cineplex', shortName: 'BHD Star', color: '#689F38', locationsCount: 15, highlight: 'Âm thanh Atmos' },
  { id: 'beta', name: 'Beta Cinemas', shortName: 'Beta', color: '#00A859', locationsCount: 20, highlight: 'Bắp ngon số 1' }
];

export const MOVIES: Movie[] = [
  {
    id: 'mov_mai',
    title: 'Mai',
    englishTitle: 'Mai (Trấn Thành Film)',
    genre: 'Tâm lý, Tình cảm, Gia đình',
    duration: '131 phút',
    rating: '9.2',
    ageRating: 'T18 - Phim cấm khán giả dưới 18 tuổi',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=1200&q=80',
    synopsis: 'Tác phẩm điện ảnh sâu sắc chạm đến trái tim hàng triệu khán giả về tình yêu, sự hy sinh và những vết thương quá khứ.',
    formats: ['2D Lồng tiếng', '2D Phụ đề', 'Dolby Atmos']
  },
  {
    id: 'mov_dune2',
    title: 'Dune: Hành Tinh Cát 2',
    englishTitle: 'Dune: Part Two',
    genre: 'Khoa học viễn tưởng, Hành động',
    duration: '166 phút',
    rating: '9.5',
    ageRating: 'T16 - Khán giả từ 16 tuổi',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    synopsis: 'Hành trình huyền thoại của Paul Atreides khi anh hợp nhất với Chani và người Fremen để trả thù những kẻ âm mưu tiêu diệt gia tộc.',
    formats: ['IMAX 3D Laser', '2D Phụ đề', '4DX']
  },
  {
    id: 'mov_exhuma',
    title: 'Quật Mộ Trùng Ma',
    englishTitle: 'Exhuma',
    genre: 'Kinh dị, Giật gân, Huyền bí',
    duration: '134 phút',
    rating: '9.0',
    ageRating: 'T16 - Khán giả từ 16 tuổi',
    poster: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    synopsis: 'Bộ phim kinh dị tâm linh Hàn Quốc gây bão phòng vé với những bí ẩn chôn vùi tại ngôi mộ tổ tiên đầy u ám.',
    formats: ['2D Phụ đề', 'Dolby Atmos']
  },
  {
    id: 'mov_daopho',
    title: 'Đào, Phở và Piano',
    englishTitle: 'Peach Blossom, Pho and Piano',
    genre: 'Lịch sử, Chiến tranh, Tình cảm',
    duration: '100 phút',
    rating: '9.3',
    ageRating: 'T13 - Khán giả từ 13 tuổi',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=1200&q=80',
    synopsis: 'Bức tranh hào hùng và lãng mạn về Hà Nội trong 60 ngày đêm khói lửa mùa đông năm 1946.',
    formats: ['2D Tiếng Việt']
  },
  {
    id: 'mov_latmat7',
    title: 'Lật Mặt 7: Một Điều Ước',
    englishTitle: 'Face Off 7: One Wish (Lý Hải)',
    genre: 'Gia đình, Tình cảm, Hài',
    duration: '138 phút',
    rating: '9.4',
    ageRating: 'Mọi lứa tuổi',
    poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80',
    synopsis: 'Câu chuyện cảm động lấy nước mắt hàng triệu người con về người mẹ tần tảo nuôi 5 người con khôn lớn.',
    formats: ['2D Tiếng Việt', 'Dolby Surround 7.1']
  }
];

export const SHOW_DATES = [
  { dayName: 'Hôm nay', dateStr: '27/10', full: '2026-10-27' },
  { dayName: 'Ngày mai', dateStr: '28/10', full: '2026-10-28' },
  { dayName: 'Thứ Tư', dateStr: '29/10', full: '2026-10-29' },
  { dayName: 'Thứ Năm', dateStr: '30/10', full: '2026-10-30' },
  { dayName: 'Thứ Sáu', dateStr: '31/10', full: '2026-10-31' }
];

export const CINEMA_LOCATIONS = [
  { id: 'cin_cgv_landmark', brand: 'cgv', name: 'CGV Vincom Center Landmark 81', address: 'Tầng B1, 720A Điện Biên Phủ, P.22, Bình Thạnh, TP.HCM', times: ['18:30', '19:45', '21:15', '22:45'] },
  { id: 'cin_lotte_nam_sai_gon', brand: 'lotte', name: 'Lotte Cinema Nam Sài Gòn', address: 'Tầng 3 Lotte Mart, 469 Nguyễn Hữu Thọ, Q.7, TP.HCM', times: ['18:15', '19:30', '20:50', '22:15'] },
  { id: 'cin_galaxy_nguyen_du', brand: 'galaxy', name: 'Galaxy Cinema Nguyễn Du', address: '116 Nguyễn Du, Quận 1, TP.HCM', times: ['18:00', '19:15', '20:30', '21:45'] },
  { id: 'cin_bhd_bitexco', brand: 'bhd', name: 'BHD Star Bitexco Icon 68', address: 'Tầng 3 & 4, Bitexco, 2 Hải Triều, Q.1, TP.HCM', times: ['18:45', '20:00', '21:30'] },
  { id: 'cin_beta_quang_trung', brand: 'beta', name: 'Beta Cinemas Quang Trung', address: '645 Quang Trung, P.11, Gò Vấp, TP.HCM', times: ['18:00', '19:20', '20:40', '22:00'] }
];

export const FOOD_COMBOS = [
  { id: 'combo_solo', name: 'Combo Solo 1 Bắp + 1 Nước', desc: '1 Bắp ngọt lớn + 1 Nước ngọt có ga 32oz', price: 85000, img: '🍿🥤' },
  { id: 'combo_couple', name: 'Combo Couple 1 Bắp + 2 Nước', desc: '1 Bắp caramen phô mai + 2 Nước ngọt 32oz', price: 110000, img: '🍿🥤🥤' },
  { id: 'combo_party', name: 'Combo Movie Party Siêu Tiết Kiệm', desc: '2 Bắp đặc biệt + 2 Nước lớn + 1 Snack khoai tây', price: 150000, img: '🍿🍿🥤🥤' }
];

// Định nghĩa ma trận ghế 6 hàng x 8 ghế (A1 - F8)
const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
const COLS = [1, 2, 3, 4, 5, 6, 7, 8];
const OCCUPIED_SEATS = ['B3', 'B4', 'C5', 'C6', 'D4', 'D5', 'E3', 'E4'];

export const CinemaBookingSystem: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  // Navigation step
  const [step, setStep] = useState<'select_movie' | 'select_seat' | 'select_food' | 'checkout' | 'ticket'>('select_movie');

  // Selected State
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedMovie, setSelectedMovie] = useState<Movie>(MOVIES[0]);
  const [selectedDate, setSelectedDate] = useState<string>(SHOW_DATES[0].full);
  const [selectedCinema, setSelectedCinema] = useState(CINEMA_LOCATIONS[0]);
  const [selectedTime, setSelectedTime] = useState<string>(CINEMA_LOCATIONS[0].times[0]);
  const [selectedFormat, setSelectedFormat] = useState<string>(MOVIES[0].formats[0]);
  
  // Seat state
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['D3', 'D4']);
  
  // Food combo count state
  const [foodCounts, setFoodCounts] = useState<Record<string, number>>({
    combo_couple: 1
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'paylater' | 'momo' | 'vnpay' | 'vippoint'>('paylater');

  // Calculate pricing
  const getSeatPrice = (seatId: string) => {
    const row = seatId[0];
    if (row === 'F') return 240000 / 2; // Ghế Sweetbox tính theo cặp
    if (row === 'D' || row === 'E') return 115000; // Ghế VIP
    return 95000; // Ghế Standard
  };

  const getSeatType = (seatId: string) => {
    const row = seatId[0];
    if (row === 'F') return 'Sweetbox Đôi';
    if (row === 'D' || row === 'E') return 'Ghế VIP';
    return 'Ghế Thường';
  };

  const seatsTotal = selectedSeats.reduce((sum, s) => sum + getSeatPrice(s), 0);
  const foodTotal = Object.entries(foodCounts).reduce((sum, [id, count]) => {
    const item = FOOD_COMBOS.find(f => f.id === id);
    return sum + (item ? item.price * count : 0);
  }, 0);
  const grandTotal = seatsTotal + foodTotal;

  // Toggle seat selection
  const handleToggleSeat = (seatId: string) => {
    if (OCCUPIED_SEATS.includes(seatId)) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length >= 8) {
        alert('Tối đa 8 ghế cho mỗi lượt đặt vé');
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleUpdateFood = (id: string, delta: number) => {
    const current = foodCounts[id] || 0;
    const next = Math.max(0, current + delta);
    setFoodCounts({ ...foodCounts, [id]: next });
  };

  // Filtered cinemas by brand
  const filteredCinemas = selectedBrand === 'all' 
    ? CINEMA_LOCATIONS 
    : CINEMA_LOCATIONS.filter(c => c.brand === selectedBrand);

  return (
    <div className="fixed inset-0 z-50 bg-[#F4F6F8] flex flex-col font-sans select-none overflow-hidden animate-in fade-in duration-200">
      {/* 1. Header Bar */}
      <div className="bg-[#0071AF] text-white px-4 py-3 flex items-center justify-between shadow-md shrink-0 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              if (step === 'select_seat') setStep('select_movie');
              else if (step === 'select_food') setStep('select_seat');
              else if (step === 'checkout') setStep('select_food');
              else if (step === 'ticket') setStep('select_movie');
              else onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-[#FED100]" />
              <h1 className="font-extrabold text-sm sm:text-base tracking-tight">
                {step === 'select_movie' && 'Hệ Thống Đặt Vé Xem Phim Liên Rạp'}
                {step === 'select_seat' && 'Chọn Ghế Ngồi & Suất Chiếu'}
                {step === 'select_food' && 'Chọn Bắp Nước Ưu Đãi'}
                {step === 'checkout' && 'Xác Nhận & Thanh Toán'}
                {step === 'ticket' && 'Vé Xem Phim Điện Tử'}
              </h1>
            </div>
            <div className="text-[10px] text-sky-100 flex items-center gap-1">
              <span>Tài trợ trả chậm 0% bởi Ví MWG PayLater</span>
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              <span>CGV • Lotte • Galaxy • BHD • Beta</span>
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="text-white/80 hover:text-white text-xs font-bold px-2 py-1 bg-white/10 rounded-lg hover:bg-white/20 transition cursor-pointer"
        >
          Đóng
        </button>
      </div>

      {/* ========================================================= */}
      {/* 2. MAIN CONTENT BY STEPS                                  */}
      {/* ========================================================= */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* STEP 1: SELECT MOVIE & CINEMA */}
        {step === 'select_movie' && (
          <div className="p-4 space-y-4 max-w-xl mx-auto">
            {/* Banner giới thiệu Ví MWG PayLater Movie */}
            <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 rounded-2xl p-3.5 text-white shadow-sm flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-[#FED100] text-slate-900">
                  ĐẶC QUYỀN VÍ MWG PAYLATER
                </span>
                <div className="font-extrabold text-xs sm:text-sm mt-1">
                  Xem phim hôm nay • 0đ trả trước
                </div>
                <div className="text-[10px] text-white/90">
                  Áp dụng toàn bộ hệ thống rạp toàn quốc. Giảm 20K vé đầu tiên!
                </div>
              </div>
              <div className="text-3xl shrink-0 ml-2">🎬</div>
            </div>

            {/* Cinema Brand Pills Filter */}
            <div>
              <div className="text-xs font-bold text-slate-800 mb-2">Chọn cụm rạp liên kết:</div>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {CINEMA_BRANDS.map(brand => (
                  <button
                    key={brand.id}
                    onClick={() => setSelectedBrand(brand.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs shrink-0 transition cursor-pointer flex items-center gap-1.5 border ${
                      selectedBrand === brand.id
                        ? 'bg-[#0071AF] text-white border-[#0071AF] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300'
                    }`}
                  >
                    <span>{brand.shortName}</span>
                    <span className="text-[10px] opacity-80">({brand.locationsCount})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Movie Carousel / List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Phim đang chiếu nóng bỏng:</span>
                <span className="text-[11px] text-[#0071AF] font-bold">{MOVIES.length} phim hot</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MOVIES.map(movie => (
                  <div
                    key={movie.id}
                    onClick={() => {
                      setSelectedMovie(movie);
                      setSelectedFormat(movie.formats[0]);
                    }}
                    className={`bg-white rounded-2xl p-3 border transition cursor-pointer flex gap-3 relative shadow-2xs hover:shadow-md ${
                      selectedMovie.id === movie.id
                        ? 'border-2 border-[#0071AF] ring-2 ring-[#0071AF]/10 bg-sky-50/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Poster */}
                    <div className="w-20 h-28 rounded-xl overflow-hidden bg-slate-200 shrink-0 relative shadow-xs">
                      <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                      <div className="absolute top-1 left-1 bg-black/70 backdrop-blur-xs text-white text-[9px] font-black px-1.5 py-0.2 rounded">
                        ★ {movie.rating}
                      </div>
                    </div>

                    {/* Movie Info */}
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="font-extrabold text-xs text-slate-900 line-clamp-1">{movie.title}</div>
                        <div className="text-[10px] text-slate-500 line-clamp-1">{movie.englishTitle}</div>
                        <div className="text-[10px] text-slate-600 mt-1 flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{movie.duration}</span>
                          <span>•</span>
                          <span className="text-amber-700 bg-amber-50 px-1 rounded">{movie.ageRating.split(' - ')[0]}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-tight">
                          {movie.synopsis}
                        </div>
                      </div>

                      {/* Formats badges */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {movie.formats.map((fmt, fIdx) => (
                          <span key={fIdx} className="px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded text-[9px] font-semibold">
                            {fmt}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Select Date */}
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-2">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#0071AF]" />
                <span>Chọn ngày xem phim:</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {SHOW_DATES.map((d) => (
                  <button
                    key={d.full}
                    onClick={() => setSelectedDate(d.full)}
                    className={`py-2 px-1 rounded-xl text-center transition cursor-pointer border ${
                      selectedDate === d.full
                        ? 'bg-[#0071AF] text-white border-[#0071AF] shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <div className="text-[10px] font-medium opacity-90">{d.dayName}</div>
                    <div className="text-xs font-black mt-0.5">{d.dateStr}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Select Cinema & Showtime */}
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-3">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#0071AF]" />
                <span>Chọn rạp &amp; suất chiếu:</span>
              </div>

              <div className="space-y-3">
                {filteredCinemas.map(cin => (
                  <div
                    key={cin.id}
                    className={`p-3 rounded-2xl border transition ${
                      selectedCinema.id === cin.id
                        ? 'border-[#0071AF] bg-sky-50/30'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-extrabold text-xs text-slate-900">{cin.name}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{cin.address}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-slate-100 text-slate-700">
                        {cin.brand}
                      </span>
                    </div>

                    {/* Showtimes buttons */}
                    <div className="flex flex-wrap gap-2 mt-2.5">
                      {cin.times.map((time, tIdx) => (
                        <button
                          key={tIdx}
                          onClick={() => {
                            setSelectedCinema(cin);
                            setSelectedTime(time);
                            setStep('select_seat');
                          }}
                          className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition cursor-pointer border flex items-center gap-1 ${
                            selectedCinema.id === cin.id && selectedTime === time
                              ? 'bg-[#0071AF] text-white border-[#0071AF]'
                              : 'bg-white text-slate-700 border-slate-300 hover:border-[#0071AF] hover:text-[#0071AF]'
                          }`}
                        >
                          <span>{time}</span>
                          <span className="text-[9px] opacity-75 font-sans">2D</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT SEAT */}
        {step === 'select_seat' && (
          <div className="p-4 space-y-4 max-w-xl mx-auto">
            {/* Header info */}
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">{selectedMovie.title}</h3>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {selectedCinema.name} • Suất <span className="font-bold text-[#0071AF]">{selectedTime}</span> ({selectedDate})
                  </div>
                </div>
                <button
                  onClick={() => setStep('select_movie')}
                  className="text-xs font-bold text-[#0071AF] hover:underline"
                >
                  Đổi suất
                </button>
              </div>
            </div>

            {/* Curved Screen Visualization */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col items-center">
              <div className="w-full max-w-[280px] flex flex-col items-center mb-6">
                <div className="w-full h-3 bg-gradient-to-b from-sky-400 to-transparent rounded-t-full shadow-sm" />
                <div className="w-3/4 h-1 bg-[#0071AF] rounded-full shadow-md" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">MÀN HÌNH CHIẾU</span>
              </div>

              {/* Seat Matrix */}
              <div className="space-y-2">
                {ROWS.map(row => (
                  <div key={row} className="flex items-center gap-1.5 justify-center">
                    <span className="w-4 font-mono font-bold text-xs text-slate-400 text-center">{row}</span>
                    <div className="flex gap-1.5">
                      {COLS.map(col => {
                        const seatId = `${row}${col}`;
                        const isOccupied = OCCUPIED_SEATS.includes(seatId);
                        const isSelected = selectedSeats.includes(seatId);
                        const isSweetbox = row === 'F';
                        const isVip = row === 'D' || row === 'E';

                        let btnBg = 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200';
                        if (isOccupied) {
                          btnBg = 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50 border-transparent';
                        } else if (isSelected) {
                          btnBg = 'bg-[#0071AF] text-[#FED100] border-[#0071AF] shadow-sm font-black scale-105';
                        } else if (isSweetbox) {
                          btnBg = 'bg-pink-50 hover:bg-pink-100 text-pink-700 border-pink-200';
                        } else if (isVip) {
                          btnBg = 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200';
                        }

                        return (
                          <button
                            key={seatId}
                            disabled={isOccupied}
                            onClick={() => handleToggleSeat(seatId)}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-mono text-[10px] font-bold flex items-center justify-center border transition cursor-pointer ${btnBg}`}
                            title={`${seatId} - ${getSeatType(seatId)}`}
                          >
                            {seatId}
                          </button>
                        );
                      })}
                    </div>
                    <span className="w-4 font-mono font-bold text-xs text-slate-400 text-center">{row}</span>
                  </div>
                ))}
              </div>

              {/* Seat Legend */}
              <div className="grid grid-cols-4 gap-2 text-[10px] font-medium text-slate-600 mt-6 pt-4 border-t border-slate-100 w-full text-center">
                <div className="flex items-center justify-center gap-1">
                  <div className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-300" />
                  <span>Thường (95K)</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <div className="w-3.5 h-3.5 rounded bg-amber-100 border border-amber-300" />
                  <span>VIP (115K)</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <div className="w-3.5 h-3.5 rounded bg-pink-100 border border-pink-300" />
                  <span>Đôi (120K)</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <div className="w-3.5 h-3.5 rounded bg-[#0071AF] text-[#FED100] flex items-center justify-center text-[8px] font-bold">✓</div>
                  <span>Đang chọn</span>
                </div>
              </div>
            </div>

            {/* Selected Seats summary */}
            <div className="bg-[#FFF9EA] border border-amber-200 rounded-2xl p-3.5 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-600 font-bold">Ghế đã chọn:</div>
                <div className="text-sm font-black text-[#0071AF] mt-0.5">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Chưa chọn ghế nào'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">Tiền vé:</div>
                <div className="text-base font-black text-slate-900">{seatsTotal.toLocaleString('vi-VN')}đ</div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: SELECT FOOD & COMBO */}
        {step === 'select_food' && (
          <div className="p-4 space-y-4 max-w-xl mx-auto">
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs">
              <h3 className="font-extrabold text-sm text-slate-900">Combo Bắp Nước Ưu Đãi</h3>
              <p className="text-xs text-slate-500 mt-0.5">Tiết kiệm đến 30% khi đặt trước trực tuyến</p>
            </div>

            <div className="space-y-3">
              {FOOD_COMBOS.map(combo => {
                const count = foodCounts[combo.id] || 0;
                return (
                  <div
                    key={combo.id}
                    className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs flex items-center justify-between gap-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-2xl shrink-0">
                      {combo.img}
                    </div>

                    <div className="flex-1">
                      <div className="font-extrabold text-xs text-slate-900">{combo.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{combo.desc}</div>
                      <div className="font-black text-sm text-[#0071AF] mt-1">
                        {combo.price.toLocaleString('vi-VN')}đ
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
                      <button
                        onClick={() => handleUpdateFood(combo.id, -1)}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-black text-slate-700 flex items-center justify-center disabled:opacity-30 cursor-pointer"
                        disabled={count <= 0}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono font-bold text-xs min-w-[20px] text-center">{count}</span>
                      <button
                        onClick={() => handleUpdateFood(combo.id, 1)}
                        className="w-7 h-7 rounded-lg bg-[#FED100] text-slate-900 font-black flex items-center justify-center cursor-pointer shadow-2xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: CHECKOUT */}
        {step === 'checkout' && (
          <div className="p-4 space-y-4 max-w-xl mx-auto">
            {/* Booking Summary Card */}
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-xs text-slate-500">Thông tin vé xem phim</span>
                <span className="text-[11px] font-bold text-[#0071AF]">{selectedCinema.brand.toUpperCase()}</span>
              </div>

              <div className="flex gap-3">
                <img src={selectedMovie.poster} alt="" className="w-16 h-22 rounded-xl object-cover shrink-0 shadow-xs" />
                <div>
                  <h3 className="font-black text-sm text-slate-900">{selectedMovie.title}</h3>
                  <div className="text-xs text-slate-600 mt-1">{selectedCinema.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Suất: <strong className="text-slate-900 font-mono">{selectedTime}</strong> • {selectedDate}
                  </div>
                  <div className="text-xs text-slate-800 font-bold mt-1">
                    Ghế: <span className="text-[#0071AF] font-black">{selectedSeats.join(', ')}</span> ({selectedSeats.length} vé)
                  </div>
                </div>
              </div>

              {/* Price Details */}
              <div className="bg-slate-50 rounded-2xl p-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Tiền vé ({selectedSeats.length} ghế):</span>
                  <span className="font-bold">{seatsTotal.toLocaleString('vi-VN')}đ</span>
                </div>
                {foodTotal > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Combo Bắp Nước:</span>
                    <span className="font-bold">{foodTotal.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-1.5 flex justify-between font-black text-sm text-slate-900">
                  <span>Tổng thanh toán:</span>
                  <span className="text-[#0071AF] text-base">{grandTotal.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-2.5">
              <div className="text-xs font-bold text-slate-800">Phương thức thanh toán:</div>

              {/* Option 1: Ví MWG PayLater (Khuyên dùng) */}
              <div
                onClick={() => setPaymentMethod('paylater')}
                className={`p-3.5 rounded-2xl border-2 transition cursor-pointer flex items-center justify-between ${
                  paymentMethod === 'paylater'
                    ? 'border-[#0071AF] bg-sky-50/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0071AF] text-white flex items-center justify-center font-bold text-xs">
                    MWG
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-xs text-slate-900">Ví MWG PayLater</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-rose-600 text-white">
                        0% LÃI
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      0đ hôm nay • Trả sau 30 ngày hoặc chia nhỏ 3 tháng
                    </div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'paylater' ? 'border-[#0071AF] bg-[#0071AF]' : 'border-slate-300'
                }`}>
                  {paymentMethod === 'paylater' && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
              </div>

              {/* Option 2: MoMo */}
              <div
                onClick={() => setPaymentMethod('momo')}
                className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                  paymentMethod === 'momo'
                    ? 'border-[#0071AF] bg-sky-50/40'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-pink-600 text-white flex items-center justify-center font-bold text-xs">
                    MoMo
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">Ví MoMo</div>
                    <div className="text-[10px] text-slate-500">Quét mã QR thanh toán nhanh</div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'momo' ? 'border-[#0071AF] bg-[#0071AF]' : 'border-slate-300'
                }`}>
                  {paymentMethod === 'momo' && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
              </div>

              {/* Option 3: VNPay / VietQR */}
              <div
                onClick={() => setPaymentMethod('vnpay')}
                className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                  paymentMethod === 'vnpay'
                    ? 'border-[#0071AF] bg-sky-50/40'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    QR
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">VietQR / Thẻ ATM / Visa</div>
                    <div className="text-[10px] text-slate-500">Chuyển khoản liên ngân hàng 24/7</div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'vnpay' ? 'border-[#0071AF] bg-[#0071AF]' : 'border-slate-300'
                }`}>
                  {paymentMethod === 'vnpay' && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: E-TICKET CONFIRMATION */}
        {step === 'ticket' && (
          <div className="p-4 space-y-4 max-w-md mx-auto">
            {/* Success message */}
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="font-black text-lg text-slate-900 mt-2">Đặt Vé Thành Công!</h2>
              <p className="text-xs text-slate-500">
                Vé điện tử đã lưu vào lịch sử của bạn trên Quà Tặng VIP
              </p>
            </div>

            {/* Electronic Ticket Card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              {/* Ticket Header */}
              <div className="bg-gradient-to-r from-[#0071AF] to-sky-700 text-white p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-200">VÉ XEM PHIM ĐIỆN TỬ</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-[#FED100] text-slate-900">
                    {paymentMethod === 'paylater' ? 'MWG PayLater 0%' : 'Đã thanh toán'}
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-white mt-2 leading-tight">{selectedMovie.title}</h3>
                <div className="text-xs text-sky-100 mt-0.5">{selectedCinema.name}</div>
              </div>

              {/* Ticket Details */}
              <div className="p-4 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Ngày chiếu</span>
                    <strong className="text-slate-800 text-xs font-mono">{selectedDate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Giờ chiếu</span>
                    <strong className="text-slate-800 text-xs font-mono">{selectedTime}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Phòng chiếu</span>
                    <strong className="text-slate-800 text-xs">Cinema 04 (2D)</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Ghế</span>
                    <strong className="text-[#0071AF] text-sm font-black">{selectedSeats.join(', ')}</strong>
                  </div>
                </div>

                {foodTotal > 0 && (
                  <div className="bg-amber-50 p-2.5 rounded-xl text-[11px] text-amber-900 font-medium">
                    🍿 Bắp nước: {Object.entries(foodCounts).filter(([_, c]) => c > 0).map(([id, c]) => `${c}x ${FOOD_COMBOS.find(f => f.id === id)?.name}`).join(', ')}
                  </div>
                )}

                {/* QR Code section */}
                <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <div className="w-36 h-36 bg-white p-2 rounded-xl shadow-xs border border-slate-200 flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-slate-800" />
                  </div>
                  <div className="font-mono font-bold text-xs text-slate-700 mt-2 tracking-widest">
                    TICKET-MWG-{Math.floor(100000 + Math.random() * 900000)}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Đưa mã này tại cổng vào rạp để vào thẳng phòng chiếu
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => alert('Đã lưu ảnh vé vào thư viện điện thoại!')}
                  className="flex-1 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-xs text-slate-700 flex items-center justify-center gap-1.5 hover:bg-slate-100 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Lưu vé</span>
                </button>
                <button
                  onClick={() => {
                    setStep('select_movie');
                    setSelectedSeats(['D3', 'D4']);
                  }}
                  className="flex-1 py-2.5 bg-[#0071AF] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#005E93] transition cursor-pointer"
                >
                  <span>Đặt vé khác</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 3. Sticky Bottom CTA Bar                                  */}
      {/* ========================================================= */}
      {step !== 'ticket' && (
        <div className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3.5 px-4 flex items-center justify-between gap-3 shadow-lg">
          <div>
            <div className="text-[11px] text-slate-500 font-medium">
              {step === 'select_movie' && `${selectedMovie.title}`}
              {step === 'select_seat' && `${selectedSeats.length} ghế đã chọn`}
              {step === 'select_food' && 'Tổng tạm tính'}
              {step === 'checkout' && 'Thanh toán ngay'}
            </div>
            <div className="text-base sm:text-lg font-black text-[#0071AF]">
              {grandTotal > 0 ? `${grandTotal.toLocaleString('vi-VN')}đ` : 'Chưa chọn vé'}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {step === 'select_movie' && (
              <button
                onClick={() => setStep('select_seat')}
                className="px-5 py-3 bg-[#FFDF00] hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-md transition cursor-pointer flex items-center gap-1.5"
              >
                <span>Chọn ghế</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            )}

            {step === 'select_seat' && (
              <button
                disabled={selectedSeats.length === 0}
                onClick={() => setStep('select_food')}
                className="px-5 py-3 bg-[#FFDF00] hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-md transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <span>Chọn bắp nước</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            )}

            {step === 'select_food' && (
              <button
                onClick={() => setStep('checkout')}
                className="px-5 py-3 bg-[#FFDF00] hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-md transition cursor-pointer flex items-center gap-1.5"
              >
                <span>Tiếp tục thanh toán</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            )}

            {step === 'checkout' && (
              <button
                onClick={() => setStep('ticket')}
                className="px-6 py-3 bg-[#FFDF00] hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-md transition cursor-pointer flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Hoàn tất đặt vé</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
