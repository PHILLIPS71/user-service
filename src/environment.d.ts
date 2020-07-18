declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      HOST: string
      PORT: number
      DATABASE_URL: string
      ARGON_SECRET: string
    }
  }
}

export {}
