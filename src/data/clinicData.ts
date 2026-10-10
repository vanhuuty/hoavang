import { Doctor, ServiceItem, Article, Testimonial } from '../types';

export const CLINIC_INFO = {
  name: 'Phòng khám thú y HÒA VANG',
  slogan: 'Vì sức khỏe thú cưng của bạn',
  subSlogan: 'Tận tâm – Chuyên nghiệp – Đồng hành cùng thú cưng',
  address: 'Thôn Phú Sơn, Hòa Phú, Huyện Hòa Vang, TP. Đà Nẵng',
  hotline: '0935 77 87 27',
  zalo: '0935778727',
  emergencyHotline: '0935 77 87 27',
  email: 'phongkhamthuyhoavang@gmail.com',
  workingHours: '7:00 - 19:00 (Tất cả các ngày trong tuần)',
  emergencyService: 'Cấp cứu 24/7 khi gọi hotline',
  googleMapsUrl: 'https://maps.google.com/?q=Hòa+Phú,+Hòa+Vang,+Đà+Nẵng',
  facebookUrl: 'https://facebook.com',
  stats: {
    yearsExperience: '10+',
    doctorsCount: '5+',
    treatedPets: '5.000+',
    satisfactionRate: '99%',
  },
  images: {
    hero: '/src/assets/images/hero_vet_clinic_animals_1791617072923.jpg',
    storefront: '/src/assets/images/clinic_storefront_hoavang_1791617084363.jpg',
    doctorMale: '/src/assets/images/vet_doctor_male_puppy_1791617094974.jpg',
    doctorFemale: '/src/assets/images/vet_doctor_female_cat_1791617109445.jpg',
  }
};

