import { Link, NavLink } from "react-router-dom";
import transparentWaveGuard from "../../../assets/white_logo.png";

const navItems = [
    { label: "Документація", to: "/docs/quickstart" },
    { label: "PDF Генератор", to: "/pdf-generator" },
];

export function DocsTopbar() {
    return (
        <header className="border-b">
            <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-5 px-6 py-1">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center cursor-pointer">
                        <img src={transparentWaveGuard} alt="Wave Guard" className="h-10" />
                        Wave Hub
                    </Link>

                    <nav className="flex items-center gap-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm transition-colors ${isActive
                                        ? "bg-white/10 text-white"
                                        : "text-white/70 hover:text-white hover:bg-white/5"
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-2 py-2">
                    <input placeholder="Search" className="rounded-md border-white/10 bg-white/5 px-3 py-2 text-sm outline-none" />
                    <button className="cursor-pointer rounded-md bg-white/10 px-3 py-2 text-sm transition-colors hover:bg-white/20 active:bg-white/25">
                        Пошук ✨
                    </button>
                </div>
            </div>
        </header>
    );
}
