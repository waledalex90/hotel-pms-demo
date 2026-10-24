"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ReservationPill } from "@/components/status";
import { canCancel, canCheckIn, canCheckOut, canConfirm, guestById, roomType } from "@/lib/model";
import { useDemo } from "@/lib/store";

export default function ReservationDetailPage() {
  const params = useParams<{ id: string }>();
  const demo = useDemo();
  const reservation = demo.reservations.find((entry) => entry.id === params.id);
  if (!reservation) {
    return <p>هذا الحجز غير موجود في العرض.</p>;
  }
  const guest = guestById(reservation.guestId);
  const room = demo.rooms.find((entry) => entry.id === reservation.roomId);
  const type = roomType(reservation.typeId);

  return (
    <>
      <header className="topbar">
        <div>
          <h1>حجز {reservation.code}</h1>
          <p><Link href="/reservations">العودة إلى الحجوزات</Link></p>
        </div>
        <ReservationPill status={reservation.status} />
      </header>
      <section className="detail">
        <article className="card">
          <h2>{guest.name}</h2>
          <p>{guest.phone} · {guest.city}</p>
          <p>الوصول {reservation.arrival} · المغادرة {reservation.departure}</p>
          <p>{reservation.adults === 1 ? "بالغ واحد" : `${reservation.adults} بالغون`} · {reservation.children === 1 ? "طفل واحد" : `${reservation.children} أطفال`}</p>
          <p>{type.name}{room ? ` · غرفة ${room.number}` : " · لم تُعيَّن غرفة"}</p>
          <p className="muted">{reservation.note} الدفع الإلكتروني غير متاح في هذا العرض.</p>
          <div className="actions">
            {canConfirm(reservation.status) ? (
              <button className="ok" onClick={() => demo.confirmReservation(reservation.id)}>تأكيد الحجز</button>
            ) : null}
            {canCancel(reservation.status) ? (
              <button className="danger" onClick={() => demo.cancelReservation(reservation.id)}>إلغاء الحجز</button>
            ) : null}
            {canCheckIn(reservation.status, reservation.roomId, demo.rooms) ? (
              <button className="solid" onClick={() => demo.checkIn(reservation.id)}>تسجيل الوصول</button>
            ) : null}
            {canCheckOut(reservation.status) ? (
              <button className="solid" onClick={() => demo.checkOut(reservation.id)}>تسجيل المغادرة</button>
            ) : null}
          </div>
        </article>
        <article className="card">
          <Image className="detail-photo" src={type.image} alt="" width={960} height={560} />
          <h2>الغرفة المرتبطة</h2>
          <p>{type.description}</p>
          <p className="muted">السعة {type.capacity} · سعر العرض {type.nightly} ر.س لليلة الواحدة</p>
        </article>
      </section>
    </>
  );
}
