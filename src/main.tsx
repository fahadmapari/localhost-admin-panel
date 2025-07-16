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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: routeProtector,
    children: [
      {
        path: "products",
        Component: ProductList,
      },

      {
        path: "products/create",
        Component: ProductCreate,
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
