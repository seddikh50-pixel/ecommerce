import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
         {
        protocol: "https",
        hostname: "xhhvkhampjvddoanpmog.supabase.co", // ✅ Supabase
      },
    ],
  },
};

export default nextConfig;