import type { ReactNode } from 'react'

interface WindowMockupProps {
  title: string
  children: ReactNode
}

export default function WindowMockup({ title, children }: WindowMockupProps) {
  return (
    <div className="window-mockup">
      <div className="window-header">
        <span className="window-dot"></span>
        <span className="window-dot"></span>
        <span className="window-dot"></span>
        <span className="window-title">{title}</span>
      </div>
      <div className="window-body" style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  )
}
