"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Toolkit {
    id: number;
    name: string;
    description: string;
    prompt: string;
    createdAt: string;
}

export default function ToolkitsPage() {
    const [toolkits, setToolkits] = useState<Toolkit[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchToolkits();
    }, []);

    const fetchToolkits = async () => {
        try {
            const response = await fetch("/api/toolkits");
            const data = await response.json();
            if (data.success) {
                setToolkits(data.data);
            }
        } catch (error) {
            console.error("Error fetching toolkits:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header */}
            <header className="border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent no-underline hover:opacity-80 transition-opacity">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        ComboKit.Net
                    </Link>
                    
                    <Link 
                        href="/create"
                        className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                        Create New
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        My Toolkits
                    </h1>
                    <p className="text-slate-400">
                        {toolkits.length} toolkit{toolkits.length !== 1 ? 's' : ''} saved
                    </p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <svg className="animate-spin w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                ) : toolkits.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                        <svg className="w-20 h-20 mb-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-lg mb-2">No toolkits yet</p>
                        <p className="text-sm text-slate-600 mb-6">Create your first toolkit to get started</p>
                        <Link 
                            href="/create"
                            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold hover:opacity-90 transition-opacity"
                        >
                            Create Toolkit
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {toolkits.map((toolkit) => (
                            <Link
                                key={toolkit.id}
                                href={`/toolkits/${toolkit.id}`}
                                className="group block bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 no-underline"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                        </svg>
                                    </div>
                                    <span className="text-xs text-slate-500">
                                        #{toolkit.id}
                                    </span>
                                </div>
                                
                                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                                    {toolkit.name}
                                </h3>
                                
                                <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                                    {toolkit.description}
                                </p>
                                
                                <div className="flex items-center justify-between text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {new Date(toolkit.createdAt).toLocaleDateString()}
                                    </span>
                                    <span className="text-blue-400 group-hover:translate-x-1 transition-transform">
                                        View →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
