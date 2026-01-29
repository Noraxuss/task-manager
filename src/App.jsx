import React, { useEffect, useState } from "react";
import Board from "./jsx/Board";
import "./index.css";
import Header from "./jsx/Header.jsx";
import StillNoGood from "./jsx/StillNoGood.jsx";
import { useI18n } from "./i18n/I18nProvider.jsx";

export default function App() {
  const appReady = true;

  const { lang, setLang, t } = useI18n();
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (!appReady) {
    return <StillNoGood />;
  }

  return (
    <div className="app">
      <Header
        lang={lang}
        setLang={setLang}
        t={t}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <Board t={t} />
    </div>
  );
}
