import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useStore, cartTotals } from "@/context/store";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Bag — Shruthi's Choice" },
      { name: "description", content: "Review the items in your shopping bag." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, updateQty, removeFromCart } = useStore();
  const { subtotal, discount, delivery, total } = cartTotals(cart);
  const [promo, setPromo] = useState("");
  const [promoMsg, setPromoMsg] = useState("");

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <ShoppingBag className="h-10 w-10" strokeWidth={1} />
        <h1 className="mt-5 font-display text-xl uppercase tracking-wider">Your bag is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">Looks like you haven't added anything yet.</p>
        <Link
          to="/"
          className="mt-6 bg-brand px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.15em] text-brand-foreground"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
      <h1 className="font-display text-2xl uppercase tracking-[0.15em]">Shopping Bag</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.8fr_1fr]">
        <div>
          {cart.map((item) => (
            <div
              key={`${item.slug}-${item.size}-${item.color}`}
              className="flex gap-4 border-b border-border py-5"
            >
              <Link to="/product/$slug" params={{ slug: item.slug }} className="flex-shrink-0">
                <img src={item.image} alt={item.name} className="h-28 w-24 object-cover" loading="lazy" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-sublabel">Shruthi's Choice</p>
                    <Link to="/product/$slug" params={{ slug: item.slug }} className="mt-0.5 block text-sm">
                      {item.name}
                    </Link>
                    <p className="mt-1 text-[12px] text-muted-foreground">
                      Size: {item.size} &nbsp;|&nbsp; Color: {item.color}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.slug, item.size, item.color)}
                    aria-label="Remove"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center border border-border">
                    <button onClick={() => updateQty(item.slug, item.size, item.color, item.qty - 1)} className="px-2.5 py-1.5" aria-label="Decrease">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-7 text-center text-sm">{item.qty}</span>
                    <button onClick={() => updateQty(item.slug, item.size, item.color, item.qty + 1)} className="px-2.5 py-1.5" aria-label="Increase">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{formatPrice(item.price * item.qty)}</span>
                    {item.oldPrice && (
                      <span className="text-xs text-sublabel line-through">
                        {formatPrice(item.oldPrice * item.qty)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <div className="border border-border p-6">
            <h2 className="section-title text-xs">Order Summary</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Discount</dt>
                  <dd>− {formatPrice(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd>{delivery === 0 ? "Free" : formatPrice(delivery)}</dd>
              </div>
              <div className="my-2 h-px bg-border" />
              <div className="flex justify-between text-base font-medium">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>

            <div className="mt-5 flex items-center border border-border">
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Promo code"
                className="w-full px-3 py-2.5 text-sm outline-none"
              />
              <button
                onClick={() => setPromoMsg(promo ? "Invalid promo code." : "")}
                className="bg-foreground px-4 py-2.5 text-[12px] font-medium uppercase tracking-wider text-background"
              >
                Apply
              </button>
            </div>
            {promoMsg && <p className="mt-2 text-[12px] text-destructive">{promoMsg}</p>}

            <Link
              to="/checkout"
              className="mt-5 block w-full bg-foreground py-3.5 text-center text-[12px] font-medium uppercase tracking-[0.15em] text-background"
            >
              Proceed to Checkout
            </Link>
          </div>
          <Link to="/" className="link-underline mt-4 inline-block text-[12px] uppercase tracking-wider">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
