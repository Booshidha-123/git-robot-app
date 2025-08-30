import { commands } from '@/data/command'
import { notFound } from 'next/navigation'

export default function CommandDetail({ params }: { params: { id: string } }) {
  const cmd = commands.find(c => c.id === params.id)
  if (!cmd) return notFound()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{cmd.title}</h1>
      <p className="mb-4">{cmd.description}</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
        {cmd.example}
      </pre>
    </div>
  )
}
