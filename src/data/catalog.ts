import { Stay, Flight, TransportTrip, Activity, EntertainmentEvent } from '../types';

// ==========================================
// 1. LƯU TRÚ (HOTELS, RESORTS, HOMESTAYS)
// ==========================================
export const STAYS: Stay[] = [
  // Đà Lạt
  {
    id: 'stay_dalat_colline',
    category: 'stay',
    subType: 'hotel',
    name: 'Hôtel Colline Đà Lạt',
    partner: 'Traveloka',
    destinationId: 'dalat',
    address: '10 Phan Bội Châu, Phường 2, TP. Đà Lạt (Ngay Chợ Đêm)',
    rating: 4.8,
    reviewCount: 1420,
    stars: 4,
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Khách sạn phong cách châu Âu hiện đại bậc nhất ngay trung tâm chợ Đà Lạt, thuận tiện đi bộ dạo phố ẩm thực.',
    amenities: ['Thang máy', 'Buffet sáng miễn phí', 'Bãi đỗ xe', 'Phòng Gym', 'Wifi tốc độ cao', 'Nhà hàng sang trọng'],
    policies: {
      checkInTime: '14:00',
      checkOutTime: '12:00',
      childPolicy: 'Trẻ em dưới 6 tuổi miễn phí tiền phòng khi ngủ chung giường bố mẹ.',
      extraBedFee: 350000,
      cancellationSummary: 'Miễn phí hủy phòng trước 3 ngày nhận phòng.'
    },
    rooms: [
      {
        id: 'room_colline_deluxe',
        name: 'Deluxe King Phố Sương',
        description: 'Phòng giường đôi lớn nhìn ra phố sương, ban công thoáng đãng.',
        bedType: '1 Giường King (1m8 x 2m)',
        maxAdults: 2,
        maxChildren: 1,
        areaM2: 32,
        pricePerNight: 1450000,
        originalPrice: 1750000,
        includesBreakfast: true,
        freeCancellationBeforeDays: 3,
        availableRooms: 5,
        images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'],
        amenities: ['Điều hòa 2 chiều', 'Smart TV 55 inch', 'Bồn tắm nằm', 'Minibar']
      },
      {
        id: 'room_colline_family',
        name: 'Executive Family 2 Giường Lớn',
        description: 'Không gian lý tưởng cho gia đình 2 người lớn và 2 trẻ em.',
        bedType: '2 Giường Queen (1m6 x 2m)',
        maxAdults: 2,
        maxChildren: 2,
        areaM2: 45,
        pricePerNight: 2250000,
        originalPrice: 2600000,
        includesBreakfast: true,
        freeCancellationBeforeDays: 3,
        availableRooms: 3,
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
        amenities: ['2 Giường Queen', 'Ban công rộng', 'Khu vực tiếp khách', 'Máy pha trà cà phê']
      }
    ],
    tags: ['Gần chợ đêm', 'Thang máy', 'Gia đình', 'Ăn sáng ngon'],
    campaignIds: ['camp_vip10', 'camp_family200'],
    isFeatured: true
  },
  {
    id: 'stay_dalat_terracotta',
    category: 'stay',
    subType: 'resort',
    name: 'Terracotta Hotel & Resort Đà Lạt',
    partner: 'Trip.com',
    destinationId: 'dalat',
    address: 'Phân khu chức năng 7.9, Hồ Tuyền Lâm, TP. Đà Lạt',
    rating: 4.7,
    reviewCount: 980,
    stars: 4,
    coverImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'],
    description: 'Nằm bên bờ hồ Tuyền Lâm thơ mộng giữa rừng thông xanh ngát, không gian nghỉ dưỡng tĩnh lặng.',
    amenities: ['Hồ bơi nước ấm trong nhà', 'Xe điện nội khu', 'Sân tennis', 'Khu vui chơi trẻ em', 'Thang máy'],
    policies: {
      checkInTime: '14:00',
      checkOutTime: '12:00',
      childPolicy: 'Trẻ dưới 5 tuổi miễn phí; 6-11 tuổi phụ thu ăn sáng 180.000đ/ngày.',
      extraBedFee: 400000,
      cancellationSummary: 'Miễn phí hủy trước 5 ngày.'
    },
    rooms: [
      {
        id: 'room_terracotta_superior',
        name: 'Superior Twin Hướng Vườn Thông',
        description: 'Không khí trong lành, view đồi thông xanh.',
        bedType: '2 Giường Đơn (1m2 x 2m)',
        maxAdults: 2,
        maxChildren: 1,
        areaM2: 32,
        pricePerNight: 1250000,
        originalPrice: 1500000,
        includesBreakfast: true,
        freeCancellationBeforeDays: 5,
        availableRooms: 6,
        images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'],
        amenities: ['View thông', 'Két an toàn', 'Wifi', 'Bàn làm việc']
      },
      {
        id: 'room_terracotta_villa',
        name: 'Villa Rừng Thông 2 Phòng Ngủ',
        description: 'Biệt thự riêng tư cho nhóm bạn hoặc gia đình lớn.',
        bedType: '1 King + 2 Đơn',
        maxAdults: 4,
        maxChildren: 2,
        areaM2: 90,
        pricePerNight: 3600000,
        originalPrice: 4200000,
        includesBreakfast: true,
        freeCancellationBeforeDays: 7,
        availableRooms: 2,
        images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'],
        amenities: ['Phòng khách riêng', 'Bếp phụ', 'Sân vườn', 'Bồn tắm sục']
      }
    ],
    tags: ['View hồ Tuyền Lâm', 'Yên tĩnh', 'Rừng thông'],
    campaignIds: ['camp_vip10', 'camp_family200']
  },
  {
    id: 'stay_dalat_lacasa',
    category: 'stay',
    subType: 'homestay',
    name: 'La Casa Homestay Đà Lạt',
    partner: 'DMX Direct',
    destinationId: 'dalat',
    address: '54 Thủ Khoa Huân, Phường 1, TP. Đà Lạt',
    rating: 4.6,
    reviewCount: 310,
    stars: 3,
    coverImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'],
    description: 'Homestay phong cách mộc ấm cúng, chủ nhà thân thiện, góc chill cà phê ngắm hoàng hôn.',
    amenities: ['Sân nướng BBQ', 'Bếp dùng chung', 'Cho thuê xe máy', 'Wifi miễn phí'],
    policies: {
      checkInTime: '13:00',
      checkOutTime: '11:30',
      childPolicy: 'Nhận trẻ em mọi độ tuổi.',
      extraBedFee: 150000,
      cancellationSummary: 'Hủy trước 48 giờ hoàn 100% tiền cọc demo.'
    },
    rooms: [
      {
        id: 'room_lacasa_cozy',
        name: 'Phòng Gác Mái Ấm Áp',
        description: 'Trần gỗ mộc, cửa sổ kính ngắm đồi.',
        bedType: '1 Giường Queen (1m6)',
        maxAdults: 2,
        maxChildren: 1,
        areaM2: 24,
        pricePerNight: 650000,
        originalPrice: 800000,
        includesBreakfast: false,
        freeCancellationBeforeDays: 2,
        availableRooms: 4,
        images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'],
        amenities: ['Máy sấy tóc', 'Nước nóng năng lượng', 'Bàn trà']
      }
    ],
    tags: ['Tiết kiệm', 'Chill', 'Gần trung tâm'],
    campaignIds: ['camp_vip10']
  },

  // Đà Nẵng
  {
    id: 'stay_danang_novotel',
    category: 'stay',
    subType: 'hotel',
    name: 'Novotel Danang Premier Han River',
    partner: 'Traveloka',
    destinationId: 'danang',
    address: '36 Bạch Đằng, Quận Hải Châu, TP. Đà Nẵng',
    rating: 4.9,
    reviewCount: 2150,
    stars: 5,
    coverImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'],
    description: 'Biểu tượng đẳng cấp bên bờ sông Hàn thơ mộng, ngắm trọn vẹn cầu Rồng và cầu quay sông Hàn.',
    amenities: ['Hồ bơi vô cực ngắm sông Hàn', 'Bar tầng thượng The Balcony', 'Spa & Massage', 'Thang máy', 'Buffet sáng quốc tế'],
    policies: {
      checkInTime: '14:00',
      checkOutTime: '12:00',
      childPolicy: 'Trẻ dưới 12 tuổi ngủ chung giường với phụ huynh không tính phí.',
      extraBedFee: 650000,
      cancellationSummary: 'Miễn phí hủy trước 48h.'
    },
    rooms: [
      {
        id: 'room_novotel_superior_river',
        name: 'Superior King Hướng Sông Hàn',
        description: 'Phòng sang trọng với kính panorama nhìn ra sông Hàn lộng gió.',
        bedType: '1 Giường King',
        maxAdults: 2,
        maxChildren: 1,
        areaM2: 35,
        pricePerNight: 2150000,
        originalPrice: 2600000,
        includesBreakfast: true,
        freeCancellationBeforeDays: 2,
        availableRooms: 7,
        images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'],
        amenities: ['View sông Hàn', 'Bồn tắm', 'Nespresso Coffee', 'Wifi']
      },
      {
        id: 'room_novotel_suite',
        name: 'Corner Suite Ban Công Panorama',
        description: 'Góc nhìn 270 độ ngắm trọn cầu Rồng phun lửa cuối tuần.',
        bedType: '1 Giường King lớn',
        maxAdults: 2,
        maxChildren: 2,
        areaM2: 60,
        pricePerNight: 3800000,
        originalPrice: 4500000,
        includesBreakfast: true,
        freeCancellationBeforeDays: 3,
        availableRooms: 2,
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
        amenities: ['Executive Lounge', 'Rượu vang chào mừng', 'Dịch vụ quản gia']
      }
    ],
    tags: ['View sông Hàn', 'Hồ bơi vô cực', 'Sang trọng 5 sao'],
    campaignIds: ['camp_vip10', 'camp_family200', 'camp_member_tier'],
    isFeatured: true
  },
  {
    id: 'stay_danang_sala',
    category: 'stay',
    subType: 'hotel',
    name: 'Sala Danang Beach Hotel',
    partner: 'Trip.com',
    destinationId: 'danang',
    address: '36 Lâm Hoành, Phường Phước Mỹ, Quận Sơn Trà, TP. Đà Nẵng',
    rating: 4.8,
    reviewCount: 1650,
    stars: 4,
    coverImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80'],
    description: 'Cách bãi biển Mỹ Khê chỉ 80m đi bộ, hồ bơi vô cực tầng 25 view biển ngút ngàn.',
    amenities: ['Hồ bơi sân thượng tầng 25', 'Cách biển 80m', 'Buffet sáng hải sản', 'Thang máy'],
    policies: {
      checkInTime: '14:00',
      checkOutTime: '12:00',
      childPolicy: 'Miễn phí cho 1 trẻ dưới 6 tuổi.',
      extraBedFee: 350000,
      cancellationSummary: 'Miễn phí hủy phòng trước 3 ngày.'
    },
    rooms: [
      {
        id: 'room_sala_deluxe_sea',
        name: 'Deluxe Hướng Trực Diện Biển',
        description: 'Đón bình minh rạng rỡ ngay trên giường ngủ.',
        bedType: '1 King hoặc 2 Giường Đơn',
        maxAdults: 2,
        maxChildren: 1,
        areaM2: 30,
        pricePerNight: 1150000,
        originalPrice: 1450000,
        includesBreakfast: true,
        freeCancellationBeforeDays: 3,
        availableRooms: 8,
        images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80'],
        amenities: ['View biển', 'Smart TV', 'Bàn trà']
      }
    ],
    tags: ['Gần biển Mỹ Khê', 'Hồ bơi vô cực', 'Giá tốt'],
    campaignIds: ['camp_vip10', 'camp_family200']
  },

  // Hội An
  {
    id: 'stay_hoian_la_siesta',
    category: 'stay',
    subType: 'resort',
    name: 'La Siesta Hoi An Resort & Spa',
    partner: 'Traveloka',
    destinationId: 'hoian',
    address: '132 Hùng Vương, Phường Thanh Hà, TP. Hội An',
    rating: 4.9,
    reviewCount: 1890,
    stars: 5,
    coverImage: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=800&q=80'],
    description: 'Resort boutique truyền thống kết hợp dịch vụ 5 sao, bao quanh bởi đồng lúa và hồ bơi sinh thái.',
    amenities: ['4 Hồ bơi sinh thái', 'Xe đạp miễn phí vào phố cổ', 'Spa thảo mộc', 'Thang máy'],
    policies: {
      checkInTime: '14:00',
      checkOutTime: '12:00',
      childPolicy: 'Miễn phí 1 trẻ dưới 6 tuổi, có nôi trẻ em theo yêu cầu.',
      extraBedFee: 500000,
      cancellationSummary: 'Miễn phí hủy trước 4 ngày.'
    },
    rooms: [
      {
        id: 'room_lasiesta_veranda',
        name: 'Deluxe Veranda Nhìn Ra Hồ Bơi',
        description: 'Hiên ngắm cảnh phong cách Đông Dương lãng mạn.',
        bedType: '1 Giường King lớn',
        maxAdults: 2,
        maxChildren: 1,
        areaM2: 38,
        pricePerNight: 1950000,
        originalPrice: 2400000,
        includesBreakfast: true,
        freeCancellationBeforeDays: 4,
        availableRooms: 4,
        images: ['https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=800&q=80'],
        amenities: ['Hiên ban công', 'Bồn tắm đứng & nằm', 'Trái cây chào đón']
      }
    ],
    tags: ['Yên tĩnh', 'Cặp đôi', 'Phong cách Indochine'],
    campaignIds: ['camp_vip10', 'camp_family200']
  },

  // Phú Quốc
  {
    id: 'stay_pqc_vinpearl_wonder',
    category: 'stay',
    subType: 'resort',
    name: 'Vinpearl Resort & Spa Phú Quốc',
    partner: 'Trip.com',
    destinationId: 'phuquoc',
    address: 'Bãi Dài, Gành Dầu, TP. Phú Quốc',
    rating: 4.8,
    reviewCount: 3200,
    stars: 5,
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'],
    description: 'Khu nghỉ dưỡng 5 sao ôm trọn bờ biển Bãi Dài, cạnh VinWonders và Safari, đưa đón sân bay miễn phí.',
    amenities: ['Xe bus miễn phí sân bay & Grand World', 'Bãi biển riêng', 'Hồ bơi gần 5000m2', 'Khu vui chơi trẻ em Kid Club'],
    policies: {
      checkInTime: '14:00',
      checkOutTime: '12:00',
      childPolicy: 'Trẻ em dưới 4 tuổi miễn phí ăn sáng và vui chơi cùng bố mẹ.',
      extraBedFee: 700000,
      cancellationSummary: 'Miễn phí hủy trước 7 ngày.'
    },
    rooms: [
      {
        id: 'room_vinpearl_deluxe_garden',
        name: 'Deluxe King Hướng Vườn Sinh Thái',
        description: 'Ban công thoáng đãng, nôi em bé miễn phí khi đăng ký trước.',
        bedType: '1 Giường King hoặc 2 Đơn',
        maxAdults: 2,
        maxChildren: 2,
        areaM2: 42,
        pricePerNight: 2450000,
        originalPrice: 3100000,
        includesBreakfast: true,
        freeCancellationBeforeDays: 7,
        availableRooms: 10,
        images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'],
        amenities: ['Bồn tắm đá cẩm thạch', 'Wifi', 'Dịch vụ dọn phòng 2 lần/ngày']
      }
    ],
    tags: ['Gia đình & Bé', 'Bãi biển riêng', 'VinWonders'],
    campaignIds: ['camp_vip10', 'camp_family200']
  },

  // Nha Trang
  {
    id: 'stay_nhatrang_intercon',
    category: 'stay',
    subType: 'hotel',
    name: 'InterContinental Nha Trang',
    partner: 'Traveloka',
    destinationId: 'nhatrang',
    address: '32-34 Trần Phú, Lộc Thọ, TP. Nha Trang',
    rating: 4.9,
    reviewCount: 2400,
    stars: 5,
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'],
    description: 'Tọa lạc trên cung đường Trần Phú đắt giá nhất Nha Trang, trải nghiệm nghỉ dưỡng tiêu chuẩn quốc tế.',
    amenities: ['Hồ bơi ngoài trời nhìn thẳng vịnh Nha Trang', 'Thang máy tốc độ cao', 'Trung tâm thể dục', '3 Nhà hàng cao cấp'],
    policies: {
      checkInTime: '15:00',
      checkOutTime: '12:00',
      childPolicy: 'Trẻ em dưới 12 tuổi ở chung miễn phí.',
      extraBedFee: 800000,
      cancellationSummary: 'Miễn phí hủy phòng trước 3 ngày.'
    },
    rooms: [
      {
        id: 'room_intercon_classic_ocean',
        name: 'Classic Ocean View King',
        description: 'Góc nhìn trọn vịnh Nha Trang xanh ngọc bích.',
        bedType: '1 Giường King lớn',
        maxAdults: 2,
        maxChildren: 1,
        areaM2: 39,
        pricePerNight: 2850000,
        originalPrice: 3500000,
        includesBreakfast: true,
        freeCancellationBeforeDays: 3,
        availableRooms: 5,
        images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'],
        amenities: ['View vịnh biển', 'Loa Bluetooth Bose', 'Bồn tắm sang trọng']
      }
    ],
    tags: ['Đường Trần Phú', 'View biển 100%', '5 sao quốc tế'],
    campaignIds: ['camp_vip10', 'camp_family200']
  },

  // Hà Nội
  {
    id: 'stay_hanoi_silk_path',
    category: 'stay',
    subType: 'hotel',
    name: 'Silk Path Boutique Hanoi (Gần Hồ Gươm)',
    partner: 'Trip.com',
    destinationId: 'hanoi',
    address: '21 Hàng Khay, Quận Hoàn Kiếm, Hà Nội',
    rating: 4.8,
    reviewCount: 1100,
    stars: 4,
    coverImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80'],
    description: 'Ngay mặt tiền phố đi bộ Hồ Gươm, bước vài bước là chạm tới Tháp Rùa và trung tâm phố cổ.',
    amenities: ['Thang máy', 'Buffet sáng phở Hà Nội', 'Dịch vụ văn phòng & phòng họp', 'Wifi tốc độ cao'],
    policies: {
      checkInTime: '14:00',
      checkOutTime: '12:00',
      childPolicy: 'Phù hợp khách công tác và gia đình.',
      extraBedFee: 400000,
      cancellationSummary: 'Miễn phí hủy trước 48h.'
    },
    rooms: [
      {
        id: 'room_silk_deluxe_lake',
        name: 'Deluxe King Hướng Hồ Gươm',
        description: 'Cửa sổ ngắm trọn vẹn bờ hồ Hoàn Kiếm xanh mát.',
        bedType: '1 Giường King',
        maxAdults: 2,
        maxChildren: 0,
        areaM2: 28,
        pricePerNight: 1650000,
        originalPrice: 2000000,
        includesBreakfast: true,
        freeCancellationBeforeDays: 2,
        availableRooms: 4,
        images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80'],
        amenities: ['Bàn làm việc doanh nhân', 'Két an toàn', 'Cà phê nguyên chất']
      }
    ],
    tags: ['Phố đi bộ', 'Công tác', 'Gần Hồ Gươm'],
    campaignIds: ['camp_vip10', 'camp_member_tier']
  },

  // TP.HCM
  {
    id: 'stay_hcm_silverland',
    category: 'stay',
    subType: 'hotel',
    name: 'Silverland Yen Hotel Sài Gòn',
    partner: 'Traveloka',
    destinationId: 'hcm',
    address: '73 Thủ Khoa Huân, Phường Bến Thành, Quận 1, TP.HCM',
    rating: 4.8,
    reviewCount: 1540,
    stars: 4,
    coverImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80'],
    description: 'Nằm cạnh công viên Tao Đàn và chợ Bến Thành, sở hữu hồ bơi kính jacuzzi trên tầng thượng.',
    amenities: ['Hồ jacuzzi trên sân thượng', 'Trà chiều miễn phí mỗi ngày', 'Thang máy', 'Buffet sáng đa dạng'],
    policies: {
      checkInTime: '14:00',
      checkOutTime: '12:00',
      childPolicy: 'Miễn phí 1 trẻ dưới 6 tuổi.',
      extraBedFee: 450000,
      cancellationSummary: 'Miễn phí hủy trước 48h.'
    },
    rooms: [
      {
        id: 'room_silverland_premier',
        name: 'Premier King Thư Giãn',
        description: 'Nội thất gỗ sồi ấm áp, bồn tắm thư giãn.',
        bedType: '1 Giường King',
        maxAdults: 2,
        maxChildren: 1,
        areaM2: 30,
        pricePerNight: 1850000,
        originalPrice: 2200000,
        includesBreakfast: true,
        freeCancellationBeforeDays: 2,
        availableRooms: 6,
        images: ['https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80'],
        amenities: ['Smart TV', 'Bồn tắm', 'Trà chiều free']
      }
    ],
    tags: ['Trung tâm Quận 1', 'Hồ Jacuzzi', 'Trà chiều'],
    campaignIds: ['camp_vip10', 'camp_member_tier']
  },

  // Vũng Tàu
  {
    id: 'stay_vungtau_marina',
    category: 'stay',
    subType: 'hotel',
    name: 'Marina Bay Vung Tau Resort & Spa',
    partner: 'Trip.com',
    destinationId: 'vungtau',
    address: '115 Trần Phú, Phường 5, TP. Vũng Tàu',
    rating: 4.7,
    reviewCount: 920,
    stars: 5,
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'],
    description: 'Resort 5 sao sở hữu hồ bơi vô cực ngắm hoàng hôn biển lãng mạn bậc nhất thành phố biển Vũng Tàu.',
    amenities: ['2 Hồ bơi vô cực nước mặn & ngọt', 'Phòng xông hơi đá muối', 'Xe điện', 'Thang máy'],
    policies: {
      checkInTime: '14:00',
      checkOutTime: '12:00',
      childPolicy: 'Miễn phí 1 trẻ dưới 5 tuổi.',
      extraBedFee: 500000,
      cancellationSummary: 'Miễn phí hủy trước 3 ngày.'
    },
    rooms: [
      {
        id: 'room_marina_deluxe_ocean',
        name: 'Deluxe King Hướng Biển Hoàng Hôn',
        description: 'Tận hưởng khoảnh khắc hoàng hôn buông xuống biển Vũng Tàu.',
        bedType: '1 Giường King',
        maxAdults: 2,
        maxChildren: 1,
        areaM2: 36,
        pricePerNight: 1750000,
        originalPrice: 2100000,
        includesBreakfast: true,
        freeCancellationBeforeDays: 3,
        availableRooms: 5,
        images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'],
        amenities: ['View biển', 'Bồn tắm', 'Wifi', 'Minibar']
      }
    ],
    tags: ['Nghỉ dưỡng cuối tuần', 'View hoàng hôn', '5 sao'],
    campaignIds: ['camp_vip10', 'camp_family200']
  },

  // Sa Pa
  {
    id: 'stay_sapa_pistachio',
    category: 'stay',
    subType: 'hotel',
    name: 'Pistachio Hotel Sa Pa (Bể bơi vô cực dát vàng)',
    partner: 'Traveloka',
    destinationId: 'sapa',
    address: 'Số 29, tổ 5, đường Thác Bạc, Sa Pa, Lào Cai',
    rating: 4.8,
    reviewCount: 1350,
    stars: 4,
    coverImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'],
    description: 'Khách sạn nổi tiếng với bể bơi vô cực dát vàng giữa lưng chừng mây nhìn trọn thung lũng Mường Hoa.',
    amenities: ['Bể bơi vô cực 4 mùa nước ấm', 'Thang máy', 'Buffet sáng đặc sản Tây Bắc', 'Dịch vụ sưởi ấm'],
    policies: {
      checkInTime: '14:00',
      checkOutTime: '12:00',
      childPolicy: 'Miễn phí cho trẻ dưới 6 tuổi.',
      extraBedFee: 350000,
      cancellationSummary: 'Miễn phí hủy trước 4 ngày.'
    },
    rooms: [
      {
        id: 'room_pistachio_valley',
        name: 'Superior Thung Lũng Mường Hoa',
        description: 'Sáng thức giấc ngắm biển mây trôi bồng bềnh bên cửa sổ.',
        bedType: '1 King hoặc 2 Đơn',
        maxAdults: 2,
        maxChildren: 1,
        areaM2: 38,
        pricePerNight: 1350000,
        originalPrice: 1650000,
        includesBreakfast: true,
        freeCancellationBeforeDays: 4,
        availableRooms: 6,
        images: ['https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'],
        amenities: ['Hệ thống sưởi', 'View thung lũng', 'Két an toàn']
      }
    ],
    tags: ['Săn mây', 'Bể bơi dát vàng', 'View Mường Hoa'],
    campaignIds: ['camp_vip10', 'camp_family200']
  }
];

