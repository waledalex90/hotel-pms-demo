"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { RoomPill } from "@/components/status";
import { nextRoomStatuses, ROOM_STATUS_LABEL, roomType } from "@/lib/model";
import { useDemo } from "@/lib/store";

export default function RoomDetailPage() {
  const params = useParams<{ id: string }>();
  const demo = useDemo();
  const room = demo.rooms.find((entry) => entry.id === params.id);
  if (!room) {
    return <p>هذه الغرفة غير موجودة في العرض.</p>;
  }
  const type = roomType(room.typeId);
  const history = demo.history.filter((entry) => entry.roomId === room.id);
  const options = nextRoomStatuses(room.status);

  return (
    <>
      <header className="topbar">
        <div>
          <h1>غرفة {room.number}</h1>
          <p><Link href="/rooms">العودة إلى الغرف</Link></p>
        </div>
        <RoomPill status={room.status} />
      </header>
      <section className="detail">
        <article className="card">
          <Image className="detail-photo" src={type.image} alt="" width={960} height={560} />
          <h2>{type.name}</h2>
          <p>{type.description}</p>
          <p className="muted">السعة {type.capacity} · {type.beds} · {type.size} · {room.view}</p>
          <p>{type.amenities.join(" · ")}</p>
          {room.status === "OCCUPIED" ? (
            <p className="muted">الغرفة مشغولة بإقامة حالية. تتغير حالتها من تسجيل المغادرة في الحجز المرتبط.</p>
          ) : (
            <div className="actions">
              {options.map((status) => (
                <button key={status} className="solid" onClick={() => demo.setRoomStatus(room.id, status)}>
                  {ROOM_STATUS_LABEL[status]}
                </button>
              ))}
            </div>
          )}
        </article>
        <article className="card">
          <h2>سجل الحالة</h2>
          <ul className="history">
            {history.map((entry) => (
              <li key={entry.id}>
                <strong>{entry.category}</strong>
                <div>
                  {entry.previous ? ROOM_STATUS_LABEL[entry.previous] : "بداية"} ← {ROOM_STATUS_LABEL[entry.next]}
                </div>
                <span className="muted">{entry.actor} · {entry.at}</span>
                <div>{entry.note}</div>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </>
  );
}
