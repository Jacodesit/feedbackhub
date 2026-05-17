import { CATEGORY_CONFIG, FeedbackCategory, STATUS_CONFIG } from '@/components/constants/feedback';
import { Separator } from '@/components/ui/separator';
import { router } from '@inertiajs/react'

import { Feedback, PaginatedFeedbacks } from "@/types/feedbackhub";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { MessageSquareMore, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import CommentsModal from '../modals/comment';

dayjs.extend(relativeTime);

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
// import { Link } from "@inertiajs/react"

type pageProps = {
    feedbacks: PaginatedFeedbacks;
}

export default function Feedbacks({feedbacks}:pageProps) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedComment, setSelectedComment] = useState<Feedback | null>(null);

    useEffect(() => {
        if (!selectedComment) return;

        const updatedSelectedComment = feedbacks.data.find(feedback => feedback.id === selectedComment.id);

        if (updatedSelectedComment && updatedSelectedComment !== selectedComment) {
            setSelectedComment(updatedSelectedComment);
        }
    }, [feedbacks, selectedComment]);

    const handleClose = () => {
        setOpenModal(false)
        setSelectedComment(null)
    }

    const handleFeedbackUpdate = (updatedFeedback: Feedback) => {
        setSelectedComment(updatedFeedback)
    }

    const handlePageChange = (url: string | null) => {
        if (!url) return;
        router.visit(url, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                document.getElementById('section-feedbacks')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }
        })
    }

    return (
        <div id="section-feedbacks" className="py-5 px-10 scroll-mt-20">
            <div className="pb-4 flex items-centeer justify-between">
                <div>
                    <h2 className=" font-medium">Feedbacks</h2>
                    <p className="text-sm text-gray-400 ">Show your feedbacks</p>
                </div>
            </div>
            <div className="grid grid-rows-1 gap-4">
                {feedbacks.data.length === 0 && (
                    <div className="border border-dashed rounded-lg h-72 flex justify-center items-center">
                        <div className="flex flex-col gap-5">
                            <img
                                src="/images/no-data.svg"
                                alt="No data"
                                className="h-15 opacity-50"
                            />
                            <p className="text-gray-500 text-xs ">No posted feedback yet.</p>
                        </div>
                    </div>
                )}

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
                                setOpenModal(true)
                            }}
                            key={feedback.id}
                            className="bg-white border border-slate-100 p-6 rounded-2xl transition-all duration-300 shadow-md hover:border-violet-200 hover:shadow-xl cursor-pointer"
                        >
                            <div className=''>
                                <div className="flex justify-between">
                                    <div className='flex gap-1'>
                                        <span className={`text-[9px] px-3 py-1 rounded-md border uppercase ${statusConfig.className}`}>
                                            {statusConfig.label}
                                        </span>
                                        <span className={`text-[9px] px-3 py-1 rounded-md font-medium ${categoryConfig.className}`}>
                                            {categoryConfig.label}
                                        </span>
                                    </div>
                                    <p className='text-xs text-gray-500'>
                                        {dayjs(feedback.created_at).format('MMM D, YYYY')} • {dayjs(feedback.created_at).fromNow()}
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <h1 className='my-3 text-sm font-medium'>
                                        {feedback.title}
                                    </h1>
                                    <p className='text-sm line-clamp-3 text-gray-500'>
                                        {feedback.description}
                                    </p>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <div className="flex gap-5">
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
                                    </div>


                                    <div className=' flex justify-center items-center'>
                                        <p className='transition-all duration-300 hover:text-blue-500 cursor-pointer text-xs'>View Post</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e: React.MouseEvent) => { e.preventDefault(); handlePageChange(feedbacks.prev_page_url) }}
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
                                        href="#"
                                        isActive={link.active}
                                        onClick={(e: React.MouseEvent) => { e.preventDefault(); handlePageChange(link.url) }}
                                    >
                                        {link.label}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e: React.MouseEvent) => { e.preventDefault(); handlePageChange(feedbacks.next_page_url) }}
                                className={!feedbacks.next_page_url ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            <CommentsModal
                open={openModal}
                feedback={selectedComment}
                onClose={handleClose}
                commentModal
                onFeedbackUpdate={handleFeedbackUpdate}
                onFeedbackDelete={handleClose}
            />
        </div>
    )
}
