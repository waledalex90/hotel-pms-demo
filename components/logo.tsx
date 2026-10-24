export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="#101C32" />
      <path d="M8 34V18l16-8 16 8v16" fill="none" stroke="#C8A86B" strokeWidth="2.2" />
      <path d="M18 34V24h12v10" fill="none" stroke="#F8F6F1" strokeWidth="2" />
      <circle cx="24" cy="20" r="1.4" fill="#C8A86B" />
    </svg>
  );
}
