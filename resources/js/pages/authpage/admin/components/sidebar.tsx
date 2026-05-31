import { Button } from "@/components/ui/button";
import { SidebarFooter } from "@/components/ui/sidebar";
import { LayoutDashboard, MessageSquareMore, MessageSquareWarning, Settings, Users } from "lucide-react";

interface AdminSidebarProps {
    open: boolean;
}

export default function AdminSidebar({ open }: AdminSidebarProps) {
    const navlinks = [
        { icon: <LayoutDashboard size={20} />, name: 'Dashboard', url: '/dashboard' },
        { icon: <MessageSquareMore size={20} />, name: 'Feedbacks', url: '/feedbacks' },
        { icon: <Users size={20} />, name: 'Users', url: '/users' },
        { icon: <MessageSquareWarning size={20} />, name: 'Reports', url: '/reports' },
        { icon: <Settings size={20} />, name: 'Settings', url: '/settings' }
    ]

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Manila'
    });

    return (
        <aside
            className={`
                flex flex-col justify-between h-screen text-white overflow-hidden transition-all duration-300 ease-in-out
                ${open ? 'w-[300px] opacity-100' : 'w-0 opacity-0 '}
            `}
        >
            <div className="">
                <div className="px-6 py-10">
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
                        <p className="text-sm">{currentDate}</p>
                        <h1 className="font-medium text-2xl">Welcome back, Admin!</h1>
                    </div>
                </div>

                <ul className="bg-white rounded-lg text-black">
                    {navlinks.map((link, index) => (
                        <li key={index} className="cursor-pointer flex gap-2 transition-all duration-300 hover:bg-black hover:text-white py-5 px-6">
                            <i>{link.icon}</i>
                            <p className="font-medium text-sm">{link.name}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <SidebarFooter>
                <Button>
                    Logout
                </Button>
            </SidebarFooter>
        </aside>
    )
}
