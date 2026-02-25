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
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL),
      'import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY': JSON.stringify(process.env.VITE_SUPABASE_PUBLISHABLE_KEY),
      'import.meta.env.VITE_SUPABASE_PROJECT_ID': JSON.stringify(process.env.VITE_SUPABASE_PROJECT_ID),
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
