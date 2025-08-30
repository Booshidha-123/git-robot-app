import Link from 'next/link'
import { commands } from '@/data/command'
import CommandSearch from '@/components/commandsearch'

export default function CommandsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Git Commands</h1>
      
      {/* Search box */}
      <CommandSearch />

      <h2 className="text-xl font-semibold mt-6 mb-2">All Commands</h2>
      <ul className="space-y-2">
        {commands.map(cmd => (
          <li key={cmd.id} className="p-3 border rounded hover:bg-gray-50 dark:hover:bg-gray-800">
            <Link href={`/commands/${cmd.id}`} className="font-mono text-blue-600">
              {cmd.title}
            </Link>
            <p className="text-sm text-gray-600">{cmd.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
