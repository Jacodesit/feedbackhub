export default function Footer() {
    return (
        <footer className="p-20 bg-violet-500">
            <div className="px-30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 items-center pb-15">
                    <div className="">
                        <img
                            src="/images/branding2.png"
                            alt="feedbackhub"
                            className="mb-1"
                        />
                        <p className="text-accent">Collect feedback. Build better products.</p>
                    </div>

                    <div className="">
                        <p className="text-[15px] uppercase tracking-widest font-bold mb-2">Links</p>
                        <ul className="text-accent flex gap-5">
                            <li>Features</li>
                            <li>Feedback</li>
                            <li>How It Works</li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-[15px] uppercase tracking-widest font-bold mb-3">Actions</p>
                        <ul className="flex gap-5 text-accent">
                            <li>Get Started</li>
                            <li>Login</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/40">
                    <p className="text-xs mt-5 text-center text-white">© 2026 FeedbackHub. All rights reserved</p>
                </div>
            </div>
        </footer>
    )
}
