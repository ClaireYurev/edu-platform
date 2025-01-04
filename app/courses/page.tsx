import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import CourseCard from "@/components/course-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const courses = [
  { id: 1, title: "Introduction to Python", description: "Learn the basics of Python programming" },
  { id: 2, title: "Advanced JavaScript", description: "Master advanced JavaScript concepts" },
  { id: 3, title: "Rust for Beginners", description: "Get started with Rust programming" },
]

export default async function CoursesPage() {
  // 1. Grab session server-side
  const session = await getServerSession(authOptions)

  // 2. If NO session, show the public preview (the first course) + Sign In button
  if (!session) {
    return (
      <div>
        <h1 className="text-4xl font-bold mb-8">Available Courses (Preview)</h1>
        <CourseCard course={courses[0]} />
        
        <div className="mt-8">
          <p className="mb-4">Sign in to access all courses</p>
          <Button asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    )
  }

  // 3. If user is signed in, but not subscribed (assuming you have an `isSubscribed` field):
  if (!session.user?.isSubscribed) {
    // Show partial content (just the first course) and prompt to subscribe
    return (
      <div>
        <h1 className="text-4xl font-bold mb-8">Course Preview</h1>
        <CourseCard course={courses[0]} />

        <div className="mt-8">
          <p className="mb-4">Subscribe to access all courses</p>
          <Button asChild>
            <Link href="/subscribe">Subscribe</Link>
          </Button>
        </div>
      </div>
    )
  }

  // 4. Otherwise, user is signed in and subscribed. Show all courses.
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
