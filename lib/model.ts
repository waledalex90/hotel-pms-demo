export const DEMO_TODAY = "2026-10-24";

export const ROOM_STATUSES = [
  "AVAILABLE",
  "OCCUPIED",
  "DIRTY",
  "CLEANING",
  "INSPECTED",
  "MAINTENANCE",
  "OUT_OF_ORDER",
] as const;

export type RoomStatus = (typeof ROOM_STATUSES)[number];

export const RESERVATION_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "CHECKED_IN",
  "CHECKED_OUT",
  "CANCELLED",
  "NO_SHOW",
] as const;

export type ReservationStatus = (typeof RESERVATION_STATUSES)[number];

export const ROOM_STATUS_LABEL: Record<RoomStatus, string> = {
  AVAILABLE: "متاحة",
  OCCUPIED: "مشغولة",
  DIRTY: "بحاجة تنظيف",
  CLEANING: "قيد التنظيف",
  INSPECTED: "جاهزة بعد الفحص",
  MAINTENANCE: "تحت الصيانة",
  OUT_OF_ORDER: "خارج الخدمة",
};

export const RESERVATION_STATUS_LABEL: Record<ReservationStatus, string> = {
  PENDING: "قيد الانتظار",
  CONFIRMED: "مؤكد",
  CHECKED_IN: "تم تسجيل الوصول",
  CHECKED_OUT: "تم تسجيل المغادرة",
  CANCELLED: "ملغى",
  NO_SHOW: "لم يحضر",
};

export type RoomType = {
  id: string;
  name: string;
  capacity: number;
  beds: string;
  size: string;
  nightly: number;
  description: string;
  amenities: string[];
  image: string;
};

export type Room = {
  id: string;
  number: string;
  floor: number;
  typeId: string;
  status: RoomStatus;
  view: string;
};

export type HistoryEntry = {
  id: string;
  roomId: string;
  previous: RoomStatus | null;
  next: RoomStatus;
  category: "نظافة وتجهيز" | "إشغال" | "صيانة";
  actor: string;
  at: string;
  note: string;
};

export type Guest = {
  id: string;
  name: string;
  phone: string;
  city: string;
  stays: number;
};

export type Reservation = {
  id: string;
  code: string;
  guestId: string;
  roomId: string | null;
  typeId: string;
  status: ReservationStatus;
  arrival: string;
  departure: string;
  adults: number;
  children: number;
  note: string;
};

export type DemoState = {
  rooms: Room[];
  reservations: Reservation[];
  history: HistoryEntry[];
};

export const HOTEL = {
  name: "Grand Azure Hotel",
  nameAr: "جراند أزور",
  city: "جدة",
  address: "كورنيش الشاطئ، جدة",
  phone: "0120000000",
  checkIn: "15:00",
  checkOut: "12:00",
};

export const FACILITIES = [
  { name: "مسبح مطل", detail: "مسبح خارجي بإطلالة بحرية، مفتوح للنزلاء من الثامنة صباحًا حتى العاشرة مساءً." },
  { name: "مركز لياقة", detail: "أجهزة تمارين وغرفة أوزان داخل الفندق، الدخول مشمول للإقامة." },
  { name: "مطعم الشاطئ", detail: "إفطار ومأكولات بحرية. عرض القائمة للزائر دون طلب دفع من هذه الصفحة." },
  { name: "قاعة اجتماعات", detail: "قاعة تتسع لاثني عشر شخصًا للاجتماعات القصيرة، بالحجز الداخلي من الاستقبال." },
  { name: "موقف خاص", detail: "مواقف مغطاة للنزلاء في الطابق الأرضي." },
  { name: "خدمة الغرف", detail: "طلب من الاستقبال خلال ساعات التشغيل المعروضة في الغرفة." },
];

const PHOTO = {
  hotel: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=70",
  standard: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=70",
  deluxe: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=70",
  sea: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=70",
  suite: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=70",
  lobby: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=70",
};

export const GALLERY = [PHOTO.hotel, PHOTO.lobby, PHOTO.sea, PHOTO.suite];

