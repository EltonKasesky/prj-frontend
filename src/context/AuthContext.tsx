import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import type { UserResponseDTO } from "../types/user.types";
import { UserService } from "../services/user.services";
import { hasRole } from "../utils/jwt";

interface AuthContextType {
    user: UserResponseDTO | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isAuthor: boolean;
    isCollector: boolean;
    loading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem("token");

            if (token) {
                try {
                    const userData = await UserService.getProfile();
                    setUser(userData);
                } catch (error) {
                    logout();
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (token: string) => {
        localStorage.setItem("token", token);
        const userData = await UserService.getProfile();
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const isAdmin = (() => {
        const token = localStorage.getItem("token");
        return token ? hasRole(token, "ROLE_ADMIN") : false;
    })();

    const isAuthor = (() => {
        const token = localStorage.getItem("token");
        return token ? hasRole(token, "ROLE_AUTHOR") : false;
    })();

    const isCollector = (() => {
        const token = localStorage.getItem("token");
        return token ? hasRole(token, "ROLE_COLLECTOR") : false;
    })();

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isAdmin,
                isAuthor,
                isCollector,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
