// By Nguyễn Quốc Tiến - 2001216215

// ======================= Bài 2
//Tạo collection "sv"
db.createCollection("sv");

// ---- 2.a
// thêm sinh viên sv001
db.sv.insert({ Masv: "sv001", Hoten: "Đỗ Thị Lan" });

// thêm sinh viên sv002 sv003
db.sv.insert([
  { Masv: "sv002", Hoten: "Trần Minh" },
  { Masv: "sv003", Hoten: "PhạmTuấn" },
]);

// thêm sinh viên sv004
db.sv.insert({
  Masv: "sv004",
  Hoten: "Trần Minh Nghĩa",
  Ngaysinh: new Date("2001-04-14"),
  Email: "tmn@gmail.com",
  Phai: "Nam",
  Lop: { Malop: "l01", Tenlop: "08DHTH" },

  Monhoc: [
    { Mamh: "m001", Tenmh: "Cơ sở dữ liệu", Sotc: 3, Diem: 7.5 },
    { Mamh: "m002", Tenmh: "Toán cao cấp", Sotc: 2, Diem: 9 },
    { Mamh: "m003", Tenmh: "Công nghệ phần mềm", Sotc: 3, Diem: 8.5 },
  ],
});

// ---- 2.b
// thêm sinh viên sv005
db.sv.insert({
  Masv: "sv005",
  Hoten: "Nguyễn Quốc Tiến",
  Ngaysinh: new Date("2003-01-17"),
  Email: "nqt@gmail.com",
  Phai: "Nam",
  Lop: { Malop: "l02", Tenlop: "09DHTH" },

  Monhoc: [
    { Mamh: "m002", Tenmh: "Toán cao cấp", Sotc: 2, Diem: 5 },
    { Mamh: "m003", Tenmh: "Công nghệ phần mềm", Sotc: 3, Diem: 7 },
  ],
});

// xoá sinh viên sv005
db.sv.deleteOne({ Masv: "sv005" });

// ---- 2.c thêm 2 sinh viên có mã lớp là l03
db.sv.insert([
  {
    Masv: "sv006",
    Hoten: "Nguyễn Quốc Bảo",
    Phai: "Nam",
    Lop: { Malop: "l03", Tenlop: "10DHTH" },
  },
  {
    Masv: "sv007",
    Hoten: "Nguyễn Quốc Thịnh",
    Phai: "Nam",
    Lop: { Malop: "l03", Tenlop: "10DHTH" },
  },
]);

// xoá các sinh viên có lớp l03
db.sv.deleteMany({ "Lop.Malop": "l03" });

// ---- 2.d
// sửa Họ tên của sinh viên có mã sv001 thành Đỗ Nhật Lâm
db.sv.updateOne({ Masv: "sv001" }, { $set: { Hoten: "Đỗ Nhật Lâm" } });

// ---- 2.g
// Sửa điểm của sinh viên có mã sv003 học môn thứ 1 thành 9
// sửa chút thong tin cho sv003
db.sv.updateOne(
  { Masv: "sv003" }, // Điều kiện tìm sinh viên có mã "sv003"
  {
    $set: {
      Ngaysinh: new Date("2001-04-14"), // Cập nhật ngày sinh
      Email: "tmn@gmail.com", // Cập nhật email
      Phai: "Nam", // Cập nhật giới tính
      Lop: { Malop: "l01", Tenlop: "08DHTH" }, // Cập nhật thông tin lớp
      Monhoc: [
        // Cập nhật danh sách môn học
        { Mamh: "m001", Tenmh: "Cơ sở dữ liệu", Sotc: 3, Diem: 7.5 },
        { Mamh: "m002", Tenmh: "Toán cao cấp", Sotc: 2, Diem: 9 },
        { Mamh: "m003", Tenmh: "Công nghệ phần mềm", Sotc: 3, Diem: 8.5 },
      ],
    },
  }
);

// sửa điểm
db.sv.updateOne({ Masv: "sv003" }, { $set: { "Monhoc.0.Diem": 9 } });

// ======================= Bài 3
// ---- 3.a tạo collection insert data
db.createCollection("hoadon"); // Tạo collection hoadon

