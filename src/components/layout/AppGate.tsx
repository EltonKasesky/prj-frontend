import { useEffect, useState, type ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import SplashScreen from "./SplashScreen";

const MIN_SPLASH_DURATION = 1000;
const FADE_OUT_DURATION = 300;

interface AppGateProps {
    children: ReactNode;
}

export default function AppGate({ children }: AppGateProps) {
    const { loading } = useAuth();
    const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false);
    const [splashVisible, setSplashVisible] = useState(true);
    const [fadingOut, setFadingOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(
            () => setMinimumTimeElapsed(true),
            MIN_SPLASH_DURATION,
        );
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!loading && minimumTimeElapsed) {
            setFadingOut(true);
            const timer = setTimeout(
                () => setSplashVisible(false),
                FADE_OUT_DURATION,
            );
            return () => clearTimeout(timer);
        }
    }, [loading, minimumTimeElapsed]);

    return (
        <>
            {children}
            {splashVisible && <SplashScreen fadingOut={fadingOut} />}
        </>
    );
}
