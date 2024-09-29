/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  transpilePackages: ['@ant-design', 'rc-util', 'rc-pagination', 'rc-picker'],
};

export default nextConfig;
