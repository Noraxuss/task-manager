import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'; // your global CSS
import './style/app.css';   // optional app-specific CSS
import App from './App.jsx'
import I18nProvider from "./i18n/I18nProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>
);
