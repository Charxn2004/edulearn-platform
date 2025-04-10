// Mock data for the e-learning platform

export type Course = {
  id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  thumbnail: string
  instructor: {
    id: string
    name: string
    title: string
    avatar: string
    bio: string
  }
  rating: number
  reviewCount: number
  students: number
  duration: string
  lessons: number
  level: string
  lastUpdated: string
  price: number
  discountPrice?: number
  tags: string[]
  category: string
  featured: boolean
  popular: boolean
  new: boolean
  whatYouWillLearn: string[]
  requirements: string[]
  curriculum: {
    title: string
    lessons: {
      id: string
      title: string
      duration: string
      type: "video" | "quiz" | "assignment" | "article"
      completed?: boolean
      preview?: boolean
    }[]
  }[]
  reviews: {
    id: string
    name: string
    avatar: string
    rating: number
    date: string
    comment: string
  }[]
}

export type User = {
  id: string
  name: string
  email: string
  avatar: string
  role: "student" | "instructor" | "admin"
  enrolledCourses: string[]
  completedCourses: string[]
  savedCourses: string[]
  progress: {
    courseId: string
    progress: number
    lastLesson: string
    timeLeft: string
  }[]
  certificates: string[]
}

export type Category = {
  id: string
  name: string
  slug: string
  count: number
}

// Categories
export const categories: Category[] = [
  { id: "1", name: "Web Development", slug: "web-development", count: 42 },
  { id: "2", name: "Mobile Development", slug: "mobile-development", count: 28 },
  { id: "3", name: "Data Science", slug: "data-science", count: 36 },
  { id: "4", name: "Design", slug: "design", count: 24 },
  { id: "5", name: "Marketing", slug: "marketing", count: 18 },
  { id: "6", name: "Business", slug: "business", count: 22 },
  { id: "7", name: "IT & Software", slug: "it-software", count: 31 },
  { id: "8", name: "Personal Development", slug: "personal-development", count: 15 },
]

// Instructors
const instructors = [
  {
    id: "1",
    name: "Alex Johnson",
    title: "Senior Web Developer",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Alex has over 10 years of experience in web development and has worked with companies like Google and Facebook.",
  },
  {
    id: "2",
    name: "Sarah Williams",
    title: "UX/UI Designer",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Sarah is a UX/UI designer with a passion for creating beautiful and functional user interfaces.",
  },
  {
    id: "3",
    name: "Dr. Michael Chen",
    title: "Data Scientist",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Dr. Chen has a PhD in Computer Science and specializes in machine learning and data analysis.",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    title: "Mobile Developer",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Emily is an expert in mobile app development with React Native and Flutter.",
  },
  {
    id: "5",
    name: "David Kim",
    title: "Full Stack Developer",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "David is a full stack developer with expertise in React, Node.js, and MongoDB.",
  },
]

// Generate reviews
const generateReviews = (count: number) => {
  const names = ["John D.", "Maria S.", "Robert T.", "Jennifer L.", "Michael P.", "Sarah M.", "Thomas B.", "Lisa K."]
  const comments = [
    "This course exceeded my expectations! The instructor explains complex concepts in a way that's easy to understand.",
    "Great content and well-structured. I would have liked more advanced exercises, but overall it's an excellent course.",
    "As someone with no prior experience, this course was perfect for me. The step-by-step approach helped me build confidence.",
    "The instructor is knowledgeable and engaging. I learned so much in a short amount of time.",
    "Comprehensive and practical. I was able to apply what I learned immediately in my job.",
    "Well-paced and thorough. The projects were challenging but doable and really reinforced the concepts.",
    "Excellent course! The instructor's teaching style made complex topics accessible and enjoyable.",
    "This course provided exactly what I needed to level up my skills. Highly recommended!",
  ]

  const reviews = []
  for (let i = 0; i < count; i++) {
    const nameIndex = Math.floor(Math.random() * names.length)
    const commentIndex = Math.floor(Math.random() * comments.length)
    const rating = Math.floor(Math.random() * 2) + 4 // Ratings between 4-5
    const monthsAgo = Math.floor(Math.random() * 6) + 1

    reviews.push({
      id: `review-${i + 1}`,
      name: names[nameIndex],
      avatar: `/placeholder.svg?height=40&width=40&text=${names[nameIndex].charAt(0)}`,
      rating,
      date: `${monthsAgo} ${monthsAgo === 1 ? "month" : "months"} ago`,
      comment: comments[commentIndex],
    })
  }

  return reviews
}

