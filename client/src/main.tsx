import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const requestedPath = new URLSearchParams(window.location.search).get("p");
if (requestedPath?.startsWith("/")) {
  window.history.replaceState(null, "", requestedPath);
}

createRoot(document.getElementById("root")!).render(<App />);
