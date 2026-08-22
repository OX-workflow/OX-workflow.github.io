import { useEffect, useState } from "react";
import {
  ArrowDownLeft,
  ArrowDownRight,
  ArrowUpLeft,
  ArrowUpRight,
  BookOpenText,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileCode2,
  Github,
  Menu,
  Moon,
  ShieldCheck,
  Sun,
  X,
} from "lucide-react";

type Locale = "en" | "fa";
type Localized = Record<Locale, string>;

const ASSETS = {
  brandLogo: "/assets/onyx-logo.png",
  brandWordmark: "/assets/onyx-wordmark-wide.png",
  secureAccess: "/assets/product/secure-browser-access.webp",
  missions: "/assets/product/mission-operations.png",
  overview: "/assets/product/operational-overview.png",
};

const navItems: Array<{ number: string; id: string; label: Localized }> = [
  { number: "01", id: "overview", label: { en: "Overview", fa: "مرور کلی" } },
  { number: "02", id: "capabilities", label: { en: "Capabilities", fa: "قابلیت‌ها" } },
  { number: "03", id: "experience", label: { en: "Experience", fa: "تجربه" } },
  { number: "04", id: "architecture", label: { en: "Architecture", fa: "معماری" } },
  { number: "05", id: "ifem", label: { en: "IFEM", fa: "IFEM" } },
  { number: "06", id: "evidence", label: { en: "Evidence", fa: "شواهد" } },
  { number: "07", id: "developer", label: { en: "Developer", fa: "توسعه‌دهنده" } },
];

const capabilities: Array<{ title: Localized; copy: Localized }> = [
  {
    title: { en: "Secure Access", fa: "دسترسی امن" },
    copy: {
      en: "Controlled browser access and authority-aware workflows for sensitive operational contexts.",
      fa: "دسترسی کنترل‌شده از طریق مرورگر و جریان‌های کاری آگاه از سطح اختیار برای زمینه‌های عملیاتی حساس.",
    },
  },
  {
    title: { en: "Mission Operations", fa: "عملیات مأموریت" },
    copy: {
      en: "Coordinate missions, tasks, decisions, and states without losing responsibility boundaries.",
      fa: "مأموریت‌ها، وظایف، تصمیم‌ها و وضعیت‌ها را بدون از دست دادن مرزهای مسئولیت هماهنگ کنید.",
    },
  },
  {
    title: { en: "Decision Evidence", fa: "شواهد تصمیم" },
    copy: {
      en: "Maintain reviewable records that connect actions, decisions, and operational outcomes.",
      fa: "سوابقی قابل بازبینی نگه دارید که اقدام‌ها، تصمیم‌ها و نتایج عملیاتی را به هم متصل می‌کنند.",
    },
  },
  {
    title: { en: "Extensible Architecture", fa: "معماری توسعه‌پذیر" },
    copy: {
      en: "Expand capabilities through explicit contracts instead of collapsing system boundaries.",
      fa: "قابلیت‌ها را از طریق قراردادهای صریح گسترش دهید، نه با درهم شکستن مرزهای سامانه.",
    },
  },
];

const productScreens: Array<{ image: string; width: number; height: number; title: Localized; copy: Localized }> = [
  {
    image: ASSETS.secureAccess,
    width: 893,
    height: 768,
    title: { en: "Secure Access Layer", fa: "لایه دسترسی امن" },
    copy: {
      en: "A focused browser sign-in surface designed for authorized operators and clear session expectations.",
      fa: "سطح ورود متمرکز در مرورگر که برای کاربران مجاز و انتظارهای روشن از نشست طراحی شده است.",
    },
  },
  {
    image: ASSETS.missions,
    width: 1440,
    height: 1000,
    title: { en: "Mission Operations", fa: "عملیات مأموریت" },
    copy: {
      en: "Review purpose, ownership, lifecycle status, temporal constraints, and evidence as one coordinated mission picture.",
      fa: "هدف، مالکیت، وضعیت چرخه عمر، محدودیت‌های زمانی و شواهد را به‌عنوان یک نمای هماهنگ از مأموریت بررسی کنید.",
    },
  },
  {
    image: ASSETS.overview,
    width: 1440,
    height: 1000,
    title: { en: "Operational Overview", fa: "نمای عملیاتی" },
    copy: {
      en: "Bring alerts, approvals, active work, and the next operator actions into a single read-only projection.",
      fa: "هشدارها، تأییدها، کارهای فعال و اقدام‌های بعدی کاربر را در یک نمای یکپارچه و فقط‌خواندنی گرد هم آورید.",
    },
  },
];