// Generate courses
export const generateCourses = (): Course[] => {
  const courses: Course[] = []

  // Web Development Courses
  courses.push({
    id: "1",
    title: "Web Development Masterclass",
    slug: "web-development-masterclass",
    description:
      "Learn modern web development from scratch with this comprehensive course covering HTML, CSS, JavaScript, React, and Node.js. You'll build real-world projects and gain the skills needed to become a professional web developer.",
    shortDescription: "Learn modern web development from scratch",
    thumbnail: "/placeholder.svg?height=400&width=600&text=Web+Development",
    instructor: instructors[0],
    rating: 4.8,
    reviewCount: 1245,
    students: 12453,
    duration: "24 hours",
    lessons: 42,
    level: "All Levels",
    lastUpdated: "March 2025",
    price: 89.99,
    discountPrice: 49.99,
    tags: ["Web Development", "JavaScript", "React", "Node.js"],
    category: "Web Development",
    featured: true,
    popular: true,
    new: false,
    whatYouWillLearn: [
      "Build responsive websites using HTML5, CSS3, and JavaScript",
      "Create dynamic web applications with React",
      "Develop backend APIs with Node.js and Express",
      "Connect to databases and implement CRUD operations",
      "Deploy your applications to production environments",
      "Implement authentication and authorization",
    ],
    requirements: [
      "Basic computer skills and familiarity with using the internet",
      "No prior programming experience required - we'll start from the basics",
      "A computer with internet access (Windows, Mac, or Linux)",
      "Enthusiasm and willingness to learn!",
    ],
    curriculum: [
      {
        title: "Introduction to Web Development",
        lessons: [
          { id: "1-1", title: "Course Overview", duration: "5:22", type: "video", preview: true, completed: true },
          {
            id: "1-2",
            title: "Setting Up Your Development Environment",
            duration: "12:45",
            type: "video",
            completed: true,
          },
          { id: "1-3", title: "Web Development Basics", duration: "18:30", type: "video", completed: true },
          { id: "1-4", title: "Introduction Quiz", duration: "10 questions", type: "quiz", completed: true },
        ],
      },
      {
        title: "HTML Fundamentals",
        lessons: [
          { id: "2-1", title: "HTML Document Structure", duration: "14:18", type: "video", completed: true },
          { id: "2-2", title: "Working with Text Elements", duration: "16:24", type: "video", completed: true },
          { id: "2-3", title: "HTML Forms and Input Elements", duration: "22:15", type: "video", completed: false },
          { id: "2-4", title: "HTML Practice Assignment", duration: "1 hour", type: "assignment", completed: false },
        ],
      },
      {
        title: "CSS Styling",
        lessons: [
          { id: "3-1", title: "CSS Selectors and Properties", duration: "20:12", type: "video", completed: false },
          { id: "3-2", title: "Box Model and Layout", duration: "18:45", type: "video", completed: false },
          { id: "3-3", title: "Flexbox and Grid Layout", duration: "25:30", type: "video", completed: false },
          { id: "3-4", title: "Responsive Design Principles", duration: "22:18", type: "video", completed: false },
          { id: "3-5", title: "CSS Challenge", duration: "15 questions", type: "quiz", completed: false },
        ],
      },
      {
        title: "JavaScript Essentials",
        lessons: [
          { id: "4-1", title: "JavaScript Syntax and Variables", duration: "19:42", type: "video", completed: false },
          { id: "4-2", title: "Functions and Control Flow", duration: "24:15", type: "video", completed: false },
          { id: "4-3", title: "Working with Arrays and Objects", duration: "28:33", type: "video", completed: false },
          { id: "4-4", title: "DOM Manipulation", duration: "32:20", type: "video", completed: false },
          { id: "4-5", title: "JavaScript Project", duration: "2 hours", type: "assignment", completed: false },
        ],
      },
    ],
    reviews: generateReviews(8),
  })

  courses.push({
    id: "2",
    title: "React.js - The Complete Guide",
    slug: "react-js-complete-guide",
    description:
      "Master React.js from the ground up! Learn hooks, context API, Redux, routing, and more as you build real-world applications with the most popular JavaScript library for building user interfaces.",
    shortDescription: "Master modern React.js from beginner to advanced",
    thumbnail: "/placeholder.svg?height=400&width=600&text=React.js",
    instructor: instructors[4],
    rating: 4.9,
    reviewCount: 2156,
    students: 18742,
    duration: "28 hours",
    lessons: 48,
    level: "Intermediate",
    lastUpdated: "February 2025",
    price: 94.99,
    discountPrice: 54.99,
    tags: ["Web Development", "JavaScript", "React", "Frontend"],
    category: "Web Development",
    featured: true,
    popular: true,
    new: false,
    whatYouWillLearn: [
      "Build powerful, fast, user-friendly and reactive web apps",
      "Apply for high-paid jobs or work as a freelancer in one of the most in-demand sectors",
      "Understand the React ecosystem and build standalone applications",
      "Learn all about React Hooks and React Components",
      "Manage complex state efficiently with the Context API and Redux",
      "Build a portfolio of projects to apply for developer jobs",
    ],
    requirements: [
      "JavaScript + HTML + CSS fundamentals are absolutely required",
      "You DON'T need to be a JavaScript expert to succeed in this course!",
      "ES6+ JavaScript knowledge is beneficial but not required",
    ],
    curriculum: [
      {
        title: "Getting Started",
        lessons: [
          { id: "1-1", title: "Introduction", duration: "3:45", type: "video", preview: true },
          { id: "1-2", title: "What is React?", duration: "8:22", type: "video" },
          { id: "1-3", title: "Setting Up the Development Environment", duration: "15:10", type: "video" },
          { id: "1-4", title: "Creating Your First React App", duration: "12:35", type: "video" },
        ],
      },
      {
        title: "React Basics",
        lessons: [
          { id: "2-1", title: "Components & JSX", duration: "18:42", type: "video" },
          { id: "2-2", title: "Props & State", duration: "22:15", type: "video" },
          { id: "2-3", title: "Handling Events", duration: "14:30", type: "video" },
          { id: "2-4", title: "Conditional Rendering", duration: "16:18", type: "video" },
          { id: "2-5", title: "Basic React Quiz", duration: "10 questions", type: "quiz" },
        ],
      },
      {
        title: "React Hooks",
        lessons: [
          { id: "3-1", title: "Introduction to Hooks", duration: "10:25", type: "video" },
          { id: "3-2", title: "useState Hook", duration: "24:18", type: "video" },
          { id: "3-3", title: "useEffect Hook", duration: "28:45", type: "video" },
          { id: "3-4", title: "useContext Hook", duration: "22:30", type: "video" },
          { id: "3-5", title: "Custom Hooks", duration: "26:15", type: "video" },
          { id: "3-6", title: "Hooks Project", duration: "1.5 hours", type: "assignment" },
        ],
      },
    ],
    reviews: generateReviews(10),
  })

  courses.push({
    id: "3",
    title: "Node.js API Masterclass",
    slug: "nodejs-api-masterclass",
    description:
      "Build an extensive RESTful API from scratch using Node.js, Express, MongoDB, and more. Learn authentication, authorization, error handling, and best practices for building robust backend services.",
    shortDescription: "Build production-ready REST APIs with Node.js",
    thumbnail: "/placeholder.svg?height=400&width=600&text=Node.js+API",
    instructor: instructors[0],
    rating: 4.7,
    reviewCount: 856,
    students: 9245,
    duration: "20 hours",
    lessons: 38,
    level: "Intermediate",
    lastUpdated: "January 2025",
    price: 84.99,
    discountPrice: 44.99,
    tags: ["Web Development", "Node.js", "API", "Backend", "MongoDB"],
    category: "Web Development",
    featured: false,
    popular: true,
    new: false,
    whatYouWillLearn: [
      "Build a real-world backend REST API with Node.js, Express, and MongoDB",
      "Implement authentication with JWT (JSON Web Tokens)",
      "Create custom middleware and error handling",
      "Use modern async/await syntax with Express",
      "Implement advanced MongoDB queries and aggregations",
      "Deploy your API to production environments",
    ],
    requirements: [
      "JavaScript fundamentals",
      "Basic understanding of HTTP and REST concepts",
      "No Node.js or MongoDB experience required",
    ],
    curriculum: [
      {
        title: "Introduction to Node.js",
        lessons: [
          { id: "1-1", title: "What is Node.js?", duration: "8:15", type: "video", preview: true },
          { id: "1-2", title: "Setting Up Your Environment", duration: "12:30", type: "video" },
          { id: "1-3", title: "Node.js Modules System", duration: "18:45", type: "video" },
          { id: "1-4", title: "Asynchronous Programming in Node.js", duration: "25:10", type: "video" },
        ],
      },
      {
        title: "Express Framework",
        lessons: [
          { id: "2-1", title: "Introduction to Express", duration: "14:22", type: "video" },
          { id: "2-2", title: "Routing in Express", duration: "20:15", type: "video" },
          { id: "2-3", title: "Middleware", duration: "18:30", type: "video" },
          { id: "2-4", title: "Error Handling", duration: "16:45", type: "video" },
          { id: "2-5", title: "Express Quiz", duration: "10 questions", type: "quiz" },
        ],
      },
      {
        title: "MongoDB & Mongoose",
        lessons: [
          { id: "3-1", title: "Introduction to MongoDB", duration: "12:18", type: "video" },
          { id: "3-2", title: "Setting Up MongoDB Atlas", duration: "15:45", type: "video" },
          { id: "3-3", title: "Mongoose ODM", duration: "22:30", type: "video" },
          { id: "3-4", title: "CRUD Operations", duration: "28:15", type: "video" },
          { id: "3-5", title: "Advanced Queries", duration: "24:40", type: "video" },
          { id: "3-6", title: "MongoDB Project", duration: "2 hours", type: "assignment" },
        ],
      },
    ],
    reviews: generateReviews(7),
  })

  // Mobile Development Courses
  courses.push({
    id: "4",
    title: "React Native - Mobile App Development",
    slug: "react-native-mobile-app-development",
    description:
      "Learn to build native mobile apps for both iOS and Android using React Native. This course covers everything from the basics to advanced topics like navigation, state management, and native modules.",
    shortDescription: "Build cross-platform mobile apps with React Native",
    thumbnail: "/placeholder.svg?height=400&width=600&text=React+Native",
    instructor: instructors[3],
    rating: 4.8,
    reviewCount: 1024,
    students: 8756,
    duration: "26 hours",
    lessons: 45,
    level: "Intermediate",
    lastUpdated: "February 2025",
    price: 89.99,
    discountPrice: 49.99,
    tags: ["Mobile Development", "React Native", "iOS", "Android"],
    category: "Mobile Development",
    featured: true,
    popular: false,
    new: true,
    whatYouWillLearn: [
      "Build native mobile apps using JavaScript and React",
      "Create cross-platform (iOS and Android) applications with a single codebase",
      "Implement navigation, state management, and data persistence",
      "Connect to REST APIs and handle authentication",
      "Use native device features like camera and geolocation",
      "Deploy your apps to the App Store and Google Play",
    ],
    requirements: [
      "JavaScript fundamentals",
      "Basic React knowledge is recommended but not required",
      "No prior mobile development experience needed",
    ],
    curriculum: [
      {
        title: "Getting Started with React Native",
        lessons: [
          { id: "1-1", title: "Introduction to React Native", duration: "10:15", type: "video", preview: true },
          { id: "1-2", title: "Setting Up Your Development Environment", duration: "18:30", type: "video" },
          { id: "1-3", title: "Creating Your First React Native App", duration: "22:45", type: "video" },
          { id: "1-4", title: "Understanding the Project Structure", duration: "15:10", type: "video" },
        ],
      },
      {
        title: "Core Components and APIs",
        lessons: [
          { id: "2-1", title: "Core Components Overview", duration: "16:22", type: "video" },
          { id: "2-2", title: "Styling in React Native", duration: "24:15", type: "video" },
          { id: "2-3", title: "Handling User Input", duration: "20:30", type: "video" },
          { id: "2-4", title: "Lists and ScrollView", duration: "18:45", type: "video" },
          { id: "2-5", title: "Core Components Quiz", duration: "10 questions", type: "quiz" },
        ],
      },
      {
        title: "Navigation and Routing",
        lessons: [
          { id: "3-1", title: "Introduction to React Navigation", duration: "14:18", type: "video" },
          { id: "3-2", title: "Stack Navigation", duration: "22:45", type: "video" },
          { id: "3-3", title: "Tab Navigation", duration: "20:30", type: "video" },
          { id: "3-4", title: "Drawer Navigation", duration: "18:15", type: "video" },
          { id: "3-5", title: "Navigation Parameters", duration: "16:40", type: "video" },
          { id: "3-6", title: "Navigation Project", duration: "1.5 hours", type: "assignment" },
        ],
      },
    ],
    reviews: generateReviews(8),
  })

  courses.push({
    id: "5",
    title: "Flutter & Dart - The Complete Guide",
    slug: "flutter-dart-complete-guide",
    description:
      "Learn Flutter and Dart from the ground up to build beautiful, fast, and native-quality apps for iOS and Android. This course covers UI design, state management, Firebase integration, and more.",
    shortDescription: "Build beautiful native apps with Flutter",
    thumbnail: "/placeholder.svg?height=400&width=600&text=Flutter",
    instructor: instructors[3],
    rating: 4.9,
    reviewCount: 1542,
    students: 12345,
    duration: "30 hours",
    lessons: 52,
    level: "All Levels",
    lastUpdated: "March 2025",
    price: 94.99,
    discountPrice: 54.99,
    tags: ["Mobile Development", "Flutter", "Dart", "iOS", "Android"],
    category: "Mobile Development",
    featured: false,
    popular: true,
    new: true,
    whatYouWillLearn: [
      "Build engaging native mobile apps for iOS and Android",
      "Learn Dart programming from scratch",
      "Understand Flutter widgets and how to create custom UIs",
      "Implement state management with Provider and Riverpod",
      "Connect to Firebase for authentication and data storage",
      "Publish your apps to the App Store and Google Play",
    ],
    requirements: [
      "No prior mobile development experience required",
      "No Dart or Flutter knowledge needed - we'll start from the basics",
      "Basic programming knowledge in any language is helpful but not required",
    ],
    curriculum: [
      {
        title: "Introduction to Flutter & Dart",
        lessons: [
          { id: "1-1", title: "What is Flutter?", duration: "8:15", type: "video", preview: true },
          { id: "1-2", title: "Setting Up the Development Environment", duration: "20:30", type: "video" },
          { id: "1-3", title: "Dart Basics", duration: "25:45", type: "video" },
          { id: "1-4", title: "Creating Your First Flutter App", duration: "18:10", type: "video" },
        ],
      },
      {
        title: "Flutter Fundamentals",
        lessons: [
          { id: "2-1", title: "Understanding Widgets", duration: "22:22", type: "video" },
          { id: "2-2", title: "Layouts and UI Design", duration: "28:15", type: "video" },
          { id: "2-3", title: "Handling User Input", duration: "20:30", type: "video" },
          { id: "2-4", title: "Navigation and Routing", duration: "24:45", type: "video" },
          { id: "2-5", title: "Flutter Fundamentals Quiz", duration: "15 questions", type: "quiz" },
        ],
      },
      {
        title: "State Management",
        lessons: [
          { id: "3-1", title: "Local State Management", duration: "18:18", type: "video" },
          { id: "3-2", title: "Provider Package", duration: "26:45", type: "video" },
          { id: "3-3", title: "Riverpod Introduction", duration: "24:30", type: "video" },
          { id: "3-4", title: "State Management Patterns", duration: "22:15", type: "video" },
          { id: "3-5", title: "State Management Project", duration: "2 hours", type: "assignment" },
        ],
      },
    ],
    reviews: generateReviews(9),
  })

  // Data Science Courses
  courses.push({
    id: "6",
    title: "Data Science and Machine Learning Bootcamp",
    slug: "data-science-machine-learning-bootcamp",
    description:
      "Master Data Science and Machine Learning with Python. This comprehensive course covers data analysis, visualization, machine learning algorithms, deep learning, and real-world projects.",
    shortDescription: "Master Data Science and ML with Python",
    thumbnail: "/placeholder.svg?height=400&width=600&text=Data+Science",
    instructor: instructors[2],
    rating: 4.8,
    reviewCount: 2156,
    students: 18742,
    duration: "42 hours",
    lessons: 65,
    level: "Intermediate",
    lastUpdated: "January 2025",
    price: 99.99,
    discountPrice: 59.99,
    tags: ["Data Science", "Machine Learning", "Python", "AI"],
    category: "Data Science",
    featured: true,
    popular: true,
    new: false,
    whatYouWillLearn: [
      "Master the Python programming language for data science",
      "Use NumPy, Pandas, Matplotlib, and Seaborn for data analysis and visualization",
      "Implement machine learning algorithms with Scikit-Learn",
      "Build neural networks with TensorFlow and Keras",
      "Work with real-world datasets and solve practical problems",
      "Deploy machine learning models to production",
    ],
    requirements: [
      "Basic Python knowledge is recommended but not required",
      "No prior data science or machine learning experience needed",
      "A computer with internet access (Windows, Mac, or Linux)",
    ],
    curriculum: [
      {
        title: "Python for Data Science",
        lessons: [
          { id: "1-1", title: "Python Basics Review", duration: "15:15", type: "video", preview: true },
          { id: "1-2", title: "NumPy Arrays", duration: "22:30", type: "video" },
          { id: "1-3", title: "Pandas Fundamentals", duration: "28:45", type: "video" },
          { id: "1-4", title: "Data Manipulation with Pandas", duration: "32:10", type: "video" },
          { id: "1-5", title: "Python for Data Science Quiz", duration: "15 questions", type: "quiz" },
        ],
      },
      {
        title: "Data Visualization",
        lessons: [
          { id: "2-1", title: "Matplotlib Basics", duration: "24:22", type: "video" },
          { id: "2-2", title: "Advanced Matplotlib", duration: "26:15", type: "video" },
          { id: "2-3", title: "Seaborn Library", duration: "28:30", type: "video" },
          { id: "2-4", title: "Interactive Visualizations", duration: "30:45", type: "video" },
          { id: "2-5", title: "Data Visualization Project", duration: "2 hours", type: "assignment" },
        ],
      },
      {
        title: "Machine Learning",
        lessons: [
          { id: "3-1", title: "Introduction to Machine Learning", duration: "18:18", type: "video" },
          { id: "3-2", title: "Supervised Learning Algorithms", duration: "34:45", type: "video" },
          { id: "3-3", title: "Unsupervised Learning", duration: "32:30", type: "video" },
          { id: "3-4", title: "Model Evaluation and Validation", duration: "28:15", type: "video" },
          { id: "3-5", title: "Feature Engineering", duration: "26:40", type: "video" },
          { id: "3-6", title: "Machine Learning Project", duration: "3 hours", type: "assignment" },
        ],
      },
      {
        title: "Deep Learning",
        lessons: [
          { id: "4-1", title: "Neural Networks Fundamentals", duration: "30:18", type: "video" },
          { id: "4-2", title: "TensorFlow and Keras", duration: "36:45", type: "video" },
          { id: "4-3", title: "Convolutional Neural Networks", duration: "38:30", type: "video" },
          { id: "4-4", title: "Recurrent Neural Networks", duration: "34:15", type: "video" },
          { id: "4-5", title: "Deep Learning Project", duration: "4 hours", type: "assignment" },
        ],
      },
    ],
    reviews: generateReviews(12),
  })

  courses.push({
    id: "7",
    title: "Python for Data Analysis and Visualization",
    slug: "python-data-analysis-visualization",
    description:
      "Learn how to use Python for data analysis, manipulation, and visualization. This course focuses on practical skills using NumPy, Pandas, Matplotlib, and Seaborn to extract insights from data.",
    shortDescription: "Master data analysis with Python libraries",
    thumbnail: "/placeholder.svg?height=400&width=600&text=Python+Data",
    instructor: instructors[2],
    rating: 4.7,
    reviewCount: 1245,
    students: 10568,
    duration: "28 hours",
    lessons: 48,
    level: "Beginner to Intermediate",
    lastUpdated: "February 2025",
    price: 84.99,
    discountPrice: 44.99,
    tags: ["Data Science", "Python", "Data Analysis", "Visualization"],
    category: "Data Science",
    featured: false,
    popular: true,
    new: false,
    whatYouWillLearn: [
      "Master Python libraries for data analysis: NumPy and Pandas",
      "Create stunning visualizations with Matplotlib and Seaborn",
      "Clean and preprocess real-world datasets",
      "Perform exploratory data analysis (EDA)",
      "Extract meaningful insights from complex data",
      "Build a portfolio of data analysis projects",
    ],
    requirements: [
      "Basic Python knowledge",
      "No prior data analysis experience required",
      "A computer with internet access",
    ],
    curriculum: [
      {
        title: "Introduction to Data Analysis",
        lessons: [
          { id: "1-1", title: "What is Data Analysis?", duration: "10:15", type: "video", preview: true },
          { id: "1-2", title: "Setting Up Your Environment", duration: "15:30", type: "video" },
          { id: "1-3", title: "Python Review for Data Analysis", duration: "22:45", type: "video" },
          { id: "1-4", title: "Introduction to Jupyter Notebooks", duration: "18:10", type: "video" },
        ],
      },
      {
        title: "NumPy Fundamentals",
        lessons: [
          { id: "2-1", title: "Introduction to NumPy", duration: "16:22", type: "video" },
          { id: "2-2", title: "NumPy Arrays and Vectorization", duration: "24:15", type: "video" },
          { id: "2-3", title: "Array Indexing and Selection", duration: "20:30", type: "video" },
          { id: "2-4", title: "NumPy Operations", duration: "22:45", type: "video" },
          { id: "2-5", title: "NumPy Quiz", duration: "10 questions", type: "quiz" },
        ],
      },
      {
        title: "Pandas for Data Analysis",
        lessons: [
          { id: "3-1", title: "Introduction to Pandas", duration: "18:18", type: "video" },
          { id: "3-2", title: "Series and DataFrames", duration: "26:45", type: "video" },
          { id: "3-3", title: "Data Cleaning and Preprocessing", duration: "32:30", type: "video" },
          { id: "3-4", title: "Data Aggregation and Grouping", duration: "28:15", type: "video" },
          { id: "3-5", title: "Working with Time Series Data", duration: "24:40", type: "video" },
          { id: "3-6", title: "Pandas Project", duration: "2 hours", type: "assignment" },
        ],
      },
    ],
    reviews: generateReviews(8),
  })

  // Design Courses
  courses.push({
    id: "8",
    title: "UI/UX Design Masterclass",
    slug: "ui-ux-design-masterclass",
    description:
      "Learn the complete UI/UX design process from research to final deliverables. This course covers user research, wireframing, prototyping, visual design, and usability testing with industry-standard tools.",
    shortDescription: "Master the complete UI/UX design process",
    thumbnail: "/placeholder.svg?height=400&width=600&text=UI/UX+Design",
    instructor: instructors[1],
    rating: 4.9,
    reviewCount: 1856,
    students: 15423,
    duration: "32 hours",
    lessons: 56,
    level: "All Levels",
    lastUpdated: "March 2025",
    price: 94.99,
    discountPrice: 54.99,
    tags: ["Design", "UI/UX", "Figma", "User Research"],
    category: "Design",
    featured: true,
    popular: true,
    new: false,
    whatYouWillLearn: [
      "Master the end-to-end UI/UX design process",
      "Conduct effective user research and create user personas",
      "Create wireframes, mockups, and interactive prototypes",
      "Design beautiful and functional user interfaces",
      "Perform usability testing and iterate on your designs",
      "Build a professional UI/UX design portfolio",
    ],
    requirements: [
      "No prior design experience required",
      "A computer with internet access",
      "Figma (free account) will be used for design work",
    ],
    curriculum: [
      {
        title: "Introduction to UI/UX Design",
        lessons: [
          { id: "1-1", title: "What is UI/UX Design?", duration: "12:15", type: "video", preview: true },
          { id: "1-2", title: "The Design Process Overview", duration: "18:30", type: "video" },
          { id: "1-3", title: "UI vs UX: Understanding the Difference", duration: "15:45", type: "video" },
          { id: "1-4", title: "Setting Up Figma", duration: "14:10", type: "video" },
        ],
      },
      {
        title: "User Research and Analysis",
        lessons: [
          { id: "2-1", title: "User Research Methods", duration: "22:22", type: "video" },
          { id: "2-2", title: "Creating User Personas", duration: "26:15", type: "video" },
          { id: "2-3", title: "User Journey Mapping", duration: "24:30", type: "video" },
          { id: "2-4", title: "Competitive Analysis", duration: "20:45", type: "video" },
          { id: "2-5", title: "User Research Project", duration: "2 hours", type: "assignment" },
        ],
      },
      {
        title: "Wireframing and Prototyping",
        lessons: [
          { id: "3-1", title: "Introduction to Wireframing", duration: "18:18", type: "video" },
          { id: "3-2", title: "Low-Fidelity Wireframes", duration: "24:45", type: "video" },
          { id: "3-3", title: "High-Fidelity Wireframes", duration: "28:30", type: "video" },
          { id: "3-4", title: "Interactive Prototyping with Figma", duration: "32:15", type: "video" },
          { id: "3-5", title: "Wireframing and Prototyping Quiz", duration: "15 questions", type: "quiz" },
        ],
      },
      {
        title: "Visual Design",
        lessons: [
          { id: "4-1", title: "Design Principles", duration: "20:18", type: "video" },
          { id: "4-2", title: "Color Theory for UI Design", duration: "26:45", type: "video" },
          { id: "4-3", title: "Typography in UI Design", duration: "22:30", type: "video" },
          { id: "4-4", title: "Creating a Design System", duration: "34:15", type: "video" },
          { id: "4-5", title: "Visual Design Project", duration: "3 hours", type: "assignment" },
        ],
      },
    ],
    reviews: generateReviews(10),
  })

  // Add more courses for other categories...

  // Business Courses
  courses.push({
    id: "9",
    title: "Digital Marketing Fundamentals",
    slug: "digital-marketing-fundamentals",
    description:
      "Master the essentials of digital marketing including SEO, social media, email marketing, content marketing, and paid advertising. Learn how to create effective marketing strategies and measure their success.",
    shortDescription: "Learn essential digital marketing skills",
    thumbnail: "/placeholder.svg?height=400&width=600&text=Digital+Marketing",
    instructor: {
      id: "6",
      name: "Jessica Thompson",
      title: "Digital Marketing Specialist",
      avatar: "/placeholder.svg?height=64&width=64",
      bio: "Jessica has over 8 years of experience in digital marketing and has worked with Fortune 500 companies.",
    },
    rating: 4.7,
    reviewCount: 1245,
    students: 14568,
    duration: "24 hours",
    lessons: 42,
    level: "Beginner",
    lastUpdated: "January 2025",
    price: 84.99,
    discountPrice: 44.99,
    tags: ["Marketing", "Digital Marketing", "SEO", "Social Media"],
    category: "Marketing",
    featured: false,
    popular: true,
    new: false,
    whatYouWillLearn: [
      "Understand the fundamentals of digital marketing",
      "Create effective SEO strategies to improve website visibility",
      "Develop social media marketing campaigns",
      "Implement email marketing strategies",
      "Create content marketing plans",
      "Set up and optimize paid advertising campaigns",
    ],
    requirements: [
      "No prior marketing experience required",
      "A computer with internet access",
      "Enthusiasm and willingness to learn",
    ],
    curriculum: [
      {
        title: "Introduction to Digital Marketing",
        lessons: [
          { id: "1-1", title: "What is Digital Marketing?", duration: "10:15", type: "video", preview: true },
          { id: "1-2", title: "The Digital Marketing Landscape", duration: "15:30", type: "video" },
          { id: "1-3", title: "Creating a Digital Marketing Strategy", duration: "22:45", type: "video" },
          { id: "1-4", title: "Introduction Quiz", duration: "10 questions", type: "quiz" },
        ],
      },
      {
        title: "Search Engine Optimization (SEO)",
        lessons: [
          { id: "2-1", title: "SEO Fundamentals", duration: "18:22", type: "video" },
          { id: "2-2", title: "On-Page SEO", duration: "24:15", type: "video" },
          { id: "2-3", title: "Off-Page SEO", duration: "20:30", type: "video" },
          { id: "2-4", title: "Technical SEO", duration: "22:45", type: "video" },
          { id: "2-5", title: "SEO Project", duration: "2 hours", type: "assignment" },
        ],
      },
      {
        title: "Social Media Marketing",
        lessons: [
          { id: "3-1", title: "Social Media Strategy", duration: "16:18", type: "video" },
          { id: "3-2", title: "Facebook Marketing", duration: "22:45", type: "video" },
          { id: "3-3", title: "Instagram Marketing", duration: "20:30", type: "video" },
          { id: "3-4", title: "Twitter Marketing", duration: "18:15", type: "video" },
          { id: "3-5", title: "LinkedIn Marketing", duration: "20:40", type: "video" },
          { id: "3-6", title: "Social Media Quiz", duration: "15 questions", type: "quiz" },
        ],
      },
    ],
    reviews: generateReviews(8),
  })

  // IT & Software Courses
  courses.push({
    id: "10",
    title: "CompTIA A+ Certification Prep",
    slug: "comptia-a-plus-certification-prep",
    description:
      "Prepare for the CompTIA A+ certification exam with this comprehensive course. Learn about hardware, operating systems, software troubleshooting, networking, and security fundamentals.",
    shortDescription: "Complete preparation for CompTIA A+ certification",
    thumbnail: "/placeholder.svg?height=400&width=600&text=CompTIA+A+",
    instructor: {
      id: "7",
      name: "Robert Wilson",
      title: "IT Specialist & Certified Trainer",
      avatar: "/placeholder.svg?height=64&width=64",
      bio: "Robert is a certified IT trainer with over 15 years of experience in the field.",
    },
    rating: 4.8,
    reviewCount: 2156,
    students: 18742,
    duration: "40 hours",
    lessons: 75,
    level: "Beginner to Intermediate",
    lastUpdated: "February 2025",
    price: 99.99,
    discountPrice: 59.99,
    tags: ["IT & Software", "CompTIA", "Certification", "Hardware", "Networking"],
    category: "IT & Software",
    featured: true,
    popular: true,
    new: false,
    whatYouWillLearn: [
      "Understand computer hardware components and their functions",
      "Install and configure operating systems",
      "Troubleshoot common hardware and software issues",
      "Set up and manage networks",
      "Implement security best practices",
      "Pass the CompTIA A+ certification exam",
    ],
    requirements: [
      "No prior IT experience required",
      "A computer with internet access",
      "Interest in information technology",
    ],
    curriculum: [
      {
        title: "Hardware Fundamentals",
        lessons: [
          { id: "1-1", title: "Introduction to Computer Hardware", duration: "15:15", type: "video", preview: true },
          { id: "1-2", title: "Motherboards and CPUs", duration: "22:30", type: "video" },
          { id: "1-3", title: "RAM and Storage Devices", duration: "20:45", type: "video" },
          { id: "1-4", title: "Input and Output Devices", duration: "18:10", type: "video" },
          { id: "1-5", title: "Hardware Quiz", duration: "15 questions", type: "quiz" },
        ],
      },
      {
        title: "Operating Systems",
        lessons: [
          { id: "2-1", title: "Windows Installation and Configuration", duration: "24:22", type: "video" },
          { id: "2-2", title: "macOS Basics", duration: "20:15", type: "video" },
          { id: "2-3", title: "Linux Fundamentals", duration: "22:30", type: "video" },
          { id: "2-4", title: "Operating System Troubleshooting", duration: "26:45", type: "video" },
          { id: "2-5", title: "OS Lab", duration: "2 hours", type: "assignment" },
        ],
      },
      {
        title: "Networking",
        lessons: [
          { id: "3-1", title: "Networking Concepts", duration: "18:18", type: "video" },
          { id: "3-2", title: "Network Hardware", duration: "22:45", type: "video" },
          { id: "3-3", title: "TCP/IP and Subnetting", duration: "28:30", type: "video" },
          { id: "3-4", title: "Wireless Networking", duration: "24:15", type: "video" },
          { id: "3-5", title: "Network Troubleshooting", duration: "26:40", type: "video" },
          { id: "3-6", title: "Networking Quiz", duration: "20 questions", type: "quiz" },
        ],
      },
    ],
    reviews: generateReviews(12),
  })

  return courses
}

