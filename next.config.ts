import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    loader: 'custom',
    loaderFile: './src/shared/lib/image/cdn-loader.ts',
  },
};

export default nextConfig;
