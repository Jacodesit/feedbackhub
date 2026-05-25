import { PageProps } from "@/types/feedbackhub"
import { usePage } from "@inertiajs/react"
import { Contact } from "lucide-react"

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Avatar from "@/components/avatar/profile";

dayjs.extend(relativeTime);

export default function Profile() {
    const { auth } = usePage<PageProps>().props
    return (
        <div id="section-profile" className="scroll-mt-20">
            <div className="pb-4">
                <h2 className=" font-medium">Profile</h2>
                <p className="text-sm text-gray-400 ">User Identity</p>
            </div>

            <div className="relative">
                <div className="rounded-lg h-58 w-full cover-photo">
                    <img
                        src="/images/cover-photo.jpg"
                        alt="cover-photo"
                        className="h-58 w-full object-fill rounded-lg "
                    />
                </div>
                <div className="absolute -bottom-14 left-5 border-4 rounded-full">
                    <Avatar user={auth.user} size="lg" />
                </div>
            </div>

            <div className="h-12 pl-40 pt-2 flex justify-between items-center">
                <div>
                    <div className="flex items-center">
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

                    </div>
                    <p className="text-xs text-gray-500">{auth.user?.email} • Joined {dayjs(auth.user?.created_at).format('MMM D, YYYY')}</p>
                </div>
                <p className="text-xs text-gray-500">ID: {auth.user?.public_id}</p>
            </div>
        </div>
    )
}
