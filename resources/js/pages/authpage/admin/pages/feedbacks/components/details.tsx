import { CATEGORY_CONFIG, FeedbackCategory, STATUS_CONFIG } from '@/components/constants/feedback';
import Avatar from "@/components/avatar/profile";
import {
    Sheet,
    SheetContent,
    SheetHeader,
} from "@/components/ui/sheet"
import { Feedback } from "@/types/feedbackhub";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import VotesList from './popover/votes';
import CommentsList from './popover/comments';
import StatusDropdown from './status';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Pin } from 'lucide-react';

dayjs.extend(relativeTime);

type pageProps = {
    open: boolean;
    onClose: () => void
    feedback: Feedback
}

export default function FeedbackDetails({feedback, open, onClose}:pageProps) {
    if(!feedback) return null

    const statusConfig = STATUS_CONFIG[feedback.status] || {
        label: feedback.status,
        className: 'bg-gray-100 text-gray-700'
    };

    const categoryConfig = CATEGORY_CONFIG[feedback.category as FeedbackCategory] || {
        label: feedback.category,
        className: 'bg-gray-100 text-gray-700'
    };

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className=" w-[35%] sm:max-w-none flex flex-col justify-between bg-[#fafafa] max-h-screen overflow-y-auto">
                <div className='flex flex-col gap-5'>
                    <SheetHeader className="bg-white p-5 rounded-xl">
                        <div className="flex justify-between">
                            <Avatar user={feedback.user} className="h-18 w-18" />
                            <Toggle variant={"outline"}>
                                <Pin />
                            </Toggle>
                        </div>
                        <section>
                            <h1 className="font-medium text-2xl">{feedback.user.name}</h1>
                            <div className="flex items-center justify-between">
                                <p className="text-gray-500 text-xs">{dayjs(feedback.created_at).format('MMM D, YYYY')} • {dayjs(feedback.created_at).fromNow()}</p>
                                <div className='flex gap-1'>
                                    <span className={`text-[8px] px-3 py-1 rounded-md border uppercase ${statusConfig.className}`}>
                                        {statusConfig.label}
                                    </span>
                                    <span className={`text-[8px] px-3 py-1 rounded-md font-medium ${categoryConfig.className}`}>
                                        {categoryConfig.label}
                                    </span>
                                </div>
                            </div>
                        </section>
                    </SheetHeader>
                    <section className="flex flex-col justify-between">
                        <div className="bg-white px-5 pt-3 w-fit rounded-t-xl">
                            <p className="uppercase text-gray-700 text-[9px] font-semibold mb-1">Title</p>
                            <h2 className="font-medium ">{feedback.title}</h2>
                        </div>

                        <div className="bg-white p-5 rounded-tr-xl rounded-b-xl">
                            <div className='mb-5'>
                                <p className="uppercase text-gray-700 text-[9px] font-semibold mb-1">Description</p>
                                <p className="font-light text-sm">{feedback.description}</p>
                            </div>

                            <div>
                                <p className="uppercase text-gray-700 text-[9px] font-semibold mb-1">Interactions</p>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center gap-2'>
                                        <VotesList feedback={feedback}/>
                                        <CommentsList feedback={feedback}/>
                                    </div>
                                    <StatusDropdown />
                                </div>
                            </div>
                        </div>
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
