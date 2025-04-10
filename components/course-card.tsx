import Link from "next/link"
import Image from "next/image"
import { Course } from "@/lib/data"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/courses/${course.slug}`}>
        <div className="aspect-video relative">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant={course.new ? "default" : "secondary"}>
              {course.level}
            </Badge>
            {course.discountPrice && (
              <Badge variant="destructive">
                Save {Math.round(((course.price - course.discountPrice) / course.price) * 100)}%
              </Badge>
            )}
          </div>
          <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.shortDescription}
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-medium">{course.rating.toFixed(1)}</span>
            </div>
            <span>•</span>
            <span>{course.students.toLocaleString()} students</span>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={course.instructor.avatar}
              alt={course.instructor.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-sm text-muted-foreground">
              {course.instructor.name}
            </span>
          </div>
          <div className="text-right">
            {course.discountPrice ? (
              <>
                <p className="font-semibold">${course.discountPrice}</p>
                <p className="text-sm text-muted-foreground line-through">
                  ${course.price}
                </p>
              </>
            ) : (
              <p className="font-semibold">${course.price}</p>
            )}
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
} 