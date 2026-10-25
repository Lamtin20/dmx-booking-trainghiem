import { ItineraryOption, DestinationId, CartItem } from '../types';
import { STAYS, TRANSPORTS, FLIGHTS, ACTIVITIES } from '../data/catalog';
import { DESTINATIONS } from '../data/destinations';

export interface ParsedUserInput {
  destinationId?: DestinationId;
  destinationName?: string;
  durationDays: number;
  adults: number;
  children: number;
  childAges: number[];
  budgetTotal?: number;
  departureCity: string;
  preferences: string[]; // 'nature', 'beach', 'relax', 'food', 'quiet', 'culture'
  constraints: {
    needsElevator?: boolean;
    lessWalking?: boolean;
    preferFlight?: boolean;
    preferBus?: boolean;
    freeCancellation?: boolean;
  };
  missingQuestions: string[];
}

export class AiPlannerEngine {
  /**
   * Bóc tách tiếng Việt tự nhiên (có dấu hoặc không dấu)
   */
  static parsePrompt(rawPrompt: string): ParsedUserInput {
    const text = rawPrompt.toLowerCase().trim();

    // 1. Nhận diện điểm đến
    let destinationId: DestinationId | undefined = undefined;
    let destinationName = '';

    const destMap: Record<string, DestinationId> = {
      'đà lạt': 'dalat', 'da lat': 'dalat', 'dalat': 'dalat',
      'đà nẵng': 'danang', 'da nang': 'danang', 'danang': 'danang',
      'hội an': 'hoian', 'hoi an': 'hoian', 'hoian': 'hoian',
      'huế': 'hue', 'hue': 'hue',
      'hà nội': 'hanoi', 'ha noi': 'hanoi', 'hanoi': 'hanoi',
      'sài gòn': 'hcm', 'tp.hcm': 'hcm', 'tphcm': 'hcm', 'hồ chí minh': 'hcm', 'ho chi minh': 'hcm',
      'phú quốc': 'phuquoc', 'phu quoc': 'phuquoc', 'phuquoc': 'phuquoc',
      'nha trang': 'nhatrang', 'nhatrang': 'nhatrang',
      'vũng tàu': 'vungtau', 'vung tau': 'vungtau', 'vungtau': 'vungtau',
      'cần thơ': 'cantho', 'can tho': 'cantho',
      'sa pa': 'sapa', 'sapa': 'sapa',
      'hạ long': 'halong', 'ha long': 'halong'
    };

    for (const [key, id] of Object.entries(destMap)) {
      if (text.includes(key)) {
        destinationId = id;
        const dObj = DESTINATIONS.find(d => d.id === id);
        destinationName = dObj ? dObj.name : key;
        break;
      }
    }

    // 2. Nhận diện số ngày
    let durationDays = 3; // Mặc định 3 ngày
    const daysMatch = text.match(/(\d+)\s*(ngày|ngay|n)/);
    if (daysMatch) {
      durationDays = parseInt(daysMatch[1], 10);
      if (durationDays < 1) durationDays = 1;
      if (durationDays > 7) durationDays = 7;
    } else if (text.includes('cuối tuần') || text.includes('cuoi tuan') || text.includes('2 ngày') || text.includes('2 ngay')) {
      durationDays = 2;
    }

    // 3. Nhận diện số người lớn & trẻ em
    let adults = 2;
    let children = 0;
    const childAges: number[] = [];

    const adultMatch = text.match(/(\d+)\s*(người lớn|nguoi lon|lớn|lon)/);
    if (adultMatch) {
      adults = parseInt(adultMatch[1], 10);
    } else {
      const generalPeopleMatch = text.match(/(\d+)\s*(người|nguoi|bạn|khách)/);
      if (generalPeopleMatch && !text.includes('bé') && !text.includes('trẻ')) {
        adults = parseInt(generalPeopleMatch[1], 10);
      }
    }

    const childMatch = text.match(/(\d+)\s*(bé|trẻ em|tre em|con|em bé)/);
    if (childMatch) {
      children = parseInt(childMatch[1], 10);
      const ageMatch = text.match(/(\d+)\s*(tuổi|t)/);
      if (ageMatch) {
        childAges.push(parseInt(ageMatch[1], 10));
      } else {
        childAges.push(5); // Default 5 tuổi
      }
    }

    // 4. Nhận diện ngân sách
    let budgetTotal: number | undefined = undefined;
    const budgetMatch = text.match(/(\d+[\.,]?\d*)\s*(triệu|trieu|tr|m)/);
    if (budgetMatch) {
      const num = parseFloat(budgetMatch[1].replace(',', '.'));
      budgetTotal = Math.round(num * 1000000);
    }

    // 5. Ràng buộc & Sở thích
    const constraints: ParsedUserInput['constraints'] = {};
    if (text.includes('thang máy') || text.includes('thang may')) constraints.needsElevator = true;
    if (text.includes('ít đi bộ') || text.includes('it di bo') || text.includes('lớn tuổi') || text.includes('nguoi lon tuoi')) constraints.lessWalking = true;
    if (text.includes('máy bay') || text.includes('may bay') || text.includes('bay')) constraints.preferFlight = true;
    if (text.includes('xe khách') || text.includes('xe khach') || text.includes('xe')) constraints.preferBus = true;
    if (text.includes('hủy') || text.includes('linh hoạt') || text.includes('huy')) constraints.freeCancellation = true;

    const preferences: string[] = [];
    if (text.includes('thiên nhiên') || text.includes('thien nhien') || text.includes('rừng') || text.includes('thông')) preferences.push('nature');
    if (text.includes('biển') || text.includes('bien')) preferences.push('beach');
    if (text.includes('yên tĩnh') || text.includes('yen tinh') || text.includes('nghỉ dưỡng')) preferences.push('quiet');
    if (text.includes('ẩm thực') || text.includes('am thuc') || text.includes('ăn')) preferences.push('food');

    // 6. Kiểm tra các câu hỏi còn thiếu
    const missingQuestions: string[] = [];
    if (!destinationId && !budgetTotal) {
      missingQuestions.push('Bạn muốn đi đến thành phố nào (Đà Lạt, Đà Nẵng, Hội An, Phú Quốc...) hoặc mức ngân sách dự kiến là bao nhiêu?');
    }

    return {
      destinationId: destinationId || 'dalat',
      destinationName: destinationName || 'Đà Lạt',
      durationDays,
      adults: Math.max(1, adults),
      children,
      childAges,
      budgetTotal,
      departureCity: 'TP. Hồ Chí Minh',
      preferences,
      constraints,
      missingQuestions
    };
  }

