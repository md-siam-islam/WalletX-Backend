import dotenv from 'dotenv'
dotenv.config()

interface envinterface {
    PORT: string
    DB_URL: string,
    BCRYPT_SALT_ROUNDS: string,
    JWT_SECRET: string,
    JWT_ACCESS_TOKEN_EXPIRE: string
}


const envLoad =(): envinterface => {

    const requiredEnv : string [] = [
        'PORT',
        'DB_URL',
        'BCRYPT_SALT_ROUNDS',
        'JWT_SECRET',
        'JWT_ACCESS_TOKEN_EXPIRE'
    ]

    requiredEnv.forEach((env) => {
        if (!process.env[env]) {
            throw new Error(`Missing required environment variable: ${env}`);
        }
    })

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS as string ,
        JWT_SECRET: process.env.JWT_SECRET as string,
        JWT_ACCESS_TOKEN_EXPIRE: process.env.JWT_ACCESS_TOKEN_EXPIRE as string
    }
}

export const envVariables = envLoad();
