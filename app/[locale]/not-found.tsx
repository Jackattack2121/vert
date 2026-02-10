import { Link } from '@/i18n/navigation'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary-900 to-primary-700">
      <div className="container text-center text-white px-4">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-6">
          Page Not Found
        </h2>
        <p className="text-xl mb-8 font-josefin italic">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="btn-primary">
              Go to Homepage
            </button>
          </Link>
          <Link href="/contact">
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-primary-900">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

