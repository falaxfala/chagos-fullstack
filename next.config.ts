import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.baustoffshop.de"],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
