import { RESERVATION_STATUS_LABEL, ROOM_STATUS_LABEL, type ReservationStatus, type RoomStatus } from "@/lib/model";

export function roomTone(status: RoomStatus): string {
  if (status === "AVAILABLE" || status === "INSPECTED") return "ok";
  if (status === "OCCUPIED") return "gold";
  if (status === "MAINTENANCE" || status === "OUT_OF_ORDER") return "bad";
  return "warn";
}

export function reservationTone(status: ReservationStatus): string {
  if (status === "CONFIRMED" || status === "CHECKED_OUT") return "ok";
  if (status === "CHECKED_IN") return "gold";
  if (status === "CANCELLED" || status === "NO_SHOW") return "bad";
  return "warn";
}

export function RoomPill({ status }: { status: RoomStatus }) {
  return <span className={`pill ${roomTone(status)}`}>{ROOM_STATUS_LABEL[status]}</span>;
}

export function ReservationPill({ status }: { status: ReservationStatus }) {
  return <span className={`pill ${reservationTone(status)}`}>{RESERVATION_STATUS_LABEL[status]}</span>;
}
