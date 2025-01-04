'use client'

import { useEffect, useRef } from 'react'
import * as monaco from 'monaco-editor'

export default function CodeEditor({ language, value, onChange }) {
  const editorRef = useRef(null)

  useEffect(() => {
    if (editorRef.current) {
      const editor = monaco.editor.create(editorRef.current, {
        value,
        language,
        theme: 'vs-dark',
        minimap: { enabled: false },
      })

      editor.onDidChangeModelContent(() => {
        onChange(editor.getValue())
      })

      return () => editor.dispose()
    }
  }, [language, value, onChange])

  return <div ref={editorRef} style={{ height: '400px' }} />
}

