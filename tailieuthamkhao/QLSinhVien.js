////Tổng Hợp Dạng Bài Tập Kiểm Tra Môn Học NoSQL

db.sinhvien.insertMany([
  {
    MaSV: "2001210289",
    HoTen: "Huỳnh Công Huy",
    Tuoi: 21,
    NgayNhapHoc: ISODate("2018-04-14T00:00:00Z"),
    Phai: "Nam",
    QuocTich: "Việt Nam",
    NgoaiNgu: ["Tiếng Anh", "Tiếng Pháp"],
    Lop: {
      MaLop: "105",
      TenLop: "12DHTH05",
    },
    MonHoc: [
      { MaMon: "M001", TenMon: "Cơ sở dữ liệu", SoTC: 3, Diem: 7.5 },
      { MaMon: "M002", TenMon: "Toán cao cấp", SoTC: 2, Diem: 9 },
      { MaMon: "M003", TenMon: "Lập trình C", SoTC: 3, Diem: 8.5 },
    ],
  },
]);
/*  
  
]);



/*
- mongo //Khởi động mongodb shell
- show dbs //Hiển thị danh sách database
- show collections //Hiển thị danh sách Collection
- db //Hiển thị database hiện tại
- use database_name //Chuyển đến datatase chỉ định hoặc tạo database mới
- db.cropDatabase() //Xóa database hiện hành
- db.createCollection("collection name") //Tạo mới một collection
- db.collection_name.drop() //Xóa Collection*/

//1 Sử dụng cơ sở dữ liệu lưu trữ thông tin sinh viên, lớp, môn học được mô hình hóa bởi collection sinhvien. Thực hiện các yêu cầu sau:

// a/ Viết lệnh thêm vào collection sinhvien trong 2 trường hợp: thêm một và nhiều document.

db.sinhvien.insertOne({
  MaSV: "sv006",
  HoTen: "Nguyễn Văn C",
  Tuoi: 22,
  Phai: "Nam",
  QuocTich: "Việt Nam",
  NgoaiNgu: ["Tiếng Anh", "Tiếng Nhật"],
  Lop: {
    MaLop: "L02",
    TenLop: "12DHTH02",
  },
  MonHoc: [
    { MaMon: "M001", TenMon: "Cơ sở dữ liệu", SoTC: 3, Diem: 8.0 },
    { MaMon: "M002", TenMon: "Toán cao cấp", SoTC: 2, Diem: 9.0 },
  ],
});

db.sinhvien.insertMany([
  {
    MaSV: "sv007",
    HoTen: "Lê Thị D",
    Tuoi: 20,
    Phai: "Nữ",
    QuocTich: "Việt Nam",
    NgoaiNgu: ["Tiếng Anh", "Tiếng Pháp"],
    Lop: {
      MaLop: "L01",
      TenLop: "12DHTH01",
    },
    MonHoc: [
      { MaMon: "M001", TenMon: "Cơ sở dữ liệu", SoTC: 3, Diem: 7.0 },
      { MaMon: "M003", TenMon: "Lập trình C", SoTC: 3, Diem: 8.5 },
    ],
  },
  {
    MaSV: "sv008",
    HoTen: "Trần Văn E",
    Tuoi: 21,
    Phai: "Nam",
    QuocTich: "Việt Nam",
    NgoaiNgu: ["Tiếng Anh", "Tiếng Trung"],
    Lop: {
      MaLop: "L03",
      TenLop: "12DHTH03",
    },
    MonHoc: [
      { MaMon: "M002", TenMon: "Toán cao cấp", SoTC: 2, Diem: 6.0 },
      { MaMon: "M004", TenMon: "Lập trình Java", SoTC: 3, Diem: 7.5 },
    ],
  },
]);

//b / Viết lệnh xóa document với điều kiện mã sinh viên là “sv005”.

db.sinhvien.deleteOne({ MaSV: "sv005" });

//c / Viết lệnh xóa những sinh viên học lớp có mã lớp là l03.

db.sinhvien.deleteMany({ "Lop.MaLop": "L03" });

//d / Viết lệnh sửa Họ tên của sinh viên có mã sv001 thành Đỗ Nhật Lâm.

