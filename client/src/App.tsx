import Home from "./pages/Home";
import SitePage, { type PageKey } from "./pages/SitePage";
import ProductPage from "./pages/ProductPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import SolutionsPage from "./pages/SolutionsPage";
import SecurityPage from "./pages/SecurityPage";
import AboutPage from "./pages/AboutPage";
import RoadmapPage from "./pages/RoadmapPage";
import ContactPage from "./pages/ContactPage";
import ResourcesPage from "./pages/ResourcesPage";

type Locale = "en" | "fa";

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

function getRoute(): { locale: Locale; page: PageKey | null } {
  if (typeof window === "undefined") return { locale: "en" as const, page: null as PageKey | null };

  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  const segments = pathname.split("/").filter(Boolean);
  const locale: Locale = segments[0] === "fa" ? "fa" : "en";
  const page = segments[1] as PageKey | undefined;

  return {
    locale,
    page: page && pageKeys.includes(page) ? page : null,
  };
}

export default function App() {
  const { locale, page } = getRoute();

  if (page === "product") {
    return <ProductPage locale={locale} />;
  }

  if (page === "architecture") {
    return <ArchitecturePage locale={locale} />;
  }

  if (page === "solutions") {
    return <SolutionsPage locale={locale} />;
  }

  if (page === "security") {
    return <SecurityPage locale={locale} />;
  }

  if (page === "about") {
    return <AboutPage locale={locale} />;
  }

  if (page === "contact") {
    return <ContactPage locale={locale} />;
  }

  if (page === "resources") {
    return <ResourcesPage locale={locale} />;
  }

  if (page) {
    return <SitePage locale={locale} page={page} />;
  }

  return <Home initialLocale={locale} />;
}
