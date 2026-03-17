import { Router } from "express";
import { query } from "../db.js";
import { authMiddleware } from "../middleware/auth.js";
import { z } from "zod";

const router = Router();

const subscribeSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().min(7).optional(),
}).refine((d) => d.email || d.phone, {
  message: "Provide at least an email or phone number",
});

router.post("/subscribe", async (req, res) => {
  try {
    const { email, phone } = subscribeSchema.parse(req.body);

    if (email) {
      await query(
        `INSERT INTO alert_subscribers (email, phone)
         VALUES ($1, $2)
         ON CONFLICT (email) DO UPDATE SET phone = COALESCE(alert_subscribers.phone, EXCLUDED.phone)`,
        [email, phone || null]
      );
    } else if (phone) {
      await query(
        `INSERT INTO alert_subscribers (email, phone)
         VALUES (NULL, $1)
         ON CONFLICT (phone) DO NOTHING`,
        [phone]
      );
    }

    res.json({ message: "Subscribed successfully" });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.errors[0]?.message || "Invalid input" });
      return;
    }
    console.error("Alert subscribe error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: list all subscribers
router.get("/admin/all", authMiddleware, async (_req, res) => {
  try {
    const result = await query(
      "SELECT id, email, phone, created_at FROM alert_subscribers ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Admin list subscribers error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: delete subscriber
router.delete("/admin/:id", authMiddleware, async (req, res) => {
  try {
    const result = await query(
      "DELETE FROM alert_subscribers WHERE id = $1 RETURNING id",
      [req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Subscriber not found" });
      return;
    }
    res.json({ message: "Subscriber removed" });
  } catch (err) {
    console.error("Admin delete subscriber error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
