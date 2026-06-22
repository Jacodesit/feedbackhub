export default function CallToAction() {
    return (
        <section id="call-to-action" className="py-5 px-0 lg:p-20 bg-black">
            <div className="p-5 lg:p-20 max-w-7xl mx-auto">
                    <div className="relative overflow-hidden bg-violet-600 px-8 py-24 rounded-[48px] flex flex-col items-center justify-center gap-10 shadow-[0_0_50px_-12px_rgba(139,92,246,0.5)]">

                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-[80px]" />
                        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-black/20 rounded-full blur-[80px]" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-8 max-w-5xl">
                        <h1 className="text-white text-lg md:text-5xl font-bold tracking-tight text-center leading-[1.1]">
                            Ready to turn raw feedback into clear action? <br />
                            <span className="text-black/40">Stop guessing what users need</span>
                        </h1>

                        <p className="text-white/80 text-xs md:text-base text-center max-w-2xl font-light">
                            FeedbackHub helps you collect, organize, and understand feedback in one place. No more scattered messages. No more ignored suggestions. Just clear signals on what to improve next.
                        </p>

                        <button
                            className="group relative px-4 md:px-6 lg:px-10 py-2 lg:py-4 bg-black rounded-full text-xs md:text-base font-medium text-white
                                transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                                hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]
                                border border-white/10 hover:border-white/20 cursor-pointer"
                        >
                            <span className="relative z-10">Get Started</span>
                            <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </div>

                    <p className="relative z-10 text-white/40 text-[9px] md:text-sm font-medium">
                        No setup complexity • Start collecting feedback in minutes
                    </p>
                </div>
            </div>
        </section>
    )
}
