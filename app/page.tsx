"use client";

import { useMemo } from "react";
import { HOTEL, metricsOf, RESERVATION_STATUSES, RESERVATION_STATUS_LABEL, ROOM_STATUSES, ROOM_STATUS_LABEL } from "@/lib/model";
import { useDemo } from "@/lib/store";

export default function DashboardPage() {
  const demo = useDemo();
  const metrics = useMemo(() => metricsOf(demo), [demo]);
  const maxRoom = Math.max(...ROOM_STATUSES.map((status) => metrics.byRoom[status]), 1);

  return (
    <>
      <header className="topbar">
        <div>
          <h1>لوحة {HOTEL.nameAr}</h1>
          <p>مؤشرات تشغيل اليوم {`24 أكتوبر 2026`} — الغرف والحجوزات والوصول والمغادرة.</p>
        </div>
      </header>
      <section className="grid stats">
        <article className="stat"><em>إجمالي الغرف</em><strong>{metrics.total}</strong></article>
        <article className="stat"><em>الغرف المتاحة</em><strong>{metrics.available}</strong><b>متاحة أو جاهزة بعد الفحص</b></article>
        <article className="stat"><em>الغرف المشغولة</em><strong>{metrics.occupied}</strong></article>
        <article className="stat"><em>تحت الصيانة</em><strong>{metrics.maintenance}</strong><b>صيانة أو خارج الخدمة</b></article>
        <article className="stat"><em>حجوزات جارية</em><strong>{metrics.current}</strong><b>انتظار وتأكيد ونزلاء داخل الفندق</b></article>
        <article className="stat"><em>وصول اليوم</em><strong>{metrics.arrivals}</strong></article>
        <article className="stat"><em>مغادرة اليوم</em><strong>{metrics.departures}</strong></article>
        <article className="stat"><em>نسبة الإشغال</em><strong>{metrics.occupancy}%</strong><b>المشغول من إجمالي الغرف</b></article>
      </section>
      <section className="grid split" style={{ marginTop: 12 }}>
        <article className="card">
          <h2>توزيع حالات الغرف</h2>
          <div className="bars">
            {ROOM_STATUSES.map((status) => (
              <div className="bar-row" key={status}>
                <span>{ROOM_STATUS_LABEL[status]}</span>
                <div className={status === "OCCUPIED" ? "track gold" : "track"}>
                  <span style={{ width: `${(metrics.byRoom[status] / maxRoom) * 100}%` }} />
                </div>
                <b>{metrics.byRoom[status]}</b>
              </div>
            ))}
          </div>
        </article>
        <article className="card">
          <h2>حالات الحجوزات</h2>
          <div className="donut-wrap">
            <Donut parts={RESERVATION_STATUSES.map((status) => metrics.byReservation[status])} />
            <div className="legend">
              {RESERVATION_STATUSES.map((status, index) => (
                <span key={status}>
                  <i className="dot" style={{ background: COLORS[index] }} />
                  {RESERVATION_STATUS_LABEL[status]} · {metrics.byReservation[status]}
                </span>
              ))}
            </div>
          </div>
        </article>
      </section>
    </>
  );
}

const COLORS = ["#d97706", "#16a34a", "#c8a86b", "#101c32", "#dc2626", "#7c8ea5"];

function Donut({ parts }: { parts: number[] }) {
  const total = parts.reduce((sum, value) => sum + value, 0) || 1;
  let cursor = 0;
  const slices = parts.map((value, index) => {
    const start = cursor / total;
    cursor += value;
    const end = cursor / total;
    return `${COLORS[index]} ${start * 360}deg ${end * 360}deg`;
  });
  return (
    <div
      aria-hidden="true"
      style={{
        width: 148,
        height: 148,
        borderRadius: "50%",
        background: `conic-gradient(${slices.join(",")})`,
        boxShadow: "inset 0 0 0 28px white",
        flex: "0 0 auto",
      }}
    />
  );
}
