/**
 * Portal Authentication Helpers
 * 
 * Utilities for checking portal access and user roles
 */

import { getServerSession } from 'next-auth';
import { authOptions } from './auth-config';

export type PortalRole = 'shareholder' | 'institutional' | 'admin';

/**
 * Check if user has access to a specific portal
 */
export function hasPortalAccess(userRole: string | undefined, requiredRole: PortalRole): boolean {
  if (!userRole) return false;
  
  // Admin has access to everything
  if (userRole === 'admin') return true;
  
  // Check specific role match
  return userRole === requiredRole;
}

/**
 * Check if user can access shareholder portal
 */
export function canAccessShareholderPortal(userRole: string | undefined): boolean {
  return hasPortalAccess(userRole, 'shareholder');
}

/**
 * Check if user can access institutional portal
 */
export function canAccessInstitutionalPortal(userRole: string | undefined): boolean {
  return hasPortalAccess(userRole, 'institutional');
}

/**
 * Get portal redirect URL based on user role
 */
export function getPortalRedirectUrl(role: string): string {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'shareholder':
      return '/portal/investor/dashboard';
    case 'institutional':
      return '/portal/institutional/dashboard';
    default:
      return '/portal/login';
  }
}

/**
 * Server-side: Get current user session
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

/**
 * Server-side: Require authentication
 */
export async function requireAuth(requiredRole?: PortalRole) {
  const user = await getCurrentUser();
  
  if (!user) {
    return { authorized: false, user: null, redirect: '/portal/login' };
  }
  
  if (requiredRole && !hasPortalAccess(user.role, requiredRole)) {
    return { authorized: false, user, redirect: getPortalRedirectUrl(user.role!) };
  }
  
  return { authorized: true, user, redirect: null };
}
