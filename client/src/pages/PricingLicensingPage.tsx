import { ArrowLeft, ArrowRight, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import SiteHeader, { getInitialTheme } from "./SiteHeader";

type Locale = "en" | "fa";
type Theme = "light" | "dark";

const copy = {
  en: {
    tag:"ONYX / ENTERPRISE", eyebrow:"COMMERCIAL MODEL",
    title:"THE RIGHT MODEL FOR",
    intro:"Choose how ONYX is deployed, licensed, supported, and extended. Commercial terms are scoped to the operation rather than forced into a generic public price tier.",
    product:"Product", architecture:"Architecture", security:"Security", investors:"Investors", contact:"Contact", language:"فارسی", light:"Light mode", dark:"Dark mode",
    notice:"SCOPED COMMERCIAL MODEL",
    noticeBody:"ONYX does not currently publish numeric pricing or fixed public tiers. Deployment, licensed scope, support, and custom work are defined together in the commercial agreement.",
    models:[
      {label:"01 / HOSTED",title:"SaaS / Subscription",body:"For hosted deployments, commercial terms can be structured around the customer’s organization, users, active users, workspace, storage, feature scope, or another agreed entitlement model. Service operation, data handling, support, and availability commitments are defined separately in the applicable agreement.",items:["Hosted service","Recurring subscription","Server-side entitlement","Support and service terms defined by agreement"]},
      {label:"02 / SELF-MANAGED",title:"Enterprise / On-Premise",body:"For customer-controlled environments, the license defines the organization, deployment scope, production and non-production rights, term, update rights, support level, and offline activation or entitlement behavior. The model is suitable for on-premise or other self-managed environments where the customer controls infrastructure and network boundaries.",items:["Self-managed deployment","Organization/site scope","Production, staging, and backup rights defined contractually","Signed entitlement can define features and expiry"]},
      {label:"03 / CUSTOM",title:"Customized Enterprise Edition",body:"Custom development is handled through an explicit Statement of Work and commercial agreement. ONYX background IP and generalized improvements remain ONYX property by default; customer data and confidential information remain subject to the customer agreement; custom-feature ownership or licensing must be expressly defined.",items:["Statement of Work","Milestones and acceptance","Change control","Explicit custom-feature IP treatment"]},
    ],
    principlesLabel:"04 / LICENSING PRINCIPLES",principlesTitle:"The commercial boundary stays clear.",
    principles:[
      ["ONYX CORE IP","Customers receive contractual rights to use ONYX; ownership of the ONYX codebase does not transfer by default."],
      ["CUSTOMER DATA","Customer data belongs to the customer, subject to the applicable agreement."],
      ["BACKGROUND IP","Pre-existing and generalized ONYX capabilities remain ONYX property."],
      ["CUSTOM FEATURES","Ownership or licensing of customer-specific development must be expressly defined; it is not assumed."],
      ["THIRD-PARTY SOFTWARE","Distributed components remain subject to their applicable licenses and required notices."],
    ],
    supportLabel:"05 / SUPPORT & SERVICES",supportTitle:"Support and service terms are scoped to what is actually delivered.",supportBody:"Where support or an SLA is offered, the agreement should define support hours, severity levels, response targets, availability measurement, maintenance windows, service credits where applicable, and customer responsibilities. ONYX does not publish blanket uptime guarantees on this page.",
    enterpriseLabel:"06 / ENTERPRISE READINESS",enterpriseTitle:"Ready for a substantive evaluation.",
    enterpriseBody:"Enterprise technical diligence can cover security boundaries, deployment architecture, data handling, synchronization behavior, identity/authority, software inventory, release controls, and the evidence available for the capabilities being evaluated. Commercial diligence can then cover licensing scope, ONYX background IP, customer data and confidential information, custom development, support/SLA terms, and customer exit requirements. A typical evaluation path is scoped workflow → technical review → deployment/security review → commercial/legal review → agreed pilot or production scope.",
    finalLabel:"07 / COMMERCIAL DISCUSSION",finalTitle:"Define the right model for your operation.",finalBody:"Tell us your deployment environment, organization scope, operational requirements, and support expectations. We can scope the appropriate commercial model and terms.",contactCta:"Request a commercial discussion",home:"Back to home"
  },
  fa: {
    tag:"ONYX / سازمانی", eyebrow:"مدل تجاری",
    title:"مدل مناسب برای",
    intro:"روش استقرار، مجوزدهی، پشتیبانی و توسعه ONYX بر اساس نیاز عملیات تعریف می‌شود؛ نه بر اساس یک بسته عمومی ثابت.",
    product:"محصول", architecture:"معماری", security:"امنیت", investors:"سرمایه‌گذاران", contact:"تماس", language:"فارسی", light:"حالت روشن", dark:"حالت تاریک",
    notice:"مدل تجاری متناسب",
    noticeBody:"ONYX در حال حاضر قیمت عددی یا بسته‌های ثابت عمومی منتشر نمی‌کند. استقرار، دامنه مجوز، پشتیبانی و کار سفارشی در توافق تجاری مشخص می‌شوند.",
    models:[
      {label:"۰۱ / میزبانی‌شده",title:"SaaS / اشتراک",body:"برای استقرارهای میزبانی‌شده، شرایط تجاری می‌تواند بر اساس سازمان، کاربر، کاربر فعال، فضای کاری، ذخیره‌سازی، دامنه قابلیت‌ها یا مدل entitlement مورد توافق تنظیم شود.",items:["سرویس میزبانی‌شده","اشتراک دوره‌ای","اعمال entitlement در سمت سرور","شرایط پشتیبانی و سرویس در قرارداد"]},
      {label:"۰۲ / مدیریت مشتری",title:"سازمانی / درون‌سازمانی",body:"برای محیط‌هایی که توسط مشتری کنترل می‌شوند، مجوز سازمان، دامنه استقرار، حقوق تولید و غیرتولید، مدت، به‌روزرسانی، سطح پشتیبانی و رفتار فعال‌سازی آفلاین یا entitlement را مشخص می‌کند.",items:["استقرار تحت مدیریت مشتری","دامنه سازمان/سایت","حقوق تولید، staging و پشتیبان‌گیری در قرارداد","امکان تعریف قابلیت‌ها و انقضا در entitlement امضاشده"]},
      {label:"۰۳ / سفارشی",title:"نسخه سازمانی سفارشی",body:"توسعه سفارشی از طریق توافق تجاری صریح انجام می‌شود. مالکیت فکری پایه ONYX به‌صورت پیش‌فرض متعلق به ONYX می‌ماند و داده و اطلاعات محرمانه مشتری تابع قرارداد هستند.",items:["Statement of Work","مراحل و پذیرش","کنترل تغییرات","تعریف صریح مالکیت فکری قابلیت سفارشی"]},
    ],
    principlesLabel:"۰۴ / اصول مجوزدهی",principlesTitle:"مرز تجاری باید روشن بماند.",
    principles:[
      ["هسته ONYX","مشتری حقوق قراردادی استفاده از ONYX را دریافت می‌کند؛ مالکیت کد ONYX به‌صورت پیش‌فرض منتقل نمی‌شود."],
      ["داده مشتری","داده مشتری، مطابق قرارداد مربوطه، متعلق به مشتری است."],
      ["مالکیت فکری پایه","قابلیت‌های پیشین و عمومی‌شده ONYX متعلق به ONYX باقی می‌مانند."],
      ["قابلیت‌های سفارشی","مالکیت یا مجوز توسعه سفارشی باید صریحاً تعریف شود و به‌صورت پیش‌فرض فرض نمی‌شود."],
      ["نرم‌افزار ثالث","اجزای توزیع‌شده همچنان تابع مجوزهای مربوط و الزامات اعلان آن‌ها هستند."],
    ],
    supportLabel:"۰۵ / پشتیبانی و خدمات",supportTitle:"شرایط پشتیبانی بر اساس چیزی که واقعاً ارائه می‌شود تعریف می‌شوند.",supportBody:"در صورت ارائه پشتیبانی یا SLA، قرارداد باید ساعات پشتیبانی، سطوح شدت، اهداف پاسخ، نحوه سنجش دسترس‌پذیری، پنجره‌های نگهداری، اعتبار خدمات در صورت وجود و مسئولیت‌های مشتری را مشخص کند. این صفحه تضمین عمومی uptime ارائه نمی‌کند.",
    enterpriseLabel:"۰۶ / آمادگی سازمانی",enterpriseTitle:"آماده برای یک ارزیابی جدی.",
    enterpriseBody:"گفت‌وگوهای سازمانی می‌توانند امنیت، معماری استقرار، داده، دامنه مجوز، پشتیبانی، موجودی نرم‌افزار و الزامات خروج مشتری را پوشش دهند. برنامه آمادگی تجاری همچنین SBOM کنترل‌شده، اعلان‌های نرم‌افزار ثالث، مستندات حریم خصوصی و حاکمیت انتشار/حقوقی را برای توزیع پولی پیش‌بینی می‌کند.",
    finalLabel:"۰۷ / گفت‌وگوی تجاری",finalTitle:"مرز تجاری مناسب عملیات خود را تعریف کنید.",finalBody:"محیط استقرار، دامنه سازمان، نیازهای عملیاتی و انتظارات پشتیبانی خود را بیان کنید تا مدل مجوزدهی و شرایط تجاری متناسب مشخص شود.",contactCta:"درخواست گفت‌وگوی تجاری",home:"بازگشت به خانه"
  }
} as const;

export default function PricingLicensingPage({locale}:{locale:Locale}){
 const rtl=locale==="fa"; const c=copy[locale]; const [theme,setTheme]=useState<Theme>(getInitialTheme);
 const href=(p:string)=>p?"/"+locale+"/"+p+"/":"/"+locale+"/";
 useEffect(()=>{const s=window.localStorage.getItem("onyx-theme") as Theme|null;const p=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";setTheme(s==="dark"||s==="light"?s:p)},[]);
 useEffect(()=>{document.documentElement.dataset.theme=theme;window.localStorage.setItem("onyx-theme",theme)},[theme]);
 return <main className={"pricing-page pricing-page--"+theme} dir={rtl?"rtl":"ltr"}>
  <SiteHeader locale={locale} theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} activePage="pricing" />
  <section className="pricing-hero"><div className="pricing-grid" aria-hidden="true"/><div className="shell-content pricing-hero__inner"><div className="pricing-kicker"><span/>{c.tag}</div><p className="pricing-eyebrow">{c.eyebrow}</p><h1>{c.title}</h1><p className="pricing-intro">{c.intro}</p></div></section>
  <section className="pricing-notice"><div className="shell-content pricing-notice__inner"><span className="pricing-label">{c.notice}</span><p>{c.noticeBody}</p></div></section>
  <section className="pricing-models"><div className="shell-content"><div className="pricing-model-grid">{c.models.map((m)=><article className="pricing-card" key={m.label}><span className="pricing-label">{m.label}</span><h2>{m.title}</h2><p>{m.body}</p><ul>{m.items.map(item=><li key={item}>{item}</li>)}</ul></article>)}</div></div></section>
  <section className="pricing-section"><div className="shell-content pricing-two-col"><div><span className="pricing-label">{c.principlesLabel}</span><h2>{c.principlesTitle}</h2></div><div className="pricing-list">{c.principles.map(([label,body])=><article key={label}><span>{label}</span><p>{body}</p></article>)}</div></div></section>
  <section className="pricing-support"><div className="shell-content pricing-two-col"><div><span className="pricing-label">{c.supportLabel}</span><h2>{c.supportTitle}</h2></div><p>{c.supportBody}</p></div></section>
  <section className="pricing-section"><div className="shell-content pricing-two-col"><div><span className="pricing-label">{c.enterpriseLabel}</span><h2>{c.enterpriseTitle}</h2></div><p>{c.enterpriseBody}</p></div></section>
  <section className="pricing-final"><div className="shell-content pricing-final__inner"><div><span className="pricing-label">{c.finalLabel}</span><h2>{c.finalTitle}</h2><p>{c.finalBody}</p></div><a href={href("contact")} className="pricing-action">{c.contactCta}</a></div></section>
  <footer className="pricing-footer"><div className="shell-content pricing-footer__inner"><a href={href("")}>{rtl?<ArrowRight size={15}/>:<ArrowLeft size={15}/>} {c.home}</a><span>ONYX / PRICING &amp; LICENSING</span></div></footer>
 </main>
}
