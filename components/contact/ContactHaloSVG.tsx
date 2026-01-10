export function ContactHaloSVG() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 -z-10 h-full w-full"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(16,185,129,0.12)" />
          <stop offset="70%" stopColor="rgba(16,185,129,0.05)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="180" fill="url(#halo)" />
    </svg>
  );
}
