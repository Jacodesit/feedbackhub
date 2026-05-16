import { CATEGORY_CONFIG, FeedbackCategory, STATUS_CONFIG } from '@/components/constants/feedback';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/layouts/auth/authenticated-layout";
import { MessageSquareMore, ThumbsUp } from "lucide-react";
import PostModal from "./components/modal";
import { useEffect, useState } from "react";
import { Feedback, PageProps } from "@/types/feedbackhub";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import CommentsModal from '../profile/components/modal';
import { toast } from 'sonner';

dayjs.extend(relativeTime);

export default function Home() {
    const { auth, feedbacks } = usePage<PageProps>().props;
    const [openModal, setOpenModal] = useState(false);
    const [viewFeedback, setViewFeedback] = useState(false)
    const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)

    const handleClose = () => {
        setViewFeedback(false)
        setSelectedFeedback(null)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({
                only: ['feedbacks'],
            })
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (selectedFeedback && feedbacks?.data) {
            const updatedFeedback = feedbacks.data.find(f => f.id === selectedFeedback.id)
            if(updatedFeedback) {
                setSelectedFeedback(updatedFeedback)
            }
        }
    }, [feedbacks])

    const handleVote = (feedbackId: number) => {
        router.post(route('feedbacks.votes.store', feedbackId), {}, {
            preserveScroll: true,

            onSuccess: () => {
                toast.success('Vote successfully')
            }
        })
    }

    return (
        <AuthenticatedLayout>
            <div className="bg-[#fafafa]">
                <section className="h-screen w-full bg-white relative">
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                                linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                            `,
                            backgroundSize: "60px 60px",
                        }}
                    />
                    <div className="relative z-10 px-50 flex items-center h-full">
                        <div className="w-3/4 flex flex-col gap-5">
                            <div>
                                <div className='flex items-center gap-1 mb-5'>
                                    <p className='text-2xl'>Hello!</p>
                                    <span className="text-violet-500 border-b-4 text-2xl border-b-violet-500"
                                    >
                                        {auth.user?.name?.split(" ").slice(0, -1).join(" ")}
                                    </span>
                                </div>

                                <h1 className="font-medium text-5xl mb-5">
                                    Welcome to FeedackHub
                                </h1>
                                <p className="text-2xl">
                                    Manage feedback, track user ideas, and prioritize what matters most
                                    in one centralized workspace. Stay aligned with your community through
                                    organized discussions, real-time updates, and clear progress tracking.
                                    Everything you need to turn user insights into smarter product decisions
                                    starts here.
                                </p>
                            </div>
                            <button
                                onClick={() => setOpenModal(true)}
                                className="flex items-center justify-center text-center gap-2
                                    border-2 border-white bg-violet-500 text-white rounded-md py-3
                                    w-[25%] cursor-pointer transition-all duration-300
                                    hover:-translate-y-1 hover:bg-violet-700 hover:border-violet-700"
                            >
                                Post a Feedback
                                <MessageSquareMore size={18} />
                            </button>
                        </div>
                    </div>
                </section>

                <section className="">
                    <div className="px-50 py-20">
                        <div className="mb-10">
                            <h1 className="font-bold text-5xl">Community Feedback</h1>
                            <p className="text-lg text-gray-500">
                                Explore ideas, feature requests, and product improvements shared by the community.
                            </p>
                        </div>

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
                                        // onClick={() => {
                                        //     setSelectedFeedback(feedback)
                                        //     setViewFeedback(true)
                                        // }}
                                        key={feedback.id}
                                        className='flex flex-col justify-between gap-5 border rounded-lg bg-[#fff] shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer'
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
                                            <p className='text-sm line-clamp-4 text-gray-500'>
                                                {feedback.description}
                                            </p>
                                        </div>
                                        <div className='border border-t-2 w-full grid grid-cols-3 rounded-bl-lg rounded-br-lg'>
                                            <button
                                                onClick={() => handleVote(feedback.id)}
                                                className=' flex justify-center items-center gap-1 py-3'
                                            >
                                                <ThumbsUp
                                                    size={20}
                                                    strokeWidth={1.5}
                                                    className={`transition-all duration-300 transform hover:text-blue-500 hover:-translate-y-1 cursor-pointer ${feedback.votes !== 0
                                                        ? 'text-blue-500 font-medium' : ''
                                                    }`}
                                                />
                                                <p className='text-base'>{feedback.votes}</p>
                                            </button>

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
                                                    setSelectedFeedback(feedback)
                                                    setViewFeedback(true)
                                                }}
                                                className=' flex justify-center items-center py-3'
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
                </section>
            </div>

            <PostModal
                open={openModal}
                onClose={() => setOpenModal(false)}
            />

            <CommentsModal
                open={viewFeedback}
                feedback={selectedFeedback}
                onClose={handleClose}
                commentModal
            />
        </AuthenticatedLayout>
    );
}
