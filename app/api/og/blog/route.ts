import { connectDB } from "@/lib/mongodb";
import Post from "@/models/post";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();

  try {
    const latestPosts = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .select("title")
      .lean();

    let displayText = "Latest Blog Posts";
    if (latestPosts.length) {
      const titles = latestPosts
        .map((p) => p.title.slice(0, 28))
        .join(" • ");

      displayText =
        titles.length > 90 ? titles.slice(0, 87) + "…" : titles;
    }

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

  <!-- Accent strip -->
  <rect width="1200" height="6" fill="url(#accent)" />

  <!-- Content -->
  <g transform="translate(90, 160)">
    <!-- Badge -->
    <rect x="0" y="0" rx="6" ry="6" width="160" height="34" fill="#22c55e" opacity="0.15"/>
    <text x="18" y="23" font-size="16" fill="#22c55e" font-family="Inter, system-ui">
      LATEST POSTS
    </text>

    <!-- Brand -->
    <text
      x="0"
      y="90"
      font-size="42"
      font-weight="700"
      fill="#f8fafc"
      font-family="Inter, system-ui"
    >
      Rahul Verma
    </text>

    <!-- Titles -->
    <text
      x="0"
      y="150"
      font-size="28"
      font-weight="500"
      fill="#e5e7eb"
      font-family="Inter, system-ui"
    >
      ${displayText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")}
    </text>

    <!-- Divider -->
    <rect x="0" y="185" width="220" height="4" rx="2" fill="url(#accent)" />

    <!-- Tagline -->
    <text
      x="0"
      y="235"
      font-size="20"
      fill="#94a3b8"
      font-family="Inter, system-ui"
    >
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
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response(
      `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="630" fill="#020617"/>
        <text x="600" y="315" text-anchor="middle" font-size="40" fill="#22c55e" font-family="Inter, system-ui">
          Rahul Verma • Blog
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
