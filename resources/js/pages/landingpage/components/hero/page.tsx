import CTA from "../cta/button";

export default function Hero() {
    return (
        <section id="hero" className="h-screen w-full bg-black relative overflow-hidden lg:p-20">
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(ellipse 50% 100% at 10% 0%, rgba(226, 232, 240, 0.15), transparent 65%), #000000",
                }}
            />

            <div className="relative z-10 flex gap-1 h-[80vh] px-5 md:px-28 lg:px-30">
                <div className="w-full lg:w-1/2 flex justify-center items-center mt-25 lg:mt-0 ">
                    <div className="text-accent">
                        <div className="bg-[#1e1e1e] shadow-md rounded-full inline-block px-5 py-2 border-white/5">
                            <div
                                className="text-[9px] md:text-xs flex items-center gap-2"
                            >
                                <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse text-white/2"></div>
                                AI-powered categorization
                            </div>
                        </div>
                        <h1 className="font-bold text-2xl md:text-5xl lg:text-7xl mt-5">Turn Feedback Into Better Products</h1>
                        <p className="mt-5 text-sm lg:text-base">Collect feedback, track suggestions, and prioritize features in one clean system. No noise. Just real user-driven product decisions.
                        </p>
                        <CTA />
                    </div>
                </div>

                <div className="hidden lg:w-1/2 relative lg:flex justify-center items-center">
                    <div className="absolute inset-0 z-0 flex items-center justify-center">
                        <div className="h-[400px] w-[400px] bg-violet-600/10 rounded-full blur-[120px] animate-pulse" />
                        <div className="h-[300px] w-[300px] bg-blue-500/5 rounded-full blur-[100px] translate-x-20" />
                    </div>

                    <div className="relative z-10 w-full max-w-md space-y-6">
                        <div className="group relative bg-[#0A0A0A]/80 p-6 rounded-[24px] shadow-2xl backdrop-blur-xl border border-white/10 transition-all duration-500 hover:-translate-y-1 hover:border-violet-500/30">
                            <div className="flex justify-between items-start mb-4">
                                <div className="space-y-1">
                                    <h3 className="text-xl text-white font-medium tracking-tight">Add dark mode</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                                        <span className="text-[10px] uppercase tracking-widest text-emerald-500/80 font-bold">In Progress</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl text-white font-semibold tabular-nums">124</p>
                                    <p className="text-[10px] text-white/30 uppercase tracking-tighter">Votes</p>
                                </div>
                            </div>

                            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full w-[65%] rounded-full transition-all duration-1000 group-hover:w-[70%]" />
                            </div>
                        </div>

                        <div className="relative left-8 bg-[#0F0F0F]/60 p-6 rounded-[24px] shadow-xl backdrop-blur-md border border-white/5 transition-all duration-500 hover:left-6 hover:border-white/10">
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <h3 className="text-lg text-white/90 font-medium tracking-tight">Fix login bug</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                                        <span className="text-[10px] uppercase tracking-widest text-amber-500/80 font-bold">Under Review</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl text-white/80 font-semibold tabular-nums">89</p>
                                    <p className="text-[10px] text-white/20 uppercase tracking-tighter">Votes</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative left-4 bg-white/[0.02] p-5 rounded-[20px] backdrop-blur-sm border border-white/[0.03] opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="flex justify-between items-center">
                                <span className="text-white/40 font-medium">Native Mobile App</span>
                                <span className="text-white/20 text-xs">↑ 42</span>
                            </div>
                        </div>

                        <div className="absolute -top-10 -right-5 bg-violet-600/20 text-violet-300 px-4 py-2 rounded-full border border-violet-500/30 text-xs font-medium backdrop-blur-md shadow-lg transform rotate-6">
                            ✨ AI Grouped: UI/UX
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
