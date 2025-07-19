import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { createBrowserRouter, RouterProvider } from "react-router";
import ProductList from "./pages/product/ProductList.tsx";
import ProductCreate from "./pages/product/ProductCreate.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";
import AuthProvider from "./providers/AuthProvider.tsx";
import { routeProtector } from "./loaders/routeProtector.ts";
import AdminList from "./pages/admin/AdminList.tsx";
import ProductMetrics from "./pages/dashboard/ProductMetrics.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: routeProtector,
    children: [
      {
        path: "dashboard",
        element: <div>Dashboard</div>,
      },
      {
        path: "dashboard/products",
        Component: ProductMetrics,
      },
      {
        path: "products",
        Component: ProductList,
      },

      {
        path: "products/create",
        Component: ProductCreate,
      },
      {
        path: "admin",
        Component: AdminList,
      },
      {
        path: "*", // catch-all 404 route
        element: <div>404 - Page Not Found</div>,
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "*", // catch-all 404 route
    element: <div>404 - Page Not Found</div>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
