import React, { useState, useEffect } from 'react';
import { MarkdownBlock } from './MarkdownBlock';
import "react-resizable/css/styles.css";
import "./App.css";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from '@hello-pangea/dnd';

type Block = {
  id: string;
  content: string;
};

function App() {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: crypto.randomUUID(), content: '## Block 1\nType here...' },
  ]);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Set body class for theme-specific CSS overrides
  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  function updateBlock(id: string, newContent: string) {
    setBlocks(blocks => blocks.map(
      block => block.id === id ? { ...block, content: newContent } : block
    ));
  }

  function removeBlock(id: string) {
    setBlocks(blocks => blocks.length > 1 ? blocks.filter(block => block.id !== id) : blocks);
  }

  // Drag and drop reorder function:
  function handleDragEnd(result: DropResult) {
    if (!result.destination) return;
    const items = Array.from(blocks);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setBlocks(items);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme === 'dark' ? "#282828" : "#f9f5d7",
        padding: 32,
      }}
    >
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
      <div style={{ marginTop: 16 }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="blocks-droppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {blocks.map((block, idx) => (
                  <Draggable key={block.id} draggableId={block.id} index={idx}>
                    {(providedDrag, snapshot) => (
                      <div
                        ref={providedDrag.innerRef}
                        {...providedDrag.draggableProps}
                        // Only the top "bar" is the drag handle, not the editor itself
                        style={{
                          ...providedDrag.draggableProps.style,
                          margin: "24px 0",
                          padding: 16,
                          background: theme === "dark" ? "#3c3836" : "#fbf1c7",
                          boxShadow: snapshot.isDragging ? "0 4px 16px #0008" : undefined
                        }}
                      >
                        {/* Drag handle: grab here to move */}
                        <div
                          {...providedDrag.dragHandleProps}
                          style={{
                            cursor: "grab",
                            marginBottom: 8,
                            color: "#b16286",
                            fontWeight: "bold"
                          }}
                        >
                          &#x2630; Drag Block
                        </div>
                        <MarkdownBlock
                          value={block.content}
                          onChange={(val) => updateBlock(block.id, val)}
                          theme={theme}
                        />
                        <button
                          onClick={() => removeBlock(block.id)}
                          disabled={blocks.length === 1}
                          style={{ marginTop: 8, color: "#d65d0e" }}
                        >
                          Delete
                        </button>
                        {/* Insert button and others... */}
                        {idx > 0 && (
                          <button
                            style={{
                              display: "block",
                              margin: "8px auto",
                              background: "#458588",
                              color: "white"
                            }}
                            onClick={() => {
                              const copy = [...blocks];
                              copy.splice(idx, 0, {
                                id: crypto.randomUUID(),
                                content: "## New Block\n"
                              });
                              setBlocks(copy);
                            }}
                          >
                            + Add Block Above
                          </button>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {/* Button to add at end */}
        <button
          style={{
            display: "block",
            margin: "0 auto",
            background: "#458588",
            color: "white"
          }}
          onClick={() =>
            setBlocks((blocks) => [
              ...blocks,
              { id: crypto.randomUUID(), content: "## New Block\n" }
            ])
          }
        >
          + Add Block At End
        </button>
      </div>
    </div>
  );
}

export default App;
