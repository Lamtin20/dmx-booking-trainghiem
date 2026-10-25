import { Order } from '../types';

export const INITIAL_ORDERS: Order[] = [
  // 1. Đơn sắp tới (Đà Lạt gia đình)
  {
    orderId: 'ord_dalat_family_01',
    orderNumber: 'DMX-20261102-1842',
    createdAt: '2026-10-24 15:30',
    updatedAt: '2026-10-24 15:35',
    userId: 'user_family',
    userName: 'Anh Trần Minh Trí',
    userPhone: '0908 123 456',
    subOrders: [
      {
        subOrderId: 'sub_ord_stay_01',
        partnerName: 'Traveloka',
        category: 'stay',
        items: [
          {
            cartItemId: 'item_stay_colline',
            category: 'stay',
            partnerName: 'Traveloka',
            title: 'Hôtel Colline Đà Lạt',
            subtitle: 'Phòng Executive Family 2 Giường Lớn (2 đêm)',
            destinationName: 'Đà Lạt',
            dateStart: '2026-11-15',
            dateEnd: '2026-11-17',
            quantity: 1,
            unitPrice: 4500000,
            totalPrice: 4500000,
            details: { nights: 2, adults: 2, children: 1, roomName: 'Executive Family' },
            eligibleForCampaignIds: ['camp_vip10', 'camp_family200']
          }
        ],
        subTotal: 4500000,
        discountAmount: 300000,
        totalPayable: 4200000,
        status: 'confirmed',
        partnerConfirmationCode: 'TVL-DL-98214',
        demoTicket: {
          ticketCode: 'TVL-DL-98214-HOTEL',
          qrData: 'DEMO_TICKET_TVL_DL_98214_HOTEL_COLLINE',
          instructions: 'Nhận phòng tại quầy Lễ tân lúc 14:00 ngày 15/11. Xuất trình mã đặt phòng demo và CCCD người nhận phòng.',
          passengerNames: ['Trần Minh Trí', 'Nguyễn Thị Thu Hà', 'Trần Bảo An (5 tuổi)']
        }
      },
      {
        subOrderId: 'sub_ord_bus_01',
        partnerName: 'Vexere',
        category: 'bus_train',
        items: [
          {
            cartItemId: 'item_bus_futa',
            category: 'bus_train',
            partnerName: 'Vexere',
            title: 'FUTA Limousine 34 Phòng (Khứ hồi SGN - Đà Lạt)',
            subtitle: 'Giường A1, A2 (Tầng 1)',
            destinationName: 'Đà Lạt',
            dateStart: '2026-11-15',
            timeSlot: '23:00',
            quantity: 2,
            unitPrice: 320000,
            totalPrice: 640000,
            details: { seats: ['A1', 'A2'], pickup: '272 Đề Thám Q1' },
            eligibleForCampaignIds: ['camp_vip10']
          }
        ],
        subTotal: 640000,
        discountAmount: 0,
        totalPayable: 640000,
        status: 'confirmed',
        partnerConfirmationCode: 'VXR-FUTA-77124',
        demoTicket: {
          ticketCode: 'VXR-FUTA-77124-BUS',
          qrData: 'DEMO_TICKET_VXR_FUTA_77124',
          instructions: 'Có mặt tại 272 Đề Thám Quận 1 trước 22:30 ngày 15/11 để làm thủ tục lên xe.',
          passengerNames: ['Trần Minh Trí', 'Nguyễn Thị Thu Hà']
        }
      }
    ],
    totalOriginalAmount: 5140000,
    appliedCampaignIds: ['camp_vip10'],
    campaignDiscountTotal: 300000,
    pointsRedeemed: 40000, // 40,000 điểm Quà Tặng VIP
    finalPaidAmount: 4800000,
    paymentMethod: 'mwg_paylater',
    paymentStatus: 'paid',
    overallStatus: 'confirmed',
    rewardVoucherEarned: {
      code: 'DMX-GIFT-100K-9921',
      amount: 100000,
      expiryDate: '2026-12-31',
      status: 'pending_issue'
    }
  },

  // 2. Đơn sắp tới (Đà Nẵng Cầu Vàng)
  {
    orderId: 'ord_danang_bana_02',
    orderNumber: 'DMX-20261025-4512',
    createdAt: '2026-10-25 09:15',
    updatedAt: '2026-10-25 09:20',
    userId: 'user_family',
    userName: 'Anh Trần Minh Trí',
    userPhone: '0908 123 456',
    subOrders: [
      {
        subOrderId: 'sub_ord_act_02',
        partnerName: 'Klook',
        category: 'activity',
        items: [
          {
            cartItemId: 'item_act_bana',
            category: 'activity',
            partnerName: 'Klook',
            title: 'Combo Cáp Treo Sun World Bà Nà Hills + Buffet Trưa',
            subtitle: '2 Người Lớn + 1 Trẻ Em',
            destinationName: 'Đà Nẵng',
            dateStart: '2026-11-20',
            quantity: 3,
            unitPrice: 1100000,
            totalPrice: 3250000,
            details: { adults: 2, children: 1 },
            eligibleForCampaignIds: ['camp_vip10', 'camp_attraction15']
          }
        ],
        subTotal: 3250000,
        discountAmount: 100000,
        totalPayable: 3150000,
        status: 'confirmed',
        partnerConfirmationCode: 'KLK-BANA-5510',
        demoTicket: {
          ticketCode: 'KLK-BANA-5510-QR',
          qrData: 'DEMO_TICKET_KLK_BANA_5510',
          instructions: 'Quét trực tiếp tại cổng cáp treo Hội An / Ga Suối Mơ từ 08:30 ngày 20/11.',
          passengerNames: ['Trần Minh Trí', 'Nguyễn Thị Thu Hà', 'Trần Bảo An']
        }
      }
    ],
    totalOriginalAmount: 3250000,
    appliedCampaignIds: ['camp_attraction15'],
    campaignDiscountTotal: 100000,
    pointsRedeemed: 0,
    finalPaidAmount: 3150000,
    paymentMethod: 'momo',
    paymentStatus: 'paid',
    overallStatus: 'confirmed'
  },

  // 3. Đơn đã hoàn thành (Nghỉ dưỡng Hội An)
  {
    orderId: 'ord_hoian_done_03',
    orderNumber: 'DMX-20260910-3321',
    createdAt: '2026-09-10 14:10',
    updatedAt: '2026-09-15 12:00',
    userId: 'user_couple',
    userName: 'Hoàng Long & Mai Anh',
    userPhone: '0977 445 566',
    subOrders: [
      {
        subOrderId: 'sub_ord_stay_03',
        partnerName: 'Traveloka',
        category: 'stay',
        items: [
          {
            cartItemId: 'item_stay_lasiesta',
            category: 'stay',
            partnerName: 'Traveloka',
            title: 'La Siesta Hoi An Resort & Spa',
            subtitle: 'Deluxe Veranda Hồ Bơi (2 đêm)',
            destinationName: 'Hội An',
            dateStart: '2026-09-12',
            dateEnd: '2026-09-14',
            quantity: 1,
            unitPrice: 3900000,
            totalPrice: 3900000,
            details: { nights: 2, adults: 2 },
            eligibleForCampaignIds: ['camp_vip10', 'camp_family200']
          }
        ],
        subTotal: 3900000,
        discountAmount: 300000,
        totalPayable: 3600000,
        status: 'confirmed',
        partnerConfirmationCode: 'TVL-HA-88219'
      }
    ],
    totalOriginalAmount: 3900000,
    appliedCampaignIds: ['camp_vip10'],
    campaignDiscountTotal: 300000,
    pointsRedeemed: 50000,
    finalPaidAmount: 3250000,
    paymentMethod: 'vnpay',
    paymentStatus: 'paid',
    overallStatus: 'completed',
    rewardVoucherEarned: {
      code: 'DMX-GIFT-100K-COMPLETED',
      amount: 100000,
      expiryDate: '2026-11-30',
      status: 'active'
    }
  },

  // 4. Đơn đã hủy & hoàn tiền demo (Chuyến công tác hoãn lịch)
  {
    orderId: 'ord_flight_refunded_04',
    orderNumber: 'DMX-20261018-7719',
    createdAt: '2026-10-18 10:00',
    updatedAt: '2026-10-19 16:20',
    userId: 'user_business',
    userName: 'Lê Quốc Hưng',
    userPhone: '0988 223 344',
    subOrders: [
      {
        subOrderId: 'sub_ord_fl_04',
        partnerName: 'Vexere',
        category: 'flight',
        items: [
          {
            cartItemId: 'item_fl_han',
            category: 'flight',
            partnerName: 'Vexere',
            title: 'Vé máy bay SGN - HAN (Vietnam Airlines)',
            subtitle: 'Chuyến VN 246 • 07:00',
            destinationName: 'Hà Nội',
            dateStart: '2026-10-22',
            quantity: 1,
            unitPrice: 1850000,
            totalPrice: 1850000,
            details: { passenger: 'Lê Quốc Hưng' },
            eligibleForCampaignIds: ['camp_vip10']
          }
        ],
        subTotal: 1850000,
        discountAmount: 150000,
        totalPayable: 1700000,
        status: 'refunded',
        partnerConfirmationCode: 'VXR-REFUND-6621'
      }
    ],
    totalOriginalAmount: 1850000,
    appliedCampaignIds: ['camp_vip10'],
    campaignDiscountTotal: 150000,
    pointsRedeemed: 0,
    finalPaidAmount: 1700000,
    paymentMethod: 'vietqr',
    paymentStatus: 'refunded',
    overallStatus: 'refunded'
  }
];
