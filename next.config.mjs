/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  // Arabic became the default language at the root; keep old /ar links working.
  async redirects() {
    return [
      { source: "/ar", destination: "/", permanent: true },
      { source: "/ar/:path*", destination: "/:path*", permanent: true },
    ];
  },
};
export default nextConfig;
