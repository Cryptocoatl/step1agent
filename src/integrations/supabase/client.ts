
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://clofehcehujszwubdrjo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsb2ZlaGNlaHVqc3p3dWJkcmpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NjAxNTUsImV4cCI6MjA1ODUzNjE1NX0.xsEy3HqGkxiBQFn4fi9F3KtDfZSs0URayPPDVv_sXv0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
