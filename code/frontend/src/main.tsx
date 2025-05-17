import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import App from "./App.tsx";
import AdminLayout from "./app/admin/admin-layout.tsx";
import dashboard from "./app/admin/dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: [{ index: true, Component: App }],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [{ index: true, Component: dashboard }],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
