import React, { useEffect, useState } from "react";

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
  ["1","Secure access","دسترسی امن","Sign-in gateway for the ONYX mission operations environment.","درگاه ورود به محیط عملیات مأموریتی ONYX."],
  ["2","Policy & settings","سیاست و تنظیمات","Mission activation policy, approval thresholds, escalation, and connection controls.","سیاست فعال‌سازی مأموریت، آستانه‌های تأیید، تشدید و کنترل‌های اتصال."],
  ["3","Staff & organization","افراد و سازمان","Staff profiles, reporting structure, approval authority, and verification status.","پروفایل افراد، ساختار گزارش‌دهی، اختیار تأیید و وضعیت راستی‌آزمایی."],
  ["4","Users & permissions","کاربران و مجوزها","Platform users, roles, access status, and operational permissions.","کاربران سامانه، نقش‌ها، وضعیت دسترسی و مجوزهای عملیاتی."],
  ["5","Authority workflow","گردش‌کار اختیار","Pending decisions with approval, rejection, lifecycle, and authority context.","تصمیم‌های در انتظار با زمینه تأیید، رد، چرخه عمر و اختیار."],
  ["6","Mission operations queue","صف عملیات مأموریت","Tasks with owners, priority, dependencies, due dates, status, and attachments.","کارها با مالک، اولویت، وابستگی، مهلت، وضعیت و پیوست‌ها."],
  ["7","Mission detail & authority timeline","جزئیات مأموریت و خط زمانی اختیار","Mission objectives, authority state, outcomes, and a visible operational timeline.","اهداف مأموریت، وضعیت اختیار، نتایج و خط زمانی قابل مشاهده عملیات."],
  ["8","Mission portfolio","پرتفوی مأموریت‌ها","Plan, execute, monitor, and deliver across active and planned missions.","برنامه‌ریزی، اجرا، پایش و تحویل در میان مأموریت‌های فعال و برنامه‌ریزی‌شده."],
  ["9","Operational dashboard","داشبورد عملیاتی","Mission activity, recent events, team presence, system status, and synchronization conflicts.","فعالیت مأموریت، رویدادهای اخیر، حضور تیم، وضعیت سامانه و تعارض‌های همگام‌سازی."],
].map(([label,enTitle,faTitle,enDescription,faDescription]) => ({
  src: `/assets/product/Desktop${label}.webp?v=${PRODUCT_ASSET_VERSION}`,
  label,
  title: { en: enTitle, fa: faTitle },
  description: { en: enDescription, fa: faDescription },
}));

const mobileAssets: ProductSurface[] = [
  ["1","Mobile overview & sync conflict","نمای موبایل و تعارض همگام‌سازی","Operational overview with resource utilization and an explicit synchronization conflict.","نمای عملیاتی با استفاده از منابع و یک تعارض صریح همگام‌سازی."],
  ["2","Mobile mission authority","اختیار مأموریت در موبایل","Mission progress, authority state, description, and approval actions.","پیشرفت مأموریت، وضعیت اختیار، توضیحات و اقدامات تأیید."],
  ["3","Mobile operational overview","نمای عملیاتی موبایل","Active mission status, conflicts, pending items, and recent operational activity.","وضعیت مأموریت فعال، تعارض‌ها، موارد در انتظار و فعالیت عملیاتی اخیر."],
].map(([label,enTitle,faTitle,enDescription,faDescription]) => ({
  src: `/assets/product/Mobile${label}.webp?v=${PRODUCT_ASSET_VERSION}`,
  label,
  title: { en: enTitle, fa: faTitle },
  description: { en: enDescription, fa: faDescription },
}));

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
    galleryBody: "Browse the product surfaces one at a time. Each view is labeled by the operational surface it demonstrates, so the interface remains evidence rather than a wall of screenshots.",
    mobileTag: "PRODUCT / FIELD SURFACE",
    mobileTitle: "The operation travels with the team.",
    mobileBody: "Browse compact mobile surfaces that extend the same operational model away from the primary desktop environment.",
  },
  fa: {
    heroTag: "محصول / سطح زنده",
    heroTitle: "ONYX را در عمل ببینید.",
    heroBody: "رابط کاربری مدل عملیاتی را قابل مشاهده نگه می‌دارد: کار، وضعیت، افراد، تصمیم‌ها و شواهد در یک میدان بصری.",
    galleryTag: "محصول / رابط کاربری",
    galleryTitle: "خود سامانه، نه یک ماکاپ.",
    galleryBody: "نماهای محصول را یکی‌یکی مرور کنید. هر نما بر اساس سطح عملیاتی که نشان می‌دهد برچسب‌گذاری شده است تا رابط، شواهد محصول باشد نه دیواری از تصاویر.",
    mobileTag: "محصول / سطح میدانی",
    mobileTitle: "عملیات همراه تیم حرکت می‌کند.",
    mobileBody: "نماهای فشرده موبایل را مرور کنید؛ همان مدل عملیاتی، خارج از محیط اصلی دسکتاپ.",
  },
} as const;

