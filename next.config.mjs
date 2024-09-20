import withPWA from 'next-pwa';

// NODE_ENV가 'production'일 때만 PWA 활성화
const isProd = process.env.NODE_ENV === 'production';

const pwaConfig = withPWA({
  dest: 'public',
  swSrc: 'public/sw.js', // sw.js 경로 확인
  register: true,
  skipWaiting: true,
  disable: !isProd, // 개발 모드에서는 PWA 비활성화
  buildExcludes: [
    /app-build-manifest\.json$/,
    /_buildManifest\.js$/,
  ],
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
    // Babel 로더 추가하여 프라이빗 메소드 변환
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
          plugins: [
            '@babel/plugin-transform-private-methods', // 프라이빗 메소드 변환 플러그인 추가
            '@babel/plugin-transform-runtime', // 필요 시 다른 플러그인 추가 가능
          ],
        },
      },
    });
    return config;
  },
};

export default pwaConfig(nextConfig);
