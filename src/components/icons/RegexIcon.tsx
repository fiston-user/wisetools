export function RegexIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ aspectRatio: "1/1" }}
    >
      <defs>
        <linearGradient id="regexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      
      {/* Circle background */}
      <circle cx="12" cy="12" r="10" fill="url(#regexGradient)" />
      
      {/* Magnifying glass for "search/match" */}
      <circle cx="10" cy="10" r="4" stroke="white" strokeWidth="2" fill="none" />
      <path d="M13 13L17 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
      
      {/* Pattern dots */}
      <circle cx="8" cy="17" r="1.2" fill="white" />
      <circle cx="11" cy="17" r="1.2" fill="white" />
      <circle cx="14" cy="17" r="1.2" fill="white" />
    </svg>
  );
}
