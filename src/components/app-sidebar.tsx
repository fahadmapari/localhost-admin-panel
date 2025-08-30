import * as React from "react";
import {
  GalleryVerticalEnd,
  User,
  Package,
  CalendarCheck,
  Users,
  UserCog,
  LayoutDashboard,
  Network,
  MessageSquare,
} from "lucide-react";

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
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      items: [
        {
          title: "Products Metrics",
          url: "/dashboard/products",
        },
        {
          title: "Clients Metrics",
          url: "/dashboard/clients",
        },
      ],
    },
    {
      title: "Admin",
      url: "#",
      icon: User,
      isActive: false,
      items: [
        {
          title: "List",
          url: "/admin",
        },
        {
          title: "Add New",
          url: "/admin/register",
        },
      ],
    },
    {
      title: "Client",
      url: "#",
      icon: Users,
      isActive: false,
      items: [
        {
          title: "List",
          url: "/client",
        },
        {
          title: "Register",
          url: "/client/register",
        },
      ],
    },

    {
      title: "Products",
      url: "#",
      icon: Package,
      isActive: false,
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
      title: "Booking",
      url: "#",
      icon: CalendarCheck,
      isActive: false,
      items: [
        {
          title: "List",
          url: "/bookings",
        },
        {
          title: "New Booking",
          url: "/bookings/create",
        },
        {
          title: "Custom Booking",
          url: "/bookings/custom",
        },
      ],
    },
    {
      title: "Communication",
      url: "#",
      icon: MessageSquare,
      isActive: false,
      items: [
        {
          title: "Messages",
          url: "/messages",
        },
      ],
    },
    {
      title: "Supplier",
      url: "#",
      icon: UserCog,
      isActive: false,
      items: [
        {
          title: "List",
          url: "/suppliers",
        },
        {
          title: "Add New",
          url: "/suppliers/create",
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
      <SidebarTrigger className="border border-border cursor-pointer absolute right-0 top-2/3 translate-x-1/2 bg-background rounded-full p-2 z-20" />
    </Sidebar>
  );
}
