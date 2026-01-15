export function TimestampIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ aspectRatio: "1/1" }}
    >
      <defs>
        <linearGradient id="timestampGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      
      {/* Circle background */}
      <circle cx="12" cy="12" r="10" fill="url(#timestampGradient)" />
      
      {/* Clock face */}
      <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="2" fill="none" />
      
      {/* Clock hands */}
      <path d="M12 12L12 8" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 12L15 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
      
      {/* Center dot */}
      <circle cx="12" cy="12" r="1" fill="white" />
    </svg>
  );
}
