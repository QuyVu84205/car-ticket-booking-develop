// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth pages (không có header)
import Login from "./pages/login.jsx";
import Register from "./pages/Register.jsx";

// Pages có header
import Home from "./pages/Home.jsx";
import Thongtinnhaxe from "./pages/ThongTinNhaXe.jsx";
import BusStation from "./pages/bus-station.jsx";
import GioiThieu from "./pages/GioiThieu.jsx";
import TuyenDuong from "./pages/TuyenDuong.jsx";

import Signup from "./page/Signup";        // nếu cần
import Booking from "./page/Booking";
import Baiviet from "./page/Baiviet";
import Kiemtrave from "./page/Kiemtrave";
import UserManagement from "./page/UserManagement";

// Layout bọc Header + Outlet
import MainLayout from "./layouts/MainLayout.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Nhóm route KHÔNG có header */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/signup" element={<Signup />} /> */}

        {/* Nhóm route CÓ header: bọc bởi MainLayout */}
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

          {/* Alias/redirect để không bị trắng trang khi dùng slug tiếng Việt */}
          <Route path="/ben-xe" element={<Navigate to="/bus-station" replace />} />
        </Route>

        {/* Bắt tất cả: nếu gõ sai đường dẫn -> về home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
