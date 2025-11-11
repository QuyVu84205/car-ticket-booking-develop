import React, { useMemo, useState } from "react";
import "./booking-management.css";

/** ===== Mock ===== */
const BOOKINGS0 = [
  {
    id: "bk001",
    code: "VV-2F9A",
    customer: { name: "Nguyễn Văn A", phone: "0901234567" },
    tripId: "t01",
    tripName: "Sài Gòn → Đà Lạt (20:00)",
    seat: "B12",
    price: 350000,
    status: "CONFIRMED", // CONFIRMED | PENDING | CANCELED | REFUNDED
    createdAt: "2025-11-08 10:15",
  },
  {
    id: "bk002",
    code: "VV-5K2B",
    customer: { name: "Trần Mỹ Linh", phone: "0938888888" },
    tripId: "t02",
    tripName: "Sài Gòn → Vũng Tàu (08:00)",
    seat: "A03",
    price: 180000,
    status: "PENDING",
    createdAt: "2025-11-08 11:40",
  },
  {
    id: "bk003",
    code: "VV-7XQ4",
    customer: { name: "Phạm Hữu Tín", phone: "0983000123" },
    tripId: "t01",
    tripName: "Sài Gòn → Đà Lạt (20:00)",
    seat: "C07",
    price: 350000,
    status: "CONFIRMED",
    createdAt: "2025-11-09 08:05",
  },
];

const STATUS_LABEL = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  CANCELED: "Đã hủy",
  REFUNDED: "Hoàn tiền",
};
const STATUS_CLASS = {
  PENDING: "tag-orange",
  CONFIRMED: "tag-green",
  CANCELED: "tag-red",
  REFUNDED: "tag-blue",
};

export default function BookingManagement() {
  const [bookings, setBookings] = useState(BOOKINGS0);
  const [selected, setSelected] = useState(BOOKINGS0[0]);
  const [qPhone, setQPhone] = useState("");
  const [qTrip, setQTrip] = useState("");
  const [qStatus, setQStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const list = useMemo(() => {
    return bookings.filter((b) => {
      const okPhone = qPhone ? b.customer.phone.includes(qPhone) : true;
      const okTrip = qTrip ? b.tripName.toLowerCase().includes(qTrip.toLowerCase()) : true;
      const okStatus = qStatus ? b.status === qStatus : true;
      const ts = new Date(b.createdAt.replace(" ", "T"));
      const okFrom = dateFrom ? ts >= new Date(dateFrom) : true;
      const okTo = dateTo ? ts <= new Date(dateTo + "T23:59:59") : true;
      return okPhone && okTrip && okStatus && okFrom && okTo;
    });
  }, [bookings, qPhone, qTrip, qStatus, dateFrom, dateTo]);

  function updateStatus(st) {
    if (!selected) return;
    setBookings((arr) =>
      arr.map((b) => (b.id === selected.id ? { ...b, status: st } : b))
    );
    setSelected((s) => ({ ...s, status: st }));
  }
  function updateSeatPrice(seat, price) {
    if (!selected) return;
    setBookings((arr) =>
      arr.map((b) =>
        b.id === selected.id ? { ...b, seat, price: Number(price) || 0 } : b
      )
    );
    setSelected((s) => ({ ...s, seat, price: Number(price) || 0 }));
  }

  return (
    <div className="bookmg container-3col">
      {/* LEFT: Filters */}
      <aside className="panel left">
        <h3>Lọc</h3>
        <label>Số điện thoại
          <input value={qPhone} onChange={(e) => setQPhone(e.target.value)} placeholder="VD: 090..." />
        </label>
        <label>Chuyến xe
          <input value={qTrip} onChange={(e) => setQTrip(e.target.value)} placeholder="Tên chuyến..." />
        </label>
        <label>Trạng thái
          <select value={qStatus} onChange={(e) => setQStatus(e.target.value)}>
            <option value="">Tất cả</option>
            <option value="PENDING">Chờ xác nhận</option>
            <option value="CONFIRMED">Đã xác nhận</option>
            <option value="CANCELED">Đã hủy</option>
            <option value="REFUNDED">Hoàn tiền</option>
          </select>
        </label>
        <div className="grid2">
          <label>Từ ngày
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </label>
          <label>Đến ngày
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </label>
        </div>
        <p className="hint">* Bộ lọc hoạt động ngay khi nhập.</p>
      </aside>

      {/* MIDDLE: List */}
      <main className="panel middle">
        <div className="toolbar">
          <h2>Danh sách vé</h2>
          <span className="muted">{list.length} kết quả</span>
        </div>
        <div className="booking-list">
          {list.map((b) => (
            <div
              key={b.id}
              className={`booking-item ${selected?.id === b.id ? "active" : ""}`}
              onClick={() => setSelected(b)}
            >
              <div className="b-top">
                <b>{b.customer.name}</b>
                <span className={`tag ${STATUS_CLASS[b.status]}`}>{STATUS_LABEL[b.status]}</span>
              </div>
              <div className="b-mid">
                <span>{b.code}</span> • <span>{b.customer.phone}</span>
              </div>
              <div className="b-bot">
                <span>{b.tripName}</span> • <span>Ghế {b.seat}</span> •{" "}
                <span>{b.price.toLocaleString()}đ</span>
              </div>
            </div>
          ))}
          {!list.length && <div className="empty">Không có vé phù hợp.</div>}
        </div>
      </main>

      {/* RIGHT: Detail */}
      <aside className="panel right">
        {!selected ? (
          <div className="empty">Chọn 1 vé để xem chi tiết</div>
        ) : (
          <>
            <h3>Chi tiết vé</h3>
            <div className="detail">
              <div className="row">
                <span>Khách:</span>
                <b>{selected.customer.name}</b>
              </div>
              <div className="row">
                <span>Điện thoại:</span>
                <b>{selected.customer.phone}</b>
              </div>
              <div className="row">
                <span>Mã vé:</span>
                <code>{selected.code}</code>
              </div>
              <div className="row">
                <span>Chuyến:</span>
                <b>{selected.tripName}</b>
              </div>

              <div className="grid2 mt12">
                <label>Ghế
                  <input
                    value={selected.seat}
                    onChange={(e) => updateSeatPrice(e.target.value, selected.price)}
                  />
                </label>
                <label>Giá (đ)
                  <input
                    type="number"
                    value={selected.price}
                    onChange={(e) => updateSeatPrice(selected.seat, e.target.value)}
                  />
                </label>
              </div>

              <div className="mt12">
                <span>Trạng thái hiện tại: </span>
                <span className={`tag ${STATUS_CLASS[selected.status]}`}>
                  {STATUS_LABEL[selected.status]}
                </span>
              </div>

              <div className="actions">
                <button className="btn" onClick={() => updateStatus("PENDING")}>Chờ xác nhận</button>
                <button className="btn btn-primary" onClick={() => updateStatus("CONFIRMED")}>Xác nhận</button>
                <button className="btn btn-danger" onClick={() => updateStatus("CANCELED")}>Hủy</button>
                <button className="btn btn-blue" onClick={() => updateStatus("REFUNDED")}>Hoàn tiền</button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
