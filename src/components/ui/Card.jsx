import React from 'react'

export function Card({ className='', children }) {
  return <div className={['rounded-2xl border', className].join(' ')}>{children}</div>
}
export function CardHeader({ className='', children }) {
  return <div className={['p-4 border-b', className].join(' ')}>{children}</div>
}
export function CardTitle({ className='', children }) {
  return <h3 className={['font-semibold', className].join(' ')}>{children}</h3>
}
export function CardContent({ className='', children }) {
  return <div className={['p-4', className].join(' ')}>{children}</div>
}
