export interface TestScenario {
  id: number;
  title: string;
  category: 'Family' | 'Couple' | 'Group' | 'Business' | 'Senior' | 'AI Planner' | 'Campaign' | 'Edge Case' | 'Event';
  initialCondition: string;
  steps: string[];
  expectedResult: string;
  postState: string;
  presetPersonaId?: string;
  presetPrompt?: string;
  presetCartItems?: any[];
}

export const TEST_SCENARIOS: TestScenario[] = [
  {
    id: 1,
    title: 'Gia đình 2 lớn, 1 bé 5 tuổi đi Đà Lạt 3N2Đ, 10 triệu',
    category: 'Family',
    initialCondition: 'Hồ sơ Anh Trần Minh Trí (Gold), ngân sách 10.000.000đ, đi cùng con nhỏ 5 tuổi.',
    steps: [
      'Mở AI Lập Hành Trình.',
      'Nhập prompt: "Đi Đà Lạt 3 ngày 2 đêm, 2 người lớn 1 bé 5 tuổi, từ TP.HCM, tổng 10 triệu, thích thiên nhiên, cần phòng có thang máy."',
      'AI tính toán 3 phương án: Tiết kiệm, Cân bằng, Thoải mái.',
      'Bấm xem chi tiết phương án Cân bằng.',
      'Bấm "Tạo giỏ & Đặt ngay".'
    ],
    expectedResult: 'AI lên lịch trình có khách sạn có thang máy (Hôtel Colline), vé xe FUTA hoặc máy bay phù hợp, tổng chi phí dưới 10 triệu, áp dụng mã VIP10 giảm 10% (tối đa 300K).',
    postState: 'Giỏ hàng có phòng gia đình và vé xe, chia tách đơn con rõ ràng.',
    presetPersonaId: 'user_family',
    presetPrompt: 'Đi Đà Lạt 3 ngày 2 đêm, 2 người lớn 1 bé 5 tuổi, từ TP.HCM, tổng 10 triệu, thích thiên nhiên và cần khách sạn có thang máy.'
  },
  {
    id: 2,
    title: 'Cặp đôi đi Hội An cuối tuần, ưu tiên yên tĩnh',
    category: 'Couple',
    initialCondition: 'Hồ sơ Hoàng Long & Mai Anh, tìm kiếm không gian lãng mạn, resort boutique.',
    steps: [
      'Chọn điểm đến Hội An.',
      'Lọc loại hình: Resort, tiêu chí "Yên tĩnh", "Cặp đôi".',
      'Chọn La Siesta Hoi An Resort & Spa.',
      'Chọn phòng Deluxe Veranda hướng hồ bơi.'
    ],
    expectedResult: 'Hiển thị resort phong cách Indochine, miễn phí xe đạp phố cổ, gợi ý show Ký ức Hội An buổi tối.',
    postState: 'Đơn lưu trú sẵn sàng thanh toán demo.',
    presetPersonaId: 'user_couple',
    presetPrompt: 'Cặp đôi muốn đi Hội An 2 ngày cuối tuần, thích không gian yên tĩnh, lãng mạn và ẩm thực phố cổ.'
  },
  {
    id: 3,
    title: 'Nhóm 6 bạn đi Nha Trang, cần chia phòng hợp lý',
    category: 'Group',
    initialCondition: 'Hồ sơ Nguyễn Tấn Đạt (6 người lớn).',
    steps: [
      'Tìm kiếm lưu trú Nha Trang cho 6 người lớn.',
      'Hệ thống tự động gợi ý: 2 phòng 3 người hoặc 3 phòng 2 giường đơn hoặc Villa.',
      'Chọn InterContinental hoặc khách sạn bãi biển.'
    ],
    expectedResult: 'Giá chia đều hiển thị rõ theo đầu người (~450K - 800K/người/đêm), đủ sức chứa cho 6 người.',
    postState: 'Giỏ hàng 2-3 phòng ghép, tính đúng phụ phí nếu có.',
    presetPersonaId: 'user_group_friends',
    presetPrompt: 'Nhóm bạn 6 người đi Nha Trang 3 ngày 2 đêm, cần khách sạn gần biển Trần Phú, chia phòng tiết kiệm.'
  },
  {
    id: 4,
    title: 'Khách công tác Hà Nội, ưu tiên gần địa điểm họp & giờ bay đẹp',
    category: 'Business',
    initialCondition: 'Hồ sơ Lê Quốc Hưng (Diamond).',
    steps: [
      'Chọn vé máy bay SGN - HAN chuyến sáng sớm 07:00 (Vietnam Airlines VN 246).',
      'Chọn Silk Path Boutique Hoàn Kiếm có bàn làm việc và hóa đơn công ty demo.',
      'Áp dụng ưu đãi hạng Diamond.'
    ],
    expectedResult: 'Vé bay đúng giờ, hành lý 23kg ký gửi, khách sạn trung tâm quận Hoàn Kiếm.',
    postState: 'Đơn combo bay + phòng công tác.',
    presetPersonaId: 'user_business',
    presetPrompt: 'Tôi cần đi công tác Hà Nội 2 ngày 1 đêm từ TP.HCM, cần bay sớm về muộn, khách sạn trung tâm gần Hồ Gươm có bàn làm việc.'
  },
  {
    id: 5,
    title: 'Khách về quê Tết, muốn vé xe và điểm đón gần nhà',
    category: 'Family',
    initialCondition: 'Hồ sơ Võ Thị Lệ Hằng.',
    steps: [
      'Vào mục Vé xe khách.',
      'Chọn tuyến TP.HCM đi Đà Lạt / Miền Trung.',
      'Chọn nhà xe Phương Trang FUTA, chọn điểm đón Ngã tư Hàng Xanh.',
      'Chọn chỗ trên sơ đồ giường nằm tầng 1.'
    ],
    expectedResult: 'Sơ đồ chỗ ngồi hiển thị trực quan giường trống/đã đặt, xác nhận điểm đón trả cụ thể.',
    postState: 'Vé xe demo có số giường và giờ xe lăn bánh.',
    presetPersonaId: 'user_tet_home'
  },
  {
    id: 6,
    title: 'Người lớn tuổi, hạn chế đi bộ, ưu tiên lịch nhẹ và thang máy',
    category: 'Senior',
    initialCondition: 'Hồ sơ Bác Nguyễn Văn An (68 tuổi).',
    steps: [
      'Nhập prompt AI hoặc bộ lọc: "người lớn tuổi, hạn chế đi bộ, cần thang máy".',
      'AI loại bỏ các tour leo dốc hoặc trekking nhiều.',
      'Ưu tiên nghỉ dưỡng nhẹ nhàng, xe đưa đón tận nơi.'
    ],
    expectedResult: 'Lịch trình có thời gian nghỉ trưa dài, khách sạn 100% có thang máy, dịch vụ xe điện.',
    postState: 'Hành trình nghỉ dưỡng thảnh thơi.',
    presetPersonaId: 'user_senior',
    presetPrompt: 'Hai bác lớn tuổi đi nghỉ dưỡng Đà Lạt 3 ngày, đi lại chậm, không leo dốc, cần khách sạn có thang máy và bữa sáng tại chỗ.'
  },
  {
    id: 7,
    title: 'Gia đình có em bé, cần phòng nôi và phương tiện phù hợp',
    category: 'Family',
    initialCondition: 'Gia đình có bé dưới 2 tuổi.',
    steps: [
      'Chọn chuyến bay có em bé (infant giá 10%).',
      'Chọn resort Vinpearl Phú Quốc có nôi em bé miễn phí và dịch vụ đưa đón.',
      'Kiểm tra chính sách miễn phí vé vào cổng dưới 1m.'
    ],
    expectedResult: 'Vé máy bay có suất em bé ngủ lòng mẹ, khách sạn ghi chú chuẩn bị nôi, vé khu vui chơi 0 đồng.',
    postState: 'Đơn gia đình có trẻ nhỏ hoàn chỉnh.'
  },
  {
    id: 8,
    title: 'Khách đi concert, cần phòng và di chuyển gần sân khấu',
    category: 'Event',
    initialCondition: 'Đặng Thảo My săn vé concert Hà Anh Tuấn tại Đà Nẵng.',
    steps: [
      'Chọn sự kiện Concert Hà Anh Tuấn "Chân Trời Rực Rỡ 2026".',
      'Chọn hạng vé VIP - Rực Rỡ (2.400.000đ).',
      'Hệ thống tự động đề xuất khách sạn cách Cung Tuyên Sơn dưới 2km (Novotel / Sala Danang).'
    ],
    expectedResult: 'Combo vé concert + khách sạn lân cận, giữ chỗ mô phỏng 10 phút.',
    postState: 'Mã vé demo có barcode định danh và thẻ sự kiện.',
    presetPersonaId: 'user_concert_fan'
  },
  {
    id: 9,
    title: 'Khách chỉ đặt phòng, không dùng AI',
    category: 'Edge Case',
    initialCondition: 'Khách tự tìm kiếm truyền thống.',
    steps: [
      'Tại trang Khám phá, bấm tab "Khách sạn & Resort".',
      'Nhập điểm đến Đà Nẵng, ngày 10/11 - 12/11.',
      'Lọc 4-5 sao, có ăn sáng.',
      'Chọn Sala Danang Beach Hotel, bấm Đặt ngay.'
    ],
    expectedResult: 'Luồng đặt phòng chạy độc lập hoàn toàn, không bắt buộc qua AI, tính đúng giá và ưu đãi.',
    postState: 'Đơn đặt phòng nhanh thành công.'
  },
  {
    id: 10,
    title: 'Khách chỉ mua vé tham quan trong ngày',
    category: 'Edge Case',
    initialCondition: 'Khách du lịch tự túc đã có phòng, cần mua vé Bà Nà Hills.',
    steps: [
      'Vào mục Vé tham quan.',
      'Chọn Cáp treo Sun World Bà Nà Hills & Cầu Vàng.',
      'Chọn 2 vé người lớn + 1 vé trẻ em.',
      'Thanh toán giả lập.'
    ],
    expectedResult: 'Nhận ngay vé điện tử kèm mã QR demo quét qua cổng cáp treo.',
    postState: 'Vé tham quan điện tử xuất hiện trong "Chuyến đi của tôi".'
  },
  {
    id: 11,
    title: 'Khách đã có vé máy bay, nhờ AI bổ sung phòng và vui chơi',
    category: 'AI Planner',
    initialCondition: 'Khách đã tự mua vé bay đến Phú Quốc.',
    steps: [
      'Chat với AI: "Tôi đã có vé bay đến Phú Quốc ngày 15/11 đến 18/11, nhờ gợi ý khách sạn 5 sao gần biển và vé vui chơi."',
      'AI nhận diện ngày và điểm đến, không hỏi lại phương tiện.',
      'AI đề xuất Vinpearl Resort & Spa + Combo VinWonders/Safari.'
    ],
    expectedResult: 'Lịch trình chỉ tập trung vào lưu trú và trải nghiệm tại điểm đến, không trùng lặp chi phí máy bay.',
    postState: 'Giỏ hàng gồm phòng nghỉ và vé vui chơi.'
  },
  {
    id: 12,
    title: 'Khách chưa biết đi đâu, chỉ có ngân sách 5 triệu cho 2 người',
    category: 'AI Planner',
    initialCondition: 'Khách có ngân sách cố định 5.000.000đ nhưng chưa chọn điểm đến.',
    steps: [
      'Chat với AI: "Hai vợ chồng có 5 triệu muốn đi chơi 2 ngày cuối tuần từ Sài Gòn, gợi ý điểm đến phù hợp."',
      'AI phân tích khoảng cách và ngân sách: đề xuất Vũng Tàu (đi xe Hoa Mai) hoặc Đà Lạt (đi xe FUTA).',
      'Khách chọn Vũng Tàu.'
    ],
    expectedResult: 'AI lập lịch trình Marina Bay Vung Tau + xe Limousine với tổng chi phí đúng 4.800.000đ.',
    postState: 'Phương án trong ngân sách được chọn.'
  },
  {
    id: 13,
    title: 'Khách yêu cầu vượt khả năng ngân sách (2 triệu đi Phú Quốc 3N2Đ ở 5 sao)',
    category: 'Edge Case',
    initialCondition: 'Yêu cầu không khả thi về mặt ngân sách.',
    steps: [
      'Chat với AI: "Đi Phú Quốc 3 ngày 2 đêm, ở resort 5 sao, ngân sách 2 triệu cho 2 người."',
      'AI kiểm tra catalog và phát hiện phòng 5 sao tối thiểu 2.450.000đ/đêm chưa tính vé bay.'
    ],
    expectedResult: 'AI giải thích lịch sự và đưa 2 lựa chọn điều chỉnh: hoặc tăng ngân sách lên ~6 triệu, hoặc đổi sang homestay/khách sạn 3 sao, hoặc đổi điểm đến gần hơn.',
    postState: 'AI không tự động tăng ngân sách mà không hỏi ý kiến khách.'
  },
  {
    id: 14,
    title: 'Khách đổi ngày khi đã có kế hoạch sẵn',
    category: 'AI Planner',
    initialCondition: 'Đã có lịch trình mẫu 10/11 - 12/11.',
    steps: [
      'Chat với AI: "Đổi sang tuần sau (17/11 - 19/11) giúp tôi."',
      'AI kiểm tra lại tình trạng phòng và giá vé theo khung ngày mới.',
      'Hiển thị chênh lệch giá (nếu có) và cập nhật ngày toàn bộ các mục.'
    ],
    expectedResult: 'Tất cả các dịch vụ trong lịch trình đồng loạt chuyển sang ngày mới, có nút "Hoàn tác".',
    postState: 'Lịch trình ngày mới được cập nhật.'
  },
  {
    id: 15,
    title: 'Khách thêm/bớt người trong nhóm',
    category: 'AI Planner',
    initialCondition: 'Kế hoạch ban đầu cho 2 người lớn.',
    steps: [
      'Chat với AI: "Thêm một người lớn đi cùng nhé."',
      'AI tính lại: số vé xe/bay tăng lên 3, phòng khách sạn chuyển từ giường King sang phòng Family hoặc kê giường phụ.'
    ],
    expectedResult: 'Hiển thị delta giá cụ thể: "+1.450.000đ do thêm 1 vé và phụ thu giường phụ".',
    postState: 'Giỏ dịch vụ đồng bộ cho 3 người lớn.'
  },
  {
    id: 16,
    title: 'Khách đổi phương tiện (từ Xe khách sang Máy bay)',
    category: 'AI Planner',
    initialCondition: 'Lịch trình Đà Lạt đang đi xe khách Phương Trang (640K khứ hồi).',
    steps: [
      'Chat với AI: "Chuyển sang đi máy bay cho nhanh."',
      'AI tìm chuyến bay SGN - DLI (VN 1380).',
      'Thay thế mục xe khách trong giỏ hàng bằng vé máy bay.'
    ],
    expectedResult: 'Thời gian di chuyển rút ngắn từ 6h30 xuống 55 phút, chi phí hiển thị chênh lệch rõ ràng (+1.320.000đ).',
    postState: 'Lịch trình được cập nhật phương tiện hàng không.'
  },
  {
    id: 17,
    title: 'Khách cần điều kiện hủy linh hoạt',
    category: 'Edge Case',
    initialCondition: 'Khách lo ngại có việc đột xuất.',
    steps: [
      'Bật bộ lọc "Hủy miễn phí".',
      'Chọn các cơ sở lưu trú và tour có cờ miễn phí hủy trước 48h - 72h.',
      'Xem kỹ điều khoản hoàn tiền trong bảng chi tiết trước khi đặt.'
    ],
    expectedResult: 'Chỉ các sản phẩm có "Miễn phí hủy" hiển thị huy hiệu xanh lá, thông tin hoàn tiền minh bạch.',
    postState: 'Đơn hàng an toàn với chính sách hoàn hủy rõ ràng.'
  },
  {
    id: 18,
    title: 'Khách không có kết quả theo bộ lọc quá hẹp',
    category: 'Edge Case',
    initialCondition: 'Lọc khách sạn 5 sao, giá dưới 500.000đ tại Đà Lạt.',
    steps: [
      'Đặt bộ lọc mâu thuẫn.',
      'Hệ thống hiển thị màn hình Empty State thân thiện.'
    ],
    expectedResult: 'Hiển thị thông báo "Không tìm thấy cơ sở lưu trú phù hợp", gợi ý nút "Nới lỏng bộ lọc" hoặc "Xem khách sạn 3-4 sao tương đương".',
    postState: 'Không bị trắng trang hoặc crash.'
  },
  {
    id: 19,
    title: 'Khách quay lại bản nháp sau khi tải lại trang (Persistence)',
    category: 'Edge Case',
    initialCondition: 'Khách đang chọn dở phòng và lịch trình, vô tình F5 reload hoặc đóng tab.',
    steps: [
      'Thêm dịch vụ vào giỏ hàng.',
      'F5 làm mới trình duyệt.',
      'Vào lại trang chủ Quà Tặng VIP hoặc Mini App.'
    ],
    expectedResult: 'Thẻ "Tiếp tục kế hoạch dở dang" xuất hiện trên trang chủ, giỏ hàng vẫn giữ nguyên các mục đã chọn.',
    postState: 'Dữ liệu lưu trữ an toàn trong LocalStorage demo.'
  },
  {
    id: 20,
    title: 'Khách đặt tiếp dịch vụ còn thiếu trong chuyến đi hiện có',
    category: 'Family',
    initialCondition: 'Khách đã có đơn đặt phòng Hôtel Colline Đà Lạt.',
    steps: [
      'Mở tab "Chuyến đi của tôi".',
      'Bấm vào chuyến đi Đà Lạt sắp tới.',
      'Bấm nút "Đặt thêm vé tham quan / di chuyển cho chuyến này".'
    ],
    expectedResult: 'Hệ thống tự động điền sẵn điểm đến là Đà Lạt và khoảng thời gian 15/11 - 17/11 của chuyến đi.',
    postState: 'Mua kèm thuận tiện chỉ với 1 chạm.'
  },
  {
    id: 21,
    title: 'Khách muốn dùng mã giảm nhưng không đủ điều kiện',
    category: 'Campaign',
    initialCondition: 'Đơn hàng 850.000đ nhưng áp dụng mã VIP10 (yêu cầu tối thiểu 1.000.000đ).',
    steps: [
      'Tại màn hình Giỏ hàng / Thanh toán, chọn mã VIP10.',
      'Hệ thống kiểm tra điều kiện áp dụng.'
    ],
    expectedResult: 'Mã hiển thị trạng thái mờ với ghi chú rõ ràng: "Đơn hàng còn thiếu 150.000đ để được giảm 10% (tối đa 300K)".',
    postState: 'Không cho áp dụng sai quy tắc, gợi ý thêm dịch vụ.'
  },
  {
    id: 22,
    title: 'Khách có nhiều ưu đãi, cần chọn phương án tiết kiệm nhất',
    category: 'Campaign',
    initialCondition: 'Đơn hàng 2.500.000đ đủ điều kiện cho cả VIP10 (giảm 250K) và FAMILY200 (giảm 200K).',
    steps: [
      'Tại giỏ hàng, bấm nút "Chọn ưu đãi tốt nhất".',
      'Hệ thống so sánh các trường hợp cộng dồn hoặc đơn lẻ.'
    ],
    expectedResult: 'Hệ thống tự động chọn combo mang lại mức giảm cao nhất cho khách hàng và hiển thị tổng số tiền tiết kiệm được.',
    postState: 'Tối ưu quyền lợi minh bạch.'
  },
  {
    id: 23,
    title: 'Khách muốn phương án ít di chuyển dù giá cao hơn',
    category: 'AI Planner',
    initialCondition: 'Khách ưu tiên nghỉ ngơi, ngại chuyển địa điểm.',
    steps: [
      'Chat với AI: "Tôi muốn nghỉ ngơi tại chỗ, phương án ít di chuyển nhất dù đắt hơn một chút cũng được."',
      'AI điều chỉnh lịch trình: chọn resort khép kín có bãi biển riêng và nhà hàng nội khu (Vinpearl hoặc InterContinental).'
    ],
    expectedResult: 'Lịch trình tập trung trong bán kính 1km, giảm tối đa thời gian di chuyển ngoài đường.',
    postState: 'Phương án nghỉ dưỡng khép kín.'
  },
  {
    id: 24,
    title: 'Khách nhập tiếng Việt không dấu hoặc câu rất ngắn',
    category: 'AI Planner',
    initialCondition: 'Nhập text nhanh không dấu: "di da lat 3 ngay 2 nguoi tam 5tr".',
    steps: [
      'Gửi câu lệnh không dấu vào AI chat.',
      'Bộ xử lý NLP tự động chuẩn hóa và nhận diện: Điểm đến: Đà Lạt, Số ngày: 3, Số người: 2, Ngân sách: 5.000.000đ.'
    ],
    expectedResult: 'AI phản hồi chính xác bằng tiếng Việt chuẩn có dấu, xác nhận các thông tin vừa bóc tách mà không yêu cầu nhập lại.',
    postState: 'Hội thoại mượt mà, thân thiện.'
  },
  {
    id: 25,
    title: 'Khách đổi một phần và yêu cầu giữ nguyên phần đã chọn (Khóa dịch vụ)',
    category: 'AI Planner',
    initialCondition: 'Đã chọn phòng Hôtel Colline ưng ý nhưng muốn đổi vé xe sang giờ khác.',
    steps: [
      'Chat với AI: "Giữ nguyên khách sạn Colline giúp tôi, chỉ đổi vé xe sang chuyến sáng 08:00."',
      'AI giữ nguyên ID phòng và giá phòng khách sạn.',
      'Chỉ tìm kiếm và thay đổi chuyến xe FUTA sang chuyến sáng.'
    ],
    expectedResult: 'Phòng Colline không bị thay đổi, chỉ có giờ khởi hành xe và giá vé cập nhật tương ứng.',
    postState: 'Bảo toàn các lựa chọn khách đã chốt.'
  }
];
