declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';
      readonly PUBLIC_URL: string;
      REACT_APP_GOOGLE_MAPS_API_KEY: string;
    }
  }
}

export {};
