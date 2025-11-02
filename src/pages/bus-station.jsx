import React, { useState } from "react";
import "./bus-station.css";

const busStations = [
  { name: "Bến xe Gia Lâm", address: "Số 9 Ngô Gia Khảm, Long Biên, Hà Nội", hotline: "0243 877 1430", img: "/bxegialam.png" },
  { name: "Bến xe khách Quảng Bình", address: "Số 265 Lý Thường Kiệt, TP. Đồng Hới, Quảng Bình", hotline: "0232 3822 115", img: "/bxekhachquangbinh.png" },
  { name: "Bến xe Cần Thơ", address: "Số 91 Nguyễn Văn Linh, Ninh Kiều, TP. Cần Thơ", hotline: "0292 3890 444", img: "/benxecantho.png" },
  { name: "Bến xe Vũng Tàu", address: "Số 192 Nam Kỳ Khởi Nghĩa, TP. Vũng Tàu", hotline: "0254 3854 294", img: "/benxevungtau.png" },
  { name: "Danh sách bến xe Hà Nội", address: "Mỹ Đình, Giáp Bát, Nước Ngầm, Gia Lâm, Yên Nghĩa", hotline: "1900 0152", img: "/danhsachbenxehanoi.png" },
  { name: "Bến xe Thanh Hóa", address: "Số 99 Quang Trung, P. Ngọc Trạo, TP. Thanh Hóa", hotline: "0237 3852 555", img: "/benxethanhhoa.png" },
  { name: "Bến xe phía Bắc miền Nam Bắc", address: "Số 120 Nguyễn Văn Linh, Đà Nẵng", hotline: "0236 3821 007", img: "/benxetieubieu.png" },
  { name: "Bến xe Quy Nhơn - Bình Định", address: "QL1A, Trần Quang Diệu, Quy Nhơn", hotline: "0256 3741 888", img: "/benxequynhon.png" },
];

export default function BusStation() {
  const [page] = useState(1);

  return (
    <div className="busstation-page">
      <div className="container">
        <h1 className="page-title">BẾN XE</h1>

        <div className="busstation-grid">
          {busStations.map((station, i) => (
            <div key={i} className="busstation-card">
              <img src={station.img} alt={station.name} />
              <div className="busstation-body">
                <h3>{station.name}</h3>
                <p>{station.address}</p>
                <p><b>Hotline:</b> {station.hotline}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button disabled={page === 1}>«</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <span>...</span>
          <button>148</button>
          <button>»</button>
        </div>

        <p className="desc">
          Tập hợp các bến xe và thông tin chi tiết lịch trình, giờ khởi hành của
          các nhà xe có tại bến.
        </p>
      </div>
    </div>
  );
}
