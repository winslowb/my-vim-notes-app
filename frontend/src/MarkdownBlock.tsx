import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { gruvboxDark } from "@uiw/codemirror-theme-gruvbox-dark";
import { eclipse } from "@uiw/codemirror-theme-eclipse";
import { vim } from "@replit/codemirror-vim";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

export function MarkdownBlock({
  value,
  onChange,
  theme,
  minHeight = 120,
}: {
  value: string;
  onChange: (val: string) => void;
  theme: "dark" | "light";
  minHeight?: number;
}) {
  const [height, setHeight] = React.useState(200);
  const [width, setWidth] = React.useState(600);

  return (
    <ResizableBox
      width={width}
      height={height}
      minConstraints={[100, minHeight]}
      maxConstraints={[Infinity, 600]}
      axis="both"
      onResize={(_e, data) => {
        setHeight(data.size.height);
        setWidth(data.size.width);
      }}
    >
      <div style={{ width: "100%" }}>
        <CodeMirror
          value={value}
          height={`${height}px`}
          theme={theme === "dark" ? gruvboxDark : eclipse}
          extensions={[markdown(), vim()]}
          onChange={onChange}
          autoFocus={false}
          basicSetup={{
            lineNumbers: false,
            foldGutter: false,
          }}
        />
      </div>
    </ResizableBox>
  );
}
