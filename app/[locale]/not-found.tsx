import { Link } from '@/i18n/navigation'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-500">
      <div className="container text-center text-cream-100 px-4">
        <h1 className="font-serif font-light text-[10rem] leading-none mb-4 text-accent-gold">404</h1>
        <h2 className="font-serif font-light text-3xl md:text-4xl mb-6">
          Page Not Found
        </h2>
        <p className="font-sans text-lg opacity-80 max-w-lg mx-auto mb-10 leading-relaxed">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Go to Homepage
          </Link>
          <Link href="/contact" className="btn-secondary border-cream-100/40 text-cream-100 hover:bg-cream-100 hover:text-primary-500">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