// ==========================================
// 2. CHUYẾN BAY (FLIGHTS)
// ==========================================
export const FLIGHTS: Flight[] = [
  // TP.HCM -> Đà Nẵng
  {
    id: 'fl_sgn_dad_vn128',
    category: 'flight',
    flightNumber: 'VN 128',
    airline: 'Vietnam Airlines',
    airlineLogoText: 'Vietnam Airlines',
    fromCity: 'TP. Hồ Chí Minh',
    fromCode: 'SGN',
    toCity: 'Đà Nẵng',
    toCode: 'DAD',
    departureTime: '06:15',
    arrivalTime: '07:45',
    duration: '1h 30m',
    date: '2026-10-27',
    cabinClass: 'Phổ thông',
    pricePerAdult: 1250000,
    pricePerChild: 1125000,
    pricePerInfant: 125000,
    baggageAllowance: { carryOnKg: 12, checkedKg: 23 },
    availableSeats: 14,
    partner: 'Vexere',
    campaignIds: ['camp_vip10']
  },
  {
    id: 'fl_sgn_dad_vj628',
    category: 'flight',
    flightNumber: 'VJ 628',
    airline: 'Vietjet Air',
    airlineLogoText: 'Vietjet Air',
    fromCity: 'TP. Hồ Chí Minh',
    fromCode: 'SGN',
    toCity: 'Đà Nẵng',
    toCode: 'DAD',
    departureTime: '08:45',
    arrivalTime: '10:10',
    duration: '1h 25m',
    date: '2026-10-27',
    cabinClass: 'Phổ thông',
    pricePerAdult: 890000,
    pricePerChild: 890000,
    pricePerInfant: 100000,
    baggageAllowance: { carryOnKg: 7, checkedKg: 0 },
    availableSeats: 22,
    partner: 'Traveloka',
    campaignIds: ['camp_vip10']
  },
  {
    id: 'fl_sgn_dad_qh152',
    category: 'flight',
    flightNumber: 'QH 152',
    airline: 'Bamboo Airways',
    airlineLogoText: 'Bamboo Airways',
    fromCity: 'TP. Hồ Chí Minh',
    fromCode: 'SGN',
    toCity: 'Đà Nẵng',
    toCode: 'DAD',
    departureTime: '14:20',
    arrivalTime: '15:45',
    duration: '1h 25m',
    date: '2026-10-27',
    cabinClass: 'Phổ thông',
    pricePerAdult: 1100000,
    pricePerChild: 990000,
    pricePerInfant: 110000,
    baggageAllowance: { carryOnKg: 7, checkedKg: 20 },
    availableSeats: 9,
    partner: 'Trip.com',
    campaignIds: ['camp_vip10']
  },

  // TP.HCM -> Hà Nội
  {
    id: 'fl_sgn_han_vn246',
    category: 'flight',
    flightNumber: 'VN 246',
    airline: 'Vietnam Airlines',
    airlineLogoText: 'Vietnam Airlines',
    fromCity: 'TP. Hồ Chí Minh',
    fromCode: 'SGN',
    toCity: 'Hà Nội',
    toCode: 'HAN',
    departureTime: '07:00',
    arrivalTime: '09:15',
    duration: '2h 15m',
    date: '2026-10-27',
    cabinClass: 'Phổ thông',
    pricePerAdult: 1850000,
    pricePerChild: 1665000,
    pricePerInfant: 185000,
    baggageAllowance: { carryOnKg: 12, checkedKg: 23 },
    availableSeats: 8,
    partner: 'Traveloka',
    campaignIds: ['camp_vip10']
  },
  {
    id: 'fl_sgn_han_vj138',
    category: 'flight',
    flightNumber: 'VJ 138',
    airline: 'Vietjet Air',
    airlineLogoText: 'Vietjet Air',
    fromCity: 'TP. Hồ Chí Minh',
    fromCode: 'SGN',
    toCity: 'Hà Nội',
    toCode: 'HAN',
    departureTime: '11:30',
    arrivalTime: '13:45',
    duration: '2h 15m',
    date: '2026-10-27',
    cabinClass: 'Phổ thông',
    pricePerAdult: 1250000,
    pricePerChild: 1250000,
    pricePerInfant: 150000,
    baggageAllowance: { carryOnKg: 7, checkedKg: 0 },
    availableSeats: 18,
    partner: 'Vexere',
    campaignIds: ['camp_vip10']
  },

  // Hà Nội -> Phú Quốc
  {
    id: 'fl_han_pqc_vn123',
    category: 'flight',
    flightNumber: 'VN 1237',
    airline: 'Vietnam Airlines',
    airlineLogoText: 'Vietnam Airlines',
    fromCity: 'Hà Nội',
    fromCode: 'HAN',
    toCity: 'Phú Quốc',
    toCode: 'PQC',
    departureTime: '09:00',
    arrivalTime: '11:15',
    duration: '2h 15m',
    date: '2026-10-27',
    cabinClass: 'Phổ thông',
    pricePerAdult: 1950000,
    pricePerChild: 1755000,
    pricePerInfant: 195000,
    baggageAllowance: { carryOnKg: 12, checkedKg: 23 },
    availableSeats: 12,
    partner: 'Traveloka',
    campaignIds: ['camp_vip10']
  },

  // TP.HCM -> Đà Lạt
  {
    id: 'fl_sgn_dli_vn1380',
    category: 'flight',
    flightNumber: 'VN 1380',
    airline: 'Vietnam Airlines',
    airlineLogoText: 'Vietnam Airlines',
    fromCity: 'TP. Hồ Chí Minh',
    fromCode: 'SGN',
    toCity: 'Đà Lạt',
    toCode: 'DLI',
    departureTime: '07:20',
    arrivalTime: '08:15',
    duration: '55m',
    date: '2026-10-27',
    cabinClass: 'Phổ thông',
    pricePerAdult: 980000,
    pricePerChild: 882000,
    pricePerInfant: 98000,
    baggageAllowance: { carryOnKg: 12, checkedKg: 23 },
    availableSeats: 15,
    partner: 'Trip.com',
    campaignIds: ['camp_vip10']
  }
];

