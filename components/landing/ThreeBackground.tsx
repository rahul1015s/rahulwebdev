type ThreeBackgroundProps = {
  variant: 'nebula' | 'grid'
}

export default function ThreeBackground({ variant }: ThreeBackgroundProps) {
  if (variant === 'nebula') {
    return (
      <div className="relative h-full w-full overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.35),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.28),transparent_40%),radial-gradient(circle_at_50%_75%,rgba(249,115,22,0.2),transparent_35%)]" />
        <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(rgba(191,219,254,0.6)_1px,transparent_1px)] [background-size:3px_3px]" />
      </div>
    )
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(34,211,238,0.2),rgba(2,6,23,0.9)_40%,rgba(15,23,42,0.95))]" />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(34,211,238,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.25)_1px,transparent_1px)] [background-size:42px_42px]" />
    </div>
  )
}
