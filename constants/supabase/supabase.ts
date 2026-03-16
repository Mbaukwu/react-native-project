import { createClient } from '@supabase/supabase-js';
import { storage } from '@/constants/stores/mmkvStore';

const supabaseUrl = 'https://fljujvlgffkvkmwvitla.supabase.co';
const supabaseAnonKey ='sb_publishable_W3R2VGrUaCCfPI9RoBydUQ_bAfhKixd';

const mmkvStorageAdapter = {
  getItem: (key: string) => storage.getString(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => { storage.remove(key); },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: mmkvStorageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});