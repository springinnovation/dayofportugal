import { Router } from "express";
import { query } from "../db.js";
import { authMiddleware } from "../middleware/auth.js";
import { z } from "zod";

const router = Router();

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date_start: z.string().nullable().optional(),
  date_end: z.string().nullable().optional(),
  date_display: z.string().min(1, "Display date is required"),
  time_start: z.string().nullable().optional(),
  time_end: z.string().nullable().optional(),
  location: z.string().min(1, "Location is required"),
  category: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
  document_url: z.string().nullable().optional(),
  document_name: z.string().nullable().optional(),
  is_featured: z.boolean().optional().default(false),
  is_annual: z.boolean().optional().default(true),
  is_published: z.boolean().optional().default(true),
  sort_order: z.number().optional().default(0),
});

// Public: get published events
router.get("/", async (_req, res) => {
  try {
    const result = await query(
      "SELECT * FROM events WHERE is_published = true ORDER BY sort_order, created_at"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Public: get single event
router.get("/:id", async (req, res) => {
  try {
    const result = await query("SELECT * FROM events WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Event not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching event:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: get all events (including drafts)
router.get("/admin/all", authMiddleware, async (_req, res) => {
  try {
    const result = await query("SELECT * FROM events ORDER BY sort_order, created_at");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: create event
router.post("/admin", authMiddleware, async (req, res) => {
  try {
    const data = eventSchema.parse(req.body);
    const result = await query(
      `INSERT INTO events (title, description, date_start, date_end, date_display, time_start, time_end, location, category, image_url, document_url, document_name, is_featured, is_annual, is_published, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
       RETURNING *`,
      [
        data.title, data.description, data.date_start || null, data.date_end || null,
        data.date_display, data.time_start || null, data.time_end || null,
        data.location, data.category || null, data.image_url || null,
        data.document_url || null, data.document_name || null,
        data.is_featured, data.is_annual, data.is_published, data.sort_order,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation error", details: err.errors });
      return;
    }
    console.error("Error creating event:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: update event
router.put("/admin/:id", authMiddleware, async (req, res) => {
  try {
    const data = eventSchema.parse(req.body);
    const result = await query(
      `UPDATE events SET
        title = $1, description = $2, date_start = $3, date_end = $4,
        date_display = $5, time_start = $6, time_end = $7, location = $8,
        category = $9, image_url = $10, document_url = $11, document_name = $12,
        is_featured = $13, is_annual = $14, is_published = $15, sort_order = $16,
        updated_at = NOW()
       WHERE id = $17 RETURNING *`,
      [
        data.title, data.description, data.date_start || null, data.date_end || null,
        data.date_display, data.time_start || null, data.time_end || null,
        data.location, data.category || null, data.image_url || null,
        data.document_url || null, data.document_name || null,
        data.is_featured, data.is_annual, data.is_published, data.sort_order,
        req.params.id,
      ]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Event not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation error", details: err.errors });
      return;
    }
    console.error("Error updating event:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: delete event
router.delete("/admin/:id", authMiddleware, async (req, res) => {
  try {
    const result = await query("DELETE FROM events WHERE id = $1 RETURNING id", [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Event not found" });
      return;
    }
    res.json({ message: "Event deleted" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
