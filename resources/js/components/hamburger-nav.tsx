import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Link } from "@inertiajs/react"
import Logout from "./logout-btn"
import { Menu } from "lucide-react"

export default function AuthenticatedHamburgerNavigation() {
    const currentPath = window.location.pathname

    const authLinks = [
        { name: "Feedback", url: '/feedback' },
        { name: "My Posts", url: '/my-posts' },
        { name: "Profile", url: '/profile' },
    ]

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
                    {authLinks.map((link, index) => (
                        <li key={index}
                            className="p-3 border-b border-b-zinc-50/10 "
                        >
                            <Link
                                href={link.url}
                                className={`text-sm  transition-all duration-300 ${
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
            <div className="">
                <Logout />
            </div>
        </SheetContent>
        </Sheet>
    )
}
