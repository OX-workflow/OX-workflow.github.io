import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  History,
  Network,
  ShieldCheck,
  Target,
} from "lucide-react";
import SiteHeader, { getInitialTheme } from "./SiteHeader";
import OperationalDemo from "../components/OperationalDemo";
import { commercialMessage } from "../content/commercial";

type Locale = "en" | "fa";
type Localized = { en: string; fa: string };

const assets = {
  nexus: "/assets/product/secure-browser-access.webp",
  signalMark: "/assets/onyx-symbol.svg",
  wideLogoLight: "/assets/onyx-horizontal-light.svg",
  wideLogoDark: "/assets/onyx-horizontal-dark.svg",
};

const text = {
  hero: {
    supporting: {
      en: "One place to plan the operation, coordinate the people, execute the work, and keep the record.",
      fa: "یک محیط یکپارچه برای برنامه‌ریزی عملیات، هماهنگی افراد، پیشبرد کار و ثبت سوابق.",
    },
    primary: { en: "See the operating model", fa: "مدل عملیاتی را ببینید" },
    secondary: { en: "Explore the product", fa: "محصول را ببینید" },
    status: { en: "Operational clarity", fa: "شفافیت عملیاتی" },
    state: { en: "CONNECTED", fa: "متصل" },
    scroll: { en: "See how it works", fa: "نحوه کار را ببینید" },
  },
  problem: {
    tag: { en: "01 / The problem", fa: "۰۱ / مسئله" },
    title: { en: "The operation is bigger than the tools around it.", fa: "خودِ عملیات از ابزارهای پیرامونش فراتر است." },
    body: {
      en: "Plans live in one place. Conversations in another. Decisions, files, approvals, and evidence become separate trails. The operation becomes harder to see, coordinate, and explain.",
      fa: "برنامه‌ها یک‌جا هستند، گفت‌وگوها جای دیگر و تصمیم‌ها، فایل‌ها، تأییدها و شواهد به ردپاهای جداگانه تبدیل می‌شوند. در نتیجه دیدن، هماهنگ کردن و توضیح دادن عملیات دشوارتر می‌شود.",
    },
    result: { en: "One operational record.", fa: "یک سابقه یکپارچه از عملیات." },
  },
  model: {
    tag: { en: "02 / The operating model", fa: "۰۲ / مدل عملیاتی" },
    title: { en: "Four things the operation needs.", fa: "چهار چیزی که عملیات نیاز دارد." },
    body: {
      en: "ONYX keeps the operating model simple on the surface. The depth stays underneath.",
      fa: "ONYX مدل عملیاتی را در سطح ساده نگه می‌دارد؛ پیچیدگی در لایه‌های زیرین باقی می‌ماند.",
    },
  },
  experience: {
    tag: { en: "03 / The product", fa: "۰۳ / محصول" },
    title: { en: "See the whole operation.", fa: "کل عملیات را یک‌جا ببینید." },
    body: {
      en: "Bring objectives, people, work, decisions, and evidence into the same operational view.",
      fa: "هدف‌ها، افراد، کار، تصمیم‌ها و شواهد را در یک نمای عملیاتی واحد کنار هم قرار دهید.",
    },
    points: [
      { en: "Know what needs to happen.", fa: "بدانید چه چیزی باید انجام شود." },
      { en: "Know who is responsible.", fa: "بدانید چه کسی مسئول است." },
      { en: "See what changed.", fa: "ببینید چه چیزی تغییر کرده است." },
    ],
  },
  lifecycle: {
    tag: { en: "04 / The lifecycle", fa: "۰۴ / چرخه عملیات" },
    title: { en: "From intent to record.", fa: "از هدف تا سابقه." },
    body: {
      en: "The operation stays connected as it moves from objective to plan, execution, decision, verification, and history.",
      fa: "از تعیین هدف و برنامه‌ریزی تا اجرا، تصمیم‌گیری، راستی‌آزمایی و ثبت سوابق، همه اجزای عملیات در یک جریان به هم متصل می‌مانند.",
    },
    steps: [
      { en: "Objective", fa: "هدف" },
      { en: "Plan", fa: "برنامه" },
      { en: "Coordinate", fa: "هماهنگی" },
      { en: "Execute", fa: "اجرا" },
      { en: "Decide", fa: "تصمیم" },
      { en: "Verify", fa: "راستی‌آزمایی" },
      { en: "Remember", fa: "ثبت سوابق" },
    ],
  },
  accountability: {
    tag: { en: "05 / Accountability", fa: "۰۵ / پاسخ‌گویی" },
    title: { en: "Keep decisions attached to the work.", fa: "تصمیم‌ها را در کنار کاری که بر آن اثر می‌گذارند ثبت و پیگیری کنید." },
    body: {
      en: "ONYX preserves the context around an outcome: who acted, what changed, which decision governed the work, and what evidence supports the result.",
      fa: "ONYX زمینه پیرامون یک نتیجه را حفظ می‌کند: چه کسی اقدام کرد، چه چیزی تغییر کرد، کدام تصمیم بر کار حاکم بود و چه شواهدی نتیجه را پشتیبانی می‌کند.",
    },
    completed: { en: "Work completed", fa: "کار تکمیل شد" },
    verified: { en: "Evidence verified", fa: "شواهد راستی‌آزمایی شد" },
    recorded: { en: "Operational history retained", fa: "تاریخچه عملیاتی حفظ شد" },
  },
  continuity: {
    tag: { en: "06 / Continuity", fa: "۰۶ / تداوم" },
    title: { en: "When conditions change, the record stays.", fa: "وقتی شرایط عوض می‌شود، سابقه عملیات از بین نمی‌رود." },
    body: {
      en: "ONYX is designed for operations where connectivity, teams, and circumstances can change without losing the operational context.",
      fa: "ONYX برای عملیاتی طراحی شده است که در آن تیم‌ها، شرایط و کیفیت ارتباط مدام تغییر می‌کنند، اما نباید زمینه و سابقه کار از دست برود.",
    },
    points: [
      { en: "Local operational state", fa: "وضعیت عملیاتی روی دستگاه" },
      { en: "Controlled synchronization", fa: "همگام‌سازی مدیریت‌شده" },
      { en: "Deployment flexibility", fa: "انعطاف در استقرار" },
    ],
  },
  cta: {
    tag: { en: "Mission Operations Platform", fa: "پلتفرم عملیات مأموریتی" },
    title: { en: "Make the operation the system.", fa: "عملیات را به محور اصلی کار تبدیل کنید." },
    body: {
      en: "Explore ONYX as a product. When you need the engineering underneath it, go deeper into Technology.",
      fa: "ONYX را به‌عنوان محصول بررسی کنید. هر زمان به مهندسی زیرساخت آن نیاز داشتید، وارد بخش فناوری شوید.",
    },
    demo: { en: "Request a demo", fa: "درخواست جلسه دمو" },
    technology: { en: "Explore technology", fa: "بررسی فناوری" },
  },

  commercialFrame: {
    tag: { en: "08 / Commercial frame", fa: "۰۸ / چارچوب تجاری" },
    title: { en: "Built around the operation behind the tools.", fa: "برای خودِ عملیات، نه فقط ابزارهای پیرامون آن." },
    body: {
      en: "Five questions make the product easier to understand: who it is for, why it exists, how it can be deployed, what makes the operating record trustworthy, and how it is commercialized.",
      fa: "پنج سؤال، تصویر روشن‌تری از محصول می‌دهند: برای چه کسانی ساخته شده، چرا وجود دارد، چگونه مستقر می‌شود، چه چیزی سابقه عملیات را قابل اتکا می‌کند و مدل تجاری آن چیست.",
    },
    cards: [
      {
        key: "who",
        title: { en: "Who ONYX is for", fa: "ONYX برای چه کسانی است" },
        body: {
          en: "Teams responsible for complex, high-accountability operations where authority, evidence, continuity, and reconstruction matter.",
          fa: "تیم‌هایی که مسئول عملیات پیچیده و حساس‌اند؛ جایی که اختیار، شواهد، تداوم و امکان بازسازی رویدادها اهمیت دارد.",
        },
        link: { en: "See representative operating patterns", fa: "سناریوهای واقعیِ کاربرد را ببینید" },
        href: "solutions",
      },
      {
        key: "why",
        title: { en: "Why ONYX", fa: "چرا ONYX" },
        body: {
          en: "Execution is not enough. ONYX connects authority, work, decisions, evidence, and history so the operation stays understandable while it runs and explainable afterward.",
          fa: "فقط انجام دادن کار کافی نیست. ONYX اختیار، کار، تصمیم‌ها، شواهد و سوابق را به هم وصل می‌کند تا روند عملیات هم حین اجرا روشن باشد و هم بعداً بتوان آن را توضیح داد.",
        },
        link: { en: "Explore the product model", fa: "مدل محصول را بررسی کنید" },
        href: "product",
      },
      {
        key: "deployment",
        title: { en: "Deployment", fa: "استقرار" },
        body: {
          en: "Commercial paths include hosted subscription, enterprise self-hosted / on-premise deployment, and customized enterprise editions.",
          fa: "مدل‌های تجاری شامل اشتراک ابری، استقرار اختصاصی در زیرساخت سازمان و نسخه‌های سفارشی سازمانی است.",
        },
        link: { en: "See licensing and deployment", fa: "مجوز و استقرار را ببینید" },
        href: "pricing",
      },
      {
        key: "trust",
        title: { en: "Trust", fa: "اعتماد" },
        body: {
          en: "Explicit authority, controlled approvals, evidence, synchronization, and audit keep actions connected to the context that governs them.",
          fa: "اختیار مشخص، فرایند تأیید، شواهد، همگام‌سازی و ممیزی کمک می‌کنند هر اقدام در همان زمینه‌ای ثبت شود که آن را مجاز و هدایت کرده است.",
        },
        link: { en: "Inspect the trust layer", fa: "سازوکارهای اعتماد را بررسی کنید" },
        href: "security",
      },
      {
        key: "commercial",
        title: { en: "Commercial model", fa: "مدل تجاری" },
        body: {
          en: "ONYX is commercialized through subscriptions, enterprise licensing, and customized enterprise editions. Core ONYX IP remains proprietary.",
          fa: "ONYX از طریق اشتراک، مجوز سازمانی و نسخه‌های سفارشی سازمانی تجاری‌سازی می‌شود. مالکیت فکری هسته ONYX اختصاصی باقی می‌ماند.",
        },
        link: { en: "Explore enterprise options", fa: "گزینه‌های سازمانی را بررسی کنید" },
        href: "pricing",
      },
    ],
  },
};

