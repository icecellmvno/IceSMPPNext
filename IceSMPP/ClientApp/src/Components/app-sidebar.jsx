import * as React from "react"
import {
    LayoutDashboard,
    Users,
    Settings,
    MessageSquare,
    Building2,
    UserPlus,
    ChevronDown,
    BookUser,
    Send,
    BarChart,
    Coins, Landmark,
} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {AdminNavMain} from "@/components/admin-nav-main.jsx"

import {NavUser} from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"


const navItems = [
    {
        title: "Phonebook",
        icon: BookUser,
        items: [
            {
                title: "Contacts",
                url: 'Phonebook/Contacts/Index',
                icon: UserPlus,
            }, {
                title: "Tags",
                url: 'Phonebook/Tags/Index',
                icon: UserPlus,
            }, {
                title: "Blacklists",
                url: 'Phonebook/Blacklists/Index',
                icon: UserPlus,
            }
        ],
    }, {
        title: "Send SMS",
        icon: Send,
        items: [
            {
                title: "Quick Send SMS",
                url: 'Sms/Quick/',
                icon: UserPlus,
            }, {
                title: "SMS Campaigns",
                url: 'Customers/Index',
                icon: UserPlus,
            }, {
                title: "Send From File",
                url: 'Customers/Index',
                icon: UserPlus,
            }
        ],
    }, {
        title: "Reports",
        icon: BookUser,
        items: [
            {
                title: "SMS Logs",
                url: 'Customers/Index',
                icon: UserPlus,
            },
            {
                title: "Campaign Logs",
                url: 'Customers/Index',
                icon: UserPlus,
            },
            {
                title: "Financal Reports",
                url: 'Customers/Index',
                icon: UserPlus,
            },
            {
                title: "Invoices",
                url: 'Customers/Index',
                icon: UserPlus,
            }
        ],
    }, {
        title: "Finance",
        icon: Landmark,
        items: [
            {
                title: "Price List",
                url: 'Customers/Index',
                icon: UserPlus,
            }, {
                title: "Buy Credit",
                url: 'Customers/Index',
                icon: UserPlus,
            }
        ],
    }, {
        title: "Settings",
        icon: Settings,
        items: [
            {
                title: "Users & Roles",
                url: 'Customers/Index',
                icon: UserPlus,
            }, {
                title: "Orginator Requests",
                url: 'Customers/Index',
                icon: UserPlus,
            }, {
                title: "Buy Number",
                url: 'Customers/Index',
                icon: UserPlus,
            },{
                title: "Profile",
                url: 'Customers/Index',
                icon: UserPlus,
            }
        ],
    },

];
const AdminNavItems = [
    {
        title: "Customers",
        icon: Building2,
        items: [
            {
                title: "New Customer",
                url: 'Customers/Index',
                icon: UserPlus,
            },
            {
                title: "All Customers",
                url: 'Customers/Index',
                icon: Building2,
            },
        ],
    }, 
    {
        title: "Resellers",
        icon: Building2,
        items: [
            {
                title: "New Reseller",
                url: 'Customers/Index',
                icon: UserPlus,
            },
            {
                title: "All Resellers",
                url: 'Customers/Index',
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
                url: 'customers/Index',
                icon: UserPlus,
            },
            {
                title: "All Vendors",
                url: 'customers/Index',
                icon: Building2,
            },
        ],
    }, {
        title: "Routings",
        icon: Building2,
        items: [
            {
                title: "Add New Route",
                url: 'customers/Index',
                icon: UserPlus,
            },
            {
                title: "All Routes",
                url: 'customers/Index',
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
                url: 'customers/Index',
                icon: MessageSquare,
            },
            {
                title: "Financial Reports",
                url: 'customers/Index',
                icon: Coins,
            },
        ],
    }
];

export function AppSidebar({user, ...props}) {
    const isAdmin = user?.type === 'admin';
    const isUser = user?.type === 'user';
    return (
        (<Sidebar collapsible="icon" {...props}>
            <SidebarHeader>

                <div
                    className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <LayoutDashboard className="size-4"/>

                </div>


            </SidebarHeader>
            <SidebarContent>

                {isUser && <NavMain items={navItems}/> } 
                {isAdmin && <AdminNavMain items={AdminNavItems}/> } 
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={user}/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>)
    );
}
