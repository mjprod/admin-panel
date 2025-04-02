import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./style/style.css";
import App from "./App";
import "./i18n";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