db.sinhvien.updateOne({ MaSV: "sv001" }, { $set: { HoTen: "Đỗ Nhật Lâm" } });

//e / Sửa tuổi thành 25, Phái thành Nữ, Họ tên thành Trần Thị Lan cho sinh viên có mã là sv003.

db.sinhvien.updateOne(
  { MaSV: "sv003" },
  {
    $set: {
      Tuoi: 25,
      Phai: "Nữ",
      HoTen: "Trần Thị Lan",
    },
  }
);

//f / Sửa ngoại ngữ thứ 2 của sinh viên có mã sv003 thành Tiếng Hàn.

db.sinhvien.updateOne(
  { MaSV: "sv003" },
  {
    $set: {
      "NgoaiNgu.1": "Tiếng Hàn",
    },
  } // Chỉ định phần tử thứ 2 (index 1)
);

//g / Sửa điểm của sinh viên có mã sv003 học môn thứ 1 thành 9.

db.sinhvien.updateOne(
  { MaSV: "sv003" },
  {
    $set: {
      "MonHoc.0.Diem": 9,
    },
  } // Chỉ định môn học thứ 1 (index 0)
);

//h / Viết lệnh thay thế một document với _id được chỉ định.

db.sinhvien.replaceOne(
  { _id: ObjectId("60b8d295f295234dcd55d9e1") }, // Thay thế bằng ObjectId thực tế
  {
    MaSV: "sv009",
    HoTen: "Phạm Quốc Huy",
    Tuoi: 23,
    Phai: "Nam",
    QuocTich: "Việt Nam",
    NgoaiNgu: ["Tiếng Anh", "Tiếng Nga"],
    Lop: {
      MaLop: "L04",
      TenLop: "12DHTH04",
    },
    MonHoc: [
      { MaMon: "M005", TenMon: "Lập trình Web", SoTC: 3, Diem: 8.0 },
      { MaMon: "M006", TenMon: "Lập trình Mobile", SoTC: 3, Diem: 7.0 },
    ],
  }
);

//Câu 1) Sử dụng cơ sở dữ liệu lưu trữ thông tin sinh viên, lớp, môn học được mô hình hóa bởi collection sinhvien.Viết các câu truy vấn sau:
//1 / Cho biết những sinh viên phái nữ có ngoại ngữ là Tiếng Anh

db.sinhvien.find({ $and: [{ Phai: "Nữ" }, { NgoaiNgu: "Tiếng Anh" }] });

//2 / Liệt kê những sinh viên phái nam trên 22 tuổi

db.sinhvien.find({ $and: [{ Phai: "Nam" }, { Tuoi: { $gt: 22 } }] });

//3 / Liệt kê những sinh viên có họ tên bắt đầu bằng chữ T

db.sinhvien.find({ HoTen: /^T/ });

//4 / Liệt kê những sinh viên có tên là Lan, chỉ hiển thị Mã sinh viên, Họ tên và Phái.

db.sinhvien.find({ HoTen: /Lan$/ }, { MaSV: 1, HoTen: 1, Phai: 1, _id: 0 });

//5 / Tìm những sinh viên học các ngoại ngữ thuộc tập gồm: Tiếng Pháp, Tiếng Nhật

db.sinhvien.find({ NgoaiNgu: { $in: ["Tiếng Pháp", "Tiếng Nhật"] } });

//6 / Liệt kê các sinh viên của 2 lớp có tên là 11DHTH và 12DHTH, hiển thị mã sinh viên và họ tên.

db.sinhvien.find({
  $or: [{ "Lop.TenLop": /^12DHTH/ }, { "Lop.TenLop": /^11DHTH/ }],
});

//7 / Liệt kê những sinh viên học lớp 11DHTH có tuổi < 21 hoặc 22 >

db.sinhvien.find(
  {
    $and: [
      { "Lop.TenLop": /^11DHTH/ },
      {
        $or: [{ Tuoi: { $lt: 21 } }, { Tuoi: { $gt: 22 } }],
      },
    ],
  },
  {
    MaSV: 1,
    HoTen: 1,
    Tuoi: 1,
    "Lop.TenLop": 1,
    _id: 0,
  }
);

