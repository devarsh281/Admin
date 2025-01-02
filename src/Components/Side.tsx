"use client";

import * as React from "react";
import { type LucideIcon, LayoutDashboard, Users, Settings, LogOut, FileText, Folders, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  subItems?: NavigationItem[];
}

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "dashboard", icon: LayoutDashboard },
  { name: "User", href: "user", icon: Users },
  {
    name: "Posts",
    href: "posts",
    icon: FileText,
    subItems: [
      { name: "Create Post", href: "/addpost", icon: FileText },
      { name: "Manage Posts", href: "/posts", icon: FileText },
    ],
  },
  { name: "Category", href: "categories", icon: Folders ,subItems: [
    { name: "Create Category", href: "", icon: FileText },
    { name: "Manage Category", href: "", icon: FileText },
  ],},
];

export function Side() {
  const [openPosts, setOpenPosts] = React.useState(false);
  const [activeContent, setActiveContent] = React.useState<string>("dashboard"); 

  const handleMenuClick = (href: string) => {
    setActiveContent(href);
  };

  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return <div>Dashboard Content</div>;
      case "user":
        return <div>User Management</div>;
      case "addpost":
        return <div>Add Post</div>;
      case "posts":
        return <div>Manage Existing Posts</div>;
      case "categories":
        return <div>Category Management</div>;
      default:
        return <div>Select an item from the sidebar.</div>;
    }
  };

  return (
    <SidebarProvider >
      <div className="flex ">
        <Sidebar className="border-r" collapsible="icon">
          <SidebarHeader className="p-5">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        isActive={activeContent === item.href}
                        className={cn(
                          "w-full justify-start",
                          activeContent === item.href
                            ? "bg-muted text-green"
                            : "text-green hover:bg-muted hover:text-green"
                        )}
                        onClick={() =>
                          item.subItems
                            ? setOpenPosts((prev) => !prev)
                            : handleMenuClick(item.href)
                        }
                      >
                        <div className="flex items-center">
                          <item.icon className="h-5 w-5" />
                          <span className="ml-2">{item.name}</span>
                          {item.subItems && (
                            <ChevronDown
                              className={`ml-auto h-5 w-5 transition-transform ${
                                openPosts ? "rotate-180" : ""
                              }`}
                            />
                          )}
                        </div>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                  {item.subItems && openPosts && (
                    <div className="ml-6 mt-2 space-y-2">
                      {item.subItems.map((subItem) => (
                        <SidebarMenuItem key={subItem.name}>
                          <SidebarMenuButton
                            isActive={activeContent === subItem.href}
                            className="w-full justify-start text-muted-foreground hover:bg-muted hover:text-foreground"
                            onClick={() => handleMenuClick(subItem.href)}
                          >
                            <div className="flex items-center">
                              <subItem.icon className="h-5 w-5" />
                              <span className="ml-2">{subItem.name}</span>
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-full justify-start text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-full justify-start text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log out</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Log out</TooltipContent>
            </Tooltip>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 p-4">{renderContent()}</div>
      </div>
    </SidebarProvider>
  );
}
