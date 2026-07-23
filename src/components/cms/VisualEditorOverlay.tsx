"use client";

import { useEffect, useState } from "react";
import { useCMS, CMSElementMeta } from "@/context/CMSContext";
import { Edit3, Image as ImageIcon, Link as LinkIcon, Type, Video } from "lucide-react";

export default function VisualEditorOverlay() {
  const { isAdmin, isVisualEditActive, setSelectedElementMeta, draft } = useCMS();
  const [hoveredRect, setHoveredRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
    cmsId: string;
    cmsSection: string;
    cmsType: string;
  } | null>(null);

  useEffect(() => {
    if (!isAdmin || !isVisualEditActive) {
      setHoveredRect(null);
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cms-id]") as HTMLElement | null;
      if (target) {
        const cmsId = target.getAttribute("data-cms-id") || "";
        const cmsSection = target.getAttribute("data-cms-section") || "global";
        const cmsType = target.getAttribute("data-cms-type") || "text";

        const rect = target.getBoundingClientRect();
        setHoveredRect({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
          cmsId,
          cmsSection,
          cmsType,
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cms-id]") as HTMLElement | null;
      if (target) {
        e.preventDefault();
        e.stopPropagation();

        const cmsId = target.getAttribute("data-cms-id") || "";
        const cmsSection = target.getAttribute("data-cms-section") || "global";
        const cmsType = target.getAttribute("data-cms-type") || "text";
        const label = target.getAttribute("data-cms-label") || cmsId;

        const currentValue = draft[cmsId] !== undefined ? draft[cmsId] : target.innerText || target.getAttribute("src") || "";

        setSelectedElementMeta({
          cmsId,
          cmsSection,
          cmsType,
          label,
          currentValue,
        });
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("click", handleClick, true);
    };
  }, [isAdmin, isVisualEditActive, draft, setSelectedElementMeta]);

  if (!isAdmin || !isVisualEditActive || !hoveredRect) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: `${hoveredRect.top}px`,
        left: `${hoveredRect.left}px`,
        width: `${hoveredRect.width}px`,
        height: `${hoveredRect.height}px`,
        pointerEvents: "none",
        zIndex: 9999,
      }}
      className="border-2 border-[#0B63CE] rounded-lg shadow-lg bg-[#0B63CE]/10 transition-all duration-150 animate-pulse"
    >
      <div className="absolute -top-7 left-0 bg-[#0B63CE] text-white text-[10px] font-bold px-2 py-0.5 rounded-t-md flex items-center gap-1 shadow-md uppercase tracking-wider">
        <Edit3 className="w-3 h-3" />
        <span>{hoveredRect.cmsId}</span>
        <span className="text-[#38BDF8] font-mono">({hoveredRect.cmsType})</span>
      </div>
    </div>
  );
}
