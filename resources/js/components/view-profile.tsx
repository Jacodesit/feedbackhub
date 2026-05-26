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
import Stats from "@/pages/authpage/feedback/components/profile/sections/stats";
import Feedbacks from "@/pages/authpage/feedback/components/profile/sections/feedbacks";

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
            <SheetContent className="p-0 z-[9999] w-[35%] sm:max-w-none bg-[#fafafa]">
                <div className="h-screen overflow-y-auto scroll-smooth hide-scrollbar">
                    <SheetHeader className="mb-10">
                        <div className="relative">
                            <div className="h-32 w-full cover-photo">
                                <img
                                    src="/images/cover-photo.jpg"
                                    alt="cover-photo"
                                    className="h-32 w-full object-fill"
                                />
                            </div>
                            <div className="absolute -bottom-15 left-4 border-4 rounded-full">
                                <Avatar user={feedback.user} className="h-28 w-28 !text-5xl" />
                            </div>
                        </div>

                        <div className="h-4 pl-36 pt-5 flex justify-between items-center">
                            <div>
                                <div className="">
                                    <h1
                                        className="text-2xl font-medium flex items-center gap-2"
                                    >
                                        {feedback.user?.name}
                                    </h1>
                                </div>
                                <p className="text-xs text-gray-500">Joined: {dayjs(auth.user?.created_at).format('MMM D, YYYY')}</p>
                            </div>
                        </div>
                    </SheetHeader>

                    <main className="p-6">
                        <section className="grid grid-cols-1 gap-5">
                            <Stats
                                feedbackCount={feedback.user.feedbacks_count ?? 0}
                                commentCount={feedback.user.comments_count ?? 0}
                                totalVotesReceived={feedback.user.total_votes_received ?? 0}
                                totalCommentsReceived={feedback.user.total_comments_received ?? 0}
                            />
                            <Feedbacks feedback={feedback} enabled={open} />
                        </section>
                    </main>
                </div>
            </SheetContent>
        </Sheet>
    )
}
