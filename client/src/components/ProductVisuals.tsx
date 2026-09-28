import React from "react";

type Locale = "en" | "fa";
type Variant = "hero" | "gallery" | "mobile" | "light";

const PRODUCT_ASSET_VERSION = "2026-09-26-2";

type ProductSurface = {
  src: string;
  label: string;
  title: { en: string; fa: string };
  description: { en: string; fa: string };
};

const desktopAssets: ProductSurface[] = [
  {
    src: `/assets/product/Desktop1.webp?v=${PRODUCT_ASSET_VERSION}`,
    label: "01",
    title: { en: "Secure access", fa: "دسترسی امن" },
    description: { en: "Sign-in gateway for the ONYX mission operations environment.", fa: "درگاه ورود به محیط عملیات مأموریتی ONYX." },
  },
  {
    src: `/assets/product/Desktop2.webp?v=${PRODUCT_ASSET_VERSION}`,
    label: "02",
    title: { en: "Policy & settings", fa: "سیاست و تنظیمات" },
    description: { en: "Mission activation policy, approval thresholds, escalation, and connection controls.", fa: "سیاست فعال‌سازی مأموریت، آستانه‌های تأیید، تشدید و کنترل‌های اتصال." },
  },
  {
    src: `/assets/product/Desktop3.webp?v=${PRODUCT_ASSET_VERSION}`,
    label: "03",
    title: { en: "Staff & organization", fa: "افراد و سازمان" },
    description: { en: "Staff profiles, reporting structure, approval authority, and verification status.", fa: "پروفایل افراد، ساختار گزارش‌دهی، اختیار تأیید و وضعیت راستی‌آزمایی." },
  },
  {
    src: `/assets/product/Desktop4.webp?v=${PRODUCT_ASSET_VERSION}`,
    label: "04",
    title: { en: "Users & permissions", fa: "کاربران و مجوزها" },
    description: { en: "Platform users, roles, access status, and operational permissions.", fa: "کاربران سامانه، نقش‌ها، وضعیت دسترسی و مجوزهای عملیاتی." },
  },
  {
    src: `/assets/product/Desktop5.webp?v=${PRODUCT_ASSET_VERSION}`,
    label: "05",
    title: { en: "Authority workflow", fa: "گردش‌کار اختیار" },
    description: { en: "Pending decisions with approval, rejection, lifecycle, and authority context.", fa: "تصمیم‌های در انتظار با زمینه تأیید، رد، چرخه عمر و اختیار." },
  },
  {
    src: `/assets/product/Desktop6.webp?v=${PRODUCT_ASSET_VERSION}`,
    label: "06",
    title: { en: "Mission operations queue", fa: "صف عملیات مأموریت" },
    description: { en: "Tasks with owners, priority, dependencies, due dates, status, and attachments.", fa: "کارها با مالک، اولویت، وابستگی، مهلت، وضعیت و پیوست‌ها." },
  },
  {
    src: `/assets/product/Desktop7.webp?v=${PRODUCT_ASSET_VERSION}`,
    label: "07",
    title: { en: "Mission detail & authority timeline", fa: "جزئیات مأموریت و خط زمانی اختیار" },
    description: { en: "Mission objectives, authority state, outcomes, and a visible operational timeline.", fa: "اهداف مأموریت، وضعیت اختیار، نتایج و خط زمانی قابل مشاهده عملیات." },
  },
  {
    src: `/assets/product/Desktop8.webp?v=${PRODUCT_ASSET_VERSION}`,
    label: "08",
    title: { en: "Mission portfolio", fa: "پرتفوی مأموریت‌ها" },
    description: { en: "Plan, execute, monitor, and deliver across active and planned missions.", fa: "برنامه‌ریزی، اجرا، پایش و تحویل در میان مأموریت‌های فعال و برنامه‌ریزی‌شده." },
  },
  {
    src: `/assets/product/Desktop9.webp?v=${PRODUCT_ASSET_VERSION}`,
    label: "09",
    title: { en: "Operational dashboard", fa: "داشبورد عملیاتی" },
    description: { en: "Mission activity, recent events, team presence, system status, and synchronization conflicts.", fa: "فعالیت مأموریت، رویدادهای اخیر، حضور تیم، وضعیت سامانه و تعارض‌های همگام‌سازی." },
  },
];