const modelIcons = [Target, Network, ShieldCheck, History];

const lifecycleDescriptions: Localized[] = [
  { en: "Define what needs to happen.", fa: "اول مشخص کنید چه کاری باید انجام شود." },
  { en: "Turn intent into an operational plan.", fa: "هدف را به یک برنامه عملیاتی تبدیل کنید." },
  { en: "Keep people and responsibilities aligned.", fa: "افراد و مسئولیت‌ها را هماهنگ نگه دارید." },
  { en: "Move the work forward.", fa: "کار را جلو ببرید." },
  { en: "Record decisions where they matter.", fa: "تصمیم‌ها را همان‌جا که گرفته می‌شوند ثبت کنید." },
  { en: "Confirm the evidence and outcome.", fa: "شواهد و نتیجه را تأیید کنید." },
  { en: "Keep the history for what comes next.", fa: "سوابق را برای ادامه مسیر حفظ کنید." },
];

function resolveBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  return languages.some((language) => language.toLowerCase().startsWith("fa")) ? "fa" : "en";
}

function SignalTag({ children }: { children: React.ReactNode }) {
  return <div className="signal-tag"><span className="signal-tag__node" /><span>{children}</span></div>;
}

function ArrowAction({ children, href, solid = false, rtl = false }: { children: React.ReactNode; href: string; solid?: boolean; rtl?: boolean }) {
  const Arrow = rtl ? ArrowRight : ArrowLeft;
  return <a className={`arrow-action ${solid ? "arrow-action--solid" : ""}`} href={href}><Arrow size={15} strokeWidth={1.8} /><span>{children}</span></a>;
}

