"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, ChevronLeft, BookOpen, GraduationCap, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function TeacherLoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)

      // For demo purposes, always succeed
      toast({
        title: "Login Successful",
        description: "Welcome back to the instructor portal.",
      })

      router.push("/dashboard/instructor")
    }, 1500)
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Instructor Sign In</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to access the instructor portal</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl flex items-center justify-center">
              <GraduationCap className="mr-2 h-5 w-5 text-primary" />
              Teacher Portal
            </CardTitle>
            <CardDescription className="text-center">Access your courses, students, and teaching tools</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/auth/reset-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked === true }))}
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="text-center text-sm">
                Don&apos;t have an instructor account?{" "}
                <Link href="/auth/teacher/register" className="text-primary hover:underline">
                  Apply to teach
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

        <div className="flex justify-center">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/login">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to student login
            </Link>
          </Button>
        </div>

        {/* Teacher Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-primary/5">
            <BookOpen className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-medium">Create Courses</h3>
            <p className="text-xs text-muted-foreground">Design and publish your own courses</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-primary/5">
            <Users className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-medium">Manage Students</h3>
            <p className="text-xs text-muted-foreground">Track progress and engage with learners</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 rounded-lg bg-primary/5">
            <GraduationCap className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-medium">Earn Income</h3>
            <p className="text-xs text-muted-foreground">Get paid for your expertise and content</p>
          </div>
        </div>
      </div>
    </div>
  )
}

