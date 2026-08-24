import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Command,
  GitBranch,
  Layers3,
  Menu,
  Network,
  Plus,
  Radar,
  ShieldCheck,
  Target,
  X,
} from "lucide-react";

type Locale = "en" | "fa";

type Localized = { en: string; fa: string };

const assets = {
  wideLogo: "/assets/onyx-wordmark-wide.png",
  stackedLogo: "/assets/onyx-logo.png",
  authority: "/assets/product/mission-operations.png",
  execution: "/assets/product/operational-overview.png",
  nexus: "/assets/product/secure-browser-access.webp",
  ifem: "/assets/ifem-doctrine.jpg",
  signalMark: "/assets/onyx-logo.png",
};

const text = {
  nav: {
    platform: { en: "Platform", fa: "پلتفرم" },
    outcomes: { en: "Outcomes", fa: "نتایج" },
    enterprise: { en: "Enterprise", fa: "سازمانی" },
    demo: { en: "Request a demo", fa: "درخواست دمو" },
  },
  hero: {
    tag: { en: "Authority-aware operations", fa: "عملیات آگاه از اختیار" },
    titleA: { en: "The architecture", fa: "معماری" },
    titleB: { en: "of execution.", fa: "اجرا." },
    lede: { en: "Organizations are built on invisible systems of authority, responsibility, and trust. ONYX transforms those systems into a living digital framework.", fa: "سازمان‌ها بر سامانه‌های نامرئیِ اختیار، مسئولیت و اعتماد بنا می‌شوند. ONYX این سامانه‌ها را به چارچوبی دیجیتال و زنده تبدیل می‌کند." },
    framework: { en: "Explore the framework", fa: "بررسی چارچوب" },
    enterprise: { en: "Enterprise solutions", fa: "راهکارهای سازمانی" },
    condition: { en: "System condition", fa: "وضعیت سامانه" },
    synchronized: { en: "Structure synchronized", fa: "ساختار همگام‌سازی شد" },
    scroll: { en: "Scroll to examine", fa: "برای بررسی حرکت کنید" },
  },
  bridge: { en: "Authority / responsibility / execution / verification", fa: "اختیار / مسئولیت / اجرا / راستی‌آزمایی" },
  methodology: {
    tag: { en: "Architecture doctrine", fa: "منطق معماری" },
    titleA: { en: "Interface-first", fa: "طراحی از رابط" },
    titleB: { en: "by design.", fa: "آغاز می‌شود." },
    body: {
      en: "ONYX is the operational platform. IFEM is the methodology that shapes its boundaries: interfaces, responsibilities, evidence, and verification are defined before implementation scales.",
      fa: "ONYX پلتفرم عملیاتی است؛ IFEM روشی است که مرزهای آن را شکل می‌دهد: پیش از گسترش پیاده‌سازی، رابط‌ها، مسئولیت‌ها، شواهد و معیارهای راستی‌آزمایی روشن می‌شوند.",
    },
    product: { en: "Product layer", fa: "لایه محصول" },
    productCopy: { en: "Authority-aware operational intelligence", fa: "هوشمندی عملیاتی آگاه از اختیار" },
    doctrine: { en: "Methodology layer", fa: "لایه روش‌شناسی" },
    doctrineCopy: { en: "Interface-first execution discipline", fa: "انضباط اجرای رابط‌محور" },
    link: { en: "Explore the IFEM Doctrine", fa: "مطالعه مکتب IFEM" },
  },
  problem: {
    tag: { en: "01 / The hidden problem", fa: "۰۱ / مسئله پنهان" },
    titleA: { en: "Organizations break", fa: "سازمان‌ها پیش از آن‌که" },
    titleB: { en: "before they scale.", fa: "رشد کنند، دچار گسست می‌شوند." },
    body: { en: "Companies begin simply: communication is direct and responsibility is clear. Growth often leaves work scattered across systems that were never designed to carry organizational accountability.", fa: "شرکت‌ها ساده آغاز می‌شوند: ارتباط مستقیم و مسئولیت روشن است. رشد، کار را اغلب میان سامانه‌هایی پراکنده می‌کند که هرگز برای حمل پاسخ‌گویی سازمانی طراحی نشده‌اند." },
    signal: { en: "Operational signal", fa: "سیگنال عملیاتی" },
    fragmented: { en: "Fragmented", fa: "پراکنده" },
    result: { en: "Responsibility becomes unclear. Decisions slow. Visibility dissolves.", fa: "مسئولیت مبهم می‌شود، تصمیم‌ها کند می‌شوند و دید عملیاتی از بین می‌رود." },
  },
  contrast: {
    tag: { en: "02 / The ONYX difference", fa: "۰۲ / تفاوت ONYX" },
    titleA: { en: "Beyond task", fa: "فراتر از" },
    titleB: { en: "management.", fa: "مدیریت وظیفه." },
    body: { en: "Traditional software records activity. ONYX gives operational activity a defined owner, authority path, and verified ending.", fa: "نرم‌افزار سنتی فعالیت را ثبت می‌کند. ONYX به فعالیت عملیاتی مالک مشخص، مسیر اختیار و پایانِ راستی‌آزمایی‌شده می‌دهد." },
    traditional: { en: "Traditional software", fa: "نرم‌افزار سنتی" },
    onyx: { en: "ONYX operating framework", fa: "چارچوب عملیاتی ONYX" },
    rows: [
      [{ en: "What needs to be done?", fa: "چه کاری باید انجام شود؟" }, { en: "Who is responsible?", fa: "چه کسی مسئول است؟" }],
      [{ en: "Tasks are distributed.", fa: "وظایف توزیع می‌شوند." }, { en: "Who has authority?", fa: "چه کسی اختیار دارد؟" }],
      [{ en: "Progress is reported.", fa: "پیشرفت گزارش می‌شود." }, { en: "How should execution move?", fa: "اجرا چگونه باید حرکت کند؟" }],
      [{ en: "Completion is logged.", fa: "اتمام ثبت می‌شود." }, { en: "Who verifies the outcome?", fa: "چه کسی نتیجه را تأیید می‌کند؟" }],
    ],
  },
  philosophy: {
    tag: { en: "03 / Operating philosophy", fa: "۰۳ / فلسفه عملیاتی" },
    titleA: { en: "A digital operating", fa: "یک سامانه عامل دیجیتال" },
    titleB: { en: "system for organizations.", fa: "برای سازمان‌ها." },
    body: { en: "Operational intelligence begins when authority is not abstract, but designed into the route work must follow.", fa: "هوشمندی عملیاتی زمانی آغاز می‌شود که اختیار انتزاعی نباشد؛ بلکه در مسیری که کار باید بپیماید طراحی شده باشد." },
    steps: [
      { en: "Authority", fa: "اختیار" }, { en: "Responsibility", fa: "مسئولیت" }, { en: "Execution", fa: "اجرا" }, { en: "Verification", fa: "راستی‌آزمایی" }, { en: "Organizational intelligence", fa: "هوشمندی سازمانی" },
    ],
  },
  platform: {
    tag: { en: "04 / The platform", fa: "۰۴ / پلتفرم" },
    titleA: { en: "Your organization,", fa: "سازمان شما،" },
    titleB: { en: "digitally defined.", fa: "دیجیتالی تعریف‌شده." },
    body: { en: "ONYX makes the invisible architecture behind every organization legible, navigable, and ready for execution.", fa: "ONYX معماری نامرئی پشت هر سازمان را خوانا، قابل پیمایش و آماده اجرا می‌کند." },
    label: { en: "Authority graph / live model", fa: "نقشه اختیار / مدل زنده" },
    headline: { en: "Structure is no longer a static org chart.", fa: "ساختار دیگر یک چارت سازمانی ایستا نیست." },
    copy: { en: "Roles, teams, departments, permissions, and decision paths are represented as a system that stays connected to the work it governs.", fa: "نقش‌ها، تیم‌ها، واحدها، مجوزها و مسیرهای تصمیم به‌عنوان سامانه‌ای نمایش داده می‌شوند که به کارِ تحت مدیریت خود متصل می‌ماند." },
    checks: [{ en: "Roles and responsibilities", fa: "نقش‌ها و مسئولیت‌ها" }, { en: "Decision authority", fa: "اختیار تصمیم" }, { en: "Operational visibility", fa: "دید عملیاتی" }],
  },
  execution: {
    tag: { en: "05 / From objectives to outcomes", fa: "۰۵ / از اهداف تا نتایج" },
    titleA: { en: "Execution becomes", fa: "اجرا به مسیری" },
    titleB: { en: "a visible path.", fa: "قابل مشاهده تبدیل می‌شود." },
    body: { en: "ONYX connects leadership objectives with day-to-day operations, making every transfer of responsibility visible and intentional.", fa: "ONYX اهداف رهبری را به عملیات روزانه متصل می‌کند و هر انتقال مسئولیت را قابل مشاهده و هدفمند می‌سازد." },
    stages: [{ en: "Strategic goal", fa: "هدف راهبردی" }, { en: "Mission", fa: "مأموریت" }, { en: "Assignment", fa: "واگذاری" }, { en: "Execution", fa: "اجرا" }, { en: "Verification", fa: "راستی‌آزمایی" }, { en: "Result", fa: "نتیجه" }],
  },
  accountability: {
    tag: { en: "06 / Accountability engine", fa: "۰۶ / موتور پاسخ‌گویی" },
    titleA: { en: "Completion is", fa: "اتمام،" },
    titleB: { en: "not enough.", fa: "کافی نیست." },
    item: { en: "Work item / 042", fa: "آیتم کار / ۰۴۲" },
    log: { en: "Verification log", fa: "ثبت راستی‌آزمایی" },
    completed: { en: "Task completed", fa: "وظیفه تکمیل شد" },
    verified: { en: "Verified", fa: "راستی‌آزمایی شد" },
    accepted: { en: "Accepted", fa: "پذیرفته شد" },
    recorded: { en: "Outcome recorded in operational memory.", fa: "نتیجه در حافظه عملیاتی ثبت شد." },
  },
  industries: {
    tag: { en: "07 / Enterprise applications", fa: "۰۷ / کاربردهای سازمانی" },
    titleA: { en: "Built for the", fa: "ساخته‌شده برای" },
    titleB: { en: "complexity of work.", fa: "پیچیدگی کار." },
    body: { en: "Whether operations happen across a factory floor, a job site, a global route, or a layered organization, ONYX keeps responsibility visible.", fa: "چه عملیات در کارخانه، کارگاه، مسیر جهانی یا سازمانی چندلایه رخ دهد، ONYX مسئولیت را قابل مشاهده نگه می‌دارد." },
    cards: [
      { en: "Manufacturing", fa: "تولید", copyEn: "Complex workflows, multiple departments, production accountability.", copyFa: "جریان‌های کاری پیچیده، واحدهای متعدد و پاسخ‌گویی تولید." },
      { en: "Construction", fa: "ساخت‌وساز", copyEn: "Field operations, temporary resources, distributed teams.", copyFa: "عملیات میدانی، منابع موقت و تیم‌های توزیع‌شده." },
      { en: "Logistics", fa: "لجستیک", copyEn: "Fast-moving operations, constant change, coordination under pressure.", copyFa: "عملیات پویا، تغییر مداوم و هماهنگی زیر فشار." },
      { en: "Enterprise", fa: "سازمانی", copyEn: "Hierarchy complexity, decision bottlenecks, and limited visibility.", copyFa: "پیچیدگی سلسله‌مراتب، گلوگاه‌های تصمیم و دید محدود." },
    ],
  },
  outcomes: {
    tag: { en: "08 / Business outcomes", fa: "۰۸ / نتایج کسب‌وکار" },
    titleA: { en: "More than", fa: "فراتر از" },
    titleB: { en: "productivity.", fa: "بهره‌وری." },
    body: { en: "When responsibility is designed into execution, the organization gains a durable operating advantage.", fa: "وقتی مسئولیت در اجرا طراحی شود، سازمان به مزیتی عملیاتی و پایدار دست می‌یابد." },
    list: [
      { en: "Clarity", fa: "شفافیت", copyEn: "Everyone understands responsibility.", copyFa: "همه مسئولیت را درک می‌کنند." },
      { en: "Control", fa: "کنترل", copyEn: "Managers understand operations.", copyFa: "مدیران عملیات را درک می‌کنند." },
      { en: "Speed", fa: "سرعت", copyEn: "Decisions move faster.", copyFa: "تصمیم‌ها سریع‌تر حرکت می‌کنند." },
      { en: "Accountability", fa: "پاسخ‌گویی", copyEn: "Actions have ownership.", copyFa: "اقدام‌ها مالک دارند." },
      { en: "Intelligence", fa: "هوشمندی", copyEn: "Organizations learn continuously.", copyFa: "سازمان‌ها پیوسته یاد می‌گیرند." },
    ],
  },
  enterprise: {
    tag: { en: "09 / Technology foundation", fa: "۰۹ / بنیان فناوری" },
    titleA: { en: "Built for", fa: "ساخته‌شده برای" },
    titleB: { en: "mission-critical", fa: "عملیات حیاتی" },
    titleC: { en: "operations.", fa: "مأموریت." },
    specs: [{ en: "Distributed architecture", fa: "معماری توزیع‌شده" }, { en: "Secure synchronization", fa: "همگام‌سازی امن" }, { en: "Offline-first operation", fa: "عملیات آفلاین‌محور" }, { en: "Enterprise deployment", fa: "استقرار سازمانی" }],
    annotations: [{ en: "Ownership mapped", fa: "مالکیت ترسیم شد" }, { en: "Authority routed", fa: "اختیار مسیر‌دهی شد" }, { en: "Outcome verified", fa: "نتیجه تأیید شد" }],
  },
  why: {
    tag: { en: "10 / Why ONYX", fa: "۱۰ / چرا ONYX" },
    titleA: { en: "Responsibility is", fa: "مسئولیت" },
    titleB: { en: "the system.", fa: "خودِ سامانه است." },
    labels: [
      [{ en: "Traditional tools", fa: "ابزارهای سنتی" }, { en: "Manage tasks.", fa: "وظیفه‌ها را مدیریت می‌کنند." }],
      [{ en: "ERP systems", fa: "سامانه‌های ERP" }, { en: "Manage resources.", fa: "منابع را مدیریت می‌کنند." }],
      [{ en: "Communication tools", fa: "ابزارهای ارتباطی" }, { en: "Exchange information.", fa: "اطلاعات ردوبدل می‌کنند." }],
      [{ en: "ONYX", fa: "ONYX" }, { en: "Manages operational responsibility.", fa: "مسئولیت عملیاتی را مدیریت می‌کند." }],
    ],
  },
  cta: {
    tag: { en: "Enterprise deployment", fa: "استقرار سازمانی" },
    titleA: { en: "Build organizations that", fa: "سازمان‌هایی بسازید که" },
    titleB: { en: "execute with intelligence.", fa: "هوشمندانه اجرا می‌کنند." },
    body: { en: "ONYX provides the operational foundation for companies where responsibility matters.", fa: "ONYX بنیان عملیاتی شرکت‌هایی را فراهم می‌کند که مسئولیت در آن‌ها اهمیت دارد." },
    demo: { en: "Request enterprise demo", fa: "درخواست دمو سازمانی" },
    contact: { en: "Contact ONYX team", fa: "تماس با تیم ONYX" },
  },
};

