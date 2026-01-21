import { NavLink } from "react-router-dom";
import { NavItems } from "../nav/Nav";

export function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-r min-h-[calc(100vh-56px)] p-4">
      <div className="text-sm font-semibold mb-4">Документация</div>

      <nav className="space-y-4">
        {NavItems.map((group) => (
          <div key={group.title}>
            <div className="text-xs uppercase opacity-60 mb-2">
              {group.title}
            </div>

            <div className="flex flex-col gap-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }: { isActive: boolean }) =>
                    `rounded-lg px-3 py-2 text-sm hover:bg-black/5 ${
                      isActive ? "bg-black/10 font-medium" : ""
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
