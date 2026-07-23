import fs from "fs";
import path from "path";
import { sanitizeHTML, sanitizeImageUrl, parseYouTubeEmbedUrl } from "./cms-auth";

const DATA_DIR = path.join(process.cwd(), "data");
const CMS_FILE = path.join(DATA_DIR, "cms-overrides.json");

export interface CMSData {
  [key: string]: any;
}

// In-memory fallback cache
let inMemoryOverrides: CMSData = {};

export function getCMSOverrides(): CMSData {
  try {
    if (fs.existsSync(CMS_FILE)) {
      const content = fs.readFileSync(CMS_FILE, "utf-8");
      inMemoryOverrides = JSON.parse(content);
      return inMemoryOverrides;
    }
  } catch (err) {
    console.error("Error reading CMS overrides file:", err);
  }
  return inMemoryOverrides;
}

export function saveCMSOverrides(data: CMSData): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Sanitize values
    const sanitizedData: CMSData = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "string") {
        if (key.includes("image") || key.includes("logo") || key.includes("avatar")) {
          sanitizedData[key] = sanitizeImageUrl(value);
        } else if (key.includes("video") || key.includes("youtube")) {
          sanitizedData[key] = parseYouTubeEmbedUrl(value);
        } else {
          sanitizedData[key] = sanitizeHTML(value);
        }
      } else {
        sanitizedData[key] = value;
      }
    }

    inMemoryOverrides = sanitizedData;
    fs.writeFileSync(CMS_FILE, JSON.stringify(sanitizedData, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error saving CMS overrides file:", err);
    return false;
  }
}
