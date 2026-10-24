"use client";

import { useMemo, useState } from "react";
import { GUESTS, guestById } from "@/lib/model";
import { useDemo } from "@/lib/store";

export default function GuestsPage() {
  const { reservations } = useDemo();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(GUESTS[0].id);
  const filtered = useMemo(() => {
    const needle = query.trim();
    return GUESTS.filter((guest) => !needle || guest.name.includes(needle) || guest.phone.includes(needle) || guest.city.includes(needle));
  }, [query]);
  const guest = guestById(selected);
  const stays = reservations.filter((reservation) => reservation.guestId === guest.id);

  return (
    <>
      <header className="topbar">
        <div>
          <h1>النزلاء</h1>
          <p>أسماء وأرقام وهمية للعرض. اختر نزيلًا لرؤية حجوزاته داخل هذه النسخة.</p>
        </div>
      </header>
      <div className="filters">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث بالاسم أو الجوال أو المدينة" />
      </div>
      <section className="detail">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>الاسم</th><th>الجوال</th><th>المدينة</th></tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} onClick={() => setSelected(item.id)} style={{ cursor: "pointer" }}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <article className="card">
          <h2>{guest.name}</h2>
          <p>{guest.phone}</p>
          <p className="muted">{guest.city} · {guest.stays} إقامات سابقة في بيانات العرض</p>
          <ul className="history">
            {stays.map((stay) => (
              <li key={stay.id}>{stay.code} · {stay.arrival} → {stay.departure}</li>
            ))}
          </ul>
        </article>
      </section>
    </>
  );
}
