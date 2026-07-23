import React from "react";

interface SmartTextRendererProps {
  text: string;
  className?: string;
  paragraphClassName?: string;
  as?: React.ElementType;
}

/**
 * SmartTextRenderer
 * Renders text with Smart Text Wrapping:
 * 1. Double Enter (\n\n) -> Renders separate <p> paragraphs.
 * 2. Single Enter (\n)  -> Preserved with white-space: pre-line.
 * 3. 100% Safe rendering (no dangerous innerHTML), zero Vietnamese word splitting.
 */
export default function SmartTextRenderer({
  text,
  className = "",
  paragraphClassName = "",
  as: Component = "div",
}: SmartTextRendererProps) {
  if (!text) return null;

  // Split text by double newlines (\n\n) into paragraphs
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <Component className={`smart-paragraph ${className}`}>
      {paragraphs.map((para, idx) => (
        <p
          key={idx}
          className={`leading-relaxed [text-wrap:pretty] overflow-wrap-break-word whitespace-pre-line ${
            idx > 0 ? "mt-3" : ""
          } ${paragraphClassName}`}
        >
          {para}
        </p>
      ))}
    </Component>
  );
}
