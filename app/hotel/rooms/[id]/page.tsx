import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Logo } from "@/components/logo";
import { HOTEL, ROOM_TYPES } from "@/lib/model";

export default async function PublicRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const type = ROOM_TYPES.find((item) => item.id === id);
  if (!type) {
    notFound();
  }
  return (
    <div className="public">
      <header className="public-bar">
        <div className="brand">
          <Logo size={34} />
          <strong>{HOTEL.name}</strong>
        </div>
        <Link href="/hotel">العودة للفندق</Link>
      </header>
      <section className="section" style={{ paddingTop: 22 }}>
        <div className="detail">
          <Image className="detail-photo" src={type.image} alt="" width={960} height={560} priority />
          <article className="card">
            <h1>{type.name}</h1>
            <p>{type.description}</p>
            <p>السعة {type.capacity} نزلاء · {type.beds} · {type.size}</p>
            <p>{type.amenities.join(" · ")}</p>
            <p className="muted">سعر العرض {type.nightly} ر.س لليلة. الحجز العام غير مفعّل في هذه النسخة.</p>
            <Link href="/hotel">كل الغرف</Link>
          </article>
        </div>
      </section>
    </div>
  );
}
