import { account } from './appwrite';

/**
 * Log in with email and password.
 */
export async function login(email, password) {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/**
 * Log out the current session.
 */
export async function logout() {
  try {
    return await account.deleteSession('current');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}

/**
 * Get the currently logged-in user.
 * Returns null if not authenticated.
 */
export async function getCurrentUser() {
  try {
    return await account.get();
  } catch (error) {
    return null;
  }
}

/**
 * Check if a user is currently authenticated.
 */
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
