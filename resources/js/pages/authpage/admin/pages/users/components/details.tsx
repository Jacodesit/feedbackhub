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

dayjs.extend(relativeTime);

type pageProps = {
    open: boolean;
    onClose: () => void
    user: AdminUser
}

export default function UserDetails({user, open, onClose}:pageProps) {
    if(!user) return null


    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className=" w-[35%] sm:max-w-none flex flex-col justify-between bg-[#fafafa] max-h-screen overflow-y-auto">
                <div className='flex flex-col gap-5'>
                    <SheetHeader className="bg-white p-5 rounded-xl">
                        <Avatar user={user} className="h-18 w-18" />
                        <section>
                            <h1 className="font-medium text-2xl">{user.name}</h1>
                            <div className="flex items-center justify-between">
                                <p className="text-gray-500 text-xs">{user.email} • {user.public_id}</p>
                                <p className="text-gray-500 text-xs">Joined: {dayjs(user.created_at).format('MMM D, YYYY')}</p>
                            </div>
                        </section>
                    </SheetHeader>
                    <section className="flex flex-col justify-between gap-5">
                        <UserStats
                            user={user}
                        />
                        <RecentFeedbacks user={user}/>
                    </section>
                </div>

                <section className='flex items-center justify-between'>
                    <Button
                        onClick={onClose}
                        variant={"outline"}
                    >
                        Close
                    </Button>
                    <div className='flex gap-2'>
                        <Button>Pin Feedback</Button>
                        <Button variant={"destructive"}>Delete</Button>
                    </div>
                </section>
            </SheetContent>
        </Sheet>
    )
}
