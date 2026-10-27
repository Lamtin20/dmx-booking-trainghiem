import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Film, 
  Clock, 
  MapPin, 
  Star, 
  Calendar, 
  Armchair, 
  CreditCard, 
  CheckCircle2, 
  QrCode, 
  Download, 
  Sparkles, 
  ShieldCheck,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Search,
  Ticket,
  Play,
  Share2,
  Tag,
  Building,
  Heart,
  Flame,
  X
} from 'lucide-react';

export interface Movie {
  id: string;
  title: string;
  englishTitle: string;
  genre: string;
  duration: string;
  rating: string;
  reviewsCount: string;
  ageRating: string;
  ageBadgeColor: string;
  releaseDate: string;
  poster: string;
  banner: string;
  synopsis: string;
  formats: string[];
  isHot?: boolean;
}

export interface CinemaBrand {
  id: string;
  name: string;
  shortName: string;
  logoBg: string;
  logoColor: string;
  highlight: string;
}

export const CINEMA_BRANDS: CinemaBrand[] = [
  { id: 'all', name: 'Tất cả rạp', shortName: 'Tất cả', logoBg: 'bg-slate-900', logoColor: 'text-white', highlight: 'Gần bạn' },
  { id: 'cgv', name: 'CGV Cinemas', shortName: 'CGV', logoBg: 'bg-[#E71A0F]', logoColor: 'text-white', highlight: 'IMAX 3D' },
  { id: 'lotte', name: 'Lotte Cinema', shortName: 'Lotte', logoBg: 'bg-[#ED1B24]', logoColor: 'text-white', highlight: 'Superplex' },
  { id: 'galaxy', name: 'Galaxy Cinema', shortName: 'Galaxy', logoBg: 'bg-[#0C4CA3]', logoColor: 'text-white', highlight: 'Giá tốt' },
  { id: 'bhd', name: 'BHD Star', shortName: 'BHD Star', logoBg: 'bg-[#558B2F]', logoColor: 'text-white', highlight: 'Atmos 7.1' },
  { id: 'beta', name: 'Beta Cinemas', shortName: 'Beta', logoBg: 'bg-[#00A859]', logoColor: 'text-white', highlight: 'Bắp ngon' }
];

export const CITIES = ['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Bình Dương', 'Cần Thơ', 'Đà Lạt'];

export const NOW_SHOWING_MOVIES: Movie[] = [
  {
    id: 'mov_mai',
    title: 'Mai',
    englishTitle: 'Mai (Trấn Thành Film)',
    genre: 'Tâm lý • Tình cảm • Gia đình',
    duration: '131 phút',
    rating: '9.2',
    reviewsCount: '48.2k',
    ageRating: 'T18',
    ageBadgeColor: 'bg-rose-600 text-white',
    releaseDate: 'Đang chiếu',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=1200&q=80',
    synopsis: 'Tác phẩm điện ảnh sâu sắc chạm đến trái tim hàng triệu khán giả về tình yêu, sự hy sinh và những vết thương quá khứ.',
    formats: ['2D Lồng tiếng', '2D Phụ đề', 'Dolby Atmos'],
    isHot: true
  },
  {
    id: 'mov_dune2',
    title: 'Dune: Hành Tinh Cát 2',
    englishTitle: 'Dune: Part Two',
    genre: 'Hành động • Viễn tưởng • Phiêu lưu',
    duration: '166 phút',
    rating: '9.5',
    reviewsCount: '65.8k',
    ageRating: 'T16',
    ageBadgeColor: 'bg-amber-600 text-white',
    releaseDate: 'Đang chiếu',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    synopsis: 'Hành trình huyền thoại của Paul Atreides khi anh hợp nhất với Chani và người Fremen để trả thù những kẻ âm mưu tiêu diệt gia tộc.',
    formats: ['IMAX 3D Laser', '2D Phụ đề', '4DX'],
    isHot: true
  },
  {
    id: 'mov_latmat7',
    title: 'Lật Mặt 7: Một Điều Ước',
    englishTitle: 'Face Off 7: One Wish (Lý Hải)',
    genre: 'Gia đình • Tâm lý • Tình cảm',
    duration: '138 phút',
    rating: '9.4',
    reviewsCount: '52.1k',
    ageRating: 'P',
    ageBadgeColor: 'bg-emerald-600 text-white',
    releaseDate: 'Đang chiếu',
    poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80',
    synopsis: 'Câu chuyện cảm động lấy nước mắt hàng triệu người con về người mẹ tần tảo nuôi 5 người con khôn lớn.',
    formats: ['2D Tiếng Việt', 'Dolby Surround 7.1'],
    isHot: true
  },
  {
    id: 'mov_exhuma',
    title: 'Quật Mộ Trùng Ma',
    englishTitle: 'Exhuma',
    genre: 'Kinh dị • Giật gân • Huyền bí',
    duration: '134 phút',
    rating: '9.0',
    reviewsCount: '34.5k',
    ageRating: 'T16',
    ageBadgeColor: 'bg-amber-600 text-white',
    releaseDate: 'Đang chiếu',
    poster: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    synopsis: 'Bộ phim kinh dị tâm linh Hàn Quốc gây bão phòng vé với những bí ẩn chôn vùi tại ngôi mộ tổ tiên đầy u ám.',
    formats: ['2D Phụ đề', 'Dolby Atmos']
  },
  {
    id: 'mov_daopho',
    title: 'Đào, Phở và Piano',
    englishTitle: 'Peach Blossom, Pho and Piano',
    genre: 'Lịch sử • Chiến tranh • Lãng mạn',
    duration: '100 phút',
    rating: '9.3',
    reviewsCount: '29.7k',
    ageRating: 'T13',
    ageBadgeColor: 'bg-orange-600 text-white',
    releaseDate: 'Đang chiếu',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=1200&q=80',
    synopsis: 'Bức tranh hào hùng và lãng mạn về Hà Nội trong 60 ngày đêm khói lửa mùa đông năm 1946.',
    formats: ['2D Tiếng Việt']
  }
];

