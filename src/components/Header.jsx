import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import "./header.css";

export default function Header() {
  const [open, setOpen] = useState(false);          // mobile drawer
  const [openSearch, setOpenSearch] = useState(false); // search overlay
  const { pathname } = useLocation();

  // đóng menu khi đổi route + khóa/unlock scroll
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  // ESC to close search
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpenSearch(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* TOPBAR (desktop) */}
      <div className="topbar">
        <div className="container">
          <span>Hệ thống Đặt Vé Xe Toàn Quốc</span>
          <div className="tb-right">
            <a href="mailto:info@carticket.com">info@carticket.com</a>
            <span className="sep" />
            <a href="tel:19000152">1900 0152</a>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="container nav-inner">
          {/* mobile: nút menu */}
          <button
            className="hamburger"
            onClick={() => setOpen(true)}
            aria-label="Mở menu"
          >
            ☰
          </button>

          {/* logo */}
          <Link to="/" className="brand">
            <img src="/logo.png" alt="Vivutoday" />
          </Link>

          {/* menu desktop */}
          <ul className="menu">
            <li><NavLink to="/home" end>Trang chủ</NavLink></li>
            <li><NavLink to="/gioi-thieu">Giới thiệu</NavLink></li>
            <li><NavLink to="/thongtinnhaxe">Thông tin nhà xe</NavLink></li>
            <li><NavLink to="/bus-station">Bến xe</NavLink></li>
            <li><NavLink to="/tuyen-duong">Tuyến đường</NavLink></li>
            <li><NavLink to="/kiemtrave">Kiểm tra vé</NavLink></li>
          </ul>

          {/* nút search nhỏ (desktop) */}
          <button
            className="search-mini"
            aria-label="Tìm kiếm"
            onClick={() => setOpenSearch(true)}
          >
            🔍
          </button>
        </div>
      </nav>

      {/* DRAWER mobile */}
      <aside className={`mobile-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <button
          className="drawer-close"
          onClick={() => setOpen(false)}
          aria-label="Đóng menu"
        >
          ✕
        </button>
        <ul>
          <li><NavLink to="/home" end>Trang chủ</NavLink></li>
          <li><NavLink to="/gioi-thieu">Giới thiệu</NavLink></li>
          <li><NavLink to="/thongtinnhaxe">Thông tin nhà xe</NavLink></li>
          <li><NavLink to="/bus-station">Bến xe</NavLink></li>
          <li><NavLink to="/tuyen-duong">Tuyến đường</NavLink></li>
          <li><NavLink to="/kiemtrave">Kiểm tra vé</NavLink></li>
        </ul>
      </aside>
      {open && <div className="drawer-overlay" onClick={() => setOpen(false)} />}

      {/* OVERLAY TÌM KIẾM */}
      {openSearch && <SearchOverlay onClose={() => setOpenSearch(false)} />}
    </>
  );
}

/* ==== Ô tìm kiếm (overlay) giữ style menu hiện có ==== */
function SearchOverlay({ onClose }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [form, setForm] = useState({ from: "", to: "", date: "" });

  useEffect(() => { ref.current?.querySelector("input")?.focus(); }, []);

  const update = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    // Demo: hiện alert. Bạn có thể điều hướng sang trang kết quả:
    // navigate(`/booking?from=${encodeURIComponent(form.from)}&to=${encodeURIComponent(form.to)}&date=${form.date}`);
    alert(`Tìm: ${form.from} → ${form.to} | ${form.date || "Chưa chọn ngày"}`);
    onClose();
  };

  const backdropClick = (e) => {
    if (e.target.classList.contains("search-overlay")) onClose();
  };

  return (
    <div className="search-overlay" onMouseDown={backdropClick} role="dialog" aria-modal="true">
      <div className="search-sheet" ref={ref}>
        <div className="sheet-head">
          <h3>Tìm chuyến xe</h3>
          <button className="sheet-close" onClick={onClose} aria-label="Đóng">✕</button>
        </div>

        <form className="sheet-form" onSubmit={submit}>
          <div className="field">
            <label>Điểm khởi hành</label>
            <input placeholder="Chọn điểm đi" value={form.from} onChange={update("from")} />
          </div>
          <div className="field">
            <label>Điểm đến</label>
            <input placeholder="Chọn điểm đến" value={form.to} onChange={update("to")} />
          </div>
          <div className="field">
            <label>Ngày khởi hành</label>
            <input type="date" value={form.date} onChange={update("date")} />
          </div>
          <div className="sheet-actions">
            <button type="button" className="btn-ghost" onClick={onClose}>Huỷ</button>
            <button type="submit" className="btn-primary">🔎 TÌM CHUYẾN XE</button>
          </div>
        </form>
      </div>
    </div>
  );
}
