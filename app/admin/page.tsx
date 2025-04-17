"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Users,
  BookOpen,
  BarChart,
  DollarSign,
  PlusCircle,
  Edit,
  Trash,
  Search,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { courses, currentUser } from "@/lib/data"

// Mock users data
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "student",
    status: "active",
    joinedDate: "Mar 10, 2023",
    avatar: "/placeholder.svg?height=40&width=40&text=JD",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "instructor",
    status: "active",
    joinedDate: "Jan 5, 2023",
    avatar: "/placeholder.svg?height=40&width=40&text=SW",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    role: "admin",
    status: "active",
    joinedDate: "Feb 15, 2023",
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    role: "student",
    status: "inactive",
    joinedDate: "Apr 20, 2023",
    avatar: "/placeholder.svg?height=40&width=40&text=ER",
  },
  {
    id: "5",
    name: "David Kim",
    email: "david.kim@example.com",
    role: "instructor",
    status: "pending",
    joinedDate: "May 8, 2023",
    avatar: "/placeholder.svg?height=40&width=40&text=DK",
  },
  {
    id: "6",
    name: "Jessica Thompson",
    email: "jessica.thompson@example.com",
    role: "student",
    status: "active",
    joinedDate: "Jun 12, 2023",
    avatar: "/placeholder.svg?height=40&width=40&text=JT",
  },
  {
    id: "7",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    role: "student",
    status: "active",
    joinedDate: "Jul 3, 2023",
    avatar: "/placeholder.svg?height=40&width=40&text=RW",
  },
  {
    id: "8",
    name: "Lisa Martinez",
    email: "lisa.martinez@example.com",
    role: "instructor",
    status: "active",
    joinedDate: "Aug 22, 2023",
    avatar: "/placeholder.svg?height=40&width=40&text=LM",
  },
]

// Mock content data
const content = [
  {
    id: "1",
    title: "Web Development Masterclass",
    type: "course",
    author: "Alex Johnson",
    status: "published",
    createdDate: "Jan 15, 2023",
    lastUpdated: "Mar 10, 2023",
  },
  {
    id: "2",
    title: "Introduction to Machine Learning",
    type: "course",
    author: "Michael Chen",
    status: "draft",
    createdDate: "Feb 5, 2023",
    lastUpdated: "Feb 20, 2023",
  },
  {
    id: "3",
    title: "Summer Coding Bootcamp",
    type: "event",
    author: "Sarah Williams",
    status: "published",
    createdDate: "Mar 1, 2023",
    lastUpdated: "Mar 15, 2023",
  },
  {
    id: "4",
    title: "New Course Submission Guidelines",
    type: "article",
    author: "Admin",
    status: "published",
    createdDate: "Apr 10, 2023",
    lastUpdated: "Apr 10, 2023",
  },
  {
    id: "5",
    title: "Advanced JavaScript Techniques",
    type: "course",
    author: "David Kim",
    status: "review",
    createdDate: "May 5, 2023",
    lastUpdated: "May 18, 2023",
  },
  {
    id: "6",
    title: "UI/UX Design Principles",
    type: "course",
    author: "Lisa Martinez",
    status: "published",
    createdDate: "Jun 12, 2023",
    lastUpdated: "Jun 30, 2023",
  },
]

