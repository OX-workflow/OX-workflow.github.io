import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronRight, Moon, Sun } from "lucide-react";

type Locale = "en" | "fa";
type Theme = "light" | "dark";

const copy = {
  en: {
    nav: ["Product", "Solutions", "Architecture", "Security", "About", "Resources"],
    heroTag: "01 / Product",
    heroTitleA: "OPERATE",
    heroTitleB: "WITHOUT WAITING.",
    heroBody: "ONYX is a local-first mission operations platform for distributed teams. Work continues at the edge; state is synchronized when links permit; authority and operational history remain explicit.",
    primary: "Explore architecture",
    secondary: "Request a demo",
    modelTag: "02 / Operating model",
    modelTitleA: "Local.",
    modelTitleB: "Sync. Control.",
    modelBody: "The product separates execution from connectivity. A network can improve coordination without becoming a prerequisite for every operational action.",
    cards: [
      ["01", "LOCAL", "Execute where the work happens.", "Operational state remains available to the operator when connectivity is degraded or unavailable."],
      ["02", "SYNC", "Reconcile when links permit.", "Changes can be coordinated when connectivity returns, following defined system rules rather than ad-hoc recovery."],
      ["03", "CONTROL", "Keep authority explicit.", "Responsibility, decision paths, and operational ownership stay visible as work moves between people and systems."],
    ],
    flowTag: "03 / Product flow",
    flowTitleA: "From field",
    flowTitleB: "to operations center.",
    flowBody: "ONYX connects distributed execution with centralized operational visibility. The product model is designed around continuity first, then coordination.",
    flow: ["Local state", "Work / decide", "Record outcome", "Synchronize", "Operational view"],
    capabilityTag: "04 / Core capabilities",
    capabilityTitleA: "A platform for",
    capabilityTitleB: "operational continuity.",
    capabilities: [
      ["Local-first execution", "Keep operational work available at the point of action instead of making every action depend on a live network."],
      ["Controlled synchronization", "Bring distributed state back together through an explicit synchronization and reconciliation model."],
      ["Authority-aware operations", "Represent responsibility and decision authority as part of the operational model, not as a separate document."],
      ["Operational memory", "Preserve the state and history needed to understand what happened, what was verified, and what remains."],
      ["Distributed deployment", "Support operational environments where teams, devices, and links are geographically or logically distributed."],
      ["Verification-oriented execution", "Treat completion and verification as distinct operational states so outcomes can be made accountable."],
    ],
    deploymentTag: "05 / Product surface",
    deploymentTitleA: "Where ONYX",
    deploymentTitleB: "meets the operation.",
    deploymentBody: "The product architecture is intended to span the operator edge, team coordination, and operational oversight. Concrete deployment targets are documented separately from future platform work.",
    surfaces: [
      ["EDGE", "Operator surface", "Local execution and access to the operational state required at the point of work.", "Current model"],
      ["SYNC", "Coordination layer", "Controlled movement and reconciliation of distributed state as connectivity permits.", "Architecture"],
      ["OPS", "Operations center", "Shared visibility for coordination, verification, and operational control.", "Current model"],
    ],
    statusTag: "06 / Product status",
    statusTitleA: "Separate what exists",
    statusTitleB: "from what is planned.",
    statusBody: "ONYX documentation distinguishes the operating model from implementation commitments. This page describes the product model; architecture and roadmap pages should carry implementation-level detail.",
    status: [["CURRENT", "Product operating model", "Local-first continuity, controlled synchronization, explicit authority, and operational verification."], ["IN DEVELOPMENT", "Platform implementation", "Capabilities being translated into deployable product components."], ["PLANNED", "Future agent interface", "An agentic AI / plugin layer can use the operational model as a governed interface to execution."]],
    ctaTag: "07 / Next",
    ctaTitleA: "See the system",
    ctaTitleB: "behind the product.",
    ctaBody: "Move from the product model into the architecture, operational scenarios, or a direct conversation with the team.",
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
      ["۰۱", "LOCAL", "کار را همان‌جایی اجرا کنید که اتفاق می‌افتد.", "وضعیت عملیاتی هنگام افت یا قطع ارتباط برای اپراتور در دسترس می‌ماند."],
      ["۰۲", "SYNC", "وقتی ارتباط ممکن شد، همگام کنید.", "با بازگشت ارتباط، تغییرات طبق قواعد مشخص سامانه هماهنگ و تلفیق می‌شوند."],
      ["۰۳", "CONTROL", "اختیار را صریح نگه دارید.", "مسئولیت، مسیر تصمیم و مالکیت عملیاتی هنگام انتقال کار میان افراد و سامانه‌ها قابل مشاهده می‌ماند."],
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
    deploymentTag: "۰۵ / سطح محصول",
    deploymentTitleA: "ONYX کجا",
    deploymentTitleB: "با عملیات روبه‌رو می‌شود.",
    deploymentBody: "معماری محصول برای پوشش لبه اپراتور، هماهنگی تیم و نظارت عملیاتی طراحی شده است. اهداف استقرار قطعی باید از کارهای آینده پلتفرم جداگانه مستند شوند.",
    surfaces: [
      ["EDGE", "سطح اپراتور", "اجرای محلی و دسترسی به وضعیت عملیاتی موردنیاز در نقطه کار.", "مدل فعلی"],
      ["SYNC", "لایه هماهنگی", "انتقال و تلفیق کنترل‌شده وضعیت توزیع‌شده هنگام امکان ارتباط.", "معماری"],
      ["OPS", "مرکز عملیات", "دید مشترک برای هماهنگی، راستی‌آزمایی و کنترل عملیاتی.", "مدل فعلی"],
    ],
    statusTag: "۰۶ / وضعیت محصول",
    statusTitleA: "آنچه وجود دارد را",
    statusTitleB: "از برنامه آینده جدا کنید.",
    statusBody: "مستندات ONYX مدل عملیاتی را از تعهدات پیاده‌سازی جدا می‌کنند. این صفحه مدل محصول را توضیح می‌دهد؛ جزئیات فنی باید در معماری و نقشه راه بیایند.",
    status: [["CURRENT", "مدل عملیاتی محصول", "تداوم محلی‌محور، همگام‌سازی کنترل‌شده، اختیار صریح و راستی‌آزمایی عملیاتی."], ["IN DEVELOPMENT", "پیاده‌سازی پلتفرم", "قابلیت‌هایی که به اجزای قابل استقرار محصول تبدیل می‌شوند."], ["PLANNED", "رابط عامل آینده", "یک لایه Agentic AI / Plugin می‌تواند از مدل عملیاتی به‌عنوان رابطی تحت کنترل برای اجرا استفاده کند."]],
    ctaTag: "۰۷ / گام بعد",
    ctaTitleA: "سامانه را ببینید؛",
    ctaTitleB: "نه فقط محصول را.",
    ctaBody: "از مدل محصول به معماری، سناریوهای عملیاتی یا گفت‌وگوی مستقیم با تیم بروید.",
    architecture: "مشاهده معماری",
    solutions: "مشاهده راهکارها",
    contact: "تماس با تیم",
    themeLight: "حالت روشن",
    themeDark: "حالت تاریک",
    language: "English",
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
      <header className="product-header">
        <a className="product-header__logo" href={href(locale, "")}><img src={theme === "dark" ? "/assets/onyx-horizontal-dark.svg" : "/assets/onyx-horizontal-light.svg"} alt="ONYX" /></a>
        <nav>{t.nav.map((item, i) => <a key={item} href={href(locale, ["product","solutions","architecture","security","about","resources"][i])}>{item}</a>)}</nav>
        <div className="product-header__tools">
          <a className="product-header__lang" href={locale === "en" ? "/fa/product/" : "/en/product/"}>{t.language}</a>
          <button type="button" onClick={toggle} aria-label={theme === "dark" ? t.themeLight : t.themeDark}>{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</button>
          <a className="product-header__contact" href={href(locale, "contact")}>{t.secondary}<ChevronRight size={15} /></a>
        </div>
      </header>

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
            <div className="product-flow">{t.flow.map((item, i) => <div className="product-flow__item" key={item}><span>{String(i + 1).padStart(2, "0")}</span><strong>{item}</strong>{i < t.flow.length - 1 && <i />}</div>)}</div>
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
