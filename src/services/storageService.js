import { initialPortfolioData } from '../data/portfolioData';
import { getSupabaseClient } from './supabaseClient';

const LOCAL_STORAGE_KEY = 'samiha_portfolio_data_v3';
const TABLE_NAME = 'portfolio_config';
const ROW_ID = 'samiha';

/**
 * Synchronous local load (used for instant initial render)
 */
export function loadPortfolioData() {
  try {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      return { ...initialPortfolioData, ...parsed };
    }
  } catch (err) {
    // silent fallback
  }
  return initialPortfolioData;
}

/**
 * Asynchronous cloud load (fetches from Supabase if connected)
 */
export async function fetchLivePortfolioData() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return loadPortfolioData();
  }

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('data')
      .eq('id', ROW_ID)
      .single();

    if (error) {
      return loadPortfolioData();
    }

    if (data && data.data) {
      const merged = { ...initialPortfolioData, ...data.data };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
      } catch (e) {
        // storage quota exceeded or private mode
      }
      return merged;
    }
  } catch (err) {
    // silent fallback
  }

  return loadPortfolioData();
}

/**
 * Saves portfolio data locally and pushes to Supabase cloud if connected
 */
export async function savePortfolioData(data) {
  // Always update local cache
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    // silent
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return { success: true, syncedCloud: false };
  }

  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .upsert({
        id: ROW_ID,
        data: data,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) {
      return { success: true, syncedCloud: false, error: error.message };
    }

    return { success: true, syncedCloud: true };
  } catch (err) {
    return { success: true, syncedCloud: false, error: err.message };
  }
}

/**
 * Triggers a direct download of updated portfolioData.js
 */
export function downloadUpdatedConfigFile(data) {
  const content = `/**
 * SAMIHA BUSHRA — MEDICAL & ART PORTFOLIO CONFIGURATION
 * Generated from Admin Panel
 */

export const initialPortfolioData = ${JSON.stringify(data, null, 2)};
`;

  const blob = new Blob([content], { type: 'application/javascript;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'portfolioData.js');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
