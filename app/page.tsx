import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Welcome to EduCode</h1>
      <p className="text-xl mb-8">Learn coding with interactive courses</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/courses">Browse Courses</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/auth/signin">Sign In</Link>
        </Button>
      </div>
    </div>
  )
}