// ==========================================
// 3. XE KHÁCH & TÀU HỎA (BUS & TRAIN)
// ==========================================
export const TRANSPORTS: TransportTrip[] = [
  // TP.HCM -> Đà Lạt (Xe Phương Trang)
  {
    id: 'bus_sgn_dalat_futa_01',
    category: 'bus_train',
    type: 'bus',
    operator: 'Phương Trang (FUTA)',
    trainOrBusNumber: 'FUTA Limousine 34 Phòng',
    seatClass: 'Giường nằm 34 phòng',
    fromStation: 'Bến xe Miền Đông Mới (hoặc đón tại 272 Đề Thám, Q1)',
    toStation: 'Bến xe Liên tỉnh Đà Lạt (Số 1 Tô Hiến Thành)',
    fromCity: 'TP. Hồ Chí Minh',
    toCity: 'Đà Lạt',
    departureTime: '23:00',
    arrivalTime: '05:30',
    duration: '6h 30m',
    date: '2026-10-27',
    pricePerTicket: 320000,
    pickupPoints: ['Bến xe Miền Tây', '272 Đề Thám Q1', 'Hàng Xanh', 'Bến xe Miền Đông Mới'],
    dropoffPoints: ['Bến xe Đà Lạt', 'Trung chuyển tận nơi nội thành Đà Lạt miễn phí'],
    availableSeats: 16,
    partner: 'Vexere',
    seatLayout: {
      totalSeats: 34,
      rows: 6,
      cols: 3,
      decks: 2,
      occupiedSeatNumbers: ['A1', 'A2', 'A5', 'B1', 'B2', 'B6', 'B8']
    },
    campaignIds: ['camp_vip10']
  },
  {
    id: 'bus_sgn_dalat_futa_02',
    category: 'bus_train',
    type: 'bus',
    operator: 'Phương Trang (FUTA)',
    trainOrBusNumber: 'FUTA Giường Nằm VIP',
    seatClass: 'Giường nằm 34 phòng',
    fromStation: '272 Đề Thám, Quận 1',
    toStation: 'Bến xe Đà Lạt',
    fromCity: 'TP. Hồ Chí Minh',
    toCity: 'Đà Lạt',
    departureTime: '08:00',
    arrivalTime: '14:30',
    duration: '6h 30m',
    date: '2026-10-27',
    pricePerTicket: 320000,
    pickupPoints: ['272 Đề Thám Q1', 'Ngã tư Hàng Xanh'],
    dropoffPoints: ['Bến xe Đà Lạt', 'Khách sạn trung tâm'],
    availableSeats: 20,
    partner: 'Vexere',
    seatLayout: {
      totalSeats: 34,
      rows: 6,
      cols: 3,
      decks: 2,
      occupiedSeatNumbers: ['A3', 'A4', 'B3']
    },
    campaignIds: ['camp_vip10']
  },

  // TP.HCM -> Vũng Tàu (Hoa Mai VIP)
  {
    id: 'bus_sgn_vungtau_hoamai',
    category: 'bus_train',
    type: 'bus',
    operator: 'Hoa Mai VIP',
    trainOrBusNumber: 'Hoa Mai Limousine',
    seatClass: 'Limousine 9 chỗ',
    fromStation: '83 Nguyễn Thái Bình, Quận 1',
    toStation: '47 Trưng Nhị, TP. Vũng Tàu',
    fromCity: 'TP. Hồ Chí Minh',
    toCity: 'Vũng Tàu',
    departureTime: '09:00',
    arrivalTime: '11:00',
    duration: '2h 00m',
    date: '2026-10-27',
    pricePerTicket: 190000,
    pickupPoints: ['83 Nguyễn Thái Bình Q1', 'Hàng Xanh', 'Đầu cao tốc Long Thành'],
    dropoffPoints: ['Nội thành Vũng Tàu tận nơi'],
    availableSeats: 5,
    partner: 'Vexere',
    seatLayout: {
      totalSeats: 9,
      rows: 3,
      cols: 3,
      decks: 1,
      occupiedSeatNumbers: ['1', '2', '5', '6']
    },
    campaignIds: ['camp_vip10']
  },

  // Tàu Hỏa: TP.HCM -> Nha Trang (SE2)
  {
    id: 'train_sgn_nhatrang_se2',
    category: 'bus_train',
    type: 'train',
    operator: 'Đường Sắt Việt Nam (VNR)',
    trainOrBusNumber: 'Tàu SE2 Thống Nhất',
    seatClass: 'Khoang 4 giường nằm',
    fromStation: 'Ga Sài Gòn (01 Nguyễn Thông, Q3)',
    toStation: 'Ga Nha Trang (17 Thái Nguyên)',
    fromCity: 'TP. Hồ Chí Minh',
    toCity: 'Nha Trang',
    departureTime: '20:50',
    arrivalTime: '05:15',
    duration: '8h 25m',
    date: '2026-10-27',
    pricePerTicket: 720000,
    pickupPoints: ['Ga Sài Gòn', 'Ga Dĩ An'],
    dropoffPoints: ['Ga Nha Trang'],
    availableSeats: 12,
    partner: 'Vexere',
    seatLayout: {
      totalSeats: 28,
      rows: 7,
      cols: 4,
      decks: 1,
      occupiedSeatNumbers: ['G1', 'G2', 'G7', 'G8', 'G15']
    },
    campaignIds: ['camp_vip10']
  },

  // Tàu Hỏa: Hà Nội -> Đà Nẵng (SE1)
  {
    id: 'train_han_danang_se1',
    category: 'bus_train',
    type: 'train',
    operator: 'Đường Sắt Việt Nam (VNR)',
    trainOrBusNumber: 'Tàu SE1',
    seatClass: 'Khoang 4 giường nằm',
    fromStation: 'Ga Hà Nội (120 Lê Duẩn)',
    toStation: 'Ga Đà Nẵng (202 Hải Phòng)',
    fromCity: 'Hà Nội',
    toCity: 'Đà Nẵng',
    departureTime: '22:15',
    arrivalTime: '14:30',
    duration: '16h 15m',
    date: '2026-10-27',
    pricePerTicket: 1080000,
    pickupPoints: ['Ga Hà Nội', 'Ga Nam Định'],
    dropoffPoints: ['Ga Đà Nẵng'],
    availableSeats: 8,
    partner: 'Vexere',
    seatLayout: {
      totalSeats: 28,
      rows: 7,
      cols: 4,
      decks: 1,
      occupiedSeatNumbers: ['G3', 'G4', 'G9', 'G10']
    },
    campaignIds: ['camp_vip10']
  }
];