function Kicker({ children }: { children: React.ReactNode }) {
  return <div className="product-visuals__kicker"><span />{children}</div>;
}

function SurfaceCaption({ surface, locale, mobile = false }: { surface: ProductSurface; locale: Locale; mobile?: boolean }) {
  return (
    <figcaption className="product-visuals__caption">
      <span>{locale === "fa" ? `${mobile ? "موبایل" : "دسکتاپ"} / ${surface.label}` : `${mobile ? "MOBILE" : "DESKTOP"} / ${surface.label}`}</span>
      <strong>{surface.title[locale]}</strong>
      <p>{surface.description[locale]}</p>
    </figcaption>
  );
}

function SurfaceSlider({
  surfaces,
  locale,
  mobile = false,
  label,
}: {
  surfaces: ProductSurface[];
  locale: Locale;
  mobile?: boolean;
  label: string;
}) {
  const [active, setActive] = useState(0);
  const total = surfaces.length;
  const surface = surfaces[active];

  useEffect(() => {
    setActive(0);
  }, [total]);

  const move = (direction: number) => {
    setActive((current) => (current + direction + total) % total);
  };

  return (
    <div className={`product-visuals__slider ${mobile ? "product-visuals__slider--mobile" : ""}`}>
      <div className="product-visuals__slider-top">
        <span className="product-visuals__slider-count">{String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <div className="product-visuals__slider-controls" aria-label={label}>
          <button type="button" onClick={() => move(-1)} aria-label={locale === "fa" ? "تصویر قبلی" : "Previous image"}>←</button>
          <button type="button" onClick={() => move(1)} aria-label={locale === "fa" ? "تصویر بعدی" : "Next image"}>→</button>
        </div>
      </div>
      <figure className="product-visuals__slider-frame">
        <img
          key={surface.src}
          src={surface.src}
          alt={surface.title[locale] + " — " + surface.description[locale]}
          loading="eager"
          decoding="async"
        />
        <SurfaceCaption surface={surface} locale={locale} mobile={mobile} />
      </figure>
      <div className="product-visuals__slider-dots" role="tablist" aria-label={label}>
        {surfaces.map((item, index) => (
          <button
            key={item.src}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-label={`${index + 1}: ${item.title[locale]}`}
            onClick={() => setActive(index)}
          >
            <span />
          </button>
        ))}
      </div>
    </div>
  );
}

function LightSlider({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const total = 6;
  const move = (direction: number) => setActive((current) => (current + direction + total) % total);
  return (
    <div className="product-visuals__slider product-visuals__slider--light">
      <div className="product-visuals__slider-top">
        <span className="product-visuals__slider-count">{String(active + 1).padStart(2, "0")} / 06</span>
        <div className="product-visuals__slider-controls" aria-label={locale === "fa" ? "نمونه‌های رابط روشن" : "Light interface samples"}>
          <button type="button" onClick={() => move(-1)} aria-label={locale === "fa" ? "نمونه قبلی" : "Previous sample"}>←</button>
          <button type="button" onClick={() => move(1)} aria-label={locale === "fa" ? "نمونه بعدی" : "Next sample"}>→</button>
        </div>
      </div>
      <figure className="product-visuals__slider-frame">
        <img
          key={active}
          src={`/assets/UI/UI%20lightmode${active + 1}.webp`}
          alt={locale === "fa" ? `نمونه رابط روشن ONYX شماره ${active + 1}` : `ONYX light-mode interface sample ${active + 1}`}
          loading="eager"
          decoding="async"
        />
        <figcaption className="product-visuals__caption">
          <span>{locale === "fa" ? `رابط روشن / ${String(active + 1).padStart(2, "0")}` : `LIGHT UI / ${String(active + 1).padStart(2, "0")}`}</span>
          <strong>{locale === "fa" ? "سطح رابط روشن ONYX" : "ONYX light interface surface"}</strong>
        </figcaption>
      </figure>
      <div className="product-visuals__slider-dots" role="tablist" aria-label={locale === "fa" ? "نمونه‌های رابط روشن" : "Light interface samples"}>
        {Array.from({ length: total }, (_, index) => (
          <button key={index} type="button" role="tab" aria-selected={index === active} aria-label={`${index + 1}`} onClick={() => setActive(index)}><span /></button>
        ))}
      </div>
    </div>
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
          <LightSlider locale={locale} />
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
          <SurfaceSlider surfaces={mobileAssets} locale={locale} mobile label={t.mobileTitle} />
        </div>
      </section>
    );
  }

  return (
    <section className="product-visuals product-visuals--gallery" dir={rtl ? "rtl" : "ltr"} id="product-gallery">
      <div className="shell-content">
        <div className="product-visuals__heading">
          <Kicker>{t.galleryTag}</Kicker>
          <h2>{t.galleryTitle}</h2>
          <p>{t.galleryBody}</p>
        </div>
        <SurfaceSlider surfaces={desktopAssets} locale={locale} label={t.galleryTitle} />
      </div>
    </section>
  );
}
