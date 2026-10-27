import { Stay, Flight, TransportTrip, Activity, EntertainmentEvent, DestinationId } from '../types';

/* ------------------------------------------------------------------ */
/* 1. KHÁCH SẠN & RESORT ĐA DẠNG (~20 KHÁCH SẠN CHO MỖI TỈNH THÀNH)   */
/* ------------------------------------------------------------------ */

interface StayTemplate {
  name: string;
  subType: 'hotel' | 'resort' | 'homestay';
  partner: 'Traveloka' | 'Trip.com' | 'Agoda' | 'DMX Direct';
  stars: number;
  rating: number;
  reviews: number;
  price: number;
  origPrice: number;
  img: string;
  room: string;
  amenities: string[];
  tags: string[];
}

const DEST_STAY_TEMPLATES: Record<string, StayTemplate[]> = {
  phuquoc: [
    { name: 'Vinpearl Resort & Spa Phú Quốc', subType: 'resort', partner: 'Trip.com', stars: 5, rating: 4.8, reviews: 3400, price: 2450000, origPrice: 3200000, img: '/destinations/phuquoc.jpg', room: 'Deluxe King Hướng Vườn', amenities: ['Bãi biển riêng', 'Hồ bơi 5000m2', 'Xe bus miễn phí VinWonders'], tags: ['Gia đình', 'Resort 5 sao'] },
    { name: 'Premier Village Phu Quoc Resort', subType: 'resort', partner: 'Traveloka', stars: 5, rating: 4.9, reviews: 2100, price: 4200000, origPrice: 5500000, img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', room: 'Villa 2 Phòng Ngủ Có Hồ Bơi', amenities: ['Hồ bơi nhiều tầng', '2 mặt biển', 'Bếp riêng'], tags: ['Sang trọng', 'Biệt thự hồ bơi'] },
    { name: 'Regent Phu Quoc', subType: 'resort', partner: 'Trip.com', stars: 5, rating: 5.0, reviews: 1540, price: 6800000, origPrice: 8500000, img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', room: 'Ocean Pool Suite', amenities: ['Hồ bơi vô cực riêng', 'Đưa đón sân bay hạng sang', 'Quầy bar tầng thượng'], tags: ['Siêu sang', 'Top 1 Phú Quốc'] },
    { name: 'InterContinental Phu Quoc Long Beach', subType: 'resort', partner: 'Agoda', stars: 5, rating: 4.8, reviews: 2890, price: 3400000, origPrice: 4500000, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', room: 'Classic Ocean View', amenities: ['INK 360 Rooftop Bar', '4 hồ bơi lớn', 'Kid Club'], tags: ['Cặp đôi', 'Hoàng hôn bãi Trường'] },
    { name: 'Pullman Phu Quoc Beach Resort', subType: 'resort', partner: 'Traveloka', stars: 5, rating: 4.7, reviews: 1980, price: 2350000, origPrice: 3100000, img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80', room: 'Superior King Balcony', amenities: ['Bãi biển riêng', 'Hồ bơi tràn bờ', 'Phòng gym hiện đại'], tags: ['Hiện đại', 'Ưu đãi ĐMX'] },
    { name: 'Novotel Phu Quoc Resort', subType: 'resort', partner: 'DMX Direct', stars: 5, rating: 4.6, reviews: 3100, price: 1850000, origPrice: 2600000, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', room: 'Superior Hướng Vườn', amenities: ['Gần sân bay 10p', 'Sân tennis', 'Buffet sáng quốc tế'], tags: ['Tiết kiệm', 'Gia đình'] },
    { name: 'Sunset Sanato Resort & Villas', subType: 'resort', partner: 'Traveloka', stars: 4, rating: 4.5, reviews: 4200, price: 1650000, origPrice: 2200000, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', room: 'Sunset Deluxe King', amenities: ['Cổng trời check-in hoàng hôn', 'Beach Club', 'Hải sản tươi'], tags: ['Sống ảo số 1', 'Hoàng hôn'] },
    { name: 'SOL by Meliá Phu Quoc', subType: 'resort', partner: 'Trip.com', stars: 4, rating: 4.6, reviews: 2450, price: 1750000, origPrice: 2300000, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', room: 'Standard King Garden', amenities: ['Võng biển Bali', 'Hồ bơi view biển', 'Nhạc acoustic'], tags: ['Giới trẻ', 'Phong cách nhiệt đới'] },
    { name: 'Salinda Resort Phu Quoc Island', subType: 'resort', partner: 'Agoda', stars: 5, rating: 4.9, reviews: 1870, price: 3100000, origPrice: 4000000, img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80', room: 'Deluxe Hill View', amenities: ['Bữa sáng kèm rượu vang', 'Hồ bơi lọc muối điện phân', 'Vườn nhiệt đới'], tags: ['Đánh giá cao', 'Sinh thái'] },
    { name: 'Mövenpick Resort Waverly Phu Quoc', subType: 'resort', partner: 'Traveloka', stars: 5, rating: 4.7, reviews: 2600, price: 2150000, origPrice: 2900000, img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80', room: 'Superior Sea View', amenities: ['Chocolate Hour miễn phí mỗi ngày', 'Bãi biển Ông Lang', 'Hồ bơi lagun'], tags: ['Bãi Ông Lang', 'Chocolate Hour'] },
    { name: 'Radisson Blu Resort Phu Quoc', subType: 'resort', partner: 'Trip.com', stars: 5, rating: 4.7, reviews: 1950, price: 2050000, origPrice: 2800000, img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80', room: 'Deluxe Room', amenities: ['Sát biển Bãi Dài', 'Sân golf Corona Casino', 'Hồ bơi cực rộng'], tags: ['Bãi Dài', 'Gần Casino'] },
    { name: 'Seashells Phu Quoc Hotel & Spa', subType: 'hotel', partner: 'DMX Direct', stars: 5, rating: 4.7, reviews: 3600, price: 1790000, origPrice: 2400000, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', room: 'Classic City View', amenities: ['Ngay trung tâm Dương Đông', 'Đi bộ ra Chợ Đêm 5p', 'Hồ bơi vô cực'], tags: ['Sát chợ đêm', 'Tiện đi lại'] },
    { name: 'La Veranda Resort Phu Quoc - MGallery', subType: 'resort', partner: 'Agoda', stars: 5, rating: 4.9, reviews: 1420, price: 3600000, origPrice: 4800000, img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', room: 'Deluxe Garden Room', amenities: ['Kiến trúc Pháp cổ điển', 'Vườn xanh mát', 'Spa thảo dược cao cấp'], tags: ['Kiến trúc Pháp', 'Thanh lịch'] },
    { name: 'Cassia Cottage Phu Quoc', subType: 'resort', partner: 'Traveloka', stars: 4, rating: 4.8, reviews: 1100, price: 1550000, origPrice: 2100000, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', room: 'Standard Cottage', amenities: ['Không gian mộc mạc', 'Yoga buổi sáng', 'Bãi biển riêng Ba Kèo'], tags: ['Bình yên', 'Mộc mạc'] },
    { name: 'Green Bay Phu Quoc Resort & Spa', subType: 'resort', partner: 'Trip.com', stars: 4, rating: 4.8, reviews: 1350, price: 1950000, origPrice: 2700000, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', room: 'Bungalow Hướng Vườn', amenities: ['Ẩn mình giữa rừng nguyên sinh', 'Hồ bơi vô cực', 'Hoàn toàn tự nhiên'], tags: ['Thiên nhiên', 'Biệt lập'] },
    { name: 'M Resort Phu Quoc', subType: 'resort', partner: 'Traveloka', stars: 4, rating: 4.7, reviews: 920, price: 1450000, origPrice: 1950000, img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', room: 'Garden View King', amenities: ['Hồ bơi nhiệt đới', 'Nhà hàng Á Âu', 'Xe đưa đón trung tâm'], tags: ['Mới xây', 'Xinh xắn'] },
    { name: 'The Palmy Phu Quoc Resort & Spa', subType: 'resort', partner: 'DMX Direct', stars: 4, rating: 4.4, reviews: 2200, price: 1190000, origPrice: 1650000, img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80', room: 'Deluxe Sea View', amenities: ['Ban công hướng biển', 'Hồ bơi sát mép sóng', 'Buffet sáng'], tags: ['Giá cực tốt', 'View biển'] },
    { name: 'Lahana Resort Phu Quoc & Spa', subType: 'resort', partner: 'Agoda', stars: 4, rating: 4.7, reviews: 2750, price: 1380000, origPrice: 1890000, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', room: 'Deluxe Panorama View', amenities: ['Tọa lạc trên đồi view biển', 'Hồ bơi vô cực trên cao', 'Không gian xanh'], tags: ['View trên cao', 'Hồ bơi đẹp'] },
    { name: 'Anja Beach Resort & Spa', subType: 'resort', partner: 'Traveloka', stars: 4, rating: 4.5, reviews: 1600, price: 1280000, origPrice: 1750000, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', room: 'Deluxe Hướng Vườn', amenities: ['Kiến trúc nhà cổ Bắc Bộ', 'Bãi biển riêng', 'Tắm bùn khoáng'], tags: ['Độc đáo', 'Tắm bùn'] },
    { name: 'Sunset Beach Resort & Spa Phu Quoc', subType: 'hotel', partner: 'Trip.com', stars: 4, rating: 4.5, reviews: 1980, price: 1250000, origPrice: 1700000, img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80', room: 'Deluxe King', amenities: ['Sát biển Dương Đông', 'Sunset Bar sôi động', 'Hồ bơi 2 tầng'], tags: ['Sát biển', 'Âm nhạc'] }
  ],

  dalat: [
    { name: 'Khách sạn Colline Đà Lạt', subType: 'hotel', partner: 'Trip.com', stars: 4, rating: 4.8, reviews: 4800, price: 1350000, origPrice: 1850000, img: '/destinations/dalat.jpg', room: 'Deluxe King Hướng Phố', amenities: ['Sát Chợ Đêm Đà Lạt', 'Trung tâm thương mại', 'Buffet sáng phong phú'], tags: ['Sát chợ đêm', 'Top 1 Đà Lạt'] },
    { name: 'Dalat Wonder Resort', subType: 'resort', partner: 'Traveloka', stars: 4, rating: 4.6, reviews: 3900, price: 1550000, origPrice: 2200000, img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', room: 'Superior Hướng Hồ Tuyền Lâm', amenities: ['Làng Châu Âu thu nhỏ', 'Hồ bơi vô cực view hồ', 'Khu vui chơi Wonder Land'], tags: ['Hồ Tuyền Lâm', 'Châu Âu'] },
    { name: 'Ana Mandara Villas Dalat Resort & Spa', subType: 'resort', partner: 'Agoda', stars: 5, rating: 4.9, reviews: 2200, price: 2950000, origPrice: 3900000, img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', room: 'Villa Room Cổ Điển', amenities: ['Biệt thự Pháp cổ nguyên bản', 'Rừng thông bao quanh', 'Hồ bơi nước ấm'], tags: ['Quý tộc Pháp', 'Rừng thông'] },
    { name: 'Terracotta Hotel & Resort Dalat', subType: 'resort', partner: 'Trip.com', stars: 4, rating: 4.7, reviews: 4100, price: 1450000, origPrice: 2000000, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', room: 'Standard King Hướng Rừng', amenities: ['Bán đảo hồ Tuyền Lâm', 'Sân tennis', 'Khu vườn hoa ngập tràn'], tags: ['Hồ Tuyền Lâm', 'Bình yên'] },
    { name: 'Mercure Dalat Resort', subType: 'resort', partner: 'Traveloka', stars: 4, rating: 4.7, reviews: 1850, price: 1980000, origPrice: 2600000, img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80', room: 'Deluxe King Hướng Vườn', amenities: ['Lâu đài kiến trúc Pháp cổ', 'Nhà ga xe lửa cổ', 'Vườn hoa cẩm tú cầu'], tags: ['Lâu đài', 'Check-in cực đẹp'] },
    { name: 'Sam Tuyen Lam Resort', subType: 'resort', partner: 'DMX Direct', stars: 4, rating: 4.6, reviews: 1650, price: 1390000, origPrice: 1900000, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', room: 'Deluxe Garden View', amenities: ['Bán đảo biệt lập', 'Sân golf quốc tế 18 lỗ', 'Không khí trong lành'], tags: ['Nghỉ dưỡng', 'Golf'] },
    { name: 'Swiss-Belresort Tuyen Lam', subType: 'resort', partner: 'Trip.com', stars: 5, rating: 4.7, reviews: 2900, price: 1850000, origPrice: 2500000, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', room: 'Mountain View King', amenities: ['Lâu đài Thụy Sĩ giữa thung lũng', 'Hồ bơi nước ấm trong nhà', 'Sân golf'], tags: ['Thụy Sĩ thu nhỏ', 'View thung lũng'] },
    { name: 'Golf Valley Hotel Da Lat', subType: 'hotel', partner: 'Traveloka', stars: 4, rating: 4.8, reviews: 3400, price: 1480000, origPrice: 1980000, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', room: 'Superior City View', amenities: ['Gần Hồ Xuân Hương 500m', 'Phòng tập thể hình', 'Nhà hàng sang trọng'], tags: ['Trung tâm', 'Sang trọng'] },
    { name: 'TTC Hotel - Ngoc Lan', subType: 'hotel', partner: 'Agoda', stars: 4, rating: 4.6, reviews: 2600, price: 1250000, origPrice: 1700000, img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80', room: 'Deluxe Lake View', amenities: ['Ngay dốc chợ Đà Lạt', 'View trực diện Hồ Xuân Hương', 'Buffet sáng'], tags: ['View hồ', 'Tiện đi chợ'] },
    { name: 'Du Parc Hotel Dalat', subType: 'hotel', partner: 'DMX Direct', stars: 4, rating: 4.5, reviews: 1780, price: 1100000, origPrice: 1550000, img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80', room: 'Standard Heritage', amenities: ['Di sản kiến trúc từ năm 1932', 'Thang máy cổ điển', 'Cạnh Nhà thờ Con Gà'], tags: ['Cổ kính', 'Giá hợp lý'] },
    { name: 'Dalat Palace Heritage Hotel', subType: 'hotel', partner: 'Trip.com', stars: 5, rating: 4.9, reviews: 1500, price: 3800000, origPrice: 4900000, img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80', room: 'Superior Palace Room', amenities: ['Khách sạn hoàng gia số 1 Đà Lạt', 'Sân golf lâu đời nhất', 'View trọn hồ'], tags: ['Hoàng gia', 'Đẳng cấp'] },
    { name: 'Ladalat Hotel', subType: 'hotel', partner: 'Traveloka', stars: 5, rating: 4.7, reviews: 3800, price: 1450000, origPrice: 2000000, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', room: 'City View Deluxe', amenities: ['Khu vui chơi giải trí trong nhà', 'Đối diện Thung Lũng Tình Yêu', 'Hồ bơi nước ấm'], tags: ['Thung Lũng Tình Yêu', 'Gia đình'] },
    { name: 'Zen Valley Dalat', subType: 'resort', partner: 'Agoda', stars: 3, rating: 4.6, reviews: 1950, price: 920000, origPrice: 1300000, img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', room: 'Bungalow Gỗ Mộc', amenities: ['Bungalow gỗ thông tự nhiên', 'View đồi thông lãng mạn', 'Vườn hoa hồng'], tags: ['Bungalow gỗ', 'Giá rẻ'] },
    { name: 'Kings Hotel Dalat', subType: 'hotel', partner: 'DMX Direct', stars: 4, rating: 4.4, reviews: 2100, price: 980000, origPrice: 1400000, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', room: 'Superior King', amenities: ['Sát bờ Hồ Xuân Hương', 'Phòng xông hơi đá muối', 'Giá siêu mềm'], tags: ['Sát bờ hồ', 'Giá tốt'] },
    { name: 'Marigold Hotel Dalat', subType: 'hotel', partner: 'Traveloka', stars: 4, rating: 4.7, reviews: 1420, price: 1150000, origPrice: 1600000, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', room: 'Deluxe Double', amenities: ['Đường Bùi Thị Xuân sầm uất', 'Nội thất hiện đại ấm áp', 'Buffet sáng ngon'], tags: ['Hiện đại', 'Trung tâm'] },
    { name: 'Sài Gòn Đà Lạt Hotel', subType: 'hotel', partner: 'Trip.com', stars: 4, rating: 4.5, reviews: 1800, price: 1200000, origPrice: 1650000, img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', room: 'Superior Double', amenities: ['Hồ bơi nước ấm 4 mùa', 'Trung tâm đường Hoàng Văn Thụ', 'Sân tennis'], tags: ['Bền vững', 'Hồ bơi ấm'] },
    { name: 'La Sapinette Hotel Dalat', subType: 'hotel', partner: 'Traveloka', stars: 4, rating: 4.3, reviews: 1250, price: 950000, origPrice: 1350000, img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80', room: 'Deluxe Room', amenities: ['Phong cách Art Deco Pháp', 'Phòng xông hơi', 'Tầng hầm đỗ xe rộng'], tags: ['Art Deco', 'Giá mềm'] },
    { name: 'Roy Dala Hotel', subType: 'hotel', partner: 'Agoda', stars: 3, rating: 4.6, reviews: 1600, price: 780000, origPrice: 1100000, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', room: 'Superior Double', amenities: ['Cách chợ Đà Lạt 300m', 'Phòng ốc sạch sẽ tinh tươm', 'Nước nóng mạnh'], tags: ['Tiết kiệm', 'Sát chợ'] },
    { name: 'Phố Núi Hotel Dalat', subType: 'hotel', partner: 'DMX Direct', stars: 3, rating: 4.5, reviews: 1400, price: 820000, origPrice: 1150000, img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80', room: 'Standard View Hồ', amenities: ['View trọn bờ Hồ Xuân Hương', 'Thang máy tiện lợi', 'Cà phê sân thượng'], tags: ['View hồ', 'Giá hạt dẻ'] },
    { name: 'The Wilder-nest Homestay Da Lat', subType: 'homestay', partner: 'Traveloka', stars: 3, rating: 4.8, reviews: 980, price: 890000, origPrice: 1200000, img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80', room: 'Phòng Kính Săn Mây', amenities: ['Cầu gỗ giữa thung lũng', 'Săn mây tại giường', 'Tiệc BBQ ngoài trời'], tags: ['Săn mây', 'Giới trẻ mê mẩn'] }
  ],

  tayninh: [
    { name: 'Khách sạn Melia Vinpearl Tây Ninh', subType: 'hotel', partner: 'Trip.com', stars: 5, rating: 4.9, reviews: 2600, price: 1250000, origPrice: 1750000, img: '/destinations/tayninh.jpg', room: 'Deluxe King Hướng Núi Bà Đen', amenities: ['Tòa tháp cao nhất Tây Ninh 21 tầng', 'Hồ bơi bốn mùa', 'Spa Vincharm'], tags: ['5 sao duy nhất', 'View Núi Bà Đen'] },
    { name: 'Sunrise Hotel Tây Ninh', subType: 'hotel', partner: 'Traveloka', stars: 4, rating: 4.7, reviews: 1800, price: 850000, origPrice: 1200000, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', room: 'Superior Double', amenities: ['Trung tâm TP. Tây Ninh', 'Hồ bơi ngoài trời', 'Nhà hàng ẩm thực chay & mặn'], tags: ['Trung tâm', 'Sang trọng'] },
    { name: 'Khách sạn Victory Tây Ninh', subType: 'hotel', partner: 'Agoda', stars: 3, rating: 4.5, reviews: 1450, price: 550000, origPrice: 800000, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', room: 'Deluxe Room', amenities: ['Cách Tòa Thánh 1km', 'Thang máy hiện đại', 'Chỗ đỗ ô tô lớn'], tags: ['Gần Tòa Thánh', 'Giá rẻ'] },
    { name: 'Golden Central Hotel Tây Ninh', subType: 'hotel', partner: 'DMX Direct', stars: 3, rating: 4.6, reviews: 980, price: 620000, origPrice: 890000, img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', room: 'Standard King', amenities: ['Thiết kế ấm cúng', 'Buffet sáng miễn phí', 'Wifi tốc độ cao'], tags: ['Tiện nghi', 'Sạch sẽ'] },
    { name: 'Khách sạn Vườn Cau Tây Ninh', subType: 'hotel', partner: 'Traveloka', stars: 3, rating: 4.4, reviews: 1120, price: 480000, origPrice: 700000, img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80', room: 'Phòng Đôi Gia Đình', amenities: ['Khuôn viên vườn cây râm mát', 'Đặc sản bò tơ', 'Hồ câu cá giải trí'], tags: ['Sinh thái', 'Ẩm thực bò tơ'] },
    { name: 'Tama House Homestay Tây Ninh', subType: 'homestay', partner: 'Traveloka', stars: 3, rating: 4.8, reviews: 650, price: 520000, origPrice: 750000, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', room: 'Phòng Gác Mái Chill', amenities: ['Phong cách mộc mạc Nhật Bản', 'Bếp nấu tự do', 'Sân vườn nướng BBQ'], tags: ['Homestay xinh', 'Check-in'] },
    { name: 'Homestay Tầm Vông Tây Ninh', subType: 'homestay', partner: 'Agoda', stars: 3, rating: 4.7, reviews: 540, price: 450000, origPrice: 650000, img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', room: 'Bungalow Vườn', amenities: ['Gần chân Núi Bà Đen', 'Không gian yên tĩnh', 'Chủ nhà thân thiện'], tags: ['Gần Núi Bà', 'Bình yên'] },
    { name: 'Khách sạn Hoàng Mai Tây Ninh', subType: 'hotel', partner: 'Trip.com', stars: 3, rating: 4.3, reviews: 780, price: 420000, origPrice: 600000, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', room: 'Standard Twin', amenities: ['Nằm trên đại lộ 30/4', 'Nước nóng năng lượng mặt trời', 'Lễ tân 24/7'], tags: ['Giá siêu rẻ', 'Mặt tiền'] },
    { name: 'Ma Thiên Lãnh Farmstay', subType: 'homestay', partner: 'Traveloka', stars: 3, rating: 4.8, reviews: 480, price: 680000, origPrice: 950000, img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80', room: 'Lều Glamping Núi Rừng', amenities: ['Cắm trại bên suối Ma Thiên Lãnh', 'Bữa tối BBQ gà đồi', 'Đốt lửa trại'], tags: ['Glamping', 'Trải nghiệm suối'] },
    { name: 'Khách sạn Mai Vy Tây Ninh', subType: 'hotel', partner: 'DMX Direct', stars: 2, rating: 4.2, reviews: 890, price: 380000, origPrice: 550000, img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80', room: 'Phòng Đơn Tiết Kiệm', amenities: ['Sạch sẽ thoáng mát', 'Có máy lạnh & tủ lạnh', 'Gần chợ Tây Ninh'], tags: ['Bình dân', 'Tiết kiệm'] }
  ]
};

// Hàm tự động sinh thêm để đủ 20 khách sạn/resort cho từng địa danh bất kỳ
export function getStaysForDestination(destId: string): Stay[] {
  const templates = DEST_STAY_TEMPLATES[destId] || DEST_STAY_TEMPLATES['phuquoc'];
  const stays: Stay[] = [];

  // Thêm các template sẵn có
  templates.forEach((tmpl, i) => {
    stays.push({
      id: `stay_${destId}_${i + 1}`,
      category: 'stay',
      subType: tmpl.subType,
      name: tmpl.name,
      partner: tmpl.partner,
      destinationId: destId as DestinationId,
      address: `Khu du lịch & trung tâm ${destId.toUpperCase()}, Việt Nam`,
      rating: tmpl.rating,
      reviewCount: tmpl.reviews,
      stars: tmpl.stars,
      coverImage: tmpl.img,
      images: [tmpl.img],
      description: `${tmpl.name} là địa điểm nghỉ dưỡng đẳng cấp, dịch vụ chu đáo hàng đầu tại khu vực.`,
      amenities: tmpl.amenities,
      policies: {
        checkInTime: '14:00',
        checkOutTime: '12:00',
        childPolicy: 'Miễn phí cho trẻ dưới 6 tuổi đi cùng bố mẹ.',
        extraBedFee: 400000,
        cancellationSummary: 'Miễn phí hủy trước 48h.'
      },
      rooms: [
        {
          id: `room_${destId}_${i}_1`,
          name: tmpl.room,
          description: 'Không gian sang trọng, đầy đủ tiện nghi tiêu chuẩn quốc tế.',
          bedType: '1 Giường King lớn hoặc 2 Giường đơn',
          maxAdults: 2,
          maxChildren: 2,
          areaM2: 36 + (i % 4) * 6,
          pricePerNight: tmpl.price,
          originalPrice: tmpl.origPrice,
          includesBreakfast: true,
          freeCancellationBeforeDays: 2,
          availableRooms: 8,
          images: [tmpl.img],
          amenities: tmpl.amenities
        }
      ],
      tags: tmpl.tags,
      campaignIds: ['camp_vip10']
    });
  });

  // Nếu chưa đủ 20, tự động sinh tiếp theo phong cách khách sạn / homestay địa phương
  while (stays.length < 20) {
    const idx = stays.length + 1;
    const isResort = idx % 3 === 0;
    const stars = isResort ? 4 : 3;
    const price = 650000 + (idx * 60000);
    const name = isResort ? `Boutique Eco Resort ${destId.toUpperCase()} No.${idx}` : `Khách sạn Sao Mai & Spa ${destId.toUpperCase()} (${idx})`;

    stays.push({
      id: `stay_${destId}_${idx}`,
      category: 'stay',
      subType: isResort ? 'resort' : 'hotel',
      name,
      partner: idx % 2 === 0 ? 'Traveloka' : 'Trip.com',
      destinationId: destId as DestinationId,
      address: `Tuyến đường du lịch trọng điểm, ${destId.toUpperCase()}, Việt Nam`,
      rating: +(4.2 + (idx % 8) * 0.1).toFixed(1),
      reviewCount: 450 + idx * 85,
      stars,
      coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'],
      description: 'Phòng ốc rộng rãi, dịch vụ tận tâm, giá ưu đãi đặc quyền hội viên Quà Tặng VIP & MWG PayLater.',
      amenities: ['Buffet sáng', 'Thang máy', 'Wifi tốc độ cao', 'Dịch vụ tour lễ tân'],
      policies: {
        checkInTime: '14:00',
        checkOutTime: '12:00',
        childPolicy: 'Trẻ em miễn phí ăn sáng cùng bố mẹ.',
        extraBedFee: 300000,
        cancellationSummary: 'Miễn phí hủy trước 24h.'
      },
      rooms: [
        {
          id: `room_${destId}_${idx}_1`,
          name: 'Deluxe King Hướng Phố',
          description: 'Cửa sổ thoáng mát, giường đệm êm ái cao cấp.',
          bedType: '1 Giường King',
          maxAdults: 2,
          maxChildren: 1,
          areaM2: 32,
          pricePerNight: price,
          originalPrice: Math.round(price * 1.3),
          includesBreakfast: true,
          freeCancellationBeforeDays: 1,
          availableRooms: 6,
          images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'],
          amenities: ['Wifi', 'Điều hòa 2 chiều', 'Nước suối miễn phí']
        }
      ],
      tags: ['Giá tốt', 'Trung tâm'],
      campaignIds: ['camp_vip10']
    });
  }

  return stays;
}

/* ------------------------------------------------------------------ */
/* 2. CHUYẾN BAY VỚI LOGO CHÍNH THỨC SẮC NÉT                           */
/* ------------------------------------------------------------------ */

export const AIRLINE_LOGOS: Record<string, string> = {
  'Vietnam Airlines': '/logos/vietnam-airlines.svg',
  'Vietjet Air': '/logos/vietjet-air.svg',
  'Bamboo Airways': '/logos/bamboo-airways.svg',
  'Vietravel Airlines': '/logos/vietravel-airlines.svg'
};

export const MASSIVE_FLIGHTS: Flight[] = [
  // TP.HCM -> Phú Quốc
  {
    id: 'fl_sgn_pqc_vna_1',
    category: 'flight',
    flightNumber: 'VN-1823',
    airline: 'Vietnam Airlines',
    airlineLogoText: '/logos/vietnam-airlines.svg',
    fromCity: 'TP. Hồ Chí Minh',
    fromCode: 'SGN',
    toCity: 'Phú Quốc',
    toCode: 'PQC',
    departureTime: '07:15',
    arrivalTime: '08:20',
    duration: '1h 05m',
    date: '2026-11-15',
    cabinClass: 'Phổ thông',
    pricePerAdult: 1150000,
    pricePerChild: 920000,
    pricePerInfant: 150000,
    baggageAllowance: { carryOnKg: 12, checkedKg: 23 },
    availableSeats: 9,
    partner: 'Trip.com',
    campaignIds: ['camp_vip10']
  },
  {
    id: 'fl_sgn_pqc_vj_1',
    category: 'flight',
    flightNumber: 'VJ-321',
    airline: 'Vietjet Air',
    airlineLogoText: '/logos/vietjet-air.svg',
    fromCity: 'TP. Hồ Chí Minh',
    fromCode: 'SGN',
    toCity: 'Phú Quốc',
    toCode: 'PQC',
    departureTime: '08:45',
    arrivalTime: '09:45',
    duration: '1h 00m',
    date: '2026-11-15',
    cabinClass: 'Phổ thông',
    pricePerAdult: 790000,
    pricePerChild: 650000,
    pricePerInfant: 100000,
    baggageAllowance: { carryOnKg: 7, checkedKg: 0 },
    availableSeats: 15,
    partner: 'Traveloka',
    campaignIds: ['camp_vip10']
  },
  {
    id: 'fl_sgn_pqc_qh_1',
    category: 'flight',
    flightNumber: 'QH-1524',
    airline: 'Bamboo Airways',
    airlineLogoText: '/logos/bamboo-airways.svg',
    fromCity: 'TP. Hồ Chí Minh',
    fromCode: 'SGN',
    toCity: 'Phú Quốc',
    toCode: 'PQC',
    departureTime: '10:30',
    arrivalTime: '11:35',
    duration: '1h 05m',
    date: '2026-11-15',
    cabinClass: 'Phổ thông',
    pricePerAdult: 950000,
    pricePerChild: 780000,
    pricePerInfant: 120000,
    baggageAllowance: { carryOnKg: 7, checkedKg: 20 },
    availableSeats: 12,
    partner: 'Trip.com',
    campaignIds: ['camp_vip10']
  },
  {
    id: 'fl_sgn_pqc_vu_1',
    category: 'flight',
    flightNumber: 'VU-672',
    airline: 'Vietravel Airlines',
    airlineLogoText: '/logos/vietravel-airlines.svg',
    fromCity: 'TP. Hồ Chí Minh',
    fromCode: 'SGN',
    toCity: 'Phú Quốc',
    toCode: 'PQC',
    departureTime: '13:10',
    arrivalTime: '14:15',
    duration: '1h 05m',
    date: '2026-11-15',
    cabinClass: 'Phổ thông',
    pricePerAdult: 720000,
    pricePerChild: 590000,
    pricePerInfant: 100000,
    baggageAllowance: { carryOnKg: 7, checkedKg: 0 },
    availableSeats: 18,
    partner: 'Traveloka',
    campaignIds: ['camp_vip10']
  },

  // Hà Nội -> Đà Nẵng
  {
    id: 'fl_han_dad_vna_1',
    category: 'flight',
    flightNumber: 'VN-165',
    airline: 'Vietnam Airlines',
    airlineLogoText: '/logos/vietnam-airlines.svg',
    fromCity: 'Hà Nội',
    fromCode: 'HAN',
    toCity: 'Đà Nẵng',
    toCode: 'DAD',
    departureTime: '06:30',
    arrivalTime: '07:50',
    duration: '1h 20m',
    date: '2026-11-15',
    cabinClass: 'Phổ thông',
    pricePerAdult: 1350000,
    pricePerChild: 1080000,
    pricePerInfant: 180000,
    baggageAllowance: { carryOnKg: 12, checkedKg: 23 },
    availableSeats: 8,
    partner: 'Trip.com',
    campaignIds: ['camp_vip10']
  },
  {
    id: 'fl_han_dad_vj_1',
    category: 'flight',
    flightNumber: 'VJ-511',
    airline: 'Vietjet Air',
    airlineLogoText: '/logos/vietjet-air.svg',
    fromCity: 'Hà Nội',
    fromCode: 'HAN',
    toCity: 'Đà Nẵng',
    toCode: 'DAD',
    departureTime: '09:00',
    arrivalTime: '10:20',
    duration: '1h 20m',
    date: '2026-11-15',
    cabinClass: 'Phổ thông',
    pricePerAdult: 890000,
    pricePerChild: 720000,
    pricePerInfant: 100000,
    baggageAllowance: { carryOnKg: 7, checkedKg: 0 },
    availableSeats: 22,
    partner: 'Traveloka',
    campaignIds: ['camp_vip10']
  },
  {
    id: 'fl_han_dad_qh_1',
    category: 'flight',
    flightNumber: 'QH-103',
    airline: 'Bamboo Airways',
    airlineLogoText: '/logos/bamboo-airways.svg',
    fromCity: 'Hà Nội',
    fromCode: 'HAN',
    toCity: 'Đà Nẵng',
    toCode: 'DAD',
    departureTime: '11:15',
    arrivalTime: '12:35',
    duration: '1h 20m',
    date: '2026-11-15',
    cabinClass: 'Phổ thông',
    pricePerAdult: 1050000,
    pricePerChild: 840000,
    pricePerInfant: 140000,
    baggageAllowance: { carryOnKg: 7, checkedKg: 20 },
    availableSeats: 14,
    partner: 'Trip.com',
    campaignIds: ['camp_vip10']
  },

  // TP.HCM -> Đà Nẵng
  {
    id: 'fl_sgn_dad_vna_1',
    category: 'flight',
    flightNumber: 'VN-128',
    airline: 'Vietnam Airlines',
    airlineLogoText: '/logos/vietnam-airlines.svg',
    fromCity: 'TP. Hồ Chí Minh',
    fromCode: 'SGN',
    toCity: 'Đà Nẵng',
    toCode: 'DAD',
    departureTime: '07:00',
    arrivalTime: '08:25',
    duration: '1h 25m',
    date: '2026-11-15',
    cabinClass: 'Phổ thông',
    pricePerAdult: 1250000,
    pricePerChild: 990000,
    pricePerInfant: 160000,
    baggageAllowance: { carryOnKg: 12, checkedKg: 23 },
    availableSeats: 11,
    partner: 'Trip.com',
    campaignIds: ['camp_vip10']
  },
  {
    id: 'fl_sgn_dad_vj_1',
    category: 'flight',
    flightNumber: 'VJ-628',
    airline: 'Vietjet Air',
    airlineLogoText: '/logos/vietjet-air.svg',
    fromCity: 'TP. Hồ Chí Minh',
    fromCode: 'SGN',
    toCity: 'Đà Nẵng',
    toCode: 'DAD',
    departureTime: '12:40',
    arrivalTime: '14:05',
    duration: '1h 25m',
    date: '2026-11-15',
    cabinClass: 'Phổ thông',
    pricePerAdult: 820000,
    pricePerChild: 680000,
    pricePerInfant: 100000,
    baggageAllowance: { carryOnKg: 7, checkedKg: 0 },
    availableSeats: 19,
    partner: 'Traveloka',
    campaignIds: ['camp_vip10']
  },

  // TP.HCM -> Nha Trang
  {
    id: 'fl_sgn_cxr_vna_1',
    category: 'flight',
    flightNumber: 'VN-1344',
    airline: 'Vietnam Airlines',
    airlineLogoText: '/logos/vietnam-airlines.svg',
    fromCity: 'TP. Hồ Chí Minh',
    fromCode: 'SGN',
    toCity: 'Nha Trang',
    toCode: 'CXR',
    departureTime: '06:40',
    arrivalTime: '07:45',
    duration: '1h 05m',
    date: '2026-11-15',
    cabinClass: 'Phổ thông',
    pricePerAdult: 1080000,
    pricePerChild: 860000,
    pricePerInfant: 140000,
    baggageAllowance: { carryOnKg: 12, checkedKg: 23 },
    availableSeats: 15,
    partner: 'Trip.com',
    campaignIds: ['camp_vip10']
  },
  {
    id: 'fl_sgn_cxr_vj_1',
    category: 'flight',
    flightNumber: 'VJ-772',
    airline: 'Vietjet Air',
    airlineLogoText: '/logos/vietjet-air.svg',
    fromCity: 'TP. Hồ Chí Minh',
    fromCode: 'SGN',
    toCity: 'Nha Trang',
    toCode: 'CXR',
    departureTime: '14:20',
    arrivalTime: '15:25',
    duration: '1h 05m',
    date: '2026-11-15',
    cabinClass: 'Phổ thông',
    pricePerAdult: 690000,
    pricePerChild: 550000,
    pricePerInfant: 100000,
    baggageAllowance: { carryOnKg: 7, checkedKg: 0 },
    availableSeats: 20,
    partner: 'Traveloka',
    campaignIds: ['camp_vip10']
  }
];

/* ------------------------------------------------------------------ */
/* 3. NHÀ XE & TÀU HỎA ĐA DẠNG                                        */
/* ------------------------------------------------------------------ */

export const MASSIVE_TRANSPORTS: TransportTrip[] = [
  // TP.HCM -> Tây Ninh
  {
    id: 'trans_sgn_tayninh_futa_1',
    category: 'bus_train',
    type: 'bus',
    operator: 'Phương Trang (FUTA)',
    trainOrBusNumber: 'FUTA-TN01',
    fromStation: 'Bến xe Miền Tây',
    toStation: 'Bến xe Tây Ninh',
    fromCity: 'TP. Hồ Chí Minh (BX Miền Tây)',
    toCity: 'Tây Ninh (Bến xe Tây Ninh)',
    departureTime: '06:00',
    arrivalTime: '08:30',
    duration: '2h 30m',
    date: '2026-11-15',
    seatClass: 'Ghế ngồi ngả',
    pricePerTicket: 110000,
    availableSeats: 18,
    pickupPoints: ['Bến xe Miền Tây', 'Cây xăng An Sương'],
    dropoffPoints: ['Bến xe Tây Ninh', 'Cửa số 1 Tòa Thánh'],
    partner: 'Vexere',
    seatLayout: { totalSeats: 28, rows: 7, cols: 4, decks: 1, occupiedSeatNumbers: ['A1', 'A2', 'B3'] },
    campaignIds: ['camp_vip10']
  },
  {
    id: 'trans_sgn_tayninh_limo_1',
    category: 'bus_train',
    type: 'bus',
    operator: 'Hoa Mai VIP',
    trainOrBusNumber: 'HOAMAI-TN02',
    fromStation: 'Văn phòng Trung tâm Q1',
    toStation: 'Khu du lịch Sun World Núi Bà Đen',
    fromCity: 'TP. Hồ Chí Minh (Đón tận nơi)',
    toCity: 'Tây Ninh (Núi Bà Đen)',
    departureTime: '07:30',
    arrivalTime: '09:45',
    duration: '2h 15m',
    date: '2026-11-15',
    seatClass: 'Limousine 9 chỗ',
    pricePerTicket: 180000,
    availableSeats: 7,
    pickupPoints: ['Quận 1, 3, 10, Tân Bình'],
    dropoffPoints: ['Khu du lịch Sun World Núi Bà Đen'],
    partner: 'Vexere',
    seatLayout: { totalSeats: 9, rows: 3, cols: 3, decks: 1, occupiedSeatNumbers: ['A1', 'B2'] },
    campaignIds: ['camp_vip10']
  },

  // TP.HCM -> Đà Lạt
  {
    id: 'trans_sgn_dalat_futa_vip',
    category: 'bus_train',
    type: 'bus',
    operator: 'Phương Trang (FUTA)',
    trainOrBusNumber: 'FUTA-DL99',
    fromStation: 'Bến xe Miền Đông mới',
    toStation: 'Bến xe Liên tỉnh Đà Lạt',
    fromCity: 'TP. Hồ Chí Minh (BX Miền Đông Mới)',
    toCity: 'Đà Lạt (BX Liên tỉnh)',
    departureTime: '23:00',
    arrivalTime: '06:00',
    duration: '7h 00m',
    date: '2026-11-15',
    seatClass: 'Giường nằm 34 phòng',
    pricePerTicket: 310000,
    availableSeats: 14,
    pickupPoints: ['Bến xe Miền Đông mới', 'Hàng Xanh', 'Suối Tiên'],
    dropoffPoints: ['Bến xe Liên tỉnh Đà Lạt', 'Trung chuyển tận nơi nội thành'],
    partner: 'Vexere',
    seatLayout: { totalSeats: 34, rows: 6, cols: 3, decks: 2, occupiedSeatNumbers: ['A1', 'A3', 'B2'] },
    campaignIds: ['camp_vip10']
  },
  {
    id: 'trans_sgn_dalat_thanhbuoi',
    category: 'bus_train',
    type: 'bus',
    operator: 'Thành Bưởi',
    trainOrBusNumber: 'TB-DL88',
    fromStation: 'Lê Hồng Phong Q5',
    toStation: 'Văn phòng Phan Bội Châu',
    fromCity: 'TP. Hồ Chí Minh (Lê Hồng Phong Q5)',
    toCity: 'Đà Lạt (Phan Bội Châu)',
    departureTime: '23:30',
    arrivalTime: '06:15',
    duration: '6h 45m',
    date: '2026-11-15',
    seatClass: 'Giường nằm 34 phòng',
    pricePerTicket: 360000,
    availableSeats: 9,
    pickupPoints: ['Trụ sở Lê Hồng Phong Q5', 'Hàng Xanh'],
    dropoffPoints: ['Văn phòng Phan Bội Châu sát chợ Đà Lạt'],
    partner: 'Vexere',
    seatLayout: { totalSeats: 34, rows: 6, cols: 3, decks: 2, occupiedSeatNumbers: ['A1', 'A2', 'C1'] },
    campaignIds: ['camp_vip10']
  },

  // TP.HCM -> Vũng Tàu
  {
    id: 'trans_sgn_vungtau_hoamai',
    category: 'bus_train',
    type: 'bus',
    operator: 'Hoa Mai VIP',
    trainOrBusNumber: 'HM-VT01',
    fromStation: 'Sân bay Tân Sơn Nhất',
    toStation: 'Văn phòng Bãi Sau Vũng Tàu',
    fromCity: 'TP. Hồ Chí Minh (Sân bay Tân Sơn Nhất / Q1)',
    toCity: 'Vũng Tàu (Đón trả tận nơi)',
    departureTime: '08:00',
    arrivalTime: '10:00',
    duration: '2h 00m',
    date: '2026-11-15',
    seatClass: 'Limousine 9 chỗ',
    pricePerTicket: 190000,
    availableSeats: 6,
    pickupPoints: ['Sân bay Tân Sơn Nhất', 'Nguyễn Thái Bình Q1'],
    dropoffPoints: ['Bãi Trước', 'Bãi Sau', 'Resort Vũng Tàu'],
    partner: 'Vexere',
    seatLayout: { totalSeats: 9, rows: 3, cols: 3, decks: 1, occupiedSeatNumbers: ['A1', 'A3'] },
    campaignIds: ['camp_vip10']
  }
];

/* ------------------------------------------------------------------ */
/* 4. CONCERTS & VÉ SỰ KIỆN NỔI BẬT                                    */
/* ------------------------------------------------------------------ */

export const MASSIVE_EVENTS: EntertainmentEvent[] = [
  {
    id: 'ev_anh_trai_say_hi_concert',
    category: 'event',
    title: 'Concert "Anh Trai Say Hi" 2026 - Đêm Nhạc Hội Bùng Nổ',
    venue: 'Sân vận động Quốc gia Mỹ Đình, Hà Nội',
    destinationId: 'hanoi',
    dateTime: '19:30 • 28/11/2026',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    partner: 'Ticketbox',
    description: 'Đêm concert bùng nổ quy tụ những màn trình diễn đỉnh cao từ show truyền hình âm nhạc đình đám nhất năm.',
    tiers: [
      { id: 'tier_hi_svip', tierName: 'Vé SVIP (Fanzone Sát Sân Khấu)', price: 2500000, benefits: ['Check-in cổng riêng', 'Gói quà lưu niệm độc quyền'], availableCount: 20, status: 'available' },
      { id: 'tier_hi_vip', tierName: 'Vé VIP Khán Đài A', price: 1800000, benefits: ['Ghế ngồi trung tâm trực diện', 'Áo thun kỷ niệm concert'], availableCount: 50, status: 'available' },
      { id: 'tier_hi_ga', tierName: 'Vé Standard GA (Khán Đài B)', price: 950000, benefits: ['Khán đài tầm nhìn bao quát', 'Lightstick cổ vũ'], availableCount: 120, status: 'available' }
    ],
    transferRules: 'Vé điện tử có mã QR soát vé tự động.',
    ageRestriction: 'Dành cho khán giả từ 12 tuổi.',
    status: 'open_for_sale',
    campaignIds: ['camp_vip10']
  },
  {
    id: 'ev_anh_trai_vuot_ngan_chong_gai',
    category: 'event',
    title: 'Live Concert "Anh Trai Vượt Ngàn Chông Gai"',
    venue: 'Công viên bờ sông Sài Gòn, TP. Thủ Đức, TP.HCM',
    destinationId: 'hcm',
    dateTime: '19:00 • 14/12/2026',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    partner: 'Momo',
    description: 'Đêm đại nhạc hội tri ân khán giả với các bản hòa âm phối khí xúc động và mãn nhãn.',
    tiers: [
      { id: 'tier_gai_vip', tierName: 'Vé Gai Con Premium VIP', price: 2800000, benefits: ['Vị trí VIP sát sàn diễn Runway', 'Vòng tay phát sáng cao cấp'], availableCount: 15, status: 'available' },
      { id: 'tier_gai_std', tierName: 'Vé Standard Ngồi', price: 1400000, benefits: ['Khu vực ghế ngồi khán đài trung tâm'], availableCount: 40, status: 'available' },
      { id: 'tier_gai_ga', tierName: 'Vé Đứng Khám Phá', price: 800000, benefits: ['Tự do hòa mình vào không khí cuồng nhiệt'], availableCount: 80, status: 'available' }
    ],
    transferRules: 'Vé điện tử QR code gửi qua app Quà Tặng VIP.',
    ageRestriction: 'Dành cho mọi lứa tuổi.',
    status: 'open_for_sale',
    campaignIds: ['camp_vip10']
  },
  {
    id: 'ev_dalat_music_night',
    category: 'event',
    title: 'Mây Lang Thang Concert - Đêm Nhạc Dưới Mưa Sương',
    venue: 'Thung Lũng Mây, Phường 11, TP. Đà Lạt',
    destinationId: 'dalat',
    dateTime: '17:00 • 20/11/2026',
    coverImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
    partner: 'Ticketbox',
    description: 'Thưởng thức âm nhạc acoustic lãng mạn giữa không khí se lạnh và hoàng hôn mộng mơ của Đà Lạt.',
    tiers: [
      { id: 'tier_may_vip', tierName: 'Khu VIP Hàng 1 (Kèm Rượu Vang & Tiệc Nhẹ)', price: 1200000, benefits: ['Hàng ghế đầu view hoàng hôn', 'Ly rượu vang Đà Lạt + bánh ngọt'], availableCount: 25, status: 'available' },
      { id: 'tier_may_std', tierName: 'Khu Khán Giả Tiêu Chuẩn', price: 650000, benefits: ['Ghế ngồi bậc thang ngắm trọn thung lũng'], availableCount: 60, status: 'available' }
    ],
    transferRules: 'Không hoàn vé sau khi xuất mã thành công.',
    ageRestriction: 'Dành cho mọi lứa tuổi.',
    status: 'open_for_sale',
    campaignIds: ['camp_vip10']
  }
];