// ==========================================
// 4. TOUR & VÉ THAM QUAN (ACTIVITIES)
// ==========================================
export const ACTIVITIES: Activity[] = [
  // Đà Nẵng
  {
    id: 'act_bana_hills',
    category: 'activity',
    name: 'Vé Cáp Treo Sun World Bà Nà Hills & Cầu Vàng',
    destinationId: 'danang',
    partner: 'Klook',
    address: 'Thôn An Sơn, Xã Hòa Ninh, Huyện Hòa Vang, Đà Nẵng',
    coverImage: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80'],
    duration: '1 ngày',
    openingHours: '08:00 - 18:00 hàng ngày',
    rating: 4.9,
    reviewCount: 5400,
    shortDescription: 'Chiêm ngưỡng Cầu Vàng kỳ quan thế giới, làng Pháp cổ kính và hơn 100 trò chơi tại Fantasy Park.',
    fullDescription: 'Tận hưởng chuyến du ngoạn trên cáp treo đạt nhiều kỷ lục thế giới, dạo bước trên đôi bàn tay khổng lồ của Cầu Vàng sừng sững giữa biển mây.',
    highlights: ['Check-in Cầu Vàng', 'Tuyến cáp treo đạt 4 kỷ lục Guinness', 'Khu vui chơi trong nhà Fantasy Park'],
    inclusions: ['Vé cáp treo 2 chiều', 'Vé vào cổng các điểm tham quan trên đỉnh', 'Trò chơi Fantasy Park (trừ tượng sáp)'],
    exclusions: ['Buffet trưa (nếu không chọn gói combo)', 'Bảo tàng Tượng Sáp', 'Xe đưa đón trung tâm'],
    usageInstructions: 'Quét mã QR trực tiếp tại cổng soát vé, không cần xếp hàng đổi vé giấy.',
    cancellationPolicy: 'Miễn phí hủy trước 24 giờ trước ngày sử dụng.',
    timeSlots: ['08:00', '09:30', '11:00', '13:00'],
    options: [
      {
        id: 'opt_bana_adult',
        name: 'Vé Người Lớn (Cao từ 1m4)',
        type: 'adult',
        price: 900000,
        originalPrice: 950000,
        heightCondition: 'Khách cao từ 1m40 trở lên',
        description: 'Trọn gói cáp treo khứ hồi và tham quan đỉnh Bà Nà'
      },
      {
        id: 'opt_bana_child',
        name: 'Vé Trẻ Em (1m - 1m4)',
        type: 'child',
        price: 750000,
        originalPrice: 800000,
        heightCondition: 'Trẻ em cao từ 1m00 đến dưới 1m40 (Dưới 1m miễn phí)',
        description: 'Vé cáp treo và vui chơi cho bé'
      },
      {
        id: 'opt_bana_combo_buffet',
        name: 'Combo Cáp Treo + Buffet Trưa Quốc Tế',
        type: 'combo',
        price: 1250000,
        originalPrice: 1350000,
        description: 'Vé cáp treo kèm đại tiệc buffet hơn 100 món tại nhà hàng Four Seasons'
      }
    ],
    tags: ['Cầu Vàng', 'Bestseller', 'Không thể bỏ lỡ'],
    campaignIds: ['camp_vip10', 'camp_attraction15'],
    isFeatured: true
  },

  // Hội An
  {
    id: 'act_hoian_memories',
    category: 'activity',
    name: 'Vé Show Diễn Ký Ức Hội An (Hoi An Memories)',
    destinationId: 'hoian',
    partner: 'Klook',
    address: 'Công viên Ấn Tượng Hội An, Cồn Hến, Phường Cẩm Nam, Hội An',
    coverImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80'],
    duration: '1h 15m (20:00 - 21:15)',
    openingHours: '17:00 mở cửa công viên, 20:00 show biểu diễn',
    rating: 4.9,
    reviewCount: 3120,
    shortDescription: 'Show diễn thực cảnh ngoài trời quy mô lớn nhất Việt Nam với hơn 500 diễn viên trên sân khấu sông nước.',
    fullDescription: 'Đưa bạn ngược dòng thời gian về 400 năm trước để chứng kiến sự phồn hoa rực rỡ của thương cảng Faifo quốc tế.',
    highlights: ['500 diễn viên chuyên nghiệp', 'Sân khấu mặt nước 25.000m2', 'Âm thanh ánh sáng hiện đại bậc nhất'],
    inclusions: ['Vé xem show theo hạng ghế chọn', 'Vé vào cổng công viên Ấn Tượng Hội An'],
    exclusions: ['Ăn uống tại công viên', 'Đưa đón tận nơi'],
    usageInstructions: 'Xuất trình vé điện tử trên app tại cổng trước 19:30 để ổn định chỗ ngồi.',
    cancellationPolicy: 'Miễn phí hủy trước 48 giờ.',
    timeSlots: ['20:00 - 21:15'],
    options: [
      {
        id: 'opt_memories_eco',
        name: 'Hạng ghế ECO (Tiêu chuẩn)',
        type: 'adult',
        price: 600000,
        originalPrice: 650000,
        description: 'Vị trí ghế phía dưới gần sân khấu sông nước'
      },
      {
        id: 'opt_memories_high',
        name: 'Hạng ghế HIGH (Tầm nhìn đẹp)',
        type: 'adult',
        price: 750000,
        originalPrice: 850000,
        description: 'Vị trí giữa khán đài góc nhìn trọn vẹn toàn cảnh'
      }
    ],
    tags: ['Show thực cảnh', 'Đặc sắc văn hóa', 'Buổi tối'],
    campaignIds: ['camp_vip10', 'camp_attraction15']
  },

  // Đà Lạt
  {
    id: 'act_dalat_dambri',
    category: 'activity',
    name: 'Máng Trượt Datanla & Thác Datanla Mới Nhất',
    destinationId: 'dalat',
    partner: 'Klook',
    address: 'Đèo Prenn, Phường 3, TP. Đà Lạt',
    coverImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'],
    duration: '2 - 3 giờ',
    openingHours: '07:30 - 17:00',
    rating: 4.8,
    reviewCount: 2800,
    shortDescription: 'Trải nghiệm tuyến máng trượt xuyên rừng thông dài nhất Đông Nam Á (2.400m) xuống chân thác Datanla hùng vĩ.',
    fullDescription: 'Cảm giác phấn khích lướt giữa những rặng thông reo với hệ thống phanh cảm ứng an toàn chuẩn Đức.',
    highlights: ['Máng trượt dài nhất Đông Nam Á', 'Thác Datanla hùng vĩ', 'Check-in cầu gỗ'],
    inclusions: ['Vé vào cổng khu du lịch', 'Vé máng trượt khứ hồi New Alpine Coaster'],
    exclusions: ['Dịch vụ đu dây mạo hiểm High Rope'],
    usageInstructions: 'Quét mã QR tại cổng máng trượt để nhận vòng tay.',
    cancellationPolicy: 'Miễn phí hủy trước 24 giờ.',
    timeSlots: ['08:00', '10:00', '13:30', '15:00'],
    options: [
      {
        id: 'opt_datanla_adult',
        name: 'Vé Người Lớn Máng Trượt Khứ Hồi',
        type: 'adult',
        price: 250000,
        originalPrice: 280000,
        description: 'Bao gồm vé vào cổng thác và máng trượt 2 chiều'
      },
      {
        id: 'opt_datanla_child',
        name: 'Vé Trẻ Em Máng Trượt (1m - 1m4)',
        type: 'child',
        price: 150000,
        originalPrice: 180000,
        heightCondition: 'Trẻ em đi cùng người lớn trong máng trượt đôi',
        description: 'Vé máng trượt khứ hồi cho bé'
      }
    ],
    tags: ['Mạo hiểm nhẹ', 'Gia đình thích', 'Rừng thông'],
    campaignIds: ['camp_vip10', 'camp_attraction15']
  },

  // Phú Quốc
  {
    id: 'act_pqc_vinwonders_safari',
    category: 'activity',
    name: 'Combo VinWonders Phú Quốc & Vinpearl Safari',
    destinationId: 'phuquoc',
    partner: 'Klook',
    address: 'Khu Bãi Dài, Gành Dầu, TP. Phú Quốc',
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'],
    duration: '1 - 2 ngày',
    openingHours: 'Safari: 09:00 - 16:00 | VinWonders: 09:00 - 19:30',
    rating: 4.9,
    reviewCount: 6800,
    shortDescription: 'Công viên chủ đề lớn nhất Việt Nam cùng vườn thú bán hoang dã đầu tiên tại Việt Nam.',
    fullDescription: 'Khám phá Cung điện Hải Vương hình rùa khổng lồ lọt top thế giới và chuyến xe bus chuyên dụng đi giữa đàn hổ, sư tử, hươu cao cổ.',
    highlights: ['Cung điện Hải Vương khổng lồ', 'Khu bảo tồn động vật Safari', 'Show diễn triệu đô Once'],
    inclusions: ['Vé vào cổng không giới hạn trò chơi tại VinWonders', 'Vé tham quan Safari và xe bus bán hoang dã'],
    exclusions: ['Ăn uống và dịch vụ xe điện Buggy nội bộ'],
    usageInstructions: 'Vé QR quét trực tiếp tại cổng vào.',
    cancellationPolicy: 'Miễn phí hủy trước 48 giờ.',
    timeSlots: ['09:00 - 19:30'],
    options: [
      {
        id: 'opt_vin_combo_adult',
        name: 'Combo Người Lớn (Safari + VinWonders)',
        type: 'combo',
        price: 1350000,
        originalPrice: 1450000,
        description: 'Vé vào 2 khu trong cùng 1 ngày hoặc 2 ngày liên tiếp'
      },
      {
        id: 'opt_vin_combo_child',
        name: 'Combo Trẻ Em (1m - 1m4)',
        type: 'child',
        price: 1000000,
        originalPrice: 1100000,
        heightCondition: 'Trẻ em dưới 1m miễn phí hoàn toàn',
        description: 'Trọn gói vui chơi thỏa thích cho bé'
      }
    ],
    tags: ['Trẻ em cực thích', 'Động vật hoang dã', 'Top 1 Phú Quốc'],
    campaignIds: ['camp_vip10', 'camp_attraction15']
  }
];

