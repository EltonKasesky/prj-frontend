import {
    UsersIcon,
    SparklesIcon,
    MonitorIcon,
    SlidersHorizontalIcon,
    BookOpenIcon,
    TargetIcon,
    Share2Icon,
    PenToolIcon,
    PlusCircleIcon,
    FolderCheckIcon,
    CodeIcon,
    LayersIcon,
    CpuIcon,
    GlobeIcon,
} from "lucide-react";
import { FeatureCard } from "../ui/home/FeatureCard";
import DeveloperCard from "../ui/about/DeveloperCard";
import eltonkasesky from "../../assets/developers/eltonkasesky.jpg";
import thaynalima from "../../assets/developers/thaynalima.png";

export default function About() {
    return (
        <main className="min-h-screen bg-secondary-bg dark:bg-secondary-bg-dark transition-colors duration-300 animate-fade-in pb-16">
            <section className="relative max-w-7xl mx-auto px-4 pt-16 pb-20 sm:px-6 lg:px-8 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-emerald-500/10 dark:bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

                <span
                    className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 dark:bg-amber-500/10 text-highlight-color 
                        dark:text-highlight-color-dark border border-emerald-500/20 dark:border-amber-500/20 mb-6"
                >
                    Trabalho Acadêmico FAETERJ
                </span>

                <h1 className="text-4xl font-black tracking-tight text-main-color dark:text-main-color-dark sm:text-6xl max-w-4xl mx-auto leading-[1.15]">
                    Álbum de Figurinhas{" "}
                    <span
                        className="text-transparent bg-clip-text bg-linear-to-r from-teal-500 via-emerald-500 to-cyan-500 dark:from-yellow-600 
                            dark:via-amber-400 dark:to-amber-200"
                    >
                        Digital 2026
                    </span>
                </h1>

                <p className="mt-6 text-lg text-secondary-color dark:text-secondary-color-dark max-w-2xl mx-auto leading-relaxed">
                    Uma plataforma web interativa concebida como projeto
                    acadêmico, onde a paixão pelo colecionismo se une à inovação
                    da tecnologia.
                </p>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/10 dark:bg-amber-500/10 rounded-xl text-highlight-color dark:text-highlight-color-dark">
                                <BookOpenIcon className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-main-color dark:text-main-color-dark">
                                O Projeto
                            </h2>
                        </div>
                        <p className="text-main-color dark:text-main-color-dark leading-relaxed">
                            O <strong>Álbum de Figurinhas Digital</strong> é um
                            sistema inovador desenvolvido para modernizar a
                            tradicional experiência de colecionar figurinhas da
                            Copa do Mundo. Ao eliminar as barreiras do papel
                            físico, criamos um ecossistema digital no qual
                            usuários podem gerenciar, expor e completar suas
                            coleções de maneira dinâmica.
                        </p>
                        <p className="text-secondary-color dark:text-secondary-color-dark leading-relaxed">
                            O sistema foi idealizado e construído sob rigorosos
                            padrões de engenharia de software para a disciplina
                            acadêmica, servindo como uma demonstração prática de
                            aplicação de conceitos de arquitetura de software,
                            componentização, APIs RESTful e interfaces
                            responsivas.
                        </p>
                    </div>

                    <div className="bg-main-bg dark:bg-main-bg-dark p-8 rounded-3xl border border-main-border dark:border-main-border-dark shadow-md space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/10 dark:bg-amber-500/10 rounded-xl text-highlight-color dark:text-highlight-color-dark">
                                <TargetIcon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-main-color dark:text-main-color-dark">
                                Objetivos & Benefícios
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-secondary-bg dark:bg-secondary-bg-dark border border-main-border/30 dark:border-main-border-dark/30">
                                <h4 className="font-bold text-sm text-main-color dark:text-main-color-dark">
                                    Para Autores
                                </h4>
                                <p className="text-xs text-secondary-color dark:text-secondary-color-dark mt-1">
                                    Uma ferramenta ágil para criar, editar e
                                    publicar novas figurinhas personalizadas
                                    diretamente no painel do sistema,
                                    enriquecendo o acervo geral.
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-secondary-bg dark:bg-secondary-bg-dark border border-main-border/30 dark:border-main-border-dark/30">
                                <h4 className="font-bold text-sm text-main-color dark:text-main-color-dark">
                                    Para Colecionadores
                                </h4>
                                <p className="text-xs text-secondary-color dark:text-secondary-color-dark mt-1">
                                    Adquira figurinhas exclusivas geradas pelos
                                    autores, controle seu álbum digital em tempo
                                    real e acompanhe seu progresso de
                                    preenchimento.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-main-bg dark:bg-main-bg-dark border-y border-main-border dark:border-main-border-dark py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold text-main-color dark:text-main-color-dark">
                            Como Funciona a Plataforma?
                        </h2>
                        <p className="mt-4 text-secondary-color dark:text-secondary-color-dark">
                            Entenda o fluxo simplificado do nosso ecossistema de
                            figurinhas digitais.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div
                            className="flex flex-col items-center text-center p-6 bg-secondary-bg dark:bg-secondary-bg-dark rounded-3xl border border-main-border 
                                dark:border-main-border-dark shadow-sm"
                        >
                            <span
                                className="w-10 h-10 rounded-full bg-teal-500/10 dark:bg-yellow-500/10 text-highlight-color dark:text-highlight-color-dark 
                                    font-extrabold text-sm flex items-center justify-center border border-teal-500/20 dark:border-yellow-500/20 mb-4"
                            >
                                01
                            </span>
                            <div
                                className="p-3 bg-main-bg dark:bg-main-bg-dark rounded-2xl border border-main-border dark:border-main-border-dark 
                                    text-main-color dark:text-main-color-dark mb-4"
                            >
                                <PenToolIcon className="w-6 h-6 text-highlight-color dark:text-highlight-color-dark" />
                            </div>
                            <h3 className="text-md font-bold text-main-color dark:text-main-color-dark mb-2">
                                Criação
                            </h3>
                            <p className="text-xs text-secondary-color dark:text-secondary-color-dark leading-relaxed">
                                Autores criam figurinhas personalizadas de
                                jogadores com detalhes e imagem.
                            </p>
                        </div>

                        <div
                            className="flex flex-col items-center text-center p-6 bg-secondary-bg dark:bg-secondary-bg-dark rounded-3xl border border-main-border 
                                dark:border-main-border-dark shadow-sm"
                        >
                            <span
                                className="w-10 h-10 rounded-full bg-teal-500/10 dark:bg-yellow-500/10 text-highlight-color dark:text-highlight-color-dark 
                                    font-extrabold text-sm flex items-center justify-center border border-teal-500/20 dark:border-yellow-500/20 mb-4"
                            >
                                02
                            </span>
                            <div
                                className="p-3 bg-main-bg dark:bg-main-bg-dark rounded-2xl border border-main-border dark:border-main-border-dark text-main-color 
                                    dark:text-main-color-dark mb-4"
                            >
                                <Share2Icon className="w-6 h-6 text-highlight-color dark:text-highlight-color-dark" />
                            </div>
                            <h3 className="text-md font-bold text-main-color dark:text-main-color-dark mb-2">
                                Disponibilização
                            </h3>
                            <p className="text-xs text-secondary-color dark:text-secondary-color-dark leading-relaxed">
                                As figurinhas são disponibilizadas no álbum para
                                colecionadores as usarem.
                            </p>
                        </div>

                        <div
                            className="flex flex-col items-center text-center p-6 bg-secondary-bg dark:bg-secondary-bg-dark rounded-3xl border border-main-border 
                                dark:border-main-border-dark shadow-sm"
                        >
                            <span
                                className="w-10 h-10 rounded-full bg-teal-500/10 dark:bg-yellow-500/10 text-highlight-color dark:text-highlight-color-dark 
                                    font-extrabold text-sm flex items-center justify-center border border-teal-500/20 dark:border-yellow-500/20 mb-4"
                            >
                                03
                            </span>
                            <div
                                className="p-3 bg-main-bg dark:bg-main-bg-dark rounded-2xl border border-main-border dark:border-main-border-dark text-main-color 
                                    dark:text-main-color-dark mb-4"
                            >
                                <PlusCircleIcon className="w-6 h-6 text-highlight-color dark:text-highlight-color-dark" />
                            </div>
                            <h3 className="text-md font-bold text-main-color dark:text-main-color-dark mb-2">
                                Aquisição
                            </h3>
                            <p className="text-xs text-secondary-color dark:text-secondary-color-dark leading-relaxed">
                                Colecionadores utilizam as figurinhas criadas e
                                as inserem no álbum digital.
                            </p>
                        </div>

                        <div
                            className="flex flex-col items-center text-center p-6 bg-secondary-bg dark:bg-secondary-bg-dark rounded-3xl border border-main-border 
                                dark:border-main-border-dark shadow-sm"
                        >
                            <span
                                className="w-10 h-10 rounded-full bg-teal-500/10 dark:bg-yellow-500/10 text-highlight-color dark:text-highlight-color-dark 
                                    font-extrabold text-sm flex items-center justify-center border border-teal-500/20 dark:border-yellow-500/20 mb-4"
                            >
                                04
                            </span>
                            <div
                                className="p-3 bg-main-bg dark:bg-main-bg-dark rounded-2xl border border-main-border dark:border-main-border-dark text-main-color
                                    dark:text-main-color-dark mb-4"
                            >
                                <FolderCheckIcon className="w-6 h-6 text-highlight-color dark:text-highlight-color-dark" />
                            </div>
                            <h3 className="text-md font-bold text-main-color dark:text-main-color-dark mb-2">
                                Organização
                            </h3>
                            <p className="text-xs text-secondary-color dark:text-secondary-color-dark leading-relaxed">
                                Os usuários organizam, visualizam e completam o
                                álbum de forma digital.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-extrabold text-main-color dark:text-main-color-dark">
                        Tecnologias Utilizadas
                    </h2>
                    <p className="mt-4 text-secondary-color dark:text-secondary-color-dark">
                        As ferramentas e bibliotecas modernas que sustentam o
                        projeto de ponta a ponta.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div
                        className="flex flex-col items-center p-6 bg-main-bg dark:bg-main-bg-dark rounded-2xl border border-main-border dark:border-main-border-dark 
                            text-center"
                    >
                        <CodeIcon className="w-8 h-8 text-highlight-color dark:text-highlight-color-dark mb-3" />
                        <span className="font-bold text-sm text-main-color dark:text-main-color-dark">
                            React 19
                        </span>
                        <span className="text-[10px] text-secondary-color dark:text-secondary-color-dark mt-1">
                            Biblioteca UI
                        </span>
                    </div>
                    <div
                        className="flex flex-col items-center p-6 bg-main-bg dark:bg-main-bg-dark rounded-2xl border border-main-border dark:border-main-border-dark 
                            text-center"
                    >
                        <CpuIcon className="w-8 h-8 text-highlight-color dark:text-highlight-color-dark mb-3" />
                        <span className="font-bold text-sm text-main-color dark:text-main-color-dark">
                            TypeScript
                        </span>
                        <span className="text-[10px] text-secondary-color dark:text-secondary-color-dark mt-1">
                            Tipagem Estática
                        </span>
                    </div>
                    <div
                        className="flex flex-col items-center p-6 bg-main-bg dark:bg-main-bg-dark rounded-2xl border border-main-border dark:border-main-border-dark 
                            text-center"
                    >
                        <LayersIcon className="w-8 h-8 text-highlight-color dark:text-highlight-color-dark mb-3" />
                        <span className="font-bold text-sm text-main-color dark:text-main-color-dark">
                            Tailwind v4
                        </span>
                        <span className="text-[10px] text-secondary-color dark:text-secondary-color-dark mt-1">
                            Estilização Utility-First
                        </span>
                    </div>
                    <div
                        className="flex flex-col items-center p-6 bg-main-bg dark:bg-main-bg-dark rounded-2xl border border-main-border dark:border-main-border-dark 
                            text-center"
                    >
                        <GlobeIcon className="w-8 h-8 text-highlight-color dark:text-highlight-color-dark mb-3" />
                        <span className="font-bold text-sm text-main-color dark:text-main-color-dark">
                            Vite
                        </span>
                        <span className="text-[10px] text-secondary-color dark:text-secondary-color-dark mt-1">
                            Ferramenta de Build
                        </span>
                    </div>
                </div>
            </section>

            <section className="bg-secondary-bg dark:bg-secondary-bg-dark border-t border-main-border dark:border-main-border-dark py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold text-main-color dark:text-main-color-dark">
                            Nossos Diferenciais
                        </h2>
                        <p className="mt-4 text-secondary-color dark:text-secondary-color-dark">
                            Por que nossa plataforma eleva a experiência de
                            colecionismo a outro nível?
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureCard
                            icon={UsersIcon}
                            title="Gestão Colaborativa"
                            description="Autores e administradores gerenciam conjuntamente as figurinhas disponíveis para a comunidade."
                        />
                        <FeatureCard
                            icon={MonitorIcon}
                            title="Plataforma Web"
                            description="Acesse seu álbum a qualquer hora e de qualquer dispositivo com layout 100% responsivo."
                        />
                        <FeatureCard
                            icon={SlidersHorizontalIcon}
                            title="Filtros Dinâmicos"
                            description="Filtre e visualize suas figurinhas por seleções de forma intuitiva e rápida."
                        />
                        <FeatureCard
                            icon={SparklesIcon}
                            title="Experiência Digital"
                            description="Completa integração livre de preocupações físicas como perdas, amassados ou colas."
                        />
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-extrabold text-main-color dark:text-main-color-dark">
                        Equipe de Desenvolvimento
                    </h2>
                    <p className="mt-4 text-secondary-color dark:text-secondary-color-dark">
                        Os mentes por trás da idealização, design e engenharia
                        do sistema.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <DeveloperCard
                        name="Elton Kasesky"
                        role="Desenvolvedor"
                        bio="Estudante de Tecnologia da Informação e Comunicação na FAETERJ. Desenvolvedor frontend e backend."
                        avatarUrl={eltonkasesky}
                        githubUrl="https://github.com/eltonkasesky"
                        linkedinUrl="https://www.linkedin.com/in/eltonkasesky"
                        email="eltonkasesky@gmail.com"
                    />

                    <DeveloperCard
                        name="Thayná Lima"
                        role="Desenvolvedora"
                        bio="Estudante de Tecnologia da Informação e Comunicação na FAETERJ. Desenvolvedora frontend e backend."
                        avatarUrl={thaynalima}
                        githubUrl="https://github.com/ThaynaL"
                        linkedinUrl="https://www.linkedin.com/in/thayn%C3%A1-cristina-lima"
                        email="thaynalima@example.com"
                    />
                </div>
            </section>
        </main>
    );
}
