/** @type {import('next').NextConfig} */
/*
https://medium.com/@rohitkumarkhatri/next-auth-in-app-router-of-next-js-7df037f7a2ad
*/
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.imgur.com'
        }
      ]
    },
    env: {
      GOOGLE_CLIENT_ID: `${process.env.CLIENT_ID}`,
      GOOGLE_CLIENT_SECRET: `${process.env.CLIENT_SECRET}`,
      NEXTAUTH_SECRET: `${process.env.NEXTAUTH_SECRET}`
    }
  }
  
  export default nextConfig
  