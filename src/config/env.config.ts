import dotenv from "dotenv";
dotenv.config();

export const ENV ={
    nodeEnv: process.env.NODE_ENV || 'development',
    database:{
        HOST: process.env.DB_HOST || "localhost",
        USER: process.env.DB_USERNAME || "postgres",
        PASSWORD: process.env.DB_PASSWORD,
        DB: process.env.DB_DATABASE || "",
        dialect: "Postgres",
        logging: false,
        PORT: 5432,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }

    }
}

export const HOST = process.env.REDIS_HOST || 'localhost';
export const PORT = process.env.REDIS_PORT || 6379;
export const PASSWORD = process.env.REDIS_PASSWORD || '';


