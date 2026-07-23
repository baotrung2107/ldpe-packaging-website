import fs from "fs";
import path from "path";
import { sanitizeHTML, sanitizeImageUrl, parseYouTubeEmbedUrl } from "./cms-auth";

const DATA_DIR = path.join(process.cwd(), "data");
const CMS_FILE = path.join(DATA_DIR, "cms-store.json");

export interface RevisionItem {
  revisionId: string;
  createdAt: string;
  createdBy: string;
  snapshot: Record<string, any>;
  note?: string;
}

export interface MediaItem {
  mediaId: string;
  fileName: string;
  url: string;
  mimeType: string;
  fileSize: number;
  altText: string;
  createdAt: string;
}

export interface CMSStoreStructure {
  published: Record<string, any>;
  draft: Record<string, any>;
  revisions: RevisionItem[];
  media: MediaItem[];
  updatedAt: string;
  updatedBy: string;
}

const DEFAULT_STORE: CMSStoreStructure = {
  published: {},
  draft: {},
  revisions: [],
  media: [],
  updatedAt: new Date().toISOString(),
  updatedBy: "system",
};

let inMemoryStore: CMSStoreStructure = { ...DEFAULT_STORE };

export function getCMSStore(): CMSStoreStructure {
  try {
    if (fs.existsSync(CMS_FILE)) {
      const content = fs.readFileSync(CMS_FILE, "utf-8");
      const parsed = JSON.parse(content);
      inMemoryStore = {
        published: parsed.published || parsed.overrides || {},
        draft: parsed.draft || parsed.published || parsed.overrides || {},
        revisions: parsed.revisions || [],
        media: parsed.media || [],
        updatedAt: parsed.updatedAt || new Date().toISOString(),
        updatedBy: parsed.updatedBy || "admin",
      };
      return inMemoryStore;
    }
  } catch (err) {
    console.error("Error reading CMS store file:", err);
  }
  return inMemoryStore;
}

export function saveCMSStore(storeData: Partial<CMSStoreStructure>): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    const current = getCMSStore();
    const updatedStore: CMSStoreStructure = {
      ...current,
      ...storeData,
      updatedAt: new Date().toISOString(),
    };

    // Sanitize values inside draft and published
    if (storeData.draft) {
      updatedStore.draft = sanitizeDictionary(storeData.draft);
    }
    if (storeData.published) {
      updatedStore.published = sanitizeDictionary(storeData.published);
    }

    inMemoryStore = updatedStore;
    fs.writeFileSync(CMS_FILE, JSON.stringify(updatedStore, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error saving CMS store file:", err);
    return false;
  }
}

export function saveDraft(draftData: Record<string, any>, user: string = "admin"): boolean {
  const store = getCMSStore();
  return saveCMSStore({
    ...store,
    draft: draftData,
    updatedBy: user,
  });
}

export function publishDraft(user: string = "admin"): boolean {
  const store = getCMSStore();
  const newRevision: RevisionItem = {
    revisionId: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    createdBy: user,
    snapshot: JSON.parse(JSON.stringify(store.draft)),
  };

  const updatedRevisions = [newRevision, ...(store.revisions || [])].slice(0, 20); // Keep last 20 revisions

  return saveCMSStore({
    ...store,
    published: JSON.parse(JSON.stringify(store.draft)),
    revisions: updatedRevisions,
    updatedBy: user,
  });
}

export function restoreRevision(revisionId: string, user: string = "admin"): boolean {
  const store = getCMSStore();
  const targetRev = store.revisions.find((r) => r.revisionId === revisionId);
  if (!targetRev) return false;

  return saveCMSStore({
    ...store,
    draft: JSON.parse(JSON.stringify(targetRev.snapshot)),
    published: JSON.parse(JSON.stringify(targetRev.snapshot)),
    updatedBy: user,
  });
}

export function addMediaRecord(media: MediaItem): boolean {
  const store = getCMSStore();
  const updatedMedia = [media, ...(store.media || [])];
  return saveCMSStore({
    ...store,
    media: updatedMedia,
  });
}

function sanitizeDictionary(data: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      if (key.includes("image") || key.includes("logo") || key.includes("avatar") || key.includes("icon")) {
        sanitized[key] = sanitizeImageUrl(value);
      } else if (key.includes("video") || key.includes("youtube")) {
        sanitized[key] = parseYouTubeEmbedUrl(value);
      } else {
        sanitized[key] = sanitizeHTML(value);
      }
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) => (typeof item === "object" ? sanitizeDictionary(item) : item));
    } else if (value && typeof value === "object") {
      sanitized[key] = sanitizeDictionary(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}
