import { Link } from "@inertiajs/react";

export default function CTA() {
    return (
        <section className="flex gap-2 mt-5">
            <Link
                href="/register"
                className="bg-violet-500 text-xs px-3 md:px-4 lg:px-6 py-2 md:py-2 lg:py-2 rounded-lg md:text-sm text-white border border-white/10
                    transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                    hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)]
                    hover:border-white/30 hover:text-white"
            >
                Get Started
            </Link>

            <Link
                href="/feedback"
                className="text-xs px-3 md:px-4 lg:px-6 py-2 md:py-2 lg:py-2 rounded-lg md:text-sm text-white/80 border border-white/10
                    transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                    hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)]
                    hover:border-white/30 hover:text-white"
            >
                View Feedback
            </Link>
        </section>
    )
}
