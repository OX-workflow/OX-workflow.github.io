import { ChevronRight, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

type Locale = "en" | "fa";
export type Theme = "light" | "dark";

const navigation = [
  ["product", { en: "Product", fa: "محصول" }],
  ["solutions", { en: "Solutions", fa: "راهکارها" }],
  ["architecture", { en: "Architecture", fa: "معماری" }],
  ["security", { en: "Security", fa: "امنیت" }],
  ["about", { en: "About", fa: "درباره" }],
  ["resources", { en: "Resources", fa: "منابع" }],
] as const;

export function getInitialTheme(): Theme {
  if (typeof document !== "undefined") {
    const preset = document.documentElement.dataset.theme;
    if (preset === "dark" || preset === "light") return preset;
  }
  if (typeof window === "undefined") return "dark";
  try {
    const stored = window.localStorage.getItem("onyx-theme");
    if (stored === "dark" || stored === "light") return stored;
  } catch {}
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function SiteHeader({
  locale,
  theme,
  onToggleTheme,
  activePage,
}: {
  locale: Locale;
  theme: Theme;
  onToggleTheme: () => void;
  activePage?: string;
}) {
  const rtl = locale === "fa";
  const [menuOpen, setMenuOpen] = useState(false);
  const home = `/${locale}/`;

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const labels = {
    home: rtl ? "خانه" : "Home",
    language: rtl ? "English" : "فارسی",
    contact: rtl ? "تماس / دمو" : "Contact / Demo",
    light: rtl ? "حالت روشن" : "Light mode",
    dark: rtl ? "حالت تاریک" : "Dark mode",
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="onyx-global-header" dir="ltr">
      <div className="onyx-global-header__inner">
        <a className="onyx-global-header__logo" href={home} aria-label={rtl ? "صفحه اصلی ONYX" : "ONYX home"}>
          <img
            src={theme === "dark" ? "/assets/onyx-horizontal-dark.svg" : "/assets/onyx-horizontal-light.svg"}
            alt="ONYX"
            width="1320"
            height="360"
            decoding="async"
          />
        </a>

        <nav className="onyx-global-header__nav" aria-label={rtl ? "پیمایش اصلی" : "Primary navigation"}>
          {navigation.map(([page, label]) => (
            <a key={page} href={`/${locale}/${page}/`} aria-current={activePage === page ? "page" : undefined}>
              {label[locale]}
            </a>
          ))}
        </nav>

        <div className="onyx-global-header__tools">
          <a className="onyx-global-header__home" href={home} aria-current={activePage === undefined ? "page" : undefined}>
            {labels.home}
          </a>
          <a className="onyx-global-header__language" href={`/${locale === "en" ? "fa" : "en"}/`}>
            {labels.language}
          </a>
          <button
            className="onyx-global-header__theme"
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? labels.light : labels.dark}
            title={theme === "dark" ? labels.light : labels.dark}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a className="onyx-global-header__contact" href={`/${locale}/contact/`}>
            {labels.contact}
            <ChevronRight size={14} />
          </a>
        </div>

        <button
          className="onyx-global-header__menu"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="onyx-global-mobile-nav"
          aria-label={rtl ? "باز و بسته کردن منو" : "Toggle navigation"}
        >
          {menuOpen ? <X size={20} /> : <Menu size={21} />}
        </button>
      </div>

      <nav id="onyx-global-mobile-nav" className={`onyx-global-mobile-nav ${menuOpen ? "onyx-global-mobile-nav--open" : ""}`} aria-hidden={!menuOpen}>
        <a href={home} onClick={closeMenu}>{labels.home}</a>
        {navigation.map(([page, label]) => (
          <a key={page} href={`/${locale}/${page}/`} onClick={closeMenu} aria-current={activePage === page ? "page" : undefined}>
            {label[locale]}
          </a>
        ))}
        <a href={`/${locale}/contact/`} onClick={closeMenu} className="onyx-global-mobile-nav__contact">{labels.contact}</a>
        <a href={`/${locale === "en" ? "fa" : "en"}/`} onClick={closeMenu}>{labels.language}</a>
        <button type="button" onClick={onToggleTheme} className="onyx-global-mobile-nav__theme">
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          <span>{theme === "dark" ? labels.light : labels.dark}</span>
        </button>
      </nav>
    </header>
  );
}
