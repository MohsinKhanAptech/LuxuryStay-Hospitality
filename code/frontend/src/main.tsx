import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import App from "./App.tsx";
import AdminLayout from "./app/admin/admin-layout.tsx";
import Dashboard from "./app/admin/dashboard.tsx";
import UserList from "./app/admin/user-list.tsx";
import UserDetail from "./app/admin/user-detail.tsx";
import UserAdd from "./app/admin/user-add.tsx";
import UserEdit from "./app/admin/user-edit.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: [{ index: true, Component: App }],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "dashboard", Component: Dashboard },
      {
        path: "user",
        children: [
          { index: true, Component: UserList },
          { path: "list", Component: UserList },
          { path: "detail", Component: UserDetail },
          { path: "add", Component: UserAdd },
          { path: "edit", Component: UserEdit },
        ],
      },
      { path: "users", Component: UserList },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