export const ROOM_TYPES: RoomType[] = [
  {
    id: "standard",
    name: "غرفة قياسية",
    capacity: 2,
    beds: "سرير مزدوج",
    size: "28 م²",
    nightly: 450,
    description: "غرفة هادئة للمبيت القصير، بسرير مزدوج ومكتب صغير ودورة مياه خاصة.",
    amenities: ["واي فاي", "تكييف", "خزنة", "شاي وقهوة"],
    image: PHOTO.standard,
  },
  {
    id: "deluxe",
    name: "غرفة ديلوكس",
    capacity: 2,
    beds: "سرير كينج",
    size: "36 م²",
    nightly: 680,
    description: "غرفة أوسع مع جلسة جانبية وإضاءة دافئة، مناسبة للإقامة ليلتين أو أكثر.",
    amenities: ["واي فاي", "تكييف", "خزنة", "رداء استحمام", "ميني بار"],
    image: PHOTO.deluxe,
  },
  {
    id: "sea",
    name: "غرفة بإطلالة",
    capacity: 3,
    beds: "كينج + أريكة",
    size: "40 م²",
    nightly: 820,
    description: "غرفة تطل على الواجهة البحرية، تتسع لثلاثة نزلاء مع أريكة إضافية.",
    amenities: ["إطلالة بحرية", "واي فاي", "شرفة", "تكييف"],
    image: PHOTO.sea,
  },
  {
    id: "suite",
    name: "جناح",
    capacity: 4,
    beds: "غرفة نوم وصالة",
    size: "62 م²",
    nightly: 1250,
    description: "جناح بصالة منفصلة وغرفة نوم، للعائلات الصغيرة أو الإقامة الأطول.",
    amenities: ["صالة", "واي فاي", "خزنة", "دورة مياه رخامية"],
    image: PHOTO.suite,
  },
];

export const GUESTS: Guest[] = ([
  ["g01", "ليان الحربي", "0551000101", "جدة", 3],
  ["g02", "عمر السبيعي", "0551000102", "الرياض", 1],
  ["g03", "نورة القحطاني", "0551000103", "الدمام", 2],
  ["g04", "فهد الدوسري", "0551000104", "مكة", 4],
  ["g05", "سارة العتيبي", "0551000105", "الطائف", 1],
  ["g06", "ماجد الشمري", "0551000106", "حائل", 2],
  ["g07", "هند الزهراني", "0551000107", "أبها", 1],
  ["g08", "خالد المالكي", "0551000108", "المدينة", 5],
  ["g09", "ريم الغامدي", "0551000109", "جازان", 1],
  ["g10", "سلطان العنزي", "0551000110", "تبوك", 2],
  ["g11", "أمل الشهري", "0551000111", "نجران", 1],
  ["g12", "بدر الحارثي", "0551000112", "ينبع", 3],
  ["g13", "جواهر البلوي", "0551000113", "العلا", 1],
  ["g14", "تركي القرني", "0551000114", "الباحة", 2],
  ["g15", "لمى العمري", "0551000115", "الخبر", 1],
  ["g16", "ياسر الجهني", "0551000116", "رابغ", 2],
  ["g17", "دانة الرشيد", "0551000117", "القصيم", 1],
  ["g18", "ناصر الشهري", "0551000118", "الأحساء", 3],
  ["g19", "هيا المطيري", "0551000119", "الخرج", 1],
  ["g20", "عبدالله السلمي", "0551000120", "جدة", 2],
] as const).map(([id, name, phone, city, stays]) => ({
  id,
  name,
  phone,
  city,
  stays: Number(stays),
}));

const TYPE_CYCLE = ["standard", "deluxe", "sea", "suite", "standard", "deluxe", "sea", "standard", "deluxe", "suite"] as const;
const STATUS_CYCLE: RoomStatus[] = [
  "AVAILABLE",
  "AVAILABLE",
  "AVAILABLE",
  "AVAILABLE",
  "OCCUPIED",
  "OCCUPIED",
  "DIRTY",
  "CLEANING",
  "INSPECTED",
  "MAINTENANCE",
];

function categoryFor(previous: RoomStatus | null, next: RoomStatus): HistoryEntry["category"] {
  if (next === "MAINTENANCE" || next === "OUT_OF_ORDER" || previous === "MAINTENANCE" || previous === "OUT_OF_ORDER") {
    return "صيانة";
  }
  if (next === "OCCUPIED" || previous === "OCCUPIED") {
    return "إشغال";
  }
  return "نظافة وتجهيز";
}