  /**
   * Tạo 3 phương án thực tế từ Catalog dữ liệu chuẩn
   */
  static generateItineraryOptions(parsed: ParsedUserInput): ItineraryOption[] {
    const destId = parsed.destinationId || 'dalat';
    const dest = DESTINATIONS.find(d => d.id === destId) || DESTINATIONS[0];

    // Lọc lưu trú tại điểm đến
    const availableStays = STAYS.filter(s => s.destinationId === destId);
    const budgetStay = availableStays.find(s => s.subType === 'homestay') || availableStays[0];
    const balancedStay = availableStays.find(s => s.subType === 'hotel' && s.stars >= 4) || availableStays[0];
    const luxuryStay = availableStays.find(s => s.subType === 'resort' || s.stars === 5) || availableStays[availableStays.length - 1];

    // Lọc phương tiện di chuyển
    const availableBuses = TRANSPORTS.filter(t => t.toCity.toLowerCase().includes(dest.name.toLowerCase()));
    const availableFlights = FLIGHTS.filter(f => f.toCity.toLowerCase().includes(dest.name.toLowerCase()));

    // Hoạt động tham quan
    const destActivities = ACTIVITIES.filter(a => a.destinationId === destId);
    const act1 = destActivities[0] || ACTIVITIES[0];
    const act2 = destActivities[1] || destActivities[0] || ACTIVITIES[1];

    // Số đêm = số ngày - 1 (tối thiểu 1 đêm)
    const nights = Math.max(1, parsed.durationDays - 1);

    // ==========================================
    // OPTION 1: TIẾT KIỆM HƠN (Budget)
    // ==========================================
    const opt1StayRoom = budgetStay.rooms[0];
    const opt1StayCost = opt1StayRoom.pricePerNight * nights;
    const opt1TransCost = (availableBuses[0] ? availableBuses[0].pricePerTicket * 2 : 400000) * parsed.adults;
    const opt1ActCost = act1 ? act1.options[0].price * parsed.adults : 300000;
    const opt1Bookable = opt1StayCost + opt1TransCost + opt1ActCost;
    const opt1Outside = 400000 * parsed.durationDays * (parsed.adults + parsed.children * 0.5);
    const opt1Total = opt1Bookable + opt1Outside;

    const option1: ItineraryOption = {
      id: 'budget',
      name: 'Tiết kiệm hơn',
      tagline: 'Tối ưu chi phí, lưu trú ấm cúng & di chuyển xe giường nằm',
      estimatedTotalCost: Math.round(opt1Total),
      bookableServicesCost: opt1Bookable,
      outsideExpensesEstimate: Math.round(opt1Outside),
      applicableSavings: 150000,
      tradeOffSummary: 'Tiết kiệm khoảng 35% chi phí so với gói tiêu chuẩn; di chuyển bằng xe khách giường nằm qua đêm.',
      stayChoice: {
        stayId: budgetStay.id,
        name: budgetStay.name,
        roomName: opt1StayRoom.name,
        pricePerNight: opt1StayRoom.pricePerNight,
        rating: budgetStay.rating
      },
      transportChoice: {
        type: 'bus',
        operator: availableBuses[0] ? availableBuses[0].operator : 'Phương Trang (FUTA)',
        costPerPerson: availableBuses[0] ? availableBuses[0].pricePerTicket : 320000,
        departureTime: availableBuses[0] ? availableBuses[0].departureTime : '23:00'
      },
      activities: [
        { activityId: act1.id, name: act1.name, cost: act1.options[0].price * parsed.adults }
      ],
      days: this.buildDaysSchedule(dest.name, parsed.durationDays, budgetStay.name, act1.name, 'budget')
    };

    // ==========================================
    // OPTION 2: CÂN BẰNG (Balanced - Khuyên Dùng)
    // ==========================================
    const opt2StayRoom = balancedStay.rooms.find(r => r.maxAdults >= parsed.adults) || balancedStay.rooms[0];
    const opt2StayCost = opt2StayRoom.pricePerNight * nights;
    const opt2TransCost = (availableBuses[0] ? availableBuses[0].pricePerTicket * 2 : 640000) * parsed.adults;
    const opt2ActCost = (act1.options[0].price + (act2 ? act2.options[0].price : 0)) * parsed.adults;
    const opt2Bookable = opt2StayCost + opt2TransCost + opt2ActCost;
    const opt2Outside = 600000 * parsed.durationDays * (parsed.adults + parsed.children * 0.5);
    const opt2Total = opt2Bookable + opt2Outside;

    const option2: ItineraryOption = {
      id: 'balanced',
      name: 'Cân bằng (Khuyên dùng)',
      tagline: 'Khách sạn 4 sao trung tâm có thang máy, lịch trình thoải mái có giờ nghỉ ngơi',
      estimatedTotalCost: Math.round(opt2Total),
      bookableServicesCost: opt2Bookable,
      outsideExpensesEstimate: Math.round(opt2Outside),
      applicableSavings: 300000,
      tradeOffSummary: 'Tỉ lệ hài lòng cao nhất: Khách sạn tiện nghi đầy đủ có thang máy, bao gồm ăn sáng buffet và các điểm tham quan biểu tượng.',
      stayChoice: {
        stayId: balancedStay.id,
        name: balancedStay.name,
        roomName: opt2StayRoom.name,
        pricePerNight: opt2StayRoom.pricePerNight,
        rating: balancedStay.rating
      },
      transportChoice: {
        type: 'bus',
        operator: 'Phương Trang (FUTA) Limousine VIP',
        costPerPerson: 320000,
        departureTime: '08:00'
      },
      activities: [
        { activityId: act1.id, name: act1.name, cost: act1.options[0].price * parsed.adults },
        ...(act2 ? [{ activityId: act2.id, name: act2.name, cost: act2.options[0].price * parsed.adults }] : [])
      ],
      days: this.buildDaysSchedule(dest.name, parsed.durationDays, balancedStay.name, act1.name, 'balanced')
    };

    // ==========================================
    // OPTION 3: THOẢI MÁI HƠN (Luxury / Flight)
    // ==========================================
    const opt3StayRoom = luxuryStay.rooms[0];
    const opt3StayCost = opt3StayRoom.pricePerNight * nights;
    const opt3FlightCost = (availableFlights[0] ? availableFlights[0].pricePerAdult * 2 : 2400000) * parsed.adults;
    const opt3ActCost = (act1.options[0].price + (act2 ? act2.options[0].price : 500000)) * parsed.adults;
    const opt3Bookable = opt3StayCost + opt3FlightCost + opt3ActCost;
    const opt3Outside = 1000000 * parsed.durationDays * (parsed.adults + parsed.children * 0.5);
    const opt3Total = opt3Bookable + opt3Outside;

    const option3: ItineraryOption = {
      id: 'luxury',
      name: 'Thoải mái hơn',
      tagline: 'Resort 5 sao cao cấp, bay Vietnam Airlines, trải nghiệm tối đa',
      estimatedTotalCost: Math.round(opt3Total),
      bookableServicesCost: opt3Bookable,
      outsideExpensesEstimate: Math.round(opt3Outside),
      applicableSavings: 450000,
      tradeOffSummary: 'Tiết kiệm thời gian di chuyển bằng máy bay, tận hưởng không gian nghỉ dưỡng biệt lập và dịch vụ cao cấp.',
      stayChoice: {
        stayId: luxuryStay.id,
        name: luxuryStay.name,
        roomName: opt3StayRoom.name,
        pricePerNight: opt3StayRoom.pricePerNight,
        rating: luxuryStay.rating
      },
      transportChoice: {
        type: 'flight',
        operator: availableFlights[0] ? availableFlights[0].airline : 'Vietnam Airlines',
        costPerPerson: availableFlights[0] ? availableFlights[0].pricePerAdult : 1250000,
        departureTime: availableFlights[0] ? availableFlights[0].departureTime : '07:30'
      },
      activities: [
        { activityId: act1.id, name: act1.name, cost: act1.options[0].price * parsed.adults },
        ...(act2 ? [{ activityId: act2.id, name: act2.name, cost: act2.options[0].price * parsed.adults }] : [])
      ],
      days: this.buildDaysSchedule(dest.name, parsed.durationDays, luxuryStay.name, act1.name, 'luxury')
    };

    return [option1, option2, option3];
  }