//8 / Tìm những sinh viên lớp 11DHTH có ngoại ngữ Tiếng Pháp hoặc Tiếng Nhật

db.sinhvien.find({
  $and: [
    { "Lop.TenLop": /^11DHTH/ },
    {
      NgoaiNgu: {
        $in: ["Tiếng Pháp", "Tiếng Nhật"],
      },
    },
  ],
});

//9 / Những sinh viên học môn cơ sở dữ liệu có điểm > 7.5

db.sinhvien.find({
  MonHoc: {
    $elemMatch: {
      TenMon: "Cơ sở dữ liệu",
      Diem: { $gt: 7.5 },
    },
  },
});

db.HoaDon.insertMany([
  {
    MaHoaDon: "HD001",
    NgayLap: ISODate("2023-03-12"),
    KhachHang: {
      MaKH: "KH001",
      TenKH: "Nguyễn Văn A",
      DiaChi: "123 Bùi Đình Túy, Q BT, TPHCM",
    },
    SanPhamBan: [
      {
        MaSP: "SP001",
        TenSP: "Sản phẩm 1",
        SoLuong: 10,
        GiaBan: 200000,
        ThanhTien: 2000000,
      },
      {
        MaSP: "SP002",
        TenSP: "Sản phẩm 2",
        SoLuong: 3,
        GiaBan: 300000,
        ThanhTien: 900000,
      },
    ],
  },
  {
    MaHoaDon: "HD002",
    NgayLap: ISODate("2021-04-15"),
    KhachHang: {
      MaKH: "KH002",
      TenKH: "Trần Thị B",
      DiaChi: "456 Nguyễn Văn Cừ, Q5, TPHCM",
    },
    SanPhamBan: [
      {
        MaSP: "SP003",
        TenSP: "Sản phẩm 3",
        SoLuong: 2,
        GiaBan: 150000,
        ThanhTien: 300000,
      },
      {
        MaSP: "SP001",
        TenSP: "Sản phẩm 1",
        SoLuong: 6,
        GiaBan: 200000,
        ThanhTien: 1200000,
      },
    ],
  },
  {
    MaHoaDon: "HD003",
    NgayLap: ISODate("2020-07-05"),
    KhachHang: {
      MaKH: "KH001",
      TenKH: "Nguyễn Văn A",
      DiaChi: "123 Bùi Đình Túy, Q BT, TPHCM",
    },
    SanPhamBan: [
      {
        MaSP: "SP004",
        TenSP: "Sản phẩm 4",
        SoLuong: 1,
        GiaBan: 500000,
        ThanhTien: 500000,
      },
      {
        MaSP: "SP002",
        TenSP: "Sản phẩm 2",
        SoLuong: 7,
        GiaBan: 300000,
        ThanhTien: 2100000,
      },
    ],
  },
  {
    MaHoaDon: "HD004",
    NgayLap: ISODate("2020-03-01"),
    KhachHang: {
      MaKH: "KH003",
      TenKH: "Phạm Văn C",
      DiaChi: "789 Cộng Hòa, Q Tân Bình, TPHCM",
    },
    SanPhamBan: [
      {
        MaSP: "SP005",
        TenSP: "Sản phẩm 5",
        SoLuong: 4,
        GiaBan: 250000,
        ThanhTien: 1000000,
      },
      {
        MaSP: "SP003",
        TenSP: "Sản phẩm 3",
        SoLuong: 8,
        GiaBan: 150000,
        ThanhTien: 1200000,
      },
    ],
  },
  {
    MaHoaDon: "HD005",
    NgayLap: ISODate("2021-05-30"),
    KhachHang: {
      MaKH: "KH002",
      TenKH: "Trần Thị B",
      DiaChi: "456 Nguyễn Văn Cừ, Q5, TPHCM",
    },
    SanPhamBan: [
      {
        MaSP: "SP001",
        TenSP: "Sản phẩm 1",
        SoLuong: 2,
        GiaBan: 200000,
        ThanhTien: 400000,
      },
      {
        MaSP: "SP002",
        TenSP: "Sản phẩm 2",
        SoLuong: 5,
        GiaBan: 300000,
        ThanhTien: 1500000,
      },
    ],
  },
]);

