import { Outlet } from "react-router-dom";
import { DocsSidebar, DocsToc, DocsTopbar } from "./components";

export function DocsLayout() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <DocsTopbar />

            {/* Один контейнер для всього (щоб топбар/контент були в одній сітці) */}
            <div className="mx-auto w-full max-w-[1400px] px-6">
                <div className="grid grid-cols-[260px_minmax(0,1fr)_260px] gap-10">

                    {/* LEFT */}
                    <aside className="sticky top-16 h-[calc(100vh-64px)] overflow-y-auto py-8">
                        <DocsSidebar />
                    </aside>

                    {/* CENTER */}
                    <main className="min-w-0 py-8">
                        <Outlet />
                    </main>

                    {/* RIGHT */}
                    <aside className="sticky top-16 h-[calc(100vh-64px)] overflow-y-auto py-8">
                        <DocsToc />
                    </aside>

                </div>
            </div>
        </div>
    );
}
