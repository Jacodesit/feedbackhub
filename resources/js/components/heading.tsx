export default function Heading() {
    return (
        <header className="px-50 fixed z-999 w-full">
            <div className="flex justify-between items-center border rounded-full px-10 py-3 mt-5 text-accent bg-white/5 backdrop-blur-md  border-white/10 shadow-2xl">
                <div className="">
                    <img
                        src="/images/branding2.png"
                        alt="feedbackhub"
                        className="w-40 invert-100"
                    />
                </div>
                <div className="">
                    <ul className="flex items-center gap-3">
                        <li>Feedback</li>
                        <li>Problem & Solution</li>
                        <li>Features</li>
                        <li>How It Works</li>
                    </ul>
                </div>
                <div className="flex gap-2">
                    <button className="bg-[#1e1e1e] px-6 py-2 rounded-lg text-sm text-white/80 border border-white/10
                            transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                            hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)]
                            hover:border-white/30 hover:text-white">
                        Login
                    </button>
                </div>
            </div>
        </header>
    )
}
