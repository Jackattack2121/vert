'use client'

import { useEffect, useState } from 'react'

interface CoryButtonProps {
  isOpen: boolean
  onClick: () => void
}

export default function CoryButton({ isOpen, onClick }: CoryButtonProps) {
  const [mounted, setMounted] = useState(false)
  const [showPulse, setShowPulse] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 500)
    const hasOpened = sessionStorage.getItem('cory_has_opened')
    if (!hasOpened) setShowPulse(true)
    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    if (showPulse) {
      sessionStorage.setItem('cory_has_opened', 'true')
      setShowPulse(false)
    }
    onClick()
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9998] group">
      {/* Tooltip */}
      <div
        className={`absolute bottom-full right-0 mb-3 px-3 py-1.5
                     bg-primary-800 text-cream-100 text-xs font-sans rounded-lg
                     whitespace-nowrap opacity-0 group-hover:opacity-100
                     transition-opacity duration-200 pointer-events-none
                     ${isOpen ? 'hidden' : ''}`}
      >
        Chat with Cory
        <div className="absolute top-full right-5 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-primary-800" />
      </div>

      {/* Pulse ring */}
      {showPulse && !isOpen && (
        <div className="absolute inset-0 rounded-full animate-ping bg-accent-gold/30" />
      )}

      {/* Button */}
      <button
        onClick={handleClick}
        aria-label="Open chat with Cory"
        className={`relative w-[60px] h-[60px] rounded-full bg-primary-500
                     hover:bg-primary-600 text-cream-100 flex items-center justify-center
                     shadow-elegant-lg hover:shadow-card-hover
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2
                     ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
        style={{
          transitionProperty: 'opacity, transform, background-color, box-shadow',
          transitionDuration: '500ms, 500ms, 300ms, 300ms',
        }}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  )
}
