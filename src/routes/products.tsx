import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/SectionTitle";

// Enforce type safety for search query parameters
type ProductSearchSchema = {
  q?: string;
};

export const Route = createFileRoute("/products")({
  validateSearch: (search: Record<string, unknown>): ProductSearchSchema => {
    return {
      q: search.q ? String(search.q) : undefined,
    };
  },
  component: SearchResultsPage,
});

function SearchResultsPage() {
  // Extract type-safe search query from the TanStack route hook context
  const { q } = Route.useSearch();
  
  const queryClean = (q ?? "").trim().toLowerCase();

  // Filter items matching name, description, category, or fabric strings
  const filteredProducts = products.filter((p) => {
    if (!queryClean) return true; // Show everything if query is cleared
    return (
      p.name.toLowerCase().includes(queryClean) ||
      p.description?.toLowerCase().includes(queryClean) ||
      p.categoryLabel?.toLowerCase().includes(queryClean) ||
      p.fabric?.toLowerCase().includes(queryClean)
    );
  });

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-12 md:px-6 md:py-16">
      {/* Dynamic Header */}
      
{q && (
  <p className="mb-5 text-sm text-muted-foreground">
    Results for "{q}"
  </p>
)}
     

      {/* Empty State Fallback Screen Block */}
      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-sm text-muted-foreground">
            We couldn't find anything matching your search. Check your spelling or try another keyword.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-block bg-foreground px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-background transition-opacity hover:opacity-90"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Suggested Alternative Quick Links */}
          <div className="mt-12">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Popular Categories
            </p>
            <div className="mt-4 flex justify-center gap-4 text-xs uppercase tracking-wider">
              <Link to="/sarees" className="link-underline">Sarees</Link>
              <span className="text-muted-foreground/40">|</span>
              <Link to="/kurthas" className="link-underline">Kurthas</Link>
              <span className="text-muted-foreground/40">|</span>
              <Link to="/3-piece-sets" className="link-underline">3-Piece Sets</Link>
            </div>
          </div>
        </div>
      ) : (
        /* Precise 4-Column Minimal Grid (Westside Signature Structure) */
        <div className="grid grid-cols-2 gap-x-[2px] gap-y-10 sm:grid-cols-3 md:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}