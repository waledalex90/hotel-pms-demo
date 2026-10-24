"use client";

import { useMemo } from "react";
import { DEMO_TODAY, metricsOf, RESERVATION_STATUSES, RESERVATION_STATUS_LABEL, ROOM_STATUSES, ROOM_STATUS_LABEL } from "@/lib/model";
import { useDemo } from "@/lib/store";

export default function ReportsPage() {
  const demo = useDemo();
  const metrics = useMemo(() => metricsOf(demo), [demo]);
  const arrivals = demo.reservations.filter(
    (item) => (item.status === "PENDING" || item.status === "CONFIRMED") && item.arrival === DEMO_TODAY,
  );
  const departures = demo.reservations.filter((item) => item.status === "CHECKED_IN" && item.departure === DEMO_TODAY);

  return (
    <>
      <header className="topbar">
        <div>
          <h1>التقارير التشغيلية</h1>
          <p>إشغال الغرف، توزيع الحجوزات، ووصول ومغادرة اليوم. لا يتضمن هذا العرض تقريرًا ماليًا.</p>
        </div>
      </header>
      <section className="grid stats">
        <article className="stat"><em>نسبة الإشغال</em><strong>{metrics.occupancy}%</strong></article>
        <article className="stat"><em>وصول اليوم</em><strong>{arrivals.length}</strong></article>
        <article className="stat"><em>مغادرة اليوم</em><strong>{departures.length}</strong></article>
        <article className="stat"><em>غرف قيد التجهيز</em><strong>{metrics.cleaning}</strong></article>
      </section>
      <section className="grid split" style={{ marginTop: 12 }}>
        <article className="card">
          <h2>الغرف حسب الحالة</h2>
          <div className="table-wrap">
            <table>
              <tbody>
                {ROOM_STATUSES.map((status) => (
                  <tr key={status}><td>{ROOM_STATUS_LABEL[status]}</td><td>{metrics.byRoom[status]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
        <article className="card">
          <h2>الحجوزات حسب الحالة</h2>
          <div className="table-wrap">
            <table>
              <tbody>
                {RESERVATION_STATUSES.map((status) => (
                  <tr key={status}><td>{RESERVATION_STATUS_LABEL[status]}</td><td>{metrics.byReservation[status]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </>
  );
}
