import React from "react";
import "./Kiemtrave.css";

import banner from "../icon/banner.png";

function Kiemtrave() {
  return (
    <div className="kiemtrave-container">
      {/* 🔹 Form kiểm tra vé */}
      <div className="form-section">
        <h2>Nhập thông tin vé xe</h2>
        <div className="form-box">
          <div className="form-inputs">
            <input type="text" placeholder="Mã Vé" />
            <input type="text" placeholder="Số điện thoại (Bắt Buộc)" />
            <button>Kiểm tra vé</button>
            <p className="note">
              Lưu ý: Trường hợp bạn không thể huỷ vé qua mạng hoặc muốn đổi sang đơn hàng khác vui lòng liên hệ qua số 1900 7070 hoặc 1900996681
            </p>
          </div>
          <div className="form-banner">
            <img src={banner} alt="Đặt vé ngay" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kiemtrave;
