"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, CreditCard, Bell, Lock, Palette, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { currentUser } from "@/lib/data"

export default function SettingsSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/settings/account",
      label: "Account",
      icon: User,
    },
    {
      href: "/settings/appearance",
      label: "Appearance",
      icon: Palette,
    },
    {
      href: "/settings/billing",
      label: "Billing",
      icon: CreditCard,
    },
    {
      href: "/settings/notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      href: "/settings/security",
      label: "Security",
      icon: Lock,
    },
  ]

  return (
    <div className="md:w-1/4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-12 w-12">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>
                {currentUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{currentUser.name}</p>
              <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === route.href ? "bg-secondary text-secondary-foreground" : "",
                )}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
            <Separator className="my-2" />
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}