const mobileAssets: ProductSurface[] = [
  {
    src: `/assets/product/Mobile1.webp?v=${PRODUCT_ASSET_VERSION}`,
    label: "01",
    title: { en: "Mobile overview & sync conflict", fa: "نمای موبایل و تعارض همگام‌سازی" },
    description: { en: "Operational overview with resource utilization and an explicit synchronization conflict.", fa: "نمای عملیاتی با استفاده از منابع و یک تعارض صریح همگام‌سازی." },
  },
  {
    src: `/assets/product/Mobile2.webp?v=${PRODUCT_ASSET_VERSION}`,
    label: "02",
    title: { en: "Mobile mission authority", fa: "اختیار مأموریت در موبایل" },
    description: { en: "Mission progress, authority state, description, and approval actions.", fa: "پیشرفت مأموریت، وضعیت اختیار، توضیحات و اقدامات تأیید." },
  },
  {
    src: `/assets/product/Mobile3.webp?v=${PRODUCT_ASSET_VERSION}`,
    label: "03",
    title: { en: "Mobile operational overview", fa: "نمای عملیاتی موبایل" },
    description: { en: "Active mission status, conflicts, pending items, and recent operational activity.", fa: "وضعیت مأموریت فعال، تعارض‌ها، موارد در انتظار و فعالیت عملیاتی اخیر." },
  },
];

const lightCopy = {
  en: {
    tag: "PRODUCT / LIGHT INTERFACE",
    title: "The same operating model, in a lighter field.",
    body: "These light-mode surfaces show the product language without changing the underlying operating model: state, authority, work, and evidence remain connected.",
  },
  fa: {
    tag: "محصول / رابط روشن",
    title: "همان مدل عملیاتی، در یک سطح روشن‌تر.",
    body: "این نماهای روشن، زبان محصول را نشان می‌دهند بدون اینکه مدل عملیاتی تغییر کند؛ وضعیت، اختیار، کار و شواهد همچنان به هم متصل‌اند.",
  },
} as const;

const copy = {
  en: {
    heroTag: "PRODUCT / LIVE SURFACE",
    heroTitle: "See ONYX in operation.",
    heroBody: "The interface keeps the operating model visible: work, state, people, decisions, and evidence in one visual field.",
    galleryTag: "PRODUCT / INTERFACE",
    galleryTitle: "The system, not a mockup.",
    galleryBody: "Each view is labeled by the operational surface it demonstrates, so the screenshots function as product evidence rather than decorative tiles.",
    mobileTag: "PRODUCT / FIELD SURFACE",
    mobileTitle: "The operation travels with the team.",
    mobileBody: "Mobile views extend the same operational model into a compact surface for work away from the primary desktop environment.",
  },
  fa: {
    heroTag: "محصول / سطح زنده",
    heroTitle: "ONYX را در عمل ببینید.",
    heroBody: "رابط کاربری مدل عملیاتی را قابل مشاهده نگه می‌دارد: کار، وضعیت، افراد، تصمیم‌ها و شواهد در یک میدان بصری.",
    galleryTag: "محصول / رابط کاربری",
    galleryTitle: "خود سامانه، نه یک ماکاپ.",
    galleryBody: "هر نما بر اساس سطح عملیاتی که نشان می‌دهد برچسب‌گذاری شده است تا تصاویر به‌عنوان شواهد محصول عمل کنند، نه کاشی‌های تزئینی.",
    mobileTag: "محصول / سطح میدانی",
    mobileTitle: "عملیات همراه تیم حرکت می‌کند.",
    mobileBody: "نماهای موبایل همان مدل عملیاتی را به سطحی فشرده برای کار خارج از محیط اصلی دسکتاپ می‌آورند.",
  },
} as const;

