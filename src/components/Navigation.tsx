import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import logo from "@/assets/raevd-logo.png";

const links = [
  { href: "#manifesto", label: "Manifesto" },
  { href: "#matrix", label: "Matrix" },
  { href: "#proof", label: "Proof" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 backdrop-blur-sm md:px-6 md:py-5 lg:grid-12 lg:px-8 lg:py-6"
    >
      <div className="lg:col-span-2">
        <a href="#" className="inline-flex items-center gap-2">
          <img src={logo} alt="RAEVD" className="h-6 w-auto md:h-7" />
        </a>
      </div>
      <div className="hidden lg:col-span-8 lg:flex lg:items-center lg:justify-center lg:gap-12">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="font-mono-label text-brand/70 transition-colors hover:text-brand"
          >
            {l.label}
          </a>
        ))}
      </div>
      <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:gap-6">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="font-mono-label text-brand/70 transition-colors hover:text-brand"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
        <a href="#portal" className="font-mono-label text-brand">
          Connect →
        </a>
      </div>

      {/* Mobile controls */}
      <div className="flex items-center gap-4 lg:hidden">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="font-mono-label text-brand/70 transition-colors hover:text-brand"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.5 text-brand"
        >
          <span
            className={`block h-px w-6 bg-current transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-current transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 right-0 border-t border-border bg-background/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-6 px-6 py-8">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-mono-label text-brand/70 transition-colors hover:text-brand"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#portal"
                onClick={() => setOpen(false)}
                className="font-mono-label text-brand"
              >
                Connect →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