export function buildSeed(): DemoState {
  const rooms: Room[] = Array.from({ length: 40 }, (_, index) => {
    const floor = 1 + Math.floor(index / 10);
    const slot = (index % 10) + 1;
    const status = index >= 36 ? "OUT_OF_ORDER" : STATUS_CYCLE[index % STATUS_CYCLE.length];
    return {
      id: `r${String(index + 1).padStart(2, "0")}`,
      number: `${floor}${String(slot).padStart(2, "0")}`,
      floor,
      typeId: TYPE_CYCLE[index % TYPE_CYCLE.length],
      status,
      view: floor >= 3 ? "واجهة بحرية" : "حديقة داخلية",
    };
  });

  const history: HistoryEntry[] = rooms
    .filter((room) => room.status !== "AVAILABLE")
    .map((room, index) => ({
      id: `h${room.id}`,
      roomId: room.id,
      previous: "AVAILABLE",
      next: room.status,
      category: categoryFor("AVAILABLE", room.status),
      actor: index % 2 === 0 ? "مشرف الغرف" : "الاستقبال",
      at: `2026-10-${String(18 + (index % 6)).padStart(2, "0")} 09:${String(10 + (index % 40)).padStart(2, "0")}`,
      note: "سجل افتتاحي لعرض الحالة.",
    }));

  const occupied = rooms.filter((room) => room.status === "OCCUPIED");
  const vacant = rooms.filter((room) => room.status === "AVAILABLE" || room.status === "INSPECTED");

  const plan: Array<{ status: ReservationStatus; arrival: string; departure: string; room: "occupied" | "vacant" | "none" }> = [
    { status: "CHECKED_IN", arrival: "2026-10-22", departure: "2026-10-25", room: "occupied" },
    { status: "CHECKED_IN", arrival: "2026-10-23", departure: "2026-10-24", room: "occupied" },
    { status: "CHECKED_IN", arrival: "2026-10-21", departure: "2026-10-26", room: "occupied" },
    { status: "CHECKED_IN", arrival: "2026-10-20", departure: "2026-10-27", room: "occupied" },
    { status: "CHECKED_IN", arrival: "2026-10-24", departure: "2026-10-26", room: "occupied" },
    { status: "CHECKED_IN", arrival: "2026-10-19", departure: "2026-10-24", room: "occupied" },
    { status: "CONFIRMED", arrival: "2026-10-24", departure: "2026-10-27", room: "vacant" },
    { status: "CONFIRMED", arrival: "2026-10-24", departure: "2026-10-25", room: "vacant" },
    { status: "CONFIRMED", arrival: "2026-10-25", departure: "2026-10-28", room: "vacant" },
    { status: "CONFIRMED", arrival: "2026-10-26", departure: "2026-10-29", room: "none" },
    { status: "PENDING", arrival: "2026-10-24", departure: "2026-10-26", room: "none" },
    { status: "PENDING", arrival: "2026-10-27", departure: "2026-10-29", room: "vacant" },
    { status: "PENDING", arrival: "2026-10-28", departure: "2026-10-30", room: "none" },
    { status: "CHECKED_OUT", arrival: "2026-10-18", departure: "2026-10-22", room: "none" },
    { status: "CHECKED_OUT", arrival: "2026-10-15", departure: "2026-10-20", room: "none" },
    { status: "CHECKED_OUT", arrival: "2026-10-12", departure: "2026-10-16", room: "none" },
    { status: "CANCELLED", arrival: "2026-10-24", departure: "2026-10-26", room: "none" },
    { status: "CANCELLED", arrival: "2026-10-21", departure: "2026-10-23", room: "none" },
    { status: "NO_SHOW", arrival: "2026-10-23", departure: "2026-10-25", room: "none" },
    { status: "CONFIRMED", arrival: "2026-10-30", departure: "2026-11-02", room: "vacant" },
    { status: "PENDING", arrival: "2026-11-01", departure: "2026-11-03", room: "none" },
    { status: "CHECKED_IN", arrival: "2026-10-22", departure: "2026-10-28", room: "occupied" },
    { status: "CHECKED_OUT", arrival: "2026-10-10", departure: "2026-10-14", room: "none" },
    { status: "CONFIRMED", arrival: "2026-10-24", departure: "2026-10-31", room: "vacant" },
  ];

  let occupiedCursor = 0;
  let vacantCursor = 0;
  const reservations: Reservation[] = plan.map((item, index) => {
    let roomId: string | null = null;
    if (item.room === "occupied" && occupiedCursor < occupied.length) {
      roomId = occupied[occupiedCursor].id;
      occupiedCursor += 1;
    } else if (item.room === "vacant" && vacantCursor < vacant.length) {
      roomId = vacant[vacantCursor].id;
      vacantCursor += 1;
    }
    const room = rooms.find((entry) => entry.id === roomId);
    return {
      id: `b${String(index + 1).padStart(2, "0")}`,
      code: `AZ-${2400 + index}`,
      guestId: GUESTS[index % GUESTS.length].id,
      roomId,
      typeId: room?.typeId ?? TYPE_CYCLE[index % TYPE_CYCLE.length],
      status: item.status,
      arrival: item.arrival,
      departure: item.departure,
      adults: 1 + (index % 2),
      children: index % 5 === 0 ? 1 : 0,
      note: "بيانات عرض وهمية.",
    };
  });

  return { rooms, reservations, history };
}

