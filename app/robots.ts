import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = "https://rahulwebdev.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/blog", "/case-studies", "/freelance-web-developer-patna"],
        disallow: [
          "/admin/",
          "/api/admin/",
          "/api/auth/",
          "/verify-email",
          "/_next/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/admin/", "/api/auth/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/", "/api/admin/", "/api/auth/"],
      },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OpenAI", allow: "/" },
      { userAgent: "Googlebot-Extended", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Perplexity", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],

    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
