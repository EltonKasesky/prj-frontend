import Admin from "../components/layout/Admin";
import AdminGuard from "../components/guard/AdminGuard";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

export default function AdminPage() {
    return (
        <>
            <Header />
            <AdminGuard>
                <Admin />
            </AdminGuard>
            <Footer />
        </>
    );
}
