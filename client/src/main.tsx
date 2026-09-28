import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/onyx-system.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Unable to find the application root element.");
}

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}
