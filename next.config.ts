import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // app/layout.tsx や app/page.tsx でのキャッシュを有効にする
    // useCache: true, // このオプションは古いため、必要に応じて代替手段を検討
  },
  images: {
    // Next.jsのImageコンポーネントで外部ドメインの画像を表示するために、
    // ここにドメインやパターンを登録する必要があります。
    domains: ['hbb.afl.rakuten.co.jp', 'img.travel.rakuten.co.jp'],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "openweathermap.org",
      },
    ],
  },
};

export default nextConfig;