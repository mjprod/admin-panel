import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./style/style.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { LoadingProvider } from "./context/LoadingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <ThemeProvider>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </ThemeProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(showConsoleError))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
