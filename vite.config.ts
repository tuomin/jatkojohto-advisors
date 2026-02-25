import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  return {
    server: {
      host: "::",
      port: 8080,
    },
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL || "https://echkbdayvuevzfpdkxku.supabase.co"),
      'import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY': JSON.stringify(process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjaGtiZGF5dnVldnpmcGRreGt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMjUxNTQsImV4cCI6MjA4NjkwMTE1NH0.IWdfIrnogQ9kLBoQZMR2bYaPXMimJ1EEIMxOY3nM3Ik"),
      'import.meta.env.VITE_SUPABASE_PROJECT_ID': JSON.stringify(process.env.VITE_SUPABASE_PROJECT_ID || "echkbdayvuevzfpdkxku"),
    },
    plugins: [
      react(),
      mode === 'development' && import('lovable-tagger').then(m => m.componentTagger()),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
