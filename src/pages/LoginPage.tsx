import LoginGuard from "../components/guard/LoginGuard";
import Login from "../components/layout/Login";

export default function LoginPage() {
    return (
        <>
            <LoginGuard>
                <Login />
            </LoginGuard>
        </>
    );
}
