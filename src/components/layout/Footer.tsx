import Separator from "../ui/Separator";
import Developer from "../ui/footer/Developer";

export default function Footer() {
    return (
        <>
            <footer className="flex flex-col justify-center items-center w-full py-2 border-t border-main-border dark:border-main-border-dark bg-main-bg dark:bg-main-bg-dark">
                <h2 className="text-xl text-main-color dark:text-main-color-dark">
                    Álbum de Firuginhas
                </h2>

                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-main-color dark:text-main-color-dark">
                    <span>Desenvolvido por:</span>

                    <div className="flex flex-col sm:flex-row items-center h-12 sm:h-5">
                        <span>
                            <Developer
                                url={"https://www.linkedin.com/in/eltonkasesky"}
                                name={"Elton Kasesky"}
                            />
                        </span>
                        <span className="hidden sm:flex sm:items-center h-full">
                            <Separator size={"large"} />
                        </span>
                        <span>
                            <Developer
                                url={
                                    "https://www.linkedin.com/in/thayn%C3%A1-cristina-lima"
                                }
                                name={"Thayná Lima"}
                            />
                        </span>
                    </div>
                </div>

                <p className="text-sm text-main-color dark:text-main-color-dark">
                    Copyright © 2026 Contribuidores
                </p>
            </footer>
        </>
    );
}
