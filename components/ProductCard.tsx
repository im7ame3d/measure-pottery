import Link from "next/link";
import { href, type Lang } from "@/lib/i18n";
import { img, pName, sar, type Product } from "@/lib/products";
import AddToCart from "./AddToCart";

export default function ProductCard({ p, lang = "en" }: { p: Product; lang?: Lang }) {
  const name = pName(p, lang);
  const link = href(lang, `/product/${p.slug}`);
  return (
    <div className="pcard">
      <Link href={link} className="photo" tabIndex={-1} aria-hidden="true">
        <img src={img(p.image)} alt="" loading="lazy" />
      </Link>
      <Link href={link} className="pcard-info">
        <div className="name">{name}</div>
        <div className="meta"><span className="price">{sar(p.price, lang)}</span></div>
      </Link>
      <AddToCart slug={p.slug} soldOut={p.soldOut} />
    </div>
  );
}
