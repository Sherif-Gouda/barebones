import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { createClient } from "@supabase/supabase-js";

// Load environment variables for Supabase URL and Anon Key
// These are prefixed with EXPO_PUBLIC_ to make them available in the Expo environment
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
