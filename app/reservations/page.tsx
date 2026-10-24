"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ReservationPill } from "@/components/status";
import { canCancel, canCheckIn, canCheckOut, canConfirm, guestById, RESERVATION_STATUSES, RESERVATION_STATUS_LABEL, roomType } from "@/lib/model";
import { useDemo } from "@/lib/store";

export default function ReservationsPage() {
  const demo = useDemo();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("ALL");
  const [selectedId, setSelectedId] = useState("b11");
  const filtered = useMemo(() => {
    const needle = query.trim();
    return demo.reservations.filter((reservation) => {
      const guest = guestById(reservation.guestId);
      const room = demo.rooms.find((entry) => entry.id === reservation.roomId);
      const matchesQuery = !needle || reservation.code.includes(needle) || guest.name.includes(needle) || (room?.number.includes(needle) ?? false);
      return matchesQuery && (status === "ALL" || reservation.status === status);
    });
  }, [demo.reservations, demo.rooms, query, status]);
  const selected = filtered.find((item) => item.id === selectedId) ?? filtered[0];
  const guest = selected ? guestById(selected.guestId) : null;
  const room = selected ? demo.rooms.find((entry) => entry.id === selected.roomId) : null;
  const type = selected ? roomType(selected.typeId) : null;

  return (
    <>
      <header className="topbar">
        <div>
          <h1>الحجوزات</h1>
          <p>{filtered.length} حجز في التصفية. اختر حجزًا للتأكيد أو الإلغاء أو تسجيل الوصول والمغادرة.</p>
        </div>
      </header>
      <div className="filters">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث بالرمز أو النزيل أو رقم الغرفة" />
        <select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="تصفية حالة الحجز">
          <option value="ALL">كل الحالات</option>
          {RESERVATION_STATUSES.map((item) => (
            <option key={item} value={item}>{RESERVATION_STATUS_LABEL[item]}</option>
          ))}
        </select>
      </div>
      <section className="workspace">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>الرمز</th>
                <th>النزيل</th>
                <th>الوصول</th>
                <th>المغادرة</th>
                <th>الغرفة</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((reservation) => {
                const rowGuest = guestById(reservation.guestId);
                const rowRoom = demo.rooms.find((entry) => entry.id === reservation.roomId);
                return (
                  <tr key={reservation.id} onClick={() => setSelectedId(reservation.id)} style={{ cursor: "pointer" }}>
                    <td>{reservation.code}</td>
                    <td>{rowGuest.name}</td>
                    <td>{reservation.arrival}</td>
                    <td>{reservation.departure}</td>
                    <td>{rowRoom ? rowRoom.number : "بدون غرفة"}</td>
                    <td><ReservationPill status={reservation.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {selected && guest && type ? (
          <article className="card">
            <h2>{selected.code}</h2>
            <ReservationPill status={selected.status} />
            <p>{guest.name}</p>
            <p className="muted">{guest.phone} · {guest.city}</p>
            <p>الوصول {selected.arrival}</p>
            <p>المغادرة {selected.departure}</p>
            <p>{type.name}{room ? ` · غرفة ${room.number}` : " · بدون غرفة معيّنة"}</p>
            <p className="muted">{selected.adults === 1 ? "بالغ واحد" : `${selected.adults} بالغين`} · {selected.children === 1 ? "طفل واحد" : `${selected.children} أطفال`}. الدفع الإلكتروني غير متاح في العرض.</p>
            <div className="actions">
              {canConfirm(selected.status) ? <button className="ok" onClick={() => demo.confirmReservation(selected.id)}>تأكيد الحجز</button> : null}
              {canCancel(selected.status) ? <button className="danger" onClick={() => demo.cancelReservation(selected.id)}>إلغاء الحجز</button> : null}
              {canCheckIn(selected.status, selected.roomId, demo.rooms) ? <button className="solid" onClick={() => demo.checkIn(selected.id)}>تسجيل الوصول</button> : null}
              {canCheckOut(selected.status) ? <button className="solid" onClick={() => demo.checkOut(selected.id)}>تسجيل المغادرة</button> : null}
            </div>
            <p><Link href={`/reservations/${selected.id}`}>فتح صفحة الحجز</Link></p>
          </article>
        ) : (
          <article className="card"><p>لا يوجد حجز مطابق للتصفية.</p></article>
        )}
      </section>
    </>
  );
}
