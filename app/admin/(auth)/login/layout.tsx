export const metadata = {
  title: 'Login - CoreConnect Admin',
  description: 'Login to CoreConnect admin panel',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simple layout without authentication checks
  return <>{children}</>;
}

