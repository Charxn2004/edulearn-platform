import { Clock, BarChart, Users, BookOpen, CheckCircle, PlayCircle, FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function CoursePage({ params }: { params: { id: string } }) {
  const courseId = params.id;
  
  // Mock course data
  const course = {
    id: courseId,
    title: "Web Development Masterclass",
    description: "Learn modern web development from scratch with this comprehensive course covering HTML, CSS, JavaScript, React, and Node.js.",
    instructor: {
      name: "Alex Johnson",
      title: "Senior Web Developer",
      avatar: "/placeholder.svg?height=64&width=64"
    },
    rating: 4.8,
    students: 12453,
    duration: "24 hours",
    level: "All Levels",
    lastUpdated: "March 2025",
    price: 89.99,
    discountPrice: 49.99,
    tags: ["Web Development", "JavaScript", "React", "Node.js"],
    whatYouWillLearn: [
      "Build responsive websites using HTML5, CSS3, and JavaScript",
      "Create dynamic web applications with React",
      "Develop backend APIs with Node.js and Express",
      "Connect to databases and implement CRUD operations",
      "Deploy your applications to production environments",
      "Implement authentication and authorization"
    ],
    curriculum: [
      {
        title: "Introduction to Web Development",
        lessons: [
          { title: "Course Overview", duration: "5:22", type: "video" },
          { title: "Setting Up Your Development Environment", duration: "12:45", type: "video" },
          { title: "Web Development Basics", duration: "18:30", type: "video" },
          { title: "Introduction Quiz", duration: "10 questions", type: "quiz" }
        ]
      },
      {
        title: "HTML Fundamentals",
        lessons: [
          { title: "HTML Document Structure", duration: "14:18", type: "video" },
          { title: "Working with Text Elements", duration: "16:24", type: "video" },
          { title: "HTML Forms and Input Elements", duration: "22:15", type: "video" },
          { title: "HTML Practice Assignment", duration: "1 hour", type: "assignment" }
        ]
      },
      {
        title: "CSS Styling",
        lessons: [
          { title: "CSS Selectors and Properties", duration: "20:12", type: "video" },
          { title: "Box Model and Layout", duration: "18:45", type: "video" },
          { title: "Flexbox and Grid Layout", duration: "25:30", type: "video" },
          { title: "Responsive Design Principles", duration: "22:18", type: "video" },
          { title: "CSS Challenge", duration: "15 questions", type: "quiz" }
        ]
      },
      {
        title: "JavaScript Essentials",
        lessons: [
          { title: "JavaScript Syntax and Variables", duration: "19:42", type: "video" },
          { title: "Functions and Control Flow", duration: "24:15", type: "video" },
          { title: "Working with Arrays and Objects", duration: "28:33", type: "video" },
          { title: "DOM Manipulation", duration: "32:20", type: "video" },
          { title: "JavaScript Project", duration: "2 hours", type: "assignment" }
        ]
      }
    ],
    reviews: [
      {
        name: "Sarah M.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 weeks ago",
        comment: "This course exceeded my expectations! The instructor explains complex concepts in a way that's easy to understand. I've already built two projects using what I learned."
      },
      {
        name: "Michael T.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "1 month ago",
        comment: "Great content and well-structured. I would have liked more advanced exercises, but overall it's an excellent introduction to web development."
      },
      {
        name: "Jennifer L.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 months ago",
        comment: "As someone with no prior coding experience, this course was perfect for me. The step-by-step approach helped me build confidence in my skills."
      }
    ]
  };

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
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? "text-yellow-500" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
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
                <AvatarFallback>{course.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{course.instructor.name}</p>
                <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {course.tags.map((tag, i) => (
                <Badge key={i} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList className="w-full justify-start border-b rounded-none">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
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
                    <p>
                      This comprehensive Web Development Masterclass is designed to take you from beginner to professional developer. Whether you're just starting out or looking to enhance your existing skills, this course provides everything you need to build modern, responsive websites and web applications.
                    </p>
                    <p>
                      You'll start with the fundamentals of HTML, CSS, and JavaScript before progressing to advanced topics like React for frontend development and Node.js for backend programming. Throughout the course, you'll work on real-world projects that will help you apply what you've learned and build a portfolio to showcase your skills to potential employers.
                    </p>
                    <p>
                      By the end of this course, you'll have the confidence and knowledge to create full-stack web applications from scratch, implement best practices for web development, and continue learning new technologies on your own.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Basic computer skills and familiarity with using the internet</li>
                    <li>No prior programming experience required - we'll start from the basics</li>
                    <li>A computer with internet access (Windows, Mac, or Linux)</li>
                    <li>Enthusiasm and willingness to learn!</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="curriculum" className="pt-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Course Content</h3>
                  <div className="text-sm text-muted-foreground">
                    {course.curriculum.reduce((acc, section) => acc + section.lessons.length, 0)} lessons • {course.duration} total
                  </div>
                </div>
                
                <Accordion type="multiple" className="w-full">
                  {course.curriculum.map((section, i) => (
                    <AccordionItem key={i} value={`section-${i}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex justify-between w-full pr-4">
                          <span>{section.title}</span>
                          <span className="text-sm text-muted-foreground">{section.lessons.length} lessons</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {section.lessons.map((lesson, j) => (
                            <div key={j} className="flex items-center justify-between py-2 px-4 rounded-md hover:bg-muted/50">
                              <div className="flex items-center">
                                {lesson.type === 'video' && <PlayCircle className="h-4 w-4 mr-2 text-primary" />}
                                {lesson.type === 'quiz' && <FileText className="h-4 w-4 mr-2 text-primary" />}
                                {lesson.type === 'assignment' && <BookOpen className="h-4 w-4 mr-2 text-primary" />}
                                <span>{lesson.title}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">{lesson.duration}</div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Student Reviews</h3>
                  <div className="flex items-center">
                    <div className="text-3xl font-bold mr-2">{course.rating}</div>
                    <div>
                      <div className="flex">
                        {Array(5).fill(0).map((_, i) => (
                          <svg key={i} className={`w-5 h-5 ${i < Math.floor(course.rating) ? "text-yellow-500" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-\

