"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  FileText,
  BookOpen,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getCourseById, currentUser } from "@/lib/data"

export default function CourseLearnPage({ params }: { params: { courseId: string } }) {
  const router = useRouter()
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])

  const course = getCourseById(params.courseId)

  if (!course) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
        <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/courses">Browse Courses</Link>
        </Button>
      </div>
    )
  }

  // Flatten lessons array for easier navigation
  const lessons = course.curriculum.flatMap(section => section.lessons)
  const currentLesson = lessons[currentLessonIndex]

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1)
    }
  }

  const handleNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
    }
  }

  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessons(prev =>
      prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    )
  }

  const progress = (completedLessons.length / lessons.length) * 100

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container flex items-center justify-between h-14">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/courses/${params.courseId}`}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Link>
          </Button>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              {completedLessons.length} of {lessons.length} completed
            </div>
            <Progress value={progress} className="w-[100px]" />
          </div>
        </div>
      </div>

      <div className="container py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              {currentLesson.type === "video" ? (
                <PlayCircle className="w-12 h-12 text-muted-foreground" />
              ) : currentLesson.type === "quiz" ? (
                <FileText className="w-12 h-12 text-muted-foreground" />
              ) : (
                <BookOpen className="w-12 h-12 text-muted-foreground" />
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
              <p className="text-muted-foreground">{currentLesson.duration}</p>
            </div>

            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="prose dark:prose-invert max-w-none">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <h3>Learning Objectives</h3>
                <ul>
                  <li>Understand the core concepts covered in this lesson</li>
                  <li>Apply the knowledge through practical exercises</li>
                  <li>Complete the associated assignments and quizzes</li>
                </ul>
              </TabsContent>
              <TabsContent value="notes">
                <div className="prose dark:prose-invert max-w-none">
                  <p>Your notes for this lesson will appear here.</p>
                </div>
              </TabsContent>
              <TabsContent value="discussion">
                <div className="prose dark:prose-invert max-w-none">
                  <p>Discussion forum for this lesson will appear here.</p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePreviousLesson}
                disabled={currentLessonIndex === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous Lesson
              </Button>
              <Button
                onClick={handleNextLesson}
                disabled={currentLessonIndex === lessons.length - 1}
              >
                Next Lesson
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Course Content</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCompletedLessons(lessons.map(l => l.id))}
              >
                Mark All as Complete
              </Button>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {course.curriculum.map((section, sectionIndex) => (
                <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{section.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {section.lessons.filter(l => completedLessons.includes(l.id)).length} /{" "}
                        {section.lessons.length}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-1">
                      {section.lessons.map((lesson, lessonIndex) => {
                        const isComplete = completedLessons.includes(lesson.id)
                        const isCurrent =
                          currentLessonIndex ===
                          course.curriculum
                            .slice(0, sectionIndex)
                            .reduce((acc, s) => acc + s.lessons.length, 0) + lessonIndex

                        return (
                          <div
                            key={lessonIndex}
                            className={`flex items-center justify-between p-2 rounded-lg ${
                              isCurrent ? "bg-muted" : "hover:bg-muted/50"
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => toggleLessonCompletion(lesson.id)}
                              >
                                {isComplete ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-muted-foreground" />
                                )}
                              </Button>
                              <span
                                className={`text-sm ${
                                  isComplete ? "text-muted-foreground line-through" : ""
                                }`}
                              >
                                {lesson.title}
                              </span>
                            </div>
                            <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                          </div>
                        )
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
} 