"use client"

import { useEffect, useState } from "react"
import { Moon, Sun, Laptop, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"
import SettingsSidebar from "@/components/settings-sidebar"

export default function AppearanceSettingsPage() {
  const { theme, setTheme, themes } = useTheme()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = (value: string) => {
    setTheme(value)

    toast({
      title: "Theme Updated",
      description: `Theme has been updated to ${value}.`,
    })
  }

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0])

    // Apply font size to document root
    document.documentElement.style.fontSize = `${value[0]}px`

    toast({
      title: "Font Size Updated",
      description: `Font size has been updated to ${value[0]}px.`,
    })
  }

  const handleAnimationsToggle = (checked: boolean) => {
    setAnimationsEnabled(checked)

    toast({
      title: "Animations Setting Updated",
      description: checked ? "Animations are now enabled." : "Animations are now disabled.",
    })
  }

  const handleReducedMotionToggle = (checked: boolean) => {
    setReducedMotion(checked)

    toast({
      title: "Reduced Motion Setting Updated",
      description: checked ? "Reduced motion is now enabled." : "Reduced motion is now disabled.",
    })
  }

  const handleHighContrastToggle = (checked: boolean) => {
    setHighContrast(checked)

    // Apply high contrast class to body
    if (checked) {
      document.body.classList.add("high-contrast")
    } else {
      document.body.classList.remove("high-contrast")
    }

    toast({
      title: "High Contrast Setting Updated",
      description: checked ? "High contrast mode is now enabled." : "High contrast mode is now disabled.",
    })
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appearance Settings</h1>
          <p className="text-muted-foreground">Customize the look and feel of the application</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <SettingsSidebar />

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Choose your preferred color theme for the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                defaultValue={theme}
                onValueChange={handleThemeChange}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem value="light" id="theme-light" className="peer sr-only" />
                  <Label
                    htmlFor="theme-light"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="mb-3 rounded-md border-2 border-muted p-1 w-full">
                      <div className="space-y-2">
                        <div className="bg-[#f8fafc] dark:bg-[#f8fafc] h-6 w-full rounded"></div>
                        <div className="bg-[#f1f5f9] dark:bg-[#f1f5f9] h-10 w-full rounded"></div>
                        <div className="bg-[#e2e8f0] dark:bg-[#e2e8f0] h-3 w-1/2 rounded"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="h-5 w-5" />
                      Light
                      {theme === "light" && <Check className="h-4 w-4 text-primary ml-1" />}
                    </div>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="dark" id="theme-dark" className="peer sr-only" />
                  <Label
                    htmlFor="theme-dark"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="mb-3 rounded-md border-2 border-muted p-1 w-full">
                      <div className="space-y-2">
                        <div className="bg-[#0f172a] dark:bg-[#0f172a] h-6 w-full rounded"></div>
                        <div className="bg-[#1e293b] dark:bg-[#1e293b] h-10 w-full rounded"></div>
                        <div className="bg-[#334155] dark:bg-[#334155] h-3 w-1/2 rounded"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Moon className="h-5 w-5" />
                      Dark
                      {theme === "dark" && <Check className="h-4 w-4 text-primary ml-1" />}
                    </div>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="system" id="theme-system" className="peer sr-only" />
                  <Label
                    htmlFor="theme-system"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="mb-3 rounded-md border-2 border-muted p-1 w-full">
                      <div className="space-y-2">
                        <div className="bg-gradient-to-r from-[#f8fafc] to-[#0f172a] h-6 w-full rounded"></div>
                        <div className="bg-gradient-to-r from-[#f1f5f9] to-[#1e293b] h-10 w-full rounded"></div>
                        <div className="bg-gradient-to-r from-[#e2e8f0] to-[#334155] h-3 w-1/2 rounded"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Laptop className="h-5 w-5" />
                      System
                      {theme === "system" && <Check className="h-4 w-4 text-primary ml-1" />}
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="high-contrast">High Contrast Mode</Label>
                  <Switch id="high-contrast" checked={highContrast} onCheckedChange={handleHighContrastToggle} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Increases contrast between elements for better visibility.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Text & Typography</CardTitle>
              <CardDescription>Adjust text size and readability settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Font Size: {fontSize}px</Label>
                  <span className="text-sm text-muted-foreground">
                    {fontSize < 14 ? "Small" : fontSize < 18 ? "Medium" : "Large"}
                  </span>
                </div>
                <Slider defaultValue={[fontSize]} min={12} max={20} step={1} onValueChange={handleFontSizeChange} />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Small</span>
                  <span>Medium</span>
                  <span>Large</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="font-family">Font Family</Label>
                <Select defaultValue="inter">
                  <SelectTrigger id="font-family">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter (Default)</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="opensans">Open Sans</SelectItem>
                    <SelectItem value="lato">Lato</SelectItem>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accessibility</CardTitle>
              <CardDescription>Settings to improve accessibility and user experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations">Enable Animations</Label>
                  <p className="text-sm text-muted-foreground">Controls UI animations and transitions.</p>
                </div>
                <Switch id="animations" checked={animationsEnabled} onCheckedChange={handleAnimationsToggle} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reduced-motion">Reduced Motion</Label>
                  <p className="text-sm text-muted-foreground">
                    Minimizes motion effects for users sensitive to movement.
                  </p>
                </div>
                <Switch id="reduced-motion" checked={reducedMotion} onCheckedChange={handleReducedMotionToggle} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="language">Language</Label>
                  <p className="text-sm text-muted-foreground">Choose your preferred language for the interface.</p>
                </div>
                <Select defaultValue="en">
                  <SelectTrigger id="language" className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theme Preview</CardTitle>
              <CardDescription>See how different elements look with your current theme settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Text Elements</h3>
                  <div className="space-y-2">
                    <h1 className="text-2xl font-bold">Heading 1</h1>
                    <h2 className="text-xl font-bold">Heading 2</h2>
                    <h3 className="text-lg font-bold">Heading 3</h3>
                    <p>Regular paragraph text</p>
                    <p className="text-sm text-muted-foreground">Secondary text</p>
                    <a href="#" className="text-primary hover:underline">
                      Link text
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">UI Elements</h3>
                  <div className="space-y-2">
                    <Button>Primary Button</Button>
                    <Button variant="outline" className="mt-2">
                      Outline Button
                    </Button>
                    <div className="flex items-center space-x-2 mt-2">
                      <Switch id="preview-switch" />
                      <Label htmlFor="preview-switch">Switch</Label>
                    </div>
                    <div className="border rounded-md p-3 mt-2 bg-card">Card Element</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Apply Changes
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

