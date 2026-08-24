import React, { useState } from "react";
import CodeEditorPanel from "./CodeEditorPanel";
import WhiteboardPanel from "./WhiteboardPanel";
import { Code2Icon, LayoutIcon } from "lucide-react";

export default function Workspace({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  const [activeTab, setActiveTab] = useState("editor"); // "editor" | "whiteboard"

  return (
    <div className="flex flex-col h-full bg-base-300">
      {/* Tab Selector Bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-base-200 border-b border-base-300">
        <button
          onClick={() => setActiveTab("editor")}
          className={`btn btn-sm gap-2 ${activeTab === "editor" ? "btn-primary" : "btn-ghost"}`}
        >
          <Code2Icon className="size-4" />
          Code Editor
        </button>
        <button
          onClick={() => setActiveTab("whiteboard")}
          className={`btn btn-sm gap-2 ${activeTab === "whiteboard" ? "btn-primary" : "btn-ghost"}`}
        >
          <LayoutIcon className="size-4" />
          Whiteboard / System Design
        </button>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1 min-h-0 relative">
        {activeTab === "editor" ? (
          <CodeEditorPanel
            selectedLanguage={selectedLanguage}
            code={code}
            isRunning={isRunning}
            onLanguageChange={onLanguageChange}
            onCodeChange={onCodeChange}
            onRunCode={onRunCode}
          />
        ) : (
          <WhiteboardPanel />
        )}
      </div>
    </div>
  );
}