export const COMING_SOON_MOVIES: Movie[] = [
  {
    id: 'mov_godzilla_kong',
    title: 'Godzilla x Kong: Đế Chế Mới',
    englishTitle: 'The New Empire',
    genre: 'Hành động • Quái thú • 3D',
    duration: '115 phút',
    rating: '8.8',
    reviewsCount: 'Sắp chiếu',
    ageRating: 'T13',
    ageBadgeColor: 'bg-orange-600 text-white',
    releaseDate: 'Khởi chiếu 15/11',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    synopsis: 'Hai quái thú huyền thoại hợp sức chống lại một mối đe dọa khổng lồ giấu kín trong Trái Đất rỗng.',
    formats: ['IMAX 3D Laser', '2D Phụ đề', '4DX']
  },
  {
    id: 'mov_conan',
    title: 'Thám Tử Lừng Danh Conan: Ngôi Sao 1 Triệu Đô',
    englishTitle: 'Detective Conan: The Million-dollar Pentagram',
    genre: 'Hoạt hình • Trinh thám • Phiêu lưu',
    duration: '110 phút',
    rating: '9.6',
    reviewsCount: 'Sắp chiếu',
    ageRating: 'P',
    ageBadgeColor: 'bg-emerald-600 text-white',
    releaseDate: 'Khởi chiếu 22/11',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=1200&q=80',
    synopsis: 'Cuộc đối đầu kịch tính giữa Siêu trộm Kaito Kid, Heiji Hattori và Conan tại thành phố Hakodate.',
    formats: ['2D Lồng tiếng', '2D Phụ đề']
  }
];

export const SHOW_DATES = [
  { dayName: 'Hôm nay', dateStr: '27/10', full: '2026-10-27' },
  { dayName: 'Ngày mai', dateStr: '28/10', full: '2026-10-28' },
  { dayName: 'Thứ Tư', dateStr: '29/10', full: '2026-10-29' },
  { dayName: 'Thứ Năm', dateStr: '30/10', full: '2026-10-30' },
  { dayName: 'Thứ Sáu', dateStr: '31/10', full: '2026-10-31' },
  { dayName: 'Thứ Bảy', dateStr: '01/11', full: '2026-11-01' }
];

export const CINEMA_LOCATIONS = [
  { 
    id: 'cin_cgv_landmark', 
    brand: 'cgv', 
    brandName: 'CGV Cinemas',
    name: 'CGV Vincom Center Landmark 81', 
    address: 'Tầng B1, 720A Điện Biên Phủ, P.22, Bình Thạnh, TP.HCM', 
    distance: '1.2 km',
    showtimes: [
      { time: '18:15', format: '2D Phụ đề', price: 95000 },
      { time: '19:30', format: 'IMAX 3D', price: 160000 },
      { time: '20:45', format: '2D Phụ đề', price: 105000 },
      { time: '22:15', format: '2D Phụ đề', price: 95000 }
    ]
  },
  { 
    id: 'cin_lotte_nam_sai_gon', 
    brand: 'lotte', 
    brandName: 'Lotte Cinema',
    name: 'Lotte Cinema Nam Sài Gòn', 
    address: 'Tầng 3 Lotte Mart, 469 Nguyễn Hữu Thọ, Q.7, TP.HCM', 
    distance: '2.5 km',
    showtimes: [
      { time: '18:00', format: '2D Lồng tiếng', price: 90000 },
      { time: '19:15', format: 'Superplex 4K', price: 120000 },
      { time: '20:30', format: '2D Phụ đề', price: 95000 },
      { time: '21:50', format: '2D Phụ đề', price: 90000 }
    ]
  },
  { 
    id: 'cin_galaxy_nguyen_du', 
    brand: 'galaxy', 
    brandName: 'Galaxy Cinema',
    name: 'Galaxy Cinema Nguyễn Du', 
    address: '116 Nguyễn Du, Quận 1, TP.HCM', 
    distance: '3.1 km',
    showtimes: [
      { time: '18:30', format: '2D Phụ đề', price: 85000 },
      { time: '19:45', format: '2D Lồng tiếng', price: 85000 },
      { time: '21:00', format: '2D Phụ đề', price: 85000 },
      { time: '22:30', format: '2D Phụ đề', price: 75000 }
    ]
  },
  { 
    id: 'cin_bhd_bitexco', 
    brand: 'bhd', 
    brandName: 'BHD Star',
    name: 'BHD Star Bitexco Icon 68', 
    address: 'Tầng 3 & 4, Bitexco, 2 Hải Triều, Q.1, TP.HCM', 
    distance: '3.4 km',
    showtimes: [
      { time: '18:45', format: '2D Phụ đề', price: 95000 },
      { time: '20:00', format: 'Dolby Atmos', price: 110000 },
      { time: '21:30', format: '2D Phụ đề', price: 95000 }
    ]
  },
  { 
    id: 'cin_beta_quang_trung', 
    brand: 'beta', 
    brandName: 'Beta Cinemas',
    name: 'Beta Cinemas Quang Trung', 
    address: '645 Quang Trung, P.11, Gò Vấp, TP.HCM', 
    distance: '4.2 km',
    showtimes: [
      { time: '18:00', format: '2D Lồng tiếng', price: 65000 },
      { time: '19:20', format: '2D Phụ đề', price: 70000 },
      { time: '20:40', format: '2D Phụ đề', price: 70000 },
      { time: '22:00', format: '2D Phụ đề', price: 60000 }
    ]
  }
];

