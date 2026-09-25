import Home from "./pages/Home";
import SitePage, { type PageKey } from "./pages/SitePage";

const pageKeys: PageKey[] = [
  "product",
  "solutions",
  "architecture",
  "security",
  "roadmap",
  "about",
  "resources",
  "contact",
  "investors",
];

function getRoute() {
  if (typeof window === "undefined") return { locale: "en" as const, page: null as PageKey | null };

  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0] === "fa" ? "fa" : "en";
  const page = segments[1] as PageKey | undefined;

  return {
    locale,
    page: page && pageKeys.includes(page) ? page : null,
  };
}

export default function App() {
  const { locale, page } = getRoute();

  if (page) {
    return <SitePage locale={locale} page={page} />;
  }

  return <Home initialLocale={locale} />;
}
