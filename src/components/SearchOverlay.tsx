import { Link } from "@tanstack/react-router";

interface Product {
  slug: string;
  name: string;
  price: string;
  image: string;
}

interface SearchOverlayProps {
  query: string;
  isOpen: boolean;
  onClose: () => void;
  suggestions: string[];
  quickProducts: Product[];
  onSuggestionClick: (term: string) => void;
}

export function SearchOverlay({
  query,
  isOpen,
  onClose,
  suggestions,
  quickProducts,
  onSuggestionClick,
}: SearchOverlayProps) {
  // Completely hide everything if search is closed or input field empty
  if (!isOpen || !query.trim()) return null;

  return (
    <>
      {/* Fixed backdrop lining up cleanly underneath the navbar */}
      <div className="fixed inset-0 top-[73px] z-30 bg-black/10" onClick={onClose} />

      {/* Minimalist Single-Line Dropdown Container 
        Pushed right up against the header with a clean thin border
      */}
      <div className="absolute left-0 right-0 top-full z-40 border-b border-foreground bg-background px-6 py-3.5 shadow-sm">
        <div className="mx-auto max-w-[1600px]">
  <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
    {suggestions.map((item, idx) => (
      <li key={idx}>
        <button
          type="button"
          onClick={() => onSuggestionClick(item)}
          className="text-sm text-foreground hover:text-muted-foreground transition-colors"
        >
          {item}
        </button>
      </li>
    ))}
  </ul>
</div>
      </div>
    </>
  );
}