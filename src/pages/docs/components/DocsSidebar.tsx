import { NavLink } from "react-router-dom";
import { docsSidebar } from "../data/sidebar";

export const DocsSidebar = () => {
  return (
    <nav className="py-6 text-sm">
      {docsSidebar.map((group) => (
        <div key={group.title} className="mb-6">
          <div className="mb-2 text-xs font-semibold uppercase text-white/50">
            {group.title}
          </div>

          <div className="space-y-1">
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 hover:bg-white/5 ${
                    isActive ? "bg-white/10" : ""
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
