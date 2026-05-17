import { CATEGORY_CONFIG, FeedbackCategory, STATUS_CONFIG } from '@/components/constants/feedback';
import AuthenticatedLayout from "@/layouts/auth/authenticated-layout";
import { Feedback, PageProps, PaginatedFeedbacks } from "@/types/feedbackhub";
import { MessageSquareMore, ThumbsUp } from "lucide-react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import PostModal from '../feedback/components/modal';
import CommentsModal from '../profile/components/modals/comment';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { usePage } from '@inertiajs/react';
import Avatar from '@/components/avatar';

dayjs.extend(relativeTime);

type pageProps = {
    feedbacks: PaginatedFeedbacks;
}

export default function Posts({ feedbacks: initialFeedbacks }: pageProps) {
    const { auth } = usePage<PageProps>().props

    const [openModal, setOpenModal] = useState(false);
    const [commentModal, setCommentModal] = useState(false);
    const [selectedComment, setSelectedComment] = useState<Feedback | null>(null);
    const [feedbacks, setFeedbacks] = useState<PaginatedFeedbacks>(initialFeedbacks);

    useEffect(() => {
        setFeedbacks(initialFeedbacks);
    }, [initialFeedbacks]);

    useEffect(() => {
        if (!selectedComment) return;

        const updatedSelectedComment = feedbacks.data.find(feedback => feedback.id === selectedComment.id);

        if (updatedSelectedComment && updatedSelectedComment !== selectedComment) {
            setSelectedComment(updatedSelectedComment);
        }
    }, [feedbacks, selectedComment]);

    const handleClose = () => {
        setCommentModal(false)
        setSelectedComment(null)
    }

    const handleFeedbackUpdate = (updatedFeedback: Feedback) => {
        setSelectedComment(updatedFeedback)

        const updatedFeedbacks = {
            ...feedbacks,
            data: feedbacks.data.map(fb =>
                fb.id === updatedFeedback.id ? updatedFeedback : fb
            )
        }
        setFeedbacks(updatedFeedbacks)
    }

    const handleFeedbackDelete = () => {
        if (selectedComment) {
            setFeedbacks({
                ...feedbacks,
                data: feedbacks.data.filter(feedback => feedback.id !== selectedComment.id)
            })
        }

        handleClose()
    }

    return (
        <AuthenticatedLayout>
            <div className="flex flex-col gap-10 px-50 py-30">
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className="font-semibold text-4xl">My Feedbacks</h1>
                        <p className="text-gray-500">View, manage, and track the feedback you’ve shared with the community.</p>
                    </div>

                    <button
                        onClick={() => setOpenModal(true)}
                        className={`text-xs flex items-center justify-center text-center gap-2
                            border-2 border-white bg-violet-500 text-white rounded-md py-3
                            w-[15%] cursor-pointer transition-all duration-300
                            hover:-translate-y-1 hover:bg-violet-700 hover:border-violet-700 ${
                                feedbacks.data.length !== 0 ? 'block' : 'hidden'
                            }`}
                    >
                        Post a Feedback
                        <MessageSquareMore size={18} />
                    </button>
                </div>

                <div>
                    {feedbacks.data.length === 0 && (
                        <div className="h-96 flex justify-center items-center">
                            <div className="flex flex-col text-center mb-5 justify-center items-center">
                                <img
                                    src="/images/no-data.svg"
                                    alt="No data"
                                    className="h-15 opacity-50 mb-5"
                                />
                                <h1 className='text-gray-500 font-medium mb-2'>No feedback yet</h1>
                                <p className="text-gray-500 text-xs w-96 mb-5">You haven't submitted feedback yet. Share an idea, report an issue, or suggest, an improvement to get started.</p>

                                <button
                                    onClick={() => setOpenModal(true)}
                                    className="text-xs flex items-center justify-center text-center gap-2
                                        border-2 border-white bg-violet-500 text-white rounded-md py-2
                                        w-[50%] cursor-pointer transition-all duration-300
                                        hover:-translate-y-1 hover:bg-violet-700 hover:border-violet-700"
                                >
                                    Post a Feedback
                                    <MessageSquareMore size={18} />
                                </button>
                            </div>

                        </div>
                    )}
                    <div className="grid grid-cols-3 gap-4">
                        {feedbacks.data.map(feedback => {
                            const statusConfig = STATUS_CONFIG[feedback.status] || {
                                label: feedback.status,
                                className: 'bg-gray-100 text-gray-700'
                            };


                            const categoryConfig = CATEGORY_CONFIG[feedback.category as FeedbackCategory] || {
                                label: feedback.category,
                                className: 'bg-gray-100 text-gray-700'
                            };

                            return (
                                <div
                                    onClick={() => {
                                        setSelectedComment(feedback)
                                        setCommentModal(true)
                                    }}
                                    key={feedback.id}
                                    className='flex flex-col justify-between gap-5 bg-white border border-slate-100 rounded-2xl transition-all duration-300 shadow-md hover:border-violet-200 hover:shadow-xl cursor-pointer'
                                >
                                    <div className="flex items-center gap-2 px-6 pt-6">
                                        {auth.user?.avatar ? (
                                            <div className=" w-10 h-10 flex items-center justify-center rounded-full shadow-lg">
                                                <img
                                                    src={auth.user.avatar}
                                                    alt={auth.user.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <Avatar size="sm"/>
                                        )}

                                        <div className='flex flex-col'>
                                            <p className='font-medium text-base'>
                                                {feedback.user.name}
                                            </p>
                                            <p className='text-xs text-gray-500'>
                                                {dayjs(feedback.created_at).format('MMM D, YYYY')} • {dayjs(feedback.created_at).fromNow()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='px-6'>
                                        <div className='flex gap-1'>
                                            <span className={`text-[9px] px-3 py-1 rounded-md border uppercase ${statusConfig.className}`}>
                                                {statusConfig.label}
                                            </span>
                                            <span className={`text-[9px] px-3 py-1 rounded-md font-medium ${categoryConfig.className}`}>
                                                {categoryConfig.label}
                                            </span>
                                        </div>

                                        <h1 className='my-3 text-sm font-medium'>
                                            {feedback.title}
                                        </h1>
                                        <p className='text-sm line-clamp-4 text-gray-500'>
                                            {feedback.description}
                                        </p>
                                    </div>
                                    <div className='border border-t-2 w-full grid grid-cols-3 rounded-bl-lg rounded-br-lg'>
                                        <div className=' flex justify-center items-center gap-1 py-3'>
                                            <ThumbsUp
                                                size={18}
                                                strokeWidth={1.5}
                                                className='transition-all duration-300 transform hover:text-blue-500 hover:-translate-y-1 cursor-pointer'
                                            />
                                            <p className='text-sm'>{feedback.votes}</p>
                                        </div>

                                        <div className=' flex justify-center py-3'>
                                            <MessageSquareMore
                                                size={20}
                                                strokeWidth={1.5}
                                                className='transition-all duration-300 transform hover:text-blue-500 hover:-translate-y-1 cursor-pointer'
                                            />
                                            <p className='text-sm ml-1'>{feedback.comments_count || 0}</p>
                                        </div>

                                        <button
                                            onClick={() => {
                                                setSelectedComment(feedback)
                                                setCommentModal(true)
                                            }}
                                            className='flex justify-center items-center py-3'
                                        >
                                            <p className='transition-all duration-300 hover:text-blue-500 cursor-pointer text-xs'>View Post</p>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    <div className="mt-8">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href={feedbacks.prev_page_url || "#"}
                                        className={!feedbacks.prev_page_url ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>

                                {feedbacks.links.map((link, i) => {
                                    if (link.label.includes('Previous') || link.label.includes('Next')) return null;

                                    if (link.label === "...") {
                                        return (
                                            <PaginationItem key={i}>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        );
                                    }

                                    return (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                href={link.url || "#"}
                                                isActive={link.active}
                                            >
                                                {link.label}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                })}

                                <PaginationItem>
                                    <PaginationNext
                                        href={feedbacks.next_page_url || "#"}
                                        className={!feedbacks.next_page_url ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </div>

            <PostModal
                open={openModal}
                onClose={() => setOpenModal(false)}
            />

            <CommentsModal
                auth={auth}
                open={commentModal}
                commentModal={commentModal}
                feedback={selectedComment}
                onClose={handleClose}
                onFeedbackUpdate={handleFeedbackUpdate}
                onFeedbackDelete={handleFeedbackDelete}
            />
        </AuthenticatedLayout>
    )
}
