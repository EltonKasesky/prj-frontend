import { SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

export default function ThemeToogle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="text-main-color dark:text-main-dark-color hover:text-main-rover dark:hover:text-main-rover-dark cursor-pointer transition-colors"
        >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
    );
}
