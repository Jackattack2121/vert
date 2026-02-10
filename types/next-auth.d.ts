import 'next-auth';

declare module 'next-auth' {
  interface User {
    role?: 'admin' | 'shareholder' | 'institutional';
    userId?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role?: 'admin' | 'shareholder' | 'institutional';
      userId?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'admin' | 'shareholder' | 'institutional';
    id?: string;
    userId?: string;
  }
}

