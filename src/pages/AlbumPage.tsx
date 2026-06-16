import AlbumGuard from "../components/guard/AlbumGuard";
import Album from "../components/layout/Album";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

export default function AlbumPage() {
    return (
        <>
            <Header />
            <AlbumGuard>
                <Album />
            </AlbumGuard>
            <Footer />
        </>
    );
}
