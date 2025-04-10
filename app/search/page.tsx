"use client"

import { useState, useEffect } from "react"
import { Course } from "@/lib/data"
import { searchCourses } from "@/lib/data"
import { CourseCard } from "@/components/course-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Course[]>([])

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchCourses(query)
      setResults(searchResults)
    } else {
      setResults([])
    }
  }, [query])

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search Courses</h1>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for courses..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-xl"
          />
          <Button variant="default">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {query.trim() && (
        <div className="mb-4">
          <p className="text-muted-foreground">
            {results.length} {results.length === 1 ? "result" : "results"} found for "{query}"
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {query.trim() && results.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No courses found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
} 