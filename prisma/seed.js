const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const items = [
    {
      title: 'git init',
      description: 'Initialize a new git repository in current folder',
      snippet: 'git init',
    },
    {
      title: 'git clone',
      description: 'Clone a repo from remote',
      snippet: 'git clone <repo-url>',
    },
    {
      title: 'git config user.name',
      description: 'Set global git username',
      snippet: 'git config --global user.name "Alice Johnson"',
    },
    {
      title: 'git config user.email',
      description: 'Set global git email',
      snippet: 'git config --global user.email "alice@example.com"',
    },
    {
      title: 'git add & commit',
      description: 'Stage and commit with a message',
      snippet: 'git add . && git commit -m "message"',
    },
    {
      title: 'git push',
      description: 'Push current branch to origin',
      snippet: 'git push origin HEAD',
    },
  ]

  for (const c of items) {
    await prisma.command.upsert({
      where: { title: c.title },
      create: c,
      update: c,
    })
  }
  console.log(' Seed complete')
}

main().finally(() => prisma.$disconnect())
