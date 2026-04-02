import Link from 'next/link'
import ThreeBackground from '@/components/landing/ThreeBackground'

export default function LandingGrid() {
  return (
    <main className="relative isolate min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <ThreeBackground variant="grid" />
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950/80 via-cyan-950/50 to-slate-950/80" />

      <div className="mx-auto grid min-h-[100dvh] max-w-6xl items-center gap-10 px-6 py-24 text-slate-100 md:grid-cols-[1.1fr_0.9fr]">
        <section>
          <p className="mb-5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100">
            Experimental Variant
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Landing pages that feel alive, not static templates.
          </h1>
          <p className="mt-6 max-w-xl text-slate-300 sm:text-lg">
            Launch variants quickly, test what converts best, and switch live from the admin panel in one click.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/case-studies"
              className="rounded-md bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Explore Work
            </Link>
            <Link
              href="/blog"
              className="rounded-md border border-slate-300/70 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Read Blog
            </Link>
          </div>
        </section>

        <aside className="rounded-2xl border border-cyan-200/20 bg-slate-900/60 p-6 backdrop-blur">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">Launch Controls</h2>
          <ul className="mt-6 space-y-4 text-sm text-slate-200">
            <li className="rounded-lg border border-slate-700/60 bg-slate-800/60 px-4 py-3">Realtime landing-page switching</li>
            <li className="rounded-lg border border-slate-700/60 bg-slate-800/60 px-4 py-3">Dynamic visual scenes with responsive rendering</li>
            <li className="rounded-lg border border-slate-700/60 bg-slate-800/60 px-4 py-3">Built for experimentation and speed</li>
          </ul>
        </aside>
      </div>
    </main>
  )
}
