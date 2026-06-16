import { createBrowserRouter } from "react-router";
import PageLayout from "../layouts/PageLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import AdminPage from "../pages/AdminPage";
import NotFoundPage from "../pages/NotFoundPage";
import FiguresPage from "../pages/FiguresPage";
import AlbumPage from "../pages/AlbumPage";
import AboutPage from "../pages/AboutPage";
import ProfilePage from "../pages/ProfilePage";
import ConfigPage from "../pages/ConfigPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PageLayout />,
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
                path: "/admin",
                element: <AdminPage />,
            },
            {
                path: "/figures",
                element: <FiguresPage />,
            },
            {
                path: "/album",
                element: <AlbumPage />,
            },
            {
                path: "/about",
                element: <AboutPage />,
            },
            {
                path: "/profile",
                element: <ProfilePage />,
            },
            {
                path: "/config",
                element: <ConfigPage />,
            },
            {
                path: "/404",
                element: <NotFoundPage />,
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
]);
