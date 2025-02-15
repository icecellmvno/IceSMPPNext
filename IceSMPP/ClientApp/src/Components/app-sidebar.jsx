import * as React from "react"
import {
  LayoutDashboard,
  Users,
  Settings,
  MessageSquare,
  Building2,
  UserPlus,
  ChevronDown,
  BarChart,
  Coins,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const navItems = [
  {
    title: "Customers",
    icon: Building2,
    items: [
      {
        title: "New Customer",
        url: route('customers.create'),
        icon: UserPlus,
      },
      {
        title: "All Customers",
        url: route('customers.index'),
        icon: Building2,
      },
    ],
  },
  {
    title: "Vendors",
    icon: Building2,
    items: [
      {
        title: "New Vendor",
        url: route('vendors.create'),
        icon: UserPlus,
      },
      {
        title: "All Vendors",
        url: route('vendors.index'),
        icon: Building2,
      },
    ],
  },
  {
    title: "Reports",
    icon: BarChart,
    items: [
      {
        title: "SMS CDRs",
        url: route('reports.sms-cdrs.index'),
        icon: MessageSquare,
      },
      {
        title: "Financial Reports",
        url: route('reports.financial.index'),
        icon: Coins,
      },
    ],
  }
];

export function AppSidebar({ user, ...props }) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>

        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <LayoutDashboard className="size-4" />
          
        </div>
      

      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
