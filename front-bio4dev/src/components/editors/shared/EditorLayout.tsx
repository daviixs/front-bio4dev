import React from "react";

interface EditorLayoutProps {
  children: React.ReactNode;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({ children }) => {
  return (
    <div className="editor-layout">
      <div className="editor-header">
        <h1 className="text-xl font-bold">Edit Your Portfolio</h1>
      </div>
      <div className="editor-content">
        {children}
      </div>
    </div>
  );
};

export default EditorLayout;