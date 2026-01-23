export function DocsTopbar() {
    return (
        <header className="border-b">
            <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-6 py-1">
                <div>REB ACADEMY</div>

                <div className="flex items-center gap-2">
                    <input placeholder="Search" className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none" />
                    <button className="rounded-md bg-white/10 px-10 py-5 text-sm">
                        Search ✨
                    </button>
                </div>
            </div>
        </header>
    );
}
