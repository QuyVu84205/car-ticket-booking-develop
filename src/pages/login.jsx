import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import authApi from "../api/authApi.js";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await authApi.login({ email, password });
      // Lưu token vào localStorage
      localStorage.setItem("token", response.data.token);
      alert("Đăng nhập thành công!");
      navigate("/home");
    } catch (error) {
      alert(error?.data?.message || "Đăng nhập thất bại!");
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
          <p>Đặt vé nhanh chóng – An tâm mỗi chuyến đi</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <span className="icon">📧</span>
            <input
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Đăng nhập
          </button>
        </form>
<p className="footer-text">
  Bạn chưa có tài khoản?{" "}
  <Link to="/signup" className="login-link">
    Đăng ký ngay
  </Link>
</p>

        <p className="footer-text">
          © {new Date().getFullYear()} Car Ticket Booking – All rights reserved
        </p>
      </div>
    </div>
  );
}
