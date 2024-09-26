// By Nguyễn Quốc Tiến - 2001216215

// #region Bài 7 =======================
// ---- 7.1
// Cho biết mã khách hàng và số lượng hóa đơn của từng khách hàng
db.Hoadon.aggregate([
  {
    $group: {
      _id: "$KhachHang.MaKH",
      SoLuongHoaDon: { $sum: 1 },
    },
  },
]);

// ---- 7.2
//  Cho biết mã khách hàng, tên khách hàng và số lượng hóa đơn của từng khách hàng.
db.Hoadon.aggregate([
  {
    $group: {
      _id: "$KhachHang.MaKH",
      TenKH: { $first: "$KhachHang.TenKH" },
      SoLuongHoaDon: { $sum: 1 },
    },
  },
]);

// ---- 7.3
// Liệt kê mã hóa đơn, ngày lập và số lượng mặt hàng có trong hóa đơn tương ứng
db.Hoadon.aggregate([
  {
    $project: {
      MaHoaDon: 1,
      NgayLap: 1,
      SoLuongMatHang: { $size: "$SanPhamBan" },
    },
  },
]);

// ---- 7.4
// Hiển thị ngày lập và số lượng hóa đơn được lập tương ứng của khách hàng "Nguyễn Văn A"
db.Hoadon.aggregate([
  {
    $match: { "KhachHang.TenKH": "Nguyễn Văn A" },
  },
  {
    $group: {
      _id: "$NgayLap",
      SoLuongHoaDon: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      NgayLap: "$_id",
      SoLuongHoaDon: 1,
    },
  },
]);

// ---- 7.5 #khó
// Hiển thị mã và tên những khách hàng có địa chỉ ở TPHCM
db.Hoadon.aggregate([
  {
    $match: { "KhachHang.DiaChi": { $regex: "TPHCM", $options: "i" } }, // Lọc các khách hàng có địa chỉ chứa "TPHCM"
  },
  {
    $group: {
      _id: "$KhachHang.MaKH",
      TenKH: { $first: "$KhachHang.TenKH" },
      DiaChi: { $first: "$KhachHang.DiaChi" },
    },
  },
  {
    $project: {
      _id: 0,
      MaKH: "$_id",
      TenKH: 1,
      DiaChi: 1,
    },
  },
]);

// ---- 7.6
// Hiển thị thông tin những hóa đơn được lập từ ngày 12/04/2021 đến 20/03/2021
db.Hoadon.find({
  NgayLap: {
    $gte: ISODate("2021-04-12T00:00:00Z"),
    $lte: ISODate("2021-04-20T23:59:59Z"),
  },
});

// ---- 7.7
// Hiển thị mã hóa đơn, ngày lập của khách hàng tên là Nguyễn Văn A, sắp xếp tăng dần theo ngày lập.
db.Hoadon.aggregate([
  {
    $match: {
      "KhachHang.TenKH": "Nguyễn Văn A",
    },
  },
  {
    $project: {
      _id: 0,
      MaHoaDon: 1,
      NgayLap: 1,
    },
  },
  {
    $sort: {
      NgayLap: 1,
    },
  },
]);

// ---- 7.8
//  Liệt kê mã và tên những khách hàng có trên 2 hóa đơn

// thêm 1 hoá đơn
db.collection.insertOne({
  MaHoaDon: "HD006", // Mã hóa đơn mới
  NgayLap: ISODate("2023-09-19T00:00:00.000Z"),
  KhachHang: {
    MaKH: "KH001",
    TenKH: "Nguyễn Văn A",
    DiaChi: "123 Bùi Đình Túy, Q BT, TPHCM",
  },
  SanPhamBan: [
    {
      MaSP: "SP003",
      TenSP: "Sản phẩm 3",
      SoLuong: 2,
      GiaBan: 150000,
      ThanhTien: 300000,
    },
  ],
});
// làm bài

db.Hoadon.aggregate([
  {
    $group: {
      _id: "$KhachHang.MaKH",
      count: { $sum: 1 },
      TenKH: { $first: "$KhachHang.TenKH" },
    },
  },
  {
    $match: {
      count: { $gt: 2 },
    },
  },
  {
    $project: {
      _id: 0,
      MaKH: "$_id",
      TenKH: 1,
    },
  },
]);

