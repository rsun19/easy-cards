/** @type {import('next').NextConfig} */
/*
https://medium.com/@rohitkumarkhatri/next-auth-in-app-router-of-next-js-7df037f7a2ad
*/

const env = process.env.NODE_ENV;

const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  env: env === 'production' ? 
  {
    NEXT_PUBLIC_API_URL: "http://backend:9000",
    NEXT_PUBLIC_CLIENT_TO_API_URL: "https://easyflashcards.org/clientAPI",
    NEXT_PUBLIC_REDIRECT_BASE: "https://easyflashcards.org"
  }
  : {
    NEXT_PUBLIC_API_URL: "http://localhost:9000",
    NEXT_PUBLIC_CLIENT_TO_API_URL: "http://localhost:9000",
    NEXT_PUBLIC_REDIRECT_BASE: "/"
  }
};

export default nextConfig;
