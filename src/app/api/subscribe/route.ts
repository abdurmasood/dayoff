import { addToLoopsList } from '@/lib/loops'
import { handleSubscribe } from '@/lib/subscribe'

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Email required' }, { status: 400 })
  }

  const result = await handleSubscribe(body, { subscribe: addToLoopsList })
  return Response.json(result.body, { status: result.status })
}
