import React, { useMemo, useState } from "react";
import "./tuyen-duong.css";

const allRoutes = [
  { title: "Đặt vé xe tuyến Bến xe Ngã Tư Ga đi Bắc Giang", desc: "Bạn đang tìm kiếm một chuyến xe chất lượng cao từ Bến xe Ngã Tư…", img: "/td1.png" },
  { title: "Đặt vé xe tuyến Sài Gòn đi Rạch Giá – Kiên Giang", desc: "Phương tiện di chuyển thuận tiện và nhanh chóng giữa Sài Gòn…", img: "/td2.png" },
  { title: "Tuyến Sài Gòn đi Cam Ranh Khánh Hòa", desc: "Top 10 nhà xe tuyến Sài Gòn đi Cam Ranh Khánh Hòa được đánh giá…", img: "/td3.png" },
  { title: "Đặt vé xe Bình Thuận đi Cam Ranh – Khánh Hòa", desc: "Bạn đang tìm chuyến xe chất lượng trên tuyến đường Bình Thuận…", img: "/td4.png" },
  { title: "Top 8 nhà xe từ Bến xe Gia Lai đi Sài Gòn", desc: "Danh sách nhà xe nổi tiếng, nhiều lựa chọn, chất lượng cao…", img: "/td5.png" },
  { title: "Vé xe từ bến xe phía nam Buôn Ma Thuột đi Sài Gòn", desc: "Gợi ý giờ chạy, loại xe và giá vé tham khảo cho hành trình…", img: "/td6.png" },
  { title: "Đặt vé xe tuyến Hà Nội đi Vân Đồn – Quảng Ninh", desc: "Lịch trình, giờ xuất bến, loại xe và nhà xe uy tín…", img: "/td7.png" },
  { title: "Đặt vé xe từ Vũng Tàu đi Sân bay Tân Sơn Nhất", desc: "Xe limousine/ghế ngồi, chạy liên tục nhiều khung giờ trong ngày…", img: "/td8.png" },
];

export default function TuyenDuong() {
  const pageSize = 8;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allRoutes.length / pageSize);

  const data = useMemo(
    () => allRoutes.slice((page - 1) * pageSize, page * pageSize),
    [page]
  );

  const go = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="routes-page">
      <div className="container">
        <h1 className="page-title">TUYẾN ĐƯỜNG</h1>

        <div className="routes-grid">
          {data.map((r, idx) => (
            <article key={idx} className="route-card">
              <div className="card-img">
                <img src={r.img} alt={r.title} />
              </div>
              <div className="card-body">
                <h3 className="card-title">{r.title}</h3>
                <p className="card-desc">{r.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="pagination">
          <button onClick={() => go(page - 1)} disabled={page === 1}>«</button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "active" : ""}
              onClick={() => go(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => go(page + 1)} disabled={page === totalPages}>»</button>
        </div>

        <p className="desc">
          Tổng hợp các tuyến đường phổ biến: thời gian khởi hành, loại xe, giá vé
          và nhà xe uy tín. Bạn có thể thay dữ liệu demo ở đây bằng API thật.
        </p>
      </div>
    </div>
  );
}
