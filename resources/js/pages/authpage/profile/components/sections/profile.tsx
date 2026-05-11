import { PageProps } from "@/types/feedbackhub"
import { usePage } from "@inertiajs/react"
import { Contact } from "lucide-react"

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function Profile() {
    const { auth } = usePage<PageProps>().props
    return (
        <div>
            <div className="pb-4">
                <h2 className=" font-medium">Profile</h2>
                <p className="text-sm text-gray-400 ">User Identity</p>
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

            <div className="h-12 pl-38 pt-2 flex justify-between ">
                <div>
                    <p
                        className="text-2xl font-medium flex items-center gap-2"
                    >
                        {auth.user?.name}
                        <Contact
                            xlinkTitle="User"
                            size={15}
                            className="text-blue-500"
                        />
                    </p>
                    <p className="text-xs text-gray-500">{auth.user?.email} • Joined {dayjs(auth.user?.created_at).format('MMM D, YYYY')}</p>
                </div>
            </div>
        </div>
    )
}
