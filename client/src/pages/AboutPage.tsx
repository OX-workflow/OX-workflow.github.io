import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import SiteHeader, { getInitialTheme } from "./SiteHeader";
import { useEffect, useState } from "react";

type Locale = "en" | "fa";
type Theme = "light" | "dark";

const copy = {
  en: {
    tag: "ONYX / ABOUT THE SYSTEM",
    eyebrow: "WHO IS BUILDING ONYX — AND WHY",
    title: "Operations continue. Accountability remains.",
    intro:
      "ONYX is a Mission Operations Platform for organizations that need controlled execution, clear authority, durable evidence, and operational continuity.",
    missionLabel: "01 / MISSION",
    missionTitle: "Make the operation itself the system of record.",
    missionBody:
      "ONYX connects authority, missions, decisions, actions, approvals, evidence, policy, synchronization, and operational history in one governed environment. The objective is not to add another task surface; it is to make consequential work structured, inspectable, and recoverable.",
    originLabel: "02 / ORIGIN",
    originTitle: "From execution framework to mission operations platform.",
    originBody:
      "The repository began from an interface-first execution framework and has evolved into a broader application system spanning operational clients, authority, mission lifecycle, coordination, evidence, synchronization, policy, audit, and governance. The current product direction reflects that broader system.",
    teamLabel: "03 / TEAM",
    teamTitle: "Systems engineering first.",
    teamBody:
      "The public project record identifies Soheil Mozaffari as the software engineer and systems architect behind the ONYX work. The engineering approach favors explicit contracts, deterministic behavior, durable state, authority-aware execution, and verification over opaque convenience.",
    philosophyLabel: "04 / ENGINEERING PHILOSOPHY",
    philosophyTitle: "Explicit boundaries. Durable state. Governed execution.",
    philosophyItems: [
      ["Authority", "Awareness must never silently become authority."],
      ["State", "Important operational state must remain durable and inspectable."],
      ["Execution", "Actions are constrained by identity, client capability, lifecycle, and authority."],
      ["Evidence", "Decisions and outcomes should remain connected to the history that explains them."],
      ["Resilience", "Synchronization and recovery are system properties, not afterthoughts."],
    ],
    boundLabel: "05 / BOUND / LINEAGE",
    boundTitle: "BOUND informs the design. ONYX implements the system.",
    boundBody:
      "BOUND is part of the intellectual lineage behind ONYX: it contributes a way of thinking about context, boundaries, authority, execution, and system structure. ONYX takes those design concerns into an implemented mission-operations system with concrete identities, missions, work, decisions, evidence, policy, synchronization, audit, and recovery. BOUND explains a way of structuring the problem; ONYX is the product that implements an operational model.",
    boundCta: "Explore BOUND Method",
    lineageLabel: "06 / DESIGN LINEAGE",
    lineageTitle: "The relationship is architectural, not product-level.",
    lineageBody: "BOUND should be understood as an intellectual and methodological influence on how the system is structured. ONYX does not require users to learn BOUND in order to use the platform, and BOUND is not a hidden feature set inside the product.",
    lineageRows: [["BOUND CONTRIBUTES","System-design thinking","A disciplined way to reason about context, boundaries, authority, and how operational concerns should be made explicit."],["ONYX IMPLEMENTS","Operational system","Concrete product behavior: organizations, authority, missions, work, decisions, evidence, policy, synchronization, audit, and recovery."],["THE BOUNDARY","Product reality","ONYX is evaluated as software: its contracts, state, commands, events, controls, interfaces, and operational behavior—not by methodology alone."]],
    communityLabel: "07 / OPEN-SOURCE & COMMUNITY",
    communityTitle: "Public engineering surface. Proprietary core.",
    communityBody:
      "The public repository provides an engineering and documentation surface for the project. The commercialization plan states that ONYX source code and core intellectual property remain proprietary. External contributions therefore require an explicit legal mechanism rather than assuming that a pull request transfers rights.",
    contactLabel: "08 / CONTACT",
    contactTitle: "Talk to the team.",
    contactBody:
      "For product, engineering, enterprise, or collaboration enquiries, contact the project directly.",
    email: "Soheil.Mozaffari@gmail.com",
    back: "Back to home",
    contact: "Contact ONYX",
    product: "Explore product",
  },
  fa: {
    tag: "ONYX / درباره سامانه",
    eyebrow: "چه کسی ONYX را می‌سازد — و چرا",
    title: "عملیات ادامه پیدا می‌کند. پاسخ‌گویی باقی می‌ماند.",
    intro:
      "ONYX یک پلتفرم عملیات مأموریت‌محور برای سازمان‌هایی است که به اجرای کنترل‌شده، اختیار روشن، شواهد پایدار و تداوم عملیات نیاز دارند.",
    missionLabel: "۰۱ / مأموریت",
    missionTitle: "خود عملیات را به مرجع اصلی سیستم تبدیل کنید.",
    missionBody:
      "ONYX اختیار، مأموریت‌ها، تصمیم‌ها، اقدامات، تأییدها، شواهد، سیاست، همگام‌سازی و تاریخچه عملیاتی را در یک محیط حاکمیتی به هم متصل می‌کند. هدف افزودن یک سطح دیگر برای مدیریت کار نیست؛ هدف این است که کارهای مهم ساختاریافته، قابل بررسی و قابل بازیابی باشند.",
    originLabel: "۰۲ / خاستگاه",
    originTitle: "از چارچوب اجرا تا پلتفرم عملیات مأموریت‌محور.",
    originBody:
      "مخزن ONYX از یک چارچوب اجرای interface-first آغاز شد و به یک سامانه کاربردی گسترده‌تر تبدیل شده است که کلاینت‌های عملیاتی، اختیار، چرخه مأموریت، هماهنگی، شواهد، همگام‌سازی، سیاست، ممیزی و حاکمیت را دربر می‌گیرد. جهت‌گیری فعلی محصول بازتاب همین سامانه گسترده‌تر است.",
    teamLabel: "۰۳ / تیم",
    teamTitle: "مهندسی سیستم در مرکز.",
    teamBody:
      "رکورد عمومی پروژه، Soheil Mozaffari را به‌عنوان مهندس نرم‌افزار و معمار سیستم‌های ONYX معرفی می‌کند. رویکرد مهندسی بر قراردادهای صریح، رفتار قطعی، وضعیت پایدار، اجرای آگاه از اختیار و راستی‌آزمایی استوار است.",
    philosophyLabel: "۰۴ / فلسفه مهندسی",
    philosophyTitle: "مرزهای صریح. وضعیت پایدار. اجرای حاکمیت‌شده.",
    philosophyItems: [
      ["اختیار", "آگاهی نباید بدون کنترل به اختیار تبدیل شود."],
      ["وضعیت", "وضعیت مهم عملیاتی باید پایدار و قابل بررسی باقی بماند."],
      ["اجرا", "اقدامات با هویت، قابلیت کلاینت، چرخه عمر و اختیار محدود می‌شوند."],
      ["شواهد", "تصمیم‌ها و نتایج باید به تاریخچه‌ای که آن‌ها را توضیح می‌دهد متصل بمانند."],
      ["تاب‌آوری", "همگام‌سازی و بازیابی باید ویژگی‌های خود سامانه باشند، نه قابلیت‌های جانبی."],
    ],
    boundLabel: "۰۵ / BOUND",
    boundTitle: "یک لایه روش‌شناختی در پشت پلتفرم.",
    boundBody:
      "برنامه وب‌سایت، BOUND Method / BOUND Context را به‌عنوان لایه روش‌شناختی و طراحی سیستم در پشت ONYX به این پلتفرم متصل می‌کند. بنابراین BOUND به‌عنوان روش مهندسی مرتبط معرفی می‌شود، نه یک سطح محصولی جداگانه از ONYX.",
    boundCta: "مشاهده BOUND Method",
    communityLabel: "۰۶ / متن‌باز و جامعه",
    communityTitle: "سطح مهندسی عمومی. هسته اختصاصی.",
    communityBody:
      "مخزن عمومی بخشی از سطح مهندسی و مستندسازی پروژه است. برنامه تجاری‌سازی تصریح می‌کند که کد منبع و مالکیت فکری هسته ONYX اختصاصی باقی می‌ماند. بنابراین مشارکت خارجی باید بر اساس سازوکار حقوقی صریح انجام شود.",
    contactLabel: "۰۷ / تماس",
    contactTitle: "با تیم در ارتباط باشید.",
    contactBody:
      "برای پرسش‌های محصول، مهندسی، سازمانی یا همکاری، مستقیماً با پروژه در ارتباط باشید.",
    email: "Soheil.Mozaffari@gmail.com",
    back: "بازگشت به صفحه اصلی",
    contact: "تماس با ONYX",
    product: "مشاهده محصول",
  },
} as const;

