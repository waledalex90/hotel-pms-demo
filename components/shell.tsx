"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { useDemo } from "@/lib/store";

const LINKS = [
  { href: "/", label: "لوحة الفندق" },
  { href: "/rooms", label: "الغرف" },
  { href: "/reservations", label: "الحجوزات" },
  { href: "/guests", label: "النزلاء" },
  { href: "/reports", label: "التقارير" },
  { href: "/hotel", label: "موقع الفندق" },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const demo = useDemo();
  const [open, setOpen] = useState(false);
  const publicSite = path.startsWith("/hotel");

  if (publicSite) {
    return <>{children}</>;
  }

  return (
    <div className="app-shell">
      {open ? <button className="backdrop" aria-label="إغلاق القائمة" onClick={() => setOpen(false)} /> : null}
      <aside className={open ? "sidebar open" : "sidebar"}>
        <div className="brand">
          <Logo />
          <div>
            <strong>HOTEL PMS</strong>
            <span>منصة إدارة الفنادق</span>
            <em className="badge">نسخة تجريبية</em>
          </div>
        </div>
        <nav className="nav">
          {LINKS.map((link) => {
            const active = link.href === "/" ? path === "/" : path.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} className={active ? "active" : ""} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="side-foot">
          <p>العمليات هنا محاكاة داخل المتصفح، وتُعاد عند تحديث الصفحة أو بالزر أدناه.</p>
          <button className="ghost" onClick={demo.reset}>إعادة ضبط العرض</button>
        </div>
      </aside>
      <div className="main">
        <button className="menu-btn ghost" onClick={() => setOpen(true)}>القائمة</button>
        {demo.notice ? <div className="notice">{demo.notice}</div> : null}
        {children}
      </div>
    </div>
  );
}
