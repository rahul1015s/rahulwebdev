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

    let decoded = decodeURIComponent(raw)
    
    // Handle nested proxy URLs (prevent double/triple proxying)
    while (decoded.startsWith('/api/proxy/image?url=')) {
      const innerUrl = decoded.replace('/api/proxy/image?url=', '')
      decoded = decodeURIComponent(innerUrl)
    }
    
    // Handle Google Drive URLs: convert export=download to export=view for better image serving
    if (decoded.includes('drive.google.com/uc?export=download')) {
      decoded = decoded.replace('export=download', 'export=view')
    }
    
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

    // Check if the response is actually an image
    if (!contentType.startsWith('image/')) {
      // For Google Drive, check if the response is actually an image by examining the content
      if (target.hostname === 'drive.google.com' && target.pathname.startsWith('/uc')) {
        // Read a small portion of the response to check if it's an image
        const buffer = await resp.arrayBuffer()
        const bytes = new Uint8Array(buffer.slice(0, 4))
        
        // Check for common image file signatures
        const isImage = (
          // JPEG: FF D8 FF
          (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) ||
          // PNG: 89 50 4E 47
          (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) ||
          // GIF: 47 49 46
          (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) ||
          // WebP: 52 49 46 46 (RIFF)
          (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46)
        )
        
        if (!isImage) {
          return NextResponse.json({ ok: false, error: 'Google Drive file is not publicly accessible or is not an image' }, { status: 400 })
        }
        
        // Recreate the response with the buffer
        return new NextResponse(buffer, { status: 200, headers: { 'Content-Type': contentType || 'image/jpeg', 'Cache-Control': 'public, max-age=3600' } })
      } else {
        return NextResponse.json({ ok: false, error: 'The requested resource is not a valid image' }, { status: 400 })
      }
    }

    // Check if response has a body
    if (!resp.body) {
      return NextResponse.json({ ok: false, error: 'No content received from upstream' }, { status: 502 })
    }

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
