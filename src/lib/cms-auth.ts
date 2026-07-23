import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "baotrung2107";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "trung1993@";

const AUTH_SALT = process.env.AUTH_SALT || "_ldpe_salt_2026";
export const ADMIN_PASSWORD_HASH = crypto
  .createHash("sha256")
  .update(`${ADMIN_PASSWORD}${AUTH_SALT}`)
  .digest("hex");

export const SESSION_TOKEN_NAME = "ldpe_admin_session";

export function hashPassword(plainTextPassword: string): string {
  return crypto
    .createHash("sha256")
    .update(`${plainTextPassword}${AUTH_SALT}`)
    .digest("hex");
}

export function generateSessionToken(user: string): string {
  return crypto
    .createHash("sha256")
    .update(`${user}_${ADMIN_PASSWORD_HASH}_${AUTH_SALT}`)
    .digest("hex");
}

export function verifyAdminCredentials(user: string, pass: string): boolean {
  if (user !== ADMIN_USERNAME) return false;
  return hashPassword(pass) === ADMIN_PASSWORD_HASH;
}

export async function isAuthorizedAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_TOKEN_NAME)?.value;
    if (!token) return false;

    const expectedToken = generateSessionToken(ADMIN_USERNAME);
    return token === expectedToken;
  } catch (err) {
    return false;
  }
}

// XSS Sanitizer: allow b, i, u, span, a tags only, strip scripts & dangerous attributes
export function sanitizeHTML(input: string): string {
  if (!input) return "";
  let clean = input;

  // Remove script tags and inline javascript
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  clean = clean.replace(/javascript:/gi, "");
  clean = clean.replace(/on\w+="[^"]*"/gi, "");
  clean = clean.replace(/on\w+='[^']*'/gi, "");

  return clean;
}

// Image URL validator
export function sanitizeImageUrl(url: string): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:image/") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }
  return "";
}

// YouTube URL parser & embed link converter
export function parseYouTubeEmbedUrl(url: string): string {
  if (!url) return "";
  const trimmed = url.trim();
  
  // Standard watch URL: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${watchMatch[1]}`;
  }
  return "";
}
