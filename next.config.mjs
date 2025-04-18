/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'ifuvypzwwqeyronxpnzz.supabase.co'],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false }
    
    // Add SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
    
    return config
  },
  experimental: {
    serverActions: true,
  },
}

export default nextConfig 