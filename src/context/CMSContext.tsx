"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CMSContextType {
  overrides: Record<string, any>;
  getOverride: <T>(key: string, defaultValue: T) => T;
  updateDraft: (key: string, value: any) => void;
  updateArrayItem: (arrayKey: string, index: number, fieldKey: string, value: any) => void;
  addArrayItem: (arrayKey: string, newItem: any) => void;
  removeArrayItem: (arrayKey: string, index: number) => void;
  saveAll: () => Promise<boolean>;
  resetDraft: () => void;
  hasUnsavedChanges: boolean;
  previewMode: "desktop" | "mobile";
  setPreviewMode: (mode: "desktop" | "mobile") => void;
  isLoading: boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [savedOverrides, setSavedOverrides] = useState<Record<string, any>>({});
  const [draftOverrides, setDraftOverrides] = useState<Record<string, any>>({});
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch overrides on mount
  useEffect(() => {
    fetch("/api/admin/cms")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.overrides) {
          setSavedOverrides(data.overrides);
          setDraftOverrides(data.overrides);
        }
      })
      .catch((err) => console.error("Failed to load CMS overrides:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const getOverride = <T,>(key: string, defaultValue: T): T => {
    const val = draftOverrides[key];
    if (val === undefined || val === null || val === "") {
      return defaultValue;
    }
    return val as T;
  };

  const updateDraft = (key: string, value: any) => {
    setDraftOverrides((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateArrayItem = (arrayKey: string, index: number, fieldKey: string, value: any) => {
    setDraftOverrides((prev) => {
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
    setDraftOverrides((prev) => {
      const currentArray = [...(prev[arrayKey] || [])];
      currentArray.push(newItem);
      return {
        ...prev,
        [arrayKey]: currentArray,
      };
    });
  };

  const removeArrayItem = (arrayKey: string, index: number) => {
    setDraftOverrides((prev) => {
      const currentArray = [...(prev[arrayKey] || [])];
      currentArray.splice(index, 1);
      return {
        ...prev,
        [arrayKey]: currentArray,
      };
    });
  };

  const saveAll = async (): Promise<boolean> => {
    try {
      const res = await fetch("/api/admin/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ overrides: draftOverrides }),
      });
      const data = await res.json();
      if (data.success) {
        setSavedOverrides(draftOverrides);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to save CMS overrides:", err);
      return false;
    }
  };

  const resetDraft = () => {
    setDraftOverrides(savedOverrides);
  };

  const hasUnsavedChanges = JSON.stringify(savedOverrides) !== JSON.stringify(draftOverrides);

  return (
    <CMSContext.Provider
      value={{
        overrides: draftOverrides,
        getOverride,
        updateDraft,
        updateArrayItem,
        addArrayItem,
        removeArrayItem,
        saveAll,
        resetDraft,
        hasUnsavedChanges,
        previewMode,
        setPreviewMode,
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
