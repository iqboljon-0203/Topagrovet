/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Preparing for Cloudflare Pages
  output: 'export',
};

export default nextConfig;
