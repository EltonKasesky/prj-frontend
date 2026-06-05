import { createBrowserRouter } from "react-router";
import PageLayout from "../layouts/PageLayout";
import HomePage from "../pages/HomePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PageLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
        ],
    },
]);
