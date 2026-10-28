import { createClient } from '@supabase/supabase-js';

/**
 * SUPABASE CLOUD DATABASE CONFIGURATION
 * 
 * Paste your Project URL below (Found in: Supabase Dashboard ➔ Project Settings ➔ API ➔ Project URL)
 * Example: 'https://abcdefghijkl.supabase.co'
 */
export const SUPABASE_PROJECT_URL = import.meta.env?.VITE_SUPABASE_URL || '';
export const SUPABASE_PUBLISHABLE_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_WljJI4ytPqjJmHX7whXwZw_yMS7Jb6w';

let cachedClient = null;

/**
 * Gets or initializes the Supabase client seamlessly.
 * If no valid Project URL is provided, returns null cleanly to avoid network errors.
 */
export function getSupabaseClient() {
  if (cachedClient) {
    return cachedClient;
  }

  const url = (SUPABASE_PROJECT_URL || '').trim();
  const anonKey = (SUPABASE_PUBLISHABLE_KEY || '').trim();

  // Guard: Must have a valid https:// URL and not a dummy domain
  if (!url || !url.startsWith('https://') || url.includes('wljji4ytpqjjmhx7whxw')) {
    return null;
  }

  if (!anonKey) {
    return null;
  }

  try {
    cachedClient = createClient(url, anonKey, {
      auth: { persistSession: false }
    });
    return cachedClient;
  } catch (err) {
    return null;
  }
}
