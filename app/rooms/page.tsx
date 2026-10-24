"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { RoomPill } from "@/components/status";
import { nextRoomStatuses, ROOM_STATUSES, ROOM_STATUS_LABEL, roomType } from "@/lib/model";
import { useDemo } from "@/lib/store";

export default function RoomsPage() {
  const demo = useDemo();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("ALL");
  const [typeId, setTypeId] = useState("ALL");
  const [selectedId, setSelectedId] = useState("r07");
  const filtered = useMemo(() => {
    const needle = query.trim();
    return demo.rooms.filter((room) => {
      const type = roomType(room.typeId);
      const matchesQuery = !needle || room.number.includes(needle) || type.name.includes(needle);
      const matchesStatus = status === "ALL" || room.status === status;
      const matchesType = typeId === "ALL" || room.typeId === typeId;
      return matchesQuery && matchesStatus && matchesType;
    });
  }, [demo.rooms, query, status, typeId]);
  const selected = filtered.find((room) => room.id === selectedId) ?? filtered[0];
  const selectedType = selected ? roomType(selected.typeId) : null;
  const history = selected ? demo.history.filter((entry) => entry.roomId === selected.id).slice(0, 2) : [];

  return (
    <>
      <header className="topbar">
        <div>
          <h1>الغرف</h1>
          <p>{filtered.length} غرفة في العرض الحالي. اختر غرفة لعرض تفاصيلها وتغيير حالتها.</p>
        </div>
      </header>
      <div className="filters">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث برقم الغرفة أو النوع" />
        <select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="تصفية الحالة">
          <option value="ALL">كل الحالات</option>
          {ROOM_STATUSES.map((item) => (
            <option key={item} value={item}>{ROOM_STATUS_LABEL[item]}</option>
          ))}
        </select>
        <select value={typeId} onChange={(event) => setTypeId(event.target.value)} aria-label="تصفية النوع">
          <option value="ALL">كل الأنواع</option>
          <option value="standard">غرفة قياسية</option>
          <option value="deluxe">غرفة ديلوكس</option>
          <option value="sea">غرفة بإطلالة</option>
          <option value="suite">جناح</option>
        </select>
      </div>
      <section className="workspace">
        <div className="room-grid">
          {filtered.map((room) => {
            const type = roomType(room.typeId);
            return (
              <button
                key={room.id}
                className={selected?.id === room.id ? "card room-card selected" : "card room-card"}
                onClick={() => setSelectedId(room.id)}
              >
                <Image src={type.image} alt="" width={640} height={360} />
                <strong>غرفة {room.number}</strong>
                <span>{type.name} · {type.capacity} نزلاء</span>
                <span className="muted">طابق {room.floor} · {room.view}</span>
                <RoomPill status={room.status} />
              </button>
            );
          })}
        </div>
        {selected && selectedType ? (
          <article className="card">
            <Image className="detail-photo" src={selectedType.image} alt="" width={960} height={560} />
            <h2>غرفة {selected.number}</h2>
            <RoomPill status={selected.status} />
            <p>{selectedType.name} · السعة {selectedType.capacity} · {selectedType.size}</p>
            <p>{selectedType.description}</p>
            <p className="muted">{selected.view} · {selectedType.amenities.join(" · ")}</p>
            {selected.status === "OCCUPIED" ? (
              <p className="muted">الغرفة مشغولة بإقامة حالية. تتغير من تسجيل المغادرة في الحجز.</p>
            ) : (
              <div className="actions">
                {nextRoomStatuses(selected.status).map((next) => (
                  <button key={next} className="solid" onClick={() => demo.setRoomStatus(selected.id, next)}>
                    {ROOM_STATUS_LABEL[next]}
                  </button>
                ))}
              </div>
            )}
            <h2>سجل الحالة</h2>
            <ul className="history">
              {history.map((entry) => (
                <li key={entry.id}>
                  {entry.previous ? ROOM_STATUS_LABEL[entry.previous] : "بداية"} ← {ROOM_STATUS_LABEL[entry.next]}
                  <div className="muted">{entry.at}</div>
                </li>
              ))}
            </ul>
            <p><Link href={`/rooms/${selected.id}`}>فتح صفحة الغرفة</Link></p>
          </article>
        ) : (
          <article className="card"><p>لا توجد غرفة مطابقة للتصفية.</p></article>
        )}
      </section>
    </>
  );
}
