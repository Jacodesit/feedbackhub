import { CATEGORY_CONFIG, FeedbackCategory, STATUS_CONFIG } from '@/components/constants/feedback';
import AuthenticatedLayout from "@/layouts/auth/authenticated-layout";
import { Feedback } from "@/types/feedbackhub";
import { MessageSquareMore, ThumbsUp } from "lucide-react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import PostModal from '../feedback/components/modal';

dayjs.extend(relativeTime);

type pageProps = {
    feedbacks: Feedback[];
}

export default function Posts({feedbacks}:pageProps) {
    const [openModal, setOpenModal] = useState(false);

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
                                feedbacks.length !== 0 ? 'block' : 'hidden'
                            }`}
                    >
                        Post a Feedback
                        <MessageSquareMore size={18} />
                    </button>
                </div>

                <div>
                    {feedbacks.length === 0 && (
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
                        {feedbacks.map(feedback => {
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
                                    key={feedback.id}
                                    className='flex flex-col justify-between gap-6 border rounded-lg bg-[#fff] shadow-md transition-all duration-300 hover:shadow-lg'
                                >
                                    <div className="flex items-center gap-1 px-5 pt-5">
                                        <div className="border-2 border-white w-12 h-12 flex items-center justify-center rounded-full bg-violet-500 text-white">
                                            <p className="font-bold text-2xl">
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
                                    <div className='px-5'>
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
                                        <p className='text-sm line-clamp-4'>
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

                                        <div className=' flex justify-center items-center py-3'>
                                            <p className='transition-all duration-300 hover:text-blue-500 cursor-pointer text-xs'>View Post</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <PostModal
                open={openModal}
                onClose={() => setOpenModal(false)}
            />
        </AuthenticatedLayout>
    )
}
