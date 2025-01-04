'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export default function Header() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-background text-foreground shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          EduCode
        </Link>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          {session ? (
            <>
              <span>Welcome, {session.user.name}</span>
              <Button onClick={() => signOut()}>Sign Out</Button>
            </>
          ) : (
            <Button asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}

