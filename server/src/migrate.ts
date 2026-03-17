import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool, { query } from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function migrate() {
  try {
    const sql1 = readFileSync(
      path.resolve(__dirname, "migrations/001_create_tables.sql"),
      "utf-8"
    );
    await query(sql1);
    console.log("Migration 001 completed.");

    const sql2 = readFileSync(
      path.resolve(__dirname, "migrations/002_add_document_columns.sql"),
      "utf-8"
    );
    await query(sql2);
    console.log("Migration 002 completed.");

    const sql3 = readFileSync(
      path.resolve(__dirname, "migrations/003_create_sponsors.sql"),
      "utf-8"
    );
    await query(sql3);
    console.log("Migration 003 completed.");

    const sql4 = readFileSync(
      path.resolve(__dirname, "migrations/004_create_volunteers.sql"),
      "utf-8"
    );
    await query(sql4);
    console.log("Migration 004 completed.");

    const sql5 = readFileSync(
      path.resolve(__dirname, "migrations/005_create_scholarship_applications.sql"),
      "utf-8"
    );
    await query(sql5);
    console.log("Migration 005 completed.");

    const sql6 = readFileSync(
      path.resolve(__dirname, "migrations/006_create_alert_subscribers.sql"),
      "utf-8"
    );
    await query(sql6);
    console.log("Migration 006 completed.");

    console.log("All migrations completed successfully.");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await pool.end();
  }
}

migrate();
