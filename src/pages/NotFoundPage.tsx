import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import NotFound from "../components/layout/NotFound";

export default function NotFoundPage() {
    return (
        <>
            <section className="flex flex-col justify-between h-screen">
                <Header />
                <NotFound />
                <Footer />
            </section>
        </>
    );
}
