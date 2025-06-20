import * as React from "react";
import {
  IconDashboard,
  IconDoor,
  IconMessages,
  // IconHelp,
  // IconSearch,
  // IconSettings,
  IconTools,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
// import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { StarsIcon } from "lucide-react";
import { Link } from "react-router";

const data = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: IconDashboard,
    },
    {
      title: "Users",
      url: "/admin/user/list",
      icon: IconUsers,
    },
    {
      title: "Rooms",
      url: "/admin/room/list",
      icon: IconDoor,
    },
    {
      title: "Housekeepings",
      url: "/admin/housekeeping/list",
      icon: IconTools,
    },
    {
      title: "Feedback",
      url: "/admin/feedback/list",
      icon: IconMessages,
    },
  ],
  // navSecondary: [
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: IconSettings,
  //   },
  //   {
  //     title: "Get Help",
  //     url: "#",
  //     icon: IconHelp,
  //   },
  //   {
  //     title: "Search",
  //     url: "#",
  //     icon: IconSearch,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to={"/admin"}>
                <StarsIcon className="!size-5" />
                <span className="text-base font-semibold">LuxuryStar</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
