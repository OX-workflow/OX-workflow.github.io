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
  Moon,
  Sun,
} from "lucide-react";
import SiteHeader, { getInitialTheme } from "./SiteHeader";

type Locale = "en" | "fa";

type Localized = { en: string; fa: string };

const assets = {
  wideLogoLight: "/assets/onyx-horizontal-light.svg",
  wideLogoDark: "/assets/onyx-horizontal-dark.svg",
  stackedLogo: "/assets/onyx-symbol.svg",
  stackedLogoDark: "/assets/onyx-wordmark-dark.svg",
  authority: "/assets/product/mission-operations.png",
  execution: "/assets/product/operational-overview.png",
  nexus: "/assets/product/secure-browser-access.webp",
  signalMark: "/assets/onyx-symbol.svg",
};

const text = {
  nav: {
    product: { en: "Product", fa: "محصول" },
    solutions: { en: "Solutions", fa: "راهکارها" },
    architecture: { en: "Architecture", fa: "معماری" },
    security: { en: "Security", fa: "امنیت" },
    about: { en: "About", fa: "درباره" },
    resources: { en: "Resources", fa: "منابع" },
    demo: { en: "Request a demo", fa: "درخواست دمو" },
  },
  hero: {
    tag: { en: "Mission Operations Platform", fa: "پلتفرم عملیات مأموریت‌محور" },
    titleA: { en: "OPERATIONS CONTINUE.", fa: "عملیات ادامه دارد." },
    titleB: { en: "Accountability remains.", fa: "پاسخ‌گویی باقی می‌ماند." },
    lede: { en: "ONYX is a mission operations platform that connects authority, execution, decisions, evidence, policy, synchronization, and operational history in one governed system.", fa: "ONYX یک پلتفرم عملیات مأموریت‌محور است که اختیار، اجرا، تصمیم‌ها، شواهد، سیاست، همگام‌سازی و تاریخچه عملیاتی را در یک سامانه حاکمیت‌شده به هم متصل می‌کند." },
    framework: { en: "See the operating model", fa: "مدل عملیاتی را ببینید" },
    enterprise: { en: "Explore the platform", fa: "بررسی پلتفرم" },
    condition: { en: "Operating principle", fa: "اصل عملیاتی" },
    synchronized: { en: "Governed execution", fa: "اجرای حاکمیت‌شده" },
    scroll: { en: "Examine the system", fa: "سامانه را بررسی کنید" },
  },
  bridge: { en: "Authority / execution / decisions / evidence / resilience", fa: "اختیار / اجرا / تصمیم‌ها / شواهد / تاب‌آوری" },
  methodology: {
    tag: { en: "BOUND context", fa: "زمینه BOUND" },
    titleA: { en: "Built around", fa: "بر محور" },
    titleB: { en: "the operation.", fa: "خود عملیات." },
    body: {
      en: "ONYX is the operational platform. BOUND Method v3.0 provides the boundary context behind independent execution: define the domain, establish responsibility boundaries, formalize contracts, execute, and verify continuously.",
      fa: "ONYX پلتفرم عملیاتی است؛ BOUND Method v3.0 زمینه مرزبندی برای اجرای مستقل فراهم می‌کند: دامنه را تعریف کنید، مرز مسئولیت را مشخص کنید، قراردادها را رسمی کنید، اجرا کنید و پیوسته راستی‌آزمایی کنید.",
    },
    product: { en: "Product layer", fa: "لایه محصول" },
    productCopy: { en: "Governed operational execution", fa: "اجرای عملیاتی حاکمیت‌شده" },
    doctrine: { en: "Boundary context", fa: "زمینه مرزبندی" },
    doctrineCopy: { en: "Domain → Boundary → Contract → Execution → Verification", fa: "دامنه ← مرز ← قرارداد ← اجرا ← راستی‌آزمایی" },
    link: { en: "Explore BOUND Method v3.0", fa: "بررسی BOUND Method v3.0" },
  },
  problem: {
    tag: { en: "01 / The operational problem", fa: "۰۱ / مسئله عملیاتی" },
    titleA: { en: "Critical work is", fa: "کارهای مهم" },
    titleB: { en: "fragmented across systems.", fa: "میان سامانه‌ها پراکنده‌اند." },
    body: { en: "Discussion, tasks, files, approvals, policy, evidence, and decisions often live in different places. The failure is not inside any one tool — it is the missing operational record between them.", fa: "گفت‌وگو، وظایف، فایل‌ها، تأییدها، سیاست، شواهد و تصمیم‌ها اغلب در مکان‌های جداگانه قرار دارند. مشکل لزوماً در یک ابزار نیست؛ در نبود یک سابقه عملیاتی یکپارچه میان آن‌هاست." },
    signal: { en: "Operational fragmentation", fa: "پراکندگی عملیاتی" },
    fragmented: { en: "Disconnected trails", fa: "ردپاهای گسسته" },
    result: { en: "ONYX makes authority, execution, evidence, and history part of the operation itself.", fa: "ONYX اختیار، اجرا، شواهد و تاریخچه را بخشی از خود عملیات می‌کند." },
  },
  contrast: {
    tag: { en: "02 / One governed operational record", fa: "۰۲ / یک سابقه عملیاتی حاکمیت‌شده" },
    titleA: { en: "Authority. Execution. Evidence.", fa: "اختیار. اجرا. شواهد." },
    titleB: { en: "Connected by design.", fa: "از ابتدا به هم متصل." },
    body: { en: "ONYX keeps the relationships that matter visible: who can act, what was planned, what changed, which decision governed the work, what evidence supports the outcome, and what happened next.", fa: "ONYX روابط مهم را قابل مشاهده نگه می‌دارد: چه کسی اختیار اقدام دارد، چه چیزی برنامه‌ریزی شد، چه چیزی تغییر کرد، کدام تصمیم بر کار حاکم بود، چه شواهدی نتیجه را پشتیبانی می‌کند و بعد چه اتفاقی افتاد." },
    traditional: { en: "Operational condition", fa: "شرایط عملیاتی" },
    onyx: { en: "ONYX record", fa: "سابقه ONYX" },
    rows: [
      [{ en: "Objective", fa: "هدف" }, { en: "Defined mission, owner, scope, and intended outcome.", fa: "مأموریت، مالک، دامنه و نتیجه موردنظر تعریف می‌شوند." }],
      [{ en: "Authority", fa: "اختیار" }, { en: "Roles and delegated authority establish who can act.", fa: "نقش‌ها و اختیار تفویض‌شده مشخص می‌کنند چه کسی می‌تواند اقدام کند." }],
      [{ en: "Execution", fa: "اجرا" }, { en: "Work, dependencies, timelines, and decisions remain connected.", fa: "کار، وابستگی‌ها، زمان‌بندی و تصمیم‌ها به هم متصل می‌مانند." }],
      [{ en: "Evidence & history", fa: "شواهد و تاریخچه" }, { en: "Verification, approvals, policy, and audit preserve why the outcome happened.", fa: "راستی‌آزمایی، تأییدها، سیاست و ممیزی دلیل شکل‌گیری نتیجه را حفظ می‌کنند." }],
    ],
  },
  philosophy: {
    tag: { en: "03 / The operational lifecycle", fa: "۰۳ / چرخه عملیاتی" },
    titleA: { en: "One operation,", fa: "یک عملیات،" },
    titleB: { en: "one governed history.", fa: "یک تاریخچه حاکمیت‌شده." },
    body: { en: "ONYX follows the operation from objective to audit, keeping authority, execution, decisions, verification, and reconciliation connected across the lifecycle.", fa: "ONYX عملیات را از هدف تا ممیزی دنبال می‌کند و اختیار، اجرا، تصمیم‌ها، راستی‌آزمایی و تطبیق را در سراسر چرخه به هم متصل نگه می‌دارد." },
    steps: [
      { en: "Objective", fa: "هدف" }, { en: "Authority", fa: "اختیار" }, { en: "Plan", fa: "برنامه" }, { en: "Execute", fa: "اجرا" },
      { en: "Decide", fa: "تصمیم" }, { en: "Verify", fa: "راستی‌آزمایی" }, { en: "Reconcile", fa: "تطبیق" }, { en: "Audit", fa: "ممیزی" },
    ],
  },
  platform: {
    tag: { en: "04 / The platform model", fa: "۰۴ / مدل پلتفرم" },
    titleA: { en: "Everything important", fa: "هر چیز مهم" },
    titleB: { en: "belongs to the operation.", fa: "به خود عملیات تعلق دارد." },
    body: { en: "ONYX connects the operational objects that normally become separate trails: organization, authority, missions, work, decisions, evidence, policy, planning, synchronization, and history.", fa: "ONYX اشیای عملیاتی را که معمولاً به ردپاهای جداگانه تبدیل می‌شوند به هم متصل می‌کند: سازمان، اختیار، مأموریت‌ها، کار، تصمیم‌ها، شواهد، سیاست، برنامه‌ریزی، همگام‌سازی و تاریخچه." },
    label: { en: "Operational model / connected state", fa: "مدل عملیاتی / وضعیت متصل" },
    headline: { en: "The system stays connected to the work it governs.", fa: "سامانه به کاری که بر آن حاکم است متصل می‌ماند." },
    copy: { en: "Authority, lifecycle state, decisions, evidence, and operational history are treated as part of the same governed system rather than separate administrative trails.", fa: "اختیار، وضعیت چرخه عمر، تصمیم‌ها، شواهد و تاریخچه عملیاتی بخشی از یک سامانه حاکمیت‌شده واحد هستند، نه ردپاهای اداری جداگانه." },
    checks: [{ en: "Authority & policy", fa: "اختیار و سیاست" }, { en: "Execution & lifecycle", fa: "اجرا و چرخه عمر" }, { en: "Evidence & history", fa: "شواهد و تاریخچه" }],
    systemLanguageTag: { en: "Ring · Orbit · Grid · Signal", fa: "حلقه · مدار · شبکه · سیگنال" },
    systemLanguageBody: { en: "The brand language is also an operational language: Ring marks authority, Orbit connects distributed coordination, Grid structures state, and Signal exposes live events and evidence.", fa: "زبان برند هم‌زمان یک زبان عملیاتی است: حلقه اختیار را مشخص می‌کند، مدار هماهنگی توزیع‌شده را به هم متصل می‌کند، شبکه وضعیت را ساختاربندی می‌کند و سیگنال رویدادها و شواهد زنده را آشکار می‌سازد." },
    systemLanguageItems: [
      { en: "RING / Authority", fa: "حلقه / اختیار" },
      { en: "ORBIT / Coordination", fa: "مدار / هماهنگی" },
      { en: "GRID / Operational state", fa: "شبکه / وضعیت عملیاتی" },
      { en: "SIGNAL / Events & evidence", fa: "سیگنال / رویدادها و شواهد" },
    ],
  },
  execution: {
    tag: { en: "05 / Governed execution", fa: "۰۵ / اجرای حاکمیت‌شده" },
    titleA: { en: "From objective", fa: "از هدف" },
    titleB: { en: "to verified outcome.", fa: "تا نتیجه راستی‌آزمایی‌شده." },
    body: { en: "Turn intent into an explicit operational path: establish authority, assign work, track dependencies and time, record decisions, verify evidence, and preserve the result.", fa: "نیت را به مسیر عملیاتی صریح تبدیل کنید: اختیار را مشخص کنید، کار را واگذار کنید، وابستگی و زمان را دنبال کنید، تصمیم‌ها را ثبت کنید، شواهد را راستی‌آزمایی کنید و نتیجه را حفظ کنید." },
    stages: [{ en: "Objective", fa: "هدف" }, { en: "Authority", fa: "اختیار" }, { en: "Mission", fa: "مأموریت" }, { en: "Work", fa: "کار" }, { en: "Decision", fa: "تصمیم" }, { en: "Verification", fa: "راستی‌آزمایی" }, { en: "Outcome", fa: "نتیجه" }],
  },
  accountability: {
    tag: { en: "06 / Evidence & accountability", fa: "۰۶ / شواهد و پاسخ‌گویی" },
    titleA: { en: "An outcome should explain", fa: "یک نتیجه باید توضیح دهد" },
    titleB: { en: "why it happened.", fa: "چرا به وجود آمد." },
    item: { en: "Operational record / 042", fa: "سابقه عملیاتی / ۰۴۲" },
    log: { en: "Evidence & decision trail", fa: "ردپای شواهد و تصمیم" },
    completed: { en: "Work completed", fa: "کار تکمیل شد" },
    verified: { en: "Evidence verified", fa: "شواهد راستی‌آزمایی شد" },
    accepted: { en: "Outcome accepted", fa: "نتیجه پذیرفته شد" },
    recorded: { en: "The operation remains reconstructable after completion.", fa: "پس از پایان نیز عملیات قابل بازسازی باقی می‌ماند." },
  },
  industries: {
    tag: { en: "07 / Operational patterns", fa: "۰۷ / الگوهای عملیاتی" },
    titleA: { en: "For operations where", fa: "برای عملیات‌هایی که" },
    titleB: { en: "continuity and accountability matter.", fa: "تداوم و پاسخ‌گویی اهمیت دارند." },
    body: { en: "ONYX can be evaluated across distributed operational environments where teams, authority, evidence, and execution must remain connected.", fa: "ONYX را می‌توان در محیط‌های عملیاتی توزیع‌شده‌ای ارزیابی کرد که در آن تیم‌ها، اختیار، شواهد و اجرا باید به هم متصل بمانند." },
    cards: [
      { en: "Defense & government", fa: "دفاع و دولت", copyEn: "Distributed command, constrained connectivity, accountable execution.", copyFa: "فرماندهی توزیع‌شده، اتصال محدود و اجرای پاسخ‌گو." },
      { en: "Space operations", fa: "عملیات فضایی", copyEn: "Long-delay links, autonomous execution, synchronized mission state.", copyFa: "ارتباطات با تأخیر، اجرای خودمختار و وضعیت همگام مأموریت." },
      { en: "Emergency response", fa: "پاسخ اضطراری", copyEn: "Field teams operating under unstable infrastructure and time pressure.", copyFa: "تیم‌های میدانی در زیرساخت ناپایدار و فشار زمانی." },
      { en: "Critical infrastructure", fa: "زیرساخت حیاتی", copyEn: "Operational continuity where interruption carries material consequences.", copyFa: "تداوم عملیات در محیط‌هایی که وقفه پیامدهای جدی دارد." },
    ],
  },
  outcomes: {
    tag: { en: "08 / What changes", fa: "۰۸ / چه چیزی تغییر می‌کند" },
    titleA: { en: "Make operations", fa: "عملیات را" },
    titleB: { en: "understandable and explainable.", fa: "قابل فهم و قابل توضیح کنید." },
    body: { en: "ONYX gives teams a shared operational model: clearer authority, connected execution, explicit evidence, durable history, and resilience when connectivity changes.", fa: "ONYX یک مدل عملیاتی مشترک به تیم‌ها می‌دهد: اختیار شفاف‌تر، اجرای متصل، شواهد صریح، تاریخچه پایدار و تاب‌آوری در برابر تغییر وضعیت اتصال." },
    list: [
      { en: "Authority", fa: "اختیار", copyEn: "Know who can act and within what scope.", copyFa: "بدانید چه کسی و در چه دامنه‌ای می‌تواند اقدام کند." },
      { en: "Execution", fa: "اجرا", copyEn: "Keep missions, work, dependencies, and timelines connected.", copyFa: "مأموریت‌ها، کار، وابستگی‌ها و زمان‌بندی را متصل نگه دارید." },
      { en: "Evidence", fa: "شواهد", copyEn: "Connect approvals, reports, files, and verification to the work.", copyFa: "تأییدها، گزارش‌ها، فایل‌ها و راستی‌آزمایی را به کار متصل کنید." },
      { en: "History", fa: "تاریخچه", copyEn: "Preserve the decisions and changes needed to reconstruct the operation.", copyFa: "تصمیم‌ها و تغییرات لازم برای بازسازی عملیات را حفظ کنید." },
      { en: "Resilience", fa: "تاب‌آوری", copyEn: "Continue distributed work and reconcile state as connectivity permits.", copyFa: "کار توزیع‌شده را ادامه دهید و با امکان اتصال، وضعیت را تطبیق دهید." },
    ],
  },
  enterprise: {
    tag: { en: "09 / Resilience", fa: "۰۹ / تاب‌آوری" },
    titleA: { en: "Operate across", fa: "در میان" },
    titleB: { en: "changing connectivity", fa: "اتصال متغیر" },
    titleC: { en: "without losing the record.", fa: "بدون از دست دادن سابقه." },
    specs: [{ en: "Local-first execution", fa: "اجرای محلی‌محور" }, { en: "Controlled synchronization", fa: "همگام‌سازی کنترل‌شده" }, { en: "Conflict detection & resolution", fa: "تشخیص و حل تعارض" }, { en: "Deployment flexibility", fa: "انعطاف در استقرار" }],
    annotations: [{ en: "Local state preserved", fa: "وضعیت محلی حفظ شد" }, { en: "Changes synchronized", fa: "تغییرات همگام شد" }, { en: "History retained", fa: "تاریخچه حفظ شد" }],
  },
  why: {
    tag: { en: "10 / Position", fa: "۱۰ / جایگاه" },
    titleA: { en: "Not another task system.", fa: "فقط یک سامانه وظیفه نیست." },
    titleB: { en: "A governed operational system.", fa: "یک سامانه عملیاتی حاکمیت‌شده است." },
    labels: [
      [{ en: "Communication tools", fa: "ابزارهای ارتباطی" }, { en: "Move information.", fa: "اطلاعات را جابه‌جا می‌کنند." }],
      [{ en: "Task systems", fa: "سامانه‌های وظیفه" }, { en: "Track work.", fa: "کار را دنبال می‌کنند." }],
      [{ en: "Document systems", fa: "سامانه‌های اسناد" }, { en: "Store records.", fa: "سوابق را نگه می‌دارند." }],
      [{ en: "ONYX", fa: "ONYX" }, { en: "Connects authority, execution, evidence, and history.", fa: "اختیار، اجرا، شواهد و تاریخچه را به هم متصل می‌کند." }],
    ],
  },
  cta: {
    tag: { en: "Mission Operations Platform", fa: "پلتفرم عملیات مأموریت‌محور" },
    titleA: { en: "Make every important", fa: "هر عملیات مهم را" },
    titleB: { en: "understandable while it happens.", fa: "در حین وقوع قابل فهم کنید." },
    body: { en: "ONYX connects authority, execution, decisions, evidence, policy, synchronization, and operational history into one governed system. Explore the platform or request a briefing.", fa: "ONYX اختیار، اجرا، تصمیم‌ها، شواهد، سیاست، همگام‌سازی و تاریخچه عملیاتی را در یک سامانه حاکمیت‌شده به هم متصل می‌کند. پلتفرم را بررسی کنید یا برای یک جلسه معرفی درخواست دهید." },
    demo: { en: "Request a demo", fa: "درخواست دمو" },
    contact: { en: "Contact the team", fa: "تماس با تیم" },
  },
};

