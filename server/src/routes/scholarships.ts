import { Router } from "express";
import { query } from "../db.js";
import { authMiddleware } from "../middleware/auth.js";
import { z } from "zod";

const router = Router();

const educationEntrySchema = z.object({
  institution: z.string().min(1),
  dates: z.string().min(1),
  majorMinor: z.string().min(1),
});

const activityEntrySchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  hoursPerMonth: z.string().min(1),
});

const awardEntrySchema = z.object({
  name: z.string().min(1),
  year: z.string().min(1),
});

const applicationSchema = z.object({
  full_name: z.string().min(1, "Name is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  home_address: z.string().min(1, "Home address is required"),
  campus_address: z.string().optional().default(""),
  phone_home: z.string().optional().default(""),
  phone_cell: z.string().optional().default(""),
  email: z.string().email("Valid email is required"),
  us_citizen: z.boolean(),
  parent_org_membership: z.string().optional().default(""),
  portuguese_ancestry: z.string().min(1, "Portuguese ancestry description is required"),
  education: z.array(educationEntrySchema).min(1, "At least one education entry is required"),
  current_gpa: z.string().min(1, "GPA is required"),
  anticipated_graduation: z.string().optional().default(""),
  activities: z.array(activityEntrySchema).optional().default([]),
  awards: z.array(awardEntrySchema).optional().default([]),
  essay: z.string().min(1, "Essay is required"),
  certified: z.literal(true, { errorMap: () => ({ message: "You must certify the application" }) }),
});

// Public: submit scholarship application
router.post("/", async (req, res) => {
  try {
    const data = applicationSchema.parse(req.body);
    const result = await query(
      `INSERT INTO scholarship_applications (
        full_name, date_of_birth, home_address, campus_address,
        phone_home, phone_cell, email, us_citizen,
        parent_org_membership, portuguese_ancestry,
        education, current_gpa, anticipated_graduation,
        activities, awards, essay, certified
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING id`,
      [
        data.full_name,
        data.date_of_birth,
        data.home_address,
        data.campus_address || null,
        data.phone_home || null,
        data.phone_cell || null,
        data.email,
        data.us_citizen,
        data.parent_org_membership || null,
        data.portuguese_ancestry,
        JSON.stringify(data.education),
        data.current_gpa,
        data.anticipated_graduation || null,
        JSON.stringify(data.activities),
        JSON.stringify(data.awards),
        data.essay,
        data.certified,
      ]
    );
    res.status(201).json({ id: result.rows[0].id, message: "Application submitted successfully!" });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation error", details: err.errors });
      return;
    }
    console.error("Error creating scholarship application:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: get all applications
router.get("/admin/all", authMiddleware, async (_req, res) => {
  try {
    const result = await query(
      "SELECT * FROM scholarship_applications ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching scholarship applications:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: get single application
router.get("/admin/:id", authMiddleware, async (req, res) => {
  try {
    const result = await query(
      "SELECT * FROM scholarship_applications WHERE id = $1",
      [req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Application not found" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching scholarship application:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: update application status
router.patch("/admin/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["new", "reviewed", "accepted", "rejected"].includes(status)) {
      res.status(400).json({ error: "Invalid status" });
      return;
    }
    const result = await query(
      "UPDATE scholarship_applications SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING id",
      [status, req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Application not found" });
      return;
    }
    res.json({ message: "Status updated" });
  } catch (err) {
    console.error("Error updating application status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: update application notes
router.patch("/admin/:id/notes", authMiddleware, async (req, res) => {
  try {
    const { notes } = req.body;
    const result = await query(
      "UPDATE scholarship_applications SET admin_notes = $1, updated_at = NOW() WHERE id = $2 RETURNING id",
      [notes ?? null, req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Application not found" });
      return;
    }
    res.json({ message: "Notes updated" });
  } catch (err) {
    console.error("Error updating application notes:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin: delete application
router.delete("/admin/:id", authMiddleware, async (req, res) => {
  try {
    const result = await query(
      "DELETE FROM scholarship_applications WHERE id = $1 RETURNING id",
      [req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Application not found" });
      return;
    }
    res.json({ message: "Application deleted" });
  } catch (err) {
    console.error("Error deleting scholarship application:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
