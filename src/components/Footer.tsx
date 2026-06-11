import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { Logo } from "./Navbar";

const EXPLORE = [
  { label: "Sarees", to: "/sarees" },
  { label: "Kurthas", to: "/kurthas" },
  { label: "3-Piece Sets", to: "/3-piece-sets" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Sale", to: "/sale" },
  { label: "About Us", to: "/about" },
];

const HELP = [
  "Track Order",
  "Contact Us",
  "Returns & Exchange",
  "Size Guide",
  "FAQ",
];

export function Footer() {
  return (
    <footer className="mt-20 bg-foreground text-background">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-3 text-[13px] text-background/70">
            Fine Apparel and Curated Pieces
          </p>
          <a
            href="https://www.instagram.com/shruthis_choice"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-[13px] text-background/80 hover:text-background"
          >
            <Instagram className="h-4 w-4" strokeWidth={1.5} /> @shruthis_choice
          </a>
        </div>

        <div>
          <h3 className="section-title text-xs text-background">Explore</h3>
          <ul className="mt-4 space-y-2.5">
            {EXPLORE.map((e) => (
              <li key={e.label}>
                <Link to={e.to} className="text-[13px] text-background/70 hover:text-background">
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="section-title text-xs text-background">Help</h3>
          <ul className="mt-4 space-y-2.5">
            {HELP.map((h) => (
              <li key={h}>
                <span className="cursor-pointer text-[13px] text-background/70 hover:text-background">
                  {h}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="section-title text-xs text-background">Contact Us</h3>
          <ul className="mt-4 space-y-2.5 text-[13px] text-background/70">
            <li>
              <a href="tel:6364441480" className="hover:text-background">6364441480</a>
            </li>
            <li>
              <a href="mailto:shruthischoice2023@gmail.com" className="hover:text-background break-all">
                shruthischoice2023@gmail.com
              </a>
            </li>
            <li>
              #3683/17 A 19, 4th Cross Road, Anjaneya Badavane, Davanagere
            </li>
            <li>Mon–Sat 10 AM – 9 PM</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/15">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-2 px-6 py-5 text-[12px] text-background/60 sm:flex-row">
          <p>© 2024 Shruthi's Choice. All Rights Reserved.</p>
          <div className="flex gap-5">
            <span className="hover:text-background">Privacy Policy</span>
            <span className="hover:text-background">Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
