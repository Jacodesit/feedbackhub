import { CATEGORY_CONFIG, FeedbackCategory, STATUS_CONFIG } from '@/components/constants/feedback';
import { Separator } from '@/components/ui/separator';

import { Feedback } from "@/types/feedbackhub";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { MessageSquareMore, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import CommentsModal from '../modal';

dayjs.extend(relativeTime);

type pageProps = {
    feedbacks: Feedback[];
}

export default function Feedbacks({feedbacks}:pageProps) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedComment, setSelectedComment] = useState<Feedback | null>(null);

    const handleClose = () => {
        setOpenModal(false)
        setSelectedComment(null)
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
                {feedbacks.length === 0 && (
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

            <CommentsModal
                openModal={openModal}
                feedback={selectedComment}
                onClose={handleClose}
                commentModal
            />
        </div>
    )
}
