import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { router } from "./routes/router.tsx";
import "./assets/index.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import AppGate from "./components/layout/AppGate.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <AppGate>
                    <RouterProvider router={router} />
                </AppGate>
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>,
);
