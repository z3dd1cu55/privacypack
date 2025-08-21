declare global {
  interface CloudflareEnv {
    DB: D1Database;  
    ALLOWED_ORIGINS: string;
  }
}

export {};
