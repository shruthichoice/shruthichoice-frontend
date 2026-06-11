import { useState } from "react";
import { X } from "lucide-react";
import { useStore } from "@/context/store";

export function AuthModal() {
  const { authOpen, setAuthOpen, login } = useStore();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  if (!authOpen) return null;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      name: form.name || form.email.split("@")[0] || "Guest",
      email: form.email,
      phone: form.phone,
    });
  };

  const inputClass =
    "w-full border border-border px-3 py-2.5 text-sm outline-none focus:border-foreground";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50" onClick={() => setAuthOpen(false)} />
      <div className="relative w-full max-w-md border border-foreground bg-background p-8">
        <button
          onClick={() => setAuthOpen(false)}
          className="absolute right-4 top-4"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <h2 className="section-title text-sm">{mode === "login" ? "Login" : "Create Account"}</h2>

        <form onSubmit={submit} className="mt-6 space-y-3">
          {mode === "signup" && (
            <input className={inputClass} placeholder="Full Name" value={form.name} onChange={set("name")} required />
          )}
          <input
            className={inputClass}
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={set("email")}
            required
          />
          {mode === "signup" && (
            <input className={inputClass} placeholder="Phone" value={form.phone} onChange={set("phone")} />
          )}
          <input
            className={inputClass}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={set("password")}
            required
          />

          {mode === "login" && (
            <button type="button" className="link-underline text-xs text-muted-foreground">
              Forgot Password?
            </button>
          )}

          <button
            type="submit"
            className="w-full bg-foreground py-3 text-[12px] font-medium uppercase tracking-[0.15em] text-background"
          >
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> Or sign in with <span className="h-px flex-1 bg-border" />
        </div>

        <button
          onClick={() => login({ name: "Google User", email: "user@gmail.com" })}
          className="flex w-full items-center justify-center gap-2 border border-border py-2.5 text-sm hover:border-foreground"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z" />
            <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 010-4.2V7.06H2.18a11 11 0 000 9.88l3.66-2.84z" />
            <path fill="#EA4335" d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 002.18 7.06l3.66 2.84C6.71 7.3 9.14 4.75 12 4.75z" />
          </svg>
          Google
        </button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "login" ? "New to Shruthi's Choice?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="link-underline font-medium text-foreground"
          >
            {mode === "login" ? "Create Account" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
