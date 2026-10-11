import { Doctor, ServiceItem, Article, Testimonial, Review } from '../types';
import heroImg from '../assets/images/hero_vet_clinic_animals_1791617072923.jpg';
import storefrontImg from '../assets/images/clinic_storefront_hoavang_1791617084363.jpg';
import doctorMaleImg from '../assets/images/vet_doctor_male_puppy_1791617094974.jpg';
import doctorFemaleImg from '../assets/images/vet_doctor_female_cat_1791617109445.jpg';

export const CLINIC_INFO = {
  name: 'Phòng khám thú y HÒA VANG',
  slogan: 'Vì sức khỏe thú cưng của bạn',
  subSlogan: 'Tận tâm – Chuyên nghiệp – Đồng hành cùng thú cưng',
  address: 'Đường Phan Quang Định, Phường Hòa Khánh, TP. Đà Nẵng',
  hotline: '0935 77 87 27',
  zalo: '0935778727',
  emergencyHotline: '0935 77 87 27',
  email: 'vanhuutyk42@gmail.com',
  workingHours: '7:00 - 19:00 (Tất cả các ngày trong tuần)',
  emergencyService: 'Cấp cứu 24/7 khi gọi hotline',
  googleMapsUrl: 'https://maps.google.com/?q=Đường+Phan+Quang+Định,+Hòa+Khánh,+Đà+Nẵng',
  facebookUrl: 'https://facebook.com',
  stats: {
    yearsExperience: '10+',
    doctorsCount: '2 Bác sĩ',
    treatedPets: '5.000+',
    satisfactionRate: '99%',
  },
  images: {
    hero: heroImg,
    storefront: storefrontImg,
    doctorMale: doctorMaleImg,
    doctorFemale: doctorFemaleImg,
  }
};

