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

import RoomList from "./app/admin/room-list.tsx";
import RoomDetail from "./app/admin/room-detail.tsx";
import RoomAdd from "./app/admin/room-add.tsx";
import RoomEdit from "./app/admin/room-edit.tsx";

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
      {
        path: "room",
        children: [
          { index: true, Component: RoomList },
          { path: "list", Component: RoomList },
          { path: "detail", Component: RoomDetail },
          { path: "add", Component: RoomAdd },
          { path: "edit", Component: RoomEdit },
        ],
      },
      { path: "rooms", Component: RoomList },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
