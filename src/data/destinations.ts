import { Destination } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'dalat',
    name: 'Đà Lạt',
    region: 'Miền Trung',
    tagline: 'Thành phố sương mù, khí hậu ôn hòa & ngàn hoa',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    popularCategories: ['stay', 'bus_train', 'activity'],
    highlights: ['Hồ Tuyền Lâm', 'Thung lũng Tình Yêu', 'Đỉnh Langbiang', 'Chợ đêm Đà Lạt']
  },
  {
    id: 'danang',
    name: 'Đà Nẵng',
    region: 'Miền Trung',
    tagline: 'Thành phố đáng sống, biển Mỹ Khê & Cầu Vàng',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
    popularCategories: ['stay', 'flight', 'activity', 'event'],
    highlights: ['Cầu Vàng Bà Nà Hills', 'Biển Mỹ Khê', 'Bán đảo Sơn Trà', 'Cầu Rồng phun lửa']
  },
  {
    id: 'hoian',
    name: 'Hội An',
    region: 'Miền Trung',
    tagline: 'Phố cổ đèn lồng, di sản thế giới & ẩm thực đặc sắc',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
    popularCategories: ['stay', 'activity'],
    highlights: ['Chùa Cầu', 'Rừng dừa Bảy Mẫu', 'Show Ký Ức Hội An', 'Biển An Bàng']
  },
  {
    id: 'hue',
    name: 'Huế',
    region: 'Miền Trung',
    tagline: 'Cố đô thơ mộng, lăng tẩm uy nghiêm & sông Hương',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80',
    popularCategories: ['stay', 'bus_train', 'activity'],
    highlights: ['Đại Nội Huế', 'Chùa Thiên Mụ', 'Lăng Khải Định', 'Ca Huế trên sông Hương']
  },
  {
    id: 'hanoi',
    name: 'Hà Nội',
    region: 'Miền Bắc',
    tagline: 'Thủ đô nghìn năm văn hiến, 36 phố phường & hồ Gươm',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    popularCategories: ['stay', 'flight', 'bus_train', 'activity', 'event'],
    highlights: ['Hồ Hoàn Kiếm', 'Văn Miếu Quốc Tử Giám', 'Phố Cổ Hà Nội', 'Lăng Bác']
  },
  {
    id: 'hcm',
    name: 'TP. Hồ Chí Minh',
    region: 'Miền Nam',
    tagline: 'Đô thị sôi động, trung tâm kinh tế & giải trí bất tận',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    popularCategories: ['stay', 'flight', 'bus_train', 'activity', 'event'],
    highlights: ['Phố đi bộ Nguyễn Huệ', 'Chợ Bến Thành', 'Dinh Độc Lập', 'Landmark 81']
  },
  {
    id: 'phuquoc',
    name: 'Phú Quốc',
    region: 'Miền Nam',
    tagline: 'Đảo Ngọc thiên đường, bãi biển cát trắng & hoàng hôn rực rỡ',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    popularCategories: ['stay', 'flight', 'activity'],
    highlights: ['Grand World', 'VinWonders', 'Cáp treo Hòn Thơm', 'Bãi Sao']
  },
  {
    id: 'nhatrang',
    name: 'Nha Trang',
    region: 'Miền Trung',
    tagline: 'Vịnh biển tuyệt mỹ, thiên đường lặn ngắm san hô & hải sản',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    popularCategories: ['stay', 'flight', 'bus_train', 'activity'],
    highlights: ['VinWonders Nha Trang', 'Tháp Bà Ponagar', 'Đảo Hòn Mun', 'Vịnh Ninh Vân']
  },
  {
    id: 'vungtau',
    name: 'Vũng Tàu',
    region: 'Miền Nam',
    tagline: 'Điểm nghỉ dưỡng cuối tuần lý tưởng gần Sài Gòn',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    popularCategories: ['stay', 'bus_train', 'activity'],
    highlights: ['Tượng Chúa Kito', 'Ngọn Hải Đăng', 'Bãi Sau', 'Hồ Tràm']
  },
  {
    id: 'cantho',
    name: 'Cần Thơ',
    region: 'Miền Nam',
    tagline: 'Thủ phủ miền Tây sông nước, chợ nổi & miệt vườn sum sê',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    popularCategories: ['stay', 'bus_train', 'activity'],
    highlights: ['Chợ nổi Cái Răng', 'Bến Ninh Kiều', 'Nhà cổ Bình Thủy', 'Cồn Sơn']
  },
  {
    id: 'sapa',
    name: 'Sa Pa',
    region: 'Miền Bắc',
    tagline: 'Nóc nhà Đông Dương Fansipan, ruộng bậc thang kỳ vĩ',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    popularCategories: ['stay', 'bus_train', 'activity'],
    highlights: ['Đỉnh Fansipan', 'Bản Cát Cát', 'Đèo Ô Quy Hồ', 'Thung lũng Mường Hoa']
  },
  {
    id: 'halong',
    name: 'Hạ Long',
    region: 'Miền Bắc',
    tagline: 'Kỳ quan thiên nhiên thế giới, vịnh biển ngàn đảo đá',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80',
    popularCategories: ['stay', 'activity'],
    highlights: ['Du thuyền Vịnh Hạ Long', 'Hang Sửng Sốt', 'Đảo Ti Tốp', 'Sun World Hạ Long']
  }
];
