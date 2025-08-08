import React from 'react'

export function Button({ variant='default', size='md', className='', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-2xl transition px-3 py-2 text-sm'
  const variants = {
    default: 'bg-primary text-white hover:opacity-90',
    outline: 'border hover:bg-muted',
    ghost: 'hover:bg-muted',
  }
  const sizes = { sm: 'text-xs px-2 py-1', md: '', lg: 'text-base px-4 py-2' }
  return <button className={[base, variants[variant], sizes[size], className].join(' ')} {...props} />
}
