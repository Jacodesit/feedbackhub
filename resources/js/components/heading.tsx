import { Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types/feedbackhub";
import AuthenticatedHamburgerNavigation from "./hamburgerNav/auth-nav";
import Logout from "./logout-btn";
import NonAuthenticatedHamburgerNavigation from "./hamburgerNav/non-auth-nav";

export default function Heading() {
    const [activeId, setActiveId] = useState("");

    const { auth } = usePage<PageProps>().props;
    const user = auth.user

    const links = [
        { name: "Feedback", id: "hero", url: '/feedback'},
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

    const currentPath = window.location.pathname;

    const isActiveLink = (url: string) => {
        return currentPath === url;
    };

    const viewportWidth = window.innerWidth

    return (
        <header className="fixed z-50 w-full">
            <div
                className={`flex justify-between items-center border py-3 px-5 lg:px-50 text-accent
                    ${
                        currentPath === '/'
                        ? 'bg-white/5 backdrop-blur-md border-white/10 shadow-2xl'
                        : 'bg-[#1e1e1e] border-white/10 shadow-lg'
                    }
                `}
            >
                <div>
                    <img src="/images/branding2.png" alt="logo" className="w-32 md:w-40 invert" />
                </div>
                {user ? (
                    <>
                        {viewportWidth >= 320 && viewportWidth <= 768 ? (
                            <AuthenticatedHamburgerNavigation />
                        ) : (
                            <>
                                <div>
                                    <ul className="flex items-center gap-6">
                                        {authLinks.map((link, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={link.url}
                                                    className={`text-sm transition-all duration-300 ${
                                                        isActiveLink(link.url)
                                                            ? "text-white font-bold"
                                                            : "text-white/50 hover:text-white/80"
                                                    }`}
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <Logout />
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {viewportWidth >= 320 && viewportWidth <= 768 ? (
                            <NonAuthenticatedHamburgerNavigation />
                        ) : (
                            <>
                                <div>
                                    <ul className="flex items-center gap-6">
                                        {links.map((link) => (
                                            <li key={link.id || link.url}>
                                                {link.url ? (
                                                    <Link
                                                        href={link.url}
                                                        className={`text-sm transition-all duration-300 ${
                                                            isActiveLink(link.url)
                                                                ? "text-white font-bold"
                                                                : "text-white/50 hover:text-white/80"
                                                        }`}
                                                    >
                                                        {link.name}
                                                    </Link>
                                                ) : (
                                                    <a
                                                        href={`#${link.id}`}
                                                        onClick={(e) => handleScroll(e, link.id)}
                                                        className={`text-sm transition-all duration-300 ${
                                                            activeId === link.id && activeId !== "hero" && activeId !== "call-to-action"
                                                            ? "text-white font-bold"
                                                            : "text-white/50 hover:text-white/80"
                                                        }`}
                                                    >
                                                        {link.name}
                                                    </a>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href="/login"
                                        className="bg-[#1e1e1e] px-6 py-2 rounded-lg text-sm text-white/80 border border-white/10
                                            transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                                            hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)]
                                            hover:border-white/30 hover:text-white">
                                        Login
                                    </Link>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </header>
    );
}

