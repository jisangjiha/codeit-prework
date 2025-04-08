import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* @type {import('next').NextConfig} */
  reactStrictMode: true,
  images: {
    domains: ["sprint-fe-project.s3.ap-northeast-2.amazonaws.com"],
  },
};

export default nextConfig;
