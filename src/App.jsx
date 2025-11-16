// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth pages (không có header)
import Login from "./pages/login.jsx";
import Register from "./pages/Register.jsx";

// Pages có header (public)
import Home from "./pages/Home.jsx";
import Thongtinnhaxe from "./pages/ThongTinNhaXe.jsx";
import BusStation from "./pages/bus-station.jsx";
import GioiThieu from "./pages/GioiThieu.jsx";
import TuyenDuong from "./pages/TuyenDuong.jsx";

import Signup from "./page/Signup";
import Booking from "./page/Booking";
import Baiviet from "./page/Baiviet";
import Kiemtrave from "./page/Kiemtrave";
import UserManagement from "./page/UserManagement";

// ADMIN pages
import BusManagement from "./pages/BusManagement.jsx";
import TripManagement from "./pages/TripManagement.jsx";
import BookingManagement from "./pages/BookingManagement.jsx";

// Layout bọc Header + Outlet (public)
import MainLayout from "./layouts/MainLayout.jsx";
// Layout riêng cho admin (sidebar + Outlet)
import AdminLayout from "./layouts/AdminLayout.jsx";

/* ================== PHÂN QUYỀN ADMIN ================== */
function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("auth:user"));
  } catch {
    return null;
  }
}
function RequireAdmin({ children }) {
  const user = getCurrentUser();
  return user?.role === "admin" ? children : <Navigate to="/login" replace />;
}
/* ====================================================== */

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===== Auth (không có header) ===== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<Signup />} />

        {/* <Route path="/signup" element={<Signup />} /> */}

        {/* ===== Public (có header) ===== */}
        <Route element={<MainLayout />}>
          {/* Trang chủ */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />

          {/* Các trang nội dung */}
          <Route path="/thongtinnhaxe" element={<Thongtinnhaxe />} />
          <Route path="/bus-station" element={<BusStation />} />
          <Route path="/gioi-thieu" element={<GioiThieu />} />
          <Route path="/tuyen-duong" element={<TuyenDuong />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/baiviet" element={<Baiviet />} />
          <Route path="/kiemtrave" element={<Kiemtrave />} />
          <Route path="/usermanagement" element={<UserManagement />} />

          {/* Alias/redirect tiện dụng */}
          <Route path="/ben-xe" element={<Navigate to="/bus-station" replace />} />
          <Route path="/quan-ly-xe" element={<Navigate to="/admin/bus-management" replace />} />
        </Route>

        {/* ===== Admin area (dùng AdminLayout + RequireAdmin) ===== */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          {/* /admin → mặc định về quản lý xe */}
          <Route index element={<Navigate to="bus-management" replace />} />
          <Route path="bus-management" element={<BusManagement />} />
          <Route path="trips" element={<TripManagement />} />
          <Route path="bookings" element={<BookingManagement />} />
          {/* nếu bạn muốn trang “users”, thêm dòng dưới rồi tạo trang tương ứng:
             <Route path="users" element={<UserManagement />} /> */}
        </Route>

        {/* ===== 404 → về home ===== */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
