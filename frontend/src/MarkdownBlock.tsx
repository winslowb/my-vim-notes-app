import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { gruvboxDark } from "@uiw/codemirror-theme-gruvbox-dark";
import { eclipse } from "@uiw/codemirror-theme-eclipse";
import { vim } from "@replit/codemirror-vim";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

// 1. EmbedPreview is a top-level function
export function EmbedPreview({ markdown }: { markdown: string }) {
  const [height, setHeight] = React.useState(220);
  // Simple regex extract for demo
  const urlMatch = markdown.match(/(https?:\/\/[^\s)]+)/i);
  if (!urlMatch) return null; // nothing to embed
  const url = urlMatch[1];

  // Only show ResizableBox for images/PDFs
  if (url.match(/\.(png|jpeg|jpg|gif|bmp|svg)$/i) || url.match(/\.pdf(\?|$)/i)) {
    // Use <iframe> for pdf, <img> for images
    return (
      <ResizableBox
        width={Infinity}
        height={height}
        minConstraints={[100, 120]}
        maxConstraints={[Infinity, 600]}
        axis="y"
        onResize={(_e, data) => setHeight(data.size.height)}
      >
        {url.match(/\.pdf(\?|$)/i) ? (
          <iframe
            src={url}
            style={{ width: "100%", height: "100%", border: "none", marginTop: 10 }}
            title="PDF embed"
          />
        ) : (
          <img
            src={url}
            alt="embed"
            style={{ width: "100%", height: "100%", objectFit: "contain", marginTop: 10 }}
          />
        )}
      </ResizableBox>
    )
  }

  // Add more handlers for Google Docs/Sheets or just show nothing
  return null;
}

// 2. MarkdownBlock is another top-level function, and uses EmbedPreview below
export function MarkdownBlock({
  value,
  onChange,
  theme,
}: {
  value: string;
  onChange: (val: string) => void;
  theme: "dark" | "light";
}) {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <CodeMirror
        value={value}
        height="100%"
        theme={theme === "dark" ? gruvboxDark : eclipse}
        extensions={[markdown(), vim()]}
        onChange={onChange}
        autoFocus={false}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
        }}
        style={{ height: "100%" }}
      />
      {/* ADD the preview right here after the editor */}
      <EmbedPreview markdown={value} />
    </div>
  );
}
