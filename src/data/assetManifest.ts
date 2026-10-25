export interface AssetEntry {
  assetName: string;
  sourceOrUrl: string;
  provider: string;
  licenseOrUsageBasis: string;
  usageLocation: string;
  status: 'Chính thức' | 'Minh họa' | 'Tạm thay thế';
}

export const ASSET_MANIFEST: AssetEntry[] = [
  {
    assetName: 'Logo Quà Tặng VIP',
    sourceOrUrl: 'Tài sản nhận diện thương hiệu MWG / Ứng dụng Quà Tặng VIP',
    provider: 'Công ty Cổ phần Đầu tư Thế Giới Di Động (MWG)',
    licenseOrUsageBasis: 'Mô phỏng giao diện nội bộ phục vụ dự án nghiên cứu & thử nghiệm Mini App',
    usageLocation: 'Header ứng dụng chủ Quà Tặng VIP & Thẻ thành viên',
    status: 'Minh họa'
  },
  {
    assetName: 'Logo Điện Máy Xanh',
    sourceOrUrl: 'Tài sản nhận diện thương hiệu Điện Máy Xanh',
    provider: 'Công ty Cổ phần Thế Giới Di Động',
    licenseOrUsageBasis: 'Mô phỏng nhãn hiệu dịch vụ "Đi & Trải nghiệm"',
    usageLocation: 'Header Mini App, Thẻ dịch vụ, Phiếu mua hàng DMX 100K',
    status: 'Minh họa'
  },
  {
    assetName: 'Logo / Nhãn Phương Trang (FUTA)',
    sourceOrUrl: 'Nhãn định danh đối tác vận tải xe khách',
    provider: 'FUTA Bus Lines',
    licenseOrUsageBasis: 'Mô phỏng hiển thị nhà cung cấp xe khách trong catalog demo',
    usageLocation: 'Thẻ chuyến xe, Sơ đồ ghế xe khách',
    status: 'Tạm thay thế'
  },
  {
    assetName: 'Logo / Nhãn Hãng hàng không (Vietnam Airlines, Vietjet, Bamboo)',
    sourceOrUrl: 'Nhãn định danh hãng bay',
    provider: 'Vietnam Airlines / Vietjet / Bamboo Airways',
    licenseOrUsageBasis: 'Mô phỏng chuyến bay mẫu cho luồng đặt vé demo',
    usageLocation: 'Danh sách chuyến bay, Chi tiết vé bay',
    status: 'Tạm thay thế'
  },
  {
    assetName: 'Bộ Icon Giao Diện (Lucide React)',
    sourceOrUrl: 'https://lucide.dev / npm package lucide-react',
    provider: 'Lucide Project',
    licenseOrUsageBasis: 'Giấy phép mã nguồn mở ISC License',
    usageLocation: 'Toàn bộ icon ngành hàng (Khách sạn, Máy bay, Xe, Vé, Lịch, Khiên bảo vệ, Giỏ hàng)',
    status: 'Chính thức'
  },
  {
    assetName: 'Ảnh danh lam thắng cảnh Việt Nam',
    sourceOrUrl: 'Unsplash Photography (Bộ ảnh bản quyền mở)',
    provider: 'Các nhiếp ảnh gia cộng đồng Unsplash',
    licenseOrUsageBasis: 'Unsplash License (Miễn phí sử dụng thương mại & phi thương mại)',
    usageLocation: 'Ảnh bìa 12 điểm đến, Khách sạn, Khu vui chơi Bà Nà Hills, VinWonders',
    status: 'Minh họa'
  },
  {
    assetName: 'Ảnh chân dung các Persona khách hàng',
    sourceOrUrl: 'Unsplash Portraits',
    provider: 'Unsplash Community',
    licenseOrUsageBasis: 'Unsplash License',
    usageLocation: 'Avatar 8 hồ sơ khách hàng thử nghiệm trong Demo Control Center',
    status: 'Minh họa'
  }
];
