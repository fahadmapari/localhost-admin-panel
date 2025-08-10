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
import ProductEdit from "./pages/product/ProductEdit.tsx";
import Error404 from "./components/common/Error404.tsx";
import RegisterClient from "./pages/client/RegisterClient.tsx";
import ClientList from "./pages/client/ClientList.tsx";
import ClientMetrics from "./pages/client/ClientMetrics.tsx";

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
        path: "dashboard/clients",
        Component: ClientMetrics,
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
        path: "products/:id",
        Component: ProductEdit,
      },
      {
        path: "admin",
        Component: AdminList,
      },
      {
        path: "client",
        Component: ClientList,
      },
      {
        path: "client/register",
        Component: RegisterClient,
      },
      {
        path: "*", // catch-all 404 route
        Component: Error404,
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "*", // catch-all 404 route
    Component: Error404,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
