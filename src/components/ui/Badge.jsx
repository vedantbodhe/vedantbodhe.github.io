import React from 'react'
export function Badge({ className='', variant='secondary', children }) {
  const base = 'inline-flex items-center rounded-full border px-2 py-1'
  return <span className={[base, className].join(' ')}>{children}</span>
}
