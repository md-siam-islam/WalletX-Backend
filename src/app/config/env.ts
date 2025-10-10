import dotenv from 'dotenv'
dotenv.config()

interface envinterface {
    PORT: string
    DB_URL: string,
    BCRYPT_SALT_ROUNDS: string
}


const envLoad =(): envinterface => {

    const requiredEnv : string [] = [
        'PORT',
        'DB_URL',
        'BCRYPT_SALT_ROUNDS'
    ]

    requiredEnv.forEach((env) => {
        if (!process.env[env]) {
            throw new Error(`Missing required environment variable: ${env}`);
        }
    })

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS as string
    }
}

export const envVariables = envLoad();
