// src/pages/BusManagement.jsx
import React, { useMemo, useState, useRef, useLayoutEffect } from "react";
import "./bus-management.css";

/** ================== MOCK DATA ================== */
const VEHICLES0 = [
  { id: "v1", plateNumber: "51B-123.45", type: "Sleeper", seats: 40, status: "ACTIVE", odometerKm: 185000, lastServiceAt: "2025-08-01", nextServiceAt: "2025-11-01" },
  { id: "v2", plateNumber: "79A-456.78", type: "Limousine", seats: 16, status: "IN_SERVICE", odometerKm: 92000, lastServiceAt: "2025-09-05", nextServiceAt: "2025-12-05" },
  { id: "v3", plateNumber: "29B-999.01", type: "Seater", seats: 45, status: "MAINTENANCE", odometerKm: 210000, lastServiceAt: "2025-07-12", nextServiceAt: "2025-10-12" },
];

const JOBS0 = [
  { id: "m1", vehicleId: "v3", kind: "REPAIR",  title: "Thay bố thắng + thay nhớt", startDate: "2025-11-12", status: "IN_PROGRESS", estimatedCost: 5500000 },
  { id: "m2", vehicleId: "v1", kind: "ROUTINE", title: "Bảo dưỡng 10.000km",        startDate: "2025-12-02", status: "PLANNED",     estimatedCost: 2500000 },
];

/** Helpers */
const STATUS_MAP = {
  ACTIVE:       { text: "Đang chạy",  cls: "tag-green"  },
  IN_SERVICE:   { text: "Trực tuyến", cls: "tag-blue"   },
  MAINTENANCE:  { text: "Bảo trì",    cls: "tag-orange" },
  RETIRED:      { text: "Ngưng",      cls: "tag-gray"   },
};
const JOB_STATUS = {
  PLANNED:     "Kế hoạch",
  IN_PROGRESS: "Đang làm",
  DONE:        "Hoàn tất",
  OVERDUE:     "Trễ hẹn",
};

