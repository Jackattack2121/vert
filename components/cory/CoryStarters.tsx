'use client'

interface CoryStartersProps {
  starters: string[]
  onSelect: (starter: string) => void
}

export default function CoryStarters({ starters, onSelect }: CoryStartersProps) {
  return (
    <div className="flex flex-col gap-2 px-4 py-3">
      <p className="text-[11px] text-secondary-400 font-sans font-medium uppercase tracking-[0.1em] mb-1">
        Suggested questions
      </p>
      {starters.map((starter) => (
        <button
          key={starter}
          onClick={() => onSelect(starter)}
          className="text-left px-4 py-2.5 text-sm font-sans text-primary-500
                     border border-primary-500/20 rounded-full
                     hover:bg-primary-500/5 hover:border-accent-gold
                     transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-1"
        >
          {starter}
        </button>
      ))}
    </div>
  )
}
