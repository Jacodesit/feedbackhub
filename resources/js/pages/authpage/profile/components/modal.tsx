import { CATEGORY_CONFIG, FeedbackCategory, STATUS_CONFIG } from '@/components/constants/feedback';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    // DialogFooter,
    // DialogTrigger,
} from "@/components/ui/dialog"
// import { Separator } from "@/components/ui/separator"
import { Feedback } from "@/types/feedbackhub"


dayjs.extend(relativeTime);

type pageProps = {
    openModal: boolean
    commentModal: boolean
    onClose: () => void
    feedback: Feedback | null;
}

export default function CommentsModal({openModal, onClose, feedback, commentModal}:pageProps) {
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
        <Dialog
            open={openModal || commentModal}
            onOpenChange={onClose}
        >
            <DialogContent className="max-w-2xl">
                <DialogHeader className="mb-5">
                    <div className="flex items-center gap-1">
                        <div className="border-2 border-white w-10 h-10 flex items-center justify-center rounded-full bg-violet-500 text-white">
                            <p className="font-bold text-sm">
                                {feedback.user.name.charAt(0)}
                            </p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-medium text-base'>
                                {feedback.user.name}
                            </p>
                            <p className='text-xs text-gray-500'>
                                {dayjs(feedback.created_at).format('MMM D, YYYY')} • {dayjs(feedback.created_at).fromNow()}
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                <div className='max-h-96 overflow-y-auto'>
                    <div className='pr-2'>
                        <DialogTitle className='mb-5'>
                            <div className='flex gap-1 mb-2'>
                                <span className={`text-[9px] px-3 py-1 rounded-md border uppercase ${statusConfig.className}`}>
                                    {statusConfig.label}
                                </span>
                                <span className={`text-[9px] px-3 py-1 rounded-md font-medium ${categoryConfig.className}`}>
                                    {categoryConfig.label}
                                </span>
                            </div>
                            <h1 className='text-2xl'>{feedback.title}</h1>
                        </DialogTitle>
                        <div className='flex flex-col gap-5 scrollable-content'>
                            <DialogDescription className='overflow-y-auto'>
                                <p className='text-base'>{feedback.description}</p>
                            </DialogDescription>

                            <div className="">
                                <h5 className='text-xs font-medium'>Comments {feedback.comments_count}</h5>
                                <div className="border border-dashed rounded-lg h-32 flex justify-center items-center">
                                    <div className="flex flex-col gap-5">
                                        <img
                                            src="/images/no-comment.svg"
                                            alt="No Comments"
                                            className="h-15 opacity-50"
                                        />
                                        <p className="text-gray-500 text-xs">No comments found in this feedback yet.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <DialogFooter className='flex gap-2 items-center py-3 border-t'>
                    <div className='flex shrink-0 gap-1 py-2 px-3 border rounded-lg'>
                        <ThumbsUp
                            size={20}
                            strokeWidth={1.5}
                            className='transition-all duration-300 transform hover:text-blue-500 hover:-translate-y-1 cursor-pointer'
                        />
                        <p className='text-base'>{feedback.votes}</p>
                    </div>
                    <CommentForm />
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    )
}

