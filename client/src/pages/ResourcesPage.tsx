import { ArrowLeft, ArrowRight, ExternalLink, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Locale = "en" | "fa";
type Theme = "light" | "dark";

const copy = {
  en: {
    tag: "ONYX / RESOURCES",
    kicker: "START HERE",
    title: "UNDERSTAND ONYX. THEN GO DEEPER.",
    intro:
      "A focused guide to the ONYX product, operating model, technical foundation, security posture, roadmap, and public engineering record.",
    product: "Product",
    architecture: "Architecture",
    security: "Security",
    roadmap: "Roadmap",
    contact: "Contact",
    language: "فارسی",
    light: "Light mode",
    dark: "Dark mode",
    home: "Back to home",
    sections: [
      {
        label: "01 / PRODUCT",
        title: "Start with the product and operating model.",
        body:
          "Start with the product surface for the operating model, local-first execution, synchronization, authority, deployment boundaries, and the distinction between documented capabilities and future direction.",
        items: [
          ["PRODUCT", "The platform, operating model, capabilities, and deployment surface.", "Open product page", "/en/product/"],
          ["SOLUTIONS", "Operational scenarios and environments where continuity, authority, and evidence matter.", "Open solutions", "/en/solutions/"],
          ["ROADMAP", "Current foundation, planned expansion, and research directions.", "Open roadmap", "/en/roadmap/"],
        ],
      },
      {
        label: "02 / SYSTEM",
        title: "Go deeper into the system.",
        body:
          "The architecture material explains how local clients, synchronization, authority, durable state, and infrastructure fit together. It is the technical bridge between the product thesis and implementation.",
        items: [
          ["ARCHITECTURE", "The ONYX system model from operational flow to technical implementation.", "Open architecture", "/en/architecture/"],
          ["SECURITY", "Identity, authorization, synchronization boundaries, auditability, deployment, and assurance limits.", "Open security", "/en/security/"],
          ["PUBLIC REPOSITORY", "The current public engineering and documentation surface of the ONYX project.", "Open GitHub", "https://github.com/SMozaff/Onyx-Framework"],
        ],
      },
      {
        label: "03 / ENGINEERING RECORD",
        title: "Verify the engineering record.",
        body:
          "The public repository is the source for implementation-level context. Use the repository documentation for architectural decisions, API material, development structure, tests, and deployment tooling.",
        items: [
          ["README", "Repository overview, architecture, development setup, testing, deployment, and documentation index.", "Read README", "https://github.com/SMozaff/Onyx-Framework/blob/main/README.md"],
          ["DECISIONS", "Architectural Decision Records and the project's technical decision history.", "Read decisions", "https://github.com/SMozaff/Onyx-Framework/blob/main/DECISIONS.md"],
          ["API DOCUMENTATION", "The public API documentation area referenced by the repository.", "Open API docs", "https://github.com/SMozaff/Onyx-Framework/tree/main/docs/api"],
        ],
      },
      {
        label: "04 / RELATED METHOD",
        title: "Explore the related methodology.",
        body:
          "BOUND is presented as a related methodological and system-design layer behind ONYX, not as a separate ONYX product surface.",
        items: [
          ["BOUND METHOD", "Boundary-oriented development methodology covering domains, responsibility boundaries, contracts, execution, and verification.", "Explore BOUND", "https://bound-method.github.io/"],
        ],
      },
    ],
    boundaryLabel: "05 / PUBLICATION BOUNDARY",
    boundaryTitle: "Public reference. Clear product boundary.",
    boundaryBody:
      "These resources are intended to explain the public product and engineering record. They do not imply that every repository artifact is a commercial deliverable, nor that future or research capabilities are generally shipped. ONYX's commercialization position treats the core product and intellectual property as proprietary.",
    finalLabel: "06 / NEXT",
    finalTitle: "Ready to discuss the operation?",
    finalBody:
      "Use the contact path for a substantive product or enterprise discussion grounded in your operating environment, connectivity, authority model, and deployment constraints.",
    demo: "Request a demonstration",
  },
  fa: {
    tag: "ONYX / منابع",
    kicker: "از اینجا شروع کنید",
    title: "ONYX را بشناسید؛ سپس عمیق‌تر شوید.",
    intro:
      "راهنمایی متمرکز برای شناخت محصول، مدل عملیاتی، بنیان فنی، وضعیت امنیتی، نقشه راه و رکورد مهندسی عمومی ONYX.",
    product: "محصول",
    architecture: "معماری",
    security: "امنیت",
    roadmap: "نقشه راه",
    contact: "تماس",
    language: "English",
    light: "حالت روشن",
    dark: "حالت تاریک",
    home: "بازگشت به خانه",
    sections: [
      {
        label: "۰۱ / محصول",
        title: "از محصول و مدل عملیاتی شروع کنید.",
        body:
          "از سطح محصول برای مدل عملیاتی، اجرای محلی‌محور، همگام‌سازی، اختیار، مرزهای استقرار و تفکیک قابلیت‌های مستندشده از جهت‌گیری آینده شروع کنید.",
        items: [
          ["PRODUCT", "پلتفرم، مدل عملیاتی، قابلیت‌ها و سطح استقرار.", "مشاهده محصول", "/fa/product/"],
          ["SOLUTIONS", "سناریوها و محیط‌های عملیاتی که تداوم، اختیار و شواهد در آن‌ها اهمیت دارد.", "مشاهده راهکارها", "/fa/solutions/"],
          ["ROADMAP", "بنیاد فعلی، توسعه برنامه‌ریزی‌شده و مسیرهای پژوهشی.", "مشاهده نقشه راه", "/fa/roadmap/"],
        ],
      },
      {
        label: "۰۲ / سامانه",
        title: "عمیق‌تر وارد سامانه شوید.",
        body:
          "مطالب معماری توضیح می‌دهند کلاینت‌های محلی، همگام‌سازی، اختیار، وضعیت پایدار و زیرساخت چگونه به هم متصل می‌شوند. این بخش پل میان محصول و پیاده‌سازی است.",
        items: [
          ["ARCHITECTURE", "مدل سامانه ONYX از جریان عملیاتی تا پیاده‌سازی فنی.", "مشاهده معماری", "/fa/architecture/"],
          ["SECURITY", "هویت، مجوزدهی، مرزهای همگام‌سازی، ممیزی، استقرار و حدود تضمین.", "مشاهده امنیت", "/fa/security/"],
          ["PUBLIC REPOSITORY", "سطح عمومی مهندسی و مستندسازی فعلی پروژه ONYX.", "مشاهده GitHub", "https://github.com/SMozaff/Onyx-Framework"],
        ],
      },
      {
        label: "۰۳ / رکورد مهندسی",
        title: "رکورد مهندسی را بررسی کنید.",
        body:
          "مخزن عمومی مرجع زمینه پیاده‌سازی است. مستندات مخزن برای تصمیم‌های معماری، API، ساختار توسعه، آزمون‌ها و ابزارهای استقرار استفاده می‌شوند.",
        items: [
          ["README", "مرور مخزن، معماری، راه‌اندازی توسعه، آزمون، استقرار و فهرست مستندات.", "مطالعه README", "https://github.com/SMozaff/Onyx-Framework/blob/main/README.md"],
          ["DECISIONS", "سوابق تصمیم‌های معماری و تاریخچه تصمیم‌های فنی پروژه.", "مطالعه تصمیم‌ها", "https://github.com/SMozaff/Onyx-Framework/blob/main/DECISIONS.md"],
          ["API DOCUMENTATION", "بخش مستندات API که در مخزن پروژه به آن ارجاع شده است.", "مشاهده مستندات API", "https://github.com/SMozaff/Onyx-Framework/tree/main/docs/api"],
        ],
      },
      {
        label: "۰۴ / روش مرتبط",
        title: "روش‌شناسی مرتبط را ببینید.",
        body:
          "BOUND به‌عنوان لایه روش‌شناختی و طراحی سیستم مرتبط با ONYX معرفی می‌شود، نه به‌عنوان یک سطح محصولی جداگانه از ONYX.",
        items: [
          ["BOUND METHOD", "روش توسعه مرزگرا برای حوزه‌ها، مرزهای مسئولیت، قراردادها، اجرا و راستی‌آزمایی.", "مشاهده BOUND", "https://bound-method.github.io/"],
        ],
      },
    ],
    boundaryLabel: "۰۵ / مرز انتشار",
    boundaryTitle: "مرجع عمومی. مرز روشن محصول.",
    boundaryBody:
      "این منابع برای توضیح محصول عمومی و رکورد مهندسی پروژه هستند. آن‌ها به معنی تجاری‌بودن همه اقلام مخزن یا عرضه عمومی قابلیت‌های آینده و پژوهشی نیستند. جایگاه تجاری ONYX، هسته محصول و مالکیت فکری آن را اختصاصی در نظر می‌گیرد.",
    finalLabel: "۰۶ / گام بعد",
    finalTitle: "آماده گفت‌وگو درباره عملیات هستید؟",
    finalBody:
      "برای گفت‌وگوی محصول یا سازمانی، مسیر تماس را با توضیح محیط عملیاتی، شرایط اتصال، مدل اختیار و محدودیت‌های استقرار خود استفاده کنید.",
    demo: "درخواست دمو",
  },
} as const;

export default function ResourcesPage({ locale }: { locale: Locale }) {
  const rtl = locale === "fa";
  const c = copy[locale];
  const [theme, setTheme] = useState<Theme>("dark");
  const href = (page: string) => page ? `/${locale}/${page}/` : `/${locale}/`;
  const Arrow = rtl ? ArrowRight : ArrowLeft;

  useEffect(() => {
    const stored = window.localStorage.getItem("onyx-theme") as Theme | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const next = stored === "dark" || stored === "light" ? stored : preferred;
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("onyx-theme", theme);
  }, [theme]);

  return (
    <main className={`resources-page resources-page--${theme}`} dir={rtl ? "rtl" : "ltr"}>
      <header className="resources-header">
        <div className="shell-content resources-header__inner">
          <a className="resources-logo" href={href("")} aria-label="ONYX">
            <img src={theme === "dark" ? "/assets/onyx-horizontal-light.svg" : "/assets/onyx-horizontal-dark.svg"} alt="ONYX" />
          </a>
          <nav>
            <a href={href("product")}>{c.product}</a>
            <a href={href("architecture")}>{c.architecture}</a>
            <a href={href("security")}>{c.security}</a>
          </nav>
          <div className="resources-tools">
            <a href={href("contact")}>{c.contact}</a>
            <a href={href("resources")} aria-current="page">RESOURCES</a>
            <button type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={theme === "dark" ? c.light : c.dark}>
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a className="resources-language" href={rtl ? "/en/resources/" : "/fa/resources/"}>{c.language}</a>
          </div>
        </div>
      </header>

      <section className="resources-hero">
        <div className="resources-hero__grid" aria-hidden="true" />
        <div className="shell-content resources-hero__inner">
          <div className="resources-kicker"><span />{c.tag}</div>
          <p className="resources-eyebrow">{c.kicker}</p>
          <h1>{c.title}</h1>
          <p className="resources-hero__intro">{c.intro}</p>
        </div>
      </section>

      {c.sections.map((section) => (
        <section className="resources-section" key={section.label}>
          <div className="shell-content">
            <div className="resources-two-col">
              <div>
                <span className="resources-label">{section.label}</span>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </div>
              <div className="resources-list">
                {section.items.map(([title, body, action, url]) => (
                  <article key={title}>
                    <div className="resources-item__meta"><span>{title}</span><ExternalLink size={14} /></div>
                    <p>{body}</p>
                    <a href={url} target={url.startsWith("http") ? "_blank" : undefined} rel={url.startsWith("http") ? "noreferrer" : undefined}>
                      {action}<Arrow size={14} />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="resources-boundary">
        <div className="shell-content resources-two-col">
          <div>
            <span className="resources-label">{c.boundaryLabel}</span>
            <h2>{c.boundaryTitle}</h2>
          </div>
          <p>{c.boundaryBody}</p>
        </div>
      </section>

      <section className="resources-final">
        <div className="shell-content resources-final__inner">
          <div>
            <span className="resources-label">{c.finalLabel}</span>
            <h2>{c.finalTitle}</h2>
            <p>{c.finalBody}</p>
          </div>
          <a className="resources-action" href={href("contact")}>{c.demo}</a>
        </div>
      </section>

      <footer className="resources-footer">
        <div className="shell-content resources-footer__inner">
          <a href={href("")}><Arrow size={15} />{c.home}</a>
          <span>ONYX / RESOURCES</span>
        </div>
      </footer>
    </main>
  );
}
