import Link from "next/link";
import { img, sar, type Product } from "@/lib/products";
import Icon from "./Icon";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/product/${p.slug}`} className="pcard">
      <div className="photo">
        <img src={img(p.image)} alt={p.name} loading="lazy" />
        <div className="top">
          {p.tag ? <span className={`tag ${p.tag === "One of a kind" ? "dark" : ""}`}>{p.tag}</span> : <span />}
          <span className="heart" aria-hidden="true"><Icon name="heart" /></span>
        </div>
      </div>
      <div>
        <div className="name">{p.name}</div>
        <div className="meta"><span className="price">{sar(p.price)}</span><span className="xs muted">Stoneware</span></div>
      </div>
    </Link>
  );
}
