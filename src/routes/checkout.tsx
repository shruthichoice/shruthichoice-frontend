import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useStore, cartTotals } from "@/context/store";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Shruthi's Choice" },
      { name: "description", content: "Complete your order securely." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const STEPS = ["Address", "Payment", "Confirmed"];

const inputClass = "w-full border border-border px-3 py-2.5 text-sm outline-none focus:border-foreground";

function CheckoutPage() {
  const { cart, clearCart, user } = useStore();
  const { subtotal, discount, delivery, total } = cartTotals(cart);
  const [step, setStep] = useState(0);
  const [orderId] = useState(() => "SC" + Math.floor(100000 + Math.random() * 900000));
  const [addr, setAddr] = useState({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    pincode: "",
    house: "",
    area: "",
    city: "",
    state: "",
  });

  if (cart.length === 0 && step < 2) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <p className="text-sm text-muted-foreground">Your bag is empty.</p>
        <Link to="/" className="mt-4 bg-brand px-8 py-3 text-[12px] font-medium uppercase tracking-[0.15em] text-brand-foreground">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const set = (k: keyof typeof addr) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setAddr((a) => ({ ...a, [k]: e.target.value }));

  const placeOrder = () => {
    clearCart();
    setStep(2);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="mx-auto max-w-[1080px] px-4 py-8 md:px-6">
      {/* Progress */}
      <div className="mx-auto flex max-w-lg items-center justify-between">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-[12px] ${
                  i < step
                    ? "border-foreground bg-foreground text-background"
                    : i === step
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className="mt-1.5 text-[10px] uppercase tracking-wider">{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`mx-2 h-px flex-1 ${i < step ? "bg-foreground" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          {step === 0 && (
            <div>
              <h2 className="section-title text-sm">Delivery Address</h2>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input className={inputClass} placeholder="Full Name" value={addr.name} onChange={set("name")} />
                <input className={inputClass} placeholder="Phone" value={addr.phone} onChange={set("phone")} />
                <input className={inputClass} placeholder="Pincode" value={addr.pincode} onChange={set("pincode")} />
                <input className={inputClass} placeholder="Flat / House No." value={addr.house} onChange={set("house")} />
                <input className={`${inputClass} sm:col-span-2`} placeholder="Area / Street" value={addr.area} onChange={set("area")} />
                <input className={inputClass} placeholder="City" value={addr.city} onChange={set("city")} />
                <input className={inputClass} placeholder="State" value={addr.state} onChange={set("state")} />
              </div>
              <label className="mt-4 flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-[#000]" /> Save as default address
              </label>
              <button
                onClick={() => setStep(1)}
                disabled={!addr.name || !addr.pincode || !addr.phone}
                className="mt-6 w-full bg-foreground py-3.5 text-[12px] font-medium uppercase tracking-[0.15em] text-background disabled:opacity-40 sm:w-auto sm:px-16"
              >
                Continue
              </button>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="section-title text-sm">Payment</h2>
              <div className="mt-5 space-y-3">
                {["Credit / Debit Card", "UPI", "Net Banking", "Cash on Delivery"].map((m, i) => (
                  <label key={m} className="flex cursor-pointer items-center gap-3 border border-border px-4 py-3.5 text-sm has-[:checked]:border-foreground">
                    <input type="radio" name="pay" defaultChecked={i === 0} className="accent-[#000]" />
                    {m}
                  </label>
                ))}
              </div>
              <p className="mt-3 text-[12px] text-muted-foreground">
                Payments are securely processed via Razorpay. (Demo checkout — no real charge.)
              </p>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setStep(0)} className="border border-foreground px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.15em]">
                  Back
                </button>
                <button onClick={placeOrder} className="flex-1 bg-brand py-3.5 text-[12px] font-medium uppercase tracking-[0.15em] text-brand-foreground">
                  Pay {formatPrice(total)}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="py-8 text-center lg:text-left">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand lg:mx-0">
                <Check className="h-8 w-8 text-brand-foreground" />
              </div>
              <h2 className="mt-5 font-display text-2xl uppercase tracking-wider">Order Placed Successfully</h2>
              <p className="mt-2 text-sm text-muted-foreground">Thank you for shopping with Shruthi's Choice.</p>
              <div className="mt-5 space-y-1 text-sm">
                <p>Order ID: <span className="font-medium">{orderId}</span></p>
                <p>Estimated delivery: 4–6 business days</p>
              </div>
              <Link
                to="/"
                className="mt-7 inline-block bg-foreground px-10 py-3.5 text-[12px] font-medium uppercase tracking-[0.15em] text-background"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Summary */}
        {step < 2 && (
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="border border-border p-6">
              <h2 className="section-title text-xs">Order Summary</h2>
              <div className="mt-4 space-y-3">
                {cart.map((item) => (
                  <div key={`${item.slug}-${item.size}-${item.color}`} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="h-16 w-12 object-cover" loading="lazy" />
                    <div className="flex-1 text-[13px]">
                      <p className="line-clamp-1">{item.name}</p>
                      <p className="text-[11px] text-muted-foreground">{item.size} · {item.color} · Qty {item.qty}</p>
                    </div>
                    <span className="text-[13px]">{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="my-4 h-px bg-border" />
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
                {discount > 0 && <div className="flex justify-between"><dt className="text-muted-foreground">Discount</dt><dd>− {formatPrice(discount)}</dd></div>}
                <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd>{delivery === 0 ? "Free" : formatPrice(delivery)}</dd></div>
                <div className="my-1 h-px bg-border" />
                <div className="flex justify-between text-base font-medium"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
