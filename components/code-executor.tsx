'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function CodeExecutor({ language }) {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')

  const executeCode = async () => {
    const response = await fetch('/api/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language }),
    })
    const result = await response.json()
    setOutput(result.output)
  }

  return (
    <div className="space-y-4">
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={`Enter your ${language} code here...`}
        rows={10}
      />
      <Button onClick={executeCode}>Run Code</Button>
      {output && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">Output:</h3>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  )
}

