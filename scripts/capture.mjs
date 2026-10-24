import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const root = path.resolve(import.meta.dirname, "..");
const raw = path.join(root, "docs", "portfolio", "hotel-pms", "raw");
const finalDir = path.join(root, "docs", "portfolio", "hotel-pms", "final");
const base = "http://localhost:3010";
const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

await mkdir(raw, { recursive: true });
await mkdir(finalDir, { recursive: true });

const browser = await chromium.launch({ executablePath: edge, headless: true });
const desktop = await browser.newPage({ viewport: { width: 1544, height: 786 }, deviceScaleFactor: 2 });

const checks = [];
async function visit(url, expect) {
  const response = await desktop.goto(`${base}${url}`, { waitUntil: "networkidle" });
  const body = await desktop.locator("body").innerText();
  checks.push({ url, status: response?.status() ?? 0, ok: body.includes(expect) });
}

await visit("/", "لوحة");
await desktop.screenshot({ path: path.join(raw, "dashboard.png") });
await visit("/rooms", "غرفة 101");
await desktop.locator("button.room-card", { hasText: "107" }).click();
await desktop.screenshot({ path: path.join(raw, "rooms.png") });
await desktop.getByRole("button", { name: "قيد التنظيف", exact: true }).click();
await desktop.waitForTimeout(200);
checks.push({ url: "room-status", status: 200, ok: (await desktop.locator("body").innerText()).includes("تم تحديث حالة الغرفة") });
await visit("/reservations", "AZ-2410");
await desktop.getByRole("row", { name: /AZ-2410/ }).click();
await desktop.screenshot({ path: path.join(raw, "reservations.png") });
await desktop.getByRole("button", { name: "تأكيد الحجز" }).click();
await desktop.waitForTimeout(200);
checks.push({ url: "confirm", status: 200, ok: (await desktop.locator("body").innerText()).includes("تم تأكيد") });
await visit("/guests", "ليان الحربي");
await desktop.locator("input").fill("نجران");
await desktop.waitForTimeout(150);
checks.push({ url: "guest-filter", status: 200, ok: (await desktop.locator("body").innerText()).includes("أمل الشهري") });
await visit("/reports", "نسبة الإشغال");
await visit("/hotel", "الحجز العام غير مفعّل");
await desktop.screenshot({ path: path.join(raw, "hotel.png") });
await visit("/hotel/rooms/suite", "جناح");

const phone = await browser.newPage({ viewport: { width: 390, height: 920 }, deviceScaleFactor: 2 });
await phone.goto(`${base}/`, { waitUntil: "networkidle" });
await phone.evaluate(() => {
  document.querySelectorAll(".stats .stat").forEach((el, index) => {
    if (index >= 6) el.remove();
  });
  document.querySelector(".split")?.remove();
});
await phone.screenshot({ path: path.join(raw, "m-dashboard.png") });
await phone.goto(`${base}/rooms`, { waitUntil: "networkidle" });
await phone.evaluate(() => {
  document.querySelectorAll(".room-grid .room-card").forEach((el, index) => {
    if (index >= 2) el.remove();
  });
  document.querySelector(".workspace > .card")?.remove();
});
await phone.screenshot({ path: path.join(raw, "m-rooms.png") });
await phone.goto(`${base}/hotel/rooms/deluxe`, { waitUntil: "networkidle" });
await phone.screenshot({ path: path.join(raw, "m-room.png") });
checks.push({ url: "mobile", status: 200, ok: (await phone.locator("body").innerText()).includes("غرفة ديلوكس") });

await desktop.close();
await phone.close();
await browser.close();

const failed = checks.filter((item) => !item.ok || item.status >= 400);
console.log(JSON.stringify({ checks, failed }, null, 2));
if (failed.length) {
  process.exitCode = 1;
}
