import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/client";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    if (password !== confirm) {
      setErr("Mật khẩu nhập lại không khớp");
      return;
    }
    setLoading(true);
    try {
      // Đổi endpoint theo backend của nhóm
      await api("/api/auth/register", {
        method: "POST",
        body: { name, email, password },
      });
      // sau đăng ký: chuyển về login
      navigate("/login");
    } catch (error) {
      setErr(error?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "60px auto", lineHeight: 1.6 }}>
      <h2>Car Ticket Booking — Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Họ tên</label><br />
          <input value={name} onChange={e=>setName(e.target.value)} required />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Email</label><br />
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Mật khẩu</label><br />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Nhập lại mật khẩu</label><br />
          <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required />
        </div>
        {err && <div style={{ color:"crimson", marginTop:10 }}>{err}</div>}
        <button disabled={loading} style={{ marginTop: 12 }}>
          {loading ? "Creating..." : "Đăng ký"}
        </button>
      </form>
      <p style={{ marginTop: 12 }}>
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
}
