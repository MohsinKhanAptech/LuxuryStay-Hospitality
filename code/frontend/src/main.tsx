import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import App from "./App.tsx";
import AdminLayout from "./app/admin/admin-layout.tsx";
import Dashboard from "./app/admin/dashboard.tsx";

import Login from "./app/admin/login.tsx";

import UserList from "./app/admin/user-list.tsx";
import UserDetail from "./app/admin/user-detail.tsx";
import UserAdd from "./app/admin/user-add.tsx";
import UserEdit from "./app/admin/user-edit.tsx";

import RoomList from "./app/admin/room-list.tsx";
import RoomDetail from "./app/admin/room-detail.tsx";
import RoomAdd from "./app/admin/room-add.tsx";
import RoomEdit from "./app/admin/room-edit.tsx";

import HousekeepingList from "./app/admin/housekeeping-list.tsx";
import HousekeepingDetail from "./app/admin/housekeeping-detail.tsx";
import HousekeepingAdd from "./app/admin/housekeeping-add.tsx";
import HousekeepingEdit from "./app/admin/housekeeping-edit.tsx";

import FeedbackList from "./app/admin/feedback-list.tsx";
import FeedbackAdd from "./app/admin/feedback-add.tsx";
import FeedbackDetail from "./app/admin/feedback-detail.tsx";
import FeedbackEdit from "./app/admin/feedback-edit.tsx";

function requireAdminAuth({ children }: { children: React.ReactNode }) {
  if (!localStorage.getItem("admin-auth")) {
    window.location.href = "/admin/login";
    return null;
  }
  return children;
}

const router = createBrowserRouter([
  {
    path: "/",
    children: [{ index: true, Component: App }],
  },
  {
    path: "/admin",
    Component: (props) =>
      requireAdminAuth({ children: <AdminLayout {...props} /> }),
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
      {
        path: "housekeeping",
        children: [
          { index: true, Component: HousekeepingList },
          { path: "list", Component: HousekeepingList },
          { path: "detail", Component: HousekeepingDetail },
          { path: "add", Component: HousekeepingAdd },
          { path: "edit", Component: HousekeepingEdit },
        ],
      },
      { path: "housekeepings", Component: HousekeepingList },
      {
        path: "feedback",
        children: [
          { index: true, Component: FeedbackList },
          { path: "list", Component: FeedbackList },
          { path: "detail", Component: FeedbackDetail },
          { path: "add", Component: FeedbackAdd },
          { path: "edit", Component: FeedbackEdit },
        ],
      },
      { path: "feedbacks", Component: FeedbackList },
    ],
  },
  { path: "/admin/login", Component: Login },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