export default function Home({ initialLocale }: { initialLocale?: Locale }) {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);
  const [scrolled, setScrolled] = useState(false);
  const [locale, setLocale] = useState<Locale>(initialLocale ?? "en");
  const [activeModel, setActiveModel] = useState(0);
  const [activeLifecycle, setActiveLifecycle] = useState(0);
  const [heroActive, setHeroActive] = useState(false);
  const isRtl = locale === "fa";
  const t = (value: Localized) => value[locale];

  useEffect(() => {
    const preferred = initialLocale ?? resolveBrowserLocale();
    setLocale(preferred);
    document.documentElement.lang = preferred;
    document.documentElement.dir = preferred === "fa" ? "rtl" : "ltr";
  }, [initialLocale]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    if (!hero) return;

    const onPointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      hero.style.setProperty("--hero-pointer-x", x.toFixed(3));
      hero.style.setProperty("--hero-pointer-y", y.toFixed(3));
      setHeroActive(true);
    };
    const onPointerLeave = () => {
      hero.style.setProperty("--hero-pointer-x", "0");
      hero.style.setProperty("--hero-pointer-y", "0");
      setHeroActive(false);
    };

    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerleave", onPointerLeave);
    return () => {
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("onyx-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => current === "dark" ? "light" : "dark");
  const activeModelItem = commercialMessage.model[activeModel];
  const Chevron = isRtl ? ChevronRight : ChevronLeft;

  return (
    <div className="onyx-site" dir={isRtl ? "rtl" : "ltr"}>
      <SiteHeader locale={locale} theme={theme} onToggleTheme={toggleTheme} />

      <main id="top">
        <section className="hero section-shell hero--ready">
          <div className="hero__veil" />
          <div className="hero__grid" aria-hidden="true" />
          <div className="hero__ui-sample" aria-hidden="true">
            <img src="/assets/UI/UI%20lightmode1.webp" alt="" width="1600" height="1000" decoding="async" />
          </div>
          <div className={"hero__system " + (heroActive ? "hero__system--active" : "")} aria-hidden="true">
            <div className="hero__orbit hero__orbit--outer" />
            <div className="hero__orbit hero__orbit--middle" />
            <div className="hero__orbit hero__orbit--inner" />
            <div className="hero__core"><img src={assets.signalMark} alt="" width="512" height="512" decoding="async" /></div>
            <span className="hero__node hero__node--one" />
            <span className="hero__node hero__node--two" />
            <span className="hero__node hero__node--three" />
            <span className="hero__signal hero__signal--one" />
            <span className="hero__signal hero__signal--two" />
          </div>
          <div className="hero__content shell-content">
            <SignalTag>{t(commercialMessage.category)}</SignalTag>
            <h1>{t(commercialMessage.headline).split(". ")[0]}.<br /><em>{t(commercialMessage.headline).split(". ").slice(1).join(". ")}</em></h1>
            <p className="hero__lede">{t(commercialMessage.supporting)} {t(text.hero.supporting)}</p>
            <div className="hero__actions">
              <ArrowAction href="#operating-model" solid rtl={isRtl}>{t(text.hero.primary)}</ArrowAction>
              <ArrowAction href="#product" rtl={isRtl}>{t(text.hero.secondary)}</ArrowAction>
            </div>
          </div>
          <div className="hero__telemetry" aria-label={t(text.hero.status)}>
            <div className="telemetry-orbit"><span /><span /><span /></div>
            <div><span className="telemetry-label">{t(text.hero.status)}</span><strong>{t(text.hero.state)}</strong></div>
            <span className="telemetry-state">ONYX</span>
          </div>
          <a className="hero__scroll" href="#problem" aria-label={t(text.hero.scroll)}><span>{t(text.hero.scroll)}</span><ChevronDown size={16} /></a>
        </section>

        <div className="brand-bridge" aria-hidden="true">
          <div className="shell-content brand-bridge__content">
            <span className="brand-bridge__line" />
            <div className="brand-bridge__mark"><img src={assets.signalMark} alt="" width="512" height="512" decoding="async" /><strong>ONYX</strong></div>
            <span className="brand-bridge__statement">{t(commercialMessage.model[activeModel].description)}</span>
            <span className="brand-bridge__line" />
          </div>
        </div>


        <section id="problem" className="problem section-shell">
          <div className="shell-content split-grid split-grid--problem">
            <div className="section-intro">
              <SignalTag>{t(text.problem.tag)}</SignalTag>
              <h2>{t(text.problem.title)}</h2>
              <p>{t(text.problem.body)}</p>
            </div>
            <div className="fracture-board">
              <div className="fracture-board__caption"><span>{t(commercialMessage.category)}</span><span>{t(text.problem.result)}</span></div>
              {["Messages", "Documents", "Tasks", "Decisions", "Evidence"].map((item, index) => (
                <div className="fracture-row" key={item}>
                  <span className="fracture-row__index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="fracture-row__line" />
                  <span>{isRtl ? ["پیام‌ها", "اسناد", "کارها", "تصمیم‌ها", "شواهد"][index] : item}</span>
                  <CircleDot size={14} />
                </div>
              ))}
              <div className="signal-rule"><span /></div>
              <div className="fracture-board__result"><CircleDot size={16} /><span>{t(text.problem.result)}</span></div>
            </div>
          </div>
        </section>

        <section id="operating-model" className="philosophy section-shell">
          <div className="shell-content">
            <div className="philosophy__top">
              <SignalTag>{t(text.model.tag)}</SignalTag>
              <div><h2>{t(text.model.title)}</h2><p>{t(text.model.body)}</p></div>
            </div>
            <div className="logic-path" aria-label={t(text.model.title)}>
              {commercialMessage.model.map((item, index) => {
                const Icon = modelIcons[index];
                const active = index === activeModel;
                return (
                  <button
                    type="button"
                    className={`logic-path__step ${active ? "logic-path__step--final" : ""}`}
                    key={item.key}
                    onClick={() => setActiveModel(index)}
                    aria-pressed={active}
                  >
                    <span className="logic-path__number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="logic-path__dot"><Icon size={14} /></span>
                    <strong>{t(item.title)}</strong>
                  </button>
                );
              })}
            </div>
            <div className="shell-content" style={{ paddingInline: 0, marginTop: "2rem" }}>
              <div className="section-heading">
                <span className="mono-label">{t(activeModelItem.title)}</span>
                <h3>{t(activeModelItem.description)}</h3>
              </div>
            </div>
          </div>
        </section>

        <section id="product" className="platform section-shell">
          <div className="platform__backdrop" aria-hidden="true" />
          <div className="shell-content platform__intro">
            <div className="section-heading"><SignalTag>{t(text.experience.tag)}</SignalTag><h2>{t(text.experience.title)}</h2></div>
            <p>{t(text.experience.body)}</p>
          </div>
          <div className="authority-showcase authority-showcase--text-only shell-content">
            <div className="authority-showcase__copy">
              <span className="mono-label">{t(commercialMessage.category)}</span>
              <h3>{t(text.experience.title)}</h3>
              <p>{t(text.experience.body)}</p>
              <ul className="check-list">{text.experience.points.map((point) => <li key={point.en}><Check size={14} />{t(point)}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="execution execution--text-only section-shell">
          <div className="shell-content execution__content">
            <div className="section-heading"><SignalTag>{t(text.lifecycle.tag)}</SignalTag><h2>{t(text.lifecycle.title)}</h2><p>{t(text.lifecycle.body)}</p></div>
            <div className="execution-path" role="tablist" aria-label={t(text.lifecycle.title)}>
              {text.lifecycle.steps.map((stage, index) => {
                const active = index === activeLifecycle;
                return (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={"execution-path__item " + (active ? "execution-path__item--active" : "")}
                    key={stage.en}
                    onClick={() => setActiveLifecycle(index)}
                    onMouseEnter={() => setActiveLifecycle(index)}
                    onFocus={() => setActiveLifecycle(index)}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{t(stage)}</strong>
                    <i aria-hidden="true" />
                  </button>
                );
              })}
            </div>
            <div className="execution-path__detail" role="tabpanel">
              <span className="mono-label">{String(activeLifecycle + 1).padStart(2, "0")} / {t(text.lifecycle.steps[activeLifecycle])}</span>
              <p>{t(lifecycleDescriptions[activeLifecycle])}</p>
            </div>
          </div>
        </section>

        <OperationalDemo locale={locale} />
        <section className="demo-evidence demo-evidence--single section-shell" aria-label={locale === "fa" ? "شاهد محصول" : "Product proof"}>
          <div className="shell-content">
            <div className="demo-evidence__head">
              <div>
                <div className="signal-tag"><span className="signal-tag__node" /><span>{locale === "fa" ? "۰۶ / شاهد محصول" : "06 / Product proof"}</span></div>
                <h2>{locale === "fa" ? "یک عملیات." : "One operation."}<br /><em>{locale === "fa" ? "یک سطح واقعی." : "One real surface."}</em></h2>
              </div>
              <p>{locale === "fa" ? "نمای مأموریت در ONYX همان جریان دمو را به یک سطح واقعی محصول متصل می‌کند: وضعیت، اختیار، جزئیات مأموریت و خط زمانی تصمیم." : "The mission view connects the demo to one real product surface: status, authority, mission detail, and the decision timeline."}</p>
            </div>
            <figure className="homepage-proof">
              <div className="homepage-proof__image">
                <img src="/assets/product/Desktop7.webp?v=2026-09-26-2" alt={locale === "fa" ? "نمای مأموریت ONYX با وضعیت اختیار و خط زمانی" : "ONYX mission view showing authority state and operational timeline"} loading="lazy" decoding="async" />
                <span>{locale === "fa" ? "DESKTOP / 07 · جزئیات مأموریت و خط زمانی اختیار" : "DESKTOP / 07 · Mission detail & authority timeline"}</span>
              </div>
              <figcaption>{locale === "fa" ? "شاهد رابط کاربری برای همان سناریوی عملیاتی." : "Interface evidence for the same operational scenario."}</figcaption>
            </figure>
          </div>
        </section>

        <section className="ui-surfaces section-shell" aria-labelledby="ui-surfaces-title">
          <div className="shell-content">
            <div className="ui-surfaces__intro">
              <div>
                <SignalTag>{locale === "fa" ? "۰۷ / سطوح رابط" : "07 / Interface surfaces"}</SignalTag>
                <h2 id="ui-surfaces-title">
                  {locale === "fa" ? "همان مدل عملیاتی." : "The same operating model."}<br />
                  <em>{locale === "fa" ? "در سطح رابط." : "At the interface."}</em>
                </h2>
              </div>
              <p>
                {locale === "fa"
                  ? "نمونه‌های رابط روشن ONYX را به‌عنوان بخشی از زبان محصول ببینید؛ لایه‌های اطلاعاتی، وضعیت و اقدام در یک سیستم واحد کنار هم قرار می‌گیرند."
                  : "The light-mode ONYX surfaces are part of the product language: information, state, and action stay legible within one operational system."}
              </p>
            </div>
            <div className="ui-surfaces__grid">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <figure className="ui-surfaces__item" key={index}>
                  <div className="ui-surfaces__frame">
                    <img
                      src={`/assets/UI/UI%20lightmode${index}.webp`}
                      alt={locale === "fa" ? `نمونه رابط روشن ONYX شماره ${index}` : `ONYX light-mode interface sample ${index}`}
                      loading="lazy"
                      decoding="async"
                    />
                    <span>{String(index).padStart(2, "0")} / ONYX UI</span>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>


        <section className="commercial-frame section-shell" aria-labelledby="commercial-frame-title">
          <div className="shell-content">
            <div className="commercial-frame__intro">
              <div>
                <SignalTag>{t(text.commercialFrame.tag)}</SignalTag>
                <h2 id="commercial-frame-title">{t(text.commercialFrame.title)}</h2>
              </div>
              <p>{t(text.commercialFrame.body)}</p>
            </div>
            <div className="commercial-frame__grid">
              {text.commercialFrame.cards.map((card, index) => (
                <a key={card.key} className="commercial-frame__card" href={`/${locale}/${card.href}/`}>
                  <div className="commercial-frame__card-head">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <Chevron size={16} />
                  </div>
                  <h3>{t(card.title)}</h3>
                  <p>{t(card.body)}</p>
                  <span className="commercial-frame__link">{t(card.link)}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="accountability section-shell">
          <div className="shell-content accountability__layout">
            <div className="accountability__statement">
              <SignalTag>{t(text.accountability.tag)}</SignalTag>
              <h2>{t(text.accountability.title)}</h2>
              <p>{t(text.accountability.body)}</p>
            </div>
            <div className="verification-card">
              <div className="verification-card__meta"><span>ONYX / 042</span><span>{t(text.accountability.tag)}</span></div>
              <div className="verification-card__route">
                <div className="route-node route-node--done"><Check size={14} /><span>{t(text.accountability.completed)}</span></div>
                <span className="route-link" />
                <div className="route-node route-node--done"><ShieldCheck size={14} /><span>{t(text.accountability.verified)}</span></div>
                <span className="route-link" />
                <div className="route-node route-node--active"><BadgeCheck size={14} /><span>{t(text.accountability.recorded)}</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="continuity" className="enterprise section-shell">
          <img className="enterprise__visual" src={assets.nexus} alt="ONYX secure operational access interface" width="893" height="768" loading="lazy" decoding="async" />
          <div className="enterprise__overlay" />
          <div className="shell-content enterprise__content">
            <SignalTag>{t(text.continuity.tag)}</SignalTag>
            <h2>{t(text.continuity.title)}</h2>
            <p>{t(text.continuity.body)}</p>
            <div className="enterprise__specs">{text.continuity.points.map((point) => <span key={point.en}>{t(point)}</span>)}</div>
          </div>
          <div className="enterprise__badge"><span>ONYX // OPERATIONAL CONTINUITY</span></div>
        </section>

        <section id="technology-bridge" className="outcomes section-shell">
          <div className="shell-content">
            <div className="section-heading section-heading--wide">
              <SignalTag>{t(text.cta.tag)}</SignalTag>
              <h2>{t(text.cta.title)}</h2>
              <p>{t(text.cta.body)}</p>
            </div>
            <div className="outcomes-list">
              {[
                { en: "Product", fa: "محصول", copyEn: "Understand the operational experience.", copyFa: "تجربه عملیاتی را بشناسید." },
                { en: "Solutions", fa: "راهکارها", copyEn: "See how the model applies to real operations.", copyFa: "ببینید این مدل چگونه در عملیات واقعی به کار می‌آید." },
                { en: "Technology", fa: "فناوری", copyEn: "Open the engineering layer: architecture, security, synchronization, and deployment.", copyFa: "لایه مهندسی را ببینید: معماری، امنیت، همگام‌سازی و استقرار." },
              ].map((item, index) => (
                <a key={item.en} href={`/${locale}/${index === 0 ? "product" : index === 1 ? "solutions" : "architecture"}/`} className="outcome-row">
                  <span>{String(index + 1).padStart(2, "0")}</span><h3>{t(item)}</h3><p>{isRtl ? item.copyFa : item.copyEn}</p><Chevron size={20} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="final-cta section-shell">
          <div className="final-cta__rail" aria-hidden="true"><span /><span /><span /></div>
          <div className="shell-content final-cta__content">
            <img src={assets.signalMark} alt="" className="final-cta__mark" width="512" height="512" loading="lazy" decoding="async" />
            <SignalTag>{t(text.cta.tag)}</SignalTag>
            <h2>{t(text.cta.title)}</h2>
            <p>{t(text.cta.body)}</p>
            <div className="hero__actions">
              <ArrowAction href="mailto:Soheil.Mozaffari@gmail.com?subject=ONYX%20Enterprise%20Demo" solid rtl={isRtl}>{t(text.cta.demo)}</ArrowAction>
              <ArrowAction href={`/${locale}/architecture/`} rtl={isRtl}>{t(text.cta.technology)}</ArrowAction>
            </div>
          </div>
        </section>
      </main>

      <button className={"back-to-top " + (scrolled ? "back-to-top--visible" : "")} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label={isRtl ? "بازگشت به بالا" : "Back to top"}><ArrowUp size={17} /></button>

      <footer className="site-footer">
        <div className="shell-content site-footer__content">
          <div className="site-footer__brand"><img src={theme === "dark" ? assets.wideLogoDark : assets.wideLogoLight} alt="ONYX — Mission Operations Platform" className="site-footer__wide-logo" width="1320" height="360" loading="eager" decoding="async" /></div>
          <div className="site-footer__right"><span>© {new Date().getFullYear()} ONYX</span><span><a href="https://smozaff.github.io/" target="_blank" rel="noreferrer">Soheil Mozaffari</a> · <a href="mailto:Soheil.Mozaffari@gmail.com">Soheil.Mozaffari@gmail.com</a></span><span className="site-footer__powered">Powered by BOUND</span></div>
        </div>
      </footer>
    </div>
  );
}