//2) Sử dụng cơ sở dữ liệu quản lý bán sản phẩm với collection hoadon có cấu trúc như sau:

//a / Viết lệnh thêm vào 2 document vào collection hoadon.

db.hoadon.insertMany([
  {
    MaHD: "hd001",
    NgayLap: new Date("2020-03-20"),
    KhachHang: {
      MaKH: "kh001",
      HoTen: "Nguyễn Văn A",
      DiaChi: "123 Đường ABC, Hà Nội",
    },
    SanPhamBan: [
      {
        MaSP: "sp001",
        TenSP: "Sản phẩm 1",
        SoLuong: 2,
        GiaBan: 50000,
        ThanhTien: 100000,
      },
      {
        MaSP: "sp002",
        TenSP: "Sản phẩm 2",
        SoLuong: 1,
        GiaBan: 150000,
        ThanhTien: 150000,
      },
    ],
  },
  {
    MaHD: "hd002",
    NgayLap: new Date("2020-03-25"),
    KhachHang: {
      MaKH: "kh002",
      HoTen: "Lê Thị B",
      DiaChi: "456 Đường XYZ, TPHCM",
    },
    SanPhamBan: [
      {
        MaSP: "sp003",
        TenSP: "Sản phẩm 3",
        SoLuong: 3,
        GiaBan: 20000,
        ThanhTien: 60000,
      },
      {
        MaSP: "sp004",
        TenSP: "Sản phẩm 4",
        SoLuong: 2,
        GiaBan: 120000,
        ThanhTien: 240000,
      },
    ],
  },
]);

//b / Viết lệnh xóa những hóa đơn có ngày lập “2020-03 - 25”

db.hoadon.deleteMany({ NgayLap: new Date("2020-03-25") });

//c / Viết lệnh xóa những hóa đơn của khách hàng có mã là “kh001”

db.hoadon.deleteMany({ "KhachHang.MaKH": "kh001" });

//d / Viết lệnh sửa ngày lập của hóa đơn có mã h001 thành “2021-02 - 25”

db.hoadon.updateOne(
  { MaHD: "hd001" },
  { $set: { NgayLap: new Date("2021-02-25") } }
);

//e / Sửa thông tin khách hàng có mã là kh001 với Họ tên khách hàng thành Trần Thị Lan, địa chỉ thành TPHCM

db.hoadon.updateMany(
  { "KhachHang.MaKH": "kh001" },
  {
    $set: {
      "KhachHang.HoTen": "Trần Thị Lan",
      "KhachHang.DiaChi": "TPHCM",
    },
  }
);

//f / Sửa tên khách hàng có mã kh003 thành Đỗ Thanh Bình

db.hoadon.updateMany(
  { "KhachHang.MaKH": "kh003" },
  { $set: { "KhachHang.HoTen": "Đỗ Thanh Bình" } }
);

////g / Thêm một sản phẩm vào hóa đơn có mã hd003

db.hoadon.updateOne(
  { MaHD: "hd003" },
  {
    $push: {
      SanPhamBan: {
        MaSP: "sp005",
        TenSP: "Sản phẩm 5",
        SoLuong: 1,
        GiaBan: 100000,
        ThanhTien: 100000,
      },
    },
  }
);

//Câu 2) Sử dụng cơ sở dữ liệu quản lý bán sản phẩm viết các câu truy vấn sau:

//1 / Cho biết thông tin những hóa đơn được lập ngày 12 /03 / 2023

db.HoaDon.find({
  NgayLap: ISODate("2023-03-12"),
});

//2 / Liệt kê Mã hóa đơn, ngày lập của khách hàng có mã số là kh001

db.HoaDon.find(
  {
    "KhachHang.MaKH": "KH001",
  },
  {
    MaHoaDon: 1,
    NgayLap: 1,
    KhachHang: 1,
    _id: 0,
  }
);

//3 / Liệt kê những hóa đơn có bán sản phẩm có mã là sp001 với số lượng > 5

