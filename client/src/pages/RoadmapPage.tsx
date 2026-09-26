import { ArrowLeft, ArrowRight, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Locale = "en" | "fa";
type Theme = "light" | "dark";

const copy = {
  en: {
    tag: "ONYX / ROADMAP",
    kicker: "PRODUCT DIRECTION",
    title: "IMPLEMENTED. PLANNED. RESEARCH.",
    intro: "The ONYX roadmap separates what is implemented today from planned expansion and longer-horizon research. Technical direction is not presented as shipped capability.",
    home: "Back to home",
    product: "Product",
    contact: "Contact",
    language: "فارسی",
    light: "Light mode",
    dark: "Dark mode",
    nowLabel: "01 / IMPLEMENTED",
    nowTitle: "The current technical foundation",
    nowBody: "The reviewed repositories contain a Rust workspace with domain, application, infrastructure, synchronization, transport, binary, and mobile-core crates, plus web, desktop, admin, and native Android application surfaces. The implementation also includes persistence, audit, observability, release, and deployment tooling.",
    nowItems: [
      ["RUST WORKSPACE", "Domain, application, infrastructure, synchronization, transport, binary, and mobile-core crates."],
      ["CRDT + SYNC", "Vector-clock causality, CRDT primitives, aggregate deltas, conflict records, and explicit resolution."],
      ["AUTHORITY", "Server-side and trusted-client checks constrain identity, client capability, lifecycle, and command execution."],
      ["STATE + EVIDENCE", "SQLite/Postgres persistence, audit structures, operational history, observability, and release evidence."],
    ],
    nextLabel: "02 / PLANNED",
    nextTitle: "Extend the deployment envelope",
    nextBody: "Planned work expands where and how ONYX can operate while preserving the same authority and state model.",
    nextItems: [
      ["MOBILE", "Extend operational access to mobile clients where the deployment model requires it."],
      ["MULTI-REGION", "Support broader geographic distribution and regional operational deployment."],
      ["ENTERPRISE DEPLOYMENT", "Harden deployment patterns for larger organizations, environments, and operational boundaries."],
    ],
    horizonLabel: "03 / RESEARCH",
    horizonTitle: "Explore federation and governed automation",
    horizonBody: "Longer-horizon work explores federation between independently governed domains and agent/plugin interfaces. These remain research directions requiring architecture, security, and deployment validation.",
    horizonItems: [
      ["FEDERATED OPERATIONS", "Explore controlled interoperability between independently governed operational domains."],
      ["AGENT & PLUGIN INTERFACES", "Research governed automation interfaces that inherit identity, authorization, state, and audit boundaries."],
      ["POLICY-AWARE AUTOMATION", "Extend automation without allowing automation to silently acquire authority."],
    ],
    statusLabel: "04 / STATUS",
    statusTitle: "Every item has a maturity boundary.",
    statuses: [
      ["IMPLEMENTED", "Repository-grounded capabilities and components present in the reviewed implementation."],
      ["PLANNED", "Defined product/engineering direction that is not presented as generally shipped."],
      ["RESEARCH", "Exploratory areas that require further architecture, security, and deployment validation before product claims."],
    ],
    ctaLabel: "05 / CONTINUE",
    ctaTitle: "Roadmap follows the operating model.",
    ctaBody: "Inspect the product and architecture pages for the system that the roadmap is extending.",
    architecture: "View architecture",
    back: "Back to home",
  },
  fa: {
    tag: "ONYX / نقشه راه",
    kicker: "جهت‌گیری محصول",
    title: "سامانه را بسازید. دامنه عملیاتی را گسترش دهید.",
    intro: "نقشه راه ONYX همان مدل عملیاتی را از اجرای محلی تاب‌آور به سمت استقرار گسترده‌تر، فدراسیون و خودکارسازی حاکمیت‌شده توسعه می‌دهد.",
    home: "بازگشت به خانه",
    product: "محصول",
    contact: "تماس",
    language: "English",
    light: "حالت روشن",
    dark: "حالت تاریک",
    nowLabel: "۰۱ / بنیاد",
    nowTitle: "هسته عملیاتی",
    nowBody: "بنیاد فعلی بر اجرای محلی‌محور، همگام‌سازی کنترل‌شده، جریان‌های کاری آگاه از اختیار، وضعیت عملیاتی پایدار، شواهد، ممیزی و سطوح کاربردی لازم برای کار در شرایط اختلال اتصال متمرکز است.",
    nowItems: [
      ["LOCAL-FIRST", "ادامه عملیات هنگام کاهش کیفیت یا قطع اتصال."],
      ["SYNCHRONIZATION", "تلفیق وضعیت توزیع‌شده با قواعد صریح سازگاری و تعارض."],
      ["AUTHORITY", "حفظ مرزهای روشن میان هویت، مسئولیت و اجرا."],
      ["OPERATIONAL STATE", "حفظ وضعیت، تاریخچه، شواهد و راستی‌آزمایی پایدار عملیاتی."],
    ],
    nextLabel: "۰۲ / گسترش",
    nextTitle: "گسترش دامنه استقرار",
    nextBody: "گام بعدی محصول درباره محل و شیوه اجرای ONYX است، نه تغییر مدل عملیاتی اصلی آن.",
    nextItems: [
      ["MOBILE", "گسترش دسترسی عملیاتی به کلاینت‌های موبایل در استقرارهای موردنیاز."],
      ["MULTI-REGION", "پشتیبانی از توزیع جغرافیایی گسترده‌تر و استقرار منطقه‌ای."],
      ["ENTERPRISE DEPLOYMENT", "تقویت الگوهای استقرار برای سازمان‌ها، محیط‌ها و مرزهای عملیاتی بزرگ‌تر."],
    ],
    horizonLabel: "۰۳ / فدراسیون",
    horizonTitle: "اتصال حوزه‌های عملیاتی",
    horizonBody: "کار بلندمدت‌تر فدراسیون میان حوزه‌های عملیاتی و رابط‌های حاکمیت‌شده برای خودکارسازی را بررسی می‌کند. این‌ها حوزه‌های جهت‌گیری هستند، نه ادعای قابلیت عرضه‌شده.",
    horizonItems: [
      ["FEDERATED OPERATIONS", "بررسی تعامل کنترل‌شده میان حوزه‌های عملیاتی مستقل و دارای حاکمیت."],
      ["AGENT & PLUGIN INTERFACES", "تحقیق درباره رابط‌های خودکارسازی حاکمیت‌شده که هویت، مجوز، وضعیت و ممیزی را به ارث می‌برند."],
      ["POLICY-AWARE AUTOMATION", "گسترش خودکارسازی بدون اینکه خودکارسازی به‌صورت ضمنی اختیار پیدا کند."],
    ],
    statusLabel: "۰۴ / وضعیت",
    statusTitle: "نقشه راه را بر اساس بلوغ بخوانید.",
    statuses: [
      ["CURRENT", "قابلیت‌ها و معماری بنیادی که مدل عملیاتی فعلی ONYX را تعریف می‌کنند."],
      ["PLANNED", "حوزه‌های توسعه‌ای که در جهت‌گیری محصول هستند اما نباید به‌عنوان قابلیت عمومی عرضه‌شده معرفی شوند."],
      ["RESEARCH", "مسیرهای پژوهشی فدراسیون و خودکارسازی که به اعتبارسنجی بیشتر معماری، امنیت و استقرار نیاز دارند."],
    ],
    ctaLabel: "۰۵ / ادامه",
    ctaTitle: "نقشه راه از مدل عملیاتی پیروی می‌کند.",
    ctaBody: "برای سامانه‌ای که این نقشه راه را توسعه می‌دهد، صفحات محصول و معماری را بررسی کنید.",
    architecture: "مشاهده معماری",
    back: "بازگشت به خانه",
  },
} as const;

export default function RoadmapPage({ locale }: { locale: Locale }) {
  const rtl = locale === "fa";
  const c = copy[locale];
  const [theme, setTheme] = useState<Theme>("dark");
  const Arrow = rtl ? ArrowRight : ArrowLeft;
  const href = (page: string) => page ? `/${locale}/${page}/` : `/${locale}/`;

  useEffect(() => {
    const stored = window.localStorage.getItem("onyx-theme") as Theme | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const next = stored === "dark" || stored === "light" ? stored : preferred;
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <main className={`roadmap-page roadmap-page--${theme}`} dir={rtl ? "rtl" : "ltr"}>
      <header className="roadmap-header">
        <div className="shell-content roadmap-header__inner">
          <a className="roadmap-logo" href={href("")} aria-label="ONYX">
            <img src={theme === "dark" ? "/assets/onyx-horizontal-light.svg" : "/assets/onyx-horizontal-dark.svg"} alt="ONYX" />
          </a>
          <nav>
            <a href={href("product")}>{c.product}</a>
            <a href={href("architecture")}>{c.architecture}</a>
          </nav>
          <div className="roadmap-tools">
            <a href={href("contact")}>{c.contact}</a>
            <a href={href("roadmap")} aria-current="page">ROADMAP</a>
            <button type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={theme === "dark" ? c.light : c.dark}>
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a className="roadmap-language" href={href("")}>{c.language}</a>
          </div>
        </div>
      </header>

      <section className="roadmap-hero">
        <div className="roadmap-hero__grid" aria-hidden="true" />
        <div className="shell-content">
          <div className="roadmap-kicker"><span />{c.tag}</div>
          <p className="roadmap-eyebrow">{c.kicker}</p>
          <h1>{c.title}</h1>
          <p className="roadmap-hero__intro">{c.intro}</p>
        </div>
      </section>

      <section className="roadmap-stage roadmap-stage--current">
        <div className="shell-content roadmap-two-col">
          <div>
            <span className="roadmap-label">{c.nowLabel}</span>
            <h2>{c.nowTitle}</h2>
            <p>{c.nowBody}</p>
          </div>
          <div className="roadmap-items">
            {c.nowItems.map(([title, body], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <div><b>{title}</b><p>{body}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="roadmap-stage roadmap-stage--next">
        <div className="shell-content">
          <div className="roadmap-heading">
            <span className="roadmap-label">{c.nextLabel}</span>
            <h2>{c.nextTitle}</h2>
            <p>{c.nextBody}</p>
          </div>
          <div className="roadmap-cards">
            {c.nextItems.map(([title, body], index) => (
              <article key={title}>
                <span>0{index + 1}</span><b>{title}</b><p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="roadmap-stage roadmap-stage--horizon">
        <div className="shell-content">
          <div className="roadmap-heading">
            <span className="roadmap-label">{c.horizonLabel}</span>
            <h2>{c.horizonTitle}</h2>
            <p>{c.horizonBody}</p>
          </div>
          <div className="roadmap-horizon">
            {c.horizonItems.map(([title, body], index) => (
              <article key={title}>
                <span>0{index + 1}</span><div><b>{title}</b><p>{body}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="roadmap-stage roadmap-stage--status">
        <div className="shell-content roadmap-two-col">
          <div><span className="roadmap-label">{c.statusLabel}</span><h2>{c.statusTitle}</h2></div>
          <div className="roadmap-statuses">
            {c.statuses.map(([title, body]) => <article key={title}><b>{title}</b><p>{body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="roadmap-final">
        <div className="shell-content roadmap-final__inner">
          <div><span className="roadmap-label">{c.ctaLabel}</span><h2>{c.ctaTitle}</h2><p>{c.ctaBody}</p></div>
          <a className="roadmap-action" href={href("architecture")}>{c.architecture}</a>
        </div>
      </section>

      <footer className="roadmap-footer">
        <div className="shell-content roadmap-footer__inner">
          <a href={href("")}><Arrow size={15} />{c.back}</a>
          <span>ONYX / ROADMAP</span>
        </div>
      </footer>
    </main>
  );
}
