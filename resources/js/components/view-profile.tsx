import {
    Sheet,
    SheetContent,
    SheetHeader,
} from "@/components/ui/sheet"
import { Feedback, PageProps, UserReportReason } from "@/types/feedbackhub";
import Avatar from "./avatar/profile";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { usePage } from "@inertiajs/react";
import Stats from "@/pages/authpage/feedback/components/profile/sections/stats";
import Feedbacks from "@/pages/authpage/feedback/components/profile/sections/feedbacks";
import ReportUserPopover from "@/pages/authpage/feedback/components/report/user";
// import { Flag } from "lucide-react";
// import ReportUser from "@/pages/authpage/feedback/components/report/user";
// import { useState } from "react";

dayjs.extend(relativeTime);

type pageProps = {
    open: boolean;
    onClose: () => void
    feedback: Feedback
    userReasons: Record<UserReportReason, string>
}

export default function ViewProfile({open, onClose, feedback, userReasons}:pageProps) {
    const {auth} = usePage<PageProps>().props
    const user = auth.user;
    // const [reportUser, setReportUser] = useState(false);
    // const [selectedUser, setSelectedUser] =  useState<Feedback | null>(null);

    const handleOpenChange = (isOpen: boolean) => {
        if (isOpen) {
            return
        }

        onClose()

        window.setTimeout(() => {
            document.body.style.removeProperty("pointer-events")
        }, 0)
    }

    const canReport = user && user.id !== feedback.user.id;
    return (
        <Sheet
            open={open}
            onOpenChange={handleOpenChange}
        >
            <SheetContent className="p-0 z-[9999] lg:w-[35%] sm:max-w-none bg-[#fafafa] border-0">
                <div className="h-screen overflow-y-auto scroll-smooth hide-scrollbar">
                    <SheetHeader className="mb-10">
                        <div className="relative">
                            <div className="lg:h-32 w-full cover-photo">
                                <img
                                    src="/images/cover-photo.jpg"
                                    alt="cover-photo"
                                    className="lg:h-32 w-full object-fill"
                                />
                            </div>
                            <div className="absolute -bottom-13 lg:-bottom-15 left-4 border-4 rounded-full">
                                <Avatar user={feedback.user} className="h-20 w-20 lg:h-28 lg:w-28 !text-5xl" />
                            </div>
                        </div>

                        <div className="h-4 pl-28 lg:pl-36 pt-5 flex justify-between items-center">
                            <div className=" w-full lg:pr-6">
                                <div className="flex items-center justify-between relative">
                                    <h1
                                        className="text-[10px] md:text-base lg:text-xl font-medium flex items-center gap-2"
                                    >
                                        {feedback.user?.name}
                                    </h1>
                                </div>
                                <p className="text-left text-[9px] lg:text-xs text-gray-500">Joined: {dayjs(auth.user?.created_at).format('MMM D, YYYY')}</p>
                            </div>
                            {canReport && (
                                <div className="pr-6">
                                    <ReportUserPopover
                                        userReasons={userReasons}
                                        userId={feedback.user.id}
                                    />
                                </div>
                            )}

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


            {/* {selectedUser && (
                <ReportUser
                    open={reportUser}
                    feedback={selectedUser}
                    onClose={() => setReportUser(true)}
                />
            )} */}
        </Sheet>
    )
}
