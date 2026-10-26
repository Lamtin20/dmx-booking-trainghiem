// Danh mục điểm đến toàn quốc (63 tỉnh thành & các danh thắng nổi tiếng Việt Nam)
export interface NationwideDestination {
  id: string;
  name: string;
  aliases: string[];
  region: 'Miền Bắc' | 'Miền Trung' | 'Miền Nam' | 'Tây Nguyên' | 'Miền Tây';
  resortName: string;
  resortImage: string;
  roomName: string;
  amenitiesHighlight: string;
  packageTitle: string;
  highlights: string[];
  baseStayPerNight: number;      // Giá phòng 1 đêm tham khảo
  baseDailyActivityPerPax: number;// Giá ăn uống vui chơi 1 ngày/khách
  baseTransportPerPax: number;   // Giá vé bay/xe khứ hồi/khách
  popularRanking?: number;       // Thứ hạng nổi bật (1-6)
}

export const NATIONWIDE_DESTINATIONS: NationwideDestination[] = [
  // --- TOP ĐIỂM ĐẾN NỔI BẬT NHẤT TOÀN QUỐC (Show ở giao diện gợi ý ban đầu) ---
  {
    id: 'phuquoc',
    name: 'Phú Quốc',
    aliases: ['phú quốc', 'phu quoc', 'đảo ngọc', 'bãi dài', 'gành dầu', 'dương đông'],
    region: 'Miền Nam',
    resortName: 'Vinpearl Resort & Spa Phú Quốc',
    resortImage: '/destinations/phuquoc.jpg',
    roomName: 'Deluxe King',
    amenitiesHighlight: 'Biển riêng, hồ bơi Kid Club',
    packageTitle: 'Nghỉ dưỡng & khám phá',
    highlights: ['Grand World', 'VinWonders & Safari', 'Cáp treo Hòn Thơm', 'Tour 4 đảo'],
    baseStayPerNight: 2450000,
    baseDailyActivityPerPax: 800000,
    baseTransportPerPax: 2300000,
    popularRanking: 1
  },
  {
    id: 'dalat',
    name: 'Đà Lạt',
    aliases: ['đà lạt', 'da lat', 'dalat', 'lâm đồng', 'thành phố ngàn hoa', 'hồ xuân hương'],
    region: 'Tây Nguyên',
    resortName: 'Khách sạn Colline Đà Lạt',
    resortImage: '/destinations/dalat.jpg',
    roomName: 'Deluxe King Hướng Phố',
    amenitiesHighlight: 'Sát Chợ Đêm, view hồ Xuân Hương',
    packageTitle: 'Vi vu phố hoa & săn mây',
    highlights: ['Chợ Đêm Đà Lạt', 'Đồi Chè Cầu Đất', 'Thung lũng Tình Yêu', 'Hồ Tuyền Lâm'],
    baseStayPerNight: 1350000,
    baseDailyActivityPerPax: 500000,
    baseTransportPerPax: 650000,
    popularRanking: 2
  },
  {
    id: 'danang',
    name: 'Đà Nẵng',
    aliases: ['đà nẵng', 'da nang', 'danang', 'bà nà', 'mỹ khê', 'cầu rồng'],
    region: 'Miền Trung',
    resortName: 'Furama Resort Đà Nẵng',
    resortImage: '/destinations/danang.jpg',
    roomName: 'Deluxe Ocean View',
    amenitiesHighlight: 'Hồ bơi vô cực, bãi biển Mỹ Khê',
    packageTitle: 'Khám phá thành phố đáng sống',
    highlights: ['Cầu Vàng Bà Nà Hills', 'Biển Mỹ Khê', 'Bán đảo Sơn Trà', 'Cầu Rồng'],
    baseStayPerNight: 2200000,
    baseDailyActivityPerPax: 700000,
    baseTransportPerPax: 1900000,
    popularRanking: 3
  },
  {
    id: 'nhatrang',
    name: 'Nha Trang',
    aliases: ['nha trang', 'nhatrang', 'khánh hòa', 'hòn mun', 'vịnh nha trang'],
    region: 'Miền Trung',
    resortName: 'Vinpearl Resort Nha Trang',
    resortImage: '/destinations/nhatrang.jpg',
    roomName: 'Deluxe Hướng Biển',
    amenitiesHighlight: 'Cáp treo vượt biển, công viên nước',
    packageTitle: 'Nghỉ dưỡng biển xanh & vịnh ngọc',
    highlights: ['VinWonders Nha Trang', 'Lặn ngắm san hô Hòn Mun', 'Tháp Bà Ponagar'],
    baseStayPerNight: 2100000,
    baseDailyActivityPerPax: 650000,
    baseTransportPerPax: 1200000,
    popularRanking: 4
  },
  {
    id: 'sapa',
    name: 'Sa Pa',
    aliases: ['sa pa', 'sapa', 'lào cai', 'fansipan', 'bản cát cát'],
    region: 'Miền Bắc',
    resortName: 'Silk Path Grand Resort & Spa Sa Pa',
    resortImage: '/destinations/sapa.jpg',
    roomName: 'Classic Garden View',
    amenitiesHighlight: 'Hồ bơi nước nóng view mây núi',
    packageTitle: 'Chạm đỉnh Fansipan & săn mây',
    highlights: ['Cáp treo Fansipan', 'Bản Cát Cát', 'Đèo Ô Quy Hồ', 'Thung lũng Mường Hoa'],
    baseStayPerNight: 1800000,
    baseDailyActivityPerPax: 600000,
    baseTransportPerPax: 850000,
    popularRanking: 5
  },
  {
    id: 'vungtau',
    name: 'Vũng Tàu',
    aliases: ['vũng tàu', 'vung tau', 'vungtau', 'bà rịa', 'bãi sau', 'hồ tràm'],
    region: 'Miền Nam',
    resortName: 'Marina Bay Vung Tau Resort & Spa',
    resortImage: '/destinations/vungtau.jpg',
    roomName: 'Deluxe Ocean View',
    amenitiesHighlight: 'Hồ bơi vô cực ngắm hoàng hôn bãi biển',
    packageTitle: 'Nghỉ dưỡng biển cuối tuần',
    highlights: ['Tượng Chúa Kito', 'Ngọn Hải Đăng', 'Bãi Sau', 'Hồ Tràm Safari'],
    baseStayPerNight: 1600000,
    baseDailyActivityPerPax: 500000,
    baseTransportPerPax: 400000,
    popularRanking: 6
  },

  // --- CÁC ĐỊA DANH DU LỊCH ĐẶC SẮC TRÊN TOÀN QUỐC ---
  {
    id: 'tayninh',
    name: 'Tây Ninh',
    aliases: ['tây ninh', 'tay ninh', 'núi bà đen', 'chùa bà', 'tòa thánh', 'ma thiên lãnh', 'trảng bàng'],
    region: 'Miền Nam',
    resortName: 'Khách sạn Melia Vinpearl Tây Ninh',
    resortImage: '/destinations/tayninh.jpg',
    roomName: 'Deluxe King Hướng Núi',
    amenitiesHighlight: 'Hồ bơi tầng cao view Núi Bà Đen',
    packageTitle: 'Hành hương & Chinh phục Nóc nhà Nam Bộ',
    highlights: ['Cáp treo Sun World Núi Bà Đen', 'Tượng Phật Bà Tây Bổ Đà Sơn', 'Tòa Thánh Tây Ninh', 'Bánh tráng phơi sương'],
    baseStayPerNight: 1200000,
    baseDailyActivityPerPax: 450000,
    baseTransportPerPax: 300000
  },
  {
    id: 'ninhbinh',
    name: 'Ninh Bình',
    aliases: ['ninh bình', 'ninh binh', 'tràng an', 'bái đính', 'tam cốc', 'hang múa', 'hoa lư'],
    region: 'Miền Bắc',
    resortName: 'Emeralda Resort Ninh Bình',
    resortImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    roomName: 'Superior Hướng Vườn Sinh Thái',
    amenitiesHighlight: 'Không gian làng quê Bắc Bộ, spa thảo dược',
    packageTitle: 'Tuyệt tác di sản Tràng An & non nước',
    highlights: ['Quần thể danh thắng Tràng An', 'Chùa Bái Đính', 'Đỉnh Hang Múa', 'Tam Cốc Bích Động'],
    baseStayPerNight: 1750000,
    baseDailyActivityPerPax: 550000,
    baseTransportPerPax: 750000
  },
  {
    id: 'quynhon',
    name: 'Quy Nhơn',
    aliases: ['quy nhơn', 'quy nhon', 'bình định', 'kỳ co', 'eo gió', 'ghềnh ráng'],
    region: 'Miền Trung',
    resortName: 'FLC Luxury Resort Quy Nhơn',
    resortImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    roomName: 'Studio Suite Hướng Biển',
    amenitiesHighlight: 'Sân golf quốc tế, hồ bơi riêng view Kỳ Co',
    packageTitle: 'Khám phá thiên đường biển đảo Kỳ Co - Eo Gió',
    highlights: ['Kỳ Co', 'Eo Gió', 'Ghềnh Ráng Tiên Sa', 'Tháp Bánh Ít'],
    baseStayPerNight: 1900000,
    baseDailyActivityPerPax: 600000,
    baseTransportPerPax: 1500000
  },
  {
    id: 'muine',
    name: 'Phan Thiết - Mũi Né',
    aliases: ['phan thiết', 'phan thiet', 'mũi né', 'mui ne', 'bình thuận', 'bàu trắng', 'đồi cát bay'],
    region: 'Miền Nam',
    resortName: 'Centara Mirage Resort Mũi Né',
    resortImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
    roomName: 'Deluxe Premier View Biển',
    amenitiesHighlight: 'Công viên nước chủ đề Địa Trung Hải, bãi biển riêng',
    packageTitle: 'Nghỉ dưỡng đồi cát & sóng biển',
    highlights: ['Đồi Cát Bay', 'Bàu Trắng', 'Suối Tiên', 'Làng chài Mũi Né'],
    baseStayPerNight: 1650000,
    baseDailyActivityPerPax: 500000,
    baseTransportPerPax: 450000
  },
  {
    id: 'phuyen',
    name: 'Phú Yên',
    aliases: ['phú yên', 'phu yen', 'tuy hòa', 'gành đá đĩa', 'bãi xép', 'mũi điện'],
    region: 'Miền Trung',
    resortName: 'Sala Tuy Hoa Beach Hotel',
    resortImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    roomName: 'Deluxe Sea View',
    amenitiesHighlight: 'Sát bờ biển Tuy Hòa, hồ bơi ngoài trời',
    packageTitle: 'Xứ hoa vàng trên cỏ xanh',
    highlights: ['Gành Đá Đĩa', 'Bãi Xép', 'Hải đăng Mũi Điện đón bình minh', 'Tháp Nhạn'],
    baseStayPerNight: 1300000,
    baseDailyActivityPerPax: 480000,
    baseTransportPerPax: 1400000
  },
  {
    id: 'hagiang',
    name: 'Hà Giang',
    aliases: ['hà giang', 'ha giang', 'đồng văn', 'mã pí lèng', 'sông nho quế', 'lũng cú'],
    region: 'Miền Bắc',
    resortName: 'Papiu Resort Hà Giang',
    resortImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    roomName: 'Bungalow Mây Núi',
    amenitiesHighlight: 'View toàn cảnh đèo Mã Pí Lèng & ruộng bậc thang',
    packageTitle: 'Chinh phục Đệ nhất hùng quan Mã Pí Lèng',
    highlights: ['Đèo Mã Pí Lèng', 'Du thuyền Sông Nho Quế', 'Cột cờ Lũng Cú', 'Phố cổ Đồng Văn'],
    baseStayPerNight: 1500000,
    baseDailyActivityPerPax: 500000,
    baseTransportPerPax: 950000
  },
  {
    id: 'condao',
    name: 'Côn Đảo',
    aliases: ['côn đảo', 'con dao', 'côn sơn', 'hàng dương', 'đầm trầu'],
    region: 'Miền Nam',
    resortName: 'The Secret Côn Đảo Resort',
    resortImage: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
    roomName: 'Deluxe King Sea View',
    amenitiesHighlight: 'Hồ bơi vô cực view biển Côn Đảo, cạnh di tích lịch sử',
    packageTitle: 'Tâm linh & Nghỉ dưỡng biển hoang sơ',
    highlights: ['Nghĩa trang Hàng Dương', 'Bãi Đầm Trầu', 'Hòn Bảy Cạnh xem rùa đẻ trứng'],
    baseStayPerNight: 2300000,
    baseDailyActivityPerPax: 750000,
    baseTransportPerPax: 2800000
  },
  {
    id: 'mocchau',
    name: 'Mộc Châu',
    aliases: ['mộc châu', 'moc chau', 'sơn la', 'rừng thông bản áng', 'đồi chè trái tim'],
    region: 'Miền Bắc',
    resortName: 'Mộc Châu Island Mountain Resort',
    resortImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    roomName: 'Glamping Deluxe View Rừng',
    amenitiesHighlight: 'Trải nghiệm cầu kính Bạch Long dài nhất thế giới',
    packageTitle: 'Vi vu đồi chè & cao nguyên sương mai',
    highlights: ['Cầu kính Bạch Long', 'Rừng thông Bản Áng', 'Thác Dải Yếm', 'Đồi chè Trái Tim'],
    baseStayPerNight: 1250000,
    baseDailyActivityPerPax: 450000,
    baseTransportPerPax: 650000
  },
  {
    id: 'caobang',
    name: 'Cao Bằng',
    aliases: ['cao bằng', 'cao bang', 'thác bản giốc', 'ngườm ngao', 'pác bó'],
    region: 'Miền Bắc',
    resortName: 'Sài Gòn - Bản Giốc Resort',
    resortImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    roomName: 'Superior Hướng Thác',
    amenitiesHighlight: 'Sát chân thác Bản Giốc hùng vĩ',
    packageTitle: 'Chiêm ngưỡng thác nước tự nhiên đẹp nhất Việt Nam',
    highlights: ['Thác Bản Giốc', 'Động Ngườm Ngao', 'Khu di tích Pác Bó', 'Hồ Thang Hen'],
    baseStayPerNight: 1100000,
    baseDailyActivityPerPax: 420000,
    baseTransportPerPax: 800000
  },
  {
    id: 'buonmathuot',
    name: 'Buôn Ma Thuột - Đắk Lắk',
    aliases: ['buôn ma thuột', 'buon ma thuot', 'đắk lắk', 'dak lak', 'hồ lắk', 'dray nur', 'bản đôn'],
    region: 'Tây Nguyên',
    resortName: 'Mường Thanh Luxury Buôn Ma Thuột',
    resortImage: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80',
    roomName: 'Deluxe King',
    amenitiesHighlight: 'Trung tâm thủ phủ cà phê, hồ bơi & spa 5 sao',
    packageTitle: 'Đại ngàn Tây Nguyên & thủ phủ cà phê',
    highlights: ['Bảo tàng Thế giới Cà phê', 'Thác Dray Nur', 'Hồ Lắk chèo thuyền độc mộc', 'Buôn Đôn'],
    baseStayPerNight: 1200000,
    baseDailyActivityPerPax: 450000,
    baseTransportPerPax: 1300000
  },
  {
    id: 'angiang',
    name: 'An Giang - Châu Đốc',
    aliases: ['an giang', 'châu đốc', 'chau doc', 'miếu bà chúa xứ', 'rừng tràm trà sư', 'thất sơn'],
    region: 'Miền Tây',
    resortName: 'Victoria Châu Đốc Hotel',
    resortImage: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80',
    roomName: 'Deluxe River View',
    amenitiesHighlight: 'Kiến trúc Pháp cổ điển bên ngã ba sông Hậu',
    packageTitle: 'Hành hương Miếu Bà & Rừng tràm Trà Sư',
    highlights: ['Miếu Bà Chúa Xứ Núi Sam', 'Rừng tràm Trà Sư', 'Làng Chăm Châu Phong', 'Chợ Châu Đốc'],
    baseStayPerNight: 1400000,
    baseDailyActivityPerPax: 450000,
    baseTransportPerPax: 400000
  },
  {
    id: 'halong',
    name: 'Hạ Long',
    aliases: ['hạ long', 'ha long', 'quảng ninh', 'bãi cháy', 'tuần châu', 'vịnh hạ long'],
    region: 'Miền Bắc',
    resortName: 'Vinpearl Resort & Spa Hạ Long',
    resortImage: '/destinations/halong.jpg',
    roomName: 'Deluxe King Hướng Biển',
    amenitiesHighlight: 'Biệt lập trên đảo Rều, view trọn Vịnh Hạ Long',
    packageTitle: 'Du ngoạn kỳ quan thiên nhiên thế giới',
    highlights: ['Du thuyền Vịnh Hạ Long', 'Hang Sửng Sốt & Đảo Ti Tốp', 'Sun World Bãi Cháy'],
    baseStayPerNight: 2300000,
    baseDailyActivityPerPax: 750000,
    baseTransportPerPax: 900000
  },
  {
    id: 'hoian',
    name: 'Hội An',
    aliases: ['hội an', 'hoi an', 'quảng nam', 'phố cổ', 'chùa cầu', 'rừng dừa bảy mẫu'],
    region: 'Miền Trung',
    resortName: 'Anantara Hoi An Resort',
    resortImage: '/destinations/hoian.jpg',
    roomName: 'Deluxe Balcony Suite',
    amenitiesHighlight: 'Sát bờ sông Thu Bồn, cách phố cổ 500m',
    packageTitle: 'Phố cổ đèn lồng & di sản văn hóa',
    highlights: ['Phố Cổ Hội An', 'Show Ký Ức Hội An', 'Rừng dừa Bảy Mẫu', 'Biển An Bàng'],
    baseStayPerNight: 2100000,
    baseDailyActivityPerPax: 600000,
    baseTransportPerPax: 1900000
  },
  {
    id: 'hue',
    name: 'Huế',
    aliases: ['huế', 'hue', 'thừa thiên', 'đại nội', 'sông hương', 'chùa thiên mụ'],
    region: 'Miền Trung',
    resortName: 'Silk Path Grand Hue Hotel',
    resortImage: '/destinations/hue.jpg',
    roomName: 'Classic King Cung Đình',
    amenitiesHighlight: 'Kiến trúc Cung đình quý phái, hồ bơi ngoài trời',
    packageTitle: 'Cố đô thơ mộng & di sản triều Nguyễn',
    highlights: ['Đại Nội Huế', 'Lăng Khải Định', 'Chùa Thiên Mụ', 'Ca Huế trên Sông Hương'],
    baseStayPerNight: 1550000,
    baseDailyActivityPerPax: 500000,
    baseTransportPerPax: 1800000
  },
  {
    id: 'cantho',
    name: 'Cần Thơ',
    aliases: ['cần thơ', 'can tho', 'chợ nổi', 'cái răng', 'ninh kiều', 'miệt vườn'],
    region: 'Miền Tây',
    resortName: 'Azerai Cần Thơ Resort',
    resortImage: '/destinations/cantho.jpg',
    roomName: 'Garden Room Sang Trọng',
    amenitiesHighlight: 'Ốc đảo Cồn Ấu biệt lập sông Hậu, đẳng cấp quốc tế',
    packageTitle: 'Miệt vườn sông nước & Chợ nổi Cái Răng',
    highlights: ['Chợ nổi Cái Răng', 'Bến Ninh Kiều', 'Nhà cổ Bình Thủy', 'Vườn trái cây Cồn Sơn'],
    baseStayPerNight: 1650000,
    baseDailyActivityPerPax: 480000,
    baseTransportPerPax: 350000
  },
  {
    id: 'hanoi',
    name: 'Hà Nội',
    aliases: ['hà nội', 'ha noi', 'thủ đô', 'hồ gươm', 'phố cổ', 'ba đình'],
    region: 'Miền Bắc',
    resortName: 'Khách sạn Melia Hà Nội',
    resortImage: '/destinations/hanoi.jpg',
    roomName: 'Deluxe City View',
    amenitiesHighlight: 'Ngay trung tâm Hoàn Kiếm, dịch vụ 5 sao quốc tế',
    packageTitle: 'Nghìn năm văn hiến & 36 phố phường',
    highlights: ['Hồ Hoàn Kiếm', 'Văn Miếu Quốc Tử Giám', 'Lăng Bác', 'Phố ẩm thực Tống Duy Tân'],
    baseStayPerNight: 2100000,
    baseDailyActivityPerPax: 650000,
    baseTransportPerPax: 1900000
  },
  {
    id: 'hcm',
    name: 'TP. Hồ Chí Minh',
    aliases: ['sài gòn', 'sai gon', 'tp.hcm', 'tphcm', 'hồ chí minh', 'bến thành', 'nguyễn huệ'],
    region: 'Miền Nam',
    resortName: 'The Myst Đồng Khởi Sài Gòn',
    resortImage: '/destinations/hcm.jpg',
    roomName: 'Dong Khoi Room',
    amenitiesHighlight: 'Hồ bơi vô cực tầng thượng ngắm sông Sài Gòn',
    packageTitle: 'Đô thị năng động & ẩm thực bất tận',
    highlights: ['Phố đi bộ Nguyễn Huệ', 'Chợ Bến Thành', 'Dinh Độc Lập', 'Landmark 81'],
    baseStayPerNight: 2200000,
    baseDailyActivityPerPax: 650000,
    baseTransportPerPax: 300000
  }
];

