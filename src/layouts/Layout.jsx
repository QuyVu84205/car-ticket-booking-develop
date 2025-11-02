import Header from "../components/Header.jsx"; // nếu bạn đang dùng
import Footer from "../components/Footer.jsx";
import "../styles/footer.css"; // đảm bảo được load một lần
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <Outlet />
      <Footer /> {/* Footer dùng chung toàn site */}
    </div>
  );
}
