export type Locale = "en" | "fa";

export type NavigationItem = {
  page: string;
  href: string;
  label: Record<Locale, string>;
};

export const primaryNavigation: NavigationItem[] = [
  { page: "product", href: "product", label: { en: "Product", fa: "محصول" } },
  { page: "solutions", href: "solutions", label: { en: "Solutions", fa: "راهکارها" } },
  { page: "enterprise", href: "pricing", label: { en: "Enterprise", fa: "سازمانی" } },
  { page: "technology", href: "architecture", label: { en: "Technology", fa: "فناوری" } },
  { page: "resources", href: "resources", label: { en: "Resources", fa: "منابع" } },
];

export const secondaryNavigation: NavigationItem[] = [
  { page: "security", href: "security", label: { en: "Security", fa: "امنیت" } },
  { page: "roadmap", href: "roadmap", label: { en: "Roadmap", fa: "نقشه راه" } },
  { page: "customers", href: "customers", label: { en: "Customers", fa: "مشتریان" } },
  { page: "about", href: "about", label: { en: "About", fa: "درباره" } },
  { page: "investors", href: "investors", label: { en: "Investors", fa: "سرمایه‌گذاران" } },
];
