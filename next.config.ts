import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // allow common CDN and Drive/OneDrive/Dropbox hosts
    domains: [
      'drive.google.com',
      'lh3.googleusercontent.com',
      'onedrive.live.com',
      'api.onedrive.com',
      '1drv.ms',
      'dl.dropboxusercontent.com',
      'images.unsplash.com',
      'pbs.twimg.com',
      'github.com',
      'raw.githubusercontent.com'
    ],
    remotePatterns: [
      { protocol: 'https', hostname: '**.googleusercontent.com' },
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'onedrive.live.com' },
      { protocol: 'https', hostname: 'api.onedrive.com' },
      { protocol: 'https', hostname: 'dl.dropboxusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  }
};

export default nextConfig;
