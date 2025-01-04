'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

const ThemeContext = createContext({
  theme: 'light',
  setTheme: (theme: string) => {
    console.log(`setTheme called with: ${theme}`); // Log the parameter
  },
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
