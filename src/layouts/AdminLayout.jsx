
import React from "react";
import { Outlet, NavLink, Navigate, useNavigate } from "react-router-dom";
import "./admin-layout.css";

export default function AdminLayout() {
  const navigate = useNavigate();
  const userJson = localStorage.getItem("auth:user");
  const user = userJson ? JSON.parse(userJson) : null;

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const firstLetter =
    user?.name?.trim()?.charAt(0)?.toUpperCase() ||
    user?.username?.trim()?.charAt(0)?.toUpperCase() ||
    "A";

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        {/* Logo + brand */}
        <div className="admin-brand">
          <div className="admin-logo-icon">
            <img src="/logo.png" alt="Vivutoday"/></div>
          <div className="admin-logo-text">
            <span className="brand-title">Vivutoday</span>
            <span className="brand-subtitle">Admin Panel</span>
          </div>
        </div>

        {/* Menu */}
        <nav className="admin-nav">
          <NavLink to="/admin/dashboard" className="admin-link">
            <span className="nav-icon"></span>
            <span>Tổng quan</span>
          </NavLink>
          <NavLink to="/admin/bus-management" className="admin-link">
            <span className="nav-icon"></span>
            <span>Quản lý xe</span>
          </NavLink>
          <NavLink to="/admin/trips" className="admin-link">
            <span className="nav-icon"></span>
            <span>Quản lý chuyến</span>
          </NavLink>
          <NavLink to="/admin/bookings" className="admin-link">
            <span className="nav-icon"></span>
            <span>Quản lý vé</span>
          </NavLink>
        </nav>

        {/* User + logout */}
        <div className="admin-sidebar-footer">
          <div className="admin-user">
            <div className="admin-avatar">{firstLetter}</div>
            <div className="admin-user-info">
              <span className="admin-user-name">
                {user?.name || user?.username || "Admin"}
              </span>
              <span className="admin-user-role">Quản trị viên</span>
            </div>
          </div>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("auth:user");
              navigate("/login");
            }}
          >
             Đăng xuất
          </button>
        </div>
      </aside>

      {/* NỘI DUNG CHÍNH */}
      <main className="admin-main">
        <header className="admin-main-header">
          <div>
            <h1 className="admin-page-title">Trang quản trị</h1>
            <p className="admin-page-subtitle">
              Quản lý xe, chuyến đi, vé đặt và hệ thống Vivutoday.
            </p>
          </div>
        </header>

        <div className="admin-main-body">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
