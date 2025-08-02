export default ResumeMatcherApp;

// src/index.tsx - Entry point
import React from "react";
import ReactDOM from "react-dom/client";
import ResumeMatcherApp from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ResumeMatcherApp />
  </React.StrictMode>
);
