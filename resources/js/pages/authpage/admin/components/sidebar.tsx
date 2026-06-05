import LogoutDialog from "@/components/dialog/logout";
import { SidebarFooter } from "@/components/ui/sidebar";
import { Link } from "@inertiajs/react";
import { LayoutDashboard, LogOut, MessageSquareMore, MessageSquareWarning, Settings, User, Users } from "lucide-react";
import { useState } from "react";

interface AdminSidebarProps {
    open: boolean;
}

export default function AdminSidebar({ open }: AdminSidebarProps) {
    const navlinks = [
        { icon: <LayoutDashboard size={20} />, name: 'Dashboard', url: '/admin/dashboard' },
        { icon: <MessageSquareMore size={20} />, name: 'Feedbacks', url: '/admin/feedbacks' },
        { icon: <Users size={20} />, name: 'Users', url: '/admin/users' },
        { icon: <MessageSquareWarning size={20} />, name: 'Reports', url: '/admin/reports' },
        { icon: <Settings size={20} />, name: 'Settings', url: '/admin/settings' },
    ]

    const [logout, setLogout] = useState(false);

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Manila'
    });

    const currentPath = window.location.pathname;

    const isActiveLink = (url:string) => {
        return currentPath === url;
    }

    return (
        <aside
            className={`
                fixed left-4 top-4 bottom-4 z-40 overflow-y-auto max-h-screen flex flex-col justify-between text-white transition-all duration-300 ease-in-out
                ${open ? 'w-[300px] opacity-100' : 'w-0 opacity-0 '}
            `}
        >
            <div className="">
                <div className="px-6 py-5">
                    <img
                        src="/images/branding2.png"
                        alt="FeedbackHub"
                        className="w-34"
                    />
                </div>

                <div className="px-6 py-5 bg-white rounded-lg text-black mb-5">
                    <div className="flex flex-col gap-2">
                        <div className="rounded-full">
                            <img
                                src="/images/profile-placeholder.jpg"
                                alt="profile-placeholder"
                                className="h-10 rounded-full"
                            />
                        </div>
                        <p className="text-sm text-gray-500 font-medium">{currentDate}</p>
                        <h1 className="font-medium text-xl">Welcome back, Admin!</h1>
                    </div>
                </div>

                <p className="capitalize text-gray-500 font-medium text-sm px-6 mb-3">Main Menu</p>
                <ul className="rounded-lg overflow-hidden">
                    {navlinks.map((link, index) => {
                        const active = isActiveLink(link.url);

                        return (
                            <Link
                                href={link.url}
                                key={index}
                                className={`
                                    border-b border-b-zinc-50 cursor-pointer flex gap-2 transition-all duration-300 py-5 px-6 last:border-0
                                    ${active
                                        ? 'bg-black text-white'
                                        : 'bg-white text-black hover:bg-black hover:text-white'
                                    }
                                `}
                            >
                                <i
                                    className={`${active ? 'text-purple-500' : ''}`}
                                    >{link.icon}
                                </i>
                                <p className="font-medium text-sm">{link.name}</p>
                            </Link>
                        );
                    })}
                </ul>
            </div>

            <SidebarFooter className="p-0">
                <ul className="bg-white rounded-lg text-black">
                    <li className="border-b border-b-zinc-50 cursor-pointer flex gap-2 transition-all duration-300 hover:bg-black hover:text-white py-5 px-6 first:rounded-t-lg ">
                        <i><User size={20} /></i>
                        <p className="font-medium text-sm">Profile</p>
                    </li>

                    <button
                        onClick={() => setLogout(true)}
                        className="w-full last:rounded-b-lg cursor-pointer flex gap-2 transition-all duration-300 hover:bg-black hover:text-white py-5 px-6"
                    >
                        <i><LogOut size={20} /></i>
                        <p className="font-medium text-sm">Logout</p>
                    </button>
                </ul>
            </SidebarFooter>

            <LogoutDialog
                openDialog={logout}
                onClose={() => setLogout(false)}
            />
        </aside>
    )
}
