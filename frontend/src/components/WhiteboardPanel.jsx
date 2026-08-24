import React from "react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

export default function WhiteboardPanel() {
  return (
    <div className="w-full h-full relative border border-base-300 rounded-lg overflow-hidden">
      <Tldraw />
    </div>
  );
}
