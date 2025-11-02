import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import axios from "axios";
import "../page/Signup.css"; // CSS riêng cho Signup
import logo from "/logo.png"; // logo trong public

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Họ không được để trống";
    if (!formData.lastName.trim()) newErrors.lastName = "Tên không được để trống";
    if (!formData.email.includes("@")) newErrors.email = "Email không hợp lệ";
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
    } else {
      try {
        const response = await axios.post('http://localhost:8081/api/v1/auth/register', formData);
        if (response.data.code === 201) {
          alert("Đăng ký thành công!");
          navigate("/login");
        }
      } catch (error) {
        if (error.response) {
          // Xử lý lỗi từ server
          alert(error.response.data.message || "Đăng ký thất bại. Vui lòng thử lại!");
        } else {
          // Xử lý lỗi network/connection
          alert("Không thể kết nối đến server. Vui lòng thử lại sau!");
        }
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="form-box">
        <img src={logo} alt="logo" className="logo" />
        <h2>ĐĂNG KÝ TÀI KHOẢN</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="Họ"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}

          <input
            type="text"
            name="lastName"
            placeholder="Tên"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="text"
            name="phone"
            placeholder="Điện thoại"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit" className="btn-primary">
            ĐĂNG KÝ NGAY
          </button>
        </form>

        <div className="divider">Hoặc đăng nhập với</div>

        <div className="social-login">
          <button className="btn facebook">
            <FaFacebookF /> FACEBOOK
          </button>
          <button className="btn google">
            <FaGoogle /> GOOGLE
          </button>
          <button className="btn apple">
            <FaApple /> APPLE
          </button>
        </div>

        <p>
          Bạn đã có tài khoản? <a href="#">Đăng nhập ngay</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
