/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  // Arabic became the default language at the root; keep old /ar links working.
  async redirects() {
    return [
      { source: "/ar", destination: "/", permanent: true },
      { source: "/ar/:path*", destination: "/:path*", permanent: true },
      { source: "/product/dune-vase-no-07", destination: "/product/dune-vase", permanent: true },
      { source: "/en/product/dune-vase-no-07", destination: "/en/product/dune-vase", permanent: true },
    ];
  },
};
export default nextConfig;
