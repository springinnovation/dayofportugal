import { Router } from "express";
import { query } from "../db.js";
import { authMiddleware } from "../middleware/auth.js";
import { z } from "zod";

const router = Router();

const sponsorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable().optional(),
  logo_url: z.string().nullable().optional(),
  website_url: z.string().nullable().optional(),
  tier: z.string().optional().default("supporter"),
  is_published: z.boolean().optional().default(true),
  sort_order: z.number().optional().default(0),
});

// Public: get published sponsors
router.get("/", async (_req, res) => {
  try {
    const result = await query(
      "SELECT * FROM sponsors WHERE is_published = true ORDER BY sort_order, created_at"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching sponsors:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: get all sponsors
router.get("/admin/all", authMiddleware, async (_req, res) => {
  try {
    const result = await query("SELECT * FROM sponsors ORDER BY sort_order, created_at");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching sponsors:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: create sponsor
router.post("/admin", authMiddleware, async (req, res) => {
  try {
    const data = sponsorSchema.parse(req.body);
    const result = await query(
      `INSERT INTO sponsors (name, description, logo_url, website_url, tier, is_published, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        data.name, data.description || null, data.logo_url || null,
        data.website_url || null, data.tier, data.is_published, data.sort_order,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation error", details: err.errors });
      return;
    }
    console.error("Error creating sponsor:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: update sponsor
router.put("/admin/:id", authMiddleware, async (req, res) => {
  try {
    const data = sponsorSchema.parse(req.body);
    const result = await query(
      `UPDATE sponsors SET
        name = $1, description = $2, logo_url = $3, website_url = $4,
        tier = $5, is_published = $6, sort_order = $7, updated_at = NOW()
       WHERE id = $8 RETURNING *`,
      [
        data.name, data.description || null, data.logo_url || null,
        data.website_url || null, data.tier, data.is_published, data.sort_order,
        req.params.id,
      ]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Sponsor not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation error", details: err.errors });
      return;
    }
    console.error("Error updating sponsor:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: delete sponsor
router.delete("/admin/:id", authMiddleware, async (req, res) => {
  try {
    const result = await query("DELETE FROM sponsors WHERE id = $1 RETURNING id", [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Sponsor not found" });
      return;
    }
    res.json({ message: "Sponsor deleted" });
  } catch (err) {
    console.error("Error deleting sponsor:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
