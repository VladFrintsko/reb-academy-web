import { createBrowserRouter } from "react-router-dom";
import { DocsLayout } from "../../pages/docs/DocsLayout";
import { DocsPage } from "../../pages/docs/DocsPage";
import { ErrorPage } from "../../pages/error/ErrorPage";
import { HomePage } from "../../pages/home/HomePage";
import { PdfGeneratorPage } from "../../pages/pdf-generator/PdfGeneratorPage";
import { AppLayout } from "../layout/AppLayout";

export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/pdf-generator",
                element: <PdfGeneratorPage />,
            },
            {
                path: "/docs",
                element: <DocsLayout />,
                children: [
                    { path: "quickstart", element: <DocsPage /> },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);
