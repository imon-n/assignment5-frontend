

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },  {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
       {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/**",
      },

    ],
  },
 
};

export default nextConfig;