export const courses = generateCourses()

// Current user data
export const currentUser: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/placeholder.svg?height=64&width=64&text=JD",
  role: "student",
  enrolledCourses: ["1", "2", "6"],
  completedCourses: ["3", "5", "7", "9", "10", "4", "8"],
  savedCourses: ["4", "8"],
  progress: [
    {
      courseId: "1",
      progress: 68,
      lastLesson: "HTML Forms and Input Elements",
      timeLeft: "2h 15m",
    },
    {
      courseId: "2",
      progress: 42,
      lastLesson: "useState Hook",
      timeLeft: "3h 30m",
    },
    {
      courseId: "6",
      progress: 23,
      lastLesson: "NumPy Arrays",
      timeLeft: "4h 45m",
    },
  ],
  certificates: ["3", "5", "7", "9", "10"],
}

// Upcoming events
export const upcomingEvents = [
  {
    id: "1",
    title: "Live Q&A Session",
    date: "Today, 3:00 PM",
    course: "Web Development",
    courseId: "1",
  },
  {
    id: "2",
    title: "Group Project Meeting",
    date: "Tomorrow, 10:00 AM",
    course: "React.js",
    courseId: "2",
  },
  {
    id: "3",
    title: "Workshop: Portfolio Building",
    date: "Fri, 2:00 PM",
    course: "Career Development",
    courseId: null,
  },
]

