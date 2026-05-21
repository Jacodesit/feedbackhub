import {
    Sheet,
    SheetContent,
    SheetHeader,
} from "@/components/ui/sheet"
import { Feedback, PageProps } from "@/types/feedbackhub";
import Avatar from "./avatar/profile";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { usePage } from "@inertiajs/react";
import Stats from "@/pages/authpage/feedback/components/stats";

dayjs.extend(relativeTime);

type pageProps = {
    open: boolean;
    onClose: () => void
    feedback: Feedback
}

export default function ViewProfile({open, onClose, feedback}:pageProps) {
    const {auth} = usePage<PageProps>().props

    const handleOpenChange = (isOpen: boolean) => {
        if (isOpen) {
            return
        }

        onClose()

        window.setTimeout(() => {
            document.body.style.removeProperty("pointer-events")
        }, 0)
    }

    return (
        <Sheet
            open={open}
            onOpenChange={handleOpenChange}
        >
            <SheetContent className="p-0 ">
                <SheetHeader className="mb-10">
                    <div className="relative">
                        <div className="bg-gradient-to-tr from-indigo-600 via-violet-500 to-purple-400 rounded-b-lg h-32"></div>
                        <div className="absolute -bottom-13 left-4 border-4 rounded-full">
                            <Avatar user={feedback.user} className="h-22 w-22" />
                        </div>
                    </div>

                    <div className="h-4 pl-30 pt-2 flex justify-between items-center">
                        <div>
                            <div className="">
                                <p
                                    className="text-base font-medium flex items-center gap-2"
                                >
                                    {feedback.user?.name}
                                </p>
                            </div>
                            <p className="text-xs text-gray-500">Joined: {dayjs(auth.user?.created_at).format('MMM D, YYYY')}</p>
                        </div>
                    </div>
                </SheetHeader>

                <main className="p-6">
                    <h5 className="text-gray-500 text-sm mb-2">Contribution Stats</h5>
                    <Stats />
                </main>
            </SheetContent>
        </Sheet>
    )
}
