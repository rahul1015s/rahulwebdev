import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Compress and optimize output
  compress: true,

  // Generate ETags for cache validation
  generateEtags: true,

  // Enable PoweredByHeader for production
  poweredByHeader: false,

  // Enable SWR (Stale-While-Revalidate) for ISR pages
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // Reduce memory usage
    pagesBufferLength: 5,
  },

  // Image optimization for better performance and SEO
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "onedrive.live.com" },
      { protocol: "https", hostname: "api.onedrive.com" },
      { protocol: "https", hostname: "1drv.ms" },
      { protocol: "https", hostname: "dl.dropboxusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
    ],

    localPatterns: [
      { pathname: "/api/proxy/image" },
      { pathname: "/projects/**" },
      { pathname: "/default-blog.png" },
      { pathname: "/project-default.png" },
    ],

    // Optimize image formats and sizes
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year for static images
  },

  // Headers for SEO and security
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      // Cache static assets
      {
        source: "/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache public images
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Dynamic content cache
      {
        source: "/blog",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/blog/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/api/blog",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },

  // Redirects for SEO preservation
  async redirects() {
    return [
      // Add redirects for old URLs if needed
      // {
      //   source: "/old-blog/:slug",
      //   destination: "/blog/:slug",
      //   permanent: true, // 301 redirect
      // },
    ];
  },

  // Rewrites for cleaner URLs
  async rewrites() {
    return {
      beforeFiles: [],
    };
  },
};

export default nextConfig;
