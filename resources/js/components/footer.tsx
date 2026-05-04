import { useEffect, useState } from "react";
import ScrollToTop from "./scroll-to-top";

export default function Footer() {
    const [activeId, setActiveId] = useState("");

    const links = [
        { name: "Feedback", id: "hero" },
        { name: "Problem & Solution", id: "problem-solution" },
        { name: "Features", id: "features" },
        { name: "How It Works", id: "how-it-works" },
    ];

    useEffect(() => {
        const silentIds = ["call-to-action", "footer"];
        const allIdsToObserve = [...links.map(l => l.id), ...silentIds];

        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (silentIds.includes(entry.target.id)) {
                        setActiveId("");
                    } else {
                        setActiveId(entry.target.id);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        allIdsToObserve.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    });

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.pushState({}, '', `#${id}`);
        }
    };

    return (
        <footer id="footer" className="p-20 bg-violet-500">
            <div className="px-30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center pb-15">
                    <div className="">
                        <img
                            src="/images/branding2.png"
                            alt="feedbackhub"
                            className="mb-2"
                        />
                        <p className="text-accent">Collect feedback. Build better products.</p>
                    </div>

                    <div className="flex flex-col gap-10">
                        <div className="">
                            <p className="text-[15px] uppercase tracking-widest font-bold mb-2">Links</p>
                            <ul className="text-accent flex gap-5">
                                {links.map((link) => (
                                    <li key={link.id}>
                                        <a
                                            href={`#${link.id}`}
                                            onClick={(e) => handleScroll(e, link.id)}
                                            className={`text-sm transition-all duration-300 ${
                                                activeId === link.id && activeId !== "hero"
                                                ? "text-white font-medium"
                                                : "text-white font-medium hover:text-black"
                                            }`}
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="">
                            <p className="text-[15px] uppercase tracking-widest font-bold mb-2">Actions</p>
                            <ul className="flex gap-5 text-accent">
                                <a
                                    href="#"
                                    className="text-sm transition-all duration-300 text-white font-medium hover:text-black"
                                >
                                    Get Started
                                </a>
                                <a
                                    href="#"
                                    className="text-sm transition-all duration-300 text-white font-medium hover:text-black"
                                >
                                    Login
                                </a>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="border-t border-white/40">
                    <p className="text-xs mt-5 text-center text-white">© 2026 FeedbackHub. All rights reserved</p>
                    <ScrollToTop />
                </div>
            </div>
        </footer>
    )
}
