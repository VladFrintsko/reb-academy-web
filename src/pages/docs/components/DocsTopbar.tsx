import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import transparentWaveGuard from "../../../assets/white_logo.png";
import { useAuth } from "../../../contexts/AuthContext";

const navItems = [
    { label: "Документація", to: "/docs/quickstart" },
    { label: "PDF Генератор", to: "/pdf-generator" },
];

interface SearchItem {
    title: string;
    description: string;
    to: string;
    category: string;
}

const searchableItems: SearchItem[] = [
    { title: "Quickstart", description: "Швидкий старт з Wave Guard", to: "/docs/quickstart", category: "Документація" },
    { title: "Lakera Dashboard", description: "Огляд панелі керування Lakera", to: "/docs/dashboard", category: "Документація" },
    { title: "Integration guide", description: "Інструкція з інтеграції", to: "/docs/integration", category: "Документація" },
    { title: "Evaluation Overview", description: "Огляд процесу оцінювання", to: "/docs/evaluation", category: "Документація" },
    { title: "PDF Генератор", description: "Створення PDF документів", to: "/pdf-generator", category: "Інструменти" },
    { title: "Головна", description: "Головна сторінка Wave Hub", to: "/", category: "Навігація" },
];

export const DocsTopbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { user, signOut } = useAuth();

    const handleSignOut = async () => {
        await signOut();
        navigate("/");
    };

    const filteredResults = searchQuery.trim()
        ? searchableItems.filter(
            (item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const handleSelect = useCallback((item: SearchItem) => {
        navigate(item.to);
        setSearchQuery("");
        setIsSearchOpen(false);
        inputRef.current?.blur();
    }, [navigate]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (!isSearchOpen || filteredResults.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
                break;
            case "Enter":
                e.preventDefault();
                if (filteredResults[selectedIndex]) {
                    handleSelect(filteredResults[selectedIndex]);
                }
                break;
            case "Escape":
                setIsSearchOpen(false);
                inputRef.current?.blur();
                break;
        }
    }, [isSearchOpen, filteredResults, selectedIndex, handleSelect]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [searchQuery]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                inputRef.current?.focus();
                setIsSearchOpen(true);
            }
        };
        document.addEventListener("keydown", handleGlobalKeyDown);
        return () => document.removeEventListener("keydown", handleGlobalKeyDown);
    }, []);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleFocus = () => {
        setIsSearchOpen(true);
    };

    const handleMouseEnter = (index: number) => () => {
        setSelectedIndex(index);
    };

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

                <div ref={searchRef} className="relative flex items-center gap-4 py-2">
                    <div className="relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={handleFocus}
                            onKeyDown={handleKeyDown}
                            placeholder="Пошук..."
                            className="w-64 rounded-md border border-white/10 bg-white/5 px-3 py-2 pr-16 text-sm outline-none transition-colors focus:border-white/30 focus:bg-white/10"
                        />
                        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-xs text-white/50">
                            ⌘K
                        </kbd>
                    </div>

                    {isSearchOpen && searchQuery.trim() && (
                        <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-lg border border-white/10 bg-neutral-900 shadow-xl">
                            {filteredResults.length > 0 ? (
                                <ul className="max-h-80 overflow-y-auto py-2">
                                    {filteredResults.map((item, index) => (
                                        <li key={item.to}>
                                            <button
                                                onClick={() => handleSelect(item)}
                                                onMouseEnter={handleMouseEnter(index)}
                                                className={`flex w-full flex-col gap-0.5 px-4 py-3 text-left transition-colors ${index === selectedIndex
                                                    ? "bg-white/10"
                                                    : "hover:bg-white/5"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium text-white">{item.title}</span>
                                                    <span className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white/50">
                                                        {item.category}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-white/50">{item.description}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="px-4 py-8 text-center text-sm text-white/50">
                                    Нічого не знайдено для "{searchQuery}"
                                </div>
                            )}
                            <div className="border-t border-white/10 px-4 py-2 text-xs text-white/40">
                                <span className="mr-3">↑↓ навігація</span>
                                <span className="mr-3">↵ вибрати</span>
                                <span>esc закрити</span>
                            </div>
                        </div>
                    )}

                    {user ? (
                        <button
                            onClick={handleSignOut}
                            className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            Вийти
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            Увійти
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
