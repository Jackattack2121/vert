import { cn } from '@/lib/utils'

interface TextBoxedProps {
  words: string[]
  className?: string
  variant?: 'bordered' | 'separated' | 'outline'
}

export default function TextBoxed({ words, className, variant = 'bordered' }: TextBoxedProps) {
  if (variant === 'bordered') {
    return (
      <div className={cn('inline-flex gap-0 font-black uppercase', className)}>
        {words.map((word, index) => (
          <span
            key={index}
            className={cn(
              'border-4 border-current px-4 md:px-6 py-2 md:py-3 text-2xl md:text-4xl lg:text-5xl',
              index > 0 && 'border-l-0'
            )}
          >
            {word}
          </span>
        ))}
      </div>
    )
  }

  if (variant === 'separated') {
    return (
      <h2 className={cn('font-black text-4xl md:text-6xl lg:text-7xl', className)}>
        {words.map((word, index) => (
          <span
            key={index}
            className={cn(
              'inline-block',
              index < words.length - 1 && 'border-r-4 border-current pr-4 md:pr-6 mr-4 md:mr-6'
            )}
          >
            {word}
          </span>
        ))}
      </h2>
    )
  }

  if (variant === 'outline') {
    return (
      <h2
        className={cn('font-black text-6xl md:text-8xl lg:text-9xl text-outline', className)}
        style={{
          WebkitTextStroke: '2px currentColor',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {words.join(' ')}
      </h2>
    )
  }

  return null
}

