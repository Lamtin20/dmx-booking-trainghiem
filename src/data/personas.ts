import { UserPersona } from '../types';

export const USER_PERSONAS: UserPersona[] = [
  // 1. Hồ sơ thực tế trích xuất từ điện thoại của người dùng (Lâm Tín)
  {
    id: 'user_lam_tin',
    name: 'Lâm Tín',
    shortName: 'Tín',
    honorific: 'Anh',
    phone: '0908 778 555',
    memberTier: 'Gold',
    pointBalance: 44358, // Đúng 44.358 điểm từ ảnh app Quà Tặng VIP thực tế
    voucherCount: 2,     // Đúng 2 quà tặng
    barcodeNumber: '7785', // Đúng mã số barcode 7785 từ ảnh
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    completedBookingsCount: 2,
    description: 'Chủ tài khoản Quà Tặng VIP (từ ảnh thực tế). Yêu thích trải nghiệm du lịch gia đình & dịch vụ uy tín Điện Máy Xanh.',
    defaultGroup: {
      adults: 2,
      children: 1,
      childAges: [5]
    }
  },
  {
    id: 'user_family',
    name: 'Anh Trần Minh Trí',
    shortName: 'Trí',
    honorific: 'Anh',
    phone: '0908 123 456',
    memberTier: 'Gold',
    pointBalance: 125400,
    voucherCount: 4,
    barcodeNumber: '1842',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    completedBookingsCount: 3,
    description: 'Gia đình 2 người lớn + 1 bé 5 tuổi, thích nghỉ dưỡng Đà Lạt & Hội An, ưu tiên phòng rộng có thang máy.',
    defaultGroup: {
      adults: 2,
      children: 1,
      childAges: [5]
    }
  },
  {
    id: 'user_first_timer',
    name: 'Chị Nguyễn Phương Vy',
    shortName: 'Vy',
    honorific: 'Chị',
    phone: '0912 889 900',
    memberTier: 'Silver',
    pointBalance: 15000,
    voucherCount: 1,
    barcodeNumber: '9900',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    completedBookingsCount: 0,
    description: 'Khách hàng mới toanh trên Quà Tặng VIP, đủ điều kiện nhận mã chào mừng VIPFIRST.',
    defaultGroup: {
      adults: 2,
      children: 0,
      childAges: []
    }
  },
  {
    id: 'user_couple',
    name: 'Hoàng Long & Mai Anh',
    shortName: 'Long',
    honorific: 'Anh',
    phone: '0977 445 566',
    memberTier: 'Gold',
    pointBalance: 88200,
    voucherCount: 3,
    barcodeNumber: '5566',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    completedBookingsCount: 2,
    description: 'Cặp đôi đi nghỉ dưỡng cuối tuần, yêu thích không gian yên tĩnh, lãng mạn tại Hội An.',
    defaultGroup: {
      adults: 2,
      children: 0,
      childAges: []
    }
  },
  {
    id: 'user_group_friends',
    name: 'Nguyễn Tấn Đạt (Nhóm bạn)',
    shortName: 'Đạt',
    honorific: 'Bạn',
    phone: '0933 667 788',
    memberTier: 'Silver',
    pointBalance: 62000,
    voucherCount: 2,
    barcodeNumber: '7788',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    completedBookingsCount: 1,
    description: 'Trưởng nhóm 6 người bạn đi Nha Trang / Vũng Tàu, cần chia phòng hợp lý.',
    defaultGroup: {
      adults: 6,
      children: 0,
      childAges: []
    }
  },
  {
    id: 'user_senior',
    name: 'Bác Nguyễn Văn An',
    shortName: 'Bác An',
    honorific: 'Anh',
    phone: '0913 778 899',
    memberTier: 'Gold',
    pointBalance: 154000,
    voucherCount: 3,
    barcodeNumber: '8899',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    completedBookingsCount: 4,
    description: 'Người lớn tuổi nghỉ dưỡng Đà Lạt, hạn chế đi bộ, cần thang máy.',
    defaultGroup: {
      adults: 2,
      children: 0,
      childAges: []
    }
  }
];