const fracturePoints: Localized[] = [
  { en: "Messages", fa: "پیام‌ها" }, { en: "Emails", fa: "ایمیل‌ها" }, { en: "Documents", fa: "اسناد" }, { en: "Spreadsheets", fa: "صفحه‌گسترده‌ها" }, { en: "Disconnected software", fa: "نرم‌افزارهای گسسته" },
];

const capabilityCards = [
  { number: "01", icon: Network, title: { en: "Authority Graph", fa: "نقشه اختیار" }, copy: { en: "A living organizational model of roles, teams, permissions, and decision paths.", fa: "مدلی زنده از نقش‌ها، تیم‌ها، مجوزها و مسیرهای تصمیم." } },
  { number: "02", icon: Target, title: { en: "Operational Execution", fa: "اجرای عملیاتی" }, copy: { en: "Leadership intent connected to the people and handoffs that deliver outcomes.", fa: "نیت رهبری متصل به افراد و تحویل‌هایی که نتیجه می‌سازند." } },
  { number: "03", icon: BadgeCheck, title: { en: "Accountability Engine", fa: "موتور پاسخ‌گویی" }, copy: { en: "Completion becomes a verified, accepted, and historically visible result.", fa: "اتمام به نتیجه‌ای تأییدشده، پذیرفته‌شده و قابل مشاهده در تاریخ تبدیل می‌شود." } },
  { number: "04", icon: GitBranch, title: { en: "Dynamic Teams", fa: "تیم‌های پویا" }, copy: { en: "Structured cross-team collaboration and controlled delegation without ambiguity.", fa: "همکاری ساخت‌یافته میان تیم‌ها و تفویض کنترل‌شده بدون ابهام." } },
  { number: "05", icon: Radar, title: { en: "Escalation Network", fa: "شبکه تشدید" }, copy: { en: "Issues move through the correct authority path before visibility is lost.", fa: "مسائل پیش از از دست رفتن دید، در مسیر صحیح اختیار حرکت می‌کنند." } },
  { number: "06", icon: Layers3, title: { en: "Operational Memory", fa: "حافظه عملیاتی" }, copy: { en: "Decisions, work, obstacles, and resolutions become institutional knowledge.", fa: "تصمیم‌ها، کار، موانع و راه‌حل‌ها به دانش سازمانی تبدیل می‌شوند." } },
];

function resolveBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  return languages.some((language) => language.toLowerCase().startsWith("fa")) ? "fa" : "en";
}

function SignalTag({ children }: { children: React.ReactNode }) {
  return <div className="signal-tag"><span className="signal-tag__node" /><span>{children}</span></div>;
}

function Rule() {
  return <div className="signal-rule" aria-hidden="true"><span /></div>;
}

function ArrowAction({ children, href, solid = false, rtl = false }: { children: React.ReactNode; href: string; solid?: boolean; rtl?: boolean }) {
  const Arrow = rtl ? ArrowRight : ArrowLeft;
  return <a className={`arrow-action ${solid ? "arrow-action--solid" : ""}`} href={href}><Arrow size={15} strokeWidth={1.8} /><span>{children}</span></a>;
}

function LanguageControl({ locale, onSelect }: { locale: Locale; onSelect: (locale: Locale) => void }) {
  return <div className="language-control" aria-label={locale === "fa" ? "انتخاب زبان" : "Language selector"}><a href="/en/" lang="en" aria-current={locale === "en" ? "page" : undefined} onClick={() => onSelect("en")}>EN</a><a href="/fa/" lang="fa" dir="rtl" aria-current={locale === "fa" ? "page" : undefined} onClick={() => onSelect("fa")}>فارسی</a></div>;
}