db.HoaDon.aggregate([
  {
    $match: {
      SanPhamBan: {
        $elemMatch: {
          MaSP: "SP001",
          SoLuong: { $gt: 5 },
        },
      },
    },
  },
  {
    $project: {
      MaHoaDon: 1,
      NgayLap: 1,
      KhachHang: 1,
      SanPhamBan: {
        $filter: {
          input: "$SanPhamBan",
          as: "item",
          cond: {
            $and: [
              { $eq: ["$$item.MaSP", "SP001"] },
              { $gt: ["$$item.SoLuong", 5] },
            ],
          },
        },
      },
    },
  },
]);

//4 / Những hóa đơn nào được lập trong thời gian từ ngày 01 /03 / 2020 đến 30 /05 / 2021

db.HoaDon.find({
  NgayLap: {
    $gte: ISODate("2019-03-01"),
    $lte: ISODate("2021-05-30"),
  },
});

//5 / Liệt kê thông tin những hóa đơn không lập trong ngày 5 / 7 / 2020. Thông tin liệt kê gồm: Mã hóa đơn, ngày lập

db.HoaDon.find(
  {
    NgayLap: {
      $ne: ISODate("2020-07-05"),
    },
  },
  {
    MaHoaDon: 1,
    NgayLap: 1,
    _id: 0,
  }
);

//▪ Viết các câu truy vấn sau:

//1) Cho biết mã lớp, tên lớp và số sinh viên trong từng lớp

db.sinhvien.aggregate({
  $group: {
    _id: "$Lop",
    SoSV: { $sum: 1 },
  },
});

//2) Cho biết tên lớp và số sinh viên trong từng lớp

db.sinhvien.aggregate({
  $group: {
    _id: { TenLop: "$Lop.TenLop" },
    SoSV: { $sum: 1 },
  },
});

//3) Cho biết Mã sinh viên, họ tên và số môn học của từng sinh viên

db.sinhvien.aggregate({
  $project: {
    _id: 0,
    MaSV: 1,
    HoTen: 1,
    SoMonHoc: {
      $size: "$MonHoc",
    },
  },
});

//Lưu ý: Toán tử $size không dùng trong $group mà dùng trong $project

//4) Cho biết Mã sinh viên, họ tên và điểm trung bình của từng sinh viên

db.sinhvien.aggregate({
  $project: {
    _id: 0,
    MaSV: 1,
    HoTen: 1,
    DiemTrungBinh: { $avg: "$MonHoc.Diem" },
  },
});

//5) Cho biết Mã lớp, tên lớp và số sinh viên của những lớp có số sinh viên >= 2

db.sinhvien.aggregate([
  {
    $group: {
      _id: {
        MaLop: "$Lop.MaLop",
        TenLop: "$Lop.TenLop",
      },
      SoSV: { $sum: 1 },
    },
  },
  {
    $match: {
      SoSV: { $gte: 2 },
    },
  },
]);

//6) Cho biết mã sv, họ tên và số môn học của những sinh viên học từ 2 môn trở lên

db.sinhvien.aggregate(
  {
    $project: {
      _id: 0,
      MaSV: 1,
      HoTen: 1,
      SoMonHoc: { $size: "$MonHoc" },
    },
  },
  {
    $match: {
      SoMonHoc: { $gte: 2 },
    },
  }
);

//Lưu ý: dùng project khi đó là mảng document, còn dùng group khi nó là document hoặc là mảng

//Bài tập 1
//    * Sử dụng CSDL quản lý sinh viên, thực hiện các truy vấn sau:

//1 / Liệt kê Mã lớp và số sinh viên Nữ trong từng lớp.

db.sinhvien.aggregate(
  {
    $match: { Phai: "Nữ" },
  },
  {
    $group: {
      _id: {
        MaLop: "$Lop.MaLop",
        HoTen: "$HoTen",
        Phai: "Nữ",
        SoSV: { $sum: 1 },
      },
    },
  }
);

//2 / Cho biết Tên lớp và danh sách những sinh viên(Họ tên) trong từng lớp.

db.sinhvien.aggregate({
  $group: {
    _id: {
      TenLop: "$Lop.TenLop",
    },
    DanhSachSinhVien: {
      $push: "$HoTen",
    },
  },
});

//3 / Liệt kê giới tính và danh sách những sinh viên(mã sv, họ tên) trong từng giới tính.

