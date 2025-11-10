// src/pages/ThongTinNhaXe.jsx
import React, { useState } from "react";
import "./thongtinnhaxe.css";

const busList = [
  { name: "Nhà xe Thanh Nhung", address: "Trụ sở chính: 446 XươngGiang, P. Ngô Quyền, Tp. Bắc Giang, tỉnh Bắc Giang", img: "/nhaxethanhnhung.png" },
  { name: "Nhà xe Xuân Quỳnh", address: "Trụ sở chính: 38 Bùi Thị Xuân, P. Lê Thanh Nghị, Hải Phòng",img: "/nhaxexuanquynh.png" },
  { name: "Nhà xe Quang Giang (Quang Tuyến)", address: "Trụ sở chính: 101 Nguyễn Trãi, P. Nguyễn Trãi, TP. Hà Giang, Hà Giang",  img: "/nhaxequanggiang.png" },
  { name: "Nhà xe Văn Năm", address: "Trụ sở chính: X. Phượng Vĩ, H. Cẩm Khê, Phú Thọ",  img: "/nhaxevannam.png" },
  { name: "Nhà xe Chí Tâm", address: "Trụ sở chính: Thôn Tân Lập 4, X. Pơng Đrang, H. Krông Búk, Đắk Lắk",  img: "/nhaxechitam.png" },
  { name: "Nhà xe Hồng Thịnh", address: "Trụ sở chính: 62 Phạm Văn Đồng, Tổ 1, P. Hưng Thành, Tuyên Quang",  img: "/nhaxehongthinh.png" },
  { name: "Nhà xe Bình Hà", address: "Trụ sở chính: Quốc Lộ 21B, X. Hải Quang, H. Hải Hậu, Nam Định",  img: "/nhaxebinhha.png" },
  { name: "Nhà xe Khang Phát", address: "Trụ sở chính: 238 Nguyễn Tất Thành, TT Krông Kmar, H. Krông Bông, Đắk Lắk",  img: "/nhaxekhangphat.png" },
];

export default function ThongTinNhaXe() {
  const [page] = useState(1);

  const onImgError = (e) => {
    e.currentTarget.src = "/placeholder-bus.jpg"; // đặt 1 ảnh placeholder trong /public nếu muốn
  };

  return (
    <div className="bus-info-page">
      <div className="container">
        <h1 className="page-title">NHÀ XE</h1>

        <div className="bus-grid">
          {busList.map((bus, i) => (
            <article key={i} className="bus-card" aria-label={bus.name}>
              <div className="media">
                <img
                  loading="lazy"
                  decoding="async"
                  src={bus.img}
                  alt={bus.name}
                  onError={onImgError}
                />
              </div>

              <div className="bus-body">
                <h3 className="name" title={bus.name}>{bus.name}</h3>
                <p className="addr">📍 {bus.address}</p>
                {bus.hotline && <p className="hotline">☎ Hotline: {bus.hotline}</p>}
              </div>
            </article>
          ))}
        </div>

        {/* PAGINATION (tĩnh – sẽ nối API sau) */}
        <nav className="pagination" aria-label="Pagination">
          <button disabled={page === 1} aria-label="Trang trước">«</button>
          <button className="active" aria-current="page">1</button>
          <button>2</button>
          <button>3</button>
          <span>…</span>
          <button>149</button>
          <button aria-label="Trang sau">»</button>
        </nav>

        <p className="desc">
          Nhà xe – Vivutoday.com | Hệ thống đặt vé xe online cao cấp, dễ dàng tra cứu giá vé,
          lịch trình, số điện thoại, tuyến đường của 1000+ hãng xe chất lượng tốt nhất.
        </p>
      </div>
    </div>
  );
}
