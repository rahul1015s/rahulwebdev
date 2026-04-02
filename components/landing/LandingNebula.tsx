import Link from 'next/link'
import ThreeBackground from '@/components/landing/ThreeBackground'

export default function LandingNebula() {
  return (
    <main className="relative isolate min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <ThreeBackground variant="nebula" />
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-900/60 via-slate-950/55 to-slate-900/80" />

      <div className="mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-center px-6 py-24 text-white">
        <p className="mb-4 inline-flex w-fit rounded-full border border-sky-300/40 bg-sky-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em]">
          Interactive Landing
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Building pixel-perfect products with motion, depth, and performance.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-slate-200 sm:text-lg">
          I design and build full-stack web experiences where frontend polish and backend reliability move together.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/case-studies"
            className="rounded-md bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
          >
            View Case Studies
          </Link>
          <Link
            href="/blog"
            className="rounded-md border border-slate-200/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-100 hover:text-slate-900"
          >
            Read Blog
          </Link>
        </div>
      </div>
    </main>
  )
}
