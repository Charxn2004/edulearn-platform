"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Search, Filter, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { courses, categories, searchCourses } from "@/lib/data"

export default function CoursesPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const queryParam = searchParams.get("q")

  const [searchQuery, setSearchQuery] = useState(queryParam || "")
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "")
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [filteredCourses, setFilteredCourses] = useState(courses)
  const [isLoading, setIsLoading] = useState(false)

  const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"]

  // Apply filters
  useEffect(() => {
    setIsLoading(true)

    // Simulate API call delay
    const timer = setTimeout(() => {
      let filtered = [...courses]

      // Apply search query
      if (searchQuery) {
        filtered = searchCourses(searchQuery)
      }

      // Apply category filter
      if (selectedCategory) {
        filtered = filtered.filter((course) => course.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory)
      }

      // Apply level filter
      if (selectedLevels.length > 0) {
        filtered = filtered.filter((course) => selectedLevels.some((level) => course.level.includes(level)))
      }

      // Apply price filter
      filtered = filtered.filter((course) => {
        const price = course.discountPrice || course.price
        return price >= priceRange[0] && price <= priceRange[1]
      })

      setFilteredCourses(filtered)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery, selectedCategory, selectedLevels, priceRange])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the useEffect
  }

  const handleLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      setSelectedLevels([...selectedLevels, level])
    } else {
      setSelectedLevels(selectedLevels.filter((l) => l !== level))
    }
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category)
  }

  const clearFilters = () => {
    setSelectedCategory("")
    setSelectedLevels([])
    setPriceRange([0, 100])
    setSearchQuery("")
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-8">
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Courses</h1>
          <p className="text-muted-foreground">Browse our collection of courses taught by industry experts</p>
        </div>
        <div className="w-full md:w-1/3">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-1/4 space-y-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategory === category.slug}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleCategoryChange(category.slug)
                      } else {
                        handleCategoryChange("")
                      }
                    }}
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name} ({category.count})
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Level</h3>
            <div className="space-y-2">
              {levels.map((level) => (
                <div key={level} className="flex items-center">
                  <Checkbox
                    id={`level-${level}`}
                    checked={selectedLevels.includes(level)}
                    onCheckedChange={(checked) => handleLevelChange(level, !!checked)}
                  />
                  <label
                    htmlFor={`level-${level}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="px-2">
              <Slider
                defaultValue={[0, 100]}
                max={100}
                step={1}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="my-6"
              />
              <div className="flex justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          <Button variant="outline" onClick={clearFilters} className="w-full">
            Clear Filters
          </Button>
        </div>

        {/* Filters - Mobile */}
        <div className="lg:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Narrow down courses based on your preferences</SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="categories">
                    <AccordionTrigger>Categories</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center">
                            <Checkbox
                              id={`mobile-category-${category.id}`}
                              checked={selectedCategory === category.slug}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  handleCategoryChange(category.slug)
                                } else {
                                  handleCategoryChange("")
                                }
                              }}
                            />
                            <label
                              htmlFor={`mobile-category-${category.id}`}
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {category.name} ({category.count})
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="level">
                    <AccordionTrigger>Level</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {levels.map((level) => (
                          <div key={level} className="flex items-center">
                            <Checkbox
                              id={`mobile-level-${level}`}
                              checked={selectedLevels.includes(level)}
                              onCheckedChange={(checked) => handleLevelChange(level, !!checked)}
                            />
                            <label
                              htmlFor={`mobile-level-${level}`}
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {level}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="px-2">
                        <Slider
                          defaultValue={[0, 100]}
                          max={100}
                          step={1}
                          value={priceRange}
                          onValueChange={(value) => setPriceRange(value as [number, number])}
                          className="my-6"
                        />
                        <div className="flex justify-between">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <SheetFooter>
                <Button variant="outline" onClick={clearFilters} className="w-full">
                  Clear Filters
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Course Listings */}
        <div className="w-full lg:w-3/4">
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
              </TabsList>
              <div className="text-sm text-muted-foreground">Showing {filteredCourses.length} results</div>
            </div>

            <TabsContent value="all" className="space-y-0">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="aspect-video w-full bg-muted animate-pulse" />
                      <CardHeader>
                        <div className="h-6 bg-muted animate-pulse rounded w-3/4 mb-2" />
                        <div className="h-4 bg-muted animate-pulse rounded w-full" />
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                          <div>
                            <div className="h-4 bg-muted animate-pulse rounded w-24" />
                            <div className="h-3 bg-muted animate-pulse rounded w-20 mt-1" />
                          </div>
                        </div>
                        <div className="h-4 bg-muted animate-pulse rounded w-full mt-4" />
                      </CardContent>
                      <CardFooter>
                        <div className="h-10 bg-muted animate-pulse rounded w-full" />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={course.thumbnail || "/placeholder.svg"}
                          alt={`${course.title} thumbnail`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                          {course.new && <Badge>New</Badge>}
                        </div>
                        <CardDescription className="line-clamp-2">{course.shortDescription}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                            <AvatarFallback>
                              {course.instructor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{course.instructor.name}</p>
                            <p className="text-xs text-muted-foreground">{course.instructor.title}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
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
                            <span className="text-xs text-muted-foreground ml-1">({course.reviewCount})</span>
                          </div>
                          <div className="text-sm">
                            {course.discountPrice ? (
                              <div>
                                <span className="font-bold">${course.discountPrice}</span>
                                <span className="text-muted-foreground line-through ml-2">${course.price}</span>
                              </div>
                            ) : (
                              <span className="font-bold">${course.price}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-2">
                          <span>{course.lessons} lessons</span>
                          <span>•</span>
                          <span>{course.duration}</span>
                          <span>•</span>
                          <span>{course.level}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link href={`/courses/${course.slug}`}>
                            View Course <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No courses found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="popular" className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses
                  .filter((course) => course.popular)
                  .map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={course.thumbnail || "/placeholder.svg"}
                          alt={`${course.title} thumbnail`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{course.shortDescription}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                            <AvatarFallback>
                              {course.instructor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{course.instructor.name}</p>
                            <p className="text-xs text-muted-foreground">{course.instructor.title}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
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
                            <span className="text-xs text-muted-foreground ml-1">({course.reviewCount})</span>
                          </div>
                          <div className="text-sm">
                            {course.discountPrice ? (
                              <div>
                                <span className="font-bold">${course.discountPrice}</span>
                                <span className="text-muted-foreground line-through ml-2">${course.price}</span>
                              </div>
                            ) : (
                              <span className="font-bold">${course.price}</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link href={`/courses/${course.slug}`}>
                            View Course <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="new" className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses
                  .filter((course) => course.new)
                  .map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={course.thumbnail || "/placeholder.svg"}
                          alt={`${course.title} thumbnail`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                          <Badge>New</Badge>
                        </div>
                        <CardDescription className="line-clamp-2">{course.shortDescription}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                            <AvatarFallback>
                              {course.instructor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{course.instructor.name}</p>
                            <p className="text-xs text-muted-foreground">{course.instructor.title}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
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
                            <span className="text-xs text-muted-foreground ml-1">({course.reviewCount})</span>
                          </div>
                          <div className="text-sm">
                            {course.discountPrice ? (
                              <div>
                                <span className="font-bold">${course.discountPrice}</span>
                                <span className="text-muted-foreground line-through ml-2">${course.price}</span>
                              </div>
                            ) : (
                              <span className="font-bold">${course.price}</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link href={`/courses/${course.slug}`}>
                            View Course <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