// Danh sách tất cả 63 tỉnh thành Việt Nam để nhận diện 100% địa điểm
export const ALL_63_PROVINCES = [
  'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu', 'Bắc Ninh',
  'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước', 'Bình Thuận', 'Cà Mau',
  'Cần Thơ', 'Cao Bằng', 'Đà Nẵng', 'Đắk Lắk', 'Đắk Nông', 'Điện Biên',
  'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Giang', 'Hà Nam', 'Hà Nội',
  'Hà Tĩnh', 'Hải Dương', 'Hải Phòng', 'Hậu Giang', 'Hòa Bình', 'Hưng Yên',
  'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu', 'Lâm Đồng', 'Lạng Sơn',
  'Lào Cai', 'Long An', 'Nam Định', 'Nghệ An', 'Ninh Bình', 'Ninh Thuận',
  'Phú Thọ', 'Phú Yên', 'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh',
  'Quảng Trị', 'Sóc Trăng', 'Sơn La', 'Tây Ninh', 'Thái Bình', 'Thái Nguyên',
  'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang', 'TP. Hồ Chí Minh', 'Trà Vinh',
  'Tuyên Quang', 'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái'
];

/**
 * Tìm kiếm điểm đến toàn quốc (trả về null nếu không có địa danh)
 */