const architectureLayers: Array<{ number: string; title: Localized; copy: Localized; tags: string[] }> = [
  {
    number: "01",
    title: { en: "Kernel & contract boundary", fa: "مرز هسته و قرارداد" },
    copy: {
      en: "Reusable primitives and interaction boundaries establish a stable foundation before higher-level behavior is composed.",
      fa: "اجزای پایه قابل‌استفاده مجدد و مرزهای تعامل، پیش از ترکیب رفتارهای سطح بالاتر، بنیانی پایدار ایجاد می‌کنند.",
    },
    tags: ["platform-kernel", "platform-contracts"],
  },
  {
    number: "02",
    title: { en: "Mission domains", fa: "حوزه‌های مأموریت" },
    copy: {
      en: "Dedicated domains keep mission, work, communication, policy, profile, todo, and notification responsibilities distinct.",
      fa: "حوزه‌های اختصاصی، مسئولیت‌های مأموریت، کار، ارتباطات، سیاست، پروفایل، وظیفه و اعلان را متمایز نگه می‌دارند.",
    },
    tags: ["mission-domain", "work-domain", "todo-domain"],
  },
  {
    number: "03",
    title: { en: "Applications & composition", fa: "برنامه‌ها و ترکیب" },
    copy: {
      en: "Query, worker, security, audit, and client-composition applications coordinate use cases without becoming the domain model.",
      fa: "برنامه‌های پرس‌وجو، پردازشگر، امنیت، ممیزی و ترکیب کلاینت، موارد استفاده را هماهنگ می‌کنند بی‌آنکه خود به مدل حوزه تبدیل شوند.",
    },
    tags: ["query-application", "audit-application", "client-composition"],
  },
  {
    number: "04",
    title: { en: "Infrastructure & transport", fa: "زیرساخت و انتقال" },
    copy: {
      en: "Persistence, synchronization, observability, messaging, and delivery remain separated implementation concerns.",
      fa: "ماندگاری، همگام‌سازی، مشاهده‌پذیری، پیام‌رسانی و تحویل، دغدغه‌های پیاده‌سازیِ جداگانه باقی می‌مانند.",
    },
    tags: ["persistence-sqlite", "sync-transport", "observability"],
  },
];

const evidenceItems = [
  {
    Icon: Github,
    label: { en: "Source repository", fa: "مخزن منبع" },
    title: { en: "ONYX workspace", fa: "فضای کاری ONYX" },
    copy: {
      en: "Inspect the public workspace, client surfaces, documentation, and automation evidence.",
      fa: "فضای کاری عمومی، سطح‌های کلاینت، مستندات و شواهد خودکارسازی را بررسی کنید.",
    },
    href: "https://github.com/SMozaff/Onyx-Framwork",
    action: { en: "Open repository", fa: "باز کردن مخزن" },
  },
  {
    Icon: FileCode2,
    label: { en: "Implementation record", fa: "سابقه پیاده‌سازی" },
    title: { en: "Architecture & verification", fa: "معماری و راستی‌آزمایی" },
    copy: {
      en: "Review the published project record, delivered scope, and stated limitations.",
      fa: "سابقه منتشرشده پروژه، محدوده تحویل‌شده و محدودیت‌های اعلام‌شده را بررسی کنید.",
    },
    href: "https://SMozaff.github.io/",
    action: { en: "View project record", fa: "مشاهده سابقه پروژه" },
  },
  {
    Icon: BookOpenText,
    label: { en: "Methodology", fa: "روش‌شناسی" },
    title: { en: "IFEM doctrine", fa: "دکترین IFEM" },
    copy: {
      en: "Read the interface-first engineering principles that inform the ONYX architecture.",
      fa: "اصول مهندسی مبتنی بر رابط را که معماری ONYX را شکل می‌دهند مطالعه کنید.",
    },
    href: "https://IFEM-doctrine.github.io/",
    action: { en: "Read doctrine", fa: "مطالعه دکترین" },
  },
] as const;

