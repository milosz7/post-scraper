declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_CONN_STRING: string;
      DEV_DB_CONN_STRING: string;
      DB_NAME: string;
      POSTS_COLLECTION_NAME: string;
      PROFILES_COLLECTION_NAME: string;
      PEXELS_API_KEY: string;
    }
  }
}

export {}