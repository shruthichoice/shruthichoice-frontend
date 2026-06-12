import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/products";

export function ProductRow({ products }: { products: Product[] }) {
  return (
    <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-4 md:mx-0 md:px-0">
      {products.map((p) => (
        <div
  key={p.slug}
  className="w-[42%] flex-shrink-0 snap-start sm:w-[35%] md:w-[calc(25%-2px)]"
>
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