export default function BusManagement() {
  const [tab, setTab] = useState("vehicles");   // 'vehicles' | 'maintenance'
  const [vehicles, setVehicles] = useState(VEHICLES0);
  const [jobs, setJobs] = useState(JOBS0);

  // filters
  const [q, setQ] = useState("");
  const [fType, setFType] = useState("");
  const [fStatus, setFStatus] = useState("");

  const filtered = useMemo(() => {
    return vehicles.filter(v =>
      (q ? v.plateNumber.toLowerCase().includes(q.toLowerCase()) : true) &&
      (fType ? v.type === fType : true) &&
      (fStatus ? v.status === fStatus : true)
    );
  }, [vehicles, q, fType, fStatus]);

  // modal add/edit
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing]   = useState(null); // vehicle | null
  const [form, setForm] = useState({
    plateNumber: "", type: "Seater", seats: 40, status: "ACTIVE",
    odometerKm: 0, lastServiceAt: "", nextServiceAt: ""
  });

  // modal delete
  const [openDelete, setOpenDelete] = useState(false);
  const [deleting, setDeleting]     = useState(null); // vehicle | null

  function resetForm(v) {
    setForm(
      v || { plateNumber: "", type: "Seater", seats: 40, status: "ACTIVE",
             odometerKm: 0, lastServiceAt: "", nextServiceAt: "" }
    );
  }
  function onAdd()   { setEditing(null); resetForm(); setOpenForm(true); }
  function onEdit(v) { setEditing(v);    resetForm(v); setOpenForm(true); }

  function onSubmit(e) {
    e.preventDefault();
    if (!/^[0-9]{2}[A-Z]-?[0-9]{3}\.?[0-9]{2}$/.test(form.plateNumber)) {
      alert("Biển số không hợp lệ (ví dụ: 51B-123.45)");
      return;
    }
    if (editing) {
      setVehicles(vs => vs.map(v => v.id === editing.id ? { ...editing, ...form } : v));
    } else {
      const id = "v" + (Math.random() * 1e6 | 0);
      setVehicles(vs => [{ id, ...form }, ...vs]);
    }
    setOpenForm(false);
  }

  function requestDelete(v) {
    setDeleting(v);
    setOpenDelete(true);
  }

  function confirmDelete() {
    if (!deleting) return;

    // Không cho xóa nếu còn lịch bảo trì Kế hoạch/Đang làm
    const hasFutureJob = jobs.some(j =>
      j.vehicleId === deleting.id &&
      (j.status === "PLANNED" || j.status === "IN_PROGRESS")
    );
    if (hasFutureJob) {
      alert("Xe còn lịch bảo trì (Kế hoạch / Đang làm). Vui lòng hủy hoặc hoàn tất trước khi xóa.");
      setOpenDelete(false);
      setDeleting(null);
      return;
    }
    // Xóa (mock)
    setVehicles(vs => vs.filter(v => v.id !== deleting.id));
    setJobs(js => js.filter(j => j.vehicleId !== deleting.id));
    setOpenDelete(false);
    setDeleting(null);
  }

  /** ========= giữ chiều cao khi đổi tab ========= */
  const sectionRef = useRef(null);
  const [minH, setMinH] = useState(560); // fallback để không bị co trang

  // mỗi lần tab đổi hoặc data đổi → đo lại, lấy chiều cao lớn nhất từng có
  useLayoutEffect(() => {
    const h = sectionRef.current?.offsetHeight || 0;
    if (h > 0) setMinH(prev => Math.max(prev, h));
  }, [tab, filtered.length, jobs.length]);

  return (
    <div className="busmg-page container">
      <div className="bm-header">
        <div>
          <h1 className="bm-title">Quản lý xe</h1>
          <p className="bm-sub">Theo dõi thông tin xe & lịch bảo trì.</p>
        </div>
        <div className="bm-actions">
          <button className="btn" data-active={tab==="vehicles"} onClick={() => setTab("vehicles")}>Xe</button>
          <button className="btn" data-active={tab==="maintenance"} onClick={() => setTab("maintenance")}>Bảo trì</button>
          {tab === "vehicles"     && <button className="btn btn-primary" onClick={onAdd}>+ Thêm xe</button>}
          {tab === "maintenance"  && <button className="btn btn-primary" onClick={() => alert("Mở form lập lịch…")}>+ Lập lịch bảo trì</button>}
        </div>
      </div>

      {/* SECTION WRAPPER: giữ minHeight để không co trang khi đổi tab */}
      <div className="bm-section" ref={sectionRef} style={{ minHeight: minH }}>
        {tab === "vehicles" && (
          <>
            <div className="bm-filters">
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm biển số…" />
              <select value={fType} onChange={e=>setFType(e.target.value)}>
                <option value="">Loại xe (tất cả)</option>
                <option>Seater</option><option>Sleeper</option>
                <option>Limousine</option><option>Minibus</option><option>Coach</option>
              </select>
              <select value={fStatus} onChange={e=>setFStatus(e.target.value)}>
                <option value="">Tình trạng (tất cả)</option>
                <option value="ACTIVE">Đang chạy</option>
                <option value="IN_SERVICE">Trực tuyến</option>
                <option value="MAINTENANCE">Bảo trì</option>
                <option value="RETIRED">Ngưng</option>
              </select>
            </div>

            <div className="bm-table">
              <div className="bm-thead">
                <div>Biển số</div><div>Loại xe</div><div>Số ghế</div>
                <div>Tình trạng</div><div>Km</div><div>Lần bảo trì</div><div></div>
              </div>
              {filtered.map(v => (
                <div className="bm-row" key={v.id}>
                  <div><span className="badge">{v.plateNumber}</span></div>
                  <div>{v.type}</div>
                  <div>{v.seats}</div>
                  <div><span className={`tag ${STATUS_MAP[v.status]?.cls}`}>{STATUS_MAP[v.status]?.text || v.status}</span></div>
                  <div>{v.odometerKm?.toLocaleString()} km</div>
                  <div>
                    <div><small>Gần nhất: {v.lastServiceAt || "-"}</small></div>
                    <div><small>Kế tiếp: {v.nextServiceAt || "-"}</small></div>
                  </div>
                  <div className="row-actions">
                    <button className="link" onClick={() => onEdit(v)}>Sửa</button>
                    <button className="link" onClick={() => alert("Mở nhật ký bảo trì cho " + v.plateNumber)}>Nhật ký</button>
                    <button className="link link-danger" onClick={() => requestDelete(v)}>Xóa</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "maintenance" && (
          <>
            <div className="bm-cards">
              {jobs.map(j => {
                const v = vehicles.find(x => x.id === j.vehicleId);
                return (
                  <div className="job-card" key={j.id}>
                    <div className="job-head">
                      <span className="badge">{v?.plateNumber || j.vehicleId}</span>
                      <span className={
                        `tag ${
                          j.status === 'DONE'        ? 'tag-green'  :
                          j.status === 'IN_PROGRESS' ? 'tag-blue'   :
                          j.status === 'PLANNED'     ? 'tag-orange' : 'tag-red'
                        }`
                      }>
                        {JOB_STATUS[j.status] || j.status}
                      </span>
                    </div>
                    <h4 className="job-title">{j.kind === 'REPAIR' ? 'Sửa chữa' : 'Định kỳ'} – {j.title}</h4>
                    <div className="job-meta">
                      <div>Ngày: {j.startDate}</div>
                      {j.estimatedCost ? <div>Dự toán: {j.estimatedCost.toLocaleString()}đ</div> : null}
                    </div>
                    <div className="row-actions">
                      <button className="link" onClick={() => alert("Cập nhật trạng thái")}>Cập nhật</button>
                      <button className="link link-danger" onClick={() => setJobs(x => x.filter(t => t.id !== j.id))}>Xóa</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* ===== Modal thêm/sửa xe ===== */}
      {openForm && (
        <div className="modal">
          <div className="modal-body">
            <h3>{editing ? "Sửa xe" : "Thêm xe"}</h3>
            <form onSubmit={onSubmit} className="bm-form">
              <label>Biển số
                <input required value={form.plateNumber}
                       onChange={e=>setForm({...form, plateNumber:e.target.value.toUpperCase()})}
                       placeholder="VD: 51B-123.45" />
              </label>
              <label>Loại xe
                <select value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
                  <option>Seater</option><option>Sleeper</option>
                  <option>Limousine</option><option>Minibus</option><option>Coach</option>
                </select>
              </label>
              <label>Số ghế
                <input type="number" min={8} max={60}
                       value={form.seats}
                       onChange={e=>setForm({...form, seats:+e.target.value})}/>
              </label>
              <label>Tình trạng
                <select value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
                  <option value="ACTIVE">Đang chạy</option>
                  <option value="IN_SERVICE">Trực tuyến</option>
                  <option value="MAINTENANCE">Bảo trì</option>
                  <option value="RETIRED">Ngưng</option>
                </select>
              </label>
              <label>Odometer (km)
                <input type="number" min={0}
                       value={form.odometerKm||0}
                       onChange={e=>setForm({...form, odometerKm:+e.target.value})}/>
              </label>
              <label>Lần bảo trì gần nhất
                <input type="date" value={form.lastServiceAt||""}
                       onChange={e=>setForm({...form, lastServiceAt:e.target.value})}/>
              </label>
              <label>Kế tiếp (dự kiến)
                <input type="date" value={form.nextServiceAt||""}
                       onChange={e=>setForm({...form, nextServiceAt:e.target.value})}/>
              </label>

              <div className="modal-actions">
                <button type="button" className="btn" onClick={()=>setOpenForm(false)}>Hủy</button>
                <button type="submit" className="btn btn-primary">{editing ? "Lưu" : "Thêm"}</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={()=>setOpenForm(false)} />
        </div>
      )}

      {/* ===== Modal xác nhận xóa xe ===== */}
      {openDelete && deleting && (
        <div className="modal">
          <div className="modal-body">
            <h3>Xóa xe</h3>
            <p>Bạn chắc chắn muốn xóa xe <b>{deleting.plateNumber}</b>?</p>
            <p style={{color:'#6b7280', marginTop: -8}}>
              Lưu ý: sẽ không xóa được nếu xe còn lịch bảo trì ở trạng thái “Kế hoạch/Đang làm”.
            </p>
            <div className="modal-actions">
              <button className="btn" onClick={()=>{ setOpenDelete(false); setDeleting(null); }}>Hủy</button>
              <button className="btn btn-danger" onClick={confirmDelete}>Xóa</button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={()=>{ setOpenDelete(false); setDeleting(null); }} />
        </div>
      )}
    </div>
  );
}