function Kicker({ children }: { children: React.ReactNode }) {
  return <div className="product-visuals__kicker"><span />{children}</div>;
}

function SurfaceCaption({ surface, locale }: { surface: ProductSurface; locale: Locale }) {
  return (
    <figcaption className="product-visuals__caption">
      <span>{locale === "fa" ? `دسکتاپ / ${surface.label}` : `DESKTOP / ${surface.label}`}</span>
      <strong>{surface.title[locale]}</strong>
      <p>{surface.description[locale]}</p>
    </figcaption>
  );
}

export default function ProductVisuals({ locale, variant = "gallery" }: { locale: Locale; variant?: Variant }) {
  const t = copy[locale];
  const rtl = locale === "fa";

  if (variant === "hero") {
    const surface = desktopAssets[6];
    return (
      <section className="product-visuals product-visuals--hero" dir={rtl ? "rtl" : "ltr"}>
        <div className="shell-content">
          <div className="product-visuals__hero-copy">
            <Kicker>{t.heroTag}</Kicker>
            <h2>{t.heroTitle}</h2>
            <p>{t.heroBody}</p>
          </div>
          <figure className="product-visuals__hero-frame">
            <img src={surface.src} alt={surface.title[locale] + " — " + surface.description[locale]} loading="eager" fetchPriority="high" decoding="async" />
            <div className="product-visuals__scan" aria-hidden="true" />
            <SurfaceCaption surface={surface} locale={locale} />
          </figure>
        </div>
      </section>
    );
  }

  if (variant === "light") {
    const copyText = lightCopy[locale];
    return (
      <section className="product-visuals product-visuals--light" dir={rtl ? "rtl" : "ltr"}>
        <div className="shell-content">
          <div className="product-visuals__heading">
            <Kicker>{copyText.tag}</Kicker>
            <h2>{copyText.title}</h2>
            <p>{copyText.body}</p>
          </div>
          <div className="product-visuals__light-grid">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <figure key={index}>
                <div className="product-visuals__image">
                  <img src={`/assets/UI/UI%20lightmode${index}.webp`} alt={locale === "fa" ? `نمونه رابط روشن ONYX شماره ${index}` : `ONYX light-mode interface sample ${index}`} loading="lazy" decoding="async" />
                  <span>{String(index).padStart(2, "0")} / ONYX UI</span>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "mobile") {
    return (
      <section className="product-visuals product-visuals--mobile" dir={rtl ? "rtl" : "ltr"}>
        <div className="shell-content product-visuals__mobile-layout">
          <div className="product-visuals__mobile-copy">
            <Kicker>{t.mobileTag}</Kicker>
            <h2>{t.mobileTitle}</h2>
            <p>{t.mobileBody}</p>
          </div>
          <div className="product-visuals__mobile-grid">
            {mobileAssets.map((surface) => (
              <figure key={surface.src}>
                <img src={surface.src} alt={surface.title[locale] + " — " + surface.description[locale]} loading="lazy" decoding="async" />
                <figcaption className="product-visuals__caption">
                  <span>{locale === "fa" ? `موبایل / ${surface.label}` : `MOBILE / ${surface.label}`}</span>
                  <strong>{surface.title[locale]}</strong>
                  <p>{surface.description[locale]}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="product-visuals product-visuals--gallery" dir={rtl ? "rtl" : "ltr"}>
      <div className="shell-content">
        <div className="product-visuals__heading">
          <Kicker>{t.galleryTag}</Kicker>
          <h2>{t.galleryTitle}</h2>
          <p>{t.galleryBody}</p>
        </div>
        <div className="product-visuals__gallery">
          {desktopAssets.map((surface) => (
            <figure key={surface.src}>
              <div className="product-visuals__image">
                <img src={surface.src} alt={surface.title[locale] + " — " + surface.description[locale]} loading="lazy" decoding="async" />
              </div>
              <SurfaceCaption surface={surface} locale={locale} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}