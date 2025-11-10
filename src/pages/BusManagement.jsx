import { useMemo, useState } from "react";
import "./bus-management.css";

/** (TẠM) bọc quyền: hiện tại cho pass qua; sau bạn thay bằng logic check role admin  */
function AdminOnly({ children }) {
  // TODO: lấy role từ Redux/Context rồi redirect nếu không phải admin
  return children;
}

const DUMMY = [
  {
    id: "bus_01",
    plate: "51B-123.45",
    brand: "FUTA",
    type: "sleeper",
    seatCount: 44,
    driver: "Nguyễn Văn A",
    status: "active",
    updatedAt: "2025-11-09T12:00:00Z",
    photo: "/nhaxevulinh.png",
  },
  {
    id: "bus_02",
    plate: "72A-888.99",
    brand: "Toàn Thắng",
    type: "limousine",
    seatCount: 16,
    driver: "Trần B",
    status: "maintenance",
    updatedAt: "2025-11-08T10:12:00Z",
    photo: "/nhaxetoanthang.jpg",
  },
];

export default function BusManagement() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const rows = useMemo(() => {
    return DUMMY.filter((x) => {
      const okQ =
        !q ||
        x.plate.toLowerCase().includes(q.toLowerCase()) ||
        x.brand.toLowerCase().includes(q.toLowerCase()) ||
        x.driver.toLowerCase().includes(q.toLowerCase());
      const okStatus = status === "all" || x.status === status;
      return okQ && okStatus;
    });
  }, [q, status]);

  const openCreate = () => {
    setEditing(null);
    setDrawerOpen(true);
  };
  const openEdit = (row) => {
    setEditing(row);
    setDrawerOpen(true);
  };

  return (
    <AdminOnly>
      <div className="admin-page">
        {/* Breadcrumb */}
        <div className="admin-breadcrumb">
          <span>Quản lý</span>
          <span>•</span>
          <strong>Xe khách</strong>
        </div>

        {/* Header + Actions */}
        <div className="admin-header">
          <h1>Xe khách</h1>
          <div className="actions">
            <button className="btn" onClick={openCreate}>+ Tạo xe</button>
            <button className="btn ghost">Import CSV</button>
            <button className="btn ghost">Export</button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="toolbar">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm biển số / nhà xe / tài xế…"
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="maintenance">Bảo trì</option>
            <option value="hidden">Ẩn</option>
          </select>
        </div>

        {/* Quick stats (demo) */}
        <div className="stats">
          <div className="stat">
            <div className="stat-num">2</div>
            <div className="stat-label">Tổng xe</div>
          </div>
          <div className="stat">
            <div className="stat-num green">1</div>
            <div className="stat-label">Đang hoạt động</div>
          </div>
          <div className="stat">
            <div className="stat-num orange">1</div>
            <div className="stat-label">Bảo trì</div>
          </div>
        </div>

        {/* Data table */}
        <div className="card table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Biển số</th>
                <th>Nhà xe</th>
                <th>Loại</th>
                <th>Ghế</th>
                <th>Tài xế</th>
                <th>Trạng thái</th>
                <th>Cập nhật</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <img className="thumb" src={r.photo} alt={r.plate} />
                  </td>
                  <td className="mono">{r.plate}</td>
                  <td>{r.brand}</td>
                  <td>
                    {r.type === "sleeper" ? "Giường nằm" : r.type === "limousine" ? "Limousine" : "Ghế ngồi"}
                  </td>
                  <td>{r.seatCount}</td>
                  <td>{r.driver}</td>
                  <td>
                    <span className={`badge ${r.status}`}>{labelStatus(r.status)}</span>
                  </td>
                  <td>{new Date(r.updatedAt).toLocaleString()}</td>
                  <td>
                    <button className="link" onClick={() => openEdit(r)}>Sửa</button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center", padding: 24 }}>
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Drawer (tạo/sửa) */}
        {drawerOpen && (
          <div className="drawer">
            <div className="drawer-panel">
              <div className="drawer-head">
                <strong>{editing ? "Sửa xe" : "Tạo xe"}</strong>
                <button className="icon" onClick={() => setDrawerOpen(false)}>✕</button>
              </div>

              <div className="drawer-body">
                {/* form đơn giản — bạn nối API sau */}
                <div className="form-grid">
                  <div className="field">
                    <label>Biển số</label>
                    <input defaultValue={editing?.plate || ""} />
                  </div>
                  <div className="field">
                    <label>Nhà xe</label>
                    <input defaultValue={editing?.brand || ""} />
                  </div>
                  <div className="field">
                    <label>Loại xe</label>
                    <select defaultValue={editing?.type || "sleeper"}>
                      <option value="seat">Ghế ngồi</option>
                      <option value="sleeper">Giường nằm</option>
                      <option value="limousine">Limousine</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Số ghế</label>
                    <input type="number" defaultValue={editing?.seatCount || 44} />
                  </div>
                  <div className="field">
                    <label>Tài xế</label>
                    <input defaultValue={editing?.driver || ""} />
                  </div>
                  <div className="field">
                    <label>Trạng thái</label>
                    <select defaultValue={editing?.status || "active"}>
                      <option value="active">Đang hoạt động</option>
                      <option value="maintenance">Bảo trì</option>
                      <option value="hidden">Ẩn</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="drawer-foot">
                <button className="btn" onClick={() => setDrawerOpen(false)}>Lưu</button>
                <button className="btn ghost" onClick={() => setDrawerOpen(false)}>Hủy</button>
              </div>
            </div>
            <div className="drawer-mask" onClick={() => setDrawerOpen(false)} />
          </div>
        )}
      </div>
    </AdminOnly>
  );
}

function labelStatus(s) {
  if (s === "active") return "Đang hoạt động";
  if (s === "maintenance") return "Bảo trì";
  if (s === "hidden") return "Ẩn";
  return s;
}
