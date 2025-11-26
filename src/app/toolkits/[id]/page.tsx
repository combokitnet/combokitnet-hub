"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Toast from "@/components/Toast";
import PreviewMode from "@/components/ToolkitDetail/PreviewMode";
import ViewMode from "@/components/ToolkitDetail/ViewMode";
import EditMode from "@/components/ToolkitDetail/EditMode";

interface Toolkit {
    id: string;
    name: string;
    description: string;
    prompt: string;
    filePath: string;
    createdAt: string;
    code?: string;
}

interface ToastMessage {
    message: string;
    type: 'success' | 'error' | 'info';
}

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

type ViewModeType = 'view' | 'edit' | 'preview';

export default function ToolkitDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    
    const [toolkit, setToolkit] = useState<Toolkit | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [toast, setToast] = useState<ToastMessage | null>(null);
    
    // Edit mode states
    const [viewMode, setViewMode] = useState<ViewModeType>('view');
    const [editedCode, setEditedCode] = useState("");
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (id) {
            fetchToolkit();
        }
    }, [id]);

    const fetchToolkit = async () => {
        try {
            const response = await fetch(`/api/toolkits/${id}`);
            const data = await response.json();
            if (data.success) {
                setToolkit(data.data);
                setEditedCode(data.data.code || "");
            } else {
                setToast({ message: "Toolkit not found", type: 'error' });
            }
        } catch (error) {
            console.error("Error fetching toolkit:", error);
            setToast({ message: "Failed to load toolkit", type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this toolkit?")) return;

        setDeleting(true);
        try {
            const response = await fetch(`/api/toolkits/${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (data.success) {
                setToast({ message: "Toolkit deleted successfully", type: 'success' });
                setTimeout(() => router.push("/toolkits"), 1500);
            } else {
                setToast({ message: "Failed to delete toolkit", type: 'error' });
            }
        } catch (error) {
            console.error("Error deleting toolkit:", error);
            setToast({ message: "Failed to delete toolkit", type: 'error' });
        } finally {
            setDeleting(false);
        }
    };

    const handleDownload = () => {
        if (!toolkit?.code) return;
        
        const blob = new Blob([toolkit.code], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${toolkit.name.replace(/\s+/g, '-').toLowerCase()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        setToast({ message: "Downloaded successfully!", type: 'success' });
    };

    const handleSaveChanges = async () => {
        if (!editedCode || !toolkit) return;

        setSaving(true);
        try {
            const response = await fetch(`/api/toolkits/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: editedCode,
                }),
            });

            const data = await response.json();
            if (data.success) {
                setToast({ message: "Changes saved successfully!", type: 'success' });
                setToolkit({ ...toolkit, code: editedCode });
                setViewMode('view');
            } else {
                setToast({ message: "Failed to save changes", type: 'error' });
            }
        } catch (error) {
            console.error("Error saving changes:", error);
            setToast({ message: "Failed to save changes", type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    const handleCancelEdit = () => {
        setEditedCode(toolkit?.code || "");
        setChatMessages([]);
        setViewMode('view');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
                <svg className="animate-spin w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        );
    }

    if (!toolkit) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Toolkit not found</h1>
                    <Link href="/toolkits" className="text-blue-400 hover:underline">
                        Back to toolkits
                    </Link>
                </div>
            </div>
        );
    }

    // Render appropriate mode
    if (viewMode === 'preview') {
        return (
            <>
                <PreviewMode
                    toolkit={toolkit}
                    onClose={() => setViewMode('view')}
                    onEdit={() => setViewMode('edit')}
                />
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </>
        );
    }

    if (viewMode === 'edit') {
        return (
            <>
                <EditMode
                    code={editedCode}
                    onCodeChange={setEditedCode}
                    onSave={handleSaveChanges}
                    onCancel={handleCancelEdit}
                    saving={saving}
                    chatMessages={chatMessages}
                    onChatMessagesChange={setChatMessages}
                />
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </>
        );
    }

    return (
        <>
            <ViewMode
                toolkit={toolkit}
                onPreview={() => setViewMode('preview')}
                onEdit={() => setViewMode('edit')}
                onDownload={handleDownload}
                onDelete={handleDelete}
                deleting={deleting}
            />
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );
}
