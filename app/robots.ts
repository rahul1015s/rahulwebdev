import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rahulwebdev.in";

  return {
    rules: [
      // Default rules
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/admin/",
          "/api/auth/",
          "/verify-email/",
          "/private/",
          "/*.pdf$",
        ],
        crawlDelay: 1,
      },

      // Googlebot (crawl-delay ignored anyway)
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },

      // Bingbot
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
        crawlDelay: 1,
      },

      // AI / LLM crawlers (explicit allow)
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OpenAI", allow: "/" },
      { userAgent: "Googlebot-Extended", allow: "/" },
      { userAgent: "AppleBot", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Perplexity", allow: "/" },
    ],

    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
