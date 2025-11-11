import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://eoemighznlwbhrlitfre.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvZW1pZ2h6bmx3YmhybGl0ZnJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MjIwMjQsImV4cCI6MjA3Mjk5ODAyNH0.chISl1iWUEsMGSGBIVKq_EyiRm6vjTb_nH1Dt7whvns";

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);