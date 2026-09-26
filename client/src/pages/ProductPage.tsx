import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronRight, Moon, Sun } from "lucide-react";
import SiteHeader, { getInitialTheme } from "./SiteHeader";

type Locale = "en" | "fa";
type Theme = "light" | "dark";

const copy = {
  en: {
    nav: ["Product", "Solutions", "Architecture", "Security", "About", "Resources"],
    heroTag: "01 / Product",
    heroTitleA: "SEE THE WHOLE",
    heroTitleB: "OPERATION.",
    heroBody: "ONYX brings plans, people, decisions, work, evidence, and operational history together in one governed system for complex operations.",
    primary: "Explore architecture",
    secondary: "Request a demo",
    modelTag: "02 / Operating model",
    modelTitleA: "One operation.",
    modelTitleB: "One governed record.",
    modelBody: "Plan the work. Coordinate the people. Execute with authority. Keep the record.",
    cards: [
      ["01", "AUTHORITY", "Establish who can act.", "Identity, organizational boundaries, roles, delegation, and decision authority provide the control context for operational work."],
      ["02", "PLAN", "Turn objectives into controlled work.", "Missions, tasks, dependencies, timelines, capacity, and scenarios give an operation an explicit plan."],
      ["03", "EXECUTE", "Act against the operational state.", "Trusted operational clients work with missions, tasks, approvals, files, communication, and other governed domain state."],
      ["04", "COORDINATE", "Keep people and state aligned.", "Meetings, conversations, notifications, synchronization, and shared operational views connect distributed participants."],
      ["05", "VERIFY", "Make outcomes accountable.", "Approvals, verification, evidence, policy decisions, and review states distinguish completion from confirmed outcome."],
      ["06", "RECORD", "Preserve what happened.", "Operational history, evidence, audit, and durable state make decisions and changes reconstructable."],
      ["07", "RECOVER", "Return to controlled operation.", "Synchronization, conflict handling, replay/idempotency safeguards, and recovery-oriented state management support continuity after disruption."],
    ],
    flowTag: "03 / Operational lifecycle",
    flowTitleA: "Authority to",
    flowTitleB: "recovery.",
    flowBody: "The lifecycle is the product model. ONYX carries operational context from authorization through planning and execution to verification, durable record, and recovery.",
    languageTag: "04 / Brand operating language",
    languageTitleA: "Four visual forms.",
    languageTitleB: "One operational model.",
    languageBody: "The ONYX identity is also a product language. The ring, orbit, grid, and signal describe four structural concerns that recur throughout the system—not decorative metaphors added after the fact.",
    languageItems: [
      ["RING", "Authority / controlled execution", "The ring represents the controlled boundary around action: who may act, under which authority, and how execution remains governed."],
      ["ORBIT", "Coordination / synchronization", "The orbit represents movement between participants and replicas: coordination, synchronization, reconciliation, and continuity across distributed operations."],
      ["GRID", "Operational structure / system state", "The grid represents the underlying structure: durable state, lifecycle, relationships, boundaries, and the organized geometry of the operation."],
      ["SIGNAL", "Live awareness / events / evidence", "The signal represents what is happening and what can be observed: events, changes, evidence, verification, and operational awareness."],
    ],
    flow: ["Authority", "Plan", "Execute", "Coordinate", "Verify", "Record", "Recover"],
    capabilityTag: "04 / Capability groups",
    capabilityTitleA: "Everything the operation",
    capabilityTitleB: "needs in one place.",
    capabilities: [
      ["Authority & organization", "Organizations, users, roles, delegated authority, and hierarchy establish who may act and within which boundary."],
      ["Missions & work", "Mission lifecycle, tasks, priorities, owners, dependencies, timelines, milestones, and operational status structure execution."],
      ["Decisions & coordination", "Meetings, decisions, action items, conversations, notifications, and operational relationships keep participants aligned."],
      ["Evidence & verification", "Files, approvals, review states, verification, and attached evidence connect outcomes to the work that produced them."],
      ["Planning & forecasting", "Capacity, workload allocation, scenario modeling, forecasting, automation, and escalation support operational planning."],
      ["Synchronization & history", "Distributed state synchronization, conflict handling, durable event history, audit, policy, and recovery safeguards preserve operational continuity and traceability."],
    ],
    deploymentTag: "05 / Product surface",
    deploymentTitleA: "Different environments.",
    deploymentTitleB: "One operational model.",
    deploymentBody: "ONYX is designed to keep the same operational model across the people, systems, and deployment environments that support the work.",
    surfaces: [
      ["STAFF", "Desktop operations", "A locally composed staff surface for missions, tasks, approvals, messaging, files, notifications, and settings, with explicit synchronization state.", "Implemented with caveat"],
      ["WEB", "Remote operator", "An online browser surface for server-backed operational access; it does not currently provide local domain state or offline command execution.", "Implemented"],
      ["OBSERVER", "Constrained awareness", "A planned observer client class designed to provide awareness without silently granting operational authority.", "Planned"],
    ],
    statusTag: "06 / Capability status",
    statusTitleA: "Know what is",
    statusTitleB: "available today.",
    statusBody: "Product messaging must not collapse the current implementation, active development, and research direction into one promise. The labels below are deliberately conservative and follow the current application manifest and marketing handover.",
    status: [
      ["IMPLEMENTED", "Core operational model", "Organizational identity and authority, missions and work, approvals, communication, files, notifications, operational state, and governance-oriented controls are represented in the current application system."],
      ["IMPLEMENTED", "Operational client surfaces", "The current desktop staff application provides local operational state and synchronization composition; the browser application provides an online server-backed operational surface."],
      ["IN DEVELOPMENT", "Productization and hardening", "The broader platform continues to be translated into deployable, polished product components. Implementation details belong on the architecture and roadmap pages rather than being implied as finished product behavior."],
      ["PLANNED / RESEARCH", "Future observer and agent interfaces", "Observer-class access and future agent/plugin interaction are directions for the platform. They are not presented here as current autonomous or AI execution capabilities."],
    ],
    ctaTag: "07 / Next",
    ctaTitleA: "Go deeper when",
    ctaTitleB: "you need to.",
    ctaBody: "Move from the product lifecycle into the architecture, operational scenarios, or a direct conversation with the team.",
    architecture: "View architecture",
    solutions: "View solutions",
    contact: "Contact the team",
    themeLight: "Light mode",
    themeDark: "Dark mode",
    language: "فارسی",
    home: "Back to home",
  },
  fa: {
    nav: ["محصول", "راهکارها", "معماری", "امنیت", "درباره", "منابع"],
    heroTag: "۰۱ / محصول",
    heroTitleA: "بدون انتظار",
    heroTitleB: "عملیات کنید.",
    heroBody: "ONYX یک پلتفرم عملیات مأموریت‌محور و محلی‌محور برای تیم‌های توزیع‌شده است. کار در لبه ادامه پیدا می‌کند؛ هنگام امکان ارتباط، وضعیت همگام می‌شود و اختیار و تاریخچه عملیاتی صریح باقی می‌ماند.",
    primary: "بررسی معماری",
    secondary: "درخواست دمو",
    modelTag: "۰۲ / مدل عملیاتی",
    modelTitleA: "محلی.",
    modelTitleB: "همگام. کنترل‌شده.",
    modelBody: "محصول، اجرا را از اتصال جدا می‌کند. شبکه می‌تواند هماهنگی را بهتر کند، اما نباید پیش‌شرط هر اقدام عملیاتی باشد.",
    cards: [
      ["۰۱", "محلی",  "کار را همان‌جایی اجرا کنید که اتفاق می‌افتد.", "وضعیت عملیاتی هنگام افت یا قطع ارتباط برای اپراتور در دسترس می‌ماند."],
      ["۰۲", "همگام‌سازی",  "وقتی ارتباط ممکن شد، همگام کنید.", "با بازگشت ارتباط، تغییرات طبق قواعد مشخص سامانه هماهنگ و تلفیق می‌شوند."],
      ["۰۳", "کنترل",  "اختیار را صریح نگه دارید.", "مسئولیت، مسیر تصمیم و مالکیت عملیاتی هنگام انتقال کار میان افراد و سامانه‌ها قابل مشاهده می‌ماند."],
    ],
    flowTag: "۰۳ / جریان محصول",
    flowTitleA: "از میدان",
    flowTitleB: "تا مرکز عملیات.",
    flowBody: "ONYX اجرای توزیع‌شده را به دید عملیاتی متمرکز متصل می‌کند. مدل محصول ابتدا بر تداوم و سپس بر هماهنگی بنا شده است.",
    flow: ["وضعیت محلی", "کار / تصمیم", "ثبت نتیجه", "همگام‌سازی", "دید عملیاتی"],
    capabilityTag: "۰۴ / قابلیت‌های اصلی",
    capabilityTitleA: "پلتفرمی برای",
    capabilityTitleB: "تداوم عملیات.",
    capabilities: [
      ["اجرای محلی‌محور", "کار عملیاتی را در نقطه اقدام در دسترس نگه دارید، بدون وابستگی هر اقدام به شبکه زنده."],
      ["همگام‌سازی کنترل‌شده", "وضعیت توزیع‌شده را با یک مدل صریح برای همگام‌سازی و تلفیق دوباره یکپارچه کنید."],
      ["عملیات آگاه از اختیار", "مسئولیت و اختیار تصمیم را به‌عنوان بخشی از مدل عملیاتی نمایش دهید، نه یک سند جداگانه."],
      ["حافظه عملیاتی", "وضعیت و تاریخچه لازم برای درک آنچه رخ داده، آنچه راستی‌آزمایی شده و آنچه باقی مانده حفظ کنید."],
      ["استقرار توزیع‌شده", "از محیط‌هایی پشتیبانی کنید که تیم‌ها، دستگاه‌ها و لینک‌های ارتباطی از نظر جغرافیایی یا منطقی توزیع شده‌اند."],
      ["اجرای مبتنی بر راستی‌آزمایی", "اتمام و راستی‌آزمایی را به‌عنوان وضعیت‌های عملیاتی متمایز در نظر بگیرید تا نتیجه پاسخ‌گو باشد."],
    ],
    languageTag: "۰۴ / زبان عملیاتی",
    languageTitleA: "چهار فرم.",
    languageTitleB: "یک مدل عملیاتی.",
    languageBody: "زبان ONYX فقط یک عنصر بصری نیست؛ حلقه، مدار، شبکه و سیگنال چهار مفهوم تکرارشونده در مدل عملیاتی را بیان می‌کنند.",
    languageItems: [
      ["حلقه", "اختیار / اجرای کنترل‌شده", "مرز کنترل‌شده پیرامون اقدام را نشان می‌دهد: چه کسی، تحت چه اختیاری و چگونه اجرا می‌کند."],
      ["مدار", "هماهنگی / همگام‌سازی", "حرکت میان مشارکت‌کنندگان و کپی‌های توزیع‌شده را نشان می‌دهد: هماهنگی، تطبیق و تداوم."],
      ["شبکه", "ساختار عملیاتی / وضعیت", "ساختار پایدار عملیات، چرخه عمر، روابط، مرزها و وضعیت سازمان‌یافته را نشان می‌دهد."],
      ["سیگنال", "آگاهی زنده / رویدادها / شواهد", "آنچه رخ می‌دهد و قابل مشاهده است را نشان می‌دهد: رویدادها، تغییرات، شواهد و راستی‌آزمایی."],
    ],
    deploymentTag: "۰۵ / سطح محصول",
    deploymentTitleA: "ONYX کجا",
    deploymentTitleB: "با عملیات روبه‌رو می‌شود.",
    deploymentBody: "معماری محصول برای پوشش لبه اپراتور، هماهنگی تیم و نظارت عملیاتی طراحی شده است. اهداف استقرار قطعی باید از کارهای آینده پلتفرم جداگانه مستند شوند.",
    surfaces: [
      ["لبه", "سطح اپراتور", "اجرای محلی و دسترسی به وضعیت عملیاتی موردنیاز در نقطه کار.", "مدل فعلی"],
      ["همگام‌سازی", "لایه هماهنگی", "انتقال و تلفیق کنترل‌شده وضعیت توزیع‌شده هنگام امکان ارتباط.", "معماری"],
      ["عملیات", "مرکز عملیات", "دید مشترک برای هماهنگی، راستی‌آزمایی و کنترل عملیاتی.", "مدل فعلی"],
    ],
    statusTag: "۰۶ / وضعیت محصول",
    statusTitleA: "آنچه وجود دارد را",
    statusTitleB: "از برنامه آینده جدا کنید.",
    statusBody: "مستندات ONYX مدل عملیاتی را از تعهدات پیاده‌سازی جدا می‌کنند. این صفحه مدل محصول را توضیح می‌دهد؛ جزئیات فنی باید در معماری و نقشه راه بیایند.",
    status: [["فعلی", "مدل عملیاتی محصول", "تداوم محلی‌محور، همگام‌سازی کنترل‌شده، اختیار صریح و راستی‌آزمایی عملیاتی."], ["در حال توسعه", "پیاده‌سازی پلتفرم", "قابلیت‌هایی که به اجزای قابل استقرار محصول تبدیل می‌شوند."], ["برنامه‌ریزی‌شده", "رابط عامل آینده", "یک لایه هوش مصنوعی عامل‌محور / افزونه می‌تواند از مدل عملیاتی به‌عنوان رابطی تحت کنترل برای اجرا استفاده کند."]],
    ctaTag: "۰۷ / گام بعد",
    ctaTitleA: "سامانه را ببینید؛",
    ctaTitleB: "نه فقط محصول را.",
    ctaBody: "از مدل محصول به معماری، سناریوهای عملیاتی یا گفت‌وگوی مستقیم با تیم بروید.",
    architecture: "مشاهده معماری",
    solutions: "مشاهده راهکارها",
    contact: "تماس با تیم",
    themeLight: "حالت روشن",
    themeDark: "حالت تاریک",
    language: "فارسی",
    home: "بازگشت به خانه",
  },
} as const;