db.sinhvien.aggregate({
  $group: {
    _id: {
      Phai: "$Phai",
    },
    DanhSachSinhVien: {
      $push: {
        MaSV: "$MaSV",
        HoTen: "$HoTen",
      },
    },
  },
});

//4 / Liệt kê ngoại ngữ và danh sách những sinh viên(mã sinh viên) học từng ngoại ngữ.

db.sinhvien.aggregate({
  $group: {
    _id: {
      NgoaiNgu: "$NgoaiNgu",
    },
    DanhSachSinhVien: {
      $push: {
        MaSV: "$MaSV",
      },
    },
  },
});

//5 / Liệt kê Mã môn học, tên môn học và tống số sinh viên học từng môn.

db.sinhvien.aggregate(
  {
    $unwind: "$MonHoc",
  },
  {
    $group: {
      _id: {
        MaMonHoc: "$MonHoc.MaMon",
        TenMonHoc: "$MonHoc.TenMon",
      },
      TongSoSV: { $sum: 1 },
    },
  }
);

//6 / Liệt kê tên môn học và danh sách các sinh viên(họ tên) học tương ứng.

db.sinhvien.aggregate(
  {
    $unwind: "$MonHoc",
  },
  {
    $group: {
      _id: {
        MonHoc: "$MonHoc.TenMon",
      },
      DanhSachSinhVien: {
        $push: {
          MaSV: "$MaSV",
          TenSV: "$HoTen",
        },
      },
    },
  }
);

//7 / Cho biết Mã sinh viên, Họ tên học nhiều hơn 1 ngoại ngữ.

db.sinhvien.aggregate([
  {
    $group: {
      _id: {
        MaSV: "$MaSV",
        HoTen: "$HoTen",
      },
      SoLuongNgoaiNgu: { $sum: { $size: "$NgoaiNgu" } },
    },
  },
  {
    $match: { SoLuongNgoaiNgu: { $gt: 1 } },
  },
]);

//Sử dụng csdl quản lý sản phẩm, viết các câu truy vấn sau:
//1 / Cho biết Mã hoá đơn và số các sản phẩm có trong từng hoá đơn.

db.hoadon.aggregate({
  $project: {
    MaHoaDon: "$MaHoaDon",
    SoSanPham: {
      $size: "$SanPhamBan",
    },
  },
});

//2 / Cho biết Mã khách hàng, tên khách hàng và số lượng các hoá đơn của khách hàng tương ứng.

db.HoaDon.aggregate({
  $group: {
    _id: {
      MaKH: "$KhachHang.MaKH",
      TenKH: "$KhachHang.TenKH",
    },
    SoLuongHoaDon: { $sum: 1 },
  },
});

//3 / Cho biết Mã khách hàng, tên khách hàng và danh sách các mã hoá đơn của khách hàng đưa vào mảng.

db.HoaDon.aggregate({
  $group: {
    _id: {
      MaKH: "$KhachHang.MaKH",
      TenKH: "$KhachHang.TenKH",
    },
    DanhSachHoaDon: {
      $push: "$MaHoaDon",
    },
  },
});

//4 / Cho biết mã hoá đơn, ngày lập và tổng tiền của từng hoá đơn.

db.HoaDon.aggregate([
  {
    $unwind: "$SanPhamBan", // Giải nén mảng SanPhamBan
  },
  {
    $group: {
      _id: {
        MaHoaDon: "$MaHoaDon",
        NgayLap: "$NgayLap",
      },
      TongTienCuaHD: {
        $sum: "$SanPhamBan.ThanhTien", // Tính tổng ThanhTien của các sản phẩm
      },
    },
  },
]);

// Cho biết mã sản phẩm, tên sản phẩm và danh sách các hoá đơn mua sản phẩm đó.

db.HoaDon.aggregate(
  {
    $unwind: "$SanPhamBan", // Giải nén mảng SanPhamBan
  },
  {
    $group: {
      _id: {
        MaSP: "$SanPhamBan.MaSP",
        TenSP: "$SanPhamBan.TenSP",
      },
      DanhSachHD: {
        $push: {
          MaHD: "$MaHoaDon",
          NgayLap: "$NgayLap",
        },
      },
    },
  }
);
