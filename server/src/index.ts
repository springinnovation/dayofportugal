import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";
import uploadRoutes from "./routes/upload.js";
import sponsorRoutes from "./routes/sponsors.js";
import volunteerRoutes from "./routes/volunteers.js";
import scholarshipRoutes from "./routes/scholarships.js";
import { ensureBucket } from "./s3.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({ origin: ["http://localhost:8080", "http://localhost:5173"] }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/sponsors", sponsorRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/scholarships", scholarshipRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

ensureBucket()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize Spaces bucket:", err);
    process.exit(1);
  });
