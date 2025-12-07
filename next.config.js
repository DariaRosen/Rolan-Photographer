/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./styles'],
  },
  images: {
    remotePatterns: [],
  },
}

module.exports = nextConfig

