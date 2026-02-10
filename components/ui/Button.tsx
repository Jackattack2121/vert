import { cn } from '@/lib/utils'
import { Link } from '@/i18n/navigation'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  children,
  href,
  variant = 'primary',
  className,
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'group inline-flex items-center gap-3 px-8 py-4 font-semibold uppercase tracking-wider transition-all duration-300 text-sm'
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg',
    secondary: 'bg-secondary-800 text-white hover:bg-secondary-900 hover:shadow-lg',
    outline: 'bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white',
  }

  const classes = cn(baseStyles, variants[variant], className)

  const Arrow = () => (
    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        <Arrow />
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
      <Arrow />
    </button>
  )
}

