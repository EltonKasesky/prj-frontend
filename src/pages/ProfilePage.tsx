import UserGuard from "../components/guard/UserGuard";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Profile from "../components/layout/Profile";

export default function ProfilePage() {
    return (
        <>
            <Header />
            <UserGuard>
                <Profile />
            </UserGuard>
            <Footer />
        </>
    );
}
