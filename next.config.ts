import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.VERCEL ? undefined : "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // Disable the Next.js dev indicator ("N" logo) in the bottom-left corner
  devIndicators: false,
  // HTTP → HTTPS redirect in production
async redirects() {
  return process.env.NODE_ENV === "production"
    ? [
        {
          source: "/font-generator-copy-and-paste",
          destination: "/",
          permanent: true,
        },
        {
          source: "/:path*",
          has: [
            {
              type: "header",
              key: "x-forwarded-proto",
              value: "http",
            },
          ],
          destination: "https://tyeflo.com/:path*",
          permanent: true,
        },
      ]
    : [];
},
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          ...(process.env.NODE_ENV === "production"
            ? [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
                },
              ]
            : []),
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: "/:all*(webp|svg|ico|png|jpg|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // Experimental: optimize package imports to reduce bundle size
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