// Search function
export const searchCourses = (query: string) => {
  if (!query) return []

  const lowercaseQuery = query.toLowerCase()

  return courses.filter(
    (course) =>
      course.title.toLowerCase().includes(lowercaseQuery) ||
      course.description.toLowerCase().includes(lowercaseQuery) ||
      course.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      course.instructor.name.toLowerCase().includes(lowercaseQuery),
  )
}

// Filter courses by category
export const filterCoursesByCategory = (categorySlug: string) => {
  if (!categorySlug) return courses

  return courses.filter((course) => course.category.toLowerCase().replace(/\s+/g, "-") === categorySlug)
}

// Get course by slug
export const getCourseBySlug = (slug: string) => {
  return courses.find((course) => course.slug === slug)
}

// Get course by ID
export const getCourseById = (id: string) => {
  return courses.find((course) => course.id === id)
}

// Get featured courses
export const getFeaturedCourses = () => {
  return courses.filter((course) => course.featured)
}

// Get popular courses
export const getPopularCourses = () => {
  return courses.filter((course) => course.popular)
}

// Get new courses
export const getNewCourses = () => {
  return courses.filter((course) => course.new)
}

// Get user's enrolled courses
export const getUserEnrolledCourses = (userId: string) => {
  if (userId !== currentUser.id) return []

  return currentUser.enrolledCourses.map((courseId) => getCourseById(courseId)).filter(Boolean) as Course[]
}

// Get user's progress
export const getUserProgress = (userId: string) => {
  if (userId !== currentUser.id) return []

  return currentUser.progress
}

