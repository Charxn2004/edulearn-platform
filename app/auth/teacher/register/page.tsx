"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, ChevronLeft, Upload, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

export default function TeacherRegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    expertise: "",
    bio: "",
    website: "",
    linkedin: "",
    resume: null as File | null,
    termsAccepted: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const expertiseOptions = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "UI/UX Design",
    "Digital Marketing",
    "Business",
    "Photography",
    "Music",
    "Language Learning",
    "Other",
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!formData.expertise) {
      newErrors.expertise = "Please select your area of expertise"
    }

    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required"
    } else if (formData.bio.length < 50) {
      newErrors.bio = "Bio must be at least 50 characters"
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        resume: e.target.files![0],
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)

      toast({
        title: "Application Submitted",
        description: "Your application to become an instructor has been submitted successfully.",
      })
    }, 1500)
  }

  return (
    <div className="container py-8">
      <div className="flex justify-center mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/auth/teacher/login">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to teacher login
          </Link>
        </Button>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Become an Instructor</h1>
          <p className="text-muted-foreground mt-2">
            Share your knowledge and expertise with students around the world
          </p>
        </div>

        {isSubmitted ? (
          <Card>
            <CardContent className="pt-6 pb-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                  <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-300" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Thank you for applying to become an instructor. We'll review your application and get back to you within
                3-5 business days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/auth/teacher/login">Teacher Login</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Instructor Application</CardTitle>
              <CardDescription>
                Please fill out the form below to apply to become an instructor on our platform.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
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
                    </div>
                    {errors.password ? (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    ) : (
                      <p className="text-xs text-muted-foreground">Password must be at least 8 characters long.</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Professional Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="expertise">
                      Area of Expertise <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.expertise}
                      onValueChange={(value) => handleSelectChange("expertise", value)}
                    >
                      <SelectTrigger className={errors.expertise ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select your area of expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        {expertiseOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.expertise && <p className="text-sm text-red-500">{errors.expertise}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">
                      Bio <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Tell us about yourself, your experience, and why you want to teach on our platform."
                      rows={5}
                      value={formData.bio}
                      onChange={handleChange}
                      className={errors.bio ? "border-red-500" : ""}
                    />
                    {errors.bio ? (
                      <p className="text-sm text-red-500">{errors.bio}</p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Minimum 50 characters. This will be displayed on your instructor profile.
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        placeholder="https://yourwebsite.com"
                        value={formData.website}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        placeholder="https://linkedin.com/in/yourprofile"
                        value={formData.linkedin}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resume">Resume/CV</Label>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("resume")?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Resume
                      </Button>
                      <Input
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      {formData.resume && <span className="text-sm">{formData.resume.name}</span>}
                    </div>
                    <p className="text-xs text-muted-foreground">Accepted formats: PDF, DOC, DOCX. Max size: 5MB.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => {
                        setFormData((prev) => ({
                          ...prev,
                          termsAccepted: checked === true,
                        }))

                        if (errors.termsAccepted) {
                          setErrors((prev) => {
                            const newErrors = { ...prev }
                            delete newErrors.termsAccepted
                            return newErrors
                          })
                        }
                      }}
                      className={errors.termsAccepted ? "border-red-500" : ""}
                    />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="terms" className="text-sm font-normal">
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                          terms of service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                          privacy policy
                        </Link>
                        .
                      </Label>
                      {errors.termsAccepted && <p className="text-sm text-red-500">{errors.termsAccepted}</p>}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}
      </div>
    </div>
  )
}