  private static buildDaysSchedule(
    destName: string,
    daysCount: number,
    hotelName: string,
    activityName: string,
    themeLevel: 'budget' | 'balanced' | 'luxury'
  ) {
    const days = [];

    // Ngày 1
    days.push({
      dayNumber: 1,
      date: 'Ngày 1 (15/11)',
      theme: `Khởi hành & Check-in ${hotelName}`,
      activities: [
        {
          timeSlot: '07:30 - 11:30',
          type: 'bus_train' as const,
          title: `Di chuyển đến ${destName}`,
          description: 'Xe đón tại điểm hẹn, dừng nghỉ chân uống nước & ngắm cảnh trên đường.',
          location: `Tuyến đường đến ${destName}`,
          estimatedCost: 0,
          isBookable: true
        },
        {
          timeSlot: '12:00 - 13:30',
          type: 'dining' as const,
          title: 'Thưởng thức bữa trưa đặc sản địa phương',
          description: 'Ẩm thực truyền thống nóng hổi, hương vị đậm đà xứ sở.',
          location: `Trung tâm ${destName}`,
          estimatedCost: 150000,
          isBookable: false
        },
        {
          timeSlot: '14:00 - 15:30',
          type: 'stay' as const,
          title: `Nhận phòng tại ${hotelName}`,
          description: 'Làm thủ tục nhận phòng, gửi hành lý và nghỉ ngơi phục hồi thể lực sau chặng đường dài.',
          location: hotelName,
          estimatedCost: 0,
          isBookable: true
        },
        {
          timeSlot: '16:00 - 18:30',
          type: 'activity' as const,
          title: 'Dạo phố & Cà phê hoàng hôn',
          description: 'Tản bộ ngắm cảnh hoàng hôn, check-in không gian thoáng đãng.',
          location: 'Khu vực hồ / bãi biển',
          estimatedCost: 80000,
          isBookable: false
        },
        {
          timeSlot: '19:00 - 21:30',
          type: 'dining' as const,
          title: 'Dạo phố ẩm thực & Khám phá chợ đêm',
          description: 'Thưởng thức các món ngon đường phố, mua sắm đồ lưu niệm địa phương.',
          location: 'Chợ đêm trung tâm',
          estimatedCost: 200000,
          isBookable: false
        }
      ]
    });

    // Ngày 2
    if (daysCount >= 2) {
      days.push({
        dayNumber: 2,
        date: 'Ngày 2 (16/11)',
        theme: `Trải nghiệm biểu tượng: ${activityName}`,
        activities: [
          {
            timeSlot: '07:00 - 08:30',
            type: 'dining' as const,
            title: `Buffet sáng tại ${hotelName}`,
            description: 'Nạp năng lượng với bữa sáng buffet đa dạng tại nhà hàng khách sạn.',
            location: hotelName,
            estimatedCost: 0,
            isBookable: false
          },
          {
            timeSlot: '09:00 - 12:00',
            type: 'activity' as const,
            title: activityName,
            description: 'Tham quan các điểm nhấn hấp dẫn, vui chơi giải trí và lưu lại những bức ảnh kỷ niệm.',
            location: activityName,
            estimatedCost: 0,
            isBookable: true
          },
          {
            timeSlot: '12:30 - 14:00',
            type: 'dining' as const,
            title: 'Ăn trưa & Nghỉ ngơi',
            description: 'Thưởng thức ẩm thực và dành 1 tiếng nghỉ ngơi thư giãn (đặc biệt phù hợp trẻ em/người lớn tuổi).',
            location: 'Nhà hàng lân cận',
            estimatedCost: 180000,
            isBookable: false
          },
          {
            timeSlot: '15:00 - 17:30',
            type: 'activity' as const,
            title: 'Khám phá văn hóa & Vườn sinh thái',
            description: 'Hòa mình vào thiên nhiên trong lành, trải nghiệm nếp sống bản địa.',
            location: `Điểm sinh thái ${destName}`,
            estimatedCost: 100000,
            isBookable: false
          },
          {
            timeSlot: '18:30 - 21:00',
            type: 'dining' as const,
            title: 'Bữa tối ấm cúng cùng gia đình / người thân',
            description: 'Không gian ấm cúng, thưởng thức đặc sản nướng hoặc lẩu nóng.',
            location: 'Nhà hàng trung tâm',
            estimatedCost: 250000,
            isBookable: false
          }
        ]
      });
    }

    // Ngày 3 (nếu có)
    if (daysCount >= 3) {
      days.push({
        dayNumber: 3,
        date: 'Ngày 3 (17/11)',
        theme: `Thư giãn, Mua sắm đặc sản & Trở về`,
        activities: [
          {
            timeSlot: '08:00 - 09:30',
            type: 'dining' as const,
            title: 'Cà phê sáng & Thảnh thơi ngắm cảnh',
            description: 'Tận hưởng bầu không khí trong lành buổi sáng trước khi kết thúc chuyến đi.',
            location: 'Quán cà phê view đẹp',
            estimatedCost: 60000,
            isBookable: false
          },
          {
            timeSlot: '10:00 - 11:30',
            type: 'activity' as const,
            title: 'Mua quà lưu niệm & Đặc sản về cho người thân',
            description: 'Lựa chọn các loại đặc sản chất lượng có nguồn gốc rõ ràng.',
            location: 'Cửa hàng đặc sản uy tín',
            estimatedCost: 300000,
            isBookable: false
          },
          {
            timeSlot: '12:00 - 12:30',
            type: 'stay' as const,
            title: `Trả phòng tại ${hotelName}`,
            description: 'Hoàn tất thủ tục check-out, nhận lại tiền cọc (nếu có).',
            location: hotelName,
            estimatedCost: 0,
            isBookable: false
          },
          {
            timeSlot: '13:30 - 18:00',
            type: 'bus_train' as const,
            title: 'Lên xe / Chuyến bay trở về nhà',
            description: 'Khép lại kỳ nghỉ trọn vẹn và an toàn.',
            location: `Hành trình về lại TP.HCM`,
            estimatedCost: 0,
            isBookable: true
          }
        ]
      });
    }

    return days;
  }

