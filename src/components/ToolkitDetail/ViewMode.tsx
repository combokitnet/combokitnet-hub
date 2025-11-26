"use client";

import { useState } from "react";
import Link from "next/link";
import CodeEditor from "@/components/Editor/CodeEditor";

interface Toolkit {
    id: string;
    name: string;
    description: string;
    prompt: string;
    filePath: string;
    createdAt: string;
    code?: string;
}

interface ViewModeProps {
    toolkit: Toolkit;
    onPreview: () => void;
    onEdit: () => void;
    onDownload: () => void;
    onDelete: () => void;
    deleting: boolean;
}

export default function ViewMode({ 
    toolkit, 
    onPreview, 
    onEdit, 
    onDownload, 
    onDelete, 
    deleting 
}: ViewModeProps) {
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
            {/* Header */}
            <header className="border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-xl">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/toolkits" className="text-slate-400 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold">{toolkit.name}</h1>
                            <p className="text-xs text-slate-500">ID: {toolkit.id} • Created {new Date(toolkit.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onPreview}
                            className="px-4 py-2 rounded-lg border border-pink-500/50 bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                            </svg>
                            Use Toolkit
                        </button>
                        <button
                            onClick={onEdit}
                            className="px-4 py-2 rounded-lg border border-blue-500/50 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                        </button>
                        <button
                            onClick={onDownload}
                            className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download
                        </button>
                        <button
                            onClick={onDelete}
                            disabled={deleting}
                            className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {deleting ? (
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            )}
                            Delete
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden">
                {/* Left: Code Editor */}
                <div className="flex-1 flex flex-col border-r border-slate-800/50">
                    <div className="px-5 py-3 bg-slate-900/50 border-b border-slate-800/50 flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1">
                            <button
                                onClick={() => setActiveTab('preview')}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                                    activeTab === 'preview' 
                                        ? 'bg-pink-500 text-white' 
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                Preview
                            </button>
                            <button
                                onClick={() => setActiveTab('code')}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                                    activeTab === 'code' 
                                        ? 'bg-purple-500 text-white' 
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                Code
                            </button>
                        </div>
                        <span className="text-xs text-slate-500">{toolkit.prompt}</span>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        {activeTab === 'preview' ? (
                            <div className="h-full bg-white">
                                {toolkit.code && (
                                    <iframe
                                        srcDoc={toolkit.code}
                                        className="w-full h-full border-none"
                                        title="Preview"
                                        sandbox="allow-scripts"
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="h-full bg-[#1e1e1e]">
                                {toolkit.code && (
                                    <CodeEditor
                                        value={toolkit.code}
                                        onChange={() => {}} // Read-only
                                        language="html"
                                        height="100%"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Info Panel */}
                <div className="w-96 bg-slate-900/50 p-6 overflow-y-auto">
                    <h2 className="text-lg font-bold mb-4">Toolkit Information</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-slate-500 uppercase tracking-wide">Name</label>
                            <p className="text-white mt-1">{toolkit.name}</p>
                        </div>
                        
                        <div>
                            <label className="text-xs text-slate-500 uppercase tracking-wide">Description</label>
                            <p className="text-slate-300 mt-1 text-sm">{toolkit.description}</p>
                        </div>
                        
                        <div>
                            <label className="text-xs text-slate-500 uppercase tracking-wide">Original Prompt</label>
                            <p className="text-slate-300 mt-1 text-sm bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                                {toolkit.prompt}
                            </p>
                        </div>
                        
                        <div>
                            <label className="text-xs text-slate-500 uppercase tracking-wide">File Path</label>
                            <p className="text-slate-400 mt-1 text-xs font-mono">{toolkit.filePath}</p>
                        </div>
                        
                        <div>
                            <label className="text-xs text-slate-500 uppercase tracking-wide">Created</label>
                            <p className="text-white mt-1">{new Date(toolkit.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