export const FOOD_COMBOS = [
  { id: 'combo_solo', name: 'Combo Solo 1 Bắp + 1 Nước', desc: '1 Bắp ngọt lớn giòn rụm + 1 Nước ngọt có ga 32oz mát lạnh', price: 85000, origPrice: 110000, img: '🍿🥤', tag: 'Bán chạy' },
  { id: 'combo_couple', name: 'Combo Couple 1 Bắp + 2 Nước', desc: '1 Bắp caramen phô mai 2 vị + 2 Nước ngọt 32oz', price: 110000, origPrice: 145000, img: '🍿🥤🥤', tag: 'Cặp đôi tiết kiệm' },
  { id: 'combo_party', name: 'Combo Party Bắp Nước Siêu Tiết Kiệm', desc: '2 Bắp đặc biệt + 2 Nước lớn + 1 Snack khoai tây Pringles', price: 150000, origPrice: 200000, img: '🍿🍿🥤🥤', tag: 'Tiết kiệm 50K' }
];

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
const COLS_LEFT = [1, 2, 3, 4];
const COLS_RIGHT = [5, 6, 7, 8];
const OCCUPIED_SEATS = ['B3', 'B4', 'C5', 'C6', 'D4', 'D5', 'E3', 'E4'];

export const CinemaBookingSystem: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  // Navigation tabs (MoMo / ZaloPay style)
  const [navTab, setNavTab] = useState<'now_showing' | 'coming_soon' | 'cinemas' | 'my_tickets'>('now_showing');
  
  // Modal flow step
  const [step, setStep] = useState<'home' | 'select_showtime' | 'select_seat' | 'select_food' | 'checkout' | 'ticket'>('home');

  // Location selector
  const [selectedCity, setSelectedCity] = useState<string>('TP. Hồ Chí Minh');
  const [showCityDropdown, setShowCityDropdown] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected State
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedMovie, setSelectedMovie] = useState<Movie>(NOW_SHOWING_MOVIES[0]);
  const [selectedDate, setSelectedDate] = useState<string>(SHOW_DATES[0].full);
  const [selectedCinema, setSelectedCinema] = useState(CINEMA_LOCATIONS[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(CINEMA_LOCATIONS[0].showtimes[0]);
  
  // Seat state
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['D3', 'D4']);
  
  // Food combo count state
  const [foodCounts, setFoodCounts] = useState<Record<string, number>>({
    combo_couple: 1
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'paylater' | 'momo' | 'zalopay' | 'vietqr'>('paylater');

  // Booked tickets history
  const [bookedTickets, setBookedTickets] = useState<any[]>([
    {
      id: 'MWG-CINE-88912',
      movieTitle: 'Mai',
      cinemaName: 'CGV Vincom Center Landmark 81',
      date: '2026-10-27',
      time: '18:15',
      hall: 'Cinema 03 (2D Phụ đề)',
      seats: ['D3', 'D4'],
      foodSummary: '1x Combo Couple 1 Bắp + 2 Nước',
      totalAmount: 340000,
      paymentMethodName: 'Ví MWG PayLater (0% Lãi)'
    }
  ]);

  // Seat pricing
  const getSeatPrice = (seatId: string) => {
    const row = seatId[0];
    const base = selectedTimeSlot.price || 95000;
    if (row === 'F') return Math.round(base * 1.3); // Ghế đôi Sweetbox
    if (row === 'D' || row === 'E') return Math.round(base * 1.15); // Ghế VIP
    return base; // Ghế thường
  };

  const getSeatTypeName = (seatId: string) => {
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
  const discountAmount = paymentMethod === 'paylater' ? 20000 : 0;
  const grandTotal = Math.max(0, seatsTotal + foodTotal - discountAmount);

  // Seat toggle
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

  const handleCompleteOrder = () => {
    const newTicket = {
      id: `MWG-CINE-${Math.floor(100000 + Math.random() * 900000)}`,
      movieTitle: selectedMovie.title,
      cinemaName: selectedCinema.name,
      date: selectedDate,
      time: selectedTimeSlot.time,
      hall: `Cinema 04 (${selectedTimeSlot.format})`,
      seats: [...selectedSeats],
      foodSummary: Object.entries(foodCounts).filter(([_, c]) => c > 0).map(([id, c]) => `${c}x ${FOOD_COMBOS.find(f => f.id === id)?.name}`).join(', '),
      totalAmount: grandTotal,
      paymentMethodName: paymentMethod === 'paylater' ? 'Ví MWG PayLater (0% Lãi)' : paymentMethod === 'momo' ? 'Ví MoMo' : paymentMethod === 'zalopay' ? 'Ví ZaloPay' : 'VietQR'
    };
    setBookedTickets([newTicket, ...bookedTickets]);
    setStep('ticket');
  };

  // Filter movies
  const displayedMovies = (navTab === 'now_showing' ? NOW_SHOWING_MOVIES : COMING_SOON_MOVIES)
    .filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.genre.toLowerCase().includes(searchQuery.toLowerCase()));

  // Filtered cinemas
  const filteredCinemas = selectedBrand === 'all' 
    ? CINEMA_LOCATIONS 
    : CINEMA_LOCATIONS.filter(c => c.brand === selectedBrand);

  return (
    <div className="fixed inset-0 z-50 bg-[#F5F7FA] flex flex-col font-sans select-none overflow-hidden animate-in fade-in duration-200">
      {/* ========================================================= */}
      {/* 1. TOP APP BAR (MoMo / ZaloPay Style)                     */}
      {/* ========================================================= */}
      <div className="bg-white border-b border-slate-200 shadow-2xs shrink-0 sticky top-0 z-30">
        <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
          {/* Back button */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                if (step === 'select_showtime') setStep('home');
                else if (step === 'select_seat') setStep('select_showtime');
                else if (step === 'select_food') setStep('select_seat');
                else if (step === 'checkout') setStep('select_food');
                else if (step === 'ticket') setStep('home');
                else onClose();
              }}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* City Location Picker (MoMo/ZaloPay signature) */}
            <div className="relative">
              <button
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#0071AF]" />
                <span>{selectedCity}</span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>

              {showCityDropdown && (
                <div className="absolute left-0 top-full mt-1.5 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-40 text-xs animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1 font-bold text-slate-400 text-[10px] uppercase">Chọn tỉnh / thành phố</div>
                  {CITIES.map(c => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedCity(c);
                        setShowCityDropdown(false);
                      }}
                      className={`w-full px-3 py-2 text-left font-medium flex items-center justify-between cursor-pointer ${
                        selectedCity === c ? 'bg-sky-50 text-[#0071AF] font-bold' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>{c}</span>
                      {selectedCity === c && <Check className="w-3.5 h-3.5 text-[#0071AF]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Title or Brand Tag */}
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-rose-500 via-pink-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Film className="w-3.5 h-3.5" />
            </div>
            <span className="font-black text-xs sm:text-sm text-slate-900 tracking-tight">Vé Xem Phim</span>
          </div>

          {/* Close button */}
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer"
            title="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar (Only on Home screen) */}
        {step === 'home' && (
          <div className="px-3.5 pb-2.5">
            <div className="flex items-center gap-2 bg-[#F1F4F8] rounded-full px-3.5 py-1.5 border border-transparent focus-within:border-[#0071AF] focus-within:bg-white transition shadow-2xs">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên phim, diễn viên, cụm rạp..."
                className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* MoMo/ZaloPay Category Tabs */}
        {step === 'home' && (
          <div className="flex items-center justify-between border-t border-slate-100 px-2 text-xs font-bold text-slate-500">
            <button
              onClick={() => setNavTab('now_showing')}
              className={`flex-1 py-2.5 text-center transition cursor-pointer relative ${
                navTab === 'now_showing' ? 'text-[#0071AF]' : 'hover:text-slate-800'
              }`}
            >
              <span>Đang chiếu</span>
              <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-600 font-extrabold">
                {NOW_SHOWING_MOVIES.length}
              </span>
              {navTab === 'now_showing' && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-0.7 bg-[#0071AF] rounded-t-full" />
              )}
            </button>

            <button
              onClick={() => setNavTab('coming_soon')}
              className={`flex-1 py-2.5 text-center transition cursor-pointer relative ${
                navTab === 'coming_soon' ? 'text-[#0071AF]' : 'hover:text-slate-800'
              }`}
            >
              <span>Sắp chiếu</span>
              {navTab === 'coming_soon' && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-0.7 bg-[#0071AF] rounded-t-full" />
              )}
            </button>

            <button
              onClick={() => setNavTab('cinemas')}
              className={`flex-1 py-2.5 text-center transition cursor-pointer relative ${
                navTab === 'cinemas' ? 'text-[#0071AF]' : 'hover:text-slate-800'
              }`}
            >
              <span>Cụm rạp</span>
              {navTab === 'cinemas' && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-0.7 bg-[#0071AF] rounded-t-full" />
              )}
            </button>

            <button
              onClick={() => setNavTab('my_tickets')}
              className={`flex-1 py-2.5 text-center transition cursor-pointer relative ${
                navTab === 'my_tickets' ? 'text-[#0071AF]' : 'hover:text-slate-800'
              }`}
            >
              <span>Vé của tôi</span>
              {bookedTickets.length > 0 && (
                <span className="ml-1 text-[9px] w-4 h-4 rounded-full bg-[#0071AF] text-white inline-flex items-center justify-center font-bold">
                  {bookedTickets.length}
                </span>
              )}
              {navTab === 'my_tickets' && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-0.7 bg-[#0071AF] rounded-t-full" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 2. BODY CONTENT                                           */}
      {/* ========================================================= */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* VIEW A: HOME - NOW SHOWING & COMING SOON */}
        {step === 'home' && (navTab === 'now_showing' || navTab === 'coming_soon') && (
          <div className="p-3.5 space-y-4 max-w-xl mx-auto">
            {/* Promo Carousel Banner (MoMo & ZaloPay signature) */}
            <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-indigo-700 rounded-3xl p-4 text-white shadow-md relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-[#FED100] text-slate-900 shadow-2xs">
                    VÍ MWG PAYLATER 0%
                  </span>
                  <span className="text-[10px] text-pink-200 font-bold">• Đồng giá 50K thứ 4</span>
                </div>
                <h3 className="font-black text-sm sm:text-base text-white mt-1.5 leading-snug">
                  Xem Phim Hôm Nay • Trả Sau 0đ Với MWG PayLater
                </h3>
                <p className="text-[11px] text-pink-100 mt-1 max-w-[280px]">
                  Tài trợ 100% vé xem phim &amp; combo bắp nước liên rạp CGV, Lotte, Galaxy, BHD, Beta!
                </p>
              </div>

              {/* Decorative 3D Popcorn & Clapper */}
              <div className="absolute right-3 bottom-2 text-5xl opacity-90 select-none">
                🍿🎬
              </div>
            </div>

            {/* Cinema Chain Filter Pills */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">Cụm rạp liên kết:</span>
                <span className="text-[11px] text-[#0071AF] font-bold cursor-pointer" onClick={() => setNavTab('cinemas')}>Xem tất cả</span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {CINEMA_BRANDS.map(brand => (
                  <button
                    key={brand.id}
                    onClick={() => setSelectedBrand(brand.id)}
                    className={`px-3 py-1.5 rounded-2xl font-bold text-xs shrink-0 transition cursor-pointer flex items-center gap-1.5 border shadow-2xs ${
                      selectedBrand === brand.id
                        ? 'bg-[#0071AF] text-white border-[#0071AF]'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${brand.logoBg} ${brand.logoColor} flex items-center justify-center text-[8px] font-black`}>
                      {brand.shortName[0]}
                    </span>
                    <span>{brand.shortName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Movie List (MoMo / ZaloPay style card) */}
            <div className="space-y-3">
              {displayedMovies.map(movie => (
                <div
                  key={movie.id}
                  className="bg-white rounded-3xl p-3 border border-slate-200/90 hover:border-[#0071AF] shadow-xs hover:shadow-md transition flex gap-3 cursor-pointer group"
                  onClick={() => {
                    setSelectedMovie(movie);
                    setStep('select_showtime');
                  }}
                >
                  {/* Poster Image with Age & Rating Badges */}
                  <div className="w-24 sm:w-28 h-36 rounded-2xl overflow-hidden bg-slate-200 shrink-0 relative shadow-sm">
                    <img 
                      src={movie.poster} 
                      alt={movie.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                    />
                    {/* Age Rating Badge */}
                    <div className={`absolute top-1.5 left-1.5 text-[9px] font-black px-1.5 py-0.2 rounded-md shadow-xs ${movie.ageBadgeColor}`}>
                      {movie.ageRating}
                    </div>

                    {/* Star Rating Badge */}
                    <div className="absolute bottom-1.5 left-1.5 bg-black/75 backdrop-blur-xs text-[#FED100] text-[10px] font-black px-1.5 py-0.2 rounded-md flex items-center gap-0.5 shadow-xs">
                      <span>★</span>
                      <span>{movie.rating}</span>
                    </div>

                    {/* Play trailer overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow">
                        <Play className="w-4 h-4 ml-0.5 fill-slate-900" />
                      </div>
                    </div>
                  </div>

                  {/* Movie Info */}
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      {/* Title */}
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight group-hover:text-[#0071AF] transition">
                          {movie.title}
                        </h4>
                        {movie.isHot && (
                          <span className="px-1.5 py-0.2 rounded bg-rose-50 text-rose-600 text-[9px] font-black uppercase shrink-0 border border-rose-200">
                            HOT
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-slate-500 mt-0.5">{movie.englishTitle}</div>

                      {/* Genre & Duration */}
                      <div className="text-[11px] text-slate-600 mt-1 font-medium line-clamp-1">
                        {movie.genre}
                      </div>

                      <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{movie.duration}</span>
                        <span>•</span>
                        <span>{movie.reviewsCount} đánh giá</span>
                      </div>

                      {/* Format Badges */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {movie.formats.map((fmt, fIdx) => (
                          <span key={fIdx} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[9px] font-bold">
                            {fmt}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA Row: Price & Buy Button (Signature MoMo/ZaloPay Pink/Blue Button) */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                      <div>
                        <div className="text-[9px] text-slate-400">Giá từ</div>
                        <div className="text-xs sm:text-sm font-black text-[#0071AF]">
                          85.000đ
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMovie(movie);
                          setStep('select_showtime');
                        }}
                        className="px-4 py-1.5 bg-gradient-to-r from-[#0071AF] to-sky-600 hover:from-[#005E93] hover:to-[#0071AF] active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1"
                      >
                        <Ticket className="w-3.5 h-3.5 text-[#FED100]" />
                        <span>Mua vé</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW B: CINEMAS LIST TAB */}
        {step === 'home' && navTab === 'cinemas' && (
          <div className="p-3.5 space-y-3 max-w-xl mx-auto">
            <div className="text-xs font-bold text-slate-800">Cụm rạp tại {selectedCity}:</div>
            {filteredCinemas.map(cin => (
              <div
                key={cin.id}
                className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{cin.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{cin.address}</span>
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-[#0071AF] shrink-0">
                    {cin.distance}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-emerald-700 font-semibold">✓ Đầy đủ phòng chiếu 2D, IMAX, 4DX</span>
                  <button
                    onClick={() => {
                      setSelectedCinema(cin);
                      setStep('select_showtime');
                    }}
                    className="px-3 py-1 bg-[#FED100] text-slate-900 font-bold text-xs rounded-xl shadow-2xs"
                  >
                    Xem lịch chiếu
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW C: MY TICKETS TAB (MoMo / ZaloPay Ticket Wallet) */}
        {step === 'home' && navTab === 'my_tickets' && (
          <div className="p-3.5 space-y-3 max-w-md mx-auto">
            <div className="text-xs font-bold text-slate-800">Vé xem phim của bạn ({bookedTickets.length}):</div>

            {bookedTickets.map(t => (
              <div
                key={t.id}
                className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200 space-y-0"
              >
                <div className="bg-gradient-to-r from-[#0071AF] to-sky-700 text-white p-3.5 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-sky-200">VÉ ĐIỆN TỬ</span>
                    <h4 className="font-extrabold text-sm text-white mt-0.5">{t.movieTitle}</h4>
                  </div>
                  <span className="px-2 py-0.5 bg-[#FED100] text-slate-900 rounded-full text-[9px] font-black">
                    SẴN SÀNG QUÉT
                  </span>
                </div>

                <div className="p-3.5 space-y-2 text-xs">
                  <div className="text-slate-600 font-medium">{t.cinemaName}</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] pb-2 border-b border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Suất chiếu:</span>
                      <strong>{t.time} • {t.date}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Ghế ngồi:</span>
                      <strong className="text-[#0071AF] text-sm">{t.seats.join(', ')}</strong>
                    </div>
                  </div>

                  {t.foodSummary && (
                    <div className="text-[10px] text-amber-900 bg-amber-50 p-2 rounded-xl font-medium">
                      🍿 {t.foodSummary}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-[10px] text-slate-400">Mã vé:</span>
                      <div className="font-mono font-black text-xs text-slate-800">{t.id}</div>
                    </div>
                    <button
                      onClick={() => setStep('ticket')}
                      className="px-3 py-1.5 bg-[#0071AF] text-white rounded-xl font-bold text-xs flex items-center gap-1 shadow-xs"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Xem mã QR</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STEP 2: SELECT SHOWTIME FOR CHOSEN MOVIE */}
        {step === 'select_showtime' && (
          <div className="p-3.5 space-y-4 max-w-xl mx-auto">
            {/* Movie Header Card */}
            <div className="bg-white rounded-3xl p-3.5 border border-slate-200 shadow-xs flex gap-3">
              <img src={selectedMovie.poster} alt="" className="w-16 h-22 rounded-2xl object-cover shrink-0 shadow-xs" />
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-black ${selectedMovie.ageBadgeColor}`}>
                    {selectedMovie.ageRating}
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 line-clamp-1">{selectedMovie.title}</h3>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">{selectedMovie.englishTitle}</div>
                <div className="text-[10px] text-slate-600 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{selectedMovie.duration}</span>
                  <span>•</span>
                  <span>★ {selectedMovie.rating}</span>
                </div>
              </div>
            </div>

            {/* Horizontal Date Picker Strip (MoMo / ZaloPay style) */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs space-y-1.5">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#0071AF]" />
                <span>Chọn ngày xem phim:</span>
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {SHOW_DATES.map(d => (
                  <button
                    key={d.full}
                    onClick={() => setSelectedDate(d.full)}
                    className={`min-w-[62px] py-2 px-1 rounded-2xl text-center transition cursor-pointer border ${
                      selectedDate === d.full
                        ? 'bg-[#0071AF] text-white border-[#0071AF] shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <div className="text-[9px] opacity-80">{d.dayName}</div>
                    <div className="text-xs font-black mt-0.5">{d.dateStr}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cinemas & Showtimes Group */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-800">Chọn rạp &amp; suất chiếu phù hợp:</div>

              {CINEMA_LOCATIONS.map(cin => (
                <div
                  key={cin.id}
                  className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-slate-900 text-white">
                          {cin.brand}
                        </span>
                        <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">{cin.name}</h4>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{cin.address}</p>
                    </div>
                    <span className="text-[10px] text-[#0071AF] font-bold">{cin.distance}</span>
                  </div>

                  {/* Showtimes Grid with Price Chips */}
                  <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100">
                    {cin.showtimes.map((st, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => {
                          setSelectedCinema(cin);
                          setSelectedTimeSlot(st);
                          setStep('select_seat');
                        }}
                        className="p-2 rounded-2xl border border-slate-200 hover:border-[#0071AF] hover:bg-sky-50 transition cursor-pointer text-center group flex flex-col items-center"
                      >
                        <span className="font-mono font-black text-xs text-slate-900 group-hover:text-[#0071AF]">
                          {st.time}
                        </span>
                        <span className="text-[9px] text-slate-500 mt-0.5 line-clamp-1">{st.format}</span>
                        <span className="text-[9px] font-extrabold text-emerald-700 mt-0.5">
                          {st.price.toLocaleString('vi-VN')}đ
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: SELECT SEAT (MoMo / ZaloPay Curved Screen with Aisle Gap) */}
        {step === 'select_seat' && (
          <div className="p-3.5 space-y-4 max-w-xl mx-auto">
            {/* Header info */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-xs sm:text-sm text-slate-900">{selectedMovie.title}</h3>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {selectedCinema.name} • <strong className="text-[#0071AF] font-mono">{selectedTimeSlot.time}</strong> ({selectedDate})
                </div>
              </div>
              <button
                onClick={() => setStep('select_showtime')}
                className="text-xs font-bold text-[#0071AF] hover:underline"
              >
                Đổi suất
              </button>
            </div>

            {/* Cinema Curved Screen Visualization */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col items-center">
              {/* Glowing Curved Screen */}
              <div className="w-full max-w-[280px] flex flex-col items-center mb-6">
                <div className="w-full h-3 bg-gradient-to-b from-sky-400 via-sky-200 to-transparent rounded-t-full shadow-sm" />
                <div className="w-3/4 h-1 bg-[#0071AF] rounded-full shadow-md" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">MÀN HÌNH CHIẾU</span>
              </div>

              {/* Seat Matrix with Aisle Gap */}
              <div className="space-y-2 w-full max-w-sm">
                {ROWS.map(row => (
                  <div key={row} className="flex items-center gap-1 sm:gap-2 justify-center">
                    <span className="w-3.5 font-mono font-bold text-xs text-slate-400 text-center">{row}</span>
                    
                    {/* Left Block (Cols 1 - 4) */}
                    <div className="flex gap-1 sm:gap-1.5">
                      {COLS_LEFT.map(col => {
                        const seatId = `${row}${col}`;
                        const isOccupied = OCCUPIED_SEATS.includes(seatId);
                        const isSelected = selectedSeats.includes(seatId);
                        const isSweetbox = row === 'F';
                        const isVip = row === 'D' || row === 'E';

                        let btnBg = 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300';
                        if (isOccupied) {
                          btnBg = 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-40 border-transparent';
                        } else if (isSelected) {
                          btnBg = 'bg-[#0071AF] text-[#FED100] border-[#0071AF] shadow-md font-black scale-105';
                        } else if (isSweetbox) {
                          btnBg = 'bg-pink-50 hover:bg-pink-100 text-pink-700 border-pink-300';
                        } else if (isVip) {
                          btnBg = 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300';
                        }

                        return (
                          <button
                            key={seatId}
                            disabled={isOccupied}
                            onClick={() => handleToggleSeat(seatId)}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-mono text-[10px] font-bold flex items-center justify-center border transition cursor-pointer ${btnBg}`}
                            title={`${seatId} - ${getSeatTypeName(seatId)}`}
                          >
                            {seatId}
                          </button>
                        );
                      })}
                    </div>

                    {/* Aisle Space (Lối đi ở giữa chuẩn rạp) */}
                    <div className="w-2.5 sm:w-4" />

                    {/* Right Block (Cols 5 - 8) */}
                    <div className="flex gap-1 sm:gap-1.5">
                      {COLS_RIGHT.map(col => {
                        const seatId = `${row}${col}`;
                        const isOccupied = OCCUPIED_SEATS.includes(seatId);
                        const isSelected = selectedSeats.includes(seatId);
                        const isSweetbox = row === 'F';
                        const isVip = row === 'D' || row === 'E';

                        let btnBg = 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300';
                        if (isOccupied) {
                          btnBg = 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-40 border-transparent';
                        } else if (isSelected) {
                          btnBg = 'bg-[#0071AF] text-[#FED100] border-[#0071AF] shadow-md font-black scale-105';
                        } else if (isSweetbox) {
                          btnBg = 'bg-pink-50 hover:bg-pink-100 text-pink-700 border-pink-300';
                        } else if (isVip) {
                          btnBg = 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300';
                        }

                        return (
                          <button
                            key={seatId}
                            disabled={isOccupied}
                            onClick={() => handleToggleSeat(seatId)}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-mono text-[10px] font-bold flex items-center justify-center border transition cursor-pointer ${btnBg}`}
                            title={`${seatId} - ${getSeatTypeName(seatId)}`}
                          >
                            {seatId}
                          </button>
                        );
                      })}
                    </div>

                    <span className="w-3.5 font-mono font-bold text-xs text-slate-400 text-center">{row}</span>
                  </div>
                ))}
              </div>

              {/* Seat Legend (MoMo / ZaloPay style) */}
              <div className="grid grid-cols-4 gap-2 text-[10px] font-medium text-slate-600 mt-6 pt-4 border-t border-slate-100 w-full text-center">
                <div className="flex items-center justify-center gap-1">
                  <div className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-300" />
                  <span>Thường</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <div className="w-3.5 h-3.5 rounded bg-amber-100 border border-amber-300" />
                  <span>VIP</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <div className="w-3.5 h-3.5 rounded bg-pink-100 border border-pink-300" />
                  <span>Sweetbox</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <div className="w-3.5 h-3.5 rounded bg-[#0071AF] text-[#FED100] flex items-center justify-center text-[8px] font-bold">✓</div>
                  <span>Đang chọn</span>
                </div>
              </div>
            </div>

            {/* Selected Seats summary */}
            <div className="bg-[#FFF9EA] border border-amber-200 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs">
              <div>
                <div className="text-xs text-slate-600 font-bold">Ghế đã chọn:</div>
                <div className="text-sm font-black text-[#0071AF] mt-0.5">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Vui lòng chạm chọn ghế'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">Tạm tính tiền vé:</div>
                <div className="text-base font-black text-slate-900">{seatsTotal.toLocaleString('vi-VN')}đ</div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: SELECT FOOD & DRINKS (F&B) */}
        {step === 'select_food' && (
          <div className="p-3.5 space-y-4 max-w-xl mx-auto">
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs">
              <h3 className="font-extrabold text-sm text-slate-900">Bắp Nước Ưu Đãi Đặt Trước</h3>
              <p className="text-xs text-slate-500 mt-0.5">Tiết kiệm đến 30% so với mua trực tiếp tại quầy</p>
            </div>

            <div className="space-y-3">
              {FOOD_COMBOS.map(combo => {
                const count = foodCounts[combo.id] || 0;
                return (
                  <div
                    key={combo.id}
                    className="bg-white rounded-3xl p-3.5 border border-slate-200 shadow-2xs flex items-center justify-between gap-3"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-3xl shrink-0 border border-amber-100">
                      {combo.img}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-xs text-slate-900">{combo.name}</span>
                        <span className="px-1.5 py-0.2 bg-rose-50 text-rose-600 rounded text-[9px] font-black border border-rose-200">
                          {combo.tag}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{combo.desc}</div>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="font-black text-sm text-[#0071AF]">
                          {combo.price.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="text-[11px] text-slate-400 line-through">
                          {combo.origPrice.toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-100 rounded-2xl p-1 shrink-0">
                      <button
                        onClick={() => handleUpdateFood(combo.id, -1)}
                        className="w-7 h-7 rounded-xl bg-white border border-slate-200 font-black text-slate-700 flex items-center justify-center disabled:opacity-30 cursor-pointer"
                        disabled={count <= 0}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono font-bold text-xs min-w-[20px] text-center">{count}</span>
                      <button
                        onClick={() => handleUpdateFood(combo.id, 1)}
                        className="w-7 h-7 rounded-xl bg-[#FED100] text-slate-900 font-black flex items-center justify-center cursor-pointer shadow-2xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: CHECKOUT (MoMo & ZaloPay Payment Screen) */}
        {step === 'checkout' && (
          <div className="p-3.5 space-y-4 max-w-xl mx-auto">
            {/* Ticket Order Info Card */}
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-xs text-slate-500">Thông tin vé xem phim</span>
                <span className="text-[11px] font-bold text-[#0071AF]">{selectedCinema.brand.toUpperCase()}</span>
              </div>

              <div className="flex gap-3">
                <img src={selectedMovie.poster} alt="" className="w-16 h-22 rounded-2xl object-cover shrink-0 shadow-xs" />
                <div className="flex-1">
                  <h3 className="font-black text-sm text-slate-900">{selectedMovie.title}</h3>
                  <div className="text-xs text-slate-600 mt-0.5">{selectedCinema.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Suất: <strong className="text-slate-900 font-mono">{selectedTimeSlot.time}</strong> • {selectedDate}
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
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Ưu đãi Ví MWG PayLater vé đầu:</span>
                    <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-1.5 flex justify-between font-black text-sm text-slate-900">
                  <span>Tổng thanh toán:</span>
                  <span className="text-[#0071AF] text-base">{grandTotal.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>
            </div>

            {/* Payment Methods (MoMo, ZaloPay, MWG PayLater) */}
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-2.5">
              <div className="text-xs font-bold text-slate-800">Phương thức thanh toán:</div>

              {/* Option 1: Ví MWG PayLater (0% Lãi suất) */}
              <div
                onClick={() => setPaymentMethod('paylater')}
                className={`p-3.5 rounded-2xl border-2 transition cursor-pointer flex items-center justify-between ${
                  paymentMethod === 'paylater'
                    ? 'border-[#0071AF] bg-sky-50/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#0071AF] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    MWG
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-xs text-slate-900">Ví MWG PayLater</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-rose-600 text-white">
                        0% LÃI • GIẢM 20K
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
                    ? 'border-[#A50064] bg-pink-50/40'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#A50064] text-white flex items-center justify-center font-bold text-xs">
                    MoMo
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">Ví MoMo</div>
                    <div className="text-[10px] text-slate-500">Quét mã QR MoMo thanh toán liền tay</div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'momo' ? 'border-[#A50064] bg-[#A50064]' : 'border-slate-300'
                }`}>
                  {paymentMethod === 'momo' && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
              </div>

              {/* Option 3: ZaloPay */}
              <div
                onClick={() => setPaymentMethod('zalopay')}
                className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                  paymentMethod === 'zalopay'
                    ? 'border-[#0068FF] bg-blue-50/40'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0068FF] text-white flex items-center justify-center font-bold text-xs">
                    Zalo
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">Ví ZaloPay</div>
                    <div className="text-[10px] text-slate-500">Thanh toán qua ví ZaloPay hoặc thẻ liên kết</div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'zalopay' ? 'border-[#0068FF] bg-[#0068FF]' : 'border-slate-300'
                }`}>
                  {paymentMethod === 'zalopay' && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
              </div>

              {/* Option 4: VietQR */}
              <div
                onClick={() => setPaymentMethod('vietqr')}
                className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                  paymentMethod === 'vietqr'
                    ? 'border-[#0071AF] bg-sky-50/40'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    QR
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">VietQR / Thẻ ATM Nội Địa</div>
                    <div className="text-[10px] text-slate-500">Chuyển khoản qua app ngân hàng bất kỳ</div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'vietqr' ? 'border-[#0071AF] bg-[#0071AF]' : 'border-slate-300'
                }`}>
                  {paymentMethod === 'vietqr' && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: E-TICKET (Ticket with Notches & Dashed Tear Line) */}
        {step === 'ticket' && (
          <div className="p-4 space-y-4 max-w-md mx-auto">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="font-black text-lg text-slate-900 mt-2">Đặt Vé Thành Công!</h2>
              <p className="text-xs text-slate-500">
                Vé điện tử đã lưu vào mục <strong>"Vé của tôi"</strong> trên ứng dụng
              </p>
            </div>

            {/* Electronic Ticket Card with Cutout Notches */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 relative">
              {/* Ticket Top Banner */}
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

              {/* Notches for Ticket cut */}
              <div className="relative h-6 bg-white flex items-center justify-between px-2 overflow-hidden">
                <div className="w-4 h-6 rounded-r-full bg-[#F5F7FA] -ml-2" />
                <div className="flex-1 border-b-2 border-dashed border-slate-200 mx-2" />
                <div className="w-4 h-6 rounded-l-full bg-[#F5F7FA] -mr-2" />
              </div>

              {/* Ticket Details */}
              <div className="p-4 pt-1 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Ngày chiếu</span>
                    <strong className="text-slate-800 text-xs font-mono">{selectedDate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Giờ chiếu</span>
                    <strong className="text-slate-800 text-xs font-mono">{selectedTimeSlot.time}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Phòng chiếu</span>
                    <strong className="text-slate-800 text-xs">Cinema 04 ({selectedTimeSlot.format})</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Ghế</span>
                    <strong className="text-[#0071AF] text-sm font-black">{selectedSeats.join(', ')}</strong>
                  </div>
                </div>

                {foodTotal > 0 && (
                  <div className="bg-amber-50 p-2.5 rounded-2xl text-[11px] text-amber-900 font-medium">
                    🍿 Bắp nước: {Object.entries(foodCounts).filter(([_, c]) => c > 0).map(([id, c]) => `${c}x ${FOOD_COMBOS.find(f => f.id === id)?.name}`).join(', ')}
                  </div>
                )}

                {/* QR Code section */}
                <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <div className="w-36 h-36 bg-white p-2 rounded-2xl shadow-xs border border-slate-200 flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-slate-800" />
                  </div>
                  <div className="font-mono font-bold text-xs text-slate-800 mt-2 tracking-widest">
                    TICKET-MWG-{Math.floor(100000 + Math.random() * 900000)}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 text-center">
                    Đưa mã này tại cổng soát vé hoặc máy in vé tự động
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setStep('home');
                    setNavTab('my_tickets');
                  }}
                  className="w-full py-2.5 bg-[#0071AF] text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#005E93] transition cursor-pointer shadow-xs"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Xem trong Ví vé của tôi</span>
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => alert('Đã lưu ảnh vé vào thư viện điện thoại!')}
                    className="flex-1 py-2 bg-white border border-slate-300 rounded-2xl font-bold text-xs text-slate-700 flex items-center justify-center gap-1.5 hover:bg-slate-100 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Lưu ảnh vé</span>
                  </button>
                  <button
                    onClick={() => {
                      setStep('home');
                      setNavTab('now_showing');
                    }}
                    className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <span>Đặt vé khác</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 3. STICKY BOTTOM ACTION BAR                               */}
      {/* ========================================================= */}
      {step !== 'home' && step !== 'ticket' && (
        <div className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 flex items-center justify-between gap-3 shadow-lg">
          <div>
            <div className="text-[11px] text-slate-500 font-medium">
              {step === 'select_showtime' && `${selectedMovie.title}`}
              {step === 'select_seat' && `${selectedSeats.length} ghế đã chọn`}
              {step === 'select_food' && 'Tổng tạm tính'}
              {step === 'checkout' && 'Thanh toán ngay'}
            </div>
            <div className="text-base sm:text-lg font-black text-[#0071AF]">
              {grandTotal > 0 ? `${grandTotal.toLocaleString('vi-VN')}đ` : 'Chưa chọn vé'}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {step === 'select_showtime' && (
              <button
                onClick={() => setStep('select_seat')}
                className="px-5 py-2.5 bg-[#FFDF00] hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-md transition cursor-pointer flex items-center gap-1.5"
              >
                <span>Chọn ghế</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            )}

            {step === 'select_seat' && (
              <button
                disabled={selectedSeats.length === 0}
                onClick={() => setStep('select_food')}
                className="px-5 py-2.5 bg-[#FFDF00] hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-md transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <span>Chọn bắp nước</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            )}

            {step === 'select_food' && (
              <button
                onClick={() => setStep('checkout')}
                className="px-5 py-2.5 bg-[#FFDF00] hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-md transition cursor-pointer flex items-center gap-1.5"
              >
                <span>Tiếp tục thanh toán</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            )}

            {step === 'checkout' && (
              <button
                onClick={handleCompleteOrder}
                className="px-6 py-2.5 bg-[#FFDF00] hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-md transition cursor-pointer flex items-center gap-1.5"
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
