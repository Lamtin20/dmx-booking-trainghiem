// Core Domain Types for DMX "Đi & Trải nghiệm" Mini App on Quà Tặng VIP

export type ServiceCategory = 'stay' | 'flight' | 'bus_train' | 'activity' | 'event';

export type DestinationId = 
  | 'dalat' | 'danang' | 'hoian' | 'hue' | 'hanoi' 
  | 'hcm' | 'phuquoc' | 'nhatrang' | 'vungtau' | 'cantho' 
  | 'sapa' | 'halong';

export interface Destination {
  id: DestinationId;
  name: string;
  region: 'Miền Bắc' | 'Miền Trung' | 'Miền Nam';
  tagline: string;
  image: string;
  popularCategories: ServiceCategory[];
  highlights: string[];
}

// 1. Lưu trú (Hotels, Resorts, Homestays)
export interface RoomType {
  id: string;
  name: string;
  description: string;
  bedType: string;
  maxAdults: number;
  maxChildren: number;
  areaM2: number;
  pricePerNight: number;
  originalPrice?: number;
  includesBreakfast: boolean;
  freeCancellationBeforeDays: number;
  availableRooms: number;
  images: string[];
  amenities: string[];
}

export interface Stay {
  id: string;
  category: 'stay';
  subType: 'hotel' | 'resort' | 'homestay';
  name: string;
  partner: 'Traveloka' | 'Trip.com' | 'Agoda' | 'DMX Direct';
  destinationId: DestinationId;
  address: string;
  rating: number; // Demo rating
  reviewCount: number;
  stars: number;
  coverImage: string;
  images: string[];
  description: string;
  amenities: string[]; // hồ bơi, thang máy, wifi, xe đưa đón, gần biển...
  policies: {
    checkInTime: string;
    checkOutTime: string;
    childPolicy: string;
    extraBedFee: number;
    cancellationSummary: string;
  };
  rooms: RoomType[];
  tags: string[];
  campaignIds?: string[];
  isFeatured?: boolean;
}

// 2. Chuyến bay (Flights)
export interface Flight {
  id: string;
  category: 'flight';
  flightNumber: string;
  airline: 'Vietnam Airlines' | 'Vietjet Air' | 'Bamboo Airways' | 'Vietravel Airlines';
  airlineLogoText: string;
  airlineLogo?: string;
  fromCity: string;
  fromCode: string;
  toCity: string;
  toCode: string;
  departureTime: string; // "07:30"
  arrivalTime: string;   // "09:00"
  duration: string;      // "1h 30m"
  date: string;          // YYYY-MM-DD
  cabinClass: 'Phổ thông' | 'Thương gia';
  pricePerAdult: number;
  pricePerChild: number; // typically 75% - 90%
  pricePerInfant: number; // typically 10%
  baggageAllowance: {
    carryOnKg: number;
    checkedKg: number;
  };
  availableSeats: number;
  partner: 'Vexere' | 'Traveloka' | 'Trip.com';
  campaignIds?: string[];
}

// 3. Xe khách & Tàu hỏa (Bus & Train)
export type TransportType = 'bus' | 'train';

export interface TransportTrip {
  id: string;
  category: 'bus_train';
  type: TransportType;
  operator: 'Phương Trang (FUTA)' | 'Mai Linh Express' | 'Hoa Mai VIP' | 'Thành Bưởi' | 'Đường Sắt Việt Nam (VNR)';
  trainOrBusNumber: string; // e.g. "SE1", "FUTA Limousine"
  seatClass: 'Giường nằm 34 phòng' | 'Limousine 9 chỗ' | 'Ghế ngồi ngả' | 'Khoang 4 giường nằm' | 'Khoang 6 giường nằm';
  fromStation: string;
  toStation: string;
  fromCity: string;
  toCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  date: string;
  pricePerTicket: number;
  pickupPoints: string[];
  dropoffPoints: string[];
  availableSeats: number;
  partner: 'Vexere';
  // Seat map layout
  seatLayout: {
    totalSeats: number;
    rows: number;
    cols: number;
    decks: 1 | 2; // single or double decker
    occupiedSeatNumbers: string[];
  };
  campaignIds?: string[];
}

