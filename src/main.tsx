import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import "./index.css";
// Supports weights 100-900
import "@fontsource-variable/dm-sans";
import { QueryClient, QueryClientProvider } from "react-query";
import { ModeToggle } from "./components/mode-toggle.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <div className="top-2 right-2 fixed z-50">
          <ModeToggle />
        </div>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
