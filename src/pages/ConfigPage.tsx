import UserGuard from "../components/guard/UserGuard";
import Config from "../components/layout/Config";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

export default function ConfigPage() {
    return (
        <>
            <Header />
            <UserGuard>
                <Config />
            </UserGuard>
            <Footer />
        </>
    );
}