export const DOCTORS_DATA: Doctor[] = [
  {
    id: 'dr-huu-ty',
    name: 'BS. Hữu Tỵ',
    title: 'Bác sĩ Trưởng phòng khám & Phẫu thuật Ngoại khoa',
    degree: 'Bác sĩ Thú y chính quy - ĐH Nông Lâm (Hơn 12 năm kinh nghiệm phẫu thuật & lâm sàng)',
    specialties: ['Phẫu thuật ngoại khoa & Triệt sản', 'Chẩn đoán hình ảnh (X-quang, Siêu âm)', 'Cấp cứu hồi sức 24/7', 'Chấn thương chỉnh hình'],
    experienceYears: 12,
    avatar: CLINIC_INFO.images.doctorMale,
    bio: 'Bác sĩ Hữu Tỵ là Trưởng phòng khám Thú y Hòa Vang với hơn 12 năm kinh nghiệm trong chẩn đoán, điều trị bệnh và phẫu thuật ngoại khoa mô mềm, xương khớp cho chó mèo. Bác sĩ luôn đề cao y đức, phong cách làm việc cẩn trọng, điềm tĩnh và đặt sinh mệnh của thú cưng lên hàng đầu.',
    schedule: ['Thứ 2: 7:00 - 18:30', 'Thứ 3: 7:00 - 18:30', 'Thứ 4: 7:00 - 18:30', 'Thứ 5: 7:00 - 18:30', 'Thứ 6: 7:00 - 18:30', 'Thứ 7: 7:00 - 18:00', 'Chủ nhật: 7:30 - 17:30'],
    casesHandled: 4200,
    rating: 5.0,
    reviewCount: 386,
    status: 'active'
  },
  {
    id: 'dr-suong-mai',
    name: 'BS. Sương Mai',
    title: 'Phó Trưởng phòng khám & Chuyên khoa Nội - Thú nhỏ',
    degree: 'Bác sĩ Thú y chuyên sâu - ĐH Nông Lâm, Chứng chỉ Bệnh lý Mèo & Da liễu Thú nhỏ',
    specialties: ['Khám nội khoa & Bệnh truyền nhiễm', 'Chăm sóc y tế & Bệnh lý Mèo', 'Tiêm phòng vaccine & Xét nghiệm máu', 'Da liễu, nấm mẩn ngứa & Dinh dưỡng'],
    experienceYears: 9,
    avatar: CLINIC_INFO.images.doctorFemale,
    bio: 'Bác sĩ Sương Mai có chuyên môn sâu về nội khoa thú cưng, điều trị bệnh truyền nhiễm nguy hiểm, da liễu và chăm sóc sức khỏe chuyên sâu cho mèo. Nổi tiếng với phong thái ân cần, nhẹ nhàng, thấu hiểu tâm lý thú cưng giúp các bé luôn cảm thấy thoải mái và an tâm khi thăm khám.',
    schedule: ['Thứ 2: 7:30 - 19:00', 'Thứ 3: 7:30 - 19:00', 'Thứ 4: 7:30 - 19:00', 'Thứ 5: 7:30 - 19:00', 'Thứ 6: 7:30 - 19:00', 'Thứ 7: 7:30 - 18:00', 'Chủ nhật: 8:00 - 17:00'],
    casesHandled: 3500,
    rating: 4.9,
    reviewCount: 324,
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
    authorName: 'BS. Hữu Tỵ',
    authorTitle: 'Bác sĩ Trưởng phòng khám',
    authorAvatar: CLINIC_INFO.images.doctorMale,
    readTime: '4 phút đọc',
    views: 1420,
    image: CLINIC_INFO.images.hero,
    tags: ['Chăm sóc mùa hè', 'Sốc nhiệt', 'Chó mèo', 'Hòa Vang'],
    inlineImages: [
      {
        url: CLINIC_INFO.images.doctorMale,
        caption: 'Bác sĩ thú y kiểm tra dấu hiệu sinh tồn và nhiệt độ cơ thể của cún cưng',
        position: 1
      },
      {
        url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=80',
        caption: 'Cho thú cưng uống đủ nước sạch và nghỉ ngơi nơi thoáng mát để phòng tránh sốc nhiệt',
        position: 2
      }
    ]
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
    authorName: 'BS. Sương Mai',
    authorTitle: 'Phó Trưởng phòng khám & Chuyên khoa Nội',
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
    authorName: 'BS. Hữu Tỵ',
    authorTitle: 'Bác sĩ Trưởng phòng khám',
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
    authorName: 'BS. Sương Mai',
    authorTitle: 'Phó Trưởng phòng khám & Chuyên gia Thú nhỏ',
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
    comment: 'Bác sĩ Hữu Tỵ tay nghề phẫu thuật rất giỏi. Bé nhà mình bị gãy chân sau cú va chạm, được bác sĩ Tỵ phẫu thuật nẹp xương rất tỉ mỉ. Giờ bé đã chạy nhảy bình thường. Phòng khám sạch sẽ, chi phí rất hợp lý!',
    rating: 5,
    serviceUsed: 'Phẫu thuật ngoại khoa nẹp xương',
    date: '28/05/2025'
  },
  {
    id: 'test-3',
    ownerName: 'Cô Lê Hoàng Yến',
    petInfo: 'Chủ 3 bé mèo Anh lông ngắn (Hòa Khương)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    comment: 'Bác sĩ Sương Mai siêu dịu dàng với mèo. Đưa mèo đi khám không hề bị căng thẳng. Đặt lịch online trên web nhanh gọn, đến nơi được khám đúng giờ không phải đợi lâu.',
    rating: 5,
    serviceUsed: 'Tiêm phòng trọn gói & Siêu âm',
    date: '15/05/2025'
  }
];

