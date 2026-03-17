import pg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const connectionString = (process.env.DATABASE_URL || "").replace(/[?&]sslmode=[^&]*/g, "");

const pool = new pg.Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

export const query = (text: string, params?: unknown[]) => pool.query(text, params);

export default pool;
