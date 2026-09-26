import { ArrowLeft, ArrowRight, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import SiteHeader, { getInitialTheme } from "./SiteHeader";

type Locale = "en" | "fa";
type Theme = "light" | "dark";

const copy = {
  en: {
    tag: "ONYX / مشتریان و مطالعات موردی",
    eyebrow: "REFERENCE SCENARIOS",
    title: "BUILT FOR OPERATIONS WHERE CONTINUITY MATTERS.",
    intro:
      "ONYX is designed for organizations where people, work, decisions, and evidence need to stay connected across changing locations and conditions.",
    product: "Product",
    solutions: "Solutions",
    architecture: "Architecture",
    security: "Security",
    contact: "Contact",
    language: "فارسی",
    light: "Light mode",
    dark: "Dark mode",
    home: "Back to home",
    evidenceLabel: "PUBLIC EVIDENCE BOUNDARY",
    evidenceTitle: "Reference scenarios, not invented customer claims.",
    evidenceBody:
      "No named customer deployments, testimonials, quantified business outcomes, or production case studies are published here unless they are supported by a verifiable public record. The scenarios below are illustrative operating models derived from ONYX's documented product capabilities.",
    scenarios: [
      {
        number: "01",
        label: "DEFENSE & GOVERNMENT",
        title: "Command with distributed execution.",
        body:
          "A headquarters or operations center coordinates missions while authorized teams operate from field locations. Local execution can continue through connectivity disruption, with authority boundaries, mission state, evidence, and synchronization remaining part of the operating model.",
        flow: ["Authority", "Mission", "Field execution", "Evidence", "Reconciliation"],
        value: [
          "Separate operational authority from broad awareness.",
          "Keep mission and task state tied to accountable actors.",
          "Preserve an operational record across disconnected work.",
        ],
      },
      {
        number: "02",
        label: "SPACE OPERATIONS",
        title: "Mission work across constrained links.",
        body:
          "Mission teams may work across control environments where communication windows, link availability, and operational timing constrain collaboration. ONYX's local-first and synchronization model provides a reference architecture for maintaining local operational state and reconciling distributed changes when communication is available.",
        flow: ["Local state", "Mission work", "Constrained link", "Sync", "Verified state"],
        value: [
          "Continue locally composed work when a link is unavailable.",
          "Make synchronization state explicit rather than implicit.",
          "Connect decisions, work, evidence, and resulting state.",
        ],
      },
      {
        number: "03",
        label: "EMERGENCY RESPONSE",
        title: "Coordinate when infrastructure is degraded.",
        body:
          "An incident can fragment teams across command posts, field units, and temporary coordination sites. ONYX provides a reference model for keeping operational work, assignments, decisions, evidence, and authority connected while network conditions change.",
        flow: ["Incident", "Assignments", "Field updates", "Decisions", "Operational record"],
        value: [
          "Maintain a shared operational model across changing locations.",
          "Tie decisions and action items to the incident record.",
          "Retain evidence and accountability after the response.",
        ],
      },
      {
        number: "04",
        label: "CRITICAL INFRASTRUCTURE",
        title: "Keep control visible across sites.",
        body:
          "Utilities and other critical operators may need coordination between central teams and remote facilities. ONYX can model organizational boundaries, authority, work, policy, evidence, and synchronization as one governed operational system rather than separate communication trails.",
        flow: ["Site", "Authority", "Work", "Policy", "Audit"],
        value: [
          "Represent site and organizational boundaries explicitly.",
          "Keep operational actions subject to authorization.",
          "Make the resulting record reconstructable after the event.",
        ],
      },
    ],
    fitLabel: "05 / CUSTOMER FIT",
    fitTitle: "The common requirement is controlled continuity.",
    fitBody:
      "The strongest fit is not defined by industry alone. It is defined by an operating environment where work must remain controlled and explainable while people, locations, connectivity, and authority change.",
    fitItems: [
      ["DISTRIBUTED", "Teams, sites, or operational cells work across organizational or geographic boundaries."],
      ["DISRUPTED", "Connectivity may be degraded, intermittent, unavailable, or restored later."],
      ["AUTHORIZED", "Execution must be constrained by identity, role, reporting line, client capability, or policy."],
      ["EVIDENCE-DRIVEN", "Decisions, actions, approvals, files, reports, and operational history need to remain connected."],
      ["RECONSTRUCTABLE", "After the operation, the organization needs to understand who did what, under which authority, and what happened next."],
    ],
    proofLabel: "06 / EVALUATION",
    proofTitle: "Turn the model into operational proof.",
    proofBody:
      "A customer evaluation should validate the actual environment rather than assume that a marketing scenario proves deployment readiness. The evaluation path should move from a scoped operational workflow to technical validation, then deployment/security review and commercial/legal scoping. Evidence can include connectivity behavior, local execution, synchronization, authorization, conflict handling, auditability, recovery, deployment topology, and the customer's own operational constraints.",
    proofItems: [
      ["CONNECTIVITY", "Test the operating model across available, degraded, unavailable, and restored network states."],
      ["AUTHORITY", "Verify that permitted execution follows the customer's real roles, boundaries, and delegation model."],
      ["SYNCHRONIZATION", "Exercise distributed changes and inspect how resulting state and conflicts are represented."],
      ["EVIDENCE", "Trace a decision through work, approval, evidence, and resulting operational state."],
      ["RECOVERY", "Validate restart, replay, backup, recovery, and operational reconstruction requirements for the target deployment."],
      ["DEPLOYMENT", "Confirm whether the target model is hosted, self-managed, hybrid, or otherwise constrained by the customer environment."],
      ["COMMERCIAL BOUNDARY", "Define the license scope, ONYX background IP, customer data/confidential information, and any custom-development treatment before production commitment."],
    ],
    finalLabel: "07 / NEXT",
    finalTitle: "Bring the operation, not just the industry.",
    finalBody:
      "For a product or enterprise discussion, describe your operating environment, locations, connectivity profile, authority model, critical workflows, and deployment constraints. The evaluation should start from those facts.",
    cta: "Discuss an operational evaluation",
  },
  fa: {
    tag: "ONYX / مشتریان و مطالعات موردی",
    eyebrow: "سناریوهای مرجع",
    title: "برای عملیاتی ساخته شده است که تداوم در آن اهمیت دارد.",
    intro:
      "ONYX برای سازمان‌هایی طراحی شده است که در آن‌ها افراد، کار، تصمیم‌ها و شواهد باید در مکان‌ها و شرایط متغیر به هم متصل بمانند.",
    product: "محصول",
    solutions: "راهکارها",
    architecture: "معماری",
    security: "امنیت",
    contact: "تماس",
    language: "فارسی",
    light: "حالت روشن",
    dark: "حالت تاریک",
    home: "بازگشت به خانه",
    evidenceLabel: "مرز شواهد عمومی",
    evidenceTitle: "سناریوهای مرجع، نه ادعاهای ساختگی مشتری.",
    evidenceBody:
      "تا زمانی که استقرار مشتری، نقل‌قول، نتیجه کمی یا مطالعه موردی تولیدی با یک رکورد عمومی قابل راستی‌آزمایی پشتیبانی نشود، در این صفحه منتشر نمی‌شود. سناریوهای زیر مدل‌های عملیاتی نمونه هستند که از قابلیت‌های مستند ONYX استخراج شده‌اند.",
    scenarios: [
      {
        number: "۰۱",
        label: "دفاع و دولت",
        title: "فرماندهی با اجرای توزیع‌شده.",
        body:
          "ستاد یا مرکز عملیات مأموریت‌ها را هماهنگ می‌کند و تیم‌های مجاز از نقاط میدانی کار می‌کنند. اجرای محلی می‌تواند در زمان اختلال ارتباط ادامه یابد و مرزهای اختیار، وضعیت مأموریت، شواهد و همگام‌سازی بخشی از همان مدل عملیاتی باقی بمانند.",
        flow: ["اختیار", "مأموریت", "اجرای میدانی", "شواهد", "تطبیق"],
        value: [
          "اختیار عملیاتی را از آگاهی گسترده جدا کنید.",
          "وضعیت مأموریت و کار را به عامل مسئول متصل نگه دارید.",
          "رکورد عملیاتی را میان کارهای قطع‌ارتباط‌شده حفظ کنید.",
        ],
      },
      {
        number: "۰۲",
        label: "عملیات فضایی",
        title: "کار مأموریت در لینک‌های محدود.",
        body:
          "تیم‌های مأموریت ممکن است در محیط‌هایی کار کنند که پنجره‌های ارتباطی، دسترس‌پذیری لینک و زمان‌بندی عملیاتی همکاری را محدود می‌کند. مدل محلی‌محور و همگام‌سازی ONYX یک معماری مرجع برای حفظ وضعیت محلی و تطبیق تغییرات توزیع‌شده هنگام دسترس‌پذیری ارتباط فراهم می‌کند.",
        flow: ["وضعیت محلی", "کار مأموریت", "لینک محدود", "همگام‌سازی", "وضعیت تأییدشده"],
        value: [
          "کار محلی را هنگام قطع لینک ادامه دهید.",
          "وضعیت همگام‌سازی را صریح نگه دارید.",
          "تصمیم، کار، شواهد و وضعیت حاصل را به هم متصل کنید.",
        ],
      },
      {
        number: "۰۳",
        label: "پاسخ اضطراری",
        title: "هماهنگی هنگام اختلال زیرساخت.",
        body:
          "یک حادثه می‌تواند تیم‌ها را میان مراکز فرماندهی، واحدهای میدانی و سایت‌های موقت هماهنگی پراکنده کند. ONYX مدل مرجعی برای حفظ اتصال کار عملیاتی، تخصیص‌ها، تصمیم‌ها، شواهد و اختیار در حال تغییر شرایط شبکه ارائه می‌کند.",
        flow: ["حادثه", "تخصیص", "به‌روزرسانی میدانی", "تصمیم", "رکورد عملیاتی"],
        value: [
          "مدل عملیاتی مشترک را میان مکان‌های متغیر حفظ کنید.",
          "تصمیم‌ها و اقدامات را به رکورد حادثه متصل کنید.",
          "پس از پاسخ، شواهد و پاسخ‌گویی را حفظ کنید.",
        ],
      },
      {
        number: "۰۴",
        label: "زیرساخت حیاتی",
        title: "کنترل را میان سایت‌ها قابل مشاهده نگه دارید.",
        body:
          "شرکت‌های خدماتی و دیگر اپراتورهای حیاتی ممکن است به هماهنگی میان تیم‌های مرکزی و سایت‌های دورافتاده نیاز داشته باشند. ONYX می‌تواند مرزهای سازمانی، اختیار، کار، سیاست، شواهد و همگام‌سازی را به‌عنوان یک سامانه عملیاتی تحت حاکمیت مدل کند.",
        flow: ["سایت", "اختیار", "کار", "سیاست", "ممیزی"],
        value: [
          "مرزهای سایت و سازمان را صریح مدل کنید.",
          "اقدامات عملیاتی را مشمول مجوزدهی نگه دارید.",
          "رکورد حاصل را پس از رویداد قابل بازسازی کنید.",
        ],
      },
    ],
    fitLabel: "۰۵ / تناسب مشتری",
    fitTitle: "نیاز مشترک، تداوم کنترل‌شده است.",
    fitBody:
      "تناسب قوی صرفاً با صنعت تعریف نمی‌شود؛ با محیطی تعریف می‌شود که در آن کار باید هنگام تغییر افراد، مکان‌ها، اتصال و اختیار همچنان کنترل‌شده و قابل توضیح باقی بماند.",
    fitItems: [
      ["توزیع‌شده", "تیم‌ها، سایت‌ها یا سلول‌های عملیاتی میان مرزهای سازمانی یا جغرافیایی کار می‌کنند."],
      ["مختل‌شده", "اتصال ممکن است ضعیف، متناوب، قطع یا بعداً بازیابی شود."],
      ["مجاز", "اجرا باید با هویت، نقش، خط گزارش‌دهی، قابلیت کلاینت یا سیاست محدود شود."],
      ["شواهدمحور", "تصمیم‌ها، اقدامات، تأییدها، فایل‌ها، گزارش‌ها و تاریخچه عملیاتی باید به هم متصل بمانند."],
      ["قابل بازسازی", "پس از عملیات باید مشخص باشد چه کسی، تحت چه اختیاری، چه کاری انجام داده و سپس چه رخ داده است."],
    ],
    proofLabel: "۰۶ / ارزیابی",
    proofTitle: "مدل را به شواهد عملیاتی تبدیل کنید.",
    proofBody:
      "ارزیابی مشتری باید محیط واقعی را اعتبارسنجی کند و فرض نکند که یک سناریوی بازاریابی اثبات آمادگی استقرار است. ارزیابی واقعی می‌تواند قطع ارتباط، اجرای محلی، همگام‌سازی، مجوزدهی، تعارض، ممیزی، بازیابی و محدودیت‌های محیط مشتری را بررسی کند.",
    proofItems: [
      ["اتصال", "مدل عملیاتی را در حالت‌های شبکه موجود، ضعیف، قطع و بازیابی‌شده آزمایش کنید."],
      ["اختیار", "بررسی کنید اجرای مجاز از نقش‌ها، مرزها و تفویض اختیار واقعی مشتری پیروی می‌کند."],
      ["همگام‌سازی", "تغییرات توزیع‌شده را اجرا و نحوه نمایش وضعیت و تعارض‌ها را بررسی کنید."],
      ["شواهد", "یک تصمیم را از طریق کار، تأیید، شواهد و وضعیت حاصل دنبال کنید."],
      ["بازیابی", "الزامات راه‌اندازی مجدد، replay، پشتیبان‌گیری، بازیابی و بازسازی عملیات را اعتبارسنجی کنید."],
    ],
    finalLabel: "۰۷ / گام بعد",
    finalTitle: "خود عملیات را بیاورید، نه فقط نام صنعت.",
    finalBody:
      "برای گفت‌وگوی محصول یا سازمانی، محیط عملیاتی، مکان‌ها، الگوی اتصال، مدل اختیار، جریان‌های حیاتی و محدودیت‌های استقرار خود را توضیح دهید. ارزیابی باید از همین واقعیت‌ها آغاز شود.",
    cta: "گفت‌وگو درباره ارزیابی عملیاتی",
  },
} as const;

export default function CustomersPage({ locale }: { locale: Locale }) {
  const rtl = locale === "fa";
  const c = copy[locale];
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const href = (page: string) => (page ? `/${locale}/${page}/` : `/${locale}/`);
  const Arrow = rtl ? ArrowRight : ArrowLeft;

  useEffect(() => {
    const stored = window.localStorage.getItem("onyx-theme") as Theme | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(stored === "dark" || stored === "light" ? stored : preferred);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("onyx-theme", theme);
  }, [theme]);

  return (
    <main className={`customers-page customers-page--${theme}`} dir={rtl ? "rtl" : "ltr"}>
      <SiteHeader locale={locale} theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} activePage="customers" />

      <section className="customers-hero">
        <div className="customers-grid" aria-hidden="true" />
        <div className="shell-content customers-hero__inner">
          <div className="customers-kicker"><span />{c.tag}</div>
          <p className="customers-eyebrow">{c.eyebrow}</p>
          <h1>{c.title}</h1>
          <p className="customers-intro">{c.intro}</p>
        </div>
      </section>

      <section className="customers-boundary">
        <div className="shell-content customers-two-col">
          <div>
            <span className="customers-label">{c.evidenceLabel}</span>
            <h2>{c.evidenceTitle}</h2>
          </div>
          <p>{c.evidenceBody}</p>
        </div>
      </section>

      <section className="customers-scenarios">
        <div className="shell-content">
          {c.scenarios.map((scenario) => (
            <article className="customers-scenario" key={scenario.number}>
              <div className="customers-scenario__index">{scenario.number}</div>
              <div className="customers-scenario__main">
                <span className="customers-label">{scenario.label}</span>
                <h2>{scenario.title}</h2>
                <p className="customers-scenario__body">{scenario.body}</p>
                <div className="customers-flow" aria-label={rtl ? "جریان عملیاتی" : "Operational flow"}>
                  {scenario.flow.map((step, index) => (
                    <span key={step}><b>{String(index + 1).padStart(2, "0")}</b>{step}</span>
                  ))}
                </div>
                <ul className="customers-value">
                  {scenario.value.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="customers-fit">
        <div className="shell-content customers-two-col">
          <div>
            <span className="customers-label">{c.fitLabel}</span>
            <h2>{c.fitTitle}</h2>
            <p>{c.fitBody}</p>
          </div>
          <div className="customers-fit-list">
            {c.fitItems.map(([label, body]) => (
              <article key={label}><span>{label}</span><p>{body}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="customers-proof">
        <div className="shell-content customers-two-col">
          <div>
            <span className="customers-label">{c.proofLabel}</span>
            <h2>{c.proofTitle}</h2>
          </div>
          <div>
            <p className="customers-proof__intro">{c.proofBody}</p>
            <div className="customers-proof-list">
              {c.proofItems.map(([label, body]) => (
                <article key={label}><span>{label}</span><p>{body}</p></article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="customers-final">
        <div className="shell-content customers-final__inner">
          <div>
            <span className="customers-label">{c.finalLabel}</span>
            <h2>{c.finalTitle}</h2>
            <p>{c.finalBody}</p>
          </div>
          <a className="customers-action" href={href("contact")}>{c.cta}</a>
        </div>
      </section>

      <footer className="customers-footer">
        <div className="shell-content customers-footer__inner">
          <a href={href("")}><Arrow size={15} />{c.home}</a>
          <span>ONYX / CUSTOMER FIT</span>
        </div>
      </footer>
    </main>
  );
}
