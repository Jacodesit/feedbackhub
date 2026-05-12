import { CATEGORY_CONFIG, FeedbackCategory, STATUS_CONFIG } from '@/components/constants/feedback';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
} from "@/components/ui/dialog"
// import { Separator } from "@/components/ui/separator"
import { Feedback } from "@/types/feedbackhub"

dayjs.extend(relativeTime);

type pageProps = {
    openModal: boolean
    onClose: () => void
    feedback: Feedback | null;
}

export default function CommentsModal({openModal, onClose, feedback}:pageProps) {
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
            open={openModal}
            onOpenChange={onClose}
        >
            <DialogContent className="">
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
                <DialogTitle>
                    <h1 className='text-2xl'>{feedback.title}</h1>
                </DialogTitle>
                <div className='flex flex-col gap-20'>
                    <DialogDescription className='max-h-64 overflow-y-auto'>
                        <p className='text-base'>{feedback.description}</p>
                    </DialogDescription>
                    <div>
                        <div className='flex gap-1'>
                            <span className={`text-[9px] px-3 py-1 rounded-md border uppercase ${statusConfig.className}`}>
                                {statusConfig.label}
                            </span>
                            <span className={`text-[9px] px-3 py-1 rounded-md font-medium ${categoryConfig.className}`}>
                                {categoryConfig.label}
                            </span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
