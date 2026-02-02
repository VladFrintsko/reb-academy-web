import { Link } from "react-router-dom";
import waveGuardImg from "../../assets/white_logo.png";
import { DocsTopbar } from "../docs/components";

export function HomePage() {
    return (
        <div className="flex min-h-screen flex-col">
            <DocsTopbar />

            <main className="flex flex-1 flex-col">
                <section className="flex flex-1 items-center justify-center px-6 py-20">
                    <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center gap-12 md:flex-row md:justify-between">
                        <div className="flex max-w-xl flex-col gap-6 text-center md:text-left">
                            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                                Wave Hub
                            </h1>
                            <p className="text-lg text-white/70 md:text-xl">
                                Платформа для документації та інструментів. Все що потрібно для роботи з Wave Guard в одному місці.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                                <Link
                                    to="/docs/quickstart"
                                    className="rounded-lg bg-white px-6 py-3 font-medium text-neutral-950 transition-colors hover:bg-white/90"
                                >
                                    Документація
                                </Link>
                                <Link
                                    to="/pdf-generator"
                                    className="rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-medium transition-colors hover:bg-white/10"
                                >
                                    PDF Генератор
                                </Link>
                            </div>
                        </div>

                        <div className="flex shrink-0 items-center justify-center">
                            <img
                                src={waveGuardImg}
                                alt="Wave Guard"
                                className="h-64 w-64 object-contain md:h-80 md:w-80"
                            />
                        </div>
                    </div>
                </section>

                <section className="border-t border-white/10 px-6 py-16">
                    <div className="mx-auto w-full max-w-[1400px]">
                        <h2 className="mb-10 text-center text-2xl font-semibold md:text-3xl">
                            Можливості платформи
                        </h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 text-2xl">
                                    📚
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">Документація</h3>
                                <p className="text-sm text-white/60">
                                    Детальна документація з прикладами та інструкціями для швидкого старту.
                                </p>
                            </div>
                            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20 text-2xl">
                                    📄
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">PDF Генератор</h3>
                                <p className="text-sm text-white/60">
                                    Створюйте PDF документи швидко та зручно з нашим генератором.
                                </p>
                            </div>
                            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20 text-2xl">
                                    🔍
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">Пошук</h3>
                                <p className="text-sm text-white/60">
                                    Швидкий пошук по всій документації для знаходження потрібної інформації.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-white/10 px-6 py-8">
                <div className="mx-auto w-full max-w-[1400px] text-center text-sm text-white/50">
                    © 2026 Wave Hub. Всі права захищені.
                </div>
            </footer>
        </div>
    );
}
