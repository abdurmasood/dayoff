'use client'

import { useSyncExternalStore } from 'react'

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}

function formatArchiveDate(date: Date) {
  return date
    .toLocaleDateString('en-GB', DATE_OPTIONS)
    .toUpperCase()
    .replace(/ /g, '-')
}

function subscribe() {
  return () => {}
}

function getArchiveDate() {
  return formatArchiveDate(new Date())
}

function getServerArchiveDate() {
  return '--'
}

export function VoidArchiveDate() {
  const archiveDate = useSyncExternalStore(
    subscribe,
    getArchiveDate,
    getServerArchiveDate,
  )

  return <span>{archiveDate}</span>
}
