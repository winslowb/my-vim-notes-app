import React from "react"
/**
 * Detects URLs for PDF, image, or Google Drive/Docs and renders the preview/embed.
 */
export function EmbedPreview({ markdown }: { markdown: string }) {
  // Simple regexes!
  const urlMatch = markdown.match(/(https?:\/\/[^\s)]+)/i);
  if (!urlMatch) return null;
  const url = urlMatch[1];

  // Embed image
  if (url.match(/\.(png|jpeg|jpg|gif|bmp|svg)$/i)) {
    return <img src={url} alt="embed" style={{ maxWidth: "100%", maxHeight: 240, marginTop: 10 }} />;
  }

  // Embed PDF
  if (url.match(/\.pdf(\?|$)/i)) {
    return (
      <iframe
        src={url}
        style={{ width: "100%", height: 320, border: "none", marginTop: 10 }}
        title="PDF embed"
      />
    );
  }

  // Embed Google Drive Doc/Sheet
  const googleDocMatch = url.match(/docs\.google\.com\/(document|spreadsheets)\/d\/([a-zA-Z0-9-_]+)/i);
  if (googleDocMatch) {
    return (
      <iframe
        src={url.replace("/edit", "/preview")}
        style={{ width: "100%", height: 320, border: "none", marginTop: 10 }}
        title="Google Doc embed"
      />
    );
  }

  // You can go wild with YouTube, Miro, whatever: add more match cases.
  
  // Show nothing (or a link) by default
  return null;
}