// ---- 7.9
// Cho biết Mã sản phẩm và giá bán trung bình của từng sản phẩm (Dùng unwind)
db.Hoadon.aggregate([
  {
    $unwind: "$SanPhamBan",
  },
  {
    $group: {
      _id: "$SanPhamBan.MaSP",
      GiaBanTrungBinh: {
        $avg: "$SanPhamBan.GiaBan",
      },
    },
  },
  {
    $project: {
      _id: 0,
      MaSanPham: "$_id",
      GiaBanTrungBinh: 1,
    },
  },
]);

// ---- 7.10
// Hiển thị Mã khách hàng, tên khách hàng, và danh sách các mã hóa đơn của khách hàng tương ứng được đưa vào mảng (Dùng $AddToSet)
db.Hoadon.aggregate([
  {
    $group: {
      _id: { MaKH: "$KhachHang.MaKH" },
      MaKH: { $first: "$KhachHang.MaKH" },
      TenKH: { $first: "$KhachHang.TenKH" },
      DanhSachMaHD: { $addToSet: "$MaHoaDon" },
    },
  },
  {
    $project: {
      _id: 0,
      MaKH: 1,
      TenKH: 1,
      DanhSachMaHD: 1,
    },
  },
]);

// ---- 7.11
// Hiển thị ngày lập và danh sách các mã hóa đơn (đưa vào mảng) của từng ngày lập tương ứng.
db.Hoadon.aggregate([
  {
    $group: {
      _id: {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$NgayLap",
        },
      },
      maHoaDonList: { $push: "$MaHoaDon" },
    },
  },
  {
    $project: {
      _id: 0,
      ngayLap: "$_id",
      maHoaDonList: "$maHoaDonList",
    },
  },
]);

// ---- 7.12
// Hiển thị mã sản phẩm, tên sản phẩm và tổng số lượng bán ra tương ứng.
db.Hoadon.aggregate([
  { $unwind: "$SanPhamBan" },
  {
    $group: {
      _id: {
        MaSP: "$SanPhamBan.MaSP",
        TenSP: "$SanPhamBan.TenSP",
      },
      TongSoLuongBanRa: {
        $sum: "$SanPhamBan.SoLuong",
      },
    },
  },
  {
    $project: {
      _id: 0,
      MaSP: "$_id.MaSP",
      TenSP: "$_id.TenSP",
      TongSoLuongBanRa: 1,
    },
  },
]);

// ---- 7.13
// Liệt kê mã hóa đơn, tên khách hàng và trị giá của hóa đơn tương ứng (biết rằng trị giá hóa đơn = sum(số lượng * đơn giá))
db.Hoadon.aggregate([
  {
    $unwind: "$SanPhamBan",
  },
  {
    $group: {
      _id: "$MaHoaDon",
      TenKH: { $first: "$KhachHang.TenKH" },
      TriGiaHoaDon: {
        $sum: { $multiply: ["$SanPhamBan.SoLuong", "$SanPhamBan.GiaBan"] },
      },
    },
  },
  {
    $project: {
      _id: 0,
      MaHoaDon: "$_id",
      TenKH: 1,
      TriGiaHoaDon: 1,
    },
  },
]);

// ---- 7.14
// Liệt kê mã những hóa đơn được lập vào tháng 7 (HD: sử dụng toán tử $month)
db.Hoadon.aggregate([
  {
    $match: {
      $expr: { $eq: [{ $month: "$NgayLap" }, 7] },
    },
  },
  { $project: { MaHoaDon: 1, _id: 0 } },
]);

// ---- 7.15
// Liệt kê mã những hóa đơn được lập vào năm 2020 (HD: sử dụng toán tử $year)
db.Hoadon.aggregate([
  {
    $match: {
      $expr: {
        $eq: [
          {
            $year: "$NgayLap",
          },
          2020,
        ],
      },
    },
  },
  {
    $project: {
      _id: 0,
      MaHoaDon: 1,
    },
  },
]);

// ---- 7.16
//  Liệt kê mã những hóa đơn được lập vào tháng 7 năm 2020
db.Hoadon.aggregate([
  {
    $match: {
      NgayLap: {
        $gte: ISODate("2020-07-01T00:00:00Z"),
        $lt: ISODate("2020-08-01T00:00:00Z"),
      },
    },
  },
  { $project: { _id: 0, MaHoaDon: 1 } },
]);

// #endregion