const text = {
  pageTitle: {
    en: "ONYX Tectosilicate Framework | Systems Architecture Case Study",
    fa: "چارچوب تکتوسیلیکات ONYX | مطالعه موردی معماری سامانه‌ها",
  },
  caseStudySections: { en: "Case study sections", fa: "بخش‌های مطالعه موردی" },
  overviewLink: { en: "ONYX Framework overview", fa: "مرور کلی چارچوب ONYX" },
  caseStudyRecord: { en: "Case study record", fa: "پرونده مطالعه موردی" },
  recordSummary: { en: "Local-first mission operations architecture.", fa: "معماری عملیات مأموریت با رویکرد محلی‌محور." },
  viewSource: { en: "View source", fa: "مشاهده منبع" },
  mobileSections: { en: "Mobile case study sections", fa: "بخش‌های مطالعه موردی در موبایل" },
  toggleTheme: { en: "Toggle color theme", fa: "تغییر حالت رنگ" },
  toggleNavigation: { en: "Toggle navigation", fa: "تغییر وضعیت ناوبری" },
  systemsArchitecture: { en: "SYSTEMS ARCHITECTURE / CASE STUDY", fa: "معماری سامانه‌ها / مطالعه موردی" },
  sourceRepository: { en: "Source repository", fa: "مخزن منبع" },
  framework: { en: "ONYX FRAMEWORK", fa: "چارچوب ONYX" },
  heroTitleStart: { en: "Operational intelligence,", fa: "هوشمندی عملیاتی،" },
  heroTitleEmphasis: { en: "for complex systems.", fa: "برای سامانه‌های پیچیده." },
  heroLead: {
    en: "A framework and operational environment for designing, coordinating, and verifying complex software systems.",
    fa: "چارچوب و محیطی عملیاتی برای طراحی، هماهنگی و راستی‌آزمایی سامانه‌های نرم‌افزاری پیچیده.",
  },
  heroBody: {
    en: "ONYX brings secure workflows, traceable decisions, controlled access, and architecture that remains understandable as systems grow.",
    fa: "ONYX جریان‌های کاری امن، تصمیم‌های قابل‌ردیابی، دسترسی کنترل‌شده و معماری‌ای را کنار هم می‌آورد که با رشد سامانه‌ها همچنان قابل‌فهم می‌ماند.",
  },
  exploreExperience: { en: "Explore the experience", fa: "مشاهده تجربه" },
  traceImplementation: { en: "Trace the implementation", fa: "بررسی پیاده‌سازی" },
  repositoryRecord: { en: "REPOSITORY RECORD", fa: "سابقه مخزن" },
  implementation: { en: "Implementation", fa: "پیاده‌سازی" },
  rustWorkspace: { en: "Rust-centric workspace", fa: "فضای کاری متمرکز بر Rust" },
  clientSurfaces: { en: "Client surfaces", fa: "سطح‌های کلاینت" },
  clientSurfaceValue: { en: "Web · Desktop · Mobile", fa: "وب · دسکتاپ · موبایل" },
  projectStance: { en: "Project stance", fa: "وضعیت پروژه" },
  projectStanceValue: { en: "In progress; scope stated", fa: "در حال توسعه؛ محدوده مشخص" },
  capabilitiesKicker: { en: "01 / CAPABILITIES", fa: "۰۱ / قابلیت‌ها" },
  capabilitiesTitle: { en: "Designed for operational environments where reliability matters.", fa: "برای محیط‌های عملیاتی که قابلیت اتکا در آن‌ها اهمیت دارد، طراحی شده است." },
  capabilitiesBody: {
    en: "ONYX keeps operational work legible: each responsibility has a clear boundary, each decision can carry evidence, and each new capability has an intentional place to connect.",
    fa: "ONYX کار عملیاتی را شفاف نگه می‌دارد: هر مسئولیت مرزی روشن دارد، هر تصمیم می‌تواند شواهد همراه داشته باشد و هر قابلیت تازه جایگاهی هدفمند برای اتصال پیدا می‌کند.",
  },
  experienceKicker: { en: "02 / ONYX EXPERIENCE", fa: "۰۲ / تجربه ONYX" },
  experienceTitle: { en: "Operational interfaces for real work.", fa: "رابط‌های عملیاتی برای کار واقعی." },
  experienceBody: {
    en: "Product evidence anchors the case study in the surfaces teams use to access, coordinate, and review mission-critical work.",
    fa: "شواهد محصول، مطالعه موردی را در رابط‌هایی ریشه می‌دهد که تیم‌ها برای دسترسی، هماهنگی و بازبینی کارهای حساس به مأموریت استفاده می‌کنند.",
  },
  productScreen: { en: "PRODUCT SCREEN", fa: "نمای محصول" },
  interfaceEvidence: { en: "Interface evidence from ONYX", fa: "شواهد رابط از ONYX" },
  architectureKicker: { en: "03 / ARCHITECTURE", fa: "۰۳ / معماری" },
  architectureTitle: { en: "Independent layers, shared system intent.", fa: "لایه‌های مستقل، با نیت مشترک برای سامانه." },
  architectureBody: {
    en: "The workspace groups modules by architectural role rather than one undifferentiated application layer. The question that follows is why those boundaries matter.",
    fa: "فضای کاری، ماژول‌ها را بر اساس نقش معماری گروه‌بندی می‌کند، نه در یک لایه کاربردی نامتمایز. پرسش بعدی این است که چرا این مرزها اهمیت دارند.",
  },
  ifemKicker: { en: "04 / WHY THIS ARCHITECTURE?", fa: "۰۴ / چرا این معماری؟" },
  ifemTitle: { en: "IFEM principles make the boundaries intentional.", fa: "اصول IFEM مرزها را هدفمند می‌کنند." },
  ifemBody: {
    en: "ONYX demonstrates Interface-First Engineering Methodology in practice. IFEM informs the framework’s engineering discipline; it is not an ONYX runtime dependency, product layer, or replacement identity.",
    fa: "ONYX روش‌شناسی مهندسی مبتنی بر رابط را در عمل نشان می‌دهد. IFEM به انضباط مهندسی چارچوب جهت می‌دهد؛ وابستگی زمان اجرا، لایه محصول یا هویت جایگزین ONYX نیست.",
  },
  readIfem: { en: "Read IFEM doctrine", fa: "مطالعه دکترین IFEM" },
  ifemPrinciples: [
    { number: "01", title: { en: "Boundary", fa: "مرز" }, copy: { en: "Make the responsibility line explicit.", fa: "خط مسئولیت را صریح کنید." } },
    { number: "02", title: { en: "Contract", fa: "قرارداد" }, copy: { en: "Define shared rules before scale.", fa: "پیش از مقیاس‌پذیری، قواعد مشترک را تعریف کنید." } },
    { number: "03", title: { en: "Owner", fa: "مالک" }, copy: { en: "Keep accountability legible.", fa: "پاسخ‌گویی را قابل‌فهم نگه دارید." } },
    { number: "04", title: { en: "Evidence", fa: "شواهد" }, copy: { en: "Verify agreement in observable ways.", fa: "توافق را با روش‌های قابل مشاهده راستی‌آزمایی کنید." } },
  ],
  evidenceKicker: { en: "05 / TECHNICAL EVIDENCE", fa: "۰۵ / شواهد فنی" },
  evidenceTitle: { en: "Claims point back to the work.", fa: "ادعاها به خودِ کار ارجاع می‌دهند." },
  evidenceBody: {
    en: "The case study links to source material and published records instead of substituting narrative for technical evidence.",
    fa: "مطالعه موردی به‌جای جایگزین کردن شواهد فنی با روایت، به منبع‌ها و سابقه‌های منتشرشده پیوند می‌دهد.",
  },
  scopeNote: { en: "Scope note.", fa: "یادداشت محدوده." },
  scopeBody: {
    en: "ONYX is presented as an in-progress architecture. Public records distinguish delivered components from incomplete or unverified areas.",
    fa: "ONYX به‌عنوان معماری در حال توسعه ارائه شده است. سابقه‌های عمومی، اجزای تحویل‌شده را از حوزه‌های ناقص یا راستی‌آزمایی‌نشده متمایز می‌کنند.",
  },
  developerTitle: { en: "A framework for building the next generation of operational systems.", fa: "چارچوبی برای ساخت نسل بعدی سامانه‌های عملیاتی." },
  developedBy: { en: "DEVELOPED BY", fa: "توسعه‌یافته توسط" },
  developerRole: { en: "Software Engineer · Systems Architect", fa: "مهندس نرم‌افزار · معمار سامانه‌ها" },
  builtWith: { en: "BUILT WITH", fa: "ساخته‌شده با" },
  doctrineBody: { en: "Interface-first engineering for explicit, reviewable system boundaries.", fa: "مهندسی مبتنی بر رابط برای مرزهای سامانه‌ای صریح و قابل بازبینی." },
  backToTop: { en: "Back to top", fa: "بازگشت به ابتدا" },
};

