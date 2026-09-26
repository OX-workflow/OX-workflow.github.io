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
  const home = `/${locale}/`;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 220);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const labels = {
    contact: rtl ? "تماس / دمو" : "Contact / Demo",
    light: rtl ? "حالت روشن" : "Light mode",
    dark: rtl ? "حالت تاریک" : "Dark mode",
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="onyx-intro" aria-hidden="true">
        <div className="onyx-intro__field">
          <div className="onyx-intro__halo" />
          <div className="onyx-intro__ring">
            <img src="/assets/onyx-symbol.svg" alt="" width="512" height="512" decoding="async" />
          </div>
          <div className="onyx-intro__wordmark">ONYX</div>
          <div className="onyx-intro__signal" />
        </div>
      </div>

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
        <a className="onyx-global-mobile-nav__brand" href={home} onClick={closeMenu} aria-label={rtl ? "صفحه اصلی ONYX" : "ONYX home"}>
          <img src={theme === "dark" ? "/assets/onyx-horizontal-dark.svg" : "/assets/onyx-horizontal-light.svg"} alt="ONYX" width="1320" height="360" decoding="async" />
        </a>
        {navigation.map(([page, label]) => (
          <a key={page} href={`/${locale}/${page}/`} onClick={closeMenu} aria-current={activePage === page ? "page" : undefined}>
            {label[locale]}
          </a>
        ))}
        <a href={`/${locale}/contact/`} onClick={closeMenu} className="onyx-global-mobile-nav__contact">{labels.contact}</a>
      </nav>

      <div className="onyx-floating-controls" dir="ltr" aria-label={rtl ? "کنترل‌های شناور" : "Floating controls"}>
        <button
          className={`onyx-floating-controls__back-top ${scrolled ? "onyx-floating-controls__back-top--visible" : ""}`}
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={rtl ? "بازگشت به بالا" : "Back to top"}
          title={rtl ? "بازگشت به بالا" : "Back to top"}
          tabIndex={scrolled ? 0 : -1}
        >
          ↑
        </button>
        <div className="onyx-floating-controls__group" role="group" aria-label={rtl ? "زبان" : "Language"}>
          <a className={`onyx-floating-controls__language ${locale === "en" ? "is-active" : ""}`} href={activePage ? `/en/${activePage}/` : "/en/"} lang="en" aria-current={locale === "en" ? "page" : undefined}>EN</a>
          <a className={`onyx-floating-controls__language ${locale === "fa" ? "is-active" : ""}`} href={activePage ? `/fa/${activePage}/` : "/fa/"} lang="fa" dir="rtl" aria-current={locale === "fa" ? "page" : undefined}>فارسی</a>
        </div>
        <button
          className="onyx-floating-controls__theme"
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === "dark" ? labels.light : labels.dark}
          title={theme === "dark" ? labels.light : labels.dark}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
    </>
  );
}
