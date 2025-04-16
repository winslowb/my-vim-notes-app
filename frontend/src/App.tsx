
import React, { useState, useEffect } from 'react';
import { MarkdownBlock } from './MarkdownBlock';
import GridLayout, { Layout } from "react-grid-layout";
import "react-resizable/css/styles.css";
import "react-grid-layout/css/styles.css";
import { EmbedPreview } from "./EmbedPreview";
import "./App.css";

type Block = {
  id: string;
  content: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const defaultBlocks: Block[] = [
  {
    id: crypto.randomUUID(),
    content: "## Block 1\nType here...",
    x: 0, y: 0, w: 6, h: 6,
  },
  {
    id: crypto.randomUUID(),
    content: "## Block 2\nDrag me side by side!",
    x: 6, y: 0, w: 6, h: 6,
  }
];

function App() {
  const [blocks, setBlocks] = useState<Block[]>(defaultBlocks);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  function onLayoutChange(newLayout: Layout[]) {
    setBlocks(blocks =>
      blocks.map((block) => {
        const layout = newLayout.find(l => l.i === block.id);
        return layout
          ? { ...block, x: layout.x, y: layout.y, w: layout.w, h: layout.h }
          : block;
      })
    );
  }

  function updateBlock(id: string, newContent: string) {
    setBlocks(blocks =>
      blocks.map(
        block => block.id === id ? { ...block, content: newContent } : block
      )
    );
  }

  function removeBlock(id: string) {
    setBlocks(blocks => blocks.length > 1 ? blocks.filter(block => block.id !== id) : blocks);
  }

  function addBlock() {
    // Default to a new block in the top left (could randomize position if you want)
    setBlocks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        content: "## New Block\nType here...",
        x: 0,
        y: Infinity, // adds to bottom row
        w: 6,
        h: 6,
      },
    ]);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: theme === 'dark' ? "#282828" : "#f9f5d7",
      padding: 32,
    }}>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
      <button style={{ marginLeft: 8 }} onClick={addBlock}>
        + Add Block
      </button>
      <div style={{ marginTop: 16 }}>
        <GridLayout
          className="layout"
          layout={blocks.map(b => ({
            i: b.id,
            x: b.x,
            y: b.y,
            w: b.w,
            h: b.h,
          }))}
          cols={12}
          rowHeight={40}
          width={1200}
          compactType={null} // Notion/Miro-like, disables automatic stacking
          onLayoutChange={onLayoutChange}
          draggableHandle=".block_drag_handle"
        >
          {blocks.map((block) => (
            <div key={block.id} style={{
              background: theme === "dark" ? "#3c3836" : "#fbf1c7",
              padding: 0,
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 2px 8px #0003",
              display: 'flex',
              flexDirection: 'column',
              height: "100%"
            }}>
              <div className="block_drag_handle"
                style={{
                  cursor: "grab",
                  marginBottom: 6,
                  color: "#b16286",
                  fontWeight: "bold",
                  userSelect: "none"
                }}
              >
                &#x2630; Drag/Resize Block
              </div>
              <MarkdownBlock
                value={block.content}
                onChange={val => updateBlock(block.id, val)}
                theme={theme}
                minHeight={40}
              />
              <EmbedPreview markdown={block.content} />

              <button
                onClick={() => removeBlock(block.id)}
                disabled={blocks.length === 1}
                style={{ marginTop: 8, color: "#d65d0e" }}
              >
                Delete
              </button>
            </div>
          ))}
        </GridLayout>
      </div>
    </div>
  );
}
export default App;
