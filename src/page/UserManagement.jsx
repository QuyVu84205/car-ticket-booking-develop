import React, { useState } from "react";
import "./UserManagement.css";

import vivu from "../icon/vivu.png";
import dmca from "../icon/dmca.png";
import nccs from "../icon/nccs.png";
import vantai from "../icon/vantai.png";

function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: "Nguyễn Văn A", email: "a@example.com", role: "Admin" },
    { id: 2, name: "Trần Thị B", email: "b@example.com", role: "User" },
  ]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" });
  const [editingUser, setEditingUser] = useState(null);

  // 🟢 Thêm hoặc cập nhật user
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(
        users.map((u) => (u.id === editingUser.id ? editingUser : u))
      );
      setEditingUser(null);
    } else {
      setUsers([
        ...users,
        { id: Date.now(), ...newUser },
      ]);
      setNewUser({ name: "", email: "", role: "User" });
    }
  };

  // 🔵 Xóa user
  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  // ✏️ Sửa user
  const handleEdit = (user) => {
    setEditingUser(user);
  };

  return (
    <div className="usermanagement-container">
      {/* 🔵 Thanh top */}
      <div className="top-bar">
        <div>🚍 Hệ Thống Đặt Vé Xe Toàn Quốc</div>
        <div>📧 info.vivutoday@gmail.com &nbsp; | &nbsp; 📞 1900 0152</div>
      </div>

      {/* ⚪ Header */}
      <header className="main-header">
        <div className="logo">
          <img src={vivu} alt="VIVU Today" />
        </div>
        <nav className="menu">
          <a href="#">TRANG CHỦ</a>
          <a href="#">GIỚI THIỆU</a>
          <a href="#">THÔNG TIN NHÀ XE</a>
          <a href="#">BẾN XE</a>
          <a href="#">TUYẾN ĐƯỜNG</a>
          <a href="#" className="active">QUẢN LÝ NGƯỜI DÙNG</a>
        </nav>
        <div className="search-box">
          <button>🔍</button>
        </div>
      </header>

      {/* 🔹 User Management Section */}
      <div className="form-section">
        <h2>Quản lý người dùng</h2>

        <div className="form-box user-management">
          {/* Form thêm/sửa người dùng */}
          <form className="user-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Tên người dùng"
              value={editingUser ? editingUser.name : newUser.name}
              onChange={(e) =>
                editingUser
                  ? setEditingUser({ ...editingUser, name: e.target.value })
                  : setNewUser({ ...newUser, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={editingUser ? editingUser.email : newUser.email}
              onChange={(e) =>
                editingUser
                  ? setEditingUser({ ...editingUser, email: e.target.value })
                  : setNewUser({ ...newUser, email: e.target.value })
              }
              required
            />
            <select
              value={editingUser ? editingUser.role : newUser.role}
              onChange={(e) =>
                editingUser
                  ? setEditingUser({ ...editingUser, role: e.target.value })
                  : setNewUser({ ...newUser, role: e.target.value })
              }
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            <button type="submit">
              {editingUser ? "Cập nhật" : "Thêm người dùng"}
            </button>
          </form>

          {/* Bảng danh sách người dùng */}
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleEdit(user)}>✏️</button>
                    <button onClick={() => handleDelete(user.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔹 Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>Tin tức</h3>
            <ul>
              <li>Xe Limousine – Đẳng cấp hạng thương gia thời đại mới</li>
              <li>Tổng quan các bến xe Vũng Tàu – Giới thiệu thông tin lộ trình</li>
              <li>Top 31 nhà xe limousine, xe giường nằm đi Đà Lạt</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Tuyến đường</h3>
            <ul>
              <li>Xe đi Buôn Mê Thuột từ Sài Gòn</li>
              <li>Xe đi Vũng Tàu từ Sài Gòn</li>
              <li>Xe đi Nha Trang từ Sài Gòn</li>
              <li>Xe đi Đà Lạt từ Sài Gòn</li>
              <li>Xe đi Sapa từ Hà Nội</li>
              <li>Xe đi Hải Phòng từ Hà Nội</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Xe Limousine</h3>
            <ul>
              <li>Xe Limousine đi Đà Lạt từ Sài Gòn</li>
              <li>Xe Limousine đi Vũng Tàu từ Sài Gòn</li>
              <li>Xe Limousine đi Nha Trang từ Sài Gòn</li>
              <li>Xe Limousine đi Hải Phòng từ Hà Nội</li>
              <li>Xe Limousine đi Sapa từ Hà Nội</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Bến xe</h3>
            <ul>
              <li>Bến xe Miền Đông</li>
              <li>Bến xe Trung tâm Đà Nẵng</li>
              <li>Bến xe Gia Lâm</li>
              <li>Bến xe An Sương</li>
              <li>Bến xe Nước Ngầm</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Nhà xe</h3>
            <ul>
              <li>Xe Sao Việt</li>
              <li>Xe Hoà Mai</li>
              <li>Xe Hạ Long Travel</li>
              <li>Xe Quốc Đạt</li>
              <li>Xe Thanh Bình Xanh</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Về Chúng Tôi</h3>
            <ul>
              <li>Giới Thiệu Vivutoday</li>
              <li>Liên Hệ</li>
              <li>Giá trị cốt lõi</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Hỗ Trợ</h3>
            <ul>
              <li>Chính sách bảo mật</li>
              <li>Điều khoản và giao dịch</li>
              <li>Chính sách hoàn tiền</li>
              <li>Chính sách thanh toán</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Liên hệ</h3>
            <p>Hotline: <strong>1900 0152</strong></p>
            <p>Hotline: <strong>1900 996 678</strong></p>
            <p>Hotline: <strong>1900 0179</strong></p>
          </div>

          <div className="footer-section">
            <h3>Chứng nhận</h3>
            <div className="cert">
              <img src={dmca} alt="DMCA" />
              <img src={nccs} alt="NCCS" />
              <img src={vantai} alt="Vận tải" />
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          © 2025 VivuToday.vn - All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default UserManagement;