  /**
   * Chuyển đổi một Lựa chọn hành trình thành các CartItem cụ thể để đưa vào Giỏ hàng
   */
  static convertOptionToCartItems(option: ItineraryOption, parsed: ParsedUserInput): CartItem[] {
    const items: CartItem[] = [];
    const nights = Math.max(1, parsed.durationDays - 1);

    // 1. Thêm phòng khách sạn
    items.push({
      cartItemId: `cart_stay_${option.stayChoice.stayId}_${Date.now()}`,
      category: 'stay',
      partnerName: 'Traveloka',
      title: option.stayChoice.name,
      subtitle: `${option.stayChoice.roomName} (${nights} đêm)`,
      destinationName: parsed.destinationName || 'Đà Lạt',
      dateStart: '2026-11-15',
      dateEnd: '2026-11-17',
      quantity: 1,
      unitPrice: option.stayChoice.pricePerNight * nights,
      totalPrice: option.stayChoice.pricePerNight * nights,
      details: {
        nights,
        adults: parsed.adults,
        children: parsed.children,
        roomName: option.stayChoice.roomName
      },
      eligibleForCampaignIds: ['camp_vip10', 'camp_family200']
    });

    // 2. Thêm phương tiện di chuyển
    const isFlight = option.transportChoice.type === 'flight';
    items.push({
      cartItemId: `cart_trans_${Date.now() + 1}`,
      category: isFlight ? 'flight' : 'bus_train',
      partnerName: isFlight ? 'Traveloka' : 'Vexere',
      title: `${option.transportChoice.operator} (${isFlight ? 'Vé máy bay khứ hồi' : 'Xe giường nằm'})`,
      subtitle: `Khởi hành ${option.transportChoice.departureTime} • ${parsed.adults} vé`,
      destinationName: parsed.destinationName || 'Đà Lạt',
      dateStart: '2026-11-15',
      timeSlot: option.transportChoice.departureTime,
      quantity: parsed.adults,
      unitPrice: option.transportChoice.costPerPerson,
      totalPrice: option.transportChoice.costPerPerson * parsed.adults,
      details: {
        adults: parsed.adults,
        operator: option.transportChoice.operator
      },
      eligibleForCampaignIds: ['camp_vip10']
    });

    // 3. Thêm các hoạt động đã chọn
    for (const act of option.activities) {
      items.push({
        cartItemId: `cart_act_${act.activityId}_${Date.now() + Math.random()}`,
        category: 'activity',
        partnerName: 'Klook',
        title: act.name,
        subtitle: `Vé tham quan trọn gói (${parsed.adults} khách)`,
        destinationName: parsed.destinationName || 'Đà Lạt',
        dateStart: '2026-11-16',
        quantity: parsed.adults,
        unitPrice: Math.round(act.cost / parsed.adults),
        totalPrice: act.cost,
        details: {
          adults: parsed.adults
        },
        eligibleForCampaignIds: ['camp_vip10', 'camp_attraction15']
      });
    }

    return items;
  }
}
