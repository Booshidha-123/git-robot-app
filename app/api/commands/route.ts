import { NextResponse } from 'next/server'
import { commands } from '@/data/command'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.toLowerCase() || ''

  const results = commands.filter(
    c =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
  )

  return NextResponse.json(results)
}
