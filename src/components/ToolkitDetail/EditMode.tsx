"use client";

import { useState, useEffect } from "react";
import CodeEditor from "@/components/Editor/CodeEditor";

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

interface EditModeProps {
    code: string;
    onCodeChange: (code: string) => void;
    onSave: () => void;
    onCancel: () => void;
    saving: boolean;
    chatMessages: ChatMessage[];
    onChatMessagesChange: (messages: ChatMessage[]) => void;
}

type EditorTab = 'chat' | 'code';

export default function EditMode({
    code,
    onCodeChange,
    onSave,
    onCancel,
    saving,
    chatMessages,
    onChatMessagesChange
}: EditModeProps) {
    const [editorTab, setEditorTab] = useState<EditorTab>('chat');
    const [chatInput, setChatInput] = useState("");
    const [chatLoading, setChatLoading] = useState(false);
    const [leftPanelWidth, setLeftPanelWidth] = useState(50);
    const [isResizing, setIsResizing] = useState(false);

    useEffect(() => {
        let animationFrameId: number | null = null;

        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;
            
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }

            animationFrameId = requestAnimationFrame(() => {
                const container = document.getElementById('edit-container');
                if (!container) return;
                
                const containerRect = container.getBoundingClientRect();
                const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
                
                if (newWidth >= 30 && newWidth <= 70) {
                    setLeftPanelWidth(newWidth);
                }
            });
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [isResizing]);

    const handleChatSubmit = async () => {
        if (!chatInput.trim() || !code) return;

        const userMessage = chatInput.trim();
        setChatInput("");
        setChatLoading(true);

        const newMessages = [...chatMessages, { role: 'user' as const, content: userMessage }];
        onChatMessagesChange(newMessages);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    prompt: `Modify this code: ${userMessage}\n\nCurrent code:\n${code}` 
                }),
            });

            const data = await response.json();
            if (data.success) {
                onCodeChange(data.code);
                onChatMessagesChange([...newMessages, { 
                    role: 'assistant', 
                    content: `Updated the code based on your request.` 
                }]);
            }
        } catch (error) {
            console.error("Error in chat:", error);
            onChatMessagesChange([...newMessages, { 
                role: 'assistant', 
                content: 'Sorry, there was an error processing your request.' 
            }]);
        } finally {
            setChatLoading(false);
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
            {/* Header */}
            <header className="border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-xl">
                <div className="px-6 py-4 flex items-center justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        disabled={saving}
                        className="px-4 py-2 rounded-lg border-2 border-green-500/50 bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {saving ? (
                            <>
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                </svg>
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main id="edit-container" className="flex-1 flex relative overflow-hidden">
                {/* Left: Chat or Code Editor */}
                <div 
                    className="flex flex-col border-r border-slate-800/50" 
                    style={{ 
                        width: `${leftPanelWidth}%`,
                        willChange: isResizing ? 'width' : 'auto'
                    }}
                >
                    <div className="px-5 py-3.5 bg-slate-900/50 border-b border-slate-800/50 flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1">
                            <button
                                onClick={() => setEditorTab('chat')}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                                    editorTab === 'chat' 
                                        ? 'bg-blue-500 text-white' 
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    Chat
                                </span>
                            </button>
                            <button
                                onClick={() => setEditorTab('code')}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                                    editorTab === 'code' 
                                        ? 'bg-purple-500 text-white' 
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                    Code
                                </span>
                            </button>
                        </div>
                    </div>

                    {editorTab === 'chat' ? (
                        <div className="flex-1 flex flex-col overflow-hidden bg-slate-900/30">
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {chatMessages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-slate-500">
                                        <svg className="w-16 h-16 mb-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        <p className="text-sm mb-2">Ask me to modify the code</p>
                                        <p className="text-xs text-slate-600">e.g., "Add a dark mode toggle"</p>
                                    </div>
                                ) : (
                                    chatMessages.map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[80%] px-4 py-2 rounded-lg ${
                                                msg.role === 'user' 
                                                    ? 'bg-blue-600 text-white' 
                                                    : 'bg-slate-800 text-slate-200'
                                            }`}>
                                                <p className="text-sm">{msg.content}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                                {chatLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-slate-800 text-slate-200 px-4 py-2 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span className="text-sm">Thinking...</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 border-t border-slate-800/50 bg-slate-900/50">
                                <div className="flex gap-2 items-end">
                                    <textarea
                                        className="flex-1 px-4 py-3 rounded-lg border border-slate-700/50 bg-slate-800/50 text-white text-sm outline-none transition-all duration-200 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-500 resize-none min-h-[48px] max-h-[200px]"
                                        placeholder="Ask to modify the code (e.g., 'Add a dark mode toggle')"
                                        value={chatInput}
                                        onChange={(e) => {
                                            setChatInput(e.target.value);
                                            e.target.style.height = 'auto';
                                            e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                handleChatSubmit();
                                            }
                                        }}
                                        disabled={chatLoading}
                                        rows={1}
                                    />
                                    <button
                                        onClick={handleChatSubmit}
                                        disabled={chatLoading || !chatInput.trim()}
                                        className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 h-[48px]"
                                    >
                                        {chatLoading ? (
                                            <>
                                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Updating...
                                            </>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 overflow-hidden bg-[#1e1e1e]">
                            <CodeEditor
                                value={code}
                                onChange={(value) => onCodeChange(value || "")}
                                language="html"
                                height="100%"
                            />
                        </div>
                    )}
                </div>

                {/* Resizer */}
                <div
                    className="w-1 hover:w-1.5 bg-slate-800/50 hover:bg-blue-500/50 cursor-col-resize transition-all relative group flex-shrink-0"
                    onMouseDown={() => setIsResizing(true)}
                >
                    <div className="absolute inset-y-0 -left-1 -right-1" />
                </div>

                {/* Right: Live Preview */}
                <div 
                    className="flex flex-col" 
                    style={{ 
                        width: `${100 - leftPanelWidth}%`,
                        willChange: isResizing ? 'width' : 'auto'
                    }}
                >
                    <div className="px-5 py-3.5 bg-slate-900/50 border-b border-slate-800/50 text-sm font-semibold text-slate-300 flex items-center gap-2">
                        <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>Live Preview</span>
                    </div>
                    <div className="flex-1 bg-white">
                        <iframe
                            srcDoc={code}
                            className="w-full h-full border-none"
                            title="Preview"
                            sandbox="allow-scripts"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
