import { App } from "@/lib/app";
import { createElement, StrictMode } from "react";
import { createRoot } from "react-dom/client";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  createElement(StrictMode, {
    children: createElement(App),
  })
);
