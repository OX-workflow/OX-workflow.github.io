import { ArrowLeft, ArrowRight, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Locale = "en" | "fa";
type Theme = "light" | "dark";

const copy = {
  en: {
    tag: "ONYX / ROADMAP",
    kicker: "PRODUCT DIRECTION",
    title: "BUILD THE SYSTEM. EXPAND THE OPERATING ENVELOPE.",
    intro: "The ONYX roadmap extends the same operating model from resilient local execution toward broader deployment, federation, and governed automation.",
    home: "Back to home",
    product: "Product",
    contact: "Contact",
    language: "فارسی",
    light: "Light mode",
    dark: "Dark mode",
    nowLabel: "01 / FOUNDATION",
    nowTitle: "The operational core",
    nowBody: "The current foundation centers on local-first execution, controlled synchronization, authority-aware workflows, durable operational state, evidence, auditability, and the application surfaces required to operate across disrupted connectivity.",
    nowItems: [
      ["LOCAL-FIRST", "Continue operating when connectivity is degraded or unavailable."],
      ["SYNCHRONIZATION", "Reconcile distributed state with explicit consistency and conflict rules."],
      ["AUTHORITY", "Keep identity, responsibility, and execution boundaries explicit."],
      ["OPERATIONAL STATE", "Maintain durable state, history, evidence, and verification."],
    ],
    nextLabel: "02 / EXPANSION",
    nextTitle: "Extend the deployment envelope",
    nextBody: "The next product expansion is about where and how ONYX can operate, not about changing its core operating model.",
    nextItems: [
      ["MOBILE", "Extend operational access to mobile clients where the deployment model requires it."],
      ["MULTI-REGION", "Support broader geographic distribution and regional operational deployment."],
      ["ENTERPRISE DEPLOYMENT", "Harden deployment patterns for larger organizations, environments, and operational boundaries."],
    ],
    horizonLabel: "03 / FEDERATION",
    horizonTitle: "Connect operational domains",
    horizonBody: "Longer-horizon work explores federation between operational domains and governed interfaces for automation. These are directional areas, not claims of shipped functionality.",
    horizonItems: [
      ["FEDERATED OPERATIONS", "Explore controlled interoperability between independently governed operational domains."],
      ["AGENT & PLUGIN INTERFACES", "Research governed automation interfaces that inherit identity, authorization, state, and audit boundaries."],
      ["POLICY-AWARE AUTOMATION", "Extend automation without allowing automation to silently acquire authority."],
    ],
    statusLabel: "04 / STATUS",
    statusTitle: "Read the roadmap by maturity.",
    statuses: [
      ["CURRENT", "Foundation capabilities and architecture that define the present ONYX operating model."],
      ["PLANNED", "Expansion areas that are part of the product direction but should not be represented as generally shipped."],
      ["RESEARCH", "Exploratory federation and automation directions requiring further architecture, security, and deployment validation."],
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
    language: "فارسی",
    light: "حالت روشن",
    dark: "حالت تاریک",
    nowLabel: "۰۱ / بنیاد",
    nowTitle: "هسته عملیاتی",
    nowBody: "بنیاد فعلی بر اجرای محلی‌محور، همگام‌سازی کنترل‌شده، جریان‌های کاری آگاه از اختیار، وضعیت عملیاتی پایدار، شواهد، ممیزی و سطوح کاربردی لازم برای کار در شرایط اختلال اتصال متمرکز است.",
    nowItems: [
      ["محلی‌محور", "ادامه عملیات هنگام کاهش کیفیت یا قطع اتصال."],
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
      ["عملیات فدره", "بررسی تعامل کنترل‌شده میان حوزه‌های عملیاتی مستقل و دارای حاکمیت."],
      ["رابط‌های عامل و افزونه", "تحقیق درباره رابط‌های خودکارسازی حاکمیت‌شده که هویت، مجوز، وضعیت و ممیزی را به ارث می‌برند."],
      ["POLICY-AWARE AUTOMATION", "گسترش خودکارسازی بدون اینکه خودکارسازی به‌صورت ضمنی اختیار پیدا کند."],
    ],
    statusLabel: "۰۴ / وضعیت",
    statusTitle: "نقشه راه را بر اساس بلوغ بخوانید.",
    statuses: [
      ["فعلی", "قابلیت‌ها و معماری بنیادی که مدل عملیاتی فعلی ONYX را تعریف می‌کنند."],
      ["برنامه‌ریزی‌شده", "حوزه‌های توسعه‌ای که در جهت‌گیری محصول هستند اما نباید به‌عنوان قابلیت عمومی عرضه‌شده معرفی شوند."],
      ["پژوهشی", "مسیرهای پژوهشی فدراسیون و خودکارسازی که به اعتبارسنجی بیشتر معماری، امنیت و استقرار نیاز دارند."],
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
