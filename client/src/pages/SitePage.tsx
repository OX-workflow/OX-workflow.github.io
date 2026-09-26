import { ArrowLeft, ArrowRight } from "lucide-react";

type Locale = "en" | "fa";

type PageKey =
  | "product"
  | "solutions"
  | "architecture"
  | "security"
  | "roadmap"
  | "about"
  | "resources"
  | "contact"
  | "investors"
  | "pricing";

const pages: Record<PageKey, { title: { en: string; fa: string }; description: { en: string; fa: string } }> = {
  product: {
    title: { en: "Product", fa: "محصول" },
    description: {
      en: "The ONYX product surface will explain the platform, its operating model, capabilities, and deployment options.",
      fa: "صفحه محصول ONYX پلتفرم، مدل عملیاتی، قابلیت‌ها و گزینه‌های استقرار آن را توضیح خواهد داد.",
    },
  },
  solutions: {
    title: { en: "Solutions", fa: "راهکارها" },
    description: {
      en: "The Solutions section will describe operational scenarios and the environments ONYX is designed to support.",
      fa: "بخش راهکارها سناریوهای عملیاتی و محیط‌هایی را که ONYX برای پشتیبانی از آن‌ها طراحی شده است توضیح خواهد داد.",
    },
  },
  architecture: {
    title: { en: "Architecture", fa: "معماری" },
    description: {
      en: "The Architecture section will document the ONYX system model from mission flow to technical implementation.",
      fa: "بخش معماری مدل سامانه ONYX را از جریان مأموریت تا پیاده‌سازی فنی مستند خواهد کرد.",
    },
  },
  security: {
    title: { en: "Security", fa: "امنیت" },
    description: {
      en: "The Security section will document identity, authority, data protection, auditability, and deployment security.",
      fa: "بخش امنیت هویت، اختیار، حفاظت داده، ممیزی و امنیت استقرار را مستند خواهد کرد.",
    },
  },
  roadmap: {
    title: { en: "Roadmap", fa: "نقشه راه" },
    description: {
      en: "The Roadmap will distinguish shipped capabilities from work in development, planned work, and research.",
      fa: "نقشه راه قابلیت‌های ارائه‌شده، در حال توسعه، برنامه‌ریزی‌شده و پژوهشی را از یکدیگر تفکیک خواهد کرد.",
    },
  },
  about: {
    title: { en: "About", fa: "درباره" },
    description: {
      en: "The About section will explain the ONYX mission, origin, team, and engineering philosophy.",
      fa: "بخش درباره مأموریت، خاستگاه، تیم و فلسفه مهندسی ONYX را توضیح خواهد داد.",
    },
  },
  resources: {
    title: { en: "Resources", fa: "منابع" },
    description: {
      en: "Resources will collect product briefs, architecture material, technical documentation, media, and related references.",
      fa: "منابع شامل معرفی محصول، مطالب معماری، مستندات فنی، رسانه و مراجع مرتبط خواهد بود.",
    },
  },
  contact: {
    title: { en: "Contact / Demo", fa: "تماس / دمو" },
    description: {
      en: "The Contact section will provide the primary path for enterprise enquiries, demonstrations, and direct communication.",
      fa: "بخش تماس مسیر اصلی برای درخواست‌های سازمانی، دمو و ارتباط مستقیم را فراهم خواهد کرد.",
    },
  },
  pricing: {
    title: { en: "Pricing & Licensing", fa: "قیمت‌گذاری و مجوزدهی" },
    description: {
      en: "ONYX commercial models, licensing principles, and enterprise deployment terms.",
      fa: "مدل‌های تجاری، اصول مجوزدهی و شرایط استقرار سازمانی ONYX.",
    },
  },
  investors: {
    title: { en: "Investors", fa: "سرمایه‌گذاران" },
    description: {
      en: "The Investor section will present the product, technology, market context, roadmap, and commercial information.",
      fa: "بخش سرمایه‌گذاران محصول، فناوری، زمینه بازار، نقشه راه و اطلاعات تجاری را ارائه خواهد کرد.",
    },
  },
};

function localizedHref(locale: Locale, page: PageKey) {
  return `/${locale}/${page}/`;
}

export default function SitePage({
  locale,
  page,
}: {
  locale: Locale;
  page: PageKey;
}) {
  const rtl = locale === "fa";
  const copy = pages[page];
  const Arrow = rtl ? ArrowRight : ArrowLeft;
  const homeHref = `/${locale}/`;

  return (
    <main className="site-page-shell" dir={rtl ? "rtl" : "ltr"}>
      <div className="shell-content site-page">
        <div className="signal-tag">
          <span className="signal-tag__node" />
          <span>{rtl ? "ONYX / ساختار سایت" : "ONYX / SITE ARCHITECTURE"}</span>
        </div>
        <h1>{copy.title[locale]}</h1>
        <p>{copy.description[locale]}</p>
        <div className="site-page__actions">
          <a className="arrow-action arrow-action--solid" href={homeHref}>
            <Arrow size={15} strokeWidth={1.8} />
            <span>{rtl ? "بازگشت به صفحه اصلی" : "Back to home"}</span>
          </a>
          <a className="arrow-action" href={localizedHref(locale, "contact")}>
            <span>{rtl ? "تماس با تیم ONYX" : "Contact ONYX"}</span>
            <Arrow size={15} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </main>
  );
}

export type { PageKey };
