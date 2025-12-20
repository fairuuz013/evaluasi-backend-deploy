import dotenv from 'dotenv'

dotenv.config()
 
export const HOST = process.env.HOST
export const PORT = process.env.PORT

export default {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET || "123456",
} as const