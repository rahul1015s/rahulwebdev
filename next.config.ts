import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

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
      { pathname: "/project-default.png"},
    ],
  },
};

export default nextConfig;
