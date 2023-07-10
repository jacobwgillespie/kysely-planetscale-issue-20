import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

export const envVarsSchema = z.object({
  // MYSQL Database name
  DATABASE_NAME: z.string(),
  // MYSQL Database username
  DATABASE_USERNAME: z.string(),
  // MYSQL Database password
  DATABASE_PASSWORD: z.string(),
  // MYSQL Database host
  DATABASE_HOST: z.string()
})

export interface Config {
  database: {
    name: string
    username: string
    password: string
    host: string
  }
}

let config: Config

export const getConfig = () => {
  if (config) {
    return config
  }
  const envVars = envVarsSchema.parse(process.env)
  config = {
    database: {
      name: envVars.DATABASE_NAME,
      username: envVars.DATABASE_USERNAME,
      password: envVars.DATABASE_PASSWORD,
      host: envVars.DATABASE_HOST
    }
  }
  return config
}
