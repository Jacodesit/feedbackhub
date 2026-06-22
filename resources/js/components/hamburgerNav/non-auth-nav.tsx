import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Link } from "@inertiajs/react"
import { Menu } from "lucide-react"
import { useEffect, useState } from "react";

export default function NonAuthenticatedHamburgerNavigation() {
    const [activeId, setActiveId] = useState("");
    const currentPath = window.location.pathname

    const links = [
        { name: "Feedback", id: "hero", url: '/feedback'},
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


    const isActiveLink = (url: string) => {
        return currentPath === url;
    };
    return (
        <Sheet>
        <SheetTrigger asChild>
            <button
                className="p-3"
            >
                <Menu />
            </button>
        </SheetTrigger>
        <SheetContent className="bg-black border-none">
            <div className="mb-6">
                <ul className="flex flex-col">
                    {links.map((link) => (
                        <li key={link.id || link.url}
                            className="p-3 border-b border-b-zinc-50/10 "
                        >
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
        </SheetContent>
        </Sheet>
    )
}
