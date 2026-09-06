'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

type SequencePhase = 'form' | 'loading' | 'pending' | 'granted'

export function VoidEnterControl() {
  const joined = useSearchParams().get('joined')
  const [phase, setPhase] = useState<SequencePhase>(
    joined === '1' ? 'granted' : 'form',
  )
  const [email, setEmail] = useState('')
  const [error, setError] = useState(joined === '0' ? 'Confirmation failed' : '')
  const submittingRef = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Enter' || event.repeat) return
      if (event.target instanceof HTMLAnchorElement) return
      if (phase !== 'form') return
      event.preventDefault()
      formRef.current?.requestSubmit()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [phase])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submittingRef.current || phase !== 'form') return

    const value = email.trim()
    if (!value) {
      setError('Email required')
      return
    }

    submittingRef.current = true
    setError('')
    setPhase('loading')

    try {
      const website =
        formRef.current?.querySelector<HTMLInputElement>('input[name="website"]')
          ?.value ?? ''

      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, website }),
      })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string
        } | null
        throw new Error(payload?.error ?? 'Subscription failed')
      }

      setPhase('pending')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Subscription failed')
      setPhase('form')
    } finally {
      submittingRef.current = false
    }
  }

  return (
    <form
      ref={formRef}
      className="action-block action-block-static interactive"
      noValidate
      onSubmit={onSubmit}
    >
      <input
        className="action-honeypot"
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {phase === 'form' ? (
        <>
          <div className="action-title">
            Hear
            <br />
            From Us
          </div>
          <input
            id="void-email"
            className="action-input"
            type="email"
            name="email"
            value={email}
            autoComplete="email"
            autoFocus
            spellCheck={false}
            placeholder="you@email.com"
            aria-label="Email"
            onChange={(event) => {
              setEmail(event.target.value)
              if (error) setError('')
            }}
          />
          <button className="action-honeypot" type="submit" tabIndex={-1}>
            Enter
          </button>
          <div className="action-sub">
            {error || 'Never miss a drop [ENTER]'}
          </div>
        </>
      ) : null}

      {phase === 'loading' ? (
        <div className="action-title action-title-compact">LOADING...</div>
      ) : null}

      {phase === 'pending' ? (
        <>
          <div className="action-title action-title-compact">CHECK YOUR INBOX</div>
          <div className="action-sub">Confirm to join the list</div>
        </>
      ) : null}

      {phase === 'granted' ? (
        <>
          <div className="action-title action-title-compact">ACCESS GRANTED</div>
          <div className="action-sub">You&apos;re on the list</div>
        </>
      ) : null}
    </form>
  )
}
