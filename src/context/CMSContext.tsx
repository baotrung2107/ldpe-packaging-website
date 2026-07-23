"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CMSElementMeta {
  cmsId: string;
  cmsSection: string;
  cmsType: string;
  label?: string;
  currentValue?: any;
}

export interface RevisionMeta {
  revisionId: string;
  createdAt: string;
  createdBy: string;
  snapshot: Record<string, any>;
}

export interface MediaMeta {
  mediaId: string;
  fileName: string;
  url: string;
  mimeType: string;
  fileSize: number;
  altText: string;
  createdAt: string;
}

interface CMSContextType {
  isAdmin: boolean;
  published: Record<string, any>;
  draft: Record<string, any>;
  revisions: RevisionMeta[];
  mediaList: MediaMeta[];
  getOverride: <T>(key: string, defaultValue: T) => T;
  updateDraft: (key: string, value: any) => void;
  updateArrayItem: (arrayKey: string, index: number, fieldKey: string, value: any) => void;
  addArrayItem: (arrayKey: string, newItem: any) => void;
  removeArrayItem: (arrayKey: string, index: number) => void;
  reorderArrayItems: (arrayKey: string, fromIndex: number, toIndex: number) => void;
  saveDraft: () => Promise<boolean>;
  publish: () => Promise<boolean>;
  restoreRev: (revisionId: string) => Promise<boolean>;
  uploadMediaFile: (file: File, altText?: string) => Promise<string | null>;
  resetDraft: () => void;
  hasUnsavedChanges: boolean;
  previewMode: "desktop" | "mobile";
  setPreviewMode: (mode: "desktop" | "mobile") => void;
  isVisualEditActive: boolean;
  setIsVisualEditActive: (active: boolean) => void;
  selectedElementMeta: CMSElementMeta | null;
  setSelectedElementMeta: (meta: CMSElementMeta | null) => void;
  isLoading: boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [published, setPublished] = useState<Record<string, any>>({});
  const [draft, setDraft] = useState<Record<string, any>>({});
  const [savedDraftState, setSavedDraftState] = useState<Record<string, any>>({});
  const [revisions, setRevisions] = useState<RevisionMeta[]>([]);
  const [mediaList, setMediaList] = useState<MediaMeta[]>([]);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [isVisualEditActive, setIsVisualEditActive] = useState(false);
  const [selectedElementMeta, setSelectedElementMeta] = useState<CMSElementMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch CMS data on mount
  const refreshCMSData = async () => {
    try {
      const res = await fetch("/api/admin/cms");
      const data = await res.json();
      if (data.success) {
        setIsAdmin(!!data.isAdmin);
        setPublished(data.published || {});
        if (data.isAdmin) {
          const currentDraft = data.draft || data.published || {};
          setDraft(currentDraft);
          setSavedDraftState(currentDraft);
          setRevisions(data.revisions || []);
          setMediaList(data.media || []);
        } else {
          setDraft(data.published || {});
          setSavedDraftState(data.published || {});
        }
      }
    } catch (err) {
      console.error("Failed to load CMS data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshCMSData();
  }, []);

  const getOverride = <T,>(key: string, defaultValue: T): T => {
    // In admin visual mode, show draft value; for public users, show published value!
    const dataSource = isAdmin ? draft : published;
    const val = dataSource[key];
    if (val === undefined || val === null || val === "") {
      return defaultValue;
    }
    return val as T;
  };

  const updateDraft = (key: string, value: any) => {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateArrayItem = (arrayKey: string, index: number, fieldKey: string, value: any) => {
    setDraft((prev) => {
      const currentArray = [...(prev[arrayKey] || [])];
      if (currentArray[index]) {
        currentArray[index] = {
          ...currentArray[index],
          [fieldKey]: value,
        };
      }
      return {
        ...prev,
        [arrayKey]: currentArray,
      };
    });
  };

  const addArrayItem = (arrayKey: string, newItem: any) => {
    setDraft((prev) => {
      const currentArray = [...(prev[arrayKey] || [])];
      currentArray.push(newItem);
      return {
        ...prev,
        [arrayKey]: currentArray,
      };
    });
  };

  const removeArrayItem = (arrayKey: string, index: number) => {
    setDraft((prev) => {
      const currentArray = [...(prev[arrayKey] || [])];
      currentArray.splice(index, 1);
      return {
        ...prev,
        [arrayKey]: currentArray,
      };
    });
  };

  const reorderArrayItems = (arrayKey: string, fromIndex: number, toIndex: number) => {
    setDraft((prev) => {
      const currentArray = [...(prev[arrayKey] || [])];
      const [moved] = currentArray.splice(fromIndex, 1);
      currentArray.splice(toIndex, 0, moved);
      return {
        ...prev,
        [arrayKey]: currentArray,
      };
    });
  };

  const saveDraft = async (): Promise<boolean> => {
    try {
      const res = await fetch("/api/admin/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save_draft", draft }),
      });
      const data = await res.json();
      if (data.success) {
        setSavedDraftState(draft);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to save draft:", err);
      return false;
    }
  };

  const publish = async (): Promise<boolean> => {
    try {
      const res = await fetch("/api/admin/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "publish", draft }),
      });
      const data = await res.json();
      if (data.success) {
        setPublished(data.published);
        setSavedDraftState(draft);
        setRevisions(data.revisions || []);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to publish:", err);
      return false;
    }
  };

  const restoreRev = async (revisionId: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/admin/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "restore", revisionId }),
      });
      const data = await res.json();
      if (data.success) {
        setDraft(data.draft);
        setPublished(data.published);
        setSavedDraftState(data.draft);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to restore revision:", err);
      return false;
    }
  };

  const uploadMediaFile = async (file: File, altText: string = ""): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("altText", altText);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setMediaList((prev) => [data.media, ...prev]);
        return data.url;
      }
      alert(data.error || "Tải ảnh lên thất bại");
      return null;
    } catch (err) {
      console.error("Upload failed:", err);
      return null;
    }
  };

  const resetDraft = () => {
    setDraft(savedDraftState);
  };

  const hasUnsavedChanges = JSON.stringify(savedDraftState) !== JSON.stringify(draft);

  return (
    <CMSContext.Provider
      value={{
        isAdmin,
        published,
        draft,
        revisions,
        mediaList,
        getOverride,
        updateDraft,
        updateArrayItem,
        addArrayItem,
        removeArrayItem,
        reorderArrayItems,
        saveDraft,
        publish,
        restoreRev,
        uploadMediaFile,
        resetDraft,
        hasUnsavedChanges,
        previewMode,
        setPreviewMode,
        isVisualEditActive,
        setIsVisualEditActive,
        selectedElementMeta,
        setSelectedElementMeta,
        isLoading,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}
