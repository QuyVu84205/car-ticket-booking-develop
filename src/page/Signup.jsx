import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../pages/login.css"; // dùng lại style của login

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};

export default function Signup() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // nếu field đang có lỗi thì xoá lỗi khi user sửa
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "Họ không được để trống";
    if (!formData.lastName.trim())
      newErrors.lastName = "Tên không được để trống";
    if (!formData.email.includes("@"))
      newErrors.email = "Email không hợp lệ";
    if (!/^[0-9]{9,11}$/.test(formData.phone))
      newErrors.phone = "Số điện thoại không hợp lệ";
    if (formData.password.length < 6)
      newErrors.password = "Mật khẩu tối thiểu 6 ký tự";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/auth/register",
        formData
      );

      if (response.data.code === 201) {
        alert("Đăng ký thành công!");
        navigate("/login");
      } else {
        alert(response.data.message || "Đăng ký thất bại!");
      }
    } catch (error) {
      if (error.response) {
        alert(
          error.response.data.message ||
            "Đăng ký thất bại. Vui lòng thử lại!"
        );
      } else {
        alert("Không thể kết nối đến server. Vui lòng thử lại sau!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-header">
          <img src="/logo.png" alt="Car Ticket Logo" className="logo" />
          <h2>Car Ticket Booking</h2>
          <p>Tạo tài khoản – Sẵn sàng mọi chuyến đi</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Họ */}
          <div
            className={`input-group ${
              errors.firstName ? "has-error" : ""
            }`}
          >
            <span className="icon"></span>
            <input
              type="text"
              name="firstName"
              placeholder="Họ"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <div className="error-bubble">{errors.firstName}</div>
            )}
          </div>

          {/* Tên */}
          <div
            className={`input-group ${
              errors.lastName ? "has-error" : ""
            }`}
          >
            <span className="icon"></span>
            <input
              type="text"
              name="lastName"
              placeholder="Tên"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <div className="error-bubble">{errors.lastName}</div>
            )}
          </div>

          {/* Email */}
          <div
            className={`input-group ${
              errors.email ? "has-error" : ""
            }`}
          >
            <span className="icon"></span>
            <input
              type="email"
              name="email"
              placeholder="Nhập email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="error-bubble">{errors.email}</div>
            )}
          </div>

          {/* Số điện thoại */}
          <div
            className={`input-group ${
              errors.phone ? "has-error" : ""
            }`}
          >
            <span className="icon"></span>
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <div className="error-bubble">{errors.phone}</div>
            )}
          </div>

          {/* Mật khẩu */}
          <div
            className={`input-group ${
              errors.password ? "has-error" : ""
            }`}
          >
            <span className="icon"></span>
            <input
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="error-bubble">{errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <p className="footer-text">
          Bạn đã có tài khoản?{" "}
          <Link to="/login" className="login-link">
            Đăng nhập ngay
          </Link>
        </p>

        <p className="footer-text">
          © {new Date().getFullYear()} Car Ticket Booking - All rights
          reserved
        </p>
      </div>
    </div>
  );
}
