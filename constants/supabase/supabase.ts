// ─────────────────────────────────────────────────────────────
// Supabase Client Configuration
// Purpose: App-wide Supabase initialization with custom auth storage
// Handles: Auth session persistence using MMKV storage adapter
// Depends on: @supabase/supabase-js, MMKV storage
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { createClient } from "@supabase/supabase-js";
import { storage } from "@/constants/stores/mmkvStore";

// ── Environment Variables ───────────────────────────────────
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// ── MMKV Storage Adapter (Supabase Auth) ────────────────────
const mmkvStorageAdapter = {
  getItem: (key: string) => storage.getString(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => {
    storage.remove(key);
  },
};

// ── Supabase Client ──────────────────────────────────────────
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: mmkvStorageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});