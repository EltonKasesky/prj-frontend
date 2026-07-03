import logo from "../../assets/icons/logo.png";

interface SplashScreenProps {
    fadingOut?: boolean;
}

export default function SplashScreen({ fadingOut }: SplashScreenProps) {
    return (
        <div
            className={`fixed inset-0 z-100 flex flex-col items-center justify-center gap-4 bg-main-bg dark:bg-main-bg-dark
                ${fadingOut ? "animate-fade-out" : "animate-fade-in"}`}
        >
            <img
                src={logo}
                alt="Álbum de Figurinhas"
                className="w-24 h-24 object-contain animate-splash-pulse drop-shadow-lg"
            />

            <h1 className="text-2xl font-bold text-main-color dark:text-main-color-dark tracking-tight">
                Álbum de Figurinhas
            </h1>

            <div className="w-40 h-1.5 rounded-full bg-secondary-bg dark:bg-secondary-bg-dark overflow-hidden">
                <div className="h-full w-1/3 rounded-full bg-highlight-bg dark:bg-highlight-bg-dark animate-splash-bar" />
            </div>
        </div>
    );
}
