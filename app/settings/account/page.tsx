"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { currentUser } from "@/lib/data"
import SettingsSidebar from "@/components/settings-sidebar"

export default function AccountSettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const [isAvatarLoading, setIsAvatarLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: currentUser.name.split(" ")[0],
    lastName: currentUser.name.split(" ")[1] || "",
    email: currentUser.email,
    bio: "Web developer passionate about creating beautiful and functional user interfaces.",
    location: "San Francisco, CA",
    website: "https://johndoe.com",
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
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

  const validateProfileForm = () => {
    const newErrors: Record<string, string> = {}

    if (!profileData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!profileData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!profileData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(profileData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePasswordForm = () => {
    const newErrors: Record<string, string> = {}

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required"
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required"
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters"
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password"
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateProfileForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      })
    }, 1500)
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePasswordForm()) {
      return
    }

    setIsPasswordLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsPasswordLoading(false)

      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
      })

      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }, 1500)
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsAvatarLoading(true)

      // Simulate upload
      setTimeout(() => {
        setIsAvatarLoading(false)

        toast({
          title: "Avatar Updated",
          description: "Your profile picture has been updated successfully.",
        })
      }, 1500)
    }
  }

  const handleDeleteAccount = () => {
    setIsDeleteLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsDeleteLoading(false)
      setShowDeleteConfirm(false)

      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
        variant: "destructive",
      })

      // Redirect to home page
      router.push("/")
    }, 1500)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account information and security settings</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <SettingsSidebar />

        {/* Main Content */}
        <div className="flex-1">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="w-full justify-start border-b rounded-none">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="danger">Danger Zone</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and public profile.</CardDescription>
                </CardHeader>
                <form onSubmit={handleProfileSubmit}>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                          <AvatarFallback>
                            {profileData.firstName[0]}
                            {profileData.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        {isAvatarLoading ? (
                          <div className="absolute bottom-0 right-0 rounded-full bg-primary text-primary-foreground h-8 w-8 flex items-center justify-center">
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </div>
                        ) : (
                          <label
                            htmlFor="avatar-upload"
                            className="absolute bottom-0 right-0 rounded-full bg-primary text-primary-foreground h-8 w-8 flex items-center justify-center cursor-pointer"
                          >
                            <Camera className="h-4 w-4" />
                            <span className="sr-only">Change avatar</span>
                            <input
                              id="avatar-upload"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleAvatarUpload}
                            />
                          </label>
                        )}
                      </div>
                      <div className="space-y-1 text-center sm:text-left">
                        <h3 className="font-medium text-lg">
                          {profileData.firstName} {profileData.lastName}
                        </h3>
                        <p className="text-sm text-muted-foreground">{profileData.email}</p>
                        <p className="text-sm text-muted-foreground">Member since January 2025</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleProfileChange}
                          className={errors.firstName ? "border-red-500" : ""}
                        />
                        {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleProfileChange}
                          className={errors.lastName ? "border-red-500" : ""}
                        />
                        {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        rows={4}
                        placeholder="Tell us about yourself"
                      />
                      <p className="text-xs text-muted-foreground">
                        Brief description for your profile. URLs are hyperlinked.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={profileData.location}
                          onChange={handleProfileChange}
                          placeholder="City, Country"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          name="website"
                          value={profileData.website}
                          onChange={handleProfileChange}
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password to keep your account secure.</CardDescription>
                </CardHeader>
                <form onSubmit={handlePasswordSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className={errors.currentPassword ? "border-red-500" : ""}
                      />
                      {errors.currentPassword && <p className="text-sm text-red-500">{errors.currentPassword}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className={errors.newPassword ? "border-red-500" : ""}
                      />
                      {errors.newPassword ? (
                        <p className="text-sm text-red-500">{errors.newPassword}</p>
                      ) : (
                        <p className="text-xs text-muted-foreground">Password must be at least 8 characters long.</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className={errors.confirmPassword ? "border-red-500" : ""}
                      />
                      {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isPasswordLoading}>
                      {isPasswordLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertTitle className="text-green-800 dark:text-green-300">Enabled</AlertTitle>
                    <AlertDescription className="text-green-700 dark:text-green-400">
                      Two-factor authentication is currently enabled for your account.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Authenticator App</h3>
                      <p className="text-sm text-muted-foreground">
                        Use an authenticator app to generate one-time codes.
                      </p>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Recovery Codes</h3>
                      <p className="text-sm text-muted-foreground">
                        Generate backup codes to use if you lose access to your authenticator app.
                      </p>
                    </div>
                    <Button variant="outline">View Codes</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Login Sessions</CardTitle>
                  <CardDescription>Manage your active sessions and sign out from other devices.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-medium">Current Session</h3>
                        <p className="text-sm text-muted-foreground">
                          MacBook Pro • San Francisco, CA • Last active now
                        </p>
                      </div>
                      <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded-full">
                        Current
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-medium">iPhone 14 Pro</h3>
                        <p className="text-sm text-muted-foreground">
                          iOS 17 • San Francisco, CA • Last active 2 hours ago
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Sign Out
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-medium">Windows PC</h3>
                        <p className="text-sm text-muted-foreground">Chrome • New York, NY • Last active yesterday</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Sign Out From All Devices
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Danger Zone Tab */}
            <TabsContent value="danger" className="space-y-6">
              <Card className="border-red-200 dark:border-red-900">
                <CardHeader className="text-red-600 dark:text-red-400">
                  <CardTitle>Danger Zone</CardTitle>
                  <CardDescription className="text-red-500 dark:text-red-400">
                    Irreversible and destructive actions for your account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                      The actions in this section can result in permanent data loss. Please proceed with caution.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-between items-center p-4 border border-red-200 dark:border-red-900 rounded-md">
                    <div>
                      <h3 className="font-medium text-red-600 dark:text-red-400">Delete Account</h3>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all of your content.
                      </p>
                    </div>
                    <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                      <DialogTrigger asChild>
                        <Button variant="destructive">Delete Account</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove all of
                            your data from our servers.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Warning</AlertTitle>
                            <AlertDescription>
                              All your courses, progress, and personal data will be permanently deleted.
                            </AlertDescription>
                          </Alert>
                          <div className="font-medium">Please type "delete my account" to confirm:</div>
                          <Input placeholder="delete my account" />
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={handleDeleteAccount} disabled={isDeleteLoading}>
                            {isDeleteLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              "Delete Account"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="flex justify-between items-center p-4 border border-red-200 dark:border-red-900 rounded-md">
                    <div>
                      <h3 className="font-medium text-red-600 dark:text-red-400">Export Data</h3>
                      <p className="text-sm text-muted-foreground">
                        Download a copy of all your data before deleting your account.
                      </p>
                    </div>
                    <Button variant="outline">Export Data</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

