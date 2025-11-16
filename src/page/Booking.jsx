import React, { useState } from "react";
import "./Booking.css";

const Booking = () => {
  // form tìm kiếm (dùng lại như Home)
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Tìm: ${from} → ${to} | ${date || "Chưa chọn ngày"}`);
  };

  // dữ liệu chuyến xe demo (6 chuyến giống mẫu)
  const [trips] = useState([
    {
      id: 1,
      name: "Vip Phương Huy Luxury",
      rating: 4.5,
      reviews: 21,
      depart: "21:00",
      arrive: "22:30",
      from: "Hà Nội Office - Cổ Linh",
      to: "Hải Phòng",
      price: 220000,
    },
    {
      id: 2,
      name: "Vip Phương Huy Luxury",
      rating: 4.5,
      reviews: 21,
      depart: "21:00",
      arrive: "22:30",
      from: "Hà Nội Office - Cổ Linh",
      to: "Hải Phòng",
      price: 220000,
    },
    {
      id: 3,
      name: "Vip Phương Huy Luxury",
      rating: 4.5,
      reviews: 21,
      depart: "21:00",
      arrive: "22:30",
      from: "Hà Nội Office - Cổ Linh",
      to: "Hải Phòng",
      price: 220000,
    },
    {
      id: 4,
      name: "Vip Phương Huy Luxury",
      rating: 4.5,
      reviews: 21,
      depart: "21:01",
      arrive: "22:31",
      from: "Hà Nội Office - Cổ Linh",
      to: "Hải Phòng",
      price: 220000,
    },
    {
      id: 5,
      name: "Hoàng Anh Limousine (Hải Phòng)",
      rating: 4.5,
      reviews: 310,
      depart: "21:15",
      arrive: "23:50",
      from: "Hà Nội Office - Cổ Linh",
      to: "Hải Phòng",
      price: 450000,
    },
    {
      id: 6,
      name: "Anh Huy Travel",
      rating: 4.5,
      reviews: 310,
      depart: "21:45",
      arrive: "00:25",
      from: "Hà Nội Office - Cổ Linh",
      to: "Hải Phòng",
      price: 120000,
    },
  ]);

  return (
    <div className="booking-page">
      <div className="container">
        {/* TIÊU ĐỀ TUYẾN ĐƯỜNG */}
        <h1 className="route-title">Hà Nội Đến Hải Phòng</h1>

        {/* SEARCH CARD */}
        <form className="booking-search-card" onSubmit={handleSearch}>
          <div className="booking-search-inner">
            <div className="booking-field">
              <label>Điểm khởi hành</label>
              <input
                type="text"
                placeholder="Chọn điểm đi"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div className="booking-field">
              <label>Điểm đến</label>
              <input
                type="text"
                placeholder="Chọn điểm đến"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <div className="booking-field">
              <label>Ngày khởi hành</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button className="booking-btn" type="submit">
              🔎 TÌM CHUYẾN XE
            </button>
          </div>
        </form>

        {/* KHỐI LỌC + DANH SÁCH CHUYẾN */}
        <div className="booking-layout">
          {/* SIDEBAR LỌC */}
          <aside className="filter-box">
            <div className="filter-block">
              <h3 className="filter-title">Tiêu chí phổ biến</h3>
              <label className="filter-checkbox">
                <input type="checkbox" /> Chuyến giảm giá (370)
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" /> Xe VIP Limousine (433)
              </label>
            </div>

            <div className="filter-block">
              <h3 className="filter-title">Giờ đi</h3>
              <input type="range" min="0" max="23" className="filter-range" />
              <div className="range-info">
                <span>00:00</span>
                <span>23:59</span>
              </div>
            </div>

            <div className="filter-block">
              <h3 className="filter-title">Giá vé</h3>
              <input
                type="range"
                min="0"
                max="2000000"
                className="filter-range"
              />
              <div className="range-info">
                <span>0</span>
                <span>2.000.000</span>
              </div>
            </div>

            <div className="filter-block">
              <h3 className="filter-title">Nhà xe</h3>

              {/* Ô tìm kiếm nhà xe nhỏ */}
              <input type="text" className="filter-search" />

              <label className="filter-checkbox">
                <input type="checkbox" /> Anh Huy (Hải Phòng)
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" /> Anh Huy Đất Cảng
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" /> Anh Huy Travel
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" /> Bằng Phấn
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" /> Cát Bà Express
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" /> Cát Bà Go Easy Limousine
              </label>

              <button className="clear-btn">Xóa đã chọn</button>
            </div>
          </aside>

          {/* DANH SÁCH CHUYẾN */}
          <section className="trip-area">
            <div className="sort-bar">
              <span className="sort-label">Sắp xếp theo tuyến đường</span>
              <div className="sort-right">
                <select className="sort-select">
                  <option value="">Giờ đi</option>
                  <option value="time-asc">Sớm nhất</option>
                  <option value="time-desc">Muộn nhất</option>
                </select>

                <select className="sort-select">
                  <option value="">Mức giá</option>
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                </select>
              </div>
            </div>

{trips.map((trip) => (
  <article key={trip.id} className="trip-card">
    <div className="trip-thumb">
      {/* nếu đang dùng ảnh trong public thì sửa path cho đúng */}
      <img src="/vexere.jpg" alt={trip.name} />
    </div>

    <div className="trip-info">
      {/* Hàng trên: tên + rating */}
      <div className="trip-top-row">
        <h4 className="trip-name">{trip.name}</h4>

        <div className="trip-rating">
          <span className="rating-badge">
            <span className="rating-star">★</span>
            <span className="rating-score">{trip.rating}</span>
          </span>
          <span className="rating-count">· {trip.reviews} Đánh giá</span>
        </div>
      </div>

      <p className="trip-type">Limousine 9 chỗ</p>

      {/* Hàng thời gian: giờ đi – duration – giờ đến */}
      <div className="trip-times">
        <div className="time-block time-left">
          <span className="time-main">{trip.depart}</span>
          <span className="time-sub time-from">{trip.from}</span>
        </div>

        <div className="time-middle">
          <span className="duration">{trip.duration || "1h30'"}</span>
          <span className="duration-arrow" />
        </div>

        <div className="time-block time-right">
          <span className="time-main">{trip.arrive}</span>
          <span className="time-sub time-to">{trip.to}</span>
        </div>
      </div>

      <p className="trip-note">
        *Thuộc chuyến {trip.depart} 20-11-2024 Hà Nội - Hải Phòng
      </p>
    </div>

    <div className="trip-price-col">
      <div className="trip-price">
        <span className="price-from">Từ</span>
        <span className="price-value">
          {trip.price.toLocaleString("vi-VN")}đ
        </span>
        <span className="seat-left">10 Còn trống</span>
      </div>
      <button className="detail-btn">Thông tin chi tiết</button>
      <button className="choose-btn">Chọn xe</button>
    </div>
  </article>
))}

          </section>
        </div>
      </div>
    </div>
  );
};

export default Booking;
