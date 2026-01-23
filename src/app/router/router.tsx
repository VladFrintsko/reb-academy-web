import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import { DocsLayout } from "../../pages/docs/DocsLayout";
import { DocsPage } from "../../pages/docs/DocsPage";
import { HomePage } from "../../pages/home/HomePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        element: <AppLayout />,
        children: [

            {
                path: "/docs",
                element: <DocsLayout />,
                children: [
                    { path: "quickstart", element: <DocsPage /> },
                ],
            },
        ],
    },
]);
