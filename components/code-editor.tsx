'use client'

import { useEffect, useRef } from 'react'
import * as monaco from 'monaco-editor'

interface CodeEditorProps {
  language: string // The programming language for the editor
  value: string // The initial value of the editor
  onChange: (value: string) => void // Callback function for content changes
}

export default function CodeEditor({ language, value, onChange }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (editorRef.current) {
      const editor = monaco.editor.create(editorRef.current, {
        value,
        language,
        theme: 'vs-dark',
        minimap: { enabled: false },
      })

      // Listen for content changes
      editor.onDidChangeModelContent(() => {
        onChange(editor.getValue())
      })

      // Clean up the editor instance on unmount
      return () => editor.dispose()
    }
  }, [language, value, onChange])

  return <div ref={editorRef} style={{ height: '400px' }} />
}
