import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // SME images are capped at 2 MB in the action itself; this leaves room
      // for the multipart overhead and the form's other fields.
      bodySizeLimit: "3mb",
    },
  },
};

export default nextConfig;
