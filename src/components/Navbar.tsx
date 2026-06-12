import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag, Menu, X, User } from "lucide-react";
import { useStore } from "@/context/store";
import { products } from "@/lib/products"; 

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="inline-flex items-baseline leading-none">
      <span
        className={`font-serif text-2xl font-bold tracking-tight md:text-[26px] ${
          light ? "text-background" : "text-foreground"
        }`}
      >
        Shruthi's Choice
      </span>
      <span className="ml-0.5 text-2xl font-bold text-brand md:text-[26px]">.</span>
    </Link>
  );
}

const NAV_LINKS: { label: string; to: string }[] = [
  { label: "Sarees", to: "/sarees" },
  { label: "Kurthas", to: "/kurthas" },
  { label: "3-Piece Sets", to: "/3-piece-sets" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Sale", to: "/sale" },
];

export function Navbar() {
  const { cartCount, user, setAuthOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Compute live match keywords based on the query input
  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }

    const cleanQuery = search.toLowerCase().trim();

    const matchedKeywords = products
      .filter((p) => p.name.toLowerCase().includes(cleanQuery))
      .map((p) => p.name)
      .slice(0, 5);

    setSuggestions([...new Set(matchedKeywords)]);
  }, [search]);

  // Handle collapsing suggestions panel when clicking outside the navbar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    navigate({
      to: "/products",
      search: { q: search.trim() },
    });

    setSearch("");
    setSearchOpen(false);
  };

  const handleSuggestionSelect = (term: string) => {
    navigate({
      to: "/products",
      search: { q: term },
    });
    setSearch("");
    setSearchOpen(false);
  };

  return (
    <header
      ref={searchContainerRef}
      className={`sticky top-0 z-40 bg-background transition-[border-color] ${
        scrolled ? "border-b border-foreground" : "border-b border-transparent"
      }`}
    >
      {/* Desktop Viewport Layout */}
      <div className="mx-auto hidden max-w-[1600px] items-center px-6 py-4 lg:flex">
        <div className="w-[220px] flex-shrink-0">
          <Logo />
        </div>

        <nav className="flex flex-1 justify-center items-center gap-7">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="link-underline text-[13px] tracking-[0.02em] text-foreground"
              activeProps={{ className: "font-medium" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Search wrapper with local relative context */}
        <div className="relative w-[320px] flex items-center justify-end gap-5">
          <form
            onSubmit={submitSearch}
            className={`flex w-64 items-center border px-3 py-2 transition-colors ${
              searchOpen && search.trim() ? "border-foreground" : "border-border"
            }`}
          >
            <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              value={search}
              onFocus={() => setSearchOpen(true)}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent px-2 text-[13px] outline-none placeholder:text-muted-foreground"
            />
          </form>

          {/* Desktop Inline Suggestion Box: Matches mobile logic perfectly */}
          {searchOpen && search.trim() && suggestions.length > 0 && (
            <div className="absolute right-[115px] top-full z-50 mt-1 w-64 border border-foreground bg-background p-3 shadow-md">
              <ul className="space-y-2.5">
                {suggestions.map((item, idx) => (
                  <li key={idx}>
                    <button
                      type="button"
                      onClick={() => handleSuggestionSelect(item)}
                      className="w-full text-left text-[13px] text-foreground hover:underline truncate"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link to="/cart" className="relative" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center bg-brand px-1 text-[10px] font-medium text-brand-foreground">
                {cartCount}
              </span>
            )}
          </Link>

<button
  onClick={() => {
    if (user) {
      navigate({ to: "/account" });
    } else {
      setAuthOpen(true);
    }
  }}
  aria-label="Profile"
  className="flex items-center justify-center"
>
  <User className="h-5 w-5" strokeWidth={1.5} />
</button>
        </div>
      </div>

      {/* Mobile Viewport Layout */}
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3.5 lg:hidden">
        <button onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Menu className="h-6 w-6" strokeWidth={1.5} />
        </button>
        <Logo />
        <div className="flex items-center gap-4">
          <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <Link to="/cart" className="relative" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center bg-brand px-1 text-[10px] font-medium text-brand-foreground">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-background px-4 py-3 lg:hidden">
          <form onSubmit={submitSearch}>
            <div className="flex items-center border border-foreground px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent px-2 text-sm outline-none"
                autoFocus
              />
            </div>
          </form>
          {suggestions.length > 0 && (
            <div className="mt-4 max-h-[60vh] overflow-y-auto pb-4">
              <ul className="space-y-3 border-b border-border pb-4">
                {suggestions.map((item, idx) => (
                  <li key={idx}>
                    <button
                      type="button"
                      onClick={() => handleSuggestionSelect(item)}
                      className="text-sm font-medium text-left w-full"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Mobile side-in menu panel drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setMenuOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[82%] max-w-sm bg-background p-6">
            <div className="flex items-center justify-between">
              <Logo />
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>

            <nav className="mt-8 flex flex-col">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-border py-4 font-display text-lg uppercase tracking-wide"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 flex flex-col gap-4 text-sm">
              {user ? (
                <Link to="/account" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                  <User className="h-4 w-4" /> {user.name}
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setAuthOpen(true);
                  }}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" /> Sign In / Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}