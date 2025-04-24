import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// Validar si las variables existen
const requiredEnv = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_PORT'];
for (const key of requiredEnv) {
    if (!process.env[key]) {
        throw new Error(`Missing environment variable: ${key}`);
    }
}

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    ssl: false,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

// Solo para desarrollo: prueba de conexión
if (process.env.NODE_ENV !== 'production') {
    pool.connect((err, client, release) => {
        if (err) {
            console.error('❌ PostgreSQL Connection Error:', err.message);
            return;
        }
        console.log('✅ PostgreSQL connected successfully');
        release(); // liberamos el cliente al pool
    });
}

export { pool };
