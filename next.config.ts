import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/shop', destination: '/tops', permanent: true },
      { source: '/obsidian', destination: '/manifesto', permanent: true },
      { source: '/raw-supply', destination: '/accessories', permanent: true },
    ]
  },
}

export default nextConfig
