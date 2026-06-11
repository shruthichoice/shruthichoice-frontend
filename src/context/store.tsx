import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import type { Product } from "@/lib/products";

export interface CartItem {
  slug: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  size: string;
  color: string;
  qty: number;
}

export interface User {
  name: string;
  email: string;
  phone?: string;
}

interface StoreContextValue {
  cart: CartItem[];
  recentlyViewed: string[];
  user: User | null;
  authOpen: boolean;
  cartCount: number;
  setAuthOpen: (v: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (slug: string, size: string, color: string) => void;
  updateQty: (slug: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  addRecentlyViewed: (slug: string) => void;
  login: (user: User) => void;
  logout: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(readLS("sc_cart", []));
    setRecentlyViewed(readLS("sc_recent", []));
    setUser(readLS("sc_user", null));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("sc_cart", JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem("sc_recent", JSON.stringify(recentlyViewed));
  }, [recentlyViewed, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem("sc_user", JSON.stringify(user));
  }, [user, hydrated]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (i) => i.slug === item.slug && i.size === item.size && i.color === item.color,
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + item.qty };
        return next;
      }
      return [...prev, item];
    });
    toast.success("Added to bag");
  };

  const removeFromCart = (slug: string, size: string, color: string) => {
    setCart((prev) =>
      prev.filter((i) => !(i.slug === slug && i.size === size && i.color === color)),
    );
  };

  const updateQty = (slug: string, size: string, color: string, qty: number) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((i) =>
        i.slug === slug && i.size === size && i.color === color ? { ...i, qty } : i,
      ),
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (slug: string) => {
    setWishlist((prev) => {
      if (prev.includes(slug)) {
        toast("Removed from wishlist");
        return prev.filter((s) => s !== slug);
      }
      toast.success("Added to wishlist");
      return [...prev, slug];
    });
  };

  const isWishlisted = (slug: string) => wishlist.includes(slug);

  const addRecentlyViewed = (slug: string) => {
    setRecentlyViewed((prev) => [slug, ...prev.filter((s) => s !== slug)].slice(0, 8));
  };

  const login = (u: User) => {
    setUser(u);
    setAuthOpen(false);
    toast.success(`Welcome, ${u.name.split(" ")[0]}`);
  };

  const logout = () => {
    setUser(null);
    toast("Signed out");
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        recentlyViewed,
        user,
        authOpen,
        cartCount,
        setAuthOpen,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        toggleWishlist,
        isWishlisted,
        addRecentlyViewed,
        login,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function cartTotals(cart: CartItem[]) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const originalTotal = cart.reduce((s, i) => s + (i.oldPrice ?? i.price) * i.qty, 0);
  const discount = originalTotal - subtotal;
  const delivery = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + delivery;
  return { subtotal, discount, delivery, total };
}

export type { Product };
