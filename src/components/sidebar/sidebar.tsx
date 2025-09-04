"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PanelLeft, ChevronRight, Home, User, Settings, LogOut } from "lucide-react"
import { useRouter, useMatch } from "@tanstack/react-router"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const router = useRouter()
  
  // Get the current route path
  const currentPath = window.location.pathname

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
      active: currentPath === "/dashboard",
    },
    {
      title: "Profile",
      href: "/profile",
      icon: User,
      active: currentPath === "/profile",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      active: currentPath === "/settings",
    },
  ]

  const handleNavigation = (href: string) => {
    router.navigate({ to: href })
  }

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col border-r bg-background transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center border-b px-4">
        {!isCollapsed && <h2 className="text-lg font-semibold">Cylenium</h2>}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto h-8 w-8"
          onClick={toggleSidebar}
        >
          <PanelLeft className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={item.active ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              isCollapsed ? "p-0 justify-center" : "px-4"
            )}
            onClick={() => handleNavigation(item.href)}
          >
            <item.icon className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">{item.title}</span>}
          </Button>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t p-2">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-destructive hover:text-destructive",
            isCollapsed ? "p-0 justify-center" : "px-4"
          )}
          onClick={() => {
            // Handle logout
            console.log("Logout clicked")
            // router.navigate({ to: "/login" })
          }}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </div>
  )
}
