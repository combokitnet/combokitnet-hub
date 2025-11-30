import Link from "next/link";

export default function Home() {
    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900 p-8 font-sans overflow-hidden">
            {/* Animated background gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/40 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 text-center max-w-5xl w-full mb-20 animate-fade-in">
                <div className="mb-6 inline-block">
                    <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-300 text-sm font-medium text-blue-700 backdrop-blur-sm">
                        ✨ Powered by AI
                    </span>
                </div>
                
                <h1 className="text-7xl md:text-9xl font-black mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tighter leading-none animate-gradient bg-[length:200%_auto]">
                    ComboKit.Net
                    <br />
                    <span className="text-6xl md:text-8xl">Platform</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
                    Generate powerful web tools in seconds. Edit with a professional code editor. Preview in real-time.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link 
                        href="/create" 
                        className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/50 overflow-hidden"
                    >
                        <span className="relative z-10">Start Creating</span>
                        <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Link>
                    
                    <Link 
                        href="/toolkits" 
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold text-lg transition-all duration-300 hover:border-gray-400 hover:bg-gray-100 backdrop-blur-sm"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        View Toolkits
                    </Link>
                    
                    <a 
                        href="#features" 
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold text-lg transition-all duration-300 hover:border-gray-400 hover:bg-gray-100 backdrop-blur-sm"
                    >
                        Learn More
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                </div>
            </div>
            
            <div id="features" className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                <div className="group relative bg-gradient-to-br from-white/80 to-gray-50/80 p-8 rounded-2xl border border-gray-200 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                    <div className="relative">
                        <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-gray-900">AI Generation</h3>
                        <p className="text-gray-600 leading-relaxed">Describe your tool and let AI build it instantly with cutting-edge technology.</p>
                    </div>
                </div>
                
                <div className="group relative bg-gradient-to-br from-white/80 to-gray-50/80 p-8 rounded-2xl border border-gray-200 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                    <div className="relative">
                        <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-gray-900">Code Editor</h3>
                        <p className="text-gray-600 leading-relaxed">Full control with a powerful Monaco-based editor, just like VS Code.</p>
                    </div>
                </div>
                
                <div className="group relative bg-gradient-to-br from-white/80 to-gray-50/80 p-8 rounded-2xl border border-gray-200 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-pink-300 hover:shadow-xl hover:shadow-pink-500/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                    <div className="relative">
                        <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-gray-900">Live Preview</h3>
                        <p className="text-gray-600 leading-relaxed">See your changes in real-time as you edit, no refresh needed.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
