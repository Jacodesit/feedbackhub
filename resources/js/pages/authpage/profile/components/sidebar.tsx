import { Activity, CalendarPlus, ChartBarBig, CircleUser, IdCard, MessageSquareMore, MessageSquareShare, Settings, User, Vote, MessageCircle } from "lucide-react"
import { usePage } from "@inertiajs/react"
import { PageProps } from "@/types/feedbackhub"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Separator } from "@/components/ui/separator";

dayjs.extend(relativeTime);

export default function Sidebar() {
    const { auth } = usePage<PageProps>().props

    const links = [
        {icon: <CircleUser strokeWidth={1.5} />, name: 'Profile', id: '#'},
        {icon: <ChartBarBig strokeWidth={1.5} />, name: 'Stats', id: '#'},
        {icon: <MessageSquareMore strokeWidth={1.5} /> , name: 'Feedbacks', id: '#'},
        {icon: <Activity strokeWidth={1.5} />, name: 'Activity', id: '#'},
        {icon: <Settings strokeWidth={1.5} />, name: 'Settings', id: '#'},
    ]

    const datas = [
        {icon: <IdCard strokeWidth={1.5} size={25} />, text: 'ID', data: auth.user?.id},
        {icon: <User strokeWidth={1.5} size={25} />, text: 'Role', data: 'User'},
        {icon: <CalendarPlus strokeWidth={1.5} size={25} />, text: 'Joined', data: dayjs(auth.user?.created_at).format('MMM D, YYYY')},
    ]

    const stats = [
        {icon: <MessageSquareShare strokeWidth={1.5} size={30} />, text: 'Feedback Submitted', data: '0'},
        {icon: <Vote strokeWidth={1.5} size={30} />, text: 'Total Votes Received', data: '0'},
        {icon: <MessageCircle strokeWidth={1.5} size={30} />, text: 'Completed Feedback', data: '0'},
        {icon: <MessageCircle strokeWidth={1.5} size={30} />, text: 'Comments Posted', data: '0'},
    ]

    return (
        <main className="flex gap-5 items-start">
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

            <section className="w-4/5 bg-white rounded-lg shadow-md px-10 p-5 flex flex-col gap-5">
                <div>
                    <div className="pb-4">
                        <h2 className=" text-gray-400 font-medium">Profile</h2>
                        <p className="text-sm">User Identity</p>
                    </div>

                    <div className="relative">
                        <div className="bg-gradient-to-tr from-indigo-600 via-violet-500 to-purple-400 rounded-lg h-48"></div>
                        <div className="absolute -bottom-14 left-5">
                            <div className=" w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 border-4 border-white text-white shadow-lg">
                                <p className="font-bold text-5xl">
                                    {auth.user?.name.charAt(0)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="h-12 pl-38">
                        <p className="text-2xl font-medium">{auth.user?.name}</p>
                        <p className="text-xs text-gray-500">{auth.user?.email}</p>
                    </div>

                    <div className="grid grid-cols-3 pt-10">
                        {datas.map((data, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2  "
                            >
                                <div className="bg-violet-100 p-3 rounded-md">
                                    {data.icon}
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm">{data.data}</p>
                                    <p className="text-gray-500 text-sm">{data.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator />

                <div>
                    <div className="pb-4">
                        <h2 className=" text-gray-400 font-medium">Stats</h2>
                        <p className="text-sm">Contribution/Activity</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="border p-5 rounded-lg"
                            >
                                <div className="flex justify-end mb-5">
                                    <div className="bg-violet-100 inline-flex p-3 rounded-md">
                                        {stat.icon}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-5xl">{stat.data}</p>
                                    <p className="text-sm text-gray-500">{stat.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </main>

    )
}