// 4. Tour & Vé Tham quan (Activities / Attractions)
export interface ActivityOption {
  id: string;
  name: string; // e.g., "Vé người lớn", "Vé trẻ em (1m - 1m4)"
  type: 'adult' | 'child' | 'combo';
  price: number;
  originalPrice?: number;
  heightCondition?: string; // "Dưới 1m miễn phí", "Từ 1m đến 1m4"
  description: string;
}

export interface Activity {
  id: string;
  category: 'activity';
  name: string;
  destinationId: DestinationId;
  partner: 'Klook' | 'DMX Trải nghiệm';
  address: string;
  coverImage: string;
  images: string[];
  duration: string; // e.g. "Nửa ngày", "1 ngày", "2 giờ"
  openingHours: string;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  usageInstructions: string;
  cancellationPolicy: string;
  timeSlots: string[]; // e.g. ["09:00", "13:30", "15:00"]
  options: ActivityOption[];
  tags: string[];
  campaignIds?: string[];
  isFeatured?: boolean;
}

// 5. Sự kiện & Concert (Events)
export interface EventTicketTier {
  id: string;
  tierName: string; // "VVIP", "VIP", "CAT 1", "CAT 2", "GA Standing"
  price: number;
  benefits: string[];
  availableCount: number;
  status: 'available' | 'selling_fast' | 'sold_out';
}

export interface EntertainmentEvent {
  id: string;
  category: 'event';
  title: string;
  destinationId: DestinationId;
  venue: string;
  dateTime: string;
  coverImage: string;
  bannerImage: string;
  partner: 'Ticketbox' | 'Momo';
  description: string;
  seatingMapImage?: string;
  tiers: EventTicketTier[];
  transferRules: string;
  ageRestriction: string;
  status: 'open_for_sale' | 'coming_soon' | 'sold_out';
  campaignIds?: string[];
}

export type CatalogItem = Stay | Flight | TransportTrip | Activity | EntertainmentEvent;

// Campaign & Promotion Types
export interface Campaign {
  id: string;
  code?: string;
  name: string;
  shortTag: string; // "Giảm 10%", "VIPFIRST"
  description: string;
  discountType: 'percentage' | 'fixed_amount';
  discountValue: number; // 10 (%) or 150000 (VND)
  maxDiscount?: number; // e.g. 300000
  minOrderValue: number; // e.g. 1000000
  eligibleCategories?: ServiceCategory[];
  eligiblePartnerNames?: string[];
  eligibleProductIds?: string[];
  requiresFirstOrder?: boolean;
  memberTierRequired?: 'Silver' | 'Gold' | 'Diamond';
  rewardShoppingVoucher?: number; // e.g. 100000 DMX shopping voucher post-trip
  startDate: string;
  endDate: string;
  usageLimitPerUser: number;
  totalBudgetRemaining: number;
  isActive: boolean;
  canStackWithOthers: boolean;
  badgeColor: string;
}

// User Persona & Profile Settings
export interface UserPersona {
  id: string;
  name: string;
  shortName: string; // e.g. "Tín"
  honorific: 'Anh' | 'Chị' | 'Bạn'; // Danh xưng
  phone: string;
  memberTier: 'Silver' | 'Gold' | 'Diamond';
  pointBalance: number; // 1 point = 1 VND on Quà Tặng VIP
  voucherCount: number;
  barcodeNumber: string;
  avatarUrl: string;
  completedBookingsCount: number;
  description: string;
  defaultGroup: {
    adults: number;
    children: number;
    childAges: number[];
  };
}

// Cart & Orders
export interface CartItem {
  cartItemId: string;
  category: ServiceCategory;
  partnerName: string;
  title: string;
  subtitle: string;
  destinationName: string;
  dateStart: string;
  dateEnd?: string;
  timeSlot?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  details: Record<string, any>;
  eligibleForCampaignIds: string[];
}

