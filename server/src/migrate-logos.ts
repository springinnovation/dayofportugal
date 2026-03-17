import pool, { query } from "./db.js";
import { uploadFile } from "./s3.js";

async function migrateLogo(id: string, name: string, wixUrl: string) {
  try {
    const res = await fetch(wixUrl);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get("content-type") || "image/jpeg";

    // Build a safe filename from the sponsor name
    const ext = contentType.includes("png") ? ".png" : contentType.includes("webp") ? ".webp" : ".jpg";
    const safeName = name.replace(/[^a-zA-Z0-9]/g, "_") + ext;

    const newUrl = await uploadFile(buffer, safeName, contentType, "images");
    await query("UPDATE sponsors SET logo_url = $1, updated_at = NOW() WHERE id = $2", [newUrl, id]);
    console.log(`  OK: ${name}`);
  } catch (err) {
    console.error(`  FAIL: ${name} — ${err}`);
  }
}

async function main() {
  const result = await query("SELECT id, name, logo_url FROM sponsors WHERE logo_url LIKE '%wixstatic%'");
  console.log(`Found ${result.rows.length} sponsors with Wix logos. Migrating...`);

  for (const row of result.rows) {
    await migrateLogo(row.id, row.name, row.logo_url);
  }

  console.log("Done.");
  await pool.end();
}

main();
