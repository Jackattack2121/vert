'use client'

import { useEffect } from 'react'
import { useRouter } from '@/i18n/navigation'

export default function PortalPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home - the modal should be opened via the header button
    router.push('/')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-100">
      <div className="text-center">
        <p className="font-sans text-secondary-500">Redirecting to home page...</p>
        <p className="font-sans text-sm text-secondary-400 mt-2">
          Please use the Login button in the header to access the Client Portal.
        </p>
      </div>
    </div>
  )
}
