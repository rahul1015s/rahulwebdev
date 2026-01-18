import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/post";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  await connectDB();

  try {
    const post = await Post.findOne({ slug })
      .select("title")
      .lean();

    const title =
      post?.title ||
      request.nextUrl.searchParams.get("title") ||
      "Web Development Blog";

    const author =
      request.nextUrl.searchParams.get("author") || "Rahul Verma";

    const safeTitle =
      title.length > 72 ? title.slice(0, 69) + "…" : title;

    const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>

    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#16a34a"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)" />

  <!-- Accent stripe -->
  <rect x="0" y="0" width="1200" height="8" fill="url(#accent)" />

  <!-- Content -->
  <g transform="translate(90, 140)">
    <!-- Badge -->
    <rect x="0" y="0" rx="6" ry="6" width="170" height="34" fill="#16a34a" opacity="0.15"/>
    <text x="18" y="23" font-size="16" fill="#22c55e" font-family="Inter, system-ui">
      BLOG ARTICLE
    </text>

    <!-- Title -->
    <text
      x="0"
      y="120"
      font-size="56"
      font-weight="700"
      fill="#f8fafc"
      font-family="Inter, system-ui"
    >
      ${safeTitle
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")}
    </text>

    <!-- Divider -->
    <rect x="0" y="150" width="220" height="4" fill="url(#accent)" rx="2"/>

    <!-- Meta -->
    <text x="0" y="210" font-size="22" fill="#94a3b8" font-family="Inter, system-ui">
      by ${author}
    </text>

    <text x="0" y="245" font-size="18" fill="#64748b" font-family="Inter, system-ui">
      Web Development • SEO • Performance
    </text>
  </g>

  <!-- Footer -->
  <text
    x="1100"
    y="590"
    text-anchor="end"
    font-size="18"
    fill="#64748b"
    font-family="Inter, system-ui"
  >
    rahulwebdev.in
  </text>
</svg>
`;

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response(
      `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="630" fill="#020617"/>
        <text x="600" y="315" text-anchor="middle" font-size="40" fill="#22c55e" font-family="Inter, system-ui">
          Rahul Verma • Web Developer
        </text>
      </svg>`,
      {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=3600",
        },
      }
    );
  }
}
