import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/products";

export function ProductRow({ products }: { products: Product[] }) {
  return (
    <div className="no-scrollbar -mx-4 flex snap-x gap-[2px] overflow-x-auto px-4 md:mx-0 md:px-0">
      {products.map((p) => (
        <div
          key={p.slug}
          className="w-[46%] flex-shrink-0 snap-start sm:w-[38%] md:w-[calc(25%-2px)]"
        >
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
