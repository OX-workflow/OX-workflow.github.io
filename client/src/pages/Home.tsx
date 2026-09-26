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
import { commercialMessage } from "../content/commercial";

type Locale = "en" | "fa";
type Localized = { en: string; fa: string };

const assets = {
  authority: "/assets/product/mission-operations.png",
  execution: "/assets/product/operational-overview.png",
  nexus: "/assets/product/secure-browser-access.webp",
  signalMark: "/assets/onyx-symbol.svg",
  wideLogoLight: "/assets/onyx-horizontal-light.svg",
  wideLogoDark: "/assets/onyx-horizontal-dark.svg",
};

const text = {
  hero: {
    supporting: {
      en: "One place to plan the operation, coordinate the people, execute the work, and keep the record.",
      fa: "یک مکان برای برنامه‌ریزی عملیات، هماهنگی افراد، اجرای کار و حفظ سابقه.",
    },
    primary: { en: "See the operating model", fa: "مدل عملیاتی را ببینید" },
    secondary: { en: "Explore the product", fa: "محصول را ببینید" },
    status: { en: "Operational clarity", fa: "شفافیت عملیاتی" },
    state: { en: "CONNECTED", fa: "متصل" },
    scroll: { en: "See how it works", fa: "نحوه کار را ببینید" },
  },
  problem: {
    tag: { en: "01 / The problem", fa: "۰۱ / مسئله" },
    title: { en: "The operation is bigger than the tools around it.", fa: "عملیات از ابزارهایی که پیرامون آن هستند بزرگ‌تر است." },
    body: {
      en: "Plans live in one place. Conversations in another. Decisions, files, approvals, and evidence become separate trails. The operation becomes harder to see, coordinate, and explain.",
      fa: "برنامه‌ها یک‌جا هستند، گفت‌وگوها جای دیگر و تصمیم‌ها، فایل‌ها، تأییدها و شواهد به ردپاهای جداگانه تبدیل می‌شوند. در نتیجه دیدن، هماهنگ کردن و توضیح دادن عملیات دشوارتر می‌شود.",
    },
    result: { en: "One operational record.", fa: "یک سابقه عملیاتی واحد." },
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
    title: { en: "See the whole operation.", fa: "کل عملیات را ببینید." },
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
    title: { en: "From intent to record.", fa: "از نیت تا سابقه." },
    body: {
      en: "The operation stays connected as it moves from objective to plan, execution, decision, verification, and history.",
      fa: "با حرکت عملیات از هدف به برنامه، اجرا، تصمیم، راستی‌آزمایی و سابقه، ارتباط میان اجزای آن حفظ می‌شود.",
    },
    steps: [
      { en: "Objective", fa: "هدف" },
      { en: "Plan", fa: "برنامه" },
      { en: "Coordinate", fa: "هماهنگی" },
      { en: "Execute", fa: "اجرا" },
      { en: "Decide", fa: "تصمیم" },
      { en: "Verify", fa: "راستی‌آزمایی" },
      { en: "Remember", fa: "ثبت" },
    ],
  },
  accountability: {
    tag: { en: "05 / Accountability", fa: "۰۵ / پاسخ‌گویی" },
    title: { en: "Keep decisions attached to the work.", fa: "تصمیم‌ها را به کار متصل نگه دارید." },
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
    title: { en: "When conditions change, the record stays.", fa: "وقتی شرایط تغییر می‌کند، سابقه باقی می‌ماند." },
    body: {
      en: "ONYX is designed for operations where connectivity, teams, and circumstances can change without losing the operational context.",
      fa: "ONYX برای عملیات‌هایی طراحی شده است که در آن اتصال، تیم‌ها و شرایط می‌توانند تغییر کنند بدون آنکه زمینه عملیاتی از بین برود.",
    },
    points: [
      { en: "Local operational state", fa: "وضعیت عملیاتی محلی" },
      { en: "Controlled synchronization", fa: "همگام‌سازی کنترل‌شده" },
      { en: "Deployment flexibility", fa: "انعطاف در استقرار" },
    ],
  },
  cta: {
    tag: { en: "Mission Operations Platform", fa: "پلتفرم عملیات مأموریتی" },
    title: { en: "Make the operation the system.", fa: "خود عملیات را به سامانه تبدیل کنید." },
    body: {
      en: "Explore ONYX as a product. When you need the engineering underneath it, go deeper into Technology.",
      fa: "ONYX را به‌عنوان محصول بررسی کنید. هر زمان به مهندسی زیرساخت آن نیاز داشتید، وارد بخش فناوری شوید.",
    },
    demo: { en: "Request a demo", fa: "درخواست دمو" },
    technology: { en: "Explore technology", fa: "بررسی فناوری" },
  },
};

