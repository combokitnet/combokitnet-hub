"use client";

interface Toolkit {
    id: string;
    name: string;
    code?: string;
}

interface PreviewModeProps {
    toolkit: Toolkit;
    onClose: () => void;
    onEdit: () => void;
}

export default function PreviewMode({ toolkit, onClose, onEdit }: PreviewModeProps) {
    return (
        <div className="h-screen flex flex-col bg-slate-950">
            {/* Minimal Header */}
            <header className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/50 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors p-1"
                        title="Back to details"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h1 className="text-sm font-semibold text-white">{toolkit.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onEdit}
                        className="px-3 py-1.5 rounded-lg border border-blue-500/50 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors flex items-center gap-1.5 text-sm"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </button>
                </div>
            </header>

            {/* Full-screen Toolkit */}
            <div className="flex-1 bg-white">
                {toolkit.code && (
                    <iframe
                        srcDoc={toolkit.code}
                        className="w-full h-full border-none"
                        title="Toolkit Preview"
                        sandbox="allow-scripts allow-forms allow-modals"
                    />
                )}
            </div>
        </div>
    );
}
