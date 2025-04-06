import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
   domains: ['images.pexels.com']
  }
};

export default nextConfig;
