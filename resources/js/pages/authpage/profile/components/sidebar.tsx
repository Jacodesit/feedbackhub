import { Activity, ChartBarBig, CircleUser, MessageSquareMore, Settings } from "lucide-react"

export default function Sidebar() {
    const links = [
        {icon: <CircleUser strokeWidth={1.5} />, name: 'Profile', id: '#'},
        {icon: <ChartBarBig strokeWidth={1.5} />, name: 'Stats', id: '#'},
        {icon: <MessageSquareMore strokeWidth={1.5} /> , name: 'Feedbacks', id: '#'},
        {icon: <Activity strokeWidth={1.5} />, name: 'Activity', id: '#'},
        {icon: <Settings strokeWidth={1.5} />, name: 'Settings', id: '#'},
    ]

    return (
        <main className="">
            <aside className="w-1/5 bg-white rounded-lg shadow-md p-5 sticky top-30 self-start">
                <ul className="">
                    <p className="px-4 pb-3 text-gray-400">Menu</p>
                    {links.map((link, index) => (
                        <li
                            key={index}
                            className="flex gap-2 items-center px-4 py-4 cursor-pointer duration-300 transition-all hover:bg-blue-500 hover:text-white"
                        >
                            <p>{link.icon}</p>
                            <p className="text-sm">{link.name}</p>
                        </li>
                    ))}
                </ul>
            </aside>
        </main>

    )
}