// #region Bài 8 =======================
// ---- 8.1
// Hiển thị Mã sinh viên, họ tên và năm sinh của sinh viên.
db.sv.aggregate([
  {
    $project: {
      Masv: 1,
      Hoten: 1,
      Namsinh: { $year: "$Ngaysinh" },
    },
  },
]);
// ---- 8.2
// Hiển thị Mã sinh viên, tên lớp và tuổi của sinh viên. Biết rằng tuổi được tính dựa vào ngày sinh (HD: sử dụng new Date(), để lấy ngày hiện tại, $year để lấy năm hiện tại, toán tử $subtract để thực hiện phép trừ năm hiện tại cho năm sinh)
db.sv.aggregate([
  {
    $addFields: {
      Tuoi: {
        $subtract: [
          {
            $year: new Date(),
          },
          {
            $year: "$Ngaysinh",
          },
        ],
      },
    },
  },
  {
    $project: {
      Masv: 1,
      "Lop.Tenlop": 1,
      Tuoi: 1,
    },
  },
]);
// ---- 8.3
// Cho biết Mã môn học, tên môn học và số sinh viên học tương ứng, sắp xếp tăng dần theo mã môn học.
db.sv.aggregate([
  {
    $unwind: "$Monhoc",
  },
  {
    $group: {
      _id: {
        Mamh: "$Monhoc.Mamh",
        Tenmh: "$Monhoc.Tenmh",
      },
      SoSinhVien: {
        $sum: 1,
      },
    },
  },
  {
    $project: {
      _id: 0,
      Mamh: "$_id.Mamh",
      Tenmh: "$_id.Tenmh",
      SoSinhVien: 1,
    },
  },
  {
    $sort: {
      Mamh: 1,
    },
  },
]);
// ---- 8.4
//  Liệt kê mã lớp, tên lớp và danh sách mã sinh viên đưa vào mảng tương ứng
db.sv.aggregate([
  {
    $group: {
      _id: {
        Malop: "$Lop.Malop",
        Tenlop: "$Lop.Tenlop",
      },
      MasvList: { $push: "$Masv" },
    },
  },
  {
    $project: {
      _id: 0,
      Malop: "$_id.Malop",
      Tenlop: "$_id.Tenlop",
      MasvList: 1,
    },
  },
]);
// ---- 8.5
// Liệt kê mã môn học, tên môn học và danh sách sinh viên đưa vào mảng tương ứng
db.sv.aggregate([
  {
    $unwind: "$Monhoc",
  },
  {
    $group: {
      _id: {
        Mamh: "$Monhoc.Mamh",
        Tenmh: "$Monhoc.Tenmh",
      },
      DanhSachSinhVien: {
        $push: {
          Masv: "$Masv",
          Hoten: "$Hoten",
          Lop: "$Lop",
          Phai: "$Phai",
          Ngaysinh: "$Ngaysinh",
          NgoaiNgu: "$NgoaiNgu",
          Email: "$Email",
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      Mamh: "$_id.Mamh",
      Tenmh: "$_id.Tenmh",
      DanhSachSinhVien: 1,
    },
  },
]);
// ---- 8.6
// Hiển thị mã và tên những môn học có số lượng sinh viên ≥ 2
db.sv.aggregate([
  { $unwind: "$Monhoc" },
  {
    $group: {
      _id: "$Monhoc.Mamh",
      Tenmh: { $first: "$Monhoc.Tenmh" },
      studentCount: { $sum: 1 },
    },
  },
  { $match: { studentCount: { $gte: 2 } } },
  {
    $project: {
      _id: 0,
      Mamh: "$_id",
      Tenmh: 1,
    },
  },
]);

// #endregion

// #region Bài 9 =======================
// ---- 9.1
// Hiển thị tất cả các index hiện có trong cơ sở dữ liệu
db.sv.aggregate([
  {
    $indexStats: {},
  },
]);
// ---- 9.2
// Tạo index cho cột Mã sinh viên với hướng chỉ mục tăng
db.sv.createIndex({ _masv: 1 });
// ---- 9.3
// Xóa index ở câu 2, tạo lại index cho cột Mã sinh viên hướng giảm, thiết lập thuộc tính duy nhất cho chỉ mục.
db.sv.dropIndex({ _masv: 1 });
db.sv.createIndex({ _masv: -1 }, { unique: true });

// #endregion
