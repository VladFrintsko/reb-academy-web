import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { LoginPage } from "../../pages/auth/LoginPage";
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
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/pdf-generator",
                element: (
                    <ProtectedRoute>
                        <PdfGeneratorPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/docs",
                element: (
                    <ProtectedRoute>
                        <DocsLayout />
                    </ProtectedRoute>
                ),
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
