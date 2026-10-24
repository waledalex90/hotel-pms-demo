"use client";

import { createContext, useContext, useMemo, useState } from "react";
import {
  buildSeed,
  canCancel,
  canCheckIn,
  canCheckOut,
  canConfirm,
  type DemoState,
  type ReservationStatus,
  type RoomStatus,
} from "@/lib/model";

function categoryLabel(previous: RoomStatus | null, next: RoomStatus): "نظافة وتجهيز" | "إشغال" | "صيانة" {
  if (next === "MAINTENANCE" || next === "OUT_OF_ORDER" || previous === "MAINTENANCE" || previous === "OUT_OF_ORDER") {
    return "صيانة";
  }
  if (next === "OCCUPIED" || previous === "OCCUPIED") {
    return "إشغال";
  }
  return "نظافة وتجهيز";
}

type DemoApi = DemoState & {
  notice: string;
  setRoomStatus: (roomId: string, next: RoomStatus) => void;
  confirmReservation: (id: string) => void;
  cancelReservation: (id: string) => void;
  checkIn: (id: string) => void;
  checkOut: (id: string) => void;
  reset: () => void;
};

const DemoContext = createContext<DemoApi | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>(() => buildSeed());
  const [notice, setNotice] = useState("");

  const api = useMemo<DemoApi>(() => {
    function stamp() {
      const now = new Date();
      return `2026-10-24 ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    }

    return {
      ...state,
      notice,
      setRoomStatus(roomId, next) {
        setState((current) => {
          const room = current.rooms.find((entry) => entry.id === roomId);
          if (!room || room.status === "OCCUPIED" || room.status === next) {
            return current;
          }
          return {
            ...current,
            rooms: current.rooms.map((entry) => (entry.id === roomId ? { ...entry, status: next } : entry)),
            history: [
              {
                id: `h-${roomId}-${current.history.length}`,
                roomId,
                previous: room.status,
                next,
                category: categoryLabel(room.status, next),
                actor: "زائر النسخة التجريبية",
                at: stamp(),
                note: "محاكاة تغيير الحالة داخل العرض فقط.",
              },
              ...current.history,
            ],
          };
        });
        setNotice("تم تحديث حالة الغرفة داخل العرض.");
      },
      confirmReservation(id) {
        setState((current) => ({
          ...current,
          reservations: current.reservations.map((entry) =>
            entry.id === id && canConfirm(entry.status) ? { ...entry, status: "CONFIRMED" as ReservationStatus } : entry,
          ),
        }));
        setNotice("تم تأكيد الحجز داخل العرض.");
      },
      cancelReservation(id) {
        setState((current) => ({
          ...current,
          reservations: current.reservations.map((entry) =>
            entry.id === id && canCancel(entry.status) ? { ...entry, status: "CANCELLED", roomId: entry.status === "CHECKED_IN" ? entry.roomId : null } : entry,
          ),
        }));
        setNotice("تم إلغاء الحجز داخل العرض.");
      },
      checkIn(id) {
        setState((current) => {
          const reservation = current.reservations.find((entry) => entry.id === id);
          if (!reservation || !canCheckIn(reservation.status, reservation.roomId, current.rooms)) {
            return current;
          }
          return {
            ...current,
            reservations: current.reservations.map((entry) =>
              entry.id === id ? { ...entry, status: "CHECKED_IN" } : entry,
            ),
            rooms: current.rooms.map((room) =>
              room.id === reservation.roomId ? { ...room, status: "OCCUPIED" } : room,
            ),
            history: [
              {
                id: `h-in-${id}-${current.history.length}`,
                roomId: reservation.roomId ?? "",
                previous: current.rooms.find((room) => room.id === reservation.roomId)?.status ?? null,
                next: "OCCUPIED",
                category: "إشغال",
                actor: "الاستقبال",
                at: stamp(),
                note: "محاكاة تسجيل الوصول.",
              },
              ...current.history,
            ],
          };
        });
        setNotice("تم تسجيل الوصول وربط الغرفة كمشغولة داخل العرض.");
      },
      checkOut(id) {
        setState((current) => {
          const reservation = current.reservations.find((entry) => entry.id === id);
          if (!reservation || !canCheckOut(reservation.status)) {
            return current;
          }
          const previous = current.rooms.find((room) => room.id === reservation.roomId)?.status ?? "OCCUPIED";
          return {
            ...current,
            reservations: current.reservations.map((entry) =>
              entry.id === id ? { ...entry, status: "CHECKED_OUT" } : entry,
            ),
            rooms: current.rooms.map((room) =>
              room.id === reservation.roomId ? { ...room, status: "DIRTY" } : room,
            ),
            history: reservation.roomId
              ? [
                  {
                    id: `h-out-${id}-${current.history.length}`,
                    roomId: reservation.roomId,
                    previous,
                    next: "DIRTY",
                    category: "إشغال",
                    actor: "الاستقبال",
                    at: stamp(),
                    note: "محاكاة تسجيل المغادرة.",
                  },
                  ...current.history,
                ]
              : current.history,
          };
        });
        setNotice("تم تسجيل المغادرة وأصبحت الغرفة بحاجة تنظيف داخل العرض.");
      },
      reset() {
        setState(buildSeed());
        setNotice("أُعيدت بيانات العرض إلى وضعها الأول.");
      },
    };
  }, [notice, state]);

  return <DemoContext.Provider value={api}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoApi {
  const value = useContext(DemoContext);
  if (!value) {
    throw new Error("Demo store missing");
  }
  return value;
}
