import { NextResponse } from 'next/server'

// Simple server-side image proxy. Limits allowed hosts to avoid open SSRF.
const ALLOWED_HOSTS = [
  'drive.google.com',
  'drive.usercontent.google.com',
  'lh3.googleusercontent.com',
]

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const raw = searchParams.get('url')
    if (!raw) return NextResponse.json({ ok: false, error: 'url required' }, { status: 400 })

    const decoded = decodeURIComponent(raw)
    let target: URL
    try {
      target = new URL(decoded)
    } catch (err) {
      return NextResponse.json({ ok: false, error: 'invalid url' }, { status: 400 })
    }

    if (!ALLOWED_HOSTS.includes(target.hostname)) {
      return NextResponse.json({ ok: false, error: 'host not allowed' }, { status: 403 })
    }

    const resp = await fetch(target.toString(), { method: 'GET', redirect: 'follow' })

    if (!resp.ok) {
      return NextResponse.json({ ok: false, error: `upstream ${resp.status}` }, { status: 502 })
    }

    const contentType = resp.headers.get('content-type') || 'application/octet-stream'

    // Return the upstream body directly with content-type preserved
    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600'
    }

    const body = resp.body
    return new NextResponse(body, { status: 200, headers })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 })
  }
}
