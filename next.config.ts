import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: "https",
              hostname: "placehold.co",
          },
          {
              protocol: "https",
              hostname: "encrypted-tbn0.gstatic.com",
          },{
              protocol: "https",
              hostname: "www.facebook.com",
          },
      ],
  },
};

export default nextConfig;
