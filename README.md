# Measure Pottery — website (V1)

Next.js 15 site built from the approved V1 Figma design.

## Run locally
npm install
npm run dev        # http://localhost:3000

## Deploy to Vercel
Import this repository at https://vercel.com/new (framework: Next.js, default settings), or from the CLI:
npx vercel deploy --prod

## Pages
/ · /shop · /product/[slug] · /checkout · /business (quote form) · /portfolio · /story · /contact · /ar (Arabic home)

## Not connected yet
Payments (mada / Apple Pay / Tamara), OTO shipping, and form delivery are front-end only.
Products live in lib/products.ts; photos in public/img; logo in public/logo (stacked lockup).
