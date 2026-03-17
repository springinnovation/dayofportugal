import { Router } from "express";
import { query } from "../db.js";
import { authMiddleware } from "../middleware/auth.js";
import { z } from "zod";

const router = Router();

const volunteerSchema = z.object({
  full_name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional().default(""),
  area_of_interest: z.string().optional().default(""),
  message: z.string().optional().default(""),
});

// Public: submit volunteer form
router.post("/", async (req, res) => {
  try {
    const data = volunteerSchema.parse(req.body);
    const result = await query(
      `INSERT INTO volunteers (full_name, email, phone, area_of_interest, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [data.full_name, data.email, data.phone || null, data.area_of_interest || null, data.message || null]
    );
    res.status(201).json({ id: result.rows[0].id, message: "Thank you for signing up!" });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation error", details: err.errors });
      return;
    }
    console.error("Error creating volunteer:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: get all volunteers
router.get("/admin/all", authMiddleware, async (_req, res) => {
  try {
    const result = await query("SELECT * FROM volunteers ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching volunteers:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: delete volunteer
router.delete("/admin/:id", authMiddleware, async (req, res) => {
  try {
    const result = await query("DELETE FROM volunteers WHERE id = $1 RETURNING id", [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Volunteer not found" });
      return;
    }
    res.json({ message: "Volunteer deleted" });
  } catch (err) {
    console.error("Error deleting volunteer:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
