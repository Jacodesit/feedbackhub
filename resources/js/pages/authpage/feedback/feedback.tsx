import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/layouts/auth/authenticated-layout";
import { PageProps } from "@/types/feedbackhub";
import { MessageSquareMore } from "lucide-react";
import PostModal from "./components/modal";
import { useState } from "react";

export default function Home() {
    const { auth } = usePage<PageProps>().props;
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
                        <div className="w-3/4 bg-white flex flex-col gap-5">
                            <div>
                                <h1 className="font-medium text-4xl mb-5">Welcome to FeedackHub, <span className="text-violet-500 border-b-4 border-b-violet-500">{auth.user?.name}</span>.</h1>
                                <p
                                    className="text-2xl "
                                >
                                    Manage feedback, track user ideas, and prioritize what matters most in one centralized workspace. Stay aligned with your community through organized discussions, real-time updates, and clear progress tracking. Everything you need to turn user insights into smarter product decisions starts here.
                                </p>
                            </div>
                            <p
                                onClick={() => setOpenModal(true)}
                                className="flex items-center justify-center text-center gap-2 border-2 border-white bg-violet-500 text-white rounded-md py-3 w-[25%] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700 hover:border-violet-700"
                            >
                                Post a Feedback
                                <MessageSquareMore size={18} />
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <PostModal
                open={openModal}
                onClose={() => setOpenModal(false)}
            />
        </AuthenticatedLayout>
    )
}
