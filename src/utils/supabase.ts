import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xpwjdpyrcngblptlsrkn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhwd2pkcHlyY25nYmxwdGxzcmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMTU0OTAsImV4cCI6MjA3ODc5MTQ5MH0.V9hVzO7eN82zYIddrgb5ct4yt2-ah9v76mR4hDr3nqI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
