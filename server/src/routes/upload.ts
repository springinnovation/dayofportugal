import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "../middleware/auth.js";
import { uploadFile } from "../s3.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (_req, file, cb) => {
    const allowedImages = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const allowedDocs = ["application/pdf", "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if ([...allowedImages, ...allowedDocs].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("File type not allowed"));
    }
  },
});

router.post("/image", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file provided" });
      return;
    }
    const url = await uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype, "images");
    res.json({ url });
  } catch (err) {
    console.error("Image upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

router.post("/document", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file provided" });
      return;
    }
    const url = await uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype, "documents");
    res.json({ url, name: req.file.originalname });
  } catch (err) {
    console.error("Document upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
