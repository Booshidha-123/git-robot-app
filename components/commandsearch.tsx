'use client'
import { useState } from 'react'

export default function CommandSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])

  const search = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`/api/commands?q=${query}`)
    const data = await res.json()
    setResults(data)
  }

  return (
    <div className="p-4 border rounded">
      <form onSubmit={search} className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search git command..."
          className="border p-2 flex-1"
        />
        <button type="submit" className="px-3 py-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>

      <ul className="space-y-2">
        {results.map(r => (
          <li key={r.id} className="p-2 border rounded">
            <div className="font-mono font-bold">{r.title}</div>
            <div className="text-sm text-gray-600">{r.description}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