export function resolveLocaleFromLanguages(languages: readonly string[]): Locale {
  const supportedLanguage = languages.find((language) => /^(fa|en)(-|$)/i.test(language));
  return supportedLanguage?.toLowerCase().startsWith("fa") ? "fa" : "en";
}

function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "en";

  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  return resolveLocaleFromLanguages(browserLanguages);
}

function LanguageControl({ locale, onSelect }: { locale: Locale; onSelect: (next: Locale) => void }) {
  return (
    <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-white/15 dark:bg-white/5" aria-label="Language selector">
      <button type="button" lang="en" aria-pressed={locale === "en"} onClick={() => onSelect("en")} className={`rounded-md px-2.5 py-1 text-xs font-bold transition ${locale === "en" ? "bg-[#082348] text-white shadow-sm" : "text-slate-600 hover:text-[#082348] dark:text-slate-300 dark:hover:text-white"}`}>EN</button>
      <button type="button" lang="fa" dir="rtl" aria-pressed={locale === "fa"} onClick={() => onSelect("fa")} className={`rounded-md px-2.5 py-1 text-xs font-bold transition ${locale === "fa" ? "bg-[#082348] text-white shadow-sm" : "text-slate-600 hover:text-[#082348] dark:text-slate-300 dark:hover:text-white"}`}>فارسی</button>
    </div>
  );
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const isRtl = locale === "fa";
  const t = (value: Localized) => value[locale];
  const ArrowDown = isRtl ? ArrowDownLeft : ArrowDownRight;
  const ArrowUp = isRtl ? ArrowUpLeft : ArrowUpRight;
  const Chevron = isRtl ? ChevronLeft : ChevronRight;

  useEffect(() => {
    const initialDark = window.localStorage.getItem("onyx-theme") === "dark";
    const savedLocale = window.localStorage.getItem("onyx-locale");
    const initialLocale: Locale = savedLocale === "fa" || savedLocale === "en" ? savedLocale : detectBrowserLocale();

    setDark(initialDark);
    setLocale(initialLocale);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.title = t(text.pageTitle);
  }, [isRtl, locale]);

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.35, 0.65] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const selectLocale = (next: Locale) => {
    setLocale(next);
    // A manual selection always takes precedence over future browser-language detection.
    window.localStorage.setItem("onyx-locale", next);
    setMenuOpen(false);
  };

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("onyx-theme", next ? "dark" : "light");
  };

  return (
    <div lang={locale} dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#06172c] dark:text-slate-50">
      <aside className={`fixed inset-y-0 z-30 hidden w-64 flex-col border-white/10 bg-[#071f43] p-5 text-white lg:flex ${isRtl ? "right-0 border-l" : "left-0 border-r"}`}>
        <a href="#overview" onClick={(event) => { event.preventDefault(); scrollTo("overview"); }} aria-label={t(text.overviewLink)} className="rounded-2xl bg-white p-3 shadow-sm">
          <img width={512} height={512} src={ASSETS.brandLogo} alt="ONYX Tectosilicate Framework" className="h-28 w-full object-contain" />
        </a>
        <div className="my-6 h-px bg-white/15" />
        <nav aria-label={t(text.caseStudySections)} className="space-y-1">
          {navItems.map(({ number, label, id }) => (
            <button key={id} type="button" onClick={() => scrollTo(id)} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${isRtl ? "text-right" : "text-left"} ${activeSection === id ? "bg-white text-[#082348] shadow-sm" : "text-slate-200 hover:bg-white/10 hover:text-white"}`}>
              <span className="w-5 text-[10px] font-bold tracking-wider opacity-60" dir="ltr">{number}</span>
              <span className="flex-1 font-semibold">{t(label)}</span>
              <Chevron className="h-4 w-4 opacity-50 transition group-hover:translate-x-0.5" />
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl border border-white/15 bg-white/5 p-4 text-xs text-slate-300">
          <p className="mb-2 font-semibold uppercase tracking-[0.18em] text-white">{t(text.caseStudyRecord)}</p>
          <p className="leading-6">{t(text.recordSummary)}</p>
          <a href="https://github.com/SMozaff/Onyx-Framwork" target="_blank" rel="noreferrer" dir="ltr" className={`mt-3 inline-flex items-center gap-1 font-semibold text-white hover:text-sky-200 ${isRtl ? "flex-row-reverse" : ""}`}>{t(text.viewSource)} <ArrowUp className="h-3.5 w-3.5" /></a>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-[#07182f]/95 lg:hidden">
        <a href="#overview" onClick={(event) => { event.preventDefault(); scrollTo("overview"); }} aria-label={t(text.overviewLink)} className="w-24 rounded-lg bg-white p-1.5">
          <img width={512} height={512} src={ASSETS.brandLogo} alt="ONYX Tectosilicate Framework" className="h-12 w-full object-contain" />
        </a>
        <div className="flex items-center gap-2" dir="ltr">
          <LanguageControl locale={locale} onSelect={selectLocale} />
          <button type="button" onClick={toggleTheme} aria-label={t(text.toggleTheme)} className="rounded-lg border border-slate-200 p-2 dark:border-white/15">{dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</button>
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={t(text.toggleNavigation)} className="rounded-lg bg-[#082348] p-2 text-white">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
        {menuOpen && <nav aria-label={t(text.mobileSections)} className="absolute inset-x-0 top-full border-b border-slate-200 bg-white p-3 shadow-lg dark:border-white/10 dark:bg-[#07182f]">{navItems.map(({ number, label, id }) => <button key={id} type="button" onClick={() => scrollTo(id)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 font-medium hover:bg-slate-100 dark:hover:bg-white/10 ${isRtl ? "text-right" : "text-left"}`}><span className="text-xs text-slate-500" dir="ltr">{number}</span><span>{t(label)}</span></button>)}</nav>}
      </header>

      <main className={isRtl ? "lg:mr-64" : "lg:ml-64"}>
        <header className={`hidden min-h-20 items-center justify-between border-b border-slate-200 bg-white px-8 dark:border-white/10 dark:bg-[#07182f] lg:flex ${isRtl ? "flex-row-reverse" : ""}`}>
          <div className={`flex items-center gap-5 ${isRtl ? "flex-row-reverse" : ""}`}><img width={1200} height={400} src={ASSETS.brandWordmark} alt="ONYX Tectosilicate Framework" className={`h-10 w-40 object-contain ${isRtl ? "object-right" : "object-left"}`} /><span className={`border-slate-200 text-xs font-bold tracking-[0.2em] text-slate-500 dark:border-white/15 dark:text-slate-300 ${isRtl ? "border-r pr-5" : "border-l pl-5"}`}>{t(text.systemsArchitecture)}</span></div>
          <div className={`flex items-center gap-4 ${isRtl ? "flex-row-reverse" : ""}`}><a href="https://github.com/SMozaff/Onyx-Framwork" target="_blank" rel="noreferrer" dir="ltr" className={`inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#1467b8] dark:text-slate-100 ${isRtl ? "flex-row-reverse" : ""}`}><Github className="h-4 w-4" /> {t(text.sourceRepository)}</a><LanguageControl locale={locale} onSelect={selectLocale} /><button type="button" onClick={toggleTheme} aria-label={t(text.toggleTheme)} className="rounded-lg border border-slate-200 p-2 dark:border-white/15">{dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</button></div>
        </header>

        <section id="overview" className="scroll-mt-20 overflow-hidden bg-[#eff5fa] px-5 py-16 dark:bg-[#07182f] sm:px-8 lg:min-h-[720px] lg:px-14 lg:py-24">
          <div className={`mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-center ${isRtl ? "lg:[&>div:first-child]:order-2" : ""}`}>
            <div className={isRtl ? "text-right" : "text-left"}>
              <div className={`mb-6 flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-[#1269b8] ${isRtl ? "justify-end" : ""}`}><span className="h-2 w-2 rounded-full bg-emerald-500" /> {t(text.framework)}</div>
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-[#082348] dark:text-white sm:text-6xl lg:text-7xl">{t(text.heroTitleStart)} <em className="font-normal text-[#287bc2]">{t(text.heroTitleEmphasis)}</em></h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">{t(text.heroLead)}</p>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">{t(text.heroBody)}</p>
              <div className={`mt-8 flex flex-wrap gap-3 ${isRtl ? "justify-end" : ""}`}><button type="button" onClick={() => scrollTo("experience")} className={`inline-flex items-center gap-2 rounded-xl bg-[#082348] px-5 py-3 font-semibold text-white transition hover:bg-[#1467b8] ${isRtl ? "flex-row-reverse" : ""}`}>{t(text.exploreExperience)} <ArrowDown className="h-4 w-4" /></button><a href="https://github.com/SMozaff/Onyx-Framwork" target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:border-[#1467b8] hover:text-[#1467b8] dark:border-white/20 dark:text-white ${isRtl ? "flex-row-reverse" : ""}`}>{t(text.traceImplementation)} <ArrowUp className="h-4 w-4" /></a></div>
            </div>
            <aside className={`rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 dark:border-white/10 dark:bg-white/5 dark:shadow-none ${isRtl ? "text-right" : "text-left"}`}><img width={1200} height={400} src={ASSETS.brandWordmark} alt="ONYX Framework" className="mb-8 h-16 w-full object-contain" /><p className="text-xs font-bold tracking-[0.18em] text-slate-500 dark:text-slate-300">{t(text.repositoryRecord)}</p><dl className="mt-5 space-y-4 text-sm"><div className="flex justify-between gap-4 border-b border-slate-100 pb-4 dark:border-white/10"><dt className="text-slate-500 dark:text-slate-300">{t(text.implementation)}</dt><dd className="font-semibold">{t(text.rustWorkspace)}</dd></div><div className="flex justify-between gap-4 border-b border-slate-100 pb-4 dark:border-white/10"><dt className="text-slate-500 dark:text-slate-300">{t(text.clientSurfaces)}</dt><dd className="font-semibold">{t(text.clientSurfaceValue)}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500 dark:text-slate-300">{t(text.projectStance)}</dt><dd className="font-semibold">{t(text.projectStanceValue)}</dd></div></dl></aside>
          </div>
        </section>

        <section id="capabilities" className="scroll-mt-20 px-5 py-16 sm:px-8 lg:px-14 lg:py-24">
          <div className="mx-auto max-w-6xl"><div className={`grid gap-8 lg:grid-cols-[0.72fr_1.28fr] ${isRtl ? "text-right" : "text-left"}`}><div><p className="text-xs font-bold tracking-[0.2em] text-[#1467b8]">{t(text.capabilitiesKicker)}</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{t(text.capabilitiesTitle)}</h2></div><p className="max-w-xl self-end text-lg leading-8 text-slate-600 dark:text-slate-300">{t(text.capabilitiesBody)}</p></div><div className="mt-12 grid gap-4 sm:grid-cols-2">{capabilities.map(({ title, copy }, index) => <article key={title.en} className={`rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/5 ${isRtl ? "text-right" : "text-left"}`}><span className="text-xs font-bold text-[#1467b8]" dir="ltr">0{index + 1}</span><h3 className="mt-4 text-xl font-semibold">{t(title)}</h3><p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{t(copy)}</p></article>)}</div></div>
        </section>

        <section id="experience" className="scroll-mt-20 bg-slate-100 px-5 py-16 dark:bg-[#0a213c] sm:px-8 lg:px-14 lg:py-24">
          <div className="mx-auto max-w-6xl"><div className={`max-w-3xl ${isRtl ? "text-right" : "text-left"}`}><p className="text-xs font-bold tracking-[0.2em] text-[#1467b8]">{t(text.experienceKicker)}</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{t(text.experienceTitle)}</h2><p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">{t(text.experienceBody)}</p></div><div className="mt-12 space-y-10">{productScreens.map(({ image, width, height, title, copy }, index) => { const imageSecond = isRtl ? index % 2 === 0 : index % 2 === 1; return <article key={title.en} className={`grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#07182f] lg:grid-cols-2 ${imageSecond ? "lg:[&>div:first-child]:order-2" : ""}`}><div className="bg-[#e9f0f6] p-3 dark:bg-[#0d2b4b]"><img width={width} height={height} src={image} alt={`${t(title)} ${locale === "en" ? "interface screenshot" : "نمای رابط"}`} className="h-full w-full rounded-2xl border border-slate-200 object-cover shadow-sm dark:border-white/10" loading={index === 0 ? "eager" : "lazy"} /></div><div className={`flex flex-col justify-center p-8 sm:p-12 ${isRtl ? "text-right" : "text-left"}`}><span className="text-xs font-bold tracking-[0.2em] text-[#1467b8]"><span dir="ltr">0{index + 1}</span> / {t(text.productScreen)}</span><h3 className="mt-4 text-3xl font-semibold">{t(title)}</h3><p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">{t(copy)}</p><div className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1467b8] ${isRtl ? "flex-row-reverse self-end" : ""}`}><CheckCircle2 className="h-4 w-4" /> {t(text.interfaceEvidence)}</div></div></article>; })}</div></div>
        </section>

        <section id="architecture" className="scroll-mt-20 px-5 py-16 sm:px-8 lg:px-14 lg:py-24"><div className="mx-auto max-w-6xl"><div className={`grid gap-8 lg:grid-cols-[0.72fr_1.28fr] ${isRtl ? "text-right" : "text-left"}`}><div><p className="text-xs font-bold tracking-[0.2em] text-[#1467b8]">{t(text.architectureKicker)}</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{t(text.architectureTitle)}</h2></div><p className="max-w-xl self-end text-lg leading-8 text-slate-600 dark:text-slate-300">{t(text.architectureBody)}</p></div><div className="mt-12 grid gap-4 md:grid-cols-2">{architectureLayers.map(({ number, title, copy, tags }) => <article key={number} className={`rounded-2xl border border-slate-200 p-6 dark:border-white/10 ${isRtl ? "text-right" : "text-left"}`}><span className="text-sm font-bold text-[#1467b8]" dir="ltr">{number}</span><h3 className="mt-3 text-xl font-semibold">{t(title)}</h3><p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{t(copy)}</p><div className={`mt-5 flex flex-wrap gap-2 ${isRtl ? "justify-end" : ""}`} dir="ltr">{tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-white/10 dark:text-slate-200">{tag}</span>)}</div></article>)}</div></div></section>

        <section id="ifem" className="scroll-mt-20 bg-[#082348] px-5 py-16 text-white sm:px-8 lg:px-14 lg:py-24"><div className={`mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.9fr] ${isRtl ? "lg:[&>div:first-child]:order-2" : ""}`}><div className={isRtl ? "text-right" : "text-left"}><p className="text-xs font-bold tracking-[0.2em] text-sky-300">{t(text.ifemKicker)}</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{t(text.ifemTitle)}</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">{t(text.ifemBody)}</p><a href="https://IFEM-doctrine.github.io/" target="_blank" rel="noreferrer" className={`mt-8 inline-flex items-center gap-2 rounded-xl border border-sky-300/50 px-5 py-3 font-semibold text-white hover:bg-white/10 ${isRtl ? "flex-row-reverse" : ""}`}>{t(text.readIfem)} <ArrowUp className="h-4 w-4" /></a></div><div className="space-y-4">{text.ifemPrinciples.map(({ number, title, copy }) => <div key={number} className={`flex gap-5 rounded-2xl border border-white/15 bg-white/5 p-5 ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}><span className="font-bold text-sky-300" dir="ltr">{number}</span><div><h3 className="font-semibold">{t(title)}</h3><p className="mt-1 text-sm leading-6 text-slate-300">{t(copy)}</p></div></div>)}</div></div></section>

        <section id="evidence" className="scroll-mt-20 px-5 py-16 sm:px-8 lg:px-14 lg:py-24"><div className="mx-auto max-w-6xl"><div className={`max-w-3xl ${isRtl ? "text-right" : "text-left"}`}><p className="text-xs font-bold tracking-[0.2em] text-[#1467b8]">{t(text.evidenceKicker)}</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{t(text.evidenceTitle)}</h2><p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">{t(text.evidenceBody)}</p></div><div className="mt-12 grid gap-5 md:grid-cols-3">{evidenceItems.map(({ Icon, label, title, copy, href, action }) => <article key={title.en} className={`rounded-2xl border border-slate-200 p-6 dark:border-white/10 ${isRtl ? "text-right" : "text-left"}`}><Icon className={`h-6 w-6 text-[#1467b8] ${isRtl ? "mr-auto" : ""}`} /><p className="mt-5 text-xs font-bold tracking-[0.16em] text-slate-500 dark:text-slate-300">{t(label)}</p><h3 className="mt-3 text-xl font-semibold">{t(title)}</h3><p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{t(copy)}</p><a href={href} target="_blank" rel="noreferrer" className={`mt-6 inline-flex items-center gap-2 font-semibold text-[#1467b8] ${isRtl ? "flex-row-reverse" : ""}`}>{t(action)} <ArrowUp className="h-4 w-4" /></a></article>)}</div><div className={`mt-8 flex gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950 dark:border-emerald-700/40 dark:bg-emerald-900/20 dark:text-emerald-100 ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" /><p><b>{t(text.scopeNote)}</b> {t(text.scopeBody)}</p></div></div></section>

        <section id="developer" className="scroll-mt-20 bg-[#06172c] px-5 py-16 text-white sm:px-8 lg:px-14 lg:py-24"><div className="mx-auto max-w-6xl"><div className={`rounded-3xl border border-white/15 bg-white/5 p-8 sm:p-12 ${isRtl ? "text-right" : "text-left"}`}><img width={1200} height={400} src={ASSETS.brandWordmark} alt="ONYX Framework" className={`h-16 w-52 object-contain ${isRtl ? "object-right" : "object-left"}`} /><p className="mt-8 text-xs font-bold tracking-[0.2em] text-sky-300">{t(text.framework)}</p><h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">{t(text.developerTitle)}</h2><div className="mt-10 grid gap-8 border-t border-white/15 pt-8 md:grid-cols-2"><div><p className="text-xs font-bold tracking-[0.18em] text-slate-400">{t(text.developedBy)}</p><h3 className="mt-2 text-2xl font-semibold">Suhail Muzaffari</h3><p className="mt-2 text-slate-300">{t(text.developerRole)}</p></div><div><p className="text-xs font-bold tracking-[0.18em] text-slate-400">{t(text.builtWith)}</p><h3 className="mt-2 text-2xl font-semibold">IFEM Doctrine</h3><p className="mt-2 text-slate-300">{t(text.doctrineBody)}</p></div></div><div className={`mt-10 flex flex-wrap gap-4 ${isRtl ? "justify-end" : ""}`}><a href="https://SMozaff.github.io/" target="_blank" rel="noreferrer" dir="ltr" className={`inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[#082348] hover:bg-sky-100 ${isRtl ? "flex-row-reverse" : ""}`}>SMozaff.github.io <ArrowUp className="h-4 w-4" /></a><a href="https://IFEM-doctrine.github.io/" target="_blank" rel="noreferrer" dir="ltr" className={`inline-flex items-center gap-2 rounded-xl border border-white/25 px-5 py-3 font-semibold text-white hover:bg-white/10 ${isRtl ? "flex-row-reverse" : ""}`}>IFEM-doctrine.github.io <ArrowUp className="h-4 w-4" /></a></div></div><footer className={`mt-8 flex flex-col justify-between gap-4 border-t border-white/15 pt-6 text-sm text-slate-400 sm:flex-row ${isRtl ? "sm:flex-row-reverse" : ""}`}><span>{t(text.framework)} · {t(text.caseStudyRecord)} / 2026</span><a href="#overview" onClick={(event) => { event.preventDefault(); scrollTo("overview"); }} className={`inline-flex items-center gap-2 font-semibold text-white hover:text-sky-200 ${isRtl ? "flex-row-reverse" : ""}`}>{t(text.backToTop)} <ArrowUp className="h-4 w-4" /></a></footer></div>
        </section>
      </main>
    </div>
  );
}
