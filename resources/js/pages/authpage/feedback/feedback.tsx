import { CATEGORY_CONFIG, FeedbackCategory, STATUS_CONFIG } from '@/components/constants/feedback';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/layouts/auth/authenticated-layout";
import { MessageSquareMore, ThumbsUp } from "lucide-react";
import PostModal from "./components/modal";
import { useEffect, useState } from "react";
import { Feedback, PageProps, ReportReason, UserReportReason } from "@/types/feedbackhub";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import CommentsModal from '../profile/components/modals/comment';
// import { toast } from 'sonner';
// import AuthDialog from '@/components/dialog/error';
import CommentForm from '../profile/components/forms/comment';
import Avatar from '@/components/avatar/profile';
import Action from './components/actions';

dayjs.extend(relativeTime);

type pageProps = {
    reasons: Record<ReportReason, string>
    user_reasons: Record<UserReportReason, string>
}

export default function Home({reasons, user_reasons}:pageProps) {
    const { auth, feedbacks } = usePage<PageProps>().props;
    const [openModal, setOpenModal] = useState(false);
    const [viewFeedback, setViewFeedback] = useState(false)
    const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)
    // const [showAuth, setShowAuth] = useState(false);
    // const [authHeadline, setAuthHeadline] = useState('');
    // const [authSubtext, setAuthSubtext] = useState('');

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

    // const handleVote = (feedbackId: number) => {
    //     router.post(route('feedbacks.votes.store', feedbackId), {}, {
    //         preserveScroll: true,
    //         onError: (errors) => {
    //             if (errors.auth) {
    //                 setAuthHeadline('Sign in required')
    //                 setAuthSubtext('This action is available only to authenticated or logged in users. Log in to proceed.')
    //                 setShowAuth(true)
    //             }
    //         },

    //         onSuccess: () => {
    //             toast.success('Vote successfully')
    //         }
    //     })
    // }

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
                    <div className="relative z-10 px-5 md:px-28 lg:px-50 flex items-center h-full">
                        <div className="w-full lg:w-3/4 flex flex-col gap-5">
                            <div>
                                <div className='flex items-center gap-1 mb-3 lg:mb-5'>
                                    <p className='text-xl md:text-2xl'>Hello!</p>
                                    <span className="text-violet-500 border-b-4 text-xl md:text-2xl border-b-violet-500"
                                    >
                                        {auth.user?.name?.split(" ").slice(0, -1).join(" ")}
                                    </span>
                                </div>

                                <h1 className="font-medium text-2xl lg:text-5xl mb-3 lg:mb-5">
                                    Welcome to FeedackHub
                                </h1>
                                <p className="text-sm lg:text-2xl">
                                    Manage feedback, track user ideas, and prioritize what matters most
                                    in one centralized workspace. Stay aligned with your community through
                                    organized discussions, real-time updates, and clear progress tracking.
                                    Everything you need to turn user insights into smarter product decisions
                                    starts here.
                                </p>
                            </div>
                            <button
                                onClick={() => setOpenModal(true)}
                                className="text-xs flex items-center justify-center text-center gap-2
                                    border-2 border-white bg-gray-900 text-white rounded-md py-2 lg:py-3
                                    w-[50%] lg:w-[25%] cursor-pointer transition-all duration-300
                                    hover:-translate-y-1 hover:bg-black hover:border-white"
                            >
                                Post a Feedback
                                <MessageSquareMore size={18} />
                            </button>
                        </div>
                    </div>
                </section>

                <section className="">
                    <div className="px-5 md:px-28 lg:px-50 py-10 lg:py-20">
                        <div className="mb-10">
                            <h1 className="font-bold text-2xl md:text-3xl lg:text-5xl">Community Feedback</h1>
                            <p className="text-sm lg:text-lg text-gray-500">
                                Explore ideas, feature requests, and product improvements shared by the community.
                            </p>
                        </div>

                        <div className="grid grid-rows-1 lg:grid-cols-2 gap-4">
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
                                        key={feedback.id}
                                        className='flex flex-col justify-between gap-5 border rounded-lg bg-[#fff] shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer pt-3'
                                    >
                                        <div className='flex justify-between items-center'>
                                            <div className="flex items-center gap-2 px-5 py-3">
                                                {feedback.user.avatar ? (
                                                    <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full shadow-lg">
                                                        <img
                                                            src={feedback.user.avatar}
                                                            alt={feedback.user.name}
                                                            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <Avatar user={feedback.user} size="md"/>
                                                )}

                                                <div className='flex flex-col'>
                                                    <p className='font-medium text-sm lg:text-base'>
                                                        {feedback.user.name}
                                                    </p>
                                                    <p className='text-[9px] md:text-xs text-gray-500'>
                                                        {dayjs(feedback.created_at).format('MMM D, YYYY')} • {dayjs(feedback.created_at).fromNow()}
                                                    </p>
                                                </div>
                                            </div>

                                            <Action
                                                reasons={reasons}
                                                feedback={feedback}
                                                userReasons={user_reasons}
                                            />
                                        </div>

                                        {/* Clickable area */}
                                        <div
                                            onClick={() => {
                                                setSelectedFeedback(feedback)
                                                setViewFeedback(true)
                                            }}
                                            className='px-5 h-44 md:h-48 flex flex-col justify-between'
                                        >
                                            <div className=''>
                                                <div className='flex gap-1 mb-2'>
                                                    <span className={`text-[9px] px-3 py-1 rounded-md border uppercase ${statusConfig.className}`}>
                                                        {statusConfig.label}
                                                    </span>
                                                    <span className={`text-[9px] px-3 py-1 rounded-md font-medium ${categoryConfig.className}`}>
                                                        {categoryConfig.label}
                                                    </span>
                                                </div>

                                                <h1 className='text-sm md:text-base font-medium mb-2'>
                                                    {feedback.title}
                                                </h1>

                                                <p className='text-[11px] md:text-sm line-clamp-4 text-gray-500 '>
                                                    {feedback.description}
                                                </p>
                                            </div>

                                            <div className='flex gap-5'>
                                                <div className='flex items-center gap-1'>
                                                    <ThumbsUp
                                                        size={16}
                                                        strokeWidth={1.5}
                                                        className='text-gray-500'
                                                    />
                                                    <p className='text-xs md:text-sm'>{feedback.votes}</p>
                                                </div>

                                                <div className='flex items-center gap-1'>
                                                    <MessageSquareMore
                                                        size={16}
                                                        strokeWidth={1.5}
                                                        className='text-gray-500'
                                                    />
                                                    <p className='text-xs md:text-sm'>{feedback.comments_count || 0}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex items-center gap-2 border-t w-full rounded-bl-lg rounded-br-lg px-5 py-3 bg-slate-50'>
                                            <CommentForm
                                                feedback={feedback}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        <div className="mt-8">
                            <Pagination className='justify-center lg:justify-end'>
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
                auth={auth}
                open={viewFeedback}
                feedback={selectedFeedback}
                onClose={handleClose}
                commentModal
            />

            {/* <AuthDialog
                openDialog={showAuth}
                onClose={() => setShowAuth(false)}
                authHeadline={authHeadline}
                authSubtext={authSubtext}
            /> */}
        </AuthenticatedLayout>
    );
}
