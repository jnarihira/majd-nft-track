/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MORALIS_API_KEY: "zcEUqHOPDmgrtsraTw3Ggb1x1KNuiiyO36Y6YgGSO1IZc9f5FvUBl0eG622a0MUq"
  },
  optimizeFonts: true,
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } }
    ]
  }
}

module.exports = nextConfig
