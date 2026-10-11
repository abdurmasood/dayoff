import { confirm } from '../subscribe'

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token')
  const result = await confirm(token)

  const destination = new URL('/void', request.url)
  destination.searchParams.set('joined', result.status === 200 ? '1' : '0')
  return Response.redirect(destination, 303)
}
