import Image from "next/image"
import Link from "next/link"
import { Briefcase, GraduationCap, Users, Award, BookOpen, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Former education technology executive with a passion for making quality education accessible to everyone.",
      avatar: "/placeholder.svg?height=200&width=200&text=AJ",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Sarah Williams",
      role: "Chief Learning Officer",
      bio: "PhD in Educational Psychology with 10+ years experience designing effective learning experiences.",
      avatar: "/placeholder.svg?height=200&width=200&text=SW",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Tech leader with expertise in building scalable platforms. Previously led engineering at several EdTech startups.",
      avatar: "/placeholder.svg?height=200&width=200&text=MC",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Jessica Rodriguez",
      role: "Head of Content",
      bio: "Former university professor with a passion for creating engaging and effective educational content.",
      avatar: "/placeholder.svg?height=200&width=200&text=JR",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
      },
    },
  ]

  const stats = [
    { label: "Students", value: "50K+", icon: Users },
    { label: "Courses", value: "200+", icon: BookOpen },
    { label: "Instructors", value: "100+", icon: GraduationCap },
    { label: "Countries", value: "150+", icon: Briefcase },
  ]

  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Transforming Education for the Digital Age
            </h1>
            <p className="text-lg text-muted-foreground">
              EduLearn is on a mission to provide high-quality education to everyone, everywhere. We believe that access
              to knowledge should be a right, not a privilege.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href="/courses">Explore Courses</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Education+For+All"
                alt="Education for all"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            How we went from a small idea to a global education platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">The Beginning</h3>
              <p className="text-muted-foreground">
                EduLearn started in 2020 with a simple idea: make quality education accessible to everyone. Our founder,
                Alex Johnson, experienced firsthand the transformative power of education and wanted to create a
                platform that could bring that opportunity to people around the world.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Our Growth</h3>
              <p className="text-muted-foreground">
                What began as a small collection of courses has grown into a comprehensive learning platform with
                thousands of courses across dozens of subjects. We've partnered with leading experts, universities, and
                companies to bring the best educational content to our students.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Looking Forward</h3>
              <p className="text-muted-foreground">
                Today, EduLearn serves students in over 150 countries, but our mission remains the same: to make quality
                education accessible to everyone. We continue to innovate and expand our offerings to meet the evolving
                needs of learners in the digital age.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=400&text=2020"
                alt="EduLearn in 2020"
                fill
                className="object-cover"
              />
            </div>
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=400&text=2021"
                alt="EduLearn in 2021"
                fill
                className="object-cover"
              />
            </div>
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=400&text=2022"
                alt="EduLearn in 2022"
                fill
                className="object-cover"
              />
            </div>
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=400&text=2023"
                alt="EduLearn in 2023"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-20">
        <div className="bg-primary/5 rounded-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">EduLearn by the Numbers</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our global impact continues to grow every day
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">The principles that guide everything we do</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-md">
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Accessibility</h3>
              <p className="text-muted-foreground">
                We believe education should be accessible to everyone, regardless of location, background, or financial
                situation. We work to remove barriers to learning.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-muted-foreground">
                We are committed to providing the highest quality educational content. Our courses are designed by
                experts and continuously improved based on feedback.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-muted-foreground">
                Learning is a social experience. We foster a supportive community where students can connect,
                collaborate, and learn from each other.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">The passionate people behind EduLearn</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, i) => (
            <div key={i} className="text-center">
              <Avatar className="h-32 w-32 mx-auto mb-4">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-primary mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
              <div className="flex justify-center space-x-3">
                <a href={member.social.twitter} className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href={member.social.linkedin} className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
                <a href={member.social.github} className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8 text-primary-foreground/90">
            Join thousands of students around the world and start your learning journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/courses">Explore Courses</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/auth/register">Sign Up Free</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

