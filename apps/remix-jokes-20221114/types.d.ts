declare namespace NodeJS {
  interface ProcessEnv {
    readonly NX_NEXT_PUBLIC_SUPABASE_URL: string;
    readonly NX_NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    readonly NEXT_PUBLIC_SUPABASE_URL: string;
    readonly NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    readonly SUPABASE_SERVICE_KEY: string;
    readonly ENDPOINT: string;
  }
}
