import FigureGuard from "../components/guard/FigureGuard";
import Figures from "../components/layout/Figures";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

export default function FiguresPage() {
    return (
        <>
            <Header />
            <FigureGuard>
                <Figures />
            </FigureGuard>
            <Footer />
        </>
    );
}
