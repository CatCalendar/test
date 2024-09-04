import withPWA from 'next-pwa';

// NODE_ENV가 'production'일 때만 PWA 활성화
const isProd = process.env.NODE_ENV === 'production';

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: !isProd, // 개발 모드에서는 PWA 비활성화
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    esmExternals: 'loose', // ESM 외부 모듈을 처리
  },
};

export default pwaConfig(nextConfig);
