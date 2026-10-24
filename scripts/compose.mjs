import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const root = path.resolve(import.meta.dirname, "..");
const raw = path.join(root, "docs", "portfolio", "hotel-pms", "raw");
const finalDir = path.join(root, "docs", "portfolio", "hotel-pms", "final");
const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
await mkdir(finalDir, { recursive: true });

const fileUrl = (name) => `file:///${path.join(raw, name).replaceAll("\\", "/")}`;

const logo = `<svg width="42" height="42" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#101C32"/><path d="M8 34V18l16-8 16 8v16" fill="none" stroke="#C8A86B" stroke-width="2.2"/><path d="M18 34V24h12v10" fill="none" stroke="#F8F6F1" stroke-width="2"/><circle cx="24" cy="20" r="1.4" fill="#C8A86B"/></svg>`;

function shell(body) {
  return `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@500;700;800&display=swap" rel="stylesheet"><style>
    * { box-sizing: border-box; }
    html, body { margin: 0; width: 1600px; height: 900px; overflow: hidden; background: #101C32; color: #F8F6F1; font-family: Cairo, Tahoma, sans-serif; }
    .bar { height: 86px; display: flex; align-items: center; justify-content: space-between; padding: 0 36px; }
    .brand { display: flex; align-items: center; gap: 12px; }
    .brand strong { font-size: 22px; letter-spacing: 0.04em; }
    .brand span { color: #C8A86B; font-size: 16px; }
    h1 { margin: 0; font-size: 30px; white-space: nowrap; }
    .shot { margin: 0 28px 28px; height: 786px; border-radius: 18px; overflow: hidden; border: 1px solid rgba(200,168,107,.45); background: #F8F6F1; }
    .shot img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
    .chip { border: 1px solid #C8A86B; color: #C8A86B; border-radius: 999px; padding: 6px 14px; font-size: 16px; }
    .phones { height: 814px; display: flex; justify-content: center; align-items: center; gap: 42px; }
    .phone { width: 300px; height: 686px; background: #0b1424; border: 8px solid #F8F6F1; border-radius: 36px; overflow: hidden; box-shadow: 0 18px 40px rgba(0,0,0,.28); }
    .phone img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
    .phone figcaption { display: none; }
  </style></head><body>${body}</body></html>`;
}

const pages = {
  "01-cover.png": shell(`<header class="bar"><div class="brand">${logo}<div><strong>HOTEL PMS</strong><div><span>منصة ذكية لإدارة الفنادق والحجوزات والغرف</span></div></div></div><h1>HOTEL PMS | نظام ذكي لإدارة الفنادق</h1><em class="chip">نسخة تجريبية</em></header><div class="shot"><img src="${fileUrl("dashboard.png")}" alt=""></div>`),
  "02-dashboard.png": shell(`<header class="bar"><div class="brand">${logo}<div><strong>HOTEL PMS</strong><div><span>لوحة التشغيل</span></div></div></div><h1>إشغال الغرف والحجوزات</h1></header><div class="shot"><img src="${fileUrl("dashboard.png")}" alt=""></div>`),
  "03-rooms.png": shell(`<header class="bar"><div class="brand">${logo}<div><strong>HOTEL PMS</strong><div><span>إدارة الغرف</span></div></div></div><h1>الغرف والحالات والتفاصيل</h1></header><div class="shot"><img src="${fileUrl("rooms.png")}" alt=""></div>`),
  "04-reservations.png": shell(`<header class="bar"><div class="brand">${logo}<div><strong>HOTEL PMS</strong><div><span>إدارة الحجوزات</span></div></div></div><h1>الحجوزات والتأكيد والإلغاء</h1></header><div class="shot"><img src="${fileUrl("reservations.png")}" alt=""></div>`),
  "05-mobile.png": shell(`<header class="bar"><div class="brand">${logo}<div><strong>HOTEL PMS</strong><div><span>تجربة الموبايل</span></div></div></div><h1>اللوحة والغرف وتفاصيل الغرفة</h1></header><div class="phones"><div class="phone"><img src="${fileUrl("m-dashboard.png")}" alt=""></div><div class="phone"><img src="${fileUrl("m-rooms.png")}" alt=""></div><div class="phone"><img src="${fileUrl("m-room.png")}" alt=""></div></div>`),
};

const browser = await chromium.launch({ executablePath: edge, headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 });
for (const [name, html] of Object.entries(pages)) {
  const htmlPath = path.join(raw, name.replace(".png", ".html"));
  await writeFile(htmlPath, html);
  await page.goto(`file:///${htmlPath.replaceAll("\\", "/")}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(finalDir, name) });
}
await browser.close();
console.log("composed");
