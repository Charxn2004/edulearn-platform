"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { User, Settings, BookOpen, Award, Clock, CheckCircle, Edit, Camera, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { useToast } from "@/hooks/use-toast"
import { currentUser, getCourseById } from "@/lib/data"

export default function ProfilePage() {
  const { toast } = useToast();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    bio: "Web developer passionate about creating beautiful and functional user interfaces.",
    location: "San Francisco, CA",
    website: "https://johndoe.com",
    twitter: "@johndoe",
    github: "johndoe"
  });
  
  const enrolledCourses = currentUser.enrolledCourses.map(id => getCourseById(id)).filter(Boolean);
  const completedCourses = currentUser.completedCourses.map(id => getCourseById(id)).filter(Boolean);
  const inProgressCourses = currentUser.progress.map(progress => {
    const course = getCourseById(progress.courseId);
    if (course) {
      return {
        ...course,
        progress: progress.progress,
        lastLesson: progress.lastLesson,
        timeLeft: progress.timeLeft
      };
    }
    return null;
  }).filter(Boolean);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handleAvatarUpload = () => {
    toast({
      title: "Avatar Updated",
      description: "Your profile picture has been updated successfully.",
    });
  };
  
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="absolute bottom-0 right-0 rounded-full bg-primary text-primary-foreground h-8 w-8">
                        <Camera className="h-4 w-4" />
                        <span className="sr-only">Change avatar</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change Profile Picture</DialogTitle>
                        <DialogDescription>
                          Upload a new profile picture. Square images work best.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex justify-center">
                          <Avatar className="h-32 w-32">
                            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                            <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                        </div>
                        <Input id="picture" type="file" accept="image/*" />
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={handleAvatarUpload}>Upload</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <h2 className="mt-4 text-xl font-bold">{currentUser.name}</h2>
                <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                <Badge className="mt-2">{currentUser.role === 'student' ? 'Student' : 'Instructor'}</Badge>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Enrolled Courses</span>
                  </div>
                  <span className="font-medium">{currentUser.enrolledCourses.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Completed Courses</span>
                  </div>
                  <span className="font-medium">{currentUser.completedCourses.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Certificates</span>
                  </div>
                  <span className="font-medium">{currentUser.certificates.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Learning Hours</span>
                  </div>
                  <span className="font-medium">48.5</span>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/settings/billing">
                    <User className="mr-2 h-4 w-4" />
                    Subscription & Billing
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(!isEditingProfile)}>
                <Edit className="mr-2 h-4 w-4" />
                {isEditingProfile ? "Cancel" : "Edit Profile"}
              </Button>
            </CardHeader>
            <CardContent>
              {isEditingProfile ? (
                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={profileData.name} 
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profileData.email} 
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea 
                        id="bio" 
                        className="w-full min-h-[100px] p-2 border rounded-md" 
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      ></textarea>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        value={profileData.location} 
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input 
                        id="website" 
                        value={profileData.website} 
                        onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input 
                        id="twitter" 
                        value={profileData.twitter} 
                        onChange={(e) => setProfileData({...profileData, twitter: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <Input 
                        id="github" 
                        value={profileData.github} 
                        onChange={(e) => setProfileData({...profileData, github: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                      <p>{profileData.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                      <p>{profileData.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
                    <p>{profileData.bio}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                      <p>{profileData.location}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Website</h3>
                      <a href={profileData.website} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        {profileData.website}
                      </a>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Twitter</h3>
                      <p>{profileData.twitter}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">GitHub</h3>
                      <p>{profileData.github}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Tabs defaultValue="in-progress">
            <TabsList className="w-full justify-start border-b rounded-none">
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>
            <TabsContent value="in-progress" className="pt-6">
              <div className="space-y-4">
                {inProgressCourses.length > 0 ? (
                  inProgressCourses.map((course: any, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full md:w-1/4">
                            <div className="aspect-video rounded-md overflow-hidden">
                              <img
                                src={course.thumbnail || "/placeholder.svg"}
                                alt={`${course.title} thumbnail`}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                          <div className="w-full md:w-3/4 space-y-2">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">{course.title}</h3>
                              <Badge variant="outline">{course.progress}% Complete</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Last lesson: {course.lastLesson}
                            </p>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>{course.timeLeft} remaining</span>
                              </div>
                              <Progress value={course.progress} />
                            </div>
                            <div className="flex justify-end mt-2">
                              <Button asChild>
                                <Link href={`/courses/${course.slug}/learn`}>
                                  Continue Learning
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No courses in progress</h3>
                    <p className="text-muted-foreground mb-6">You haven't started any courses yet.</p>
                    <Button asChild>
                      <Link href="/courses">Browse Courses</Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="completed" className="pt-6">
              <div\

