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
    esmExternals: true, // 더 엄격한 ESM 외부 모듈 처리
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'rc-util': 'commonjs rc-util',
      });
    }
    return config;
  },
};

export default pwaConfig(nextConfig);