const modelIcons = [Target, Network, ShieldCheck, History];

const lifecycleDescriptions: Localized[] = [
  { en: "Define what needs to happen.", fa: "مشخص کنید چه چیزی باید انجام شود." },
  { en: "Turn intent into an operational plan.", fa: "نیت را به برنامه عملیاتی تبدیل کنید." },
  { en: "Keep people and responsibilities aligned.", fa: "افراد و مسئولیت‌ها را هم‌راستا نگه دارید." },
  { en: "Move the work forward.", fa: "کار را به پیش ببرید." },
  { en: "Record decisions where they matter.", fa: "تصمیم‌ها را در جای درست ثبت کنید." },
  { en: "Confirm the evidence and outcome.", fa: "شواهد و نتیجه را تأیید کنید." },
  { en: "Keep the history for what comes next.", fa: "سابقه را برای ادامه کار حفظ کنید." },
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
          <div className="authority-showcase shell-content">
            <div className="authority-showcase__image">
              <img src={assets.authority} alt="ONYX mission operations interface" width="1440" height="1000" loading="lazy" decoding="async" />
              <div className="image-corner image-corner--tl" /><div className="image-corner image-corner--br" />
            </div>
            <div className="authority-showcase__copy">
              <span className="mono-label">{t(commercialMessage.category)}</span>
              <h3>{t(text.experience.title)}</h3>
              <p>{t(text.experience.body)}</p>
              <ul className="check-list">{text.experience.points.map((point) => <li key={point.en}><Check size={14} />{t(point)}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="execution section-shell">
          <div className="execution__image-wrap"><img src={assets.execution} alt="ONYX operational overview interface" width="1440" height="1000" loading="lazy" decoding="async" /><div className="execution__image-fade" /></div>
          <div className="shell-content execution__content">
            <div className="section-heading"><SignalTag>{t(text.lifecycle.tag)}</SignalTag><h2>{t(text.lifecycle.title)}</h2><p>{t(text.lifecycle.body)}</p></div>
            <div className="execution-path">
              {text.lifecycle.steps.map((stage, index) => (
                <div className="execution-path__item" key={stage.en}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{t(stage)}</strong>
                  <i title={t(lifecycleDescriptions[index])} />
                </div>
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
              <ArrowAction href="/${locale}/architecture/" rtl={isRtl}>{t(text.cta.technology)}</ArrowAction>
            </div>
          </div>
        </section>
      </main>

      <button className={"back-to-top " + (scrolled ? "back-to-top--visible" : "")} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label={isRtl ? "بازگشت به بالا" : "Back to top"}><ArrowUp size={17} /></button>

      <footer className="site-footer">
        <div className="shell-content site-footer__content">
          <div className="site-footer__brand"><img src={theme === "dark" ? assets.wideLogoDark : assets.wideLogoLight} alt="ONYX — Mission Operations Platform" className="site-footer__wide-logo" width="1320" height="360" loading="eager" decoding="async" /></div>
          <div className="site-footer__right"><span>© {new Date().getFullYear()} ONYX</span><span><a href="https://smozaff.github.io/" target="_blank" rel="noreferrer">Soheil Mozaffari</a> · <a href="mailto:Soheil.Mozaffari@gmail.com">Soheil.Mozaffari@gmail.com</a></span></div>
        </div>
      </footer>
    </div>
  );
}
