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
import AdminRegister from "./pages/admin/AdminRegister.tsx";
import NewBooking from "./pages/booking/NewBooking.tsx";
import Messages from "./pages/communication/Messages.tsx";
import Conversation from "./pages/communication/Conversation.tsx";

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
        path: "admin/register",
        Component: AdminRegister,
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
        path: "bookings",
        element: <div>bookings</div>,
      },
      {
        path: "bookings/create",
        Component: NewBooking,
      },
      {
        path: "bookings/custom",
        element: <div>custom</div>,
      },
      {
        path: "messages",
        Component: Messages,
      },
      {
        path: "messages/:id",
        Component: Conversation,
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