export default function AdminPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [userSearchQuery, setUserSearchQuery] = useState("")
  const [contentSearchQuery, setContentSearchQuery] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectedContent, setSelectedContent] = useState<string[]>([])
  const [isEditingUser, setIsEditingUser] = useState<string | null>(null)
  const [isEditingContent, setIsEditingContent] = useState<string | null>(null)
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    role: "student",
    status: "active",
  })
  const [contentFormData, setContentFormData] = useState({
    title: "",
    type: "course",
    status: "draft",
  })
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [isAddingContent, setIsAddingContent] = useState(false)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ type: "user" | "content"; id: string } | null>(null)

  // Check if user is admin
  if (currentUser.role !== "admin") {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-6">You do not have permission to access the admin panel.</p>
        <Button asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    )
  }

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(userSearchQuery.toLowerCase()),
  )

  // Filter content based on search query
  const filteredContent = content.filter(
    (item) =>
      item.title.toLowerCase().includes(contentSearchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(contentSearchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(contentSearchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(contentSearchQuery.toLowerCase()),
  )

  // Handle user selection
  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  // Handle content selection
  const toggleContentSelection = (contentId: string) => {
    if (selectedContent.includes(contentId)) {
      setSelectedContent(selectedContent.filter((id) => id !== contentId))
    } else {
      setSelectedContent([...selectedContent, contentId])
    }
  }

  // Handle user edit
  const handleEditUser = (user: (typeof users)[0]) => {
    setIsEditingUser(user.id)
    setUserFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    })
  }

  // Handle content edit
  const handleEditContent = (contentItem: (typeof content)[0]) => {
    setIsEditingContent(contentItem.id)
    setContentFormData({
      title: contentItem.title,
      type: contentItem.type,
      status: contentItem.status,
    })
  }

  // Handle user form submission
  const handleUserFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isEditingUser) {
      // Update existing user
      toast({
        title: "User Updated",
        description: `User ${userFormData.name} has been updated successfully.`,
      })
      setIsEditingUser(null)
    } else {
      // Add new user
      toast({
        title: "User Added",
        description: `User ${userFormData.name} has been added successfully.`,
      })
      setIsAddingUser(false)
    }

    // Reset form
    setUserFormData({
      name: "",
      email: "",
      role: "student",
      status: "active",
    })
  }

  // Handle content form submission
  const handleContentFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isEditingContent) {
      // Update existing content
      toast({
        title: "Content Updated",
        description: `${contentFormData.title} has been updated successfully.`,
      })
      setIsEditingContent(null)
    } else {
      // Add new content
      toast({
        title: "Content Added",
        description: `${contentFormData.title} has been added successfully.`,
      })
      setIsAddingContent(false)
    }

    // Reset form
    setContentFormData({
      title: "",
      type: "course",
      status: "draft",
    })
  }

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (!itemToDelete) return

    if (itemToDelete.type === "user") {
      // Delete user
      toast({
        title: "User Deleted",
        description: "The user has been deleted successfully.",
      })
    } else {
      // Delete content
      toast({
        title: "Content Deleted",
        description: "The content has been deleted successfully.",
      })
    }

    setIsConfirmingDelete(false)
    setItemToDelete(null)
  }

  // Handle bulk actions
  const handleBulkAction = (action: string, type: "user" | "content") => {
    const count = type === "user" ? selectedUsers.length : selectedContent.length

    if (count === 0) {
      toast({
        title: "No Items Selected",
        description: "Please select at least one item to perform this action.",
        variant: "destructive",
      })
      return
    }

    if (action === "delete") {
      toast({
        title: "Items Deleted",
        description: `${count} ${type}(s) have been deleted successfully.`,
      })
    } else if (action === "activate") {
      toast({
        title: "Items Activated",
        description: `${count} ${type}(s) have been activated successfully.`,
      })
    } else if (action === "deactivate") {
      toast({
        title: "Items Deactivated",
        description: `${count} ${type}(s) have been deactivated successfully.`,
      })
    }

    // Clear selections
    if (type === "user") {
      setSelectedUsers([])
    } else {
      setSelectedContent([])
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, content, and settings</p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 w-full md:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,389</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,721</div>
            <p className="text-xs text-muted-foreground">+7% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8 w-full md:w-[300px]"
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>Fill in the details to create a new user account.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleUserFormSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={userFormData.name}
                          onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userFormData.email}
                          onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select
                          value={userFormData.role}
                          onValueChange={(value) => setUserFormData({ ...userFormData, role: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="instructor">Instructor</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={userFormData.status}
                          onValueChange={(value) => setUserFormData({ ...userFormData, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add User</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Bulk Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleBulkAction("activate", "user")}>
                    <Check className="mr-2 h-4 w-4" />
                    Activate Selected
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction("deactivate", "user")}>
                    <X className="mr-2 h-4 w-4" />
                    Deactivate Selected
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction("delete", "user")} className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Selected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedUsers(filteredUsers.map((user) => user.id))
                        } else {
                          setSelectedUsers([])
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => toggleUserSelection(user.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === "admin" ? "default" : "outline"}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            user.status === "active"
                              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                              : user.status === "inactive"
                                ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800"
                          }
                        >
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joinedDate}</TableCell>
                      <TableCell className="text-right">
                        <Dialog
                          open={isEditingUser === user.id}
                          onOpenChange={(open) => !open && setIsEditingUser(null)}
                        >
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => handleEditUser(user)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit User</DialogTitle>
                              <DialogDescription>Update user information.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleUserFormSubmit}>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-name">Full Name</Label>
                                  <Input
                                    id="edit-name"
                                    value={userFormData.name}
                                    onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-email">Email</Label>
                                  <Input
                                    id="edit-email"
                                    type="email"
                                    value={userFormData.email}
                                    onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-role">Role</Label>
                                  <Select
                                    value={userFormData.role}
                                    onValueChange={(value) => setUserFormData({ ...userFormData, role: value })}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="student">Student</SelectItem>
                                      <SelectItem value="instructor">Instructor</SelectItem>
                                      <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-status">Status</Label>
                                  <Select
                                    value={userFormData.status}
                                    onValueChange={(value) => setUserFormData({ ...userFormData, status: value })}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="active">Active</SelectItem>
                                      <SelectItem value="inactive">Inactive</SelectItem>
                                      <SelectItem value="pending">Pending</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit">Save Changes</Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setItemToDelete({ type: "user", id: user.id })
                            setIsConfirmingDelete(true)
                          }}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <p className="text-muted-foreground">No users found</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end space-x-2 py-4">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search content..."
                className="pl-8 w-full md:w-[300px]"
                value={contentSearchQuery}
                onChange={(e) => setContentSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Dialog open={isAddingContent} onOpenChange={setIsAddingContent}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Content
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Content</DialogTitle>
                    <DialogDescription>Fill in the details to create new content.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleContentFormSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={contentFormData.title}
                          onChange={(e) => setContentFormData({ ...contentFormData, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Select
                          value={contentFormData.type}
                          onValueChange={(value) => setContentFormData({ ...contentFormData, type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="course">Course</SelectItem>
                            <SelectItem value="article">Article</SelectItem>
                            <SelectItem value="event">Event</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={contentFormData.status}
                          onValueChange={(value) => setContentFormData({ ...contentFormData, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="review">Review</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Content</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Bulk Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleBulkAction("publish", "content")}>
                    <Check className="mr-2 h-4 w-4" />
                    Publish Selected
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction("unpublish", "content")}>
                    <X className="mr-2 h-4 w-4" />
                    Unpublish Selected
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction("delete", "content")} className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Selected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedContent.length === filteredContent.length && filteredContent.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedContent(filteredContent.map((item) => item.id))
                        } else {
                          setSelectedContent([])
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContent.length > 0 ? (
                  filteredContent.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedContent.includes(item.id)}
                          onCheckedChange={() => toggleContentSelection(item.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">ID: {item.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Badge>
                      </TableCell>
                      <TableCell>{item.author}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            item.status === "published"
                              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                              : item.status === "draft"
                                ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800"
                          }
                        >
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <Dialog
                          open={isEditingContent === item.id}
                          onOpenChange={(open) => !open && setIsEditingContent(null)}
                        >
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => handleEditContent(item)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Content</DialogTitle>
                              <DialogDescription>Update content information.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleContentFormSubmit}>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-title">Title</Label>
                                  <Input
                                    id="edit-title"
                                    value={contentFormData.title}
                                    onChange={(e) => setContentFormData({ ...contentFormData, title: e.target.value })}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-type">Type</Label>
                                  <Select
                                    value={contentFormData.type}
                                    onValueChange={(value) => setContentFormData({ ...contentFormData, type: value })}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="course">Course</SelectItem>
                                      <SelectItem value="article">Article</SelectItem>
                                      <SelectItem value="event">Event</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-status">Status</Label>
                                  <Select
                                    value={contentFormData.status}
                                    onValueChange={(value) => setContentFormData({ ...contentFormData, status: value })}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="draft">Draft</SelectItem>
                                      <SelectItem value="review">Review</SelectItem>
                                      <SelectItem value="published">Published</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit">Save Changes</Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setItemToDelete({ type: "content", id: item.id })
                            setIsConfirmingDelete(true)
                          }}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <p className="text-muted-foreground">No content found</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end space-x-2 py-4">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>Manage general settings for your site.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" defaultValue="EduLearn" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Input id="site-description" defaultValue="Learn anything, anytime, anywhere" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="support@edulearn.com" />
              </div>
              <div className="space-y-2">
                <Label>Registration</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="allow-registration" defaultChecked />
                  <label
                    htmlFor="allow-registration"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Allow new user registrations
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>User Roles</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="instructor-approval" defaultChecked />
                  <label
                    htmlFor="instructor-approval"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Require admin approval for instructor accounts
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Configure email notifications and templates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Email Notifications</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="email-welcome" defaultChecked />
                    <label
                      htmlFor="email-welcome"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Send welcome email to new users
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="email-course-complete" defaultChecked />
                    <label
                      htmlFor="email-course-complete"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Send course completion emails
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="email-marketing" defaultChecked />
                    <label
                      htmlFor="email-marketing"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Send marketing emails (new courses, promotions)
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-from">From Email</Label>
                <Input id="email-from" type="email" defaultValue="noreply@edulearn.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-reply-to">Reply-To Email</Label>
                <Input id="email-reply-to" type="email" defaultValue="support@edulearn.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure payment providers and options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Payment Providers</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="payment-stripe" defaultChecked />
                    <label
                      htmlFor="payment-stripe"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Stripe
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="payment-paypal" defaultChecked />
                    <label
                      htmlFor="payment-paypal"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      PayPal
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Currency</Label>
                <RadioGroup defaultValue="usd">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="usd" id="currency-usd" />
                    <Label htmlFor="currency-usd" className="font-normal">
                      USD ($)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="eur" id="currency-eur" />
                    <Label htmlFor="currency-eur" className="font-normal">
                      EUR (€)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gbp" id="currency-gbp" />
                    <Label htmlFor="currency-gbp" className="font-normal">
                      GBP (£)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isConfirmingDelete} onOpenChange={setIsConfirmingDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {itemToDelete?.type}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmingDelete(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