export function findNationwideDestination(query: string): NationwideDestination | null {
  const raw = query.toLowerCase().trim();

  // 1. So khớp trực tiếp với danh sách điểm đến chuyên sâu
  for (const dest of NATIONWIDE_DESTINATIONS) {
    if (dest.aliases.some(alias => raw.includes(alias))) {
      return dest;
    }
  }

  // 2. So khớp với 63 tỉnh thành Việt Nam
  for (const prov of ALL_63_PROVINCES) {
    const provLower = prov.toLowerCase();
    if (raw.includes(provLower) || provLower.split(' - ').some(p => raw.includes(p.trim()))) {
      return {
        id: `dest_${provLower.replace(/[^a-z0-9]/g, '_')}`,
        name: prov,
        aliases: [provLower],
        region: prov.includes('Nam') ? 'Miền Nam' : prov.includes('Bắc') ? 'Miền Bắc' : 'Miền Trung',
        resortName: `Khách sạn Mường Thanh / Vinpearl ${prov}`,
        resortImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
        roomName: 'Deluxe King View Đẹp',
        amenitiesHighlight: 'Gần trung tâm, buffet sáng, tiện nghi 4-5 sao',
        packageTitle: `Khám phá & trải nghiệm ${prov}`,
        highlights: [`Danh thắng tiêu biểu ${prov}`, 'Ẩm thực địa phương', 'Mua sắm đặc sản'],
        baseStayPerNight: 1200000,
        baseDailyActivityPerPax: 500000,
        baseTransportPerPax: 600000
      };
    }
  }

  // 3. Fallback bóc tách nếu có động từ du lịch (Ví dụ: "Đi Măng Đen", "Đi Trà Vinh", "Tới Cù Lao Chàm"...)
  const match = query.match(/(?:đi|tới|đến|ở|du lịch|phượt|tham quan)\s+([A-Za-zÀ-ỹ0-9\s]{2,20})/i);
  if (match) {
    let extractedName = match[1].trim();
    // Bỏ các từ như '2 ngày', '3 người' nếu bị dính
    extractedName = extractedName.replace(/\d+\s*(ngày|ngay|người|nguoi).*/i, '').trim();
    if (extractedName.length >= 2) {
      extractedName = extractedName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      return {
        id: `dest_${Date.now()}`,
        name: extractedName,
        aliases: [extractedName.toLowerCase()],
        region: 'Miền Trung',
        resortName: `Khách sạn cao cấp tại ${extractedName}`,
        resortImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
        roomName: 'Deluxe King',
        amenitiesHighlight: 'View thoáng đãng, buffet sáng, dịch vụ chu đáo',
        packageTitle: `Nghỉ dưỡng & Khám phá ${extractedName}`,
        highlights: [`Tham quan danh thắng nổi tiếng tại ${extractedName}`, 'Trải nghiệm ẩm thực truyền thống'],
        baseStayPerNight: 1200000,
        baseDailyActivityPerPax: 450000,
        baseTransportPerPax: 600000
      };
    }
  }

  return null;
}

/**
 * Tìm hoặc lấy điểm đến mặc định (Phú Quốc) nếu không khớp
 */
export function resolveNationwideDestination(query: string): NationwideDestination {
  const found = findNationwideDestination(query);
  if (found) return found;

  return NATIONWIDE_DESTINATIONS[0];
}
