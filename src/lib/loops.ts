import { LoopsClient } from 'loops'

export async function addToLoopsList(email: string) {
  const apiKey = process.env.LOOPS_API_KEY
  const listId = process.env.LOOPS_MAILING_LIST_ID

  if (!apiKey || !listId) {
    throw new Error('Loops is not configured')
  }

  const loops = new LoopsClient(apiKey)
  await loops.updateContact({
    email,
    mailingLists: { [listId]: true },
  })
}
