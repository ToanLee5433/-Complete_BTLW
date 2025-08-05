export type Article = {
  title: string;
  img?: string;
};

export const categories: Record<string, Article[]> = {
  "HOẠT ĐỘNG CỦA BỘ CÔNG AN": [
    { title: "Xứng đáng là chỗ dựa vững chắc của Đảng bộ, chính quyền và Nhân dân Thủ đô Hà Nội", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/NguyenThiLan/thang5/084a6554.jpg?width=1000" },
    { title: "Triển khai công tác đặc xá năm 2025 (đợt 2) đảm bảo chặt chẽ, đúng quy định", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/NguyenPhuongAnh/2025/7/atx_2500.jpg?width=1000" },
    { title: "Đảng bộ Cục Quản lý xuất nhập cảnh tổ chức thành công Đại hội đại biểu lần thứ II, nhiệm kỳ 2025 – 2030", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/NguyenThiLan/thang5/z6833405188514_5f0b64350164f78504c210708a929c9a.jpg?RenditionID=7" },
  ],
  "HOẠT ĐỘNG CỦA CÔNG AN ĐỊA PHƯƠNG": [
    { title: "Công an tỉnh Nghệ An khẩn trương, tích cực giúp Nhân dân khắc phục hậu quả cơn bão số 3", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/NguyenPhuongAnh/2025/7/gen-h-xa%20anh%20son1.jpg?RenditionID=7" },
    { title: "Cảnh sát phòng cháy, chữa cháy và cứu nạn, cứu hộ Thanh Hóa căng mình trong đêm gia cố đê tại xã Triệu Sơn", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/NguyenThiLan/thang5/523782784_1144648617696062_228142469859369190_n.jpg?RenditionID=7" },
    { title: "Phú Thọ: Tích cực di dời tài sản, đảm bảo an toàn cho Nhân dân", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/NguyenPhuongAnh/2025/7/%E1%BA%A3nh%204%20(47).jpg?RenditionID=7" },
  ],
  "ĐỐI NGOẠI": [
    { title: "Tăng cường hợp tác giữa Bộ Công an và Cảnh sát Hồng Kông (Trung Quốc)", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/Le%20Cong%20Tuan/494_1%20battay.jpg?RenditionID=7" },
    { title: "Tăng cường hợp tác giữa Công an tỉnh An Giang và Công an tỉnh Kandal, Vương quốc Campuchia", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/NguyenPhuongAnh/2025/7/img_7745.jpeg?RenditionID=7" },
    { title: "Việt Nam, Hoa Kỳ tăng cường hợp tác tìm kiếm quân nhân Hoa Kỳ mất tích trong chiến tranh", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/Le%20Cong%20Tuan/165_1%20tap%20the.jpg?RenditionID=7" },
  ],
  "AN NINH, TRẬT TỰ": [
    { title: "Khởi tố nhóm đối tượng “truy sát” đối thủ trong đêm khiến 01 người tử vong", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/Ho%C3%A0ng%20Th%E1%BB%8B%20Thanh/2024/22-7gn1.jpg?RenditionID=7" },
    { title: "Quảng Ninh: Công an xã Quảng Hà kịp thời ngăn chặn vụ lừa đảo qua không gian mạng", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/NguyenPhuongAnh/2025/7/cong-an-xa-quang-ha-tuyen-truyen-cho-ong-n.v.t-lien-quan-den-lua-dao-qua-mang.jpg?RenditionID=7" },
    { title: "Điện Biên: Khẩn trương khắc phục sự số đứt cáp Cầu treo Pa Thơm", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/NguyenThiLan/thang5/ghj.jpg?RenditionID=7" },
  ],
  "PHỔ BIẾN GIÁO DỤC PHÁP LUẬT": [
    { title: "Lấy ý kiến về chế độ bồi dưỡng giám định tư pháp trong lĩnh vực kỹ thuật hình sự", img: "https://bocongan.gov.vn/knd/vb/vbqp/PublishingImages/Ng%C3%A2n%202022/77.jpg?width=1000" },
    { title: "Hoàn thiện pháp luật về dẫn độ theo hướng đồng bộ, chặt chẽ", img: "https://bocongan.gov.vn/knd/vb/vbqp/PublishingImages/Le%20Cong%20Tuan/4%20db%20to%20van%20tam.jpg?width=1000" },
    { title: "Từ tháng 7/2025, Công an cấp xã sẽ định kỳ, đột xuất thực hiện kiểm tra cư trú", img: "https://bocongan.gov.vn/knd/vb/vbqp/PublishingImages/Ng%C3%A2n%202022/53n.jpg?width=1000" },
  ],
  "CHỈ ĐẠO ĐIỀU HÀNH": [
    { title: "Chủ động ứng phó với mưa lớn, lũ, ngập lụt, lũ quét, sạt lở đất", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/BANNER/c%C3%B4ng%20%C4%91i%E1%BB%87n.jpg?RenditionID=7" },
    { title: "Lực lượng Công an nhân dân tập trung ứng phó với bão số 3 và mưa lũ", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/NguyenPhuongAnh/2025/7/e244163c-9501-49d3-b395-efbf00ab4d99.jpg?RenditionID=7" },
    { title: "Công điện của Thủ tướng chỉ đạo khẩn trương tìm kiếm cứu nạn, khắc phục hậu quả vụ lật tàu ở Quảng Ninh", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/khainq/2025/fa80bd1562bfd4e18dae.jpg?RenditionID=7" },
  ],
  "NGƯỜI TỐT, VIỆC TỐT": [
    { title: "Công an các xã tại tỉnh Nghệ An kịp thời đưa sản phụ vượt lũ đến trạm y tế an toàn", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/NguyenPhuongAnh/2025/7/gen-h-xa%20huu%20kiem.jpg?RenditionID=7" },
    { title: "Trung tá Nguyễn Quốc Thái kiên quyết, mưu trí trong đấu tranh phòng, chống tội phạm", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/Ho%C3%A0ng%20Th%E1%BB%8B%20Thanh/2024/thai01.jpg?RenditionID=7" },
    { title: "Lâm Đồng: Công an xã Phan Rí Cửa hỗ trợ trao trả tài sản cho người bị đánh rơi", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/Ho%C3%A0ng%20Th%E1%BB%8B%20Thanh/2024/z6827136956266_abc53d6c2d38a08c22bdd46d39fd9cda.jpg?RenditionID=7" },
  ],
  "HOẠT ĐỘNG XÃ HỘI": [
    { title: "Công an phường Hạc Thành (Thanh Hóa): Nhiều hoạt động tri ân thương binh, gia đình liệt sĩ và người có công", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/NguyenThiLan/thang5/ht6.jpeg?RenditionID=7" },
    { title: "Công an thành phố Cần Thơ khám bệnh, cấp phát thuốc và tặng quà gia đình chính sách tại xã Hỏa Lựu", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/NguyenPhuongAnh/2025/7/hinh%201%20(2).jpg?RenditionID=7" },
    { title: "“Mái ấm tình thương” cùng nhiều hoạt động ý nghĩa về nguồn tại Tây Ninh", img: "https://bocongan.gov.vn/knd/tt/PublishingImages/Ho%C3%A0ng%20Th%E1%BB%8B%20Thanh/2024/262_anh%201.jpg?width=1000" },
  ],
};

export const categoryPairs: [string, string][] = [
  ["HOẠT ĐỘNG CỦA BỘ CÔNG AN", "HOẠT ĐỘNG CỦA CÔNG AN ĐỊA PHƯƠNG"],
  ["ĐỐI NGOẠI", "AN NINH, TRẬT TỰ"],
  ["PHỔ BIẾN GIÁO DỤC PHÁP LUẬT", "CHỈ ĐẠO ĐIỀU HÀNH"],
  ["NGƯỜI TỐT, VIỆC TỐT", "HOẠT ĐỘNG XÃ HỘI"],
];