import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import CourseCard from "@/components/course-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const courses = [
  { id: 1, title: "Introduction to Python", description: "Learn the basics of Python programming" },
  { id: 2, title: "Advanced JavaScript", description: "Master advanced JavaScript concepts" },
  { id: 3, title: "Rust for Beginners", description: "Get started with Rust programming" },
]

export default async function CoursesPage() {
  const session = await getServerSession(authOptions)

  const displayedCourses = session ? courses : [courses[0]]

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      {!session && (
        <div className="mt-8">
          <p className="mb-4">Sign in to access all courses</p>
          <Button asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

