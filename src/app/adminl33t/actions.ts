'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  setAdminCredentials,
  validateSetupToken,
  markSetupComplete,
  createUser,
  deleteUser,
  getUser,
  updateUser,
  addSlug,
  removeSlug,
  setDefaultSlug,
  logAuditEvent,
  generatePassword,
} from '@/lib/redis-store';
import { generateTOTPSecret, validateTOTP } from '@/lib/totp';
import type { AdminCredentials } from '@/types/analytics';

// Setup admin
export async function setupAdmin(
  prevState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  try {
    const token = formData.get('token') as string;
    const totpCode = formData.get('totpCode') as string;
    const totpSecret = formData.get('totpSecret') as string;
    const initialSlug = formData.get('initialSlug') as string;

    // Validate setup token
    const isValidToken = await validateSetupToken(token);
    if (!isValidToken) {
      return { error: 'Invalid or expired setup token' };
    }

    // Validate TOTP code
    const isValidTOTP = validateTOTP(totpCode, totpSecret);
    if (!isValidTOTP) {
      return { error: 'Invalid TOTP code. Please try again.' };
    }

    // Save admin credentials
    const adminCreds: AdminCredentials = {
      username: 'admin',
      totpSecret,
      createdAt: new Date().toISOString(),
    };
    await setAdminCredentials(adminCreds);

    // Save initial slug
    if (initialSlug) {
      await addSlug(initialSlug);
      await setDefaultSlug(initialSlug);
    }

    // Mark setup as complete
    await markSetupComplete();

    // Log audit event
    await logAuditEvent('system', 'admin_setup_complete', 'admin');

    return { success: true };
  } catch (error) {
    console.error('Setup error:', error);
    return { error: 'Setup failed. Please try again.' };
  }
}

// Admin login
export async function adminLogin(
  prevState: { error?: string } | null,
  formData: FormData
) {
  try {
    const totpCode = formData.get('totpCode') as string;

    // Get admin credentials from Redis
    const { getAdminCredentials } = await import('@/lib/redis-store');
    const adminCreds = await getAdminCredentials();

    if (!adminCreds) {
      return { error: 'Admin not configured' };
    }

    // Validate TOTP
    const isValid = validateTOTP(totpCode, adminCreds.totpSecret);
    if (!isValid) {
      return { error: 'Invalid TOTP code' };
    }

    // Set admin auth cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    redirect('/adminl33t');
  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    console.error('Admin login error:', error);
    return { error: 'Login failed' };
  }
}

// Admin logout
export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');
  redirect('/adminl33t/login');
}

// User management actions
export async function addUser(formData: FormData) {
  try {
    const username = formData.get('username') as string;
    const customPassword = formData.get('password') as string;
    const password = customPassword || generatePassword();

    await createUser(username, password, 'admin');
    await logAuditEvent('admin', 'user_created', username);

    return { success: true, password, username };
  } catch (error) {
    console.error('Add user error:', error);
    return { error: 'Failed to add user' };
  }
}

export async function removeUser(username: string) {
  try {
    await deleteUser(username);
    await logAuditEvent('admin', 'user_deleted', username);
    return { success: true };
  } catch (error) {
    console.error('Remove user error:', error);
    return { error: 'Failed to remove user' };
  }
}

export async function toggleUserStatus(username: string) {
  try {
    const user = await getUser(username);
    if (!user) {
      return { error: 'User not found' };
    }

    await updateUser(username, { isActive: !user.isActive });
    await logAuditEvent('admin', user.isActive ? 'user_deactivated' : 'user_activated', username);

    return { success: true, isActive: !user.isActive };
  } catch (error) {
    console.error('Toggle user status error:', error);
    return { error: 'Failed to toggle user status' };
  }
}

export async function resetUserPassword(username: string) {
  try {
    const newPassword = generatePassword();
    const user = await getUser(username);
    if (!user) {
      return { error: 'User not found' };
    }

    // Create new user with same details but new password
    await createUser(username, newPassword, user.createdBy);
    await logAuditEvent('admin', 'password_reset', username);

    return { success: true, password: newPassword };
  } catch (error) {
    console.error('Reset password error:', error);
    return { error: 'Failed to reset password' };
  }
}

// Slug management actions
export async function addPitchSlug(slug: string) {
  try {
    // Validate slug format
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return { error: 'Invalid slug format. Use only lowercase letters, numbers, and hyphens.' };
    }

    await addSlug(slug);
    await logAuditEvent('admin', 'slug_added', slug);

    return { success: true, slug };
  } catch (error) {
    console.error('Add slug error:', error);
    return { error: 'Failed to add slug' };
  }
}

export async function removePitchSlug(slug: string) {
  try {
    const { getAllSlugs } = await import('@/lib/redis-store');
    const slugs = await getAllSlugs();

    if (slugs.length === 1) {
      return { error: 'Cannot delete the last slug' };
    }

    await removeSlug(slug);
    await logAuditEvent('admin', 'slug_removed', slug);

    return { success: true };
  } catch (error) {
    console.error('Remove slug error:', error);
    return { error: 'Failed to remove slug' };
  }
}

export async function generateRandomSlug() {
  try {
    const slug = Math.random().toString(36).substring(2, 10);
    await addSlug(slug);
    await logAuditEvent('admin', 'slug_generated', slug);

    return { success: true, slug };
  } catch (error) {
    console.error('Generate slug error:', error);
    return { error: 'Failed to generate slug' };
  }
}

export async function setDefaultPitchSlug(slug: string) {
  try {
    await setDefaultSlug(slug);
    await logAuditEvent('admin', 'default_slug_set', slug);

    return { success: true };
  } catch (error) {
    console.error('Set default slug error:', error);
    return { error: 'Failed to set default slug' };
  }
}
