export type NavItem = {
  title: string;
  path: string;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export const NavItems: NavGroup[] = [
  {
    title: "Start",
    items: [
      { title: "Get Started", path: "/docs/get-started" },
      { title: "Overview", path: "/docs/overview" },
    ],
  },
  {
    title: "Guides",
    items: [{ title: "Safety", path: "/docs/safety" }],
  },
];
