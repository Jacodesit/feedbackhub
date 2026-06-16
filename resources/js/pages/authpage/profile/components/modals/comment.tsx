import { CATEGORY_CONFIG, FeedbackCategory, STATUS_CONFIG } from '@/components/constants/feedback';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Feedback, PageProps } from "@/types/feedbackhub"
import { Edit, ThumbsUp } from 'lucide-react';
import EditDeleteButtons from '../buttons';
import CommentForm from '../forms/comment';
import { router, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import Avatar from '@/components/avatar/profile';

dayjs.extend(relativeTime);

type pageProps = {
    auth?: PageProps['auth']
    open: boolean
    commentModal: boolean
    onClose: () => void
    feedback: Feedback | null;
    onFeedbackUpdate?: (updatedFeedback: Feedback) => void
    onFeedbackDelete?: () => void
}

export default function CommentsModal({open, onClose, feedback, commentModal, onFeedbackUpdate, onFeedbackDelete}:pageProps) {
    const {auth} = usePage<PageProps>().props
    const user = auth.user;

    if(!feedback) return null

    const statusConfig = STATUS_CONFIG[feedback.status] || {
        label: feedback.status,
        className: 'bg-gray-100 text-gray-700'
    };

    const categoryConfig = CATEGORY_CONFIG[feedback.category as FeedbackCategory] || {
        label: feedback.category,
        className: 'bg-gray-100 text-gray-700'
    };

    const handleVote = (feedbackId: number) => {
        router.post(route('feedbacks.votes.store', feedbackId), {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(feedback.has_liked ? 'Like removed' : 'Feedback liked')
            }
        })
    }

    return (
        <Dialog
            open={open || commentModal}
            onOpenChange={onClose}
        >
            <DialogContent className="max-w-3xl">
                <DialogHeader className="mb-5">
                    <div className="flex items-center gap-2">
                        <Avatar user={feedback.user} size="md" />
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
                        <div className='flex flex-col gap-10 scrollable-content'>
                            <DialogDescription className='overflow-y-auto'>
                                <p className='text-base'>{feedback.description}</p>
                            </DialogDescription>

                            <div className="">
                                <div className='flex items-center gap-2'>
                                    <h5 className='text-xs font-medium mb-5 border px-6 py-2 rounded-lg'>{feedback.votes} <span className='text-gray-500'>Likes</span> </h5>
                                    <h5 className='text-xs font-medium mb-5 border px-6 py-2 rounded-lg'>{feedback.comments_count} <span className='text-gray-500'>Comments</span> </h5>
                                </div>

                                {feedback.comments?.length === 0 ? (
                                    <div className="h-36 flex justify-center items-center">
                                        <div className="flex flex-col gap-5">
                                            <img
                                                src="/images/no-comment.svg"
                                                alt="No Comments"
                                                className="h-15 opacity-50"
                                            />
                                            <p className="text-gray-500 text-xs">No comments found in this feedback yet.</p>
                                        </div>
                                    </div>
                                ) : (
                                    feedback.comments.map(comment => (
                                        <div
                                            key={comment.id}
                                            className='mb-2'
                                        >
                                            <div className='flex gap-3'>
                                                <Avatar user={comment.user} size="md" />
                                                <div className='border p-3 bg-[#fafafa] flex flex-col gap-2 rounded-md'>
                                                    <div className='flex items-center justify-between'>
                                                        <div className='flex gap-1 items-center'>
                                                            <p className='text-sm font-medium'>{comment.user.name}</p>
                                                            <p className='text-xs text-gray-500'>
                                                                • {dayjs(comment.created_at).fromNow()}
                                                                </p>
                                                        </div>

                                                        {user?.id === comment.user.id && (
                                                            <button
                                                                className='text-gray-500 transition-all duration-300 hover:text-blue-500 cursor-pointer'
                                                            >
                                                                <Edit size={15} />
                                                            </button>
                                                        )}

                                                    </div>

                                                    <div className='w-[40vw]'>
                                                        <p className='text-sm text-gray-500'>{comment.content}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className='py-3'>
                    <button
                        onClick={() => handleVote(feedback.id)}
                        className='flex gap-1 items-center pr-2 '
                    >
                        <ThumbsUp
                            size={30}
                            strokeWidth={1.5}
                            className={`transition-all duration-300 transform hover:text-blue-500 hover:-translate-y-1 cursor-pointer ${feedback.has_liked
                                ? 'text-blue-500 fill-blue-500 font-medium' : ''
                            }`}
                        />
                        {/* <p className='text-xl'>{feedback.votes}</p> */}
                    </button>

                    <EditDeleteButtons
                        feedback={feedback}
                        onFeedbackUpdate={onFeedbackUpdate}
                        onFeedbackDelete={onFeedbackDelete ?? onClose}
                    />

                    <CommentForm
                        feedback={feedback}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
