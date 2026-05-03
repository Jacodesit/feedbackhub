export default function CTA() {
    return (
        <section className="flex gap-2 mt-5">
            <a
                href=""
                className="bg-violet-500 px-6 py-2 rounded-lg text-sm text-white border border-white/10
                    transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                    hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)]
                    hover:border-white/30 hover:text-white"
            >
                Get Started
            </a>

            <a
                href=""
                className="px-5 py-2 rounded-lg text-sm text-white/80 border border-white/10
                    transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                    hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)]
                    hover:border-white/30 hover:text-white"
            >
                View Feedback
            </a>
        </section>
    )
}
