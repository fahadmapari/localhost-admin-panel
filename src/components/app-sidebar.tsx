import * as React from "react";
import { GalleryVerticalEnd, User, Package } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "LocalHost",
      logo: GalleryVerticalEnd,
      plan: "Admin Panel",
    },
  ],
  navMain: [
    {
      title: "Products",
      url: "#",
      icon: Package,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/products",
        },
        {
          title: "Add New",
          url: "/products/create",
        },
      ],
    },
    {
      title: "Admin",
      url: "#",
      icon: User,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/admin",
        },
        {
          title: "Add New",
          url: "/admin/create",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="relative">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
      <SidebarTrigger className="border border-gray-300 cursor-pointer absolute right-0 top-2/3 translate-x-1/2 bg-white rounded-full p-2 z-20" />
    </Sidebar>
  );
}
