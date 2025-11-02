import React, { useState } from "react";
import "./Booking.css";

// Chỉ giữ ảnh còn dùng trong page
import container from "../icon/container.png";

const Booking = () => {
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
      id: 3,
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
      {/* 🟡 Thanh tìm chuyến */}
      <section className="search-section">
        <h2>Hà Nội Đến Hải Phòng</h2>
        <div className="search-fields">
          <div className="field">
            Điểm khởi hành<br /><span>Chọn Điểm Khởi Hành</span>
          </div>
          <div className="field">
            Điểm đến<br /><span>Chọn Điểm Đến</span>
          </div>
          <div className="field">
            Ngày khởi hành<br /><span>Chọn Ngày</span>
          </div>
          <button className="search-btn">TÌM CHUYẾN XE</button>
        </div>
      </section>

      {/* 🔶 Nội dung chính */}
      <div className="content">
        {/* Bộ lọc */}
        <aside className="filter-box">
          <h3>Tiêu chí phổ biến</h3>
          <label><input type="checkbox" /> Chuyến giảm giá (370)</label>
          <label><input type="checkbox" /> Xe VIP Limousine (433)</label>

          <h3>Giờ đi</h3>
          <input type="range" min="0" max="23" />

          <h3>Giá vé</h3>
          <input type="range" min="0" max="2000000" />

          <h3>Nhà xe</h3>
          <label><input type="checkbox" /> Anh Huy (Hải Phòng)</label>
          <label><input type="checkbox" /> Anh Huy Đất Cảng</label>
          <label><input type="checkbox" /> Hoàng Anh</label>

          <button className="clear-btn">Xóa đã chọn</button>
        </aside>

        {/* Danh sách chuyến */}
        <section className="trip-list">
          <div className="sort-bar">
            <span>Sắp xếp theo tuyến đường:</span>
            <select><option>Giờ đi</option></select>
            <select><option>Mức giá</option></select>
          </div>

          {trips.map((trip) => (
            <div key={trip.id} className="trip-card">
              <img src={container} alt="Xe" className="trip-img" />
              <div className="trip-info">
                <h4>
                  {trip.name} <span className="rating">⭐ {trip.rating}</span>
                </h4>
                <p className="reviews">{trip.reviews} Đánh giá</p>
                <div className="time">
                  <strong>{trip.depart}</strong> → <strong>{trip.arrive}</strong>
                </div>
                <p className="route">
                  {trip.from} → <span>{trip.to}</span>
                </p>
                <small>*Thuộc chuyến {trip.depart} 20-11-2024 Hà Nội - Hải Phòng</small>
              </div>
              <div className="trip-action">
                <p className="price">
                  Từ <strong>{trip.price.toLocaleString()}đ</strong>
                </p>
                <p className="seats">10 còn trống</p>
                <button className="choose-btn">Chọn xe</button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Booking;