export const DOCTORS_DATA: Doctor[] = [
  {
    id: 'dr-nguyen-van-hung',
    name: 'BS. CKI. Nguyễn Văn Hùng',
    title: 'Bác sĩ Trưởng phòng khám & Ngoại khoa',
    degree: 'Bác sĩ Thú y Chuyên khoa I - ĐH Nông Lâm TP.HCM (Hơn 12 năm kinh nghiệm)',
    specialties: ['Phẫu thuật ngoại khoa', 'Chẩn đoán hình ảnh (X-quang, Siêu âm)', 'Cấp cứu hồi sức', 'Chỉnh hình xương khớp'],
    experienceYears: 12,
    avatar: CLINIC_INFO.images.doctorMale,
    bio: 'Bác sĩ Nguyễn Văn Hùng có hơn 12 năm kinh nghiệm trong lĩnh vực khám chữa bệnh và phẫu thuật thú y. Từng tu nghiệp chuyên sâu về phẫu thuật nội soi và ngoại khoa mô mềm cho chó mèo tại Thái Lan. Với phong cách điềm tĩnh, tận tụy và luôn đặt sinh mệnh của các bé lên hàng đầu.',
    schedule: ['Thứ 2: 7:30 - 18:30', 'Thứ 3: 7:30 - 18:30', 'Thứ 4: 7:30 - 12:00', 'Thứ 5: 7:30 - 18:30', 'Thứ 7: 8:00 - 17:00'],
    casesHandled: 3400,
    rating: 4.9,
    reviewCount: 248,
    status: 'active'
  },
  {
    id: 'dr-tran-thu-ha',
    name: 'BS. ThS. Trần Thu Hà',
    title: 'Phó Trưởng phòng khám & Chuyên gia Thú nhỏ',
    degree: 'Thạc sĩ Thú y học - ĐH Nông Nghiệp Hà Nội, Chứng chỉ FELINE ADVANCE quốc tế',
    specialties: ['Chăm sóc y tế mèo chuyên sâu', 'Sản khoa & Nhi khoa thú cưng', 'Điều trị bệnh truyền nhiễm', 'Nội khoa tổng quát'],
    experienceYears: 9,
    avatar: CLINIC_INFO.images.doctorFemale,
    bio: 'Bác sĩ Trần Thu Hà đặc biệt yêu thích và nghiên cứu sâu về tâm lý học cùng các bệnh lý phức tạp ở mèo. Chị được mệnh danh là "bác sĩ dịu dàng nhất" vì luôn làm dịu những chú mèo nhút nhát hoặc kích động nhất trong quá trình thăm khám.',
    schedule: ['Thứ 2: 8:00 - 18:30', 'Thứ 4: 8:00 - 18:30', 'Thứ 5: 8:00 - 18:30', 'Thứ 6: 8:00 - 18:30', 'Chủ nhật: 8:00 - 17:00'],
    casesHandled: 2850,
    rating: 5.0,
    reviewCount: 312,
    status: 'active'
  },
  {
    id: 'dr-le-minh-tri',
    name: 'BS. Lê Minh Trí',
    title: 'Bác sĩ Chuyên khoa Da liễu & Dinh dưỡng Thú y',
    degree: 'Bác sĩ Thú y chính quy - Đại học Cần Thơ, Chứng nhận Da liễu Thú nhỏ Asian Vet',
    specialties: ['Da liễu - Nấm - Ký sinh trùng', 'Tư vấn phác đồ dinh dưỡng trị liệu', 'Khám lâm sàng tổng quát', 'Nha khoa lấy cao răng thú cưng'],
    experienceYears: 6,
    avatar: CLINIC_INFO.images.doctorMale,
    bio: 'Bác sĩ Lê Minh Trí chuyên điều trị các ca viêm da cơ địa dai dẳng, viêm da Demodex, nấm móng và các vấn đề về đường tiêu hóa mãn tính ở chó cảnh. Bác sĩ xây dựng phác đồ kết hợp dinh dưỡng tự nhiên và thuốc an toàn cho gan thận.',
    schedule: ['Thứ 3: 7:30 - 18:30', 'Thứ 4: 7:30 - 18:30', 'Thứ 6: 7:30 - 18:30', 'Thứ 7: 8:00 - 18:00', 'Chủ nhật: 8:00 - 16:30'],
    casesHandled: 1650,
    rating: 4.8,
    reviewCount: 176,
    status: 'active'
  },
  {
    id: 'dr-pham-hoang-anh',
    name: 'BS. Phạm Hoàng Anh',
    title: 'Bác sĩ Tiêm chủng, Chẩn đoán Xét nghiệm & Y tế Dự phòng',
    degree: 'Bác sĩ Thú y - ĐH Nông Lâm TP.HCM, Chứng nhận Quản lý Dược Thú y',
    specialties: ['Tiêm phòng vaccine theo chuẩn WSAVA', 'Xét nghiệm máu & Sinh hóa', 'Tẩy giun & Phòng ngừa ve rận', 'Spa y tế trị liệu da lông'],
    experienceYears: 5,
    avatar: CLINIC_INFO.images.doctorFemale,
    bio: 'Bác sĩ phụ trách chính quy trình tiêm chủng an toàn, theo dõi phản ứng sau tiêm và xét nghiệm sinh hóa máu tự động. Luôn nhiệt tình hướng dẫn sổ theo dõi sức khỏe điện tử và nhắc lịch tiêm ngừa định kỳ cho chủ nuôi.',
    schedule: ['Thứ 2: 7:30 - 18:00', 'Thứ 3: 7:30 - 18:00', 'Thứ 5: 7:30 - 18:00', 'Thứ 6: 7:30 - 18:00', 'Thứ 7: 7:30 - 18:00'],
    casesHandled: 1420,
    rating: 4.9,
    reviewCount: 145,
    status: 'active'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'kham-dieu-tri',
    title: 'Khám bệnh & Điều trị',
    shortDesc: 'Chẩn đoán chính xác - Điều trị hiệu quả với máy siêu âm, xét nghiệm hiện đại',
    iconName: 'Stethoscope',
    category: 'kham',
    priceRange: '100.000đ - 250.000đ / lượt',
    duration: '20 - 45 phút',
    fullDescription: 'Khám lâm sàng toàn diện các hệ cơ quan (tai mũi họng, hô hấp, tuần hoàn, tiêu hóa, tiết niệu). Kết hợp máy xét nghiệm sinh lý máu 18 thông số, máy sinh hóa tự động và siêu âm màu Doppler để phát hiện sớm các bệnh lý tiềm ẩn.',
    features: [
      'Khám lâm sàng kỹ lưỡng từng bộ phận',
      'Đo thân nhiệt, nghe tim phổi, kiểm tra niêm mạc',
      'Kê đơn thuốc chuẩn liều lượng theo thể trọng',
      'Theo dõi tiến triển bệnh định kỳ qua Zalo/Điện thoại'
    ],
    image: CLINIC_INFO.images.doctorMale
  },
  {
    id: 'tiem-phong',
    title: 'Tiêm phòng Vaccine',
    shortDesc: 'Phòng bệnh tốt nhất cho thú cưng với vaccine chính hãng chuẩn WSAVA',
    iconName: 'Syringe',
    category: 'tiemphong',
    priceRange: '120.000đ - 250.000đ / mũi',
    duration: '15 - 20 phút',
    fullDescription: 'Tiêm phòng đầy đủ các loại vaccine 5 bệnh, 7 bệnh cho chó (Care, Parvo, Viêm gan, Ho cũi chó...), vaccine 4 bệnh cho mèo (Giảm bạch cầu, Viêm mũi khí quản, Calicivirus, Chlamydia) và vaccine Dại Rabisin có chứng nhận.',
    features: [
      'Vaccine chính hãng nhập khẩu từ Pháp, Mỹ, Hà Lan',
      'Bảo quản nghiêm ngặt trong tủ chuyên dụng 2-8°C',
      'Cấp sổ theo dõi sức khỏe và dán tem vaccine chính hãng',
      'Hệ thống tự động nhắc lịch tiêm nhắc lại hàng năm'
    ],
    image: CLINIC_INFO.images.hero
  },
  {
    id: 'nha-thuoc-thu-y',
    title: 'Nhà thuốc thú y',
    shortDesc: 'Thuốc chính hãng - Đầy đủ chủng loại thuốc đặc trị, kháng sinh, bổ trợ',
    iconName: 'Pill',
    category: 'thuoc',
    priceRange: 'Theo giá niêm yết',
    duration: 'Mua trực tiếp hoặc tư vấn',
    fullDescription: 'Cung cấp đầy đủ các loại thuốc thú y được Cục Thú Y cấp phép lưu hành: thuốc nhỏ gáy trị ve rận (Bravecto, Nexgard, Revolution), thuốc tẩy giun (Drontal, Endogard), kháng sinh đặc trị, vitamin tăng đề kháng và sữa dinh dưỡng cho chó mèo con.',
    features: [
      '100% thuốc có nguồn gốc rõ ràng, date mới',
      'Bác sĩ tư vấn liều dùng an toàn tuyệt đối',
      'Sản phẩm đặc trị viêm da, nấm, viêm tai',
      'Thức ăn dinh dưỡng và thức ăn hạt chức năng theo bệnh lý'
    ],
    image: CLINIC_INFO.images.storefront
  },
  {
    id: 'spa-lam-dep',
    title: 'Spa & Làm đẹp',
    shortDesc: 'Giữ thú cưng luôn sạch sẽ, thơm mát, khử mùi và cắt tỉa lông tạo kiểu',
    iconName: 'Scissors',
    category: 'spa',
    priceRange: '120.000đ - 350.000đ / lần',
    duration: '60 - 90 phút',
    fullDescription: 'Quy trình vệ sinh 7 bước chuẩn spa: Tắm sữa tắm chuyên dụng theo màu lông/da, vắt tuyến hôi, sấy chải bông lông, vệ sinh nhổ lông tai, cắt mài móng chân, cạo lông đệm chân và cắt tỉa form dáng xinh xắn.',
    features: [
      'Sữa tắm thảo dược dưỡng ẩm, chống rụng lông',
      'Kỹ thuật viên thao tác nhẹ nhàng, không gây sợ hãi',
      'Máy sấy êm ái, bồn tắm sục massage',
      'Tặng xịt tinh dầu khử khuẩn giữ hương thơm lâu dài'
    ],
    image: CLINIC_INFO.images.doctorFemale
  },
  {
    id: 'luu-tru-noi-tru',
    title: 'Lưu trú nội trú',
    shortDesc: 'Nội trú an toàn - Chăm sóc tận tâm, phòng riêng thoáng mát có điều hòa',
    iconName: 'Home',
    category: 'luutru',
    priceRange: '80.000đ - 180.000đ / ngày',
    duration: 'Theo số ngày lưu trú',
    fullDescription: 'Khu lưu trú khách sạn thú cưng sạch sẽ, tách biệt khu chó và mèo. Phòng ốc khử trùng tia UV hàng ngày, nhiệt độ điều hòa mát mẻ 25°C, chế độ ăn theo khẩu phần chất lượng cao và có nhân viên theo dõi 24/7.',
    features: [
      'Chuồng inox 304 cao cấp, lót nệm êm ái tiệt trùng',
      'Gửi video/hình ảnh cập nhật cho chủ nuôi mỗi ngày',
      'Chế độ ăn 2-3 bữa theo yêu cầu dinh dưỡng',
      'Được vận động, dạo chơi trong khu vực an toàn'
    ],
    image: CLINIC_INFO.images.storefront
  },
  {
    id: 'phau-thuat-ngoai-khoa',
    title: 'Phẫu thuật ngoại khoa',
    shortDesc: 'Triệt sản thẩm mỹ, mổ đẻ, phẫu thuật gãy xương, mổ u trong phòng mổ vô trùng',
    iconName: 'Activity',
    category: 'phauthuat',
    priceRange: '350.000đ - 2.500.000đ',
    duration: '45 - 120 phút',
    fullDescription: 'Trang bị phòng mổ áp lực dương vô khuẩn, máy gây mê bay hơi Isoflurane an toàn cao, monitor theo dõi nhịp tim/spO2 liên tục trong suốt ca mổ. Kỹ thuật khâu thẩm mỹ giấu chỉ, nhanh liền vết mổ.',
    features: [
      'Hệ thống gây mê khí dung tiên tiến giảm thiểu rủi ro',
      'Phẫu thuật triệt sản chó đực/cái, mèo đực/cái đường mổ nhỏ',
      'Khâu chỉ tự tiêu thẩm mỹ, không cần tháo chỉ',
      'Hậu phẫu chu đáo, cấp áo chống liếm và kháng sinh'
    ],
    image: CLINIC_INFO.images.doctorMale
  }
];