// ==========================================
// 5. SỰ KIỆN & CONCERT (EVENTS)
// ==========================================
export const EVENTS: EntertainmentEvent[] = [
  {
    id: 'event_ha_anh_tuan_live',
    category: 'event',
    title: 'Hà Anh Tuấn Live Concert “Chân Trời Rực Rỡ 2026”',
    destinationId: 'danang',
    venue: 'Cung Thể Thao Tuyên Sơn, Quận Hải Châu, TP. Đà Nẵng',
    dateTime: '20:00 • Thứ Bảy, 14/11/2026',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    partner: 'Ticketbox',
    description: 'Đêm nhạc acoustic đỉnh cao kết hợp dàn nhạc giao hưởng, mang đến những bản tình ca say đắm giữa lòng thành phố biển Đà Nẵng.',
    tiers: [
      {
        id: 'tier_hat_vvip',
        tierName: 'VVIP - Chân Trời',
        price: 3800000,
        benefits: ['Ghế ngồi trực diện trung tâm sân khấu', 'Lối vào VIP riêng không xếp hàng', 'Bộ quà tặng độc quyền & nước uống'],
        availableCount: 12,
        status: 'selling_fast'
      },
      {
        id: 'tier_hat_vip',
        tierName: 'VIP - Rực Rỡ',
        price: 2400000,
        benefits: ['Khu vực khán đài tầng 1 góc nhìn toàn cảnh', 'Vé cứng kỷ niệm'],
        availableCount: 45,
        status: 'available'
      },
      {
        id: 'tier_hat_cat1',
        tierName: 'CAT 1 - Gió Đông',
        price: 1200000,
        benefits: ['Khán đài tầng 2 âm thanh chuẩn thính phòng'],
        availableCount: 80,
        status: 'available'
      }
    ],
    transferRules: 'Vé điện tử định danh theo số điện thoại đặt chỗ trên Quà Tặng VIP, hỗ trợ chuyển nhượng 1 lần trước 7 ngày diễn ra sự kiện.',
    ageRestriction: 'Khán giả từ 10 tuổi trở lên.',
    status: 'open_for_sale',
    campaignIds: ['camp_vip10']
  },
  {
    id: 'event_vu_concert_baotang',
    category: 'event',
    title: 'Vũ. Live Tour “Bảo Tàng Của Nuối Tiếc”',
    destinationId: 'hcm',
    venue: 'Nhà Thi Đấu Phú Thọ, Quận 11, TP. Hồ Chí Minh',
    dateTime: '19:30 • Chủ Nhật, 22/11/2026',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    partner: 'Ticketbox',
    description: 'Tour diễn âm nhạc cá nhân lớn nhất của Hoàng tử Indie Việt Nam, cùng hàng ngàn khán giả cất cao tiếng hát hoài niệm.',
    tiers: [
      {
        id: 'tier_vu_zone_a',
        tierName: 'Zone A - Đứng Sát Sân Khấu',
        price: 1100000,
        benefits: ['Khu vực đứng sát thần tượng', 'Vòng tay kỷ niệm phát sáng'],
        availableCount: 25,
        status: 'selling_fast'
      },
      {
        id: 'tier_vu_seat_b',
        tierName: 'Khán Đài Ngồi B',
        price: 850000,
        benefits: ['Ghế ngồi trung tâm khán đài'],
        availableCount: 90,
        status: 'available'
      }
    ],
    transferRules: 'Không hoàn tiền vé sau khi xuất mã demo thành công.',
    ageRestriction: 'Dành cho khán giả từ 12 tuổi.',
    status: 'open_for_sale',
    campaignIds: ['camp_vip10']
  },
  {
    id: 'event_diff_danang_fireworks',
    category: 'event',
    title: 'Lễ Hội Pháo Hoa Quốc Tế Đà Nẵng DIFF 2026',
    destinationId: 'danang',
    venue: 'Khán đài bờ sông Hàn, Đường Trần Hưng Đạo, Đà Nẵng',
    dateTime: '20:00 • Thứ Bảy, 05/12/2026',
    coverImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    partner: 'Momo',
    description: 'Mãn nhãn với những màn trình diễn ánh sáng ngoạn mục trên bầu trời sông Hàn của các đội tuyển pháo hoa thế giới.',
    tiers: [
      {
        id: 'tier_diff_a1',
        tierName: 'Khán Đài VIP A1',
        price: 1500000,
        benefits: ['Vị trí ngắm trực diện bãi bắn pháo hoa', 'Ghế đệm êm ái'],
        availableCount: 30,
        status: 'available'
      },
      {
        id: 'tier_diff_b2',
        tierName: 'Khán Đài Tiêu Chuẩn B2',
        price: 800000,
        benefits: ['Tầm nhìn thoáng đãng sông Hàn'],
        availableCount: 65,
        status: 'available'
      }
    ],
    transferRules: 'Vé điện tử có mã QR soát vé tự động tại cổng.',
    ageRestriction: 'Mọi lứa tuổi.',
    status: 'open_for_sale',
    campaignIds: ['camp_vip10']
  }
];
