import React from "react";

type Locale = "en" | "fa";
type Variant = "hero" | "gallery" | "mobile";

const desktopAssets = Array.from({ length: 9 }, (_, i) => ({
  src: `/assets/product/Desktop${i + 1}.webp`,
  label: String(i + 1).padStart(2, "0"),
}));

const mobileAssets = Array.from({ length: 3 }, (_, i) => ({
  src: `/assets/product/Mobile${i + 1}.webp`,
  label: String(i + 1).padStart(2, "0"),
}));

const copy = {
  en: {
    heroTag: "PRODUCT / LIVE SURFACE",
    heroTitle: "See ONYX in operation.",
    heroBody: "The interface keeps the operating model visible: work, state, people, decisions, and evidence in one visual field.",
    galleryTag: "PRODUCT / INTERFACE",
    galleryTitle: "The system, not a mockup.",
    galleryBody: "These product views are presented as interface evidence. The surrounding narrative explains what each surface is responsible for; the images show the system itself.",
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
    galleryBody: "این نماها به‌عنوان شواهد رابط کاربری ارائه می‌شوند. روایت اطراف مسئولیت هر سطح را توضیح می‌دهد و تصاویر خود سامانه را نشان می‌دهند.",
    mobileTag: "محصول / سطح میدانی",
    mobileTitle: "عملیات همراه تیم حرکت می‌کند.",
    mobileBody: "نماهای موبایل همان مدل عملیاتی را به سطحی فشرده برای کار خارج از محیط اصلی دسکتاپ می‌آورند.",
  },
} as const;

function Kicker({ children }: { children: React.ReactNode }) {
  return <div className="product-visuals__kicker"><span />{children}</div>;
}

export default function ProductVisuals({ locale, variant = "gallery" }: { locale: Locale; variant?: Variant }) {
  const t = copy[locale];
  const rtl = locale === "fa";

  if (variant === "hero") {
    return (
      <section className="product-visuals product-visuals--hero" dir={rtl ? "rtl" : "ltr"}>
        <div className="shell-content">
          <div className="product-visuals__hero-copy">
            <Kicker>{t.heroTag}</Kicker>
            <h2>{t.heroTitle}</h2>
            <p>{t.heroBody}</p>
          </div>
          <div className="product-visuals__hero-frame">
            <img src={desktopAssets[0].src} alt="ONYX desktop product interface" loading="eager" decoding="async" />
            <div className="product-visuals__scan" aria-hidden="true" />
            <span>DESKTOP / 01</span>
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
            {mobileAssets.map((asset) => (
              <figure key={asset.src}>
                <img src={asset.src} alt={`ONYX mobile product interface ${asset.label}`} loading="lazy" decoding="async" />
                <figcaption>MOBILE / {asset.label}</figcaption>
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
          {desktopAssets.map((asset) => (
            <figure key={asset.src}>
              <div className="product-visuals__image">
                <img src={asset.src} alt={`ONYX desktop product interface ${asset.label}`} loading="lazy" decoding="async" />
                <span>DESKTOP / {asset.label}</span>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
