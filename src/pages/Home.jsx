import React, { useState } from "react";
import "./home.css";

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Tìm: ${from} → ${to} | ${date || "Chưa chọn ngày"}`);
  };

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          {/* SEARCH BAR */}
          <form className="search-card" onSubmit={handleSearch}>
            <div className="search-card-inner">
              <div className="field">
                <label>Điểm khởi hành</label>
                <input
                  type="text"
                  placeholder="Chọn điểm đi"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>

              <div className="field">
                <label>Điểm đến</label>
                <input
                  type="text"
                  placeholder="Chọn điểm đến"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>

              <div className="field">
                <label>Ngày khởi hành</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <button className="btn-primary" type="submit">
                🔎 TÌM CHUYẾN XE
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* TUYẾN ĐƯỜNG PHỔ BIẾN */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Tuyến đường phổ biến</h2>
          <div className="routes-list">
            <div className="route-item">
              <img src="/sgvt.png" alt="Sài Gòn - Vũng Tàu" />
              <div className="route-info">
                <h3>Sài Gòn → Vũng Tàu</h3><p>150.000đ</p>
              </div>
            </div>
            <div className="route-item">
              <img src="/sgmn.png" alt="Sài Gòn - Mũi Né" />
              <div className="route-info">
                <h3>Sài Gòn → Mũi Né</h3><p>180.000đ</p>
              </div>
            </div>
            <div className="route-item">
              <img src="/sgnt.png" alt="Sài Gòn - Nha Trang" />
              <div className="route-info">
                <h3>Sài Gòn → Nha Trang</h3><p>240.000đ</p>
              </div>
            </div>
            <div className="route-item">
              <img src="/ntdl.png" alt="Nha Trang - Đà Lạt" />
              <div className="route-info">
                <h3>Nha Trang → Đà Lạt</h3><p>200.000đ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ƯU ĐÃI NỔI BẬT */}
      <section className="section alt">
        <div className="container">
          <h2 className="section-title">Ưu đãi nổi bật</h2>
          <div className="promo-wrap">
            <img src="/uudai.png" alt="Ưu đãi khứ hồi" className="promo-img" />
            <div className="promo-nav">
              <button type="button" aria-label="Prev" className="promo-btn prev">❮</button>
              <button type="button" aria-label="Next" className="promo-btn next">❯</button>
            </div>
          </div>
        </div>
      </section>

      {/* NHÀ XE PHỔ BIẾN */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Nhà xe phổ biến</h2>
          <div className="cards bus-list">
            <div className="bus-card"><img src="/nhaxeanhoa.jpg" alt="Nhà xe An Hòa Hiệp" /><h3>Nhà xe An Hòa Hiệp</h3></div>
            <div className="bus-card"><img src="/nhaxehoason.jpg" alt="Nhà xe Futa Hà Sơn" /><h3>Nhà xe Futa Hà Sơn</h3></div>
            <div className="bus-card"><img src="/nhaxevulinh.png" alt="Nhà xe Vũ Linh" /><h3>Nhà xe Vũ Linh</h3></div>
            <div className="bus-card"><img src="/nhaxetoanthang.jpg" alt="Nhà xe Toàn Thắng" /><h3>Nhà xe Toàn Thắng</h3></div>
          </div>
        </div>
      </section>

      {/* TOP REVIEWS */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Top Reviews</h2>
          <div className="top-grid">
            <a className="tile big" href="#" style={{backgroundImage:'url(/saigon.png)'}}><div className="tile__cap"><h3>Sài Gòn</h3><span>287 bài viết</span></div></a>
            <a className="tile tall" href="#" style={{backgroundImage:'url(/vungtau.png)'}}><div className="tile__cap"><h3>Vũng Tàu</h3><span>98 bài viết</span></div></a>
            <a className="tile" href="#" style={{backgroundImage:'url(/dalat.png)'}}><div className="tile__cap"><h3>Đà Lạt</h3><span>87 bài viết</span></div></a>
            <a className="tile big" href="#" style={{backgroundImage:'url(/hanoi.png)'}}><div className="tile__cap"><h3>Hà Nội</h3><span>612 bài viết</span></div></a>
            <a className="tile" href="#" style={{backgroundImage:'url(/quynhon.png)'}}><div className="tile__cap"><h3>Quy Nhơn</h3><span>81 bài viết</span></div></a>
            <a className="tile big" href="#" style={{backgroundImage:'url(/nhatrang.png)'}}><div className="tile__cap"><h3>Nha Trang</h3><span>557 bài viết</span></div></a>
            <a className="tile" href="#" style={{backgroundImage:'url(/danang.png)'}}><div className="tile__cap"><h3>Đà Nẵng</h3><span>570 bài viết</span></div></a>
            <a className="tile" href="#" style={{backgroundImage:'url(/phanthiet.png)'}}><div className="tile__cap"><h3>Phan Thiết</h3><span>276 bài viết</span></div></a>
          </div>
        </div>
      </section>

      {/* Bến xe */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Bến xe phổ biến</h2>
          <div className="cards bus-list">
            <div className="bus-card">
              <img src="/benxemiendong.jpg" alt="Bến xe Miền Đông Mới" />
              <h3>Bến xe Miền Đông Mới</h3>
            </div>
            <div className="bus-card">
              <img src="/benxemientay.jpg" alt="Bến xe Miền Tây" />
              <h3>Bến xe Miền Tây</h3>
            </div>
            <div className="bus-card">
              <img src="/benxagiapbat.jpg" alt="Bến xe Giáp Bát" />
              <h3>Bến xe Giáp Bát</h3>
            </div>
            <div className="bus-card">
              <img src="/benxamydinh.jpg" alt="Bến xe Mỹ Đình" />
              <h3>Bến xe Mỹ Đình</h3>
            </div>
          </div>
        </div>
      </section>

      {/* VIVUTODAY ĐƯỢC NHẮC TÊN TRÊN */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Vivutoday Được Nhắc Tên Trên</h2>
          <div className="press-logos">
            <img src="/24h.png" alt="24h" />
            <img src="/vtc.png" alt="VTC News" />
            <img src="/eva.png" alt="eva.vn" />
            <img src="/afamily.png" alt="aFamily" />
            <img src="/bariavungtau.png" alt="Bà Rịa Vũng Tàu" />
            <img src="/danangvivu.png" alt="Đà Nẵng Online" />
          </div>
        </div>
      </section>

    </div>
  );
}
