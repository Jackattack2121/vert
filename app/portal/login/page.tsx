import { Metadata } from 'next';
import PortalLoginForm from '@/components/portal/PortalLoginForm';

export const metadata: Metadata = {
  title: 'Portal Login | Vert Capital',
  description: 'Access your secure client portal',
};

export default function PortalLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-secondary-900 to-primary-800 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Client Portal
          </h1>
          <p className="text-gray-300">
            Enter your email to receive a secure login link
          </p>
        </div>

        <PortalLoginForm />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Need help?{' '}
            <a
              href="/contact"
              className="text-accent-yellow hover:text-accent-gold transition-colors"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