export default function Home({ initialLocale }: { initialLocale?: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [locale, setLocale] = useState<Locale>(initialLocale ?? "en");
  const isRtl = locale === "fa";
  const t = (value: Localized) => value[locale];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    const saved = window.localStorage.getItem("onyx-locale");
    const preferred = initialLocale ?? (saved === "fa" || saved === "en" ? saved : resolveBrowserLocale());
    setLocale(preferred);
    document.documentElement.lang = preferred;
    document.documentElement.dir = preferred === "fa" ? "rtl" : "ltr";
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [initialLocale]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const selectLocale = (next: Locale) => {
    window.localStorage.setItem("onyx-locale", next);
    setLocale(next);
    setMenuOpen(false);
  };
  const closeMenu = () => setMenuOpen(false);
  const Chevron = isRtl ? ChevronRight : ChevronLeft;

  return (
    <div className="onyx-site" dir={isRtl ? "rtl" : "ltr"}>
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <a href="#top" className="header-mark" aria-label={isRtl ? "صفحه اصلی ONYX" : "ONYX home"}><img src={assets.wideLogo} alt="ONYX" width="1200" height="400" decoding="async" /></a>
        <nav className="desktop-nav" aria-label="Primary navigation"><a href="#platform">{t(text.nav.platform)}</a><a href="#outcomes">{t(text.nav.outcomes)}</a><a href="#enterprise">{t(text.nav.enterprise)}</a></nav>
        <div className="header-actions"><LanguageControl locale={locale} onSelect={selectLocale} /><a className="header-cta" href="#contact"><span>{t(text.nav.demo)}</span>{isRtl ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}</a></div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={isRtl ? "باز و بسته کردن منو" : "Toggle navigation"}>{menuOpen ? <X size={20} /> : <Menu size={21} />}</button>
      </header>

      <nav id="mobile-navigation" className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`} aria-hidden={!menuOpen} aria-label={isRtl ? "پیمایش موبایل" : "Mobile navigation"}>
        <LanguageControl locale={locale} onSelect={selectLocale} />
        <a href="#platform" onClick={closeMenu}>{t(text.nav.platform)}{isRtl ? <ArrowRight size={17} /> : <ArrowLeft size={17} />}</a>
        <a href="#outcomes" onClick={closeMenu}>{t(text.nav.outcomes)}{isRtl ? <ArrowRight size={17} /> : <ArrowLeft size={17} />}</a>
        <a href="#enterprise" onClick={closeMenu}>{t(text.nav.enterprise)}{isRtl ? <ArrowRight size={17} /> : <ArrowLeft size={17} />}</a>
        <a href="#contact" onClick={closeMenu} className="mobile-nav__cta">{t(text.nav.demo)}</a>
      </nav>

      <main id="top">
        <section className="hero section-shell">
          <div className="hero__veil" /><div className="hero__grid" aria-hidden="true" />
          <div className="hero__content shell-content"><SignalTag>{t(text.hero.tag)}</SignalTag><h1>{t(text.hero.titleA)}<br /><em>{t(text.hero.titleB)}</em></h1><p className="hero__lede">{t(text.hero.lede)}</p><div className="hero__actions"><ArrowAction href="#platform" solid rtl={isRtl}>{t(text.hero.framework)}</ArrowAction><ArrowAction href="#enterprise" rtl={isRtl}>{t(text.hero.enterprise)}</ArrowAction></div></div>
          <div className="hero__telemetry" aria-label="System status"><div className="telemetry-orbit"><span /><span /><span /></div><div><span className="telemetry-label">{t(text.hero.condition)}</span><strong>{t(text.hero.synchronized)}</strong></div><span className="telemetry-state">ONLINE</span></div>
          <a className="hero__scroll" href="#problem" aria-label={t(text.hero.scroll)}><span>{t(text.hero.scroll)}</span><ChevronDown size={16} /></a>
        </section>

        <div className="brand-bridge" aria-hidden="true"><div className="shell-content brand-bridge__content"><span className="brand-bridge__line" /><div className="brand-bridge__mark"><img src={assets.signalMark} alt="" width="512" height="512" decoding="async" /><strong>ONYX</strong></div><span className="brand-bridge__statement">{t(text.bridge)}</span><span className="brand-bridge__line" /></div></div>

        <section id="problem" className="problem section-shell"><div className="shell-content split-grid split-grid--problem"><div className="section-intro"><SignalTag>{t(text.problem.tag)}</SignalTag><h2>{t(text.problem.titleA)}<br /><em>{t(text.problem.titleB)}</em></h2><p>{t(text.problem.body)}</p></div><div className="fracture-board"><div className="fracture-board__caption"><span>{t(text.problem.signal)}</span><span>{t(text.problem.fragmented)}</span></div><div className="fracture-board__items">{fracturePoints.map((item, index) => <div className="fracture-row" key={item.en}><span className="fracture-row__index">{String(index + 1).padStart(2, "0")}</span><span className="fracture-row__line" /><span>{t(item)}</span><Plus size={14} /></div>)}</div><Rule /><div className="fracture-board__result"><CircleDot size={16} /><span>{t(text.problem.result)}</span></div></div></div></section>

        <section className="contrast section-shell"><div className="shell-content"><div className="section-heading section-heading--wide"><SignalTag>{t(text.contrast.tag)}</SignalTag><h2>{t(text.contrast.titleA)}<br /><em>{t(text.contrast.titleB)}</em></h2><p>{t(text.contrast.body)}</p></div><div className="contrast-table"><div className="contrast-table__head"><span>{t(text.contrast.traditional)}</span><span>{t(text.contrast.onyx)}</span></div>{text.contrast.rows.map(([first, second]) => <div className="contrast-table__row" key={first.en}><span>{t(first)}</span><strong>{t(second)}</strong></div>)}</div></div></section>

        <section className="philosophy section-shell"><div className="shell-content"><div className="philosophy__top"><SignalTag>{t(text.philosophy.tag)}</SignalTag><div><h2>{t(text.philosophy.titleA)}<br /><em>{t(text.philosophy.titleB)}</em></h2><p>{t(text.philosophy.body)}</p></div></div><div className="logic-path" aria-label="Authority becomes organizational intelligence">{text.philosophy.steps.map((item, index) => <div className={`logic-path__step ${index === 4 ? "logic-path__step--final" : ""}`} key={item.en}><span className="logic-path__number">{String(index + 1).padStart(2, "0")}</span><span className="logic-path__dot" /><strong>{t(item)}</strong></div>)}</div></div></section>

        <section id="methodology" className="methodology section-shell"><div className="shell-content methodology__layout"><div className="methodology__content"><SignalTag>{t(text.methodology.tag)}</SignalTag><h2>{t(text.methodology.titleA)}<br /><em>{t(text.methodology.titleB)}</em></h2><p>{t(text.methodology.body)}</p><a className="methodology__link" href="https://ifem-doctrine.github.io/" target="_blank" rel="noreferrer">{t(text.methodology.link)}<ArrowUpLeft size={16} /></a></div><div className="methodology__system"><img src={assets.ifem} alt="IFEM Doctrine — Interface-First Execution Methodology" width="1536" height="512" loading="lazy" decoding="async" /><div className="methodology__layers"><div><span>ONYX</span><strong>{t(text.methodology.product)}</strong><small>{t(text.methodology.productCopy)}</small></div><div><span>IFEM</span><strong>{t(text.methodology.doctrine)}</strong><small>{t(text.methodology.doctrineCopy)}</small></div></div></div></div></section>

        <section id="platform" className="platform section-shell"><div className="platform__backdrop" aria-hidden="true" /><div className="shell-content platform__intro"><div className="section-heading"><SignalTag>{t(text.platform.tag)}</SignalTag><h2>{t(text.platform.titleA)}<br /><em>{t(text.platform.titleB)}</em></h2></div><p>{t(text.platform.body)}</p></div><div className="authority-showcase shell-content"><div className="authority-showcase__image"><img src={assets.authority} alt="ONYX Mission Operations interface" width="1440" height="1000" loading="lazy" decoding="async" /><div className="image-corner image-corner--tl" /><div className="image-corner image-corner--br" /></div><div className="authority-showcase__copy"><span className="mono-label">{t(text.platform.label)}</span><h3>{t(text.platform.headline)}</h3><p>{t(text.platform.copy)}</p><ul className="check-list">{text.platform.checks.map((item) => <li key={item.en}><Check size={14} />{t(item)}</li>)}</ul></div></div><div className="capability-grid shell-content">{capabilityCards.map(({ number, icon: Icon, title, copy }) => <article className="capability-card" key={number}><div className="capability-card__head"><span>{number}</span><Icon size={20} /></div><h3>{t(title)}</h3><p>{t(copy)}</p><ArrowUpLeft size={16} /></article>)}</div></section>

        <section className="execution section-shell"><div className="execution__image-wrap"><img src={assets.execution} alt="ONYX Operational Overview interface" width="1440" height="1000" loading="lazy" decoding="async" /><div className="execution__image-fade" /></div><div className="shell-content execution__content"><div className="section-heading"><SignalTag>{t(text.execution.tag)}</SignalTag><h2>{t(text.execution.titleA)}<br /><em>{t(text.execution.titleB)}</em></h2><p>{t(text.execution.body)}</p></div><div className="execution-path">{text.execution.stages.map((stage, index) => <div className="execution-path__item" key={stage.en}><span>{String(index + 1).padStart(2, "0")}</span><strong>{t(stage)}</strong><i /></div>)}</div></div></section>

        <section className="accountability section-shell"><div className="shell-content accountability__layout"><div className="accountability__statement"><SignalTag>{t(text.accountability.tag)}</SignalTag><h2>{t(text.accountability.titleA)}<br /><em>{t(text.accountability.titleB)}</em></h2></div><div className="verification-card"><div className="verification-card__meta"><span>{t(text.accountability.item)}</span><span>{t(text.accountability.log)}</span></div><div className="verification-card__route"><div className="route-node route-node--done"><Check size={14} /><span>{t(text.accountability.completed)}</span></div><span className="route-link" /><div className="route-node route-node--done"><ShieldCheck size={14} /><span>{t(text.accountability.verified)}</span></div><span className="route-link" /><div className="route-node route-node--active"><BadgeCheck size={14} /><span>{t(text.accountability.accepted)}</span></div></div><div className="verification-card__footer"><span>{t(text.accountability.recorded)}</span><span className="verified-stamp">COMPLETE</span></div></div></div></section>

        <section className="industries section-shell"><div className="shell-content"><div className="industries__heading"><div><SignalTag>{t(text.industries.tag)}</SignalTag><h2>{t(text.industries.titleA)}<br /><em>{t(text.industries.titleB)}</em></h2></div><p>{t(text.industries.body)}</p></div><div className="industry-grid">{text.industries.cards.map((industry, index) => <article className="industry-card" key={industry.en}><span>{String(index + 1).padStart(2, "0")}</span><h3>{t({ en: industry.en, fa: industry.fa })}</h3><p>{locale === "en" ? industry.copyEn : industry.copyFa}</p>{isRtl ? <ArrowRight size={17} /> : <ArrowLeft size={17} />}</article>)}</div></div></section>

        <section id="outcomes" className="outcomes section-shell"><div className="shell-content"><div className="section-heading section-heading--wide"><SignalTag>{t(text.outcomes.tag)}</SignalTag><h2>{t(text.outcomes.titleA)}<br /><em>{t(text.outcomes.titleB)}</em></h2><p>{t(text.outcomes.body)}</p></div><div className="outcomes-list">{text.outcomes.list.map((outcome, index) => <article key={outcome.en} className="outcome-row"><span>{String(index + 1).padStart(2, "0")}</span><h3>{t({ en: outcome.en, fa: outcome.fa })}</h3><p>{locale === "en" ? outcome.copyEn : outcome.copyFa}</p><Chevron size={20} /></article>)}</div></div></section>

        <section id="enterprise" className="enterprise section-shell"><img className="enterprise__visual" src={assets.nexus} alt="ONYX secure access interface" width="893" height="768" loading="lazy" decoding="async" /><div className="enterprise__overlay" /><div className="shell-content enterprise__content"><SignalTag>{t(text.enterprise.tag)}</SignalTag><h2>{t(text.enterprise.titleA)}<br />{t(text.enterprise.titleB)}<br /><em>{t(text.enterprise.titleC)}</em></h2><div className="enterprise__specs">{text.enterprise.specs.map((spec) => <span key={spec.en}>{t(spec)}</span>)}</div></div><div className="enterprise__annotations" aria-hidden="true">{text.enterprise.annotations.map((item, index) => <div key={item.en}><span>{String(index + 1).padStart(2, "0")}</span><strong>{t(item)}</strong></div>)}</div><div className="enterprise__badge"><Command size={17} /><span>ONYX // CONTROLLED EXECUTION</span></div></section>

        <section className="why-onyx section-shell"><div className="shell-content why-onyx__layout"><div><SignalTag>{t(text.why.tag)}</SignalTag><h2>{t(text.why.titleA)}<br /><em>{t(text.why.titleB)}</em></h2></div><div className="why-onyx__comparison">{text.why.labels.map(([label, copy], index) => <div className={index === 3 ? "why-onyx__answer" : ""} key={label.en}><span>{t(label)}</span><strong>{t(copy)}</strong></div>)}</div></div></section>

        <section id="contact" className="final-cta section-shell"><div className="final-cta__rail" aria-hidden="true"><span /><span /><span /></div><div className="shell-content final-cta__content"><img src={assets.signalMark} alt="ONYX signal graphic" className="final-cta__mark" width="512" height="512" loading="lazy" decoding="async" /><SignalTag>{t(text.cta.tag)}</SignalTag><h2>{t(text.cta.titleA)}<br /><em>{t(text.cta.titleB)}</em></h2><p>{t(text.cta.body)}</p><div className="hero__actions"><ArrowAction href="mailto:so.muzaff@gmail.com?subject=ONYX%20Enterprise%20Demo" solid rtl={isRtl}>{t(text.cta.demo)}</ArrowAction><ArrowAction href="mailto:so.muzaff@gmail.com?subject=Contact%20ONYX" rtl={isRtl}>{t(text.cta.contact)}</ArrowAction></div></div></section>
      </main>

      <footer className="site-footer"><div className="shell-content site-footer__content"><div className="site-footer__brand"><img src={assets.wideLogo} alt="ONYX — tectosilicate framework" className="site-footer__wide-logo" width="1200" height="400" loading="lazy" decoding="async" /><img src={assets.stackedLogo} alt="" className="site-footer__logo" width="512" height="512" loading="lazy" decoding="async" /></div><div className="site-footer__right"><span>© {new Date().getFullYear()} ONYX</span><a href="mailto:so.muzaff@gmail.com">Suhail Muzaffari · so.muzaff@gmail.com</a></div></div></footer>
    </div>
  );
}
