import { LoopsClient } from 'loops'

const CONFIRM_EMAIL_NAME = 'Day Off subscribe confirmation'

let cachedConfirmTransactionalId: string | null = null

function loopsClient() {
  const apiKey = process.env.LOOPS_API_KEY
  const listId = process.env.LOOPS_MAILING_LIST_ID

  if (!apiKey || !listId) {
    throw new Error('Loops is not configured')
  }

  return { loops: new LoopsClient(apiKey), listId }
}

export async function addToLoopsList(email: string) {
  const { loops, listId } = loopsClient()
  await loops.updateContact({
    email,
    mailingLists: { [listId]: true },
  })
}

export async function sendConfirmationEmail(email: string, confirmUrl: string) {
  const { loops } = loopsClient()
  const transactionalId = await getConfirmTransactionalId(loops)
  await loops.sendTransactionalEmail({
    transactionalId,
    email,
    addToAudience: false,
    dataVariables: { confirmUrl },
  })
}

async function getConfirmTransactionalId(loops: LoopsClient) {
  if (process.env.LOOPS_CONFIRM_TRANSACTIONAL_ID) {
    return process.env.LOOPS_CONFIRM_TRANSACTIONAL_ID
  }

  if (cachedConfirmTransactionalId) {
    return cachedConfirmTransactionalId
  }

  const listed = await loops.listTransactionalEmails({ perPage: 50 })
  const existing = listed.data.find(
    (item) => item.name === CONFIRM_EMAIL_NAME && item.publishedEmailMessageId,
  )
  if (existing) {
    cachedConfirmTransactionalId = existing.id
    return existing.id
  }

  const created = await loops.createTransactionalEmail({ name: CONFIRM_EMAIL_NAME })
  if (!created.draftEmailMessageId) {
    throw new Error('Loops confirmation email draft is missing')
  }

  await loops.updateEmailMessage(created.draftEmailMessageId, {
    expectedRevisionId: created.draftEmailMessageContentRevisionId ?? undefined,
    subject: 'Confirm your Day Off signup',
    previewText: 'Confirm to join the list',
    fromName: 'Day Off',
    fromEmail: 'hello',
    emailFormat: 'plain',
    lmx: '<Paragraph><Text>Confirm your Day Off mailing list signup:</Text></Paragraph><Button href="{data.confirmUrl}">Confirm subscription</Button>',
  })
  await loops.publishTransactionalEmail(created.id)
  cachedConfirmTransactionalId = created.id
  return created.id
}