const fracturePoints: Localized[] = [
  { en: "Messages", fa: "پیام‌ها" }, { en: "Emails", fa: "ایمیل‌ها" }, { en: "Documents", fa: "اسناد" }, { en: "Spreadsheets", fa: "صفحه‌گسترده‌ها" }, { en: "Disconnected software", fa: "نرم‌افزارهای گسسته" },
];

const capabilityCards = [
  { number: "01", icon: ShieldCheck, title: { en: "Authority", fa: "اختیار" }, copy: { en: "Roles, scope, delegated authority, and policy establish who can act and under what conditions.", fa: "نقش‌ها، دامنه، اختیار تفویض‌شده و سیاست مشخص می‌کنند چه کسی و تحت چه شرایطی می‌تواند اقدام کند." } },
  { number: "02", icon: Target, title: { en: "Execution", fa: "اجرا" }, copy: { en: "Missions, work, ownership, dependencies, timelines, milestones, and lifecycle states stay connected.", fa: "مأموریت‌ها، کار، مالکیت، وابستگی‌ها، زمان‌بندی، نقاط عطف و وضعیت‌های چرخه عمر به هم متصل می‌مانند." } },
  { number: "03", icon: Network, title: { en: "Coordination", fa: "هماهنگی" }, copy: { en: "Meetings, conversations, decisions, action items, and cross-context relationships stay attached to the operation.", fa: "جلسه‌ها، گفت‌وگوها، تصمیم‌ها، اقدامات و روابط میان‌زمینه‌ای به عملیات متصل می‌مانند." } },
  { number: "04", icon: BadgeCheck, title: { en: "Evidence", fa: "شواهد" }, copy: { en: "Reports, files, approvals, verification, review, and audit preserve what happened and why.", fa: "گزارش‌ها، فایل‌ها، تأییدها، راستی‌آزمایی، بررسی و ممیزی آنچه رخ داده و چرایی آن را حفظ می‌کنند." } },
  { number: "05", icon: Radar, title: { en: "Resilience", fa: "تاب‌آوری" }, copy: { en: "Local-first operation and controlled synchronization keep distributed state aligned as connectivity changes.", fa: "اجرای محلی‌محور و همگام‌سازی کنترل‌شده کمک می‌کنند وضعیت توزیع‌شده با تغییر اتصال هم‌راستا بماند." } },
  { number: "06", icon: Layers3, title: { en: "Planning", fa: "برنامه‌ریزی" }, copy: { en: "Capacity, forecasting, automation, notifications, and escalation help teams see pressure before it becomes failure.", fa: "ظرفیت، پیش‌بینی، خودکارسازی، اعلان‌ها و تشدید به تیم‌ها کمک می‌کنند فشار را پیش از تبدیل شدن به شکست ببینند." } },
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

export default function Home({ initialLocale }: { initialLocale?: Locale }) {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);
  const [locale, setLocale] = useState<Locale>(initialLocale ?? "en");
  const [heroFocus, setHeroFocus] = useState("RING");
  const isRtl = locale === "fa";
  const t = (value: Localized) => value[locale];
  useEffect(() => {
    const preferred = initialLocale ?? resolveBrowserLocale();
    setLocale(preferred);
    document.documentElement.lang = preferred;
    document.documentElement.dir = preferred === "fa" ? "rtl" : "ltr";
  }, [initialLocale]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("onyx-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => current === "dark" ? "light" : "dark");

    const Chevron = isRtl ? ChevronRight : ChevronLeft;

  return (
    <div className="onyx-site" dir={isRtl ? "rtl" : "ltr"}>
      <SiteHeader locale={locale} theme={theme} onToggleTheme={toggleTheme} />

      <main id="top">
        <section className="hero hero--interactive section-shell hero--ready">
          <div className="hero__veil" />
          <div className="hero__grid" aria-hidden="true" />
          <div className="hero-control" aria-label={isRtl ? "مدل عملیاتی ONYX" : "ONYX operating model"} onMouseLeave={() => setHeroFocus("RING")}>
            <div className="hero-control__scan" />
            <div className="hero-control__crosshair hero-control__crosshair--h" />
            <div className="hero-control__crosshair hero-control__crosshair--v" />
            <div className="hero-control__ring hero-control__ring--outer" />
            <div className="hero-control__ring hero-control__ring--inner" />
            <div className="hero-control__orbit hero-control__orbit--a"><span /></div>
            <div className="hero-control__orbit hero-control__orbit--b"><span /></div>
            <div className="hero-control__core"><img src={assets.signalMark} alt="" /><span>ONYX</span></div>
            {[
              ["RING", "AUTHORITY", "Controlled execution"],
              ["ORBIT", "COORDINATION", "Synchronization"],
              ["GRID", "STATE", "Operational structure"],
              ["SIGNAL", "AWARENESS", "Events + evidence"],
            ].map(([key, label, detail], index) => (
              <button
                type="button"
                key={key}
                className={`hero-control__node hero-control__node--${index + 1} ${heroFocus === key ? "is-active" : ""}`}
                onMouseEnter={() => setHeroFocus(key)}
                onFocus={() => setHeroFocus(key)}
                aria-label={`${key}: ${label}`}
              >
                <i />
                <span><b>{key}</b><small>{label}</small></span>
              </button>
            ))}
            <div className={`hero-control__readout hero-control__readout--${heroFocus.toLowerCase()}`}>
              <span>{heroFocus}</span>
              <strong>
                {heroFocus === "RING" ? "CONTROLLED EXECUTION" : heroFocus === "ORBIT" ? "DISTRIBUTED COORDINATION" : heroFocus === "GRID" ? "OPERATIONAL STATE" : "LIVE EVENTS / EVIDENCE"}
              </strong>
            </div>
          </div>
          <div className="hero__content shell-content">
            <SignalTag>{t(text.hero.tag)}</SignalTag>
            <h1>{t(text.hero.titleA)}<br /><em>{t(text.hero.titleB)}</em></h1>
            <p className="hero__lede">{t(text.hero.lede)}</p>
            <div className="hero__actions"><ArrowAction href="#platform" solid rtl={isRtl}>{t(text.hero.framework)}</ArrowAction><ArrowAction href="#enterprise" rtl={isRtl}>{t(text.hero.enterprise)}</ArrowAction></div>
          </div>
          <div className="hero__telemetry" aria-label="System status"><div className="telemetry-orbit"><span /><span /><span /></div><div><span className="telemetry-label">{t(text.hero.condition)}</span><strong>{t(text.hero.synchronized)}</strong></div><span className="telemetry-state">ONLINE</span></div>
          <a className="hero__scroll" href="#problem" aria-label={t(text.hero.scroll)}><span>{t(text.hero.scroll)}</span><ChevronDown size={16} /></a>
        </section>

        <div className="brand-bridge" aria-hidden="true"><div className="shell-content brand-bridge__content"><span className="brand-bridge__line" /><div className="brand-bridge__mark"><img src={assets.signalMark} alt="" width="512" height="512" decoding="async" /><strong>ONYX</strong></div><span className="brand-bridge__statement">{t(text.bridge)}</span><span className="brand-bridge__line" /></div></div>

        <section id="problem" className="problem section-shell"><div className="shell-content split-grid split-grid--problem"><div className="section-intro"><SignalTag>{t(text.problem.tag)}</SignalTag><h2>{t(text.problem.titleA)}<br /><em>{t(text.problem.titleB)}</em></h2><p>{t(text.problem.body)}</p></div><div className="fracture-board"><div className="fracture-board__caption"><span>{t(text.problem.signal)}</span><span>{t(text.problem.fragmented)}</span></div><div className="fracture-board__items">{fracturePoints.map((item, index) => <div className="fracture-row" key={item.en}><span className="fracture-row__index">{String(index + 1).padStart(2, "0")}</span><span className="fracture-row__line" /><span>{t(item)}</span><Plus size={14} /></div>)}</div><Rule /><div className="fracture-board__result"><CircleDot size={16} /><span>{t(text.problem.result)}</span></div></div></div></section>

        <section className="contrast section-shell"><div className="shell-content"><div className="section-heading section-heading--wide"><SignalTag>{t(text.contrast.tag)}</SignalTag><h2>{t(text.contrast.titleA)}<br /><em>{t(text.contrast.titleB)}</em></h2><p>{t(text.contrast.body)}</p></div><div className="contrast-table"><div className="contrast-table__head"><span>{t(text.contrast.traditional)}</span><span>{t(text.contrast.onyx)}</span></div>{text.contrast.rows.map(([first, second]) => <div className="contrast-table__row" key={first.en}><span>{t(first)}</span><strong>{t(second)}</strong></div>)}</div></div></section>

        <section className="philosophy section-shell"><div className="shell-content"><div className="philosophy__top"><SignalTag>{t(text.philosophy.tag)}</SignalTag><div><h2>{t(text.philosophy.titleA)}<br /><em>{t(text.philosophy.titleB)}</em></h2><p>{t(text.philosophy.body)}</p></div></div><div className="logic-path" aria-label="Authority becomes organizational intelligence">{text.philosophy.steps.map((item, index) => <div className={`logic-path__step ${index === 4 ? "logic-path__step--final" : ""}`} key={item.en}><span className="logic-path__number">{String(index + 1).padStart(2, "0")}</span><span className="logic-path__dot" /><strong>{t(item)}</strong></div>)}</div></div></section>

        <section id="bound-context" className="methodology section-shell"><div className="shell-content methodology__layout"><div className="methodology__content"><SignalTag>{t(text.methodology.tag)}</SignalTag><h2>{t(text.methodology.titleA)}<br /><em>{t(text.methodology.titleB)}</em></h2><p>{t(text.methodology.body)}</p><a className="methodology__link" href="https://bound-method.github.io/" target="_blank" rel="noreferrer">{t(text.methodology.link)}<ArrowUpLeft size={16} /></a></div><div className="methodology__system"><a className="bound-context" href="https://bound-method.github.io/" target="_blank" rel="noreferrer" aria-label={isRtl ? "وب‌سایت BOUND Method v3.0" : "BOUND Method v3.0 website"}><div className="bound-context__eyebrow">BOUND METHOD v3.0</div><div className="bound-context__title">Boundary-Oriented Unified Development</div><div className="bound-context__sequence"><span>Domain</span><i>→</i><span>Boundary</span><i>→</i><span>Contract</span><i>→</i><span>Execution</span><i>→</i><span>Verification</span></div></a><div className="methodology__layers"><div><span>ONYX</span><strong>{t(text.methodology.product)}</strong><small>{t(text.methodology.productCopy)}</small></div><div><span>BOUND</span><strong>{t(text.methodology.doctrine)}</strong><small>{t(text.methodology.doctrineCopy)}</small></div></div></div></div></section>

        <section id="platform" className="platform section-shell"><div className="platform__backdrop" aria-hidden="true" /><div className="shell-content platform__intro"><div className="section-heading"><SignalTag>{t(text.platform.tag)}</SignalTag><h2>{t(text.platform.titleA)}<br /><em>{t(text.platform.titleB)}</em></h2></div><p>{t(text.platform.body)}</p></div><div className="authority-showcase shell-content"><div className="authority-showcase__image"><img src={assets.authority} alt="ONYX Mission Operations interface" width="1440" height="1000" loading="lazy" decoding="async" /><div className="image-corner image-corner--tl" /><div className="image-corner image-corner--br" /></div><div className="authority-showcase__copy"><span className="mono-label">{t(text.platform.label)}</span><h3>{t(text.platform.headline)}</h3><p>{t(text.platform.copy)}</p><ul className="check-list">{text.platform.checks.map((item) => <li key={item.en}><Check size={14} />{t(item)}</li>)}</ul></div></div><div className="platform-language"><span className="mono-label">{t(text.platform.systemLanguageTag)}</span><p>{t(text.platform.systemLanguageBody)}</p><div>{text.platform.systemLanguageItems.map((item) => <span key={item.en}>{t(item)}</span>)}</div></div><div className="capability-grid shell-content">{capabilityCards.map(({ number, icon: Icon, title, copy }) => <article className="capability-card" key={number}><div className="capability-card__head"><span>{number}</span><Icon size={20} /></div><h3>{t(title)}</h3><p>{t(copy)}</p><ArrowUpLeft size={16} /></article>)}</div></section>

        <section className="execution section-shell"><div className="execution__image-wrap"><img src={assets.execution} alt="ONYX Operational Overview interface" width="1440" height="1000" loading="lazy" decoding="async" /><div className="execution__image-fade" /></div><div className="shell-content execution__content"><div className="section-heading"><SignalTag>{t(text.execution.tag)}</SignalTag><h2>{t(text.execution.titleA)}<br /><em>{t(text.execution.titleB)}</em></h2><p>{t(text.execution.body)}</p></div><div className="execution-path">{text.execution.stages.map((stage, index) => <div className="execution-path__item" key={stage.en}><span>{String(index + 1).padStart(2, "0")}</span><strong>{t(stage)}</strong><i /></div>)}</div></div></section>

        <section className="accountability section-shell"><div className="shell-content accountability__layout"><div className="accountability__statement"><SignalTag>{t(text.accountability.tag)}</SignalTag><h2>{t(text.accountability.titleA)}<br /><em>{t(text.accountability.titleB)}</em></h2></div><div className="verification-card"><div className="verification-card__meta"><span>{t(text.accountability.item)}</span><span>{t(text.accountability.log)}</span></div><div className="verification-card__route"><div className="route-node route-node--done"><Check size={14} /><span>{t(text.accountability.completed)}</span></div><span className="route-link" /><div className="route-node route-node--done"><ShieldCheck size={14} /><span>{t(text.accountability.verified)}</span></div><span className="route-link" /><div className="route-node route-node--active"><BadgeCheck size={14} /><span>{t(text.accountability.accepted)}</span></div></div><div className="verification-card__footer"><span>{t(text.accountability.recorded)}</span><span className="verified-stamp">COMPLETE</span></div></div></div></section>

        <section className="industries section-shell"><div className="shell-content"><div className="industries__heading"><div><SignalTag>{t(text.industries.tag)}</SignalTag><h2>{t(text.industries.titleA)}<br /><em>{t(text.industries.titleB)}</em></h2></div><p>{t(text.industries.body)}</p></div><div className="industry-grid">{text.industries.cards.map((industry, index) => <article className="industry-card" key={industry.en}><span>{String(index + 1).padStart(2, "0")}</span><h3>{t({ en: industry.en, fa: industry.fa })}</h3><p>{locale === "en" ? industry.copyEn : industry.copyFa}</p>{isRtl ? <ArrowRight size={17} /> : <ArrowLeft size={17} />}</article>)}</div></div></section>

        <section id="outcomes" className="outcomes section-shell"><div className="shell-content"><div className="section-heading section-heading--wide"><SignalTag>{t(text.outcomes.tag)}</SignalTag><h2>{t(text.outcomes.titleA)}<br /><em>{t(text.outcomes.titleB)}</em></h2><p>{t(text.outcomes.body)}</p></div><div className="outcomes-list">{text.outcomes.list.map((outcome, index) => <article key={outcome.en} className="outcome-row"><span>{String(index + 1).padStart(2, "0")}</span><h3>{t({ en: outcome.en, fa: outcome.fa })}</h3><p>{locale === "en" ? outcome.copyEn : outcome.copyFa}</p><Chevron size={20} /></article>)}</div></div></section>

        <section id="enterprise" className="enterprise section-shell"><img className="enterprise__visual" src={assets.nexus} alt="ONYX secure access interface" width="893" height="768" loading="lazy" decoding="async" /><div className="enterprise__overlay" /><div className="shell-content enterprise__content"><SignalTag>{t(text.enterprise.tag)}</SignalTag><h2>{t(text.enterprise.titleA)}<br />{t(text.enterprise.titleB)}<br /><em>{t(text.enterprise.titleC)}</em></h2><div className="enterprise__specs">{text.enterprise.specs.map((spec) => <span key={spec.en}>{t(spec)}</span>)}</div></div><div className="enterprise__annotations" aria-hidden="true">{text.enterprise.annotations.map((item, index) => <div key={item.en}><span>{String(index + 1).padStart(2, "0")}</span><strong>{t(item)}</strong></div>)}</div><div className="enterprise__badge"><Command size={17} /><span>ONYX // CONTROLLED EXECUTION</span></div></section>

        <section className="why-onyx section-shell"><div className="shell-content why-onyx__layout"><div><SignalTag>{t(text.why.tag)}</SignalTag><h2>{t(text.why.titleA)}<br /><em>{t(text.why.titleB)}</em></h2></div><div className="why-onyx__comparison">{text.why.labels.map(([label, copy], index) => <div className={index === 3 ? "why-onyx__answer" : ""} key={label.en}><span>{t(label)}</span><strong>{t(copy)}</strong></div>)}</div></div></section>

        <section id="contact" className="final-cta section-shell"><div className="final-cta__rail" aria-hidden="true"><span /><span /><span /></div><div className="shell-content final-cta__content"><img src={assets.signalMark} alt="ONYX signal graphic" className="final-cta__mark" width="512" height="512" loading="lazy" decoding="async" /><SignalTag>{t(text.cta.tag)}</SignalTag><h2>{t(text.cta.titleA)}<br /><em>{t(text.cta.titleB)}</em></h2><p>{t(text.cta.body)}</p><div className="hero__actions"><ArrowAction href="mailto:Soheil.Mozaffari@gmail.com?subject=ONYX%20Enterprise%20Demo" solid rtl={isRtl}>{t(text.cta.demo)}</ArrowAction><ArrowAction href="mailto:Soheil.Mozaffari@gmail.com?subject=Contact%20ONYX" rtl={isRtl}>{t(text.cta.contact)}</ArrowAction></div></div></section>
      </main>

      <footer className="site-footer"><div className="shell-content site-footer__content"><div className="site-footer__brand"><img src={theme === "dark" ? assets.wideLogoDark : assets.wideLogoLight} alt="ONYX — Mission Operations Platform" className="site-footer__wide-logo" width="1320" height="360" loading="eager" decoding="async" /></div><div className="site-footer__right"><span>© {new Date().getFullYear()} ONYX</span><span><a href="https://smozaff.github.io/" target="_blank" rel="noreferrer">Soheil Mozaffari</a> · <a href="mailto:Soheil.Mozaffari@gmail.com">Soheil.Mozaffari@gmail.com</a> · <a href="https://bound-method.github.io/" target="_blank" rel="noreferrer">BOUND Method</a></span></div></div></footer>
    </div>
  );
}
