"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CodeEditor from "@/components/Editor/CodeEditor";
import Toast from "@/components/Toast";

type Mode = 'chat' | 'code';

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

interface ToastMessage {
    message: string;
    type: 'success' | 'error' | 'info';
}

export default function CreatePage() {
    const router = useRouter();
    const [mode, setMode] = useState<Mode>('chat');
    const [prompt, setPrompt] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [generatedName, setGeneratedName] = useState("");
    const [savedToolkitId, setSavedToolkitId] = useState<number | null>(null);
    const [isPublic, setIsPublic] = useState(false);
    const [toast, setToast] = useState<ToastMessage | null>(null);
    
    // Chat mode states
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [chatInput, setChatInput] = useState("");
    const [chatLoading, setChatLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt) return;

        setLoading(true);
        setSavedToolkitId(null);
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();
            if (data.success) {
                setCode(data.code);
                setGeneratedName(data.name);
                
                // Add to chat history
                setChatMessages([
                    { role: 'user', content: prompt },
                    { role: 'assistant', content: `Generated: ${data.name}` }
                ]);

                // If toolkit was saved, set the ID and navigate to detail page
                if (data.id) {
                    setSavedToolkitId(data.id);
                    setToast({ 
                        message: `✅ Toolkit saved! Redirecting...`, 
                        type: 'success' 
                    });
                    setTimeout(() => {
                        router.push(`/toolkits/${data.id}`);
                    }, 1000);
                }
            }
        } catch (error) {
            console.error("Error generating toolkit:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChatSubmit = async () => {
        if (!chatInput.trim() || !code) return;

        const userMessage = chatInput.trim();
        setChatInput("");
        setChatLoading(true);

        // Add user message to chat
        const newMessages = [...chatMessages, { role: 'user' as const, content: userMessage }];
        setChatMessages(newMessages);

        try {
            // Call API to modify code based on chat input
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
                setCode(data.code);
                setChatMessages([...newMessages, { 
                    role: 'assistant', 
                    content: `Updated the code based on your request.` 
                }]);
            }
        } catch (error) {
            console.error("Error in chat:", error);
            setChatMessages([...newMessages, { 
                role: 'assistant', 
                content: 'Sorry, there was an error processing your request.' 
            }]);
        } finally {
            setChatLoading(false);
        }
    };

    const handleSave = async () => {
        if (!code || !generatedName) {
            setToast({ message: "Please generate a toolkit first!", type: 'error' });
            return;
        }

        // If already saved, update it
        if (savedToolkitId) {
            setSaving(true);
            try {
                const response = await fetch(`/api/toolkits/${savedToolkitId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: generatedName,
                        description: `Generated from prompt: ${prompt}`,
                        code: code,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Server returned non-JSON response");
                }

                const data = await response.json();
                if (data.success) {
                    setToast({ 
                        message: `✅ Toolkit updated successfully!`, 
                        type: 'success' 
                    });
                } else {
                    setToast({ 
                        message: `Failed to update: ${data.error}`, 
                        type: 'error' 
                    });
                }
            } catch (error) {
                console.error("Error updating toolkit:", error);
                setToast({ 
                    message: "Failed to update toolkit. Please try again.", 
                    type: 'error' 
                });
            } finally {
                setSaving(false);
            }
            return;
        }

        // Otherwise, create new
        setSaving(true);
        try {
            const response = await fetch("/api/toolkits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: generatedName,
                    description: `Generated from prompt: ${prompt}`,
                    code: code,
                    prompt: prompt,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Server returned non-JSON response");
            }

            const data = await response.json();
            if (data.success) {
                setSavedToolkitId(data.data.id);
                setToast({ 
                    message: `✅ Toolkit saved successfully! (ID: ${data.data.id})`, 
                    type: 'success' 
                });
            } else {
                setToast({ 
                    message: `Failed to save: ${data.error}`, 
                    type: 'error' 
                });
            }
        } catch (error) {
            console.error("Error saving toolkit:", error);
            setToast({ 
                message: "Failed to save toolkit. Please try again.", 
                type: 'error' 
            });
        } finally {
            setSaving(false);
        }
    };

    const handlePublish = async () => {
        if (!savedToolkitId) {
            setToast({ 
                message: "Please save the toolkit first before publishing", 
                type: 'error' 
            });
            return;
        }

        setPublishing(true);
        try {
            const response = await fetch(`/api/toolkits/${savedToolkitId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    isPublic: !isPublic,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Server returned non-JSON response");
            }

            const data = await response.json();
            if (data.success) {
                setIsPublic(!isPublic);
                setToast({ 
                    message: `✅ Toolkit ${!isPublic ? 'published' : 'unpublished'} successfully!`, 
                    type: 'success' 
                });
            } else {
                setToast({ 
                    message: `Failed to publish: ${data.error}`, 
                    type: 'error' 
                });
            }
        } catch (error) {
            console.error("Error publishing toolkit:", error);
            setToast({ 
                message: "Failed to publish toolkit. Please try again.", 
                type: 'error' 
            });
        } finally {
            setPublishing(false);
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900 font-sans overflow-hidden">
            {/* Header */}
            <header className="relative px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-xl flex items-center justify-between shadow-lg">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent no-underline hover:opacity-80 transition-opacity">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    ComboKit.Net
                </Link>
                
                {/* Right side - Action buttons */}
                {code && (
                    <div className="flex items-center gap-3">
                        <button
                            className="group relative px-6 py-3.5 rounded-xl border-2 border-green-500/50 bg-green-500/10 text-green-400 font-semibold text-sm cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-green-500/20 hover:border-green-500 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            <span className="flex items-center gap-2">
                                {saving ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {savedToolkitId ? 'Updating...' : 'Saving...'}
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                        </svg>
                                        {savedToolkitId ? 'Update' : 'Save'}
                                    </>
                                )}
                            </span>
                        </button>

                        {savedToolkitId && (
                            <button
                                className="group relative px-6 py-3.5 rounded-xl border-2 border-blue-500/50 bg-blue-500/10 text-blue-400 font-semibold text-sm cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-blue-500/20 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                onClick={handlePublish}
                                disabled={publishing}
                            >
                                <span className="flex items-center gap-2">
                                    {publishing ? (
                                        <>
                                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {isPublic ? 'Unpublishing...' : 'Publishing...'}
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {isPublic ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                                )}
                                            </svg>
                                            {isPublic ? 'Unpublish' : 'Publish'}
                                        </>
                                    )}
                                </span>
                            </button>
                        )}
                    </div>
                )}
            </header>

            <main className="flex-1 flex overflow-hidden">
                {/* Left Pane: Chat or Code Editor */}
                <div className="flex-1 flex flex-col overflow-hidden border-r border-gray-200">
                    <div className="px-5 py-3.5 bg-gray-50/50 backdrop-blur-sm border-b border-gray-200 text-sm font-semibold text-gray-700 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            {/* Mode Toggle */}
                            <div className="flex items-center gap-2 bg-gray-200 rounded-lg p-1">
                                <button
                                    onClick={() => setMode('chat')}
                                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                                        mode === 'chat' 
                                            ? 'bg-blue-500 text-white' 
                                            : 'text-gray-500 hover:text-gray-800'
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
                                    onClick={() => setMode('code')}
                                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                                        mode === 'code' 
                                            ? 'bg-purple-500 text-white' 
                                            : 'text-gray-500 hover:text-gray-800'
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
                        {generatedName && (
                            <span className="text-xs text-gray-500 font-normal px-3 py-1 rounded-full bg-gray-100">
                                {generatedName}
                            </span>
                        )}
                    </div>

                    {mode === 'chat' ? (
                        /* Chat Mode */
                        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50/30">
                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {chatMessages.length === 0 && !code ? (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                        <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        <p className="text-sm mb-2">Start by describing your toolkit</p>
                                        <p className="text-xs text-gray-400">e.g., "Create a password generator"</p>
                                    </div>
                                ) : (
                                    chatMessages.map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[80%] px-4 py-2 rounded-lg ${
                                                msg.role === 'user' 
                                                    ? 'bg-blue-600 text-white' 
                                                    : 'bg-white border border-gray-200 text-gray-800'
                                            }`}>
                                                <p className="text-sm">{msg.content}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                                {chatLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-lg">
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

                            {/* Chat Input - Always visible in chat mode */}
                            <div className="p-4 border-t border-gray-200 bg-white/50">
                                <div className="flex gap-2 items-end">
                                    <textarea
                                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-gray-400 resize-none min-h-[48px] max-h-[200px]"
                                        placeholder={code ? "Ask to modify the code (e.g., 'Add a dark mode toggle')" : "Describe your toolkit (e.g., 'Password Generator')"}
                                        value={code ? chatInput : prompt}
                                        onChange={(e) => {
                                            code ? setChatInput(e.target.value) : setPrompt(e.target.value);
                                            // Auto-resize textarea
                                            e.target.style.height = 'auto';
                                            e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                code ? handleChatSubmit() : handleGenerate();
                                            }
                                        }}
                                        disabled={loading || chatLoading}
                                        rows={1}
                                    />
                                    <button
                                        onClick={code ? handleChatSubmit : handleGenerate}
                                        disabled={loading || chatLoading || (code ? !chatInput.trim() : !prompt.trim())}
                                        className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 h-[48px]"
                                    >
                                        {loading || chatLoading ? (
                                            <>
                                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                {code ? 'Updating...' : 'Generating...'}
                                            </>
                                        ) : (
                                            <>
                                                {code ? (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                    </svg>
                                                ) : (
                                                    <>
                                                        Generate
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                        </svg>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Code Edit Mode */
                        <div className="flex-1 overflow-hidden relative bg-white">
                            {code ? (
                                <CodeEditor
                                    value={code}
                                    onChange={(value) => setCode(value || "")}
                                    language="html"
                                    height="100%"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                    <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                    <p className="text-sm">Your generated code will appear here</p>
                                    <p className="text-xs text-gray-400 mt-2">Switch to Chat mode to generate</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Pane: Live Preview */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-5 py-3.5 bg-gray-50/50 backdrop-blur-sm border-b border-gray-200 text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>Live Preview</span>
                    </div>
                    <div className="flex-1 bg-white relative">
                        {code ? (
                            <iframe
                                srcDoc={code}
                                className="w-full h-full border-none"
                                title="Preview"
                                sandbox="allow-scripts"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500 bg-gray-50">
                                <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <p className="text-sm">Live preview will appear here</p>
                                <p className="text-xs text-gray-400 mt-2">Generate a toolkit to see the preview</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            
            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}
