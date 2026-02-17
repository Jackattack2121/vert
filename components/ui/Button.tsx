import { cn } from '@/lib/utils'
import { Link } from '@/i18n/navigation'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'white'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function Button({
  children,
  href,
  variant = 'primary',
  className,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const baseStyles = 'group inline-flex items-center gap-3 px-10 py-4 font-sans font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] text-sm rounded-md'

  const variants = {
    primary: 'bg-primary-500 text-cream-100 hover:bg-primary-600 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]',
    secondary: 'bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
    outline: 'bg-transparent border-2 border-current hover:bg-primary-500 hover:text-white hover:border-primary-500',
    gold: 'bg-accent-gold text-white hover:bg-accent-goldDark hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]',
    white: 'bg-white text-primary-500 hover:bg-cream-100 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]',
  }

  const classes = cn(baseStyles, variants[variant], className)

  const Arrow = () => (
    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
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
    <button type={type} onClick={onClick} disabled={disabled} className={cn(classes, disabled && 'opacity-50 cursor-not-allowed')}>
      {children}
      <Arrow />
    </button>
  )
}
