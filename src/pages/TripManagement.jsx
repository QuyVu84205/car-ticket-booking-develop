import React, { useMemo, useState } from "react";
import "./trip-management.css";

/** ===== Mock ===== */
const TRIPS0 = [
  { id:"t01", date:"2025-11-12", depart:"Sài Gòn", arrive:"Đà Lạt", time:"20:00", vehicle:"Sleeper 40", status:"SCHEDULED", price:350000 },
  { id:"t02", date:"2025-11-12", depart:"Sài Gòn", arrive:"Vũng Tàu", time:"08:00", vehicle:"Limousine 16", status:"COMPLETED", price:180000 },
  { id:"t03", date:"2025-11-13", depart:"Sài Gòn", arrive:"Đà Nẵng", time:"18:30", vehicle:"Seater 45", status:"CANCELED", price:450000 },
];

const STATUS_LABEL = { SCHEDULED:"Đang chạy/Chờ chạy", COMPLETED:"Hoàn thành", CANCELED:"Hủy" };
const STATUS_CLASS = { SCHEDULED:"tag-blue", COMPLETED:"tag-green", CANCELED:"tag-red" };

function todayISO(){ return new Date().toISOString().slice(0,10); }

export default function TripManagement(){
  const [trips, setTrips] = useState(TRIPS0);
  const [day, setDay] = useState(todayISO());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    id:"", date: todayISO(), depart:"", arrive:"", time:"", vehicle:"", price:0, status:"SCHEDULED"
  });

  const list = useMemo(()=>trips.filter(t => t.date === day).sort((a,b)=>a.time.localeCompare(b.time)), [trips, day]);

  function openNew(){
    setEditing(null);
    setForm({ id:"", date: day, depart:"", arrive:"", time:"", vehicle:"", price:0, status:"SCHEDULED" });
    setDrawerOpen(true);
  }
  function openEdit(t){
    setEditing(t);
    setForm({...t});
    setDrawerOpen(true);
  }
  function saveTrip(e){
    e.preventDefault();
    if(editing){
      setTrips(arr => arr.map(x => x.id===editing.id ? {...form} : x));
    }else{
      const id = "t" + (Math.random()*1e5|0);
      setTrips(arr => [...arr, {...form, id}]);
    }
    setDrawerOpen(false);
  }
  function removeTrip(id){
    if(!confirm("Xóa chuyến này?")) return;
    setTrips(arr => arr.filter(x => x.id !== id));
  }

  return (
    <div className="tripmg container-timeline">
      {/* LEFT: calendar mini + filters */}
      <aside className="t-left">
        <h3>Lịch ngày</h3>
        <input type="date" value={day} onChange={e=>setDay(e.target.value)} />
        <p className="muted">Chọn ngày để xem các chuyến.</p>

        <div className="legend">
          <span className="tag tag-blue">Đang chạy</span>
          <span className="tag tag-green">Hoàn thành</span>
          <span className="tag tag-red">Hủy</span>
        </div>
      </aside>

      {/* MIDDLE: timeline list */}
      <main className="t-middle">
        <div className="header">
          <h2>Chuyến trong ngày {day}</h2>
          <span className="muted">{list.length} chuyến</span>
        </div>

        <div className="timeline">
          {list.map((t)=>(
            <div key={t.id} className="trip-row">
              <div className="time">{t.time}</div>
              <div className="content">
                <div className="top">
                  <b>{t.depart} → {t.arrive}</b>
                  <span className={`tag ${STATUS_CLASS[t.status]}`}>{STATUS_LABEL[t.status]}</span>
                </div>
                <div className="sub">
                  <span>{t.vehicle}</span> • <span>{t.price.toLocaleString()}đ</span>
                </div>
                <div className="actions">
                  <button className="link" onClick={()=>openEdit(t)}>Sửa</button>
                  <button className="link link-danger" onClick={()=>removeTrip(t.id)}>Xóa</button>
                </div>
              </div>
            </div>
          ))}
          {!list.length && <div className="empty">Không có chuyến nào vào ngày này.</div>}
        </div>
      </main>

      {/* FAB */}
      <button className="fab" onClick={openNew} aria-label="Tạo chuyến">＋</button>

      {/* Drawer */}
      {drawerOpen && (
        <>
          <div className="drawer">
            <h3>{editing ? "Sửa chuyến" : "Tạo chuyến"}</h3>
            <form onSubmit={saveTrip} className="t-form">
              <label>Ngày
                <input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})}/>
              </label>
              <div className="grid2">
                <label>Giờ chạy
                  <input value={form.time} onChange={e=>setForm({...form, time:e.target.value})} placeholder="20:00"/>
                </label>
                <label>Giá (đ)
                  <input type="number" value={form.price} onChange={e=>setForm({...form, price:+e.target.value || 0})}/>
                </label>
              </div>
              <div className="grid2">
                <label>Điểm đi
                  <input value={form.depart} onChange={e=>setForm({...form, depart:e.target.value})}/>
                </label>
                <label>Điểm đến
                  <input value={form.arrive} onChange={e=>setForm({...form, arrive:e.target.value})}/>
                </label>
              </div>
              <label>Loại xe / Xe dùng
                <input value={form.vehicle} onChange={e=>setForm({...form, vehicle:e.target.value})} placeholder="Sleeper 40..."/>
              </label>
              <label>Trạng thái
                <select value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
                  <option value="SCHEDULED">Đang chạy/Chờ chạy</option>
                  <option value="COMPLETED">Hoàn thành</option>
                  <option value="CANCELED">Hủy</option>
                </select>
              </label>

              <div className="drawer-actions">
                <button type="button" className="btn" onClick={()=>setDrawerOpen(false)}>Đóng</button>
                <button type="submit" className="btn btn-primary">{editing ? "Lưu" : "Tạo"}</button>
              </div>
            </form>
          </div>
          <div className="backdrop" onClick={()=>setDrawerOpen(false)} />
        </>
      )}
    </div>
  );
}
