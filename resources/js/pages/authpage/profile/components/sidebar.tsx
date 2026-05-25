import { ChartBarBig, CircleUser, MessageSquareMore, Activity, Settings } from "lucide-react";


type SectionKey = "profile" | "stats" | "feedbacks" | "activity" | "settings";

interface SidebarProps {
    onNavigate: (key: SectionKey) => void;
    activeSection: string;
}

export default function Sidebar({ onNavigate, activeSection }: SidebarProps) {
    const links: { icon: React.ReactNode, name: string, key: SectionKey }[] = [
        { icon: <CircleUser strokeWidth={1.5} />, name: 'Profile', key: 'profile' },
        { icon: <ChartBarBig strokeWidth={1.5} />, name: 'Stats', key: 'stats' },
        { icon: <MessageSquareMore strokeWidth={1.5} />, name: 'Feedbacks', key: 'feedbacks' },
        { icon: <Activity strokeWidth={1.5} />, name: 'Activity', key: 'activity' },
        { icon: <Settings strokeWidth={1.5} />, name: 'Settings', key: 'settings' },
    ];

    return (
        <aside className="bg-white rounded-lg shadow-md p-5 min-w-[240px]">
            <ul>
                <p className="px-4 pb-3 text-gray-400">Menu</p>
                {links.map((link) => {
                    const isActive = activeSection === link.key;

                    return (
                        <li
                            key={link.key}
                            onClick={() => onNavigate(link.key)}
                            className={`flex gap-2 items-center px-4 py-4 cursor-pointer duration-300 transition-all rounded-md mb-1
                                ${isActive
                                    ? "bg-black text-white shadow-sm"
                                    : "hover:bg-gray-100 text-gray-600"
                                }`}
                        >
                            {link.icon}
                            <p className="text-sm font-medium">{link.name}</p>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
