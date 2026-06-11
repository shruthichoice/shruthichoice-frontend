import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/context/store";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — Shruthi's Choice" },
      { name: "description", content: "Manage your orders, wishlist and addresses." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

type Tab = "orders" | "addresses" | "profile";

const TABS: { key: Tab; label: string }[] = [
  { key: "orders", label: "My Orders" },
  { key: "addresses", label: "Saved Addresses" },
  { key: "profile", label: "Profile Details" },
];

const MOCK_ORDERS = [
  { id: "SC284910", date: "12 May 2024", total: 2499, status: "Shipped" },
  { id: "SC271044", date: "28 Apr 2024", total: 3998, status: "Delivered" },
  { id: "SC265510", date: "10 Apr 2024", total: 999, status: "Processing" },
];

function statusClass(status: string) {
  if (status === "Processing") return "bg-foreground text-background";
  if (status === "Shipped") return "bg-brand text-brand-foreground";
  return "border border-foreground text-foreground";
}

function AccountPage() {
  const { user, logout, setAuthOpen } = useStore();
  const [tab, setTab] = useState<Tab>("orders");

  if (!user) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h1 className="font-display text-xl uppercase tracking-wider">Please sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">Access your orders and addresses.</p>
        <button onClick={() => setAuthOpen(true)} className="mt-6 bg-foreground px-10 py-3.5 text-[12px] font-medium uppercase tracking-[0.15em] text-background">
          Sign In
        </button>
      </div>
    );
  }


  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
      <h1 className="font-display text-2xl uppercase tracking-[0.15em]">My Account</h1>
      <p className="mt-1 text-sm text-muted-foreground">Welcome back, {user.name}.</p>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="lg:border-r lg:border-border lg:pr-6">
          <nav className="flex flex-row flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:gap-0">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`py-2 text-left text-[12px] uppercase tracking-[0.1em] lg:border-b lg:border-border ${
                  tab === t.key ? "font-medium" : "text-muted-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
            <button onClick={logout} className="py-2 text-left text-[12px] uppercase tracking-[0.1em] text-destructive">
              Logout
            </button>
          </nav>
        </aside>

        <div>
          {tab === "orders" && (
            <div>
              <h2 className="section-title text-sm">My Orders</h2>
              <div className="mt-5 divide-y divide-border border-y border-border">
                {MOCK_ORDERS.map((o) => (
                  <div key={o.id} className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-sm font-medium">{o.id}</p>
                      <p className="text-[12px] text-muted-foreground">{o.date} · {formatPrice(o.total)}</p>
                    </div>
                    <span className={`px-3 py-1 text-[11px] uppercase tracking-wider ${statusClass(o.status)}`}>
                      {o.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "wishlist" && (
            <div>
              <h2 className="section-title text-sm">Wishlist</h2>
              {wishItems.length === 0 ? (
                <p className="mt-5 text-sm text-muted-foreground">No saved items yet.</p>
              ) : (
                <div className="mt-5 grid grid-cols-2 gap-x-[2px] gap-y-6 md:grid-cols-3">
                  {wishItems.map((p) => <ProductCard key={p.slug} product={p} />)}
                </div>
              )}
            </div>
          )}

          {tab === "addresses" && (
            <div>
              <h2 className="section-title text-sm">Saved Addresses</h2>
              <div className="mt-5 border border-foreground p-5 text-sm">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{user.name}</p>
                  <span className="bg-brand px-2 py-0.5 text-[10px] uppercase tracking-wider text-brand-foreground">Default</span>
                </div>
                <p className="mt-2 text-muted-foreground">
                  #3683/17 A 19, 4th Cross Road, Anjaneya Badavane, Davanagere — 577001
                </p>
                <p className="mt-1 text-muted-foreground">{user.phone || "6364441480"}</p>
                <div className="mt-3 flex gap-4 text-[12px] uppercase tracking-wider">
                  <button className="link-underline">Edit</button>
                  <button className="link-underline">Remove</button>
                </div>
              </div>
              <button className="mt-4 border border-foreground px-8 py-3 text-[12px] font-medium uppercase tracking-[0.15em]">
                Add New Address
              </button>
            </div>
          )}

          {tab === "profile" && (
            <div>
              <h2 className="section-title text-sm">Profile Details</h2>
              <div className="mt-5 grid max-w-md grid-cols-1 gap-3">
                <input className="border border-border px-3 py-2.5 text-sm outline-none focus:border-foreground" defaultValue={user.name} placeholder="Full Name" />
                <input className="border border-border px-3 py-2.5 text-sm outline-none focus:border-foreground" defaultValue={user.email} placeholder="Email" />
                <input className="border border-border px-3 py-2.5 text-sm outline-none focus:border-foreground" defaultValue={user.phone} placeholder="Phone" />
                <button className="bg-foreground py-3 text-[12px] font-medium uppercase tracking-[0.15em] text-background">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
