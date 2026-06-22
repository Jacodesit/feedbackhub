import { useEffect, useState } from "react";
import ScrollToTop from "./scroll-to-top";
import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "@/types/feedbackhub";
import Logout from "./logout-btn";

export default function Footer() {
    const { auth } = usePage<PageProps>().props
    const user = auth.user

    const [activeId, setActiveId] = useState("");

    const links = [
        { name: "Feedback", id: "hero" },
        { name: "Problem & Solution", id: "problem-solution" },
        { name: "Features", id: "features" },
        { name: "How It Works", id: "how-it-works" },
    ];

    const authLinks = [
        { name: "Feedback", url: '/feedback' },
        { name: "My Posts", url: '/my-posts' },
        { name: "Profile", url: '/profile' },
    ]

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
        <footer id="footer" className="p-8 md:p-20 bg-[#101010] text-white">
            <div className="px-0 lg:px-30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-15 lg:20 items-center pb-15">
                    <div className="">
                        <img
                            src="/images/branding2.png"
                            alt="feedbackhub"
                            className="h-4 lg:h-10 mb-2 invert-100"
                        />
                        <p className="text-accent text-xs lg:text-base">Collect feedback. Build better products.</p>
                    </div>


                    {user ? (
                        <div className="flex flex-col gap-10">
                            <div className="">
                                <p className="text-[10px] lg:text-[15px] uppercase tracking-widest font-bold mb-2">Links</p>
                                <ul className="text-accent flex gap-5">
                                    {authLinks.map((authLink, index) => (
                                        <li
                                            key={index}
                                        >
                                            <Link
                                                href={authLink.url}
                                                className={`text-[12px] md:text-sm transition-all duration-300 ${
                                                activeId === authLink.url && activeId !== "hero"
                                                ? "text-white font-medium"
                                                : "text-white font-medium hover:text-black"
                                            }`}
                                            >
                                                {authLink.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="">
                                <p className="text-[10px] lg:text-[15px] uppercase tracking-widest font-bold mb-2">Actions</p>
                                <Logout />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-10">
                            <div className="">
                                <p className="text-[10px] lg:text-[15px] uppercase tracking-widest font-bold mb-2">Links</p>
                                <ul className="text-accent flex gap-5">
                                    {links.map((link) => (
                                        <li key={link.id}>
                                            <a
                                                href={`#${link.id}`}
                                                onClick={(e) => handleScroll(e, link.id)}
                                                className={`text-[10px] md:text-[12px] transition-all duration-300 ${
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
                                <p className="text-[10px] lg:text-[15px] uppercase tracking-widest font-bold mb-2">Actions</p>
                                <ul className="flex gap-5 text-accent">
                                    <Link
                                        href="/register"
                                        className="text-[10px] md:text-[12px] transition-all duration-300 text-white font-medium hover:text-black"
                                    >
                                        Get Started
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="text-[10px] md:text-[12px] transition-all duration-300 text-white font-medium hover:text-black"
                                    >
                                        Login
                                    </Link>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                <div className="border-t border-white/40">
                    <p className="text-[9px] md:text-xs mt-5 text-center text-white">© 2026 FeedbackHub. All rights reserved</p>
                    <ScrollToTop />
                </div>
            </div>
        </footer>
    )
}