export interface SubOrder {
  subOrderId: string;
  partnerName: string;
  category: ServiceCategory;
  items: CartItem[];
  subTotal: number;
  discountAmount: number;
  totalPayable: number;
  status: 'pending_partner' | 'confirmed' | 'failed' | 'cancelled' | 'refunded';
  partnerConfirmationCode: string;
  demoTicket?: {
    ticketCode: string;
    qrData: string;
    instructions: string;
    passengerNames: string[];
  };
}

export interface Order {
  orderId: string;
  orderNumber: string; // e.g. "DMX-20261026-9481"
  createdAt: string;
  updatedAt: string;
  userId: string;
  userName: string;
  userPhone: string;
  subOrders: SubOrder[];
  totalOriginalAmount: number;
  appliedCampaignIds: string[];
  campaignDiscountTotal: number;
  pointsRedeemed: number;
  finalPaidAmount: number;
  paymentMethod: 'mwg_paylater' | 'momo' | 'vnpay' | 'vietqr' | 'visa_master';
  paylaterTenure?: 3 | 6 | 9 | 12; // Kỳ hạn trả chậm MWG PayLater (3, 6, 9, 12 tháng)
  paylaterMonthlyPayment?: number; // Số tiền trả góp mỗi tháng
  paymentStatus: 'pending' | 'processing' | 'paid' | 'failed' | 'refunded' | 'partial_refunded';
  overallStatus: 
    | 'draft' 
    | 'awaiting_payment' 
    | 'paid_processing_partners' 
    | 'confirmed' 
    | 'partially_confirmed' 
    | 'failed' 
    | 'completed' 
    | 'cancellation_requested' 
    | 'cancelled' 
    | 'refunded';
  rewardVoucherEarned?: {
    code: string;
    amount: number;
    expiryDate: string;
    status: 'pending_issue' | 'active' | 'used';
  };
}

// AI Planner Types
export interface ItineraryActivity {
  timeSlot: string; // "08:30 - 10:30"
  type: ServiceCategory | 'dining' | 'rest';
  title: string;
  description: string;
  location: string;
  estimatedCost: number;
  isBookable: boolean;
  bookableItemId?: string;
  partner?: string;
}

export interface ParsedUserInput {
  destinationId?: DestinationId;
  destinationName?: string;
  durationDays: number;
  adults: number;
  children: number;
  childAges: number[];
  budgetTotal?: number;
  departureCity: string;
  preferences: string[];
  constraints: {
    needsElevator?: boolean;
    lessWalking?: boolean;
    preferFlight?: boolean;
    preferBus?: boolean;
    freeCancellation?: boolean;
  };
  missingQuestions: string[];
}

export interface DayItinerary {
  dayNumber: number;
  date: string;
  theme: string;
  activities: ItineraryActivity[];
}

export interface ItineraryOption {
  id: 'budget' | 'balanced' | 'luxury';
  name: string; // "Tiết kiệm hơn", "Cân bằng", "Thoải mái hơn"
  tagline: string;
  estimatedTotalCost: number;
  bookableServicesCost: number;
  outsideExpensesEstimate: number;
  applicableSavings: number;
  tradeOffSummary: string;
  stayChoice: {
    stayId: string;
    name: string;
    roomName: string;
    pricePerNight: number;
    rating: number;
  };
  transportChoice: {
    type: TransportType | 'flight';
    operator: string;
    costPerPerson: number;
    departureTime: string;
  };
  activities: {
    activityId: string;
    name: string;
    cost: number;
  }[];
  days: DayItinerary[];
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  chips?: string[];
  options?: ItineraryOption[];
  appliedChangesSummary?: string;
  costDelta?: number; // e.g. -450000 VND
}

// Support & FAQ Ticket
export interface SupportTicket {
  id: string;
  orderNumber: string;
  serviceName: string;
  issueCategory: 'hoan_huy' | 'doi_ngay' | 'chua_nhan_ve' | 'khieu_nai_dich_vu' | 'khac';
  description: string;
  createdAt: string;
  status: 'dang_tiep_nhan' | 'dang_xu_ly' | 'da_hoan_tat' | 'tu_choi';
  aiResolutionNote?: string;
  agentResponse?: string;
  estimatedResponseTime: string;
}
