import { LayoutDashboard, MessageSquareMore, MessageSquareWarning, Settings, Users } from "lucide-react";

interface AdminSidebarProps {
    open: boolean;
}

export default function AdminSidebar({ open }: AdminSidebarProps) {
    const navlinks = [
        { icon: <LayoutDashboard />, name: 'Dashboard', url: '/dashboard' },
        { icon: <MessageSquareMore />, name: 'Feedbacks', url: '/feedbacks' },
        { icon: <Users />, name: 'Users', url: '/users' },
        { icon: <MessageSquareWarning />, name: 'Reports', url: '/reports' },
        { icon: <Settings />, name: 'Settings', url: '/settings' }
    ]

    return (
        <aside
            className={`
                h-screen bg-[#1e1e1e] text-white overflow-hidden transition-all duration-300 ease-in-out
                ${open ? 'w-[300px] opacity-100' : 'w-0 opacity-0 '}
            `}
        >
            <div className="">
                <div className="px-6 py-10 border-b border-white/10">
                    <img
                        src="/images/branding2.png"
                        alt="FeedbackHub"
                        className="w-38 invert-100"
                    />
                </div>

                <ul className="space-y-6 px-6 py-10">
                    {navlinks.map((link, index) => (
                        <li key={index} className="hover:opacity-80 cursor-pointer flex gap-2">
                            <i>{link.icon}</i>
                            <p className="font-medium">{link.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}
