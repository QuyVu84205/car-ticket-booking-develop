import React, { useState } from "react";
import "./thongtinnhaxe.css";

const busList = [
  { name: "Nhà xe Thanh Nhung", address: "An Giang, Sa Đéc, Q. Bình Thạnh, TP. Hồ Chí Minh", hotline: "1900 0152", img: "/nhaxethanhnhung.png" },
  { name: "Nhà xe Xuân Quỳnh", address: "Tp. Hồ Chí Minh, Lê Hồng Phong, P.12, Q.10", hotline: "1900 2345", img: "/nhaxexuanquynh.png" },
  { name: "Nhà xe Quang Giang (Quang Tuyến)", address: "TP. Hà Giang, Bắc Quang, TT. Việt Quang", hotline: "1900 5432", img: "/nhaxequanggiang.png" },
  { name: "Nhà xe Văn Năm", address: "Hà Nội, TX. Sơn Tây, xã Cổ Đông", hotline: "1900 7890", img: "/nhaxevannam.png" },
  { name: "Nhà xe Chí Tâm", address: "Đà Lạt, QL 20, Đức Trọng, Lâm Đồng", hotline: "1900 9876", img: "/nhaxechitam.png" },
  { name: "Nhà xe Hồng Thịnh", address: "TP. Thanh Hóa, QL 1A, Phường Đông Hương", hotline: "1900 9999", img: "/nhaxehongthinh.png" },
  { name: "Nhà xe Bình Hà", address: "TP. Nha Trang, Lê Hồng Phong, Khánh Hòa", hotline: "1900 1122", img: "/nhaxebinhha.png" },
  { name: "Nhà xe Khang Phát", address: "TP. Biên Hòa, Đồng Nai, QL 51", hotline: "1900 2233", img: "/nhaxekhangphat.png" },
];

export default function ThongTinNhaXe() {
  const [page] = useState(1);

  return (
    <div className="bus-info-page">
      <div className="container">
        <h1 className="page-title">NHÀ XE</h1>

        <div className="bus-grid">
          {busList.map((bus, i) => (
            <div key={i} className="bus-card">
              <img src={bus.img} alt={bus.name} />
              <div className="bus-body">
                <h3>{bus.name}</h3>
                <p>{bus.address}</p>
                <p><b>Hotline:</b> {bus.hotline}</p>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <button disabled={page === 1}>«</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <span>...</span>
          <button>149</button>
          <button>»</button>
        </div>

        <p className="desc">
          Nhà xe – Vivutoday.com | Hệ thống đặt vé xe online cao cấp, dễ dàng tra cứu giá vé,
          lịch trình, số điện thoại, tuyến đường của 1000+ hãng xe chất lượng tốt nhất.
        </p>
      </div>
    </div>
  );
}
