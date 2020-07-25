declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      HOST: string
      PORT: number
      DATABASE_URL: string
      ARGON_SECRET: string
      GRPC_HOST: string
      GRPC_PORT: number
      AUTH_SERVICE_HOST: string
      AUTH_SERVICE_PORT: number
    }
  }
}

export {}