function href(locale: Locale, page: string) {
  return page ? `/${locale}/${page}/` : `/${locale}/`;
}

export default function ProductPage({ locale }: { locale: Locale }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("onyx-theme") as Theme | null;
    return stored === "dark" ? "dark" : "light";
  });
  const rtl = locale === "fa";
  const t = copy[locale];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = locale;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    window.localStorage.setItem("onyx-theme", theme);
  }, [locale, rtl, theme]);

  const toggle = () => setTheme((current) => current === "dark" ? "light" : "dark");

  return (
    <div className={`product-page product-page--${theme}`} dir={rtl ? "rtl" : "ltr"}>
      <SiteHeader locale={locale} theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} activePage="product" />

      <main>
        <section className="product-hero">
          <div className="product-hero__grid" aria-hidden="true" />
          <div className="shell-content product-hero__inner">
            <div className="product-kicker"><span />{t.heroTag}</div>
            <h1>{t.heroTitleA}<br /><em>{t.heroTitleB}</em></h1>
            <p>{t.heroBody}</p>
            <div className="product-actions">
              <a className="product-button product-button--primary" href={href(locale, "architecture")}>{t.primary}{rtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}</a>
              <a className="product-button" href={href(locale, "contact")}>{t.secondary}</a>
            </div>
            <a className="product-home" href={href(locale, "")}>{rtl ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}{t.home}</a>
          </div>
          <div className="product-hero__signal" aria-hidden="true"><span>LOCAL</span><i /><span>SYNC</span><i /><span>CONTROL</span></div>
        </section>

        <section className="product-section product-section--model">
          <div className="shell-content">
            <div className="product-heading"><div className="product-kicker"><span />{t.modelTag}</div><h2>{t.modelTitleA} <em>{t.modelTitleB}</em></h2><p>{t.modelBody}</p></div>
            <div className="product-model-grid">{t.cards.map(([n, label, title, body]) => <article key={n} className="product-model-card"><div><small>{n}</small><b>{label}</b></div><h3>{title}</h3><p>{body}</p><div className="product-card-line" /></article>)}</div>
          </div>
        </section>

        <section className="product-section product-section--flow">
          <div className="shell-content">
            <div className="product-flow-intro"><div className="product-kicker"><span />{t.flowTag}</div><h2>{t.flowTitleA}<br /><em>{t.flowTitleB}</em></h2><p>{t.flowBody}</p></div>
            <div className="product-flow">{t.flow.map((item, i) => <div className="product-flow__item" key={item}><span>{String(i + 1).padStart(2, "0")}</span><strong>{item}</strong>{i < t.flow.length - 1 && <i aria-hidden="true" />}</div>)}</div>
          </div>
        </section>

        <section className="product-section product-section--capabilities">
          <div className="shell-content">
            <div className="product-heading"><div className="product-kicker"><span />{t.capabilityTag}</div><h2>{t.capabilityTitleA}<br /><em>{t.capabilityTitleB}</em></h2></div>
            <div className="product-capability-grid">{t.capabilities.map(([title, body], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p><Check size={17} /></article>)}</div>
          </div>
        </section>

        <section className="product-section product-section--language">
          <div className="shell-content">
            <div className="product-heading"><div className="product-kicker"><span />{t.languageTag}</div><h2>{t.languageTitleA}<br /><em>{t.languageTitleB}</em></h2><p>{t.languageBody}</p></div>
            <div className="product-language-grid">{t.languageItems.map(([code, title, body]) => <article key={code}><div className="product-language__mark">{code}</div><h3>{title}</h3><p>{body}</p></article>)}</div>
          </div>
        </section>

        <section className="product-section product-section--deployment">
          <div className="shell-content">
            <div className="product-heading"><div className="product-kicker"><span />{t.deploymentTag}</div><h2>{t.deploymentTitleA}<br /><em>{t.deploymentTitleB}</em></h2><p>{t.deploymentBody}</p></div>
            <div className="product-surfaces">{t.surfaces.map(([code, title, body, status]) => <article key={code}><div className="product-surface__top"><span>{code}</span><small>{status}</small></div><h3>{title}</h3><p>{body}</p></article>)}</div>
          </div>
        </section>

        <section className="product-section product-section--status">
          <div className="shell-content">
            <div className="product-status-heading"><div className="product-kicker"><span />{t.statusTag}</div><h2>{t.statusTitleA}<br /><em>{t.statusTitleB}</em></h2><p>{t.statusBody}</p></div>
            <div className="product-status-list">{t.status.map(([label, title, body]) => <article key={label}><span>{label}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
          </div>
        </section>

        <section className="product-final">
          <div className="shell-content">
            <div className="product-kicker"><span />{t.ctaTag}</div>
            <h2>{t.ctaTitleA}<br /><em>{t.ctaTitleB}</em></h2>
            <p>{t.ctaBody}</p>
            <div className="product-actions">
              <a className="product-button product-button--primary" href={href(locale, "architecture")}>{t.architecture}</a>
              <a className="product-button" href={href(locale, "solutions")}>{t.solutions}</a>
              <a className="product-button" href={href(locale, "contact")}>{t.contact}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="product-footer"><div className="shell-content"><img src={theme === "dark" ? "/assets/onyx-horizontal-dark.svg" : "/assets/onyx-horizontal-light.svg"} alt="ONYX" /><span>© {new Date().getFullYear()} ONYX · <a href="https://smozaff.github.io/" target="_blank" rel="noreferrer">Soheil Mozaffari</a> · <a href="https://bound-method.github.io/" target="_blank" rel="noreferrer">BOUND Method</a></span></div></footer>
    </div>
  );
}
