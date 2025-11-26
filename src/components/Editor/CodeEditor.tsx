"use client";

import React from "react";
import Editor, { OnMount } from "@monaco-editor/react";

interface CodeEditorProps {
    value: string;
    onChange?: (value: string | undefined) => void;
    language?: string;
    height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
    value,
    onChange,
    language = "javascript",
    height = "500px",
}) => {
    const handleEditorDidMount: OnMount = (editor, monaco) => {
        // Optional: Configure editor settings here
        monaco.editor.defineTheme("custom-dark", {
            base: "vs-dark",
            inherit: true,
            rules: [],
            colors: {
                "editor.background": "#1e1e1e",
            },
        });
        monaco.editor.setTheme("custom-dark");
    };

    return (
        <Editor
            height={height}
            defaultLanguage={language}
            language={language}
            value={value}
            onChange={onChange}
            theme="vs-dark"
            onMount={handleEditorDidMount}
            options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 },
            }}
        />
    );
};

export default CodeEditor;
