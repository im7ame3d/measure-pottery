import Link from "next/link";
import { href, type Lang } from "@/lib/i18n";
import { img, pName, sar, type Product } from "@/lib/products";

export default function ProductCard({ p, lang = "en" }: { p: Product; lang?: Lang }) {
  const name = pName(p, lang);
  return (
    <Link href={href(lang, `/product/${p.slug}`)} className="pcard">
      <div className="photo">
        <img src={img(p.image)} alt={name} loading="lazy" />
      </div>
      <div>
        <div className="name">{name}</div>
        <div className="meta"><span className="price">{sar(p.price, lang)}</span></div>
      </div>
    </Link>
  );
}