export const INITIAL_REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Chị Nguyễn Thị Lan',
    phoneNumber: '0935123456',
    bookingCode: 'HV-2026-9812',
    location: 'Xã Hòa Nhơn, Huyện Hòa Vang',
    petName: 'Milo',
    petType: 'Chó',
    serviceUsed: 'Khám & Điều trị da liễu',
    doctorName: 'BS. Sương Mai',
    rating: 5,
    title: 'Bác sĩ Sương Mai chữa nấm và viêm da cho bé Milo rất mát tay!',
    content: 'Bé Milo nhà mình bị viêm da ngứa ngáy rụng lông suốt 2 tháng đưa đi mấy nơi không đỡ. Đến thú y Hòa Vang được bác sĩ Sương Mai xét nghiệm soi tươi nấm, kê đơn kết hợp dầu tắm thảo dược. Sau 2 tuần bé đã mọc lông non mượt trở lại. Chi phí rất minh bạch, phòng khám sạch sẽ và không hề có mùi hôi.',
    petPhotoUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80',
    date: '15/06/2025',
    status: 'approved',
    clinicResponse: {
      author: 'BS. Sương Mai',
      content: 'Cảm ơn chị Lan đã tin tưởng và kiên trì tắm thuốc đúng cữ cho bé Milo. Chúc bé luôn khỏe mạnh và năng động nhé ạ!',
      date: '16/06/2025'
    },
    helpfulCount: 24,
    verified: true
  },
  {
    id: 'rev-2',
    customerName: 'Anh Trần Minh Tuấn',
    phoneNumber: '0905987654',
    bookingCode: 'HV-2026-4421',
    location: 'Xã Hòa Phú, Huyện Hòa Vang',
    petName: 'Max',
    petType: 'Chó',
    serviceUsed: 'Phẫu thuật ngoại khoa nẹp xương',
    doctorName: 'BS. Hữu Tỵ',
    rating: 5,
    title: 'Ca mổ nẹp xương thành công ngoài mong đợi, phục hồi rất nhanh',
    content: 'Bé Golden Max 30kg nhà mình không may bị tai nạn gãy xương đùi. May mắn có BS Hữu Tỵ tiếp nhận cấp cứu và phẫu thuật nẹp xương ngay trong đêm. Máy gây mê khí dung hiện đại nên bé tỉnh táo nhanh sau mổ, đường khâu thẩm mỹ rất đẹp. Sau 1 tháng tái khám xương đã liền thẳng tắp.',
    petPhotoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80',
    date: '02/06/2025',
    status: 'approved',
    clinicResponse: {
      author: 'BS. Hữu Tỵ',
      content: 'Chào anh Tuấn! Bé Max rất dũng cảm và ngoan ngoãn trong suốt quá trình điều trị. Anh nhớ cho bé vận động nhẹ nhàng thêm 2 tuần nữa trước khi chạy nhảy bình thường nhé!',
      date: '03/06/2025'
    },
    helpfulCount: 38,
    verified: true
  },
  {
    id: 'rev-3',
    customerName: 'Cô Lê Hoàng Yến',
    phoneNumber: '0914654321',
    bookingCode: 'HV-2026-6178',
    location: 'Xã Hòa Khương, Huyện Hòa Vang',
    petName: 'Bông & Miu',
    petType: 'Mèo',
    serviceUsed: 'Tiêm phòng Vaccine & Siêu âm',
    doctorName: 'BS. Sương Mai',
    rating: 5,
    title: 'Bác sĩ Sương Mai rất dịu dàng, mèo nhát người cũng nằm ngoan cho khám',
    content: 'Hai bé mèo nhà cô rất nhút nhát và sợ chỗ đông người. Nhưng bác sĩ Sương Mai thao tác nhẹ nhàng, vuốt ve làm dịu tâm lý trước khi tiêm nên các bé không hề kêu la hay cào cấu. Vaccine có tem bảo đảm chính hãng, dán vào sổ tiêm rõ ràng. Đặt lịch trên web đến đúng giờ là được vào khám ngay, tiện lợi vô cùng!',
    petPhotoUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
    date: '20/05/2025',
    status: 'approved',
    clinicResponse: {
      author: 'BS. Sương Mai',
      content: 'Cháu cảm ơn cô Yến ạ! Hai bé Bông và Miu xinh xắn và đáng yêu lắm. Lần tới đến hạn tiêm nhắc lại dại hệ thống sẽ tự động gửi thông báo nhắc cô nhé!',
      date: '21/05/2025'
    },
    helpfulCount: 19,
    verified: true
  },
  {
    id: 'rev-4',
    customerName: 'Bác Đặng Quốc Bảo',
    phoneNumber: '0978334455',
    bookingCode: 'HV-2026-1102',
    location: 'Xã Hòa Ninh, Huyện Hòa Vang',
    petName: 'Rocky',
    petType: 'Chó',
    serviceUsed: 'Cấp cứu & Khám bệnh',
    doctorName: 'BS. Hữu Tỵ',
    rating: 5,
    title: 'Cứu sống bé Rocky bị ngộ độc kịp thời trong đêm',
    content: 'Bé Rocky vô tình ăn phải bả lạ trong vườn, nôn mửa liên tục và co giật lúc 21h đêm. Gia đình gọi hotline phòng khám được BS Hữu Tỵ hướng dẫn sơ cứu nhanh rồi đưa gấp đến cơ sở. Các bác sĩ đã truyền giải độc, rửa dạ dày kịp thời cứu sống bé. Gia đình biết ơn đội ngũ y bác sĩ Hòa Vang rất nhiều!',
    date: '12/05/2025',
    status: 'approved',
    clinicResponse: {
      author: 'BS. Hữu Tỵ',
      content: 'Phòng khám Thú y Hòa Vang luôn duy trì trực cấp cứu 24/7 để đồng hành cùng các bé. Rất mừng vì bé Rocky đã vượt qua nguy hiểm an toàn!',
      date: '13/05/2025'
    },
    helpfulCount: 42,
    verified: true
  },
  {
    id: 'rev-5-pending',
    customerName: 'Anh Huỳnh Văn Nam',
    phoneNumber: '0935889900',
    bookingCode: 'HV-2026-8820',
    location: 'Xã Hòa Tiến, Huyện Hòa Vang',
    petName: 'Bắp',
    petType: 'Chó',
    serviceUsed: 'Spa & Cắt tỉa lông làm đẹp',
    doctorName: 'BS. Sương Mai',
    rating: 5,
    title: 'Dịch vụ Spa tắm tỉa cực kỳ chuyên nghiệp và thơm lâu',
    content: 'Bé Corgi nhà mình đi spa về thơm phức, cắt tỉa mông trái tim cưng xỉu! Các bạn kỹ thuật viên rất kiên nhẫn, không ép buộc bé. Sau khi tắm còn được vệ sinh tai và mài móng sạch sẽ. Sẽ tiếp tục ủng hộ phòng khám thường xuyên.',
    petPhotoUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80',
    date: '08/10/2026',
    status: 'pending',
    helpfulCount: 0,
    verified: true
  },
  {
    id: 'rev-6-pending',
    customerName: 'Chị Phan Thùy Trang',
    phoneNumber: '0905112233',
    bookingCode: 'HV-2026-7734',
    location: 'Xã Hòa Sơn, Huyện Hòa Vang',
    petName: 'Mun',
    petType: 'Mèo',
    serviceUsed: 'Phẫu thuật ngoại khoa triệt sản',
    doctorName: 'BS. Sương Mai',
    rating: 5,
    title: 'Triệt sản mèo cái đường mổ siêu nhỏ, hồi phục ngay trong ngày',
    content: 'Mình rất lo lắng khi cho bé Mun đi triệt sản vì sợ bé đau. Nhưng bác sĩ Sương Mai mổ khéo léo vô cùng, đường mổ chỉ khoảng 1.5cm, khâu chỉ tự tiêu giấu bên trong nên không phải đeo loa chống liếm quá lâu. Chiều đón về bé đã ăn uống bình thường. Rất an tâm!',
    date: '09/10/2026',
    status: 'pending',
    helpfulCount: 0,
    verified: true
  }
];
