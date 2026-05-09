import { STATUS_CONFIG } from '@/components/constants/feedback';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/layouts/auth/authenticated-layout";
import { MessageSquareMore } from "lucide-react";
import PostModal from "./components/modal";
import { useState } from "react";
import { PageProps } from "@/types/feedbackhub";

dayjs.extend(relativeTime);

export default function Home() {
    const { auth, feedbacks } = usePage<PageProps>().props;
    const [openModal, setOpenModal] = useState(false);

    return (
        <AuthenticatedLayout>
            <div className="">
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
                                <h1 className="font-medium text-4xl mb-5">
                                    Welcome to FeedackHub,{" "}
                                    <span className="text-violet-500 border-b-4 border-b-violet-500">
                                        {auth.user?.name}
                                    </span>
                                    .
                                </h1>
                                <p className="text-2xl">
                                    Manage feedback, track user ideas, and prioritize what matters most
                                    in one centralized workspace. Stay aligned with your community through
                                    organized discussions, real-time updates, and clear progress tracking.
                                    Everything you need to turn user insights into smarter product decisions
                                    starts here.
                                </p>
                            </div>
                            <p
                                onClick={() => setOpenModal(true)}
                                className="flex items-center justify-center text-center gap-2
                                    border-2 border-white bg-violet-500 text-white rounded-md py-3
                                    w-[25%] cursor-pointer transition-all duration-300
                                    hover:-translate-y-1 hover:bg-violet-700 hover:border-violet-700"
                            >
                                Post a Feedback
                                <MessageSquareMore size={18} />
                            </p>
                        </div>
                    </div>
                </section>

                <section className="">
                    <div className="px-50 py-20">
                        <div className="mb-10">
                            <h1 className="font-bold text-5xl">Community Feedback</h1>
                            <p className="text-lg">
                                Explore ideas, feature requests, and product improvements shared by the community.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {feedbacks.map(feedback => {
                                const statusConfig = STATUS_CONFIG[feedback.status] || {
                                    label: feedback.status,
                                    className: 'bg-gray-100 text-gray-700'
                                };

                                return (
                                    <div
                                        key={feedback.id}
                                        className='flex flex-col gap-4 border p-5 rounded-lg'
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="border-2 border-white w-14 h-14 flex items-center justify-center rounded-full bg-violet-500 text-white">
                                                <p className="font-bold text-2xl">
                                                    {feedback.user.name.charAt(0)}
                                                </p>
                                            </div>
                                            <div className='flex flex-col'>
                                                <p className='font-medium text-lg'>
                                                    {feedback.user.name}
                                                </p>
                                                <p className='text-xs text-gray-500'>
                                                    {dayjs(feedback.created_at).format('MMM D, YYYY')} • {dayjs(feedback.created_at).fromNow()}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <span className={`text-[9px] px-3 py-1 rounded-md border uppercase ${statusConfig.className}`}>
                                                {statusConfig.label}
                                            </span>
                                            <h1 className='my-3 text-sm font-medium'>
                                                {feedback.title}
                                            </h1>
                                            <p className='text-sm'>
                                                {feedback.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
            <PostModal
                open={openModal}
                onClose={() => setOpenModal(false)}
            />
        </AuthenticatedLayout>
    );
}
