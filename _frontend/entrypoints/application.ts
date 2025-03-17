import { App } from "@/components/app";
import { createElement, StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  createElement(StrictMode, {
    children: [createElement(App)],
  })
);
