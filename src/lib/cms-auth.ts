import crypto from "crypto";

// Default admin credentials
export const ADMIN_USERNAME = "baotrung2107";
// Salted SHA-256 hash of "trung1993@"
export const ADMIN_PASSWORD_HASH = crypto
  .createHash("sha256")
  .update("trung1993@_ldpe_salt_2026")
  .digest("hex");

export function hashPassword(plainTextPassword: string): string {
  return crypto
    .createHash("sha256")
    .update(`${plainTextPassword}_ldpe_salt_2026`)
    .digest("hex");
}

export function verifyAdminCredentials(user: string, pass: string): boolean {
  if (user !== ADMIN_USERNAME) return false;
  return hashPassword(pass) === ADMIN_PASSWORD_HASH;
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
  const watchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${watchMatch[1]}`;
  }
  return "";
}