export default function AboutPage({ locale }: { locale: Locale }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const rtl = locale === "fa";
  const c = copy[locale];
  const Arrow = rtl ? ArrowRight : ArrowLeft;
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = locale;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    window.localStorage.setItem("onyx-theme", theme);
  }, [theme, locale, rtl]);
  const href = (page: string) => `/${locale}/${page}/`;

  return (
    <main className={`about-page about-page--${theme}`} dir={rtl ? "rtl" : "ltr"}>
      <SiteHeader locale={locale} theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} activePage="about" />

      <section className="about-hero">
        <div className="about-hero__grid" aria-hidden="true" />
        <div className="shell-content about-hero__content">
          <div className="signal-tag">
            <span className="signal-tag__node" />
            <span>{c.tag}</span>
          </div>
          <p className="about-kicker">{c.eyebrow}</p>
          <h1>{c.title}</h1>
          <p className="about-hero__intro">{c.intro}</p>
        </div>
      </section>

      <section className="about-section about-section--mission">
        <div className="shell-content about-two-col">
          <div>
            <span className="about-label">{c.missionLabel}</span>
            <h2>{c.missionTitle}</h2>
          </div>
          <p>{c.missionBody}</p>
        </div>
      </section>

      <section className="about-section about-section--origin">
        <div className="shell-content about-two-col">
          <div>
            <span className="about-label">{c.originLabel}</span>
            <h2>{c.originTitle}</h2>
          </div>
          <p>{c.originBody}</p>
        </div>
      </section>

      <section className="about-section about-section--team">
        <div className="shell-content">
          <div className="about-section__heading">
            <span className="about-label">{c.teamLabel}</span>
            <h2>{c.teamTitle}</h2>
          </div>
          <div className="about-team-card">
            <div className="about-team-card__index">ONYX / 001</div>
            <div>
              <p className="about-team-card__name">Soheil Mozaffari</p>
              <p className="about-team-card__role">Software Engineer · Systems Architect</p>
              <p>{c.teamBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section about-section--philosophy">
        <div className="shell-content">
          <div className="about-section__heading">
            <span className="about-label">{c.philosophyLabel}</span>
            <h2>{c.philosophyTitle}</h2>
          </div>
          <div className="about-philosophy">
            {c.philosophyItems.map(([title, body], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-section--bound">
        <div className="shell-content about-two-col">
          <div>
            <span className="about-label">{c.boundLabel}</span>
            <h2>{c.boundTitle}</h2>
          </div>
          <div>
            <p>{c.boundBody}</p>
            <a className="arrow-action arrow-action--solid about-bound-link" href="https://bound-method.github.io/" target="_blank" rel="noreferrer">
              <span>{c.boundCta}</span>
              <ExternalLink size={14} strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </section>

      {locale === "en" && <section className="about-section about-section--lineage"><div className="shell-content"><div className="about-section__heading"><span className="about-label">{c.lineageLabel}</span><h2>{c.lineageTitle}</h2><p>{c.lineageBody}</p></div><div className="about-lineage">{c.lineageRows.map(([label,title,body]) => <article key={label}><span>{label}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></div></section>}

      <section className="about-section about-section--community">
        <div className="shell-content about-two-col">
          <div>
            <span className="about-label">{c.communityLabel}</span>
            <h2>{c.communityTitle}</h2>
          </div>
          <p>{c.communityBody}</p>
        </div>
      </section>

      <section className="about-final">
        <div className="shell-content about-final__inner">
          <div>
            <span className="about-label">{c.contactLabel}</span>
            <h2>{c.contactTitle}</h2>
            <p>{c.contactBody}</p>
          </div>
          <a className="about-email" href={`mailto:${c.email}`}>{c.email}</a>
        </div>
      </section>

      <footer className="about-footer">
        <div className="shell-content about-footer__inner">
          <a className="arrow-action" href={href("")}>
            <Arrow size={15} strokeWidth={1.8} />
            <span>{c.back}</span>
          </a>
          <span>ONYX / {locale === "fa" ? "درباره" : "ABOUT"}</span>
        </div>
      </footer>
    </main>
  );
}
