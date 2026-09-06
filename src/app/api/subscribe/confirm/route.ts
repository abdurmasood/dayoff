import { addToLoopsList } from '@/lib/loops'
import { handleConfirm } from '@/lib/subscribe'
import { verifySubscribeToken } from '@/lib/subscribe-token'

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token')
  const result = await handleConfirm(token, {
    subscribe: addToLoopsList,
    resolveEmail: verifySubscribeToken,
  })

  const destination = new URL('/void', request.url)
  destination.searchParams.set('joined', result.status === 200 ? '1' : '0')
  return Response.redirect(destination, 303)
}
