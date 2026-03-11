import type { CSSProperties, ElementType, ReactNode } from 'react'
import useInView from '../hooks/useInView'

interface AnimateInProps {
  animation?: string
  className?: string
  as?: ElementType
  style?: CSSProperties
  delay?: number
  children?: ReactNode
  [key: string]: unknown
}

export default function AnimateIn({
  animation = 'anim-slide-up',
  className = '',
  as: Tag = 'div',
  style,
  delay,
  children,
  ...rest
}: AnimateInProps) {
  const [ref, isInView] = useInView()

  const combinedStyle = delay
    ? { ...style, transitionDelay: `${delay}ms` }
    : style

  return (
    <Tag
      ref={ref}
      className={`${animation} ${isInView ? 'anim-visible' : ''} ${className}`.trim()}
      style={combinedStyle}
      {...rest}
    >
      {children}
    </Tag>
  )
}
