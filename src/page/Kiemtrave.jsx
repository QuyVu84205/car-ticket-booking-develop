import React from "react";
import "./Kiemtrave.css";

import banner from "../icon/banner.png";

function Kiemtrave() {
  return (
    <div className="kiemtrave-page">
      <div className="container">
        {/* PHẦN TIÊU ĐỀ + THANH HƯỚNG DẪN */}
        <div className="ticket-top">
          {/* Tiêu đề: rộng đúng bằng form bên dưới */}
          <div className="ticket-title-box">
            <h2 className="ticket-title">Nhập thông tin vé xe</h2>
          </div>

          {/* Thanh xanh: rộng đúng bằng khối banner bên dưới */}
          <div className="ticket-guide">
            Vui lòng nhập vào thông tin và bấm kiểm tra vé
          </div>
        </div>

        {/* FORM + BANNER */}
        <div className="ticket-content">
          {/* Form kiểm tra vé */}
          <div className="ticket-form">
            <input type="text" placeholder="Mã Vé" />
            <input type="text" placeholder="Số điện thoại (Bắt Buộc)" />
            <button>Kiểm tra vé</button>
            <p className="ticket-note">
              Lưu ý: Trường hợp bạn không thể huỷ vé qua mạng hoặc muốn đổi
              sang đơn hàng khác vui lòng liên hệ qua số điện thoại{" "}
              <strong>1900 7070</strong> hoặc <strong>1900996681</strong>
            </p>
          </div>

          {/* Banner bên phải */}
          <div className="ticket-banner">
            <img src={banner} alt="Đặt vé ngay" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kiemtrave;
