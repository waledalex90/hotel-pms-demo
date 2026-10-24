import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { Shell } from "@/components/shell";
import { DemoProvider } from "@/lib/store";
import "./globals.css";

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });

export const metadata: Metadata = {
  title: "HOTEL PMS | نسخة تجريبية",
  description: "منصة ذكية لإدارة الفنادق والحجوزات والغرف — عرض تفاعلي لفندق Grand Azure Hotel.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.variable}>
        <DemoProvider>
          <Shell>{children}</Shell>
        </DemoProvider>
      </body>
    </html>
  );
}