export function roomType(id: string): RoomType {
  return ROOM_TYPES.find((type) => type.id === id) ?? ROOM_TYPES[0];
}

export function guestById(id: string): Guest {
  return GUESTS.find((guest) => guest.id === id) ?? GUESTS[0];
}

export type Metrics = {
  total: number;
  available: number;
  occupied: number;
  maintenance: number;
  cleaning: number;
  current: number;
  arrivals: number;
  departures: number;
  occupancy: number;
  byRoom: Record<RoomStatus, number>;
  byReservation: Record<ReservationStatus, number>;
};

export function metricsOf(state: DemoState): Metrics {
  const byRoom = Object.fromEntries(ROOM_STATUSES.map((status) => [status, 0])) as Record<RoomStatus, number>;
  for (const room of state.rooms) {
    byRoom[room.status] += 1;
  }
  const byReservation = Object.fromEntries(RESERVATION_STATUSES.map((status) => [status, 0])) as Record<
    ReservationStatus,
    number
  >;
  let arrivals = 0;
  let departures = 0;
  for (const reservation of state.reservations) {
    byReservation[reservation.status] += 1;
    if ((reservation.status === "PENDING" || reservation.status === "CONFIRMED") && reservation.arrival === DEMO_TODAY) {
      arrivals += 1;
    }
    if (reservation.status === "CHECKED_IN" && reservation.departure === DEMO_TODAY) {
      departures += 1;
    }
  }
  const occupied = byRoom.OCCUPIED;
  const total = state.rooms.length;
  return {
    total,
    available: byRoom.AVAILABLE + byRoom.INSPECTED,
    occupied,
    maintenance: byRoom.MAINTENANCE + byRoom.OUT_OF_ORDER,
    cleaning: byRoom.DIRTY + byRoom.CLEANING,
    current: byReservation.PENDING + byReservation.CONFIRMED + byReservation.CHECKED_IN,
    arrivals,
    departures,
    occupancy: total === 0 ? 0 : Math.round((occupied / total) * 100),
    byRoom,
    byReservation,
  };
}

export function canConfirm(status: ReservationStatus): boolean {
  return status === "PENDING";
}

export function canCancel(status: ReservationStatus): boolean {
  return status === "PENDING" || status === "CONFIRMED";
}

export function canCheckIn(status: ReservationStatus, roomId: string | null, rooms: Room[]): boolean {
  if (status !== "CONFIRMED" || !roomId) {
    return false;
  }
  const room = rooms.find((entry) => entry.id === roomId);
  return Boolean(room && room.status !== "OCCUPIED" && room.status !== "MAINTENANCE" && room.status !== "OUT_OF_ORDER");
}

export function canCheckOut(status: ReservationStatus): boolean {
  return status === "CHECKED_IN";
}

const HOUSEKEEPING: RoomStatus[] = ["DIRTY", "CLEANING", "INSPECTED", "AVAILABLE", "MAINTENANCE", "OUT_OF_ORDER"];

export function nextRoomStatuses(current: RoomStatus): RoomStatus[] {
  if (current === "OCCUPIED") {
    return [];
  }
  return HOUSEKEEPING.filter((status) => status !== current);
}
