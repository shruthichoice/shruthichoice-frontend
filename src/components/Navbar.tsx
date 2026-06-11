import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag, Menu, X, User } from "lucide-react";
import { useStore } from "@/context/store";

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

const NAV_LINKS: { label: string; to: string; params?: Record<string, string> }[] = [
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
  const [search, setSearch] = useState("");
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

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate({ to: "/sarees" });
      setSearch("");
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-background transition-[border-color] ${
        scrolled ? "border-b border-foreground" : "border-b border-transparent"
      }`}
    >
      {/* Desktop */}
      <div className="mx-auto hidden max-w-[1600px] items-center gap-6 px-6 py-4 lg:flex">
        <div className="flex-shrink-0">
          <Logo />
        </div>

        <nav className="flex items-center gap-7">
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

        <form onSubmit={submitSearch} className="ml-auto flex w-64 items-center border border-border px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full bg-transparent px-2 text-[13px] outline-none placeholder:text-muted-foreground"
          />
        </form>

        <div className="flex items-center gap-5">
          <Link to="/cart" className="relative" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center bg-brand px-1 text-[10px] font-medium text-brand-foreground">
                {cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <Link to="/account" className="link-underline text-[13px]">
              {user.name.split(" ")[0]}
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              className="link-underline text-[13px]"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3.5 lg:hidden">
        <button onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Menu className="h-6 w-6" strokeWidth={1.5} />
        </button>
        <Logo />
        <div className="flex items-center gap-4">
          <Link to="/wishlist" aria-label="Wishlist">
            <Heart className="h-5 w-5" strokeWidth={1.5} />
          </Link>
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

      {/* Mobile slide-in menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/50"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[82%] max-w-sm bg-background p-6">
            <div className="flex items-center justify-between">
              <Logo />
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>

            <form onSubmit={submitSearch} className="mt-6 flex items-center border border-border px-3 py-2.5">
              <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="w-full bg-transparent px-2 text-sm outline-none"
              />
            </form>

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
