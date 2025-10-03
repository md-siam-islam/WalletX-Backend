import dotenv from 'dotenv'
dotenv.config()

interface envinterface {
    PORT: string
    DB_URL: string
}


const envLoad =(): envinterface => {

    const requiredEnv : string [] = [
        'PORT',
        'DB_URL'
    ]

    requiredEnv.forEach((env) => {
        if (!process.env[env]) {
            throw new Error(`Missing required environment variable: ${env}`);
        }
    })

    return {
        PORT: process.env.PORT || '5000',
        DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/myapp'
    }
}

export const envVariables = envLoad()
