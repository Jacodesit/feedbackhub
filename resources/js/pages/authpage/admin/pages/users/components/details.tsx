import Avatar from "@/components/avatar/profile";
import {
    Sheet,
    SheetContent,
    SheetHeader,
} from "@/components/ui/sheet"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Button } from '@/components/ui/button';
import { AdminUser } from "@/types/feedbackhub";
import UserStats from "./stats";
import RecentFeedbacks from "./feedbacks";
import { Link } from "@inertiajs/react";
import AdminEmpty from "./empty/admin";
import { UserRoundCog } from "lucide-react";
import ManageAccount from "./manage";
import { useState } from "react";

dayjs.extend(relativeTime);

type pageProps = {
    open: boolean;
    onClose: () => void
    user: AdminUser
}

export default function UserDetails({user, open, onClose}:pageProps) {
    const [manageUser, setManageUser] = useState(false)
    if(!user) return null

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className=" w-[35%] sm:max-w-none flex flex-col justify-between bg-[#fafafa] max-h-screen overflow-y-auto">
                <div className='flex flex-col gap-5'>
                    {user.is_admin ? (
                        <SheetHeader className="bg-white p-5 rounded-xl">
                            <div className="flex justify-between">
                                <Avatar user={user} className="h-18 w-18" />
                                <p className="text-[10px]">
                                    <span className="border-2 border-blue-500 rounded-lg px-1 text-blue-500 bg-blue-50">Administrator</span> <span className="border-2 border-green-500 rounded-lg px-1 text-green-500 bg-green-50">Active</span>
                                </p>
                            </div>

                            <section>
                                <h1 className="font-medium text-2xl">{user.name}</h1>
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-500 text-xs">{user.email} • {user.public_id}</p>
                                    <p className="text-gray-500 text-xs">Joined: {dayjs(user.created_at).format('MMM D, YYYY')}</p>
                                </div>
                            </section>
                        </SheetHeader>
                    ) : (
                        <SheetHeader className="bg-white p-5 rounded-xl">
                            <div className="flex justify-between items-center">
                                <Avatar user={user} className="h-18 w-18" />
                                <Button
                                    size={"sm"}
                                    onClick={() => setManageUser(true)}
                                >
                                    <UserRoundCog />
                                </Button>

                            </div>

                            <section>
                                <h1 className="font-medium text-2xl">{user.name}</h1>
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-500 text-xs">{user.email} • {user.public_id}</p>
                                    <p className="text-gray-500 text-xs">Joined: {dayjs(user.created_at).format('MMM D, YYYY')}</p>
                                </div>
                            </section>
                        </SheetHeader>
                    )}

                    {user.is_admin ? (
                        <div className="flex justify-center items-center h-[50vh]">
                            <AdminEmpty />
                        </div>
                    ) : (
                        <section className="flex flex-col justify-between gap-5 mb-5">
                            <UserStats
                                user={user}
                            />
                            <RecentFeedbacks user={user}/>
                        </section>
                    )}

                </div>

                <section className={`flex items-center justify-between
                        ${user.is_admin ? 'hidden' : ''}
                    `}>
                    <Button
                        onClick={onClose}
                        variant={"outline"}
                    >
                        Close
                    </Button>
                    <div className='flex gap-2'>
                        <Link
                            as="button"
                            href={route("admin.users.feedbacks", {user: user.id})}
                            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                        >
                            View Activity
                        </Link>
                    </div>
                </section>
            </SheetContent>

            <ManageAccount
                open={manageUser}
                onClose={() => setManageUser(false)}
            />
        </Sheet>
    )
}
