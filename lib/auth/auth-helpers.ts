import { Session } from 'next-auth';

/**
 * Generate Listmonk Basic Auth header
 */
export function getListmonkAuthHeader(): string {
  const username = process.env.LISTMONK_USERNAME || 'listmonk_api';
  const password = process.env.LISTMONK_PASSWORD;
  
  if (!password) {
    throw new Error('SECURITY: LISTMONK_PASSWORD not configured in environment variables');
  }
  
  return 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
}

/**
 * Validate admin session
 */
export function isAdminSession(session: Session | null): boolean {
  return !!(session?.user?.role === 'admin');
}

/**
 * Require admin session with type guard
 * Throws error if session is not valid or user is not admin
 */
export function requireAdminSession(session: Session | null): asserts session is Session {
  if (!session?.user?.role || session.user.role !== 'admin') {
    throw new Error('Unauthorized: Admin access required');
  }
}

/**
 * Hash password for admin user creation
 */
export async function hashPassword(password: string): Promise<string> {
  const bcrypt = await import('bcryptjs');
  return bcrypt.hash(password, 10);
}

