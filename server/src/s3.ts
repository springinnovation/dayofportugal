import { S3Client, PutObjectCommand, CreateBucketCommand, HeadBucketCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const BUCKET = process.env.DO_SPACES_BUCKET || "ridayofportugal";
const REGION = process.env.DO_SPACES_REGION || "nyc3";
const ENDPOINT = process.env.DO_SPACES_ENDPOINT || `https://${REGION}.digitaloceanspaces.com`;
const FOLDER = "RIDAYOFPortugal";

export const s3 = new S3Client({
  endpoint: ENDPOINT,
  region: REGION,
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY || "",
    secretAccessKey: process.env.DO_SPACES_SECRET || "",
  },
  forcePathStyle: false,
});

export async function ensureBucket() {
  try {
    await s3.send(new HeadBucketCommand({ Bucket: BUCKET }));
    console.log(`Spaces bucket "${BUCKET}" exists.`);
  } catch {
    console.log(`Creating Spaces bucket "${BUCKET}"...`);
    await s3.send(new CreateBucketCommand({ Bucket: BUCKET }));
    console.log(`Bucket "${BUCKET}" created.`);
  }
}

export async function uploadFile(
  buffer: Buffer,
  originalName: string,
  mimeType: string,
  subfolder: "images" | "documents"
): Promise<string> {
  const timestamp = Date.now();
  const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `${FOLDER}/${subfolder}/${timestamp}-${safeName}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
      ACL: "public-read",
    })
  );

  return `${ENDPOINT}/${BUCKET}/${key}`;
}
