

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "i.ibb.co",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//         pathname: "/**",
//       },
//     ],
//   },
//    reactCompiler: true,

//   // better-auth proxy
//   async rewrites() {
//     return [
//       {
//         // Explicitly map auth requests
//         source: "/api/auth/:path*",
//         destination: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/:path*",
//       },
//       {
//         // Explicitly map v1 API requests
//         source: "/api/:path*",
//         destination: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/:path*",
//       },
//     ];
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://assignment5-backend-f7q4.onrender.com";

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
      },
    ],
  },
  reactCompiler: true,

  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${BACKEND_URL}/api/auth/:path*`,  
      },
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`, 
      },
    ];
  },
};

export default nextConfig;