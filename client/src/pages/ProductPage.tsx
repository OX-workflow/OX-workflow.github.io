import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronRight, Moon, Sun } from "lucide-react";
import SiteHeader, { getInitialTheme } from "./SiteHeader";

type Locale = "en" | "fa";
type Theme = "light" | "dark";

const copy = {
  en: {
    nav: ["Product", "Solutions", "Architecture", "Security", "About", "Resources"],
    heroTag: "01 / Product",
    heroTitleA: "THE MISSION",
    heroTitleB: "OPERATIONS PLATFORM.",
    heroBody: "ONYX connects authority, planning, execution, coordination, verification, records, and recovery into one governed operational system. It is designed for complex work where the operation must remain understandable, accountable, and recoverable.",
    primary: "Explore architecture",
    secondary: "Request a demo",
    modelTag: "02 / Operating model",
    modelTitleA: "One operation.",
    modelTitleB: "One governed record.",
    modelBody: "ONYX is organized around the operational lifecycle rather than a collection of disconnected tools. Each stage carries its context forward so people can understand what is authorized, what is planned, what happened, and what must happen next.",
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
    flow: ["Authority", "Plan", "Execute", "Coordinate", "Verify", "Record", "Recover"],
    capabilityTag: "04 / Capability groups",
    capabilityTitleA: "The platform follows",
    capabilityTitleB: "the work, not the tools.",
    capabilities: [
      ["Authority & organization", "Organizations, users, roles, delegated authority, and hierarchy establish who may act and within which boundary."],
      ["Missions & work", "Mission lifecycle, tasks, priorities, owners, dependencies, timelines, milestones, and operational status structure execution."],
      ["Decisions & coordination", "Meetings, decisions, action items, conversations, notifications, and operational relationships keep participants aligned."],
      ["Evidence & verification", "Files, approvals, review states, verification, and attached evidence connect outcomes to the work that produced them."],
      ["Planning & forecasting", "Capacity, workload allocation, scenario modeling, forecasting, automation, and escalation support operational planning."],
      ["Synchronization & history", "Distributed state synchronization, conflict handling, durable event history, audit, policy, and recovery safeguards preserve operational continuity and traceability."],
    ],
    deploymentTag: "05 / Product surface",
    deploymentTitleA: "Different clients.",
    deploymentTitleB: "One operational model.",
    deploymentBody: "ONYX is a system of operational applications. The current repository includes a staff desktop surface with local replica and synchronization composition, plus a browser client that operates online against the server. Client capabilities are intentionally different according to trust and authority.",
    surfaces: [
      ["STAFF", "Desktop operations", "A locally composed staff surface for missions, tasks, approvals, messaging, files, notifications, and settings, with explicit synchronization state.", "Implemented with caveat"],
      ["WEB", "Remote operator", "An online browser surface for server-backed operational access; it does not currently provide local domain state or offline command execution.", "Implemented"],
      ["OBSERVER", "Constrained awareness", "A planned observer client class designed to provide awareness without silently granting operational authority.", "Planned"],
    ],
    statusTag: "06 / Capability status",
    statusTitleA: "Know what is",
    statusTitleB: "real, developing, or future.",
    statusBody: "Product messaging must not collapse the current implementation, active development, and research direction into one promise. The labels below are deliberately conservative and follow the current application manifest and marketing handover.",
    status: [
      ["IMPLEMENTED", "Core operational model", "Organizational identity and authority, missions and work, approvals, communication, files, notifications, operational state, and governance-oriented controls are represented in the current application system."],
      ["IMPLEMENTED", "Operational client surfaces", "The current desktop staff application provides local operational state and synchronization composition; the browser application provides an online server-backed operational surface."],
      ["IN DEVELOPMENT", "Productization and hardening", "The broader platform continues to be translated into deployable, polished product components. Implementation details belong on the architecture and roadmap pages rather than being implied as finished product behavior."],
      ["PLANNED / RESEARCH", "Future observer and agent interfaces", "Observer-class access and future agent/plugin interaction are directions for the platform. They are not presented here as current autonomous or AI execution capabilities."],
    ],
    ctaTag: "07 / Next",
    ctaTitleA: "See the system",
    ctaTitleB: "behind the product.",
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
    heroTitleA: "پلتفرم عملیات",
    heroTitleB: "مأموریت‌محور.",
    heroBody: "ONYX اختیار، برنامه‌ریزی، اجرا، هماهنگی، راستی‌آزمایی، ثبت و بازیابی را در یک سامانه عملیاتی حاکمیت‌شده به هم متصل می‌کند؛ برای کارهای پیچیده‌ای که باید قابل‌فهم، پاسخ‌گو و قابل‌بازیابی باقی بمانند.",
    primary: "بررسی معماری",
    secondary: "درخواست دمو",
    modelTag: "۰۲ / مدل عملیاتی",
    modelTitleA: "یک عملیات.",
    modelTitleB: "یک رکورد حاکمیت‌شده.",
    modelBody: "ONYX بر چرخه عمر عملیات سازمان یافته است، نه مجموعه‌ای از ابزارهای جداگانه. زمینه عملیاتی در هر مرحله حفظ می‌شود تا مشخص باشد چه چیزی مجاز است، چه چیزی برنامه‌ریزی شده، چه رخ داده و گام بعدی چیست.",
    cards: [
      ["۰۱", "اختیار", "مشخص کنید چه کسی می‌تواند اقدام کند.", "هویت، مرزهای سازمانی، نقش‌ها، تفویض اختیار و اختیار تصمیم، زمینه کنترلی کار عملیاتی را مشخص می‌کنند."],
      ["۰۲", "برنامه‌ریزی", "هدف را به کار کنترل‌شده تبدیل کنید.", "مأموریت‌ها، وظایف، وابستگی‌ها، زمان‌بندی، ظرفیت و سناریوها برنامه عملیات را صریح می‌کنند."],
      ["۰۳", "اجرا", "بر اساس وضعیت عملیاتی اقدام کنید.", "کلاینت‌های عملیاتی مورداعتماد با مأموریت‌ها، وظایف، تأییدها، فایل‌ها، ارتباطات و وضعیت حاکمیت‌شده کار می‌کنند."],
      ["۰۴", "هماهنگی", "افراد و وضعیت را هم‌راستا نگه دارید.", "جلسه‌ها، گفتگوها، اعلان‌ها، همگام‌سازی و دید عملیاتی مشترک، مشارکت‌کنندگان توزیع‌شده را به هم متصل می‌کنند."],
      ["۰۵", "راستی‌آزمایی", "نتیجه را پاسخ‌گو کنید.", "تأییدها، راستی‌آزمایی، شواهد، تصمیم‌های سیاستی و وضعیت‌های بازبینی، اتمام کار را از نتیجه تأییدشده جدا می‌کنند."],
      ["۰۶", "ثبت", "آنچه رخ داده را حفظ کنید.", "تاریخچه عملیاتی، شواهد، ممیزی و وضعیت پایدار، تصمیم‌ها و تغییرات را قابل بازسازی می‌کنند."],
      ["۰۷", "بازیابی", "به عملیات کنترل‌شده بازگردید.", "همگام‌سازی، مدیریت تعارض، حفاظت‌های replay/idempotency و مدیریت وضعیت با هدف بازیابی، تداوم پس از اختلال را پشتیبانی می‌کنند."],
    ],
    flowTag: "۰۳ / چرخه عمر عملیات",
    flowTitleA: "از اختیار تا",
    flowTitleB: "بازیابی.",
    flowBody: "چرخه عمر، مدل محصول است. ONYX زمینه عملیاتی را از اختیاردهی و برنامه‌ریزی تا اجرا، راستی‌آزمایی، ثبت پایدار و بازیابی حفظ می‌کند.",
    flow: ["اختیار", "برنامه‌ریزی", "اجرا", "هماهنگی", "راستی‌آزمایی", "ثبت", "بازیابی"],
    capabilityTag: "۰۴ / گروه‌های قابلیت",
    capabilityTitleA: "پلتفرم از",
    capabilityTitleB: "خودِ کار پیروی می‌کند.",
    capabilities: [
      ["اختیار و سازمان", "سازمان‌ها، کاربران، نقش‌ها، تفویض اختیار و سلسله‌مراتب مشخص می‌کنند چه کسی و در چه محدوده‌ای مجاز به اقدام است."],
      ["مأموریت و کار", "چرخه عمر مأموریت، وظایف، اولویت‌ها، مالکان، وابستگی‌ها، زمان‌بندی و نقاط عطف، اجرا را ساختاربندی می‌کنند."],
      ["تصمیم و هماهنگی", "جلسه‌ها، تصمیم‌ها، اقدامات، گفتگوها، اعلان‌ها و روابط عملیاتی مشارکت‌کنندگان را هم‌راستا نگه می‌دارند."],
      ["شواهد و راستی‌آزمایی", "فایل‌ها، تأییدها، وضعیت‌های بازبینی، راستی‌آزمایی و شواهد پیوست‌شده، نتیجه را به کاری که آن را ایجاد کرده متصل می‌کنند."],
      ["برنامه‌ریزی و پیش‌بینی", "ظرفیت، تخصیص بار کاری، مدل‌سازی سناریو، پیش‌بینی، خودکارسازی و تشدید از برنامه‌ریزی عملیاتی پشتیبانی می‌کنند."],
      ["همگام‌سازی و تاریخچه", "همگام‌سازی وضعیت توزیع‌شده، مدیریت تعارض، تاریخچه رویدادهای پایدار، ممیزی، سیاست و حفاظت‌های بازیابی، تداوم و قابلیت ردیابی را پشتیبانی می‌کنند."],
    ],
    deploymentTag: "۰۵ / سطوح محصول",
    deploymentTitleA: "کلاینت‌های متفاوت.",
    deploymentTitleB: "یک مدل عملیاتی.",
    deploymentBody: "ONYX مجموعه‌ای از برنامه‌های عملیاتی است. مخزن فعلی یک سطح دسکتاپ کارکنان با replica محلی و ترکیب همگام‌سازی، و یک کلاینت مرورگری آنلاین دارد. قابلیت‌های کلاینت‌ها بر اساس سطح اعتماد و اختیار عمداً متفاوت‌اند.",
    surfaces: [
      ["کارکنان", "عملیات دسکتاپ", "سطح عملیاتی محلی برای مأموریت‌ها، وظایف، تأییدها، پیام‌رسانی، فایل‌ها، اعلان‌ها و تنظیمات، همراه با وضعیت صریح همگام‌سازی.", "پیاده‌سازی‌شده با ملاحظه"],
      ["وب", "اپراتور راه‌دور", "سطح مرورگری آنلاین برای دسترسی عملیاتی مبتنی بر سرور؛ در حال حاضر وضعیت دامنه محلی یا اجرای فرمان آفلاین ارائه نمی‌کند.", "پیاده‌سازی‌شده"],
      ["ناظر", "آگاهی محدودشده", "کلاس کلاینت ناظر برنامه‌ریزی‌شده برای ارائه آگاهی بدون اعطای ضمنی اختیار عملیاتی.", "برنامه‌ریزی‌شده"],
    ],
    statusTag: "۰۶ / وضعیت قابلیت‌ها",
    statusTitleA: "بدانید چه چیزی",
    statusTitleB: "واقعی، در حال توسعه یا آینده است.",
    statusBody: "پیام محصول نباید پیاده‌سازی فعلی، توسعه فعال و مسیر پژوهشی را در یک وعده ادغام کند. برچسب‌های زیر عمداً محافظه‌کارانه‌اند و از مانیفست فعلی برنامه و مستندات بازاریابی پیروی می‌کنند.",
    status: [
      ["پیاده‌سازی‌شده", "مدل عملیاتی اصلی", "هویت و اختیار سازمانی، مأموریت و کار، تأییدها، ارتباطات، فایل‌ها، اعلان‌ها، وضعیت عملیاتی و کنترل‌های حاکمیتی در سامانه فعلی وجود دارند."],
      ["پیاده‌سازی‌شده", "سطوح کلاینت عملیاتی", "برنامه دسکتاپ کارکنان وضعیت عملیاتی محلی و ترکیب همگام‌سازی دارد؛ برنامه مرورگری یک سطح عملیاتی آنلاین و متصل به سرور ارائه می‌کند."],
      ["در حال توسعه", "محصول‌سازی و سخت‌سازی", "پلتفرم گسترده‌تر همچنان به اجزای قابل استقرار و پرداخت‌شده محصول تبدیل می‌شود. جزئیات پیاده‌سازی باید در صفحات معماری و نقشه راه بیاید، نه به‌عنوان قابلیت تمام‌شده."],
      ["برنامه‌ریزی / پژوهش", "رابط‌های ناظر و عامل آینده", "دسترسی ناظر و تعامل آینده عامل/افزونه از مسیرهای آینده پلتفرم‌اند و در این صفحه به‌عنوان اجرای خودکار یا قابلیت فعلی هوش مصنوعی معرفی نمی‌شوند."],
    ],
    ctaTag: "۰۷ / گام بعد",
    ctaTitleA: "سامانه را ببینید؛",
    ctaTitleB: "نه فقط محصول را.",
    ctaBody: "از چرخه عمر محصول به معماری، سناریوهای عملیاتی یا گفت‌وگوی مستقیم با تیم بروید.",
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