export const ARTICLES_DATA: Article[] = [
  {
    id: 'bai-viet-1',
    title: '5 cách chăm sóc thú cưng trong mùa nắng nóng miền Trung',
    slug: '5-cach-cham-soc-thu-cung-trong-mua-nang-nong',
    summary: 'Thời tiết nắng gắt mùa hè tại Đà Nẵng dễ khiến chó mèo bị sốc nhiệt, say nắng và mất nước nghiêm trọng. Dưới đây là những biện pháp cấp thiết bảo vệ thú cưng.',
    content: [
      'Đà Nẵng và khu vực miền Trung bước vào những đợt nắng nóng gay gắt trên 38°C. Chó mèo không có tuyến mồ hôi toàn thân như con người (chúng chỉ thoát nhiệt qua gan bàn chân và thở dốc), do đó thân nhiệt tăng rất nhanh nếu ở ngoài trời hoặc phòng kín.',
      '1. Đảm bảo nguồn nước mát sạch liên tục: Luôn để nhiều bát nước mát tại các góc trong nhà, có thể thả vài viên đá lạnh để nước giữ nhiệt độ mát mẻ.',
      '2. Tránh dắt chó đi dạo vào các khung giờ cao điểm nắng (từ 10:00 sáng đến 16:30 chiều). Mặt đường nhựa và bê tông hấp thụ nhiệt có thể làm bỏng rát đệm chân thú cưng.',
      '3. Không cạo trọc lông thú cưng: Lớp lông thực chất là tấm khiên cách nhiệt tự nhiên chống lại tia UV mặt trời. Cạo sát da sẽ khiến da dễ bị cháy nắng và muỗi cắn. Chỉ nên tỉa bớt lông quanh bụng và gan bàn chân.',
      '4. Nhận biết dấu hiệu sốc nhiệt (Heatstroke): Thở dốc dữ dội, lưỡi đỏ tía hoặc tím tái, chảy nhiều dãi dính, đi đứng loạng choạng hoặc hôn mê. Cần lập tức đưa vào chỗ mát, lau khăn ướt lên bụng, bẹn và gọi hotline thú y Hòa Vang ngay.',
      '5. Tạo không gian thông thoáng: Cho bé nghỉ trong phòng thoáng gió, bật quạt hoặc điều hòa chế độ mát dịu (26-28°C).'
    ],
    category: 'Chăm sóc thú cưng',
    publishDate: '12/06/2025',
    authorName: 'BS. CKI. Nguyễn Văn Hùng',
    authorTitle: 'Trưởng phòng khám',
    authorAvatar: CLINIC_INFO.images.doctorMale,
    readTime: '4 phút đọc',
    views: 1420,
    image: CLINIC_INFO.images.hero,
    tags: ['Chăm sóc mùa hè', 'Sốc nhiệt', 'Chó mèo', 'Hòa Vang']
  },
  {
    id: 'bai-viet-2',
    title: 'Tiêm phòng cho chó mèo: Lịch tiêm chuẩn và vì sao lại quan trọng?',
    slug: 'tiem-phong-cho-cho-meo-vi-sao-lai-quan-trong',
    summary: 'Vaccine là tấm khiên vững chắc nhất bảo vệ thú cưng khỏi các căn bệnh nguy hiểm chết người như Parvo, Care hay Bệnh dại. Lịch tiêm chủng chi tiết theo tháng tuổi.',
    content: [
      'Rất nhiều chủ nuôi chỉ nghĩ đến việc đưa thú cưng đi khám khi thấy bé đã ủ rũ bỏ ăn. Tuy nhiên, các bệnh do virus như Parvovirus, Care (Sài sốt) hay Giảm bạch cầu ở mèo có tốc độ tàn phá cực nhanh và tỉ lệ tử vong lên đến 80-90% nếu không được tiêm phòng từ sớm.',
      'Lịch tiêm phòng chuẩn cho cún con:',
      '- Mũi 1 (6-8 tuần tuổi): Vaccine 5 bệnh hoặc 7 bệnh đầu tiên.',
      '- Mũi 2 (10-12 tuần tuổi): Tiêm nhắc lại mũi 7 bệnh (cách mũi 1 từ 3-4 tuần).',
      '- Mũi 3 (14-16 tuần tuổi): Tiêm mũi 7 bệnh thứ 3 để đạt nồng độ kháng thể tối đa.',
      '- Vaccine Dại: Tiêm từ 3 tháng tuổi trở lên và tiêm nhắc lại mỗi năm 1 lần.',
      'Lịch tiêm phòng cho mèo con:',
      '- Bắt đầu từ 8 tuần tuổi với vaccine 4 bệnh (Giảm bạch cầu, Calici, Viêm mũi dị ứng, Chlamydia). Tiêm mũi nhắc lại sau 4 tuần, sau đó tiêm ngừa bệnh Dại.',
      'Lưu ý quan trọng: Chỉ tiêm khi bé hoàn toàn khỏe mạnh, không sốt, không tiêu chảy và đã được tẩy giun trước đó ít nhất 5 ngày.'
    ],
    category: 'Tiêm phòng',
    publishDate: '08/06/2025',
    authorName: 'BS. Phạm Hoàng Anh',
    authorTitle: 'Bác sĩ Tiêm chủng & Y tế dự phòng',
    authorAvatar: CLINIC_INFO.images.doctorFemale,
    readTime: '5 phút đọc',
    views: 1890,
    image: CLINIC_INFO.images.doctorFemale,
    tags: ['Lịch tiêm phòng', 'Vaccine', 'Care', 'Parvo', 'Phòng ngừa']
  },
  {
    id: 'bai-viet-3',
    title: 'Dinh dưỡng hợp lý giúp thú cưng khỏe mạnh và lông bóng mượt',
    slug: 'dinh-duong-hop-ly-giup-thu-cung-khoe-manh',
    summary: 'Chế độ ăn quyết định đến 70% tuổi thọ và độ bóng mượt của lông thú cưng. Hướng dẫn cân đối Protein, Omega 3, chất xơ và các loại thực phẩm tuyệt đối không cho ăn.',
    content: [
      'Một chế độ ăn thiếu chất hoặc quá nhiều tinh bột là nguyên nhân hàng đầu khiến chó mèo bị béo phì, viêm khớp sớm, rụng lông từng mảng và mắc bệnh thận.',
      '1. Nhu cầu Protein động vật chất lượng cao: Chó là động vật ăn tạp thiên về thịt, còn mèo là loài ăn thịt bắt buộc (Obligate Carnivore). Thức ăn của mèo phải giàu Taurine và đạm thịt từ ức gà, cá hồi, thịt bò, lòng đỏ trứng gà chín.',
      '2. Bổ sung Axit béo Omega-3 & Omega-6: Dầu cá hồi tự nhiên là vũ khí bí mật giúp lông cún mèo mềm mại, giảm hẳn rụng lông và chống viêm da dị ứng.',
      '3. Những thực phẩm độc hại tuyệt đối KHÔNG cho chó mèo ăn:',
      '- Sô-cô-la, Cacao: Chứa Theobromine gây ngộ độc tim mạch.',
      '- Hành tây, tỏi, hẹ: Chứa hợp chất phá hủy hồng cầu gây thiếu máu cấp.',
      '- Nho tươi và nho khô: Có thể gây suy thận cấp tính chỉ với vài quả.',
      '- Xương gia cầm nhỏ nhọn (xương gà luộc): Rất dễ đâm thủng thực quản, dạ dày.',
      'Hãy tham khảo ý kiến bác sĩ thú y Hòa Vang để nhận thực đơn riêng phù hợp theo từng giống và lứa tuổi.'
    ],
    category: 'Dinh dưỡng',
    publishDate: '05/06/2025',
    authorName: 'BS. Lê Minh Trí',
    authorTitle: 'Chuyên gia Da liễu & Dinh dưỡng',
    authorAvatar: CLINIC_INFO.images.doctorMale,
    readTime: '4 phút đọc',
    views: 1250,
    image: CLINIC_INFO.images.doctorMale,
    tags: ['Dinh dưỡng', 'Thức ăn chó mèo', 'Omega 3', 'Sức khỏe đường ruột']
  },
  {
    id: 'bai-viet-4',
    title: 'Dấu hiệu nhận biết mèo bị bệnh và cách xử lý sớm để cứu sống',
    slug: 'dau-hieu-nhan-biet-meo-bi-benh-va-cach-xu-ly-som',
    summary: 'Mèo là bậc thầy giấu bệnh trong thế giới động vật. Khi nhận thấy các dấu hiệu lờ đờ, bỏ ăn hoặc nôn dịch vàng, thời gian vàng điều trị chỉ còn tính bằng giờ.',
    content: [
      'Bản năng sinh tồn hoang dã khiến mèo luôn che giấu sự yếu ớt và đau đớn để tránh kẻ thù. Khi chủ nuôi phát hiện bé ốm, thường bệnh đã ở giai đoạn tiến triển nghiêm trọng.',
      'Các dấu hiệu cảnh báo đỏ:',
      '1. Bỏ ăn hoặc uống nước bất thường: Mèo nhịn ăn quá 24-48 giờ rất dễ dẫn đến hội chứng Gan nhiễm mỡ (Hepatic Lipidosis) có thể gây tử vong.',
      '2. Thay đổi thói quen đi vệ sinh: Mèo ngồi trong khay cát lâu, rặn tiểu kêu la đau đớn hoặc tiểu ra máu – Đây là dấu hiệu của Tắc niệu đạo (FLUTD), một cấp cứu ngoại khoa khẩn cấp.',
      '3. Nôn mửa liên tục: Nôn ra bọt trắng, bọt vàng kèm tiêu chảy mùi tanh nồng – Dấu hiệu nguy cấp của bệnh Giảm bạch cầu (FPV).',
      '4. Mắt có ghèn đặc, mi mắt thứ ba nhô lên, mũi khò khè chảy mủ.',
      'Hãy giữ ấm cho bé và mang ngay đến Phòng khám thú y Hòa Vang để được xét nghiệm test nhanh FPV/FIV/FeLV và truyền dịch kịp thời.'
    ],
    category: 'Sức khỏe & Bệnh lý',
    publishDate: '02/06/2025',
    authorName: 'BS. ThS. Trần Thu Hà',
    authorTitle: 'Phó Trưởng phòng khám & Chuyên gia Mèo',
    authorAvatar: CLINIC_INFO.images.doctorFemale,
    readTime: '6 phút đọc',
    views: 2150,
    image: CLINIC_INFO.images.hero,
    tags: ['Cấp cứu mèo', 'Giảm bạch cầu FPV', 'Bệnh lý thú nhỏ', 'Hòa Vang']
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    ownerName: 'Chị Nguyễn Thị Lan',
    petInfo: 'Chủ bé Poodle 2 tuổi (Hòa Nhơn, Hòa Vang)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    comment: 'Tôi rất hài lòng với dịch vụ tại Phòng khám thú y Hòa Vang. Bác sĩ tận tâm, chuyên môn tốt, điều trị dứt điểm, nhân viên nhiệt tình. Bé mèo nhà tôi đã khỏe lại rất nhiều sau khi điều trị ở đây!',
    rating: 5,
    serviceUsed: 'Điều trị viêm da & Spa phục hồi',
    date: '10/06/2025'
  },
  {
    id: 'test-2',
    ownerName: 'Anh Trần Minh Tuấn',
    petInfo: 'Chủ bé Golden Retriever 3 tuổi (Hòa Phú)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    comment: 'Bác sĩ Hùng tay nghề phẫu thuật rất giỏi. Bé nhà mình bị gãy chân sau cú va chạm, được bác sĩ phẫu thuật nẹp xương rất tỉ mỉ. Giờ bé đã chạy nhảy bình thường. Phòng khám sạch sẽ, chi phí rất hợp lý!',
    rating: 5,
    serviceUsed: 'Phẫu thuật ngoại khoa nẹp xương',
    date: '28/05/2025'
  },
  {
    id: 'test-3',
    ownerName: 'Cô Lê Hoàng Yến',
    petInfo: 'Chủ 3 bé mèo Anh lông ngắn (Hòa Khương)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    comment: 'Bác sĩ Hà siêu dịu dàng với mèo. Đưa mèo đi khám không hề bị căng thẳng. Đặt lịch online trên web nhanh gọn, đến nơi được khám đúng giờ không phải đợi lâu.',
    rating: 5,
    serviceUsed: 'Tiêm phòng trọn gói & Siêu âm',
    date: '15/05/2025'
  }
];
