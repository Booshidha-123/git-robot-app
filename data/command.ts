export type Command = {
  id: string
  title: string
  description: string
  example: string
}

export const commands: Command[] = [
  {
    id: 'init',
    title: 'git init',
    description: 'Initialize a new git repository',
    example: 'git init'
  },
  {
    id: 'clone',
    title: 'git clone',
    description: 'Clone an existing repository',
    example: 'git clone https://github.com/user/repo.git'
  },
  {
    id: 'commit',
    title: 'git commit',
    description: 'Record changes to repository',
    example: 'git commit -m "message"'
  },
  {
    id: 'push',
    title: 'git push',
    description: 'Push commits to remote',
    example: 'git push origin main'
  },
]
