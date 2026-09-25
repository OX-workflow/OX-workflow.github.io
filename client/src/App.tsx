import Home from "./pages/Home";

export default function App() {
  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;
  const initialLocale = pathname === "/fa" || pathname.startsWith("/fa/") ? "fa" : "en";

  return <Home initialLocale={initialLocale} />;
}
