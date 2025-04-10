"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Clock,
  BarChart,
  Users,
  BookOpen,
  Award,
  CheckCircle,
  PlayCircle,
  FileText,
  MessageSquare,
  Heart,
  Share2,
  ShoppingCart,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { getCourseById, currentUser } from "@/lib/data"

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isEnrolling, setIsEnrolling] = useState(false)

  const course = getCourseById(params.courseId)

  if (!course) {
    return (
      <div className="container py-12 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
        <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/courses">Browse Courses</Link>
        </Button>
      </div>
    )
  }

  const isEnrolled = currentUser.enrolledCourses.includes(course.id)
  const isSaved = currentUser.savedCourses.includes(course.id)

  const handleEnroll = () => {
    setIsEnrolling(true)

    // Simulate enrollment process
    setTimeout(() => {
      setIsEnrolling(false)

      if (isEnrolled) {
        router.push(`/courses/${course.id}/learn`)
      } else {
        toast({
          title: "Enrolled Successfully!",
          description: `You have been enrolled in ${course.title}`,
        })

        // In a real app, we would update the user's enrolled courses
        // and then redirect to the learning interface
        router.push(`/courses/${course.id}/learn`)
      }
    }, 1500)
  }

  const handleSave = () => {
    toast({
      title: isSaved ? "Removed from Saved Courses" : "Added to Saved Courses",
      description: isSaved
        ? `${course.title} has been removed from your saved courses`
        : `${course.title} has been added to your saved courses`,
    })

    // In a real app, we would update the user's saved courses
  }

  const handleShare = () => {
    // In a real app, we would open a share dialog
    // For now, just copy the URL to clipboard
    navigator.clipboard.writeText(window.location.href)

    toast({
      title: "Link Copied!",
      description: "Course link has been copied to clipboard",
    })
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{course.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{course.description}</p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center">
                <span className="text-yellow-500 font-bold mr-1">{course.rating}</span>
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(course.rating) ? "text-yellow-500" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                </div>
                <span className="text-sm text-muted-foreground ml-1">({course.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                {course.students.toLocaleString()} students
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {course.duration}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <BarChart className="h-4 w-4 mr-1" />
                {course.level}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Last updated: {course.lastUpdated}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-12 w-12">
                <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                <AvatarFallback>
                  {course.instructor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{course.instructor.name}</p>
                <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {course.tags.map((tag, i) => (
                <Badge key={i} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="w-full justify-start border-b rounded-none">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">What You Will Learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.whatYouWillLearn.map((item, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Course Description</h3>
                  <div className="prose max-w-none dark:prose-invert">
                    <p>{course.description}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {course.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="curriculum" className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {course.curriculum.map((section, i) => (
                  <AccordionItem key={i} value={`section-${i}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center">
                        <span className="font-medium">{section.title}</span>
                        <span className="ml-2 text-sm text-muted-foreground">
                          ({section.lessons.length} lessons)
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {section.lessons.map((lesson, j) => (
                          <div
                            key={j}
                            className="flex items-center justify-between p-2 hover:bg-muted rounded-lg"
                          >
                            <div className="flex items-center">
                              {lesson.type === "video" ? (
                                <PlayCircle className="h-4 w-4 mr-2 text-blue-500" />
                              ) : lesson.type === "quiz" ? (
                                <FileText className="h-4 w-4 mr-2 text-green-500" />
                              ) : (
                                <BookOpen className="h-4 w-4 mr-2 text-purple-500" />
                              )}
                              <span>{lesson.title}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            <TabsContent value="instructor" className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                    <AvatarFallback>
                      {course.instructor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{course.instructor.name}</h3>
                    <p className="text-muted-foreground">{course.instructor.title}</p>
                  </div>
                </div>
                <div className="prose max-w-none dark:prose-invert">
                  <p>{course.instructor.bio}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <div className="space-y-6">
                {course.reviews.map((review, i) => (
                  <div key={i} className="border-b pb-6 last:border-0">
                    <div className="flex items-center space-x-4 mb-2">
                      <Avatar>
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback>
                          {review.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{review.name}</p>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "text-yellow-500" : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardContent className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold">${course.discountPrice}</div>
                  {course.price !== course.discountPrice && (
                    <div className="text-lg text-muted-foreground line-through">${course.price}</div>
                  )}
                </div>
                {course.price !== course.discountPrice && (
                  <div className="text-sm text-muted-foreground mb-4">
                    {Math.round(((course.price - course.discountPrice) / course.price) * 100)}% off
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Button className="w-full" size="lg" onClick={handleEnroll} disabled={isEnrolling}>
                  {isEnrolling ? (
                    "Enrolling..."
                  ) : isEnrolled ? (
                    "Continue Learning"
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Enroll Now
                    </>
                  )}
                </Button>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleSave}
                  >
                    <Heart
                      className={`w-4 h-4 mr-2 ${isSaved ? "fill-current" : ""}`}
                    />
                    {isSaved ? "Saved" : "Save"}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              <hr className="my-6" />

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span>Total Time</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lessons</span>
                  <span className="font-medium">
                    {course.curriculum.reduce((acc, section) => acc + section.lessons.length, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Skill Level</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Certificate</span>
                  <span className="font-medium">Yes</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 