import { ArrowLeft, ArrowRight, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import SiteHeader, { getInitialTheme } from "./SiteHeader";

type Locale = "en" | "fa";
type Theme = "light" | "dark";

const copy = {
  en: {
    tag: "ONYX / INVESTORS", eyebrow: "INVESTOR REFERENCE",
    title: "A PLATFORM BUILT AROUND OPERATIONAL CONTINUITY.",
    intro: "A factual overview of the product thesis, technical foundation, roadmap, commercial posture, and areas of diligence for evaluating ONYX.",
    product: "Product", architecture: "Architecture", security: "Security", roadmap: "Roadmap", contact: "Contact", language: "فارسی", light: "Light mode", dark: "Dark mode",
    sections: [
      { label: "01 / PRODUCT THESIS", title: "Operations are the system of record.", body: "ONYX is a mission operations platform for teams that need controlled execution, explicit authority, durable evidence, and continuity across connected, degraded, and offline conditions.", items: [
        ["CONTINUITY", "Local-first execution is designed to keep operational work available when network access is unreliable or unavailable."],
        ["AUTHORITY", "Execution is tied to explicit operational authority rather than treating awareness as permission to act."],
        ["ACCOUNTABILITY", "Operational state, decisions, evidence, approvals, and audit history are designed to remain traceable."]
      ]},
      { label: "02 / TECHNICAL FOUNDATION", title: "The platform is built around operational work.", body: "The documented application model spans local execution, synchronization, authority, durable state, evidence, planning, policy, and operational history.", items: [
        ["DISTRIBUTED SYNCHRONIZATION", "Vector-clock synchronization, conflict detection and resolution, transactional outbox patterns, replay, and idempotency are part of the documented system model."],
        ["OPERATIONAL APPLICATIONS", "The application manifest describes 18 operational contexts spanning missions, tasks, reports, meetings, files, approvals, capacity, automation, notifications, and audit."],
        ["SECURITY BOUNDARIES", "Identity, authorization, synchronization, auditability, deployment, recovery, and supply-chain concerns are treated as distinct control domains."]
      ]},
      { label: "03 / ROADMAP", title: "Expansion follows the foundation.", body: "The published roadmap distinguishes what is current from what is planned and what remains research.", items: [
        ["CURRENT", "Local-first execution, synchronization, authority, durable operational state, and evidence/auditability."],
        ["PLANNED", "Mobile, multi-region, and enterprise deployment expansion."],
        ["RESEARCH", "Federated operations, agent/plugin interfaces, and policy-aware automation."]
      ]},
      { label: "04 / COMMERCIAL POSTURE", title: "A controlled intellectual-property model.", body: "The commercialization plan treats ONYX Core and its intellectual property as proprietary. The public repository is an engineering and documentation surface, not an automatic grant of commercial rights. Enterprise rights are intended to be defined through explicit agreements that separate ONYX background IP, customer data and confidential information, configuration, and any custom-feature treatment.", items: [
        ["CORE IP", "ONYX Core remains proprietary; use rights are granted contractually rather than by publication of the repository."],
        ["LICENSING", "Hosted, self-managed, and customized deployments can carry different rights, entitlements, support, update, and termination terms."],
        ["BACKGROUND & CUSTOM IP", "Background IP remains ONYX property by default; customer-specific development requires explicit ownership or licensing treatment rather than an implied transfer."],
        ["LEGAL READINESS", "Chain of title, dependency licensing, customer contracts, privacy documentation, trademark protection, and release/legal checklists are identified readiness areas."]
      ]}
    ],
    diligenceLabel: "05 / DILIGENCE", diligenceTitle: "What the public record does — and does not — establish.",
    diligenceBody: "Technical diligence should examine the implementation and its boundaries: architecture and synchronization model, identity and authority controls, data/state behavior, security assumptions, deployment topology, test evidence, release controls, dependency inventory, and the maturity of each evaluated capability. Commercial diligence should separately examine the proposed deployment model, license scope, support/SLA terms, IP ownership boundaries, customer data treatment, custom development, and exit requirements. A practical evaluation can proceed from scoped use case → technical validation → deployment review → commercial/legal review. The public record does not establish financing history, valuation, revenue, customer contracts, customer counts, market share, or audited financial performance; those matters require direct evidence.",
    finalLabel: "06 / DISCUSSION", finalTitle: "Evaluate the platform in the context that matters.", finalBody: "For a substantive investor or strategic discussion, use the same evidence boundary: define the operating environment and deployment model, identify the technical and IP questions, then request the supporting material required for diligence rather than treating roadmap or marketing language as proof.", contactCta: "Contact the team", home: "Back to home"
  },
  fa: {
    tag: "ONYX / سرمایه‌گذاران", eyebrow: "مرجع سرمایه‌گذاری",
    title: "پلتفرمی بر پایه تداوم عملیات.",
    intro: "مروری مستند بر تز محصول، بنیان فنی، نقشه راه، جایگاه تجاری و حوزه‌های لازم برای بررسی دقیق ONYX.",
    product: "محصول", architecture: "معماری", security: "امنیت", roadmap: "نقشه راه", contact: "تماس", language: "فارسی", light: "حالت روشن", dark: "حالت تاریک",
    sections: [
      { label: "۰۱ / تز محصول", title: "عملیات باید رکورد مرجع باشد.", body: "ONYX یک پلتفرم عملیات مأموریت‌محور برای تیم‌هایی است که به اجرای کنترل‌شده، اختیار صریح، شواهد پایدار و تداوم در شرایط اتصال کامل، محدود یا قطع‌شده نیاز دارند.", items: [
        ["تداوم", "اجرای محلی‌محور برای در دسترس ماندن کار عملیاتی در زمان اتصال ناپایدار یا قطع‌شده طراحی شده است."],
        ["اختیار", "اجرا به اختیار عملیاتی صریح متصل است و صرف آگاهی را مجوز اقدام تلقی نمی‌کند."],
        ["پاسخ‌گویی", "وضعیت عملیاتی، تصمیم‌ها، شواهد، تأییدها و تاریخچه ممیزی برای قابل‌ردیابی بودن طراحی شده‌اند."]
      ]},
      { label: "۰۲ / بنیان فنی", title: "سامانه برای کار عملیاتی ساخته شده است.", body: "مدل مستند محصول اجرای محلی، همگام‌سازی، اختیار، وضعیت پایدار، شواهد، برنامه‌ریزی، سیاست و تاریخچه عملیاتی را در بر می‌گیرد.", items: [
        ["همگام‌سازی توزیع‌شده", "همگام‌سازی مبتنی بر vector clock، تشخیص و حل تعارض، الگوی transactional outbox، بازپخش و idempotency در مدل مستند سامانه قرار دارند."],
        ["برنامه‌های عملیاتی", "مانیفست برنامه ۱۸ حوزه عملیاتی شامل مأموریت، وظایف، گزارش، جلسات، فایل، تأیید، ظرفیت، اتوماسیون، اعلان و ممیزی را توصیف می‌کند."],
        ["مرزهای امنیتی", "هویت، مجوزدهی، همگام‌سازی، ممیزی، استقرار، بازیابی و زنجیره تأمین به‌عنوان حوزه‌های کنترل متمایز دیده می‌شوند."]
      ]},
      { label: "۰۳ / نقشه راه", title: "توسعه بر پایه بنیاد فعلی انجام می‌شود.", body: "نقشه راه منتشرشده میان قابلیت‌های فعلی، برنامه‌ریزی‌شده و پژوهشی تمایز می‌گذارد.", items: [
        ["فعلی", "اجرای محلی‌محور، همگام‌سازی، اختیار، وضعیت پایدار و شواهد/ممیزی."],
        ["برنامه‌ریزی‌شده", "گسترش موبایل، چندمنطقه‌ای و استقرار سازمانی."],
        ["پژوهشی", "عملیات فدره، رابط‌های عامل/افزونه و اتوماسیون آگاه از سیاست."]
      ]},
      { label: "۰۴ / جایگاه تجاری", title: "مدل مالکیت فکری کنترل‌شده.", body: "برنامه تجاری‌سازی، هسته و مالکیت فکری ONYX را اختصاصی در نظر می‌گیرد. مخزن عمومی سطح مهندسی و مستندسازی است و حقوق تجاری باید در توافق‌های صریح تعریف شوند.", items: [
        ["مالکیت فکری", "موضع هسته اختصاصی است و فرض خودکار متن‌باز بودن وجود ندارد."],
        ["مجوزدهی", "حقوق مشتری، حقوق استقرار و سازوکار مجوزدهی نیازمند تعریف قراردادی صریح هستند."],
        ["آمادگی حقوقی", "زنجیره مالکیت، مجوز وابستگی‌ها، قراردادهای مشتری، مستندات حریم خصوصی، علامت تجاری و چک‌لیست انتشار حقوقی از حوزه‌های آمادگی هستند."]
      ]}
    ],
    diligenceLabel: "۰۵ / بررسی دقیق", diligenceTitle: "رکورد عمومی چه چیزی را اثبات می‌کند — و چه چیزی را نه.",
    diligenceBody: "منابع عمومی ONYX مدل محصول، معماری فنی، وضعیت امنیتی، نقشه راه و جهت‌گیری تجاری‌سازی را مستند می‌کنند. این منابع سابقه تأمین مالی، ارزش‌گذاری، درآمد، قراردادهای مشتری، تعداد مشتری، سهم بازار یا عملکرد مالی حسابرسی‌شده را اثبات نمی‌کنند. این موارد به بررسی مستقیم و شواهد پشتیبان نیاز دارند.",
    finalLabel: "۰۶ / گفت‌وگو", finalTitle: "پلتفرم را در زمینه‌ای که برای شما مهم است بررسی کنید.", finalBody: "برای گفت‌وگوی سرمایه‌گذاری یا راهبردی، محیط عملیاتی، مدل استقرار، پرسش‌های فنی و دامنه بررسی موردنظر خود را با تیم در میان بگذارید.", contactCta: "تماس با تیم", home: "بازگشت به خانه"
  }
} as const;

export default function InvestorsPage({ locale }: { locale: Locale }) {
  const rtl = locale === "fa";
  const c = copy[locale];
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const href = (page: string) => page ? "/" + locale + "/" + page + "/" : "/" + locale + "/";
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
    <main className={"investors-page investors-page--" + theme} dir={rtl ? "rtl" : "ltr"}>
      <SiteHeader locale={locale} theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} activePage="investors" />
      <section className="investors-hero"><div className="investors-grid" aria-hidden="true" /><div className="shell-content investors-hero__inner"><div className="investors-kicker"><span />{c.tag}</div><p className="investors-eyebrow">{c.eyebrow}</p><h1>{c.title}</h1><p className="investors-intro">{c.intro}</p></div></section>
      {c.sections.map((section) => <section className="investors-section" key={section.label}><div className="shell-content investors-two-col"><div><span className="investors-label">{section.label}</span><h2>{section.title}</h2><p className="investors-lead">{section.body}</p></div><div className="investors-list">{section.items.map(([label, body]) => <article key={label}><span>{label}</span><p>{body}</p></article>)}</div></div></section>)}
      <section className="investors-diligence"><div className="shell-content investors-two-col"><div><span className="investors-label">{c.diligenceLabel}</span><h2>{c.diligenceTitle}</h2></div><p>{c.diligenceBody}</p></div></section>
      <section className="investors-final"><div className="shell-content investors-final__inner"><div><span className="investors-label">{c.finalLabel}</span><h2>{c.finalTitle}</h2><p>{c.finalBody}</p></div><a href={href("contact")} className="investors-action">{c.contactCta}</a></div></section>
      <footer className="investors-footer"><div className="shell-content investors-footer__inner"><a href={href("")}>{rtl ? <ArrowRight size={15} /> : <ArrowLeft size={15} />} {c.home}</a><span>ONYX / INVESTORS</span></div></footer>
    </main>
  );
}
