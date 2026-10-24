import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { FACILITIES, GALLERY, HOTEL, ROOM_TYPES } from "@/lib/model";

export default function HotelSitePage() {
  return (
    <div className="public">
      <header className="public-bar">
        <div className="brand">
          <Logo size={34} />
          <div>
            <strong>{HOTEL.name}</strong>
            <em className="badge">استعراض الخدمة</em>
          </div>
        </div>
        <nav className="public-nav">
          <a href="#rooms">الغرف</a>
          <a href="#facilities">المرافق</a>
          <Link href="/">لوحة الإدارة</Link>
        </nav>
      </header>
      <section className="hero">
        <div>
          <p className="muted">{HOTEL.city} · {HOTEL.address}</p>
          <h1>{HOTEL.nameAr}</h1>
          <p>فندق واجهة بحرية للعرض التجريبي. الصفحة تعرّف بالفندق وغرفاته ومرافقه، والحجز العام غير مفعّل.</p>
          <div className="closed">هذه الصفحة استعراض للخدمة. لا يمكن إتمام حجز عام من هنا.</div>
          <p className="muted">تسجيل الوصول {HOTEL.checkIn} · تسجيل المغادرة {HOTEL.checkOut} · {HOTEL.phone}</p>
        </div>
        <Image src={GALLERY[0]} alt="واجهة توضيحية لفندق العرض" width={1200} height={720} priority />
      </section>
      <section className="section" id="rooms">
        <h2>الغرف</h2>
        <div className="room-grid">
          {ROOM_TYPES.map((type) => (
            <Link key={type.id} href={`/hotel/rooms/${type.id}`} className="card room-card">
              <Image src={type.image} alt="" width={640} height={360} />
              <strong>{type.name}</strong>
              <span>حتى {type.capacity} نزلاء · {type.size}</span>
              <span className="muted">عرض الليلة {type.nightly} ر.س</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section" id="facilities">
        <h2>المرافق</h2>
        <div className="facility">
          {FACILITIES.map((item) => (
            <article key={item.name} className="card">
              <h2>{item.name}</h2>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <h2>معرض توضيحي</h2>
        <div className="gallery">
          {GALLERY.map((src) => (
            <Image key={src} src={src} alt="صورة توضيحية" width={640} height={360} />
          ))}
        </div>
      </section>
    </div>
  );
}
