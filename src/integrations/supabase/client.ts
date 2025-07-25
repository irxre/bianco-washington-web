// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fbmqifbaozcwldnpmems.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZibXFpZmJhb3pjd2xkbnBtZW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMDQxNzAsImV4cCI6MjA2ODg4MDE3MH0.Fo3AQkn_KrTF7DqoIUURGcDj08UeLbWDMnqunemMJ68";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});