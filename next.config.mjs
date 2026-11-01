/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  // Arabic became the default language at the root; keep old /ar links working.
  async redirects() {
    return [
      { source: "/ar", destination: "/", permanent: true },
      { source: "/ar/:path*", destination: "/:path*", permanent: true },
      // the business page was folded into the portfolio (the enquiry form now sits above every footer)
      { source: "/business", destination: "/portfolio", permanent: true },
      { source: "/en/business", destination: "/en/portfolio", permanent: true },
      // products that are no longer sold go to the shop
      { source: "/product/:slug(dune-vase|dune-vase-no-07|ash-glaze-cup-set|sand-serving-bowl|stone-dinner-plate|tide-bud-vase|espresso-cup-and-saucer|fog-pasta-bowl|gift-set-morning-ritual|salt-side-plate)", destination: "/shop", permanent: false },
      { source: "/en/product/:slug(dune-vase|dune-vase-no-07|ash-glaze-cup-set|sand-serving-bowl|stone-dinner-plate|tide-bud-vase|espresso-cup-and-saucer|fog-pasta-bowl|gift-set-morning-ritual|salt-side-plate)", destination: "/en/shop", permanent: false },
    ];
  },
};
export default nextConfig;
