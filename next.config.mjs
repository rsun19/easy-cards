/** @type {import('next').NextConfig} */
/*
https://medium.com/@rohitkumarkhatri/next-auth-in-app-router-of-next-js-7df037f7a2ad
*/

const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
    ],
  },
  env: {
    GOOGLE_CLIENT_ID: `${process.env.CLIENT_ID}`,
    GOOGLE_CLIENT_SECRET: `${process.env.CLIENT_SECRET}`,
    NEXTAUTH_SECRET: `${process.env.NEXTAUTH_SECRET}`,
    NEXT_PUBLIC_API_URL: "http://backend:9000",
    NEXT_PUBLIC_CLIENT_TO_API_URL: "http://localhost:9000"
  },
};

export default nextConfig;