db.hoadon.insertMany([
  {
    MaHD: "HD001",
    Ngaylap: new Date(),
    Khachhang: {
      Makh: "KH001",
      Tenkh: "Nguyen Van A",
      Diachi: "123 Đường A, Quận B, TP C",
    },
    Sanphamban: [
      {
        Masp: "SP001",
        Tensp: "Sản phẩm 1",
        Soluong: 2,
        Giaban: 100000,
        Thanhtien: 200000,
      },
      {
        Masp: "SP002",
        Tensp: "Sản phẩm 2",
        Soluong: 1,
        Giaban: 50000,
        Thanhtien: 50000,
      },
    ],
  },
  {
    MaHD: "HD002",
    Ngaylap: new Date("2024-09-01"),
    Khachhang: {
      Makh: "KH002",
      Tenkh: "Le Thi B",
      Diachi: "456 Đường X, Quận Y, TP Z",
    },
    Sanphamban: [
      {
        Masp: "SP003",
        Tensp: "Sản phẩm 3",
        Soluong: 3,
        Giaban: 150000,
        Thanhtien: 450000,
      },
      {
        Masp: "SP001",
        Tensp: "Sản phẩm 1",
        Soluong: 1,
        Giaban: 100000,
        Thanhtien: 100000,
      },
    ],
  },
  {
    MaHD: "HD003",
    Ngaylap: new Date("2024-09-02"),
    Khachhang: {
      Makh: "KH003",
      Tenkh: "Tran Van C",
      Diachi: "789 Đường M, Quận N, TP O",
    },
    Sanphamban: [
      {
        Masp: "SP002",
        Tensp: "Sản phẩm 2",
        Soluong: 2,
        Giaban: 50000,
        Thanhtien: 100000,
      },
      {
        Masp: "SP004",
        Tensp: "Sản phẩm 4",
        Soluong: 1,
        Giaban: 200000,
        Thanhtien: 200000,
      },
    ],
  },
  {
    MaHD: "HD004",
    Ngaylap: new Date("2024-09-03"),
    Khachhang: {
      Makh: "KH004",
      Tenkh: "Nguyen Thi D",
      Diachi: "123 Đường P, Quận Q, TP R",
    },
    Sanphamban: [
      {
        Masp: "SP005",
        Tensp: "Sản phẩm 5",
        Soluong: 4,
        Giaban: 80000,
        Thanhtien: 320000,
      },
    ],
  },
]);

// ---- 3.b  xóa những hóa đơn có ngày lập nào đó
db.hoadon.deleteOne({ Ngaylap: new Date("2024-09-01") });

// ---- 3.c xóa những hóa đơn của khách hàng có mã là “kh001”
db.hoadon.deleteMany({ "Khachhang.Makh": "KH001" });

// ---- 3.d sửa ngày lập của hóa đơn có mã h003 thành “2021-02-25”
db.hoadon.updateOne(
  { MaHD: "HD003" },
  { $set: { Ngaylap: new Date("2021-02-25") } }
);

// ---- 3.e Sửa thông tin khách hàng có mã là KH003 với Họ tên khách hàng thành Trần Thị Lan, địa chỉ thành TPHCM
db.hoadon.updateMany(
  { "Khachhang.Makh": "KH003" },
  {
    $set: {
      "Khachhang.Tenkh": "Trần Thị Lan",
      "Khachhang.Diachi": "TPHCM",
    },
  }
);

// ---- 3.f Sửa tên khách hàng có mã kh003 thành Đỗ Thanh Bình
db.hoadon.updateMany(
  { "Khachhang.Makh": "KH003" },
  {
    $set: {
      "Khachhang.Tenkh": "Đỗ Thanh Bình",
    },
  }
);

// ---- 3.g Thêm một sản phẩm vào hóa đơn có mã hd003
db.hoadon.updateOne(
  { MaHD: "HD003" },
  {
    $push: {
      Sanphamban: {
        Masp: "SP007",
        Tensp: "Sản phẩm 7",
        Soluong: 3,
        Giaban: 70000,
        Thanhtien: 210000,
      },
    },
  }
);

// ======================= Bài 5
// cập nhật dữ liệu để thực hiện bài 5
db.sv.updateMany(
  { Masv: "sv001" },
  { $set: { Ngonngu: ["Tiếng Anh", "Tiếng Nga"] } }
);

db.sv.updateMany(
  { Masv: "sv002" },
  { $set: { Ngonngu: ["Tiếng Nhật", "Tiếng Anh", "Tiếng Ý"] } }
);

db.sv.updateMany(
  { Masv: "sv003" },
  { $set: { Ngonngu: ["Tiếng Pháp", "Tiếng Đức"] } }
);

db.sv.updateMany(
  { Masv: "sv004" },
  { $set: { Ngonngu: ["Tiếng Đức", "Tiếng Nga", "Tiếng Anh"] } }
);
