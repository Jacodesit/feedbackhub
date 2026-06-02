import { Feedback } from "@/types/feedbackhub";
import AdminLayout from "../../layout/AdminLayout";
import StatisticsCard from "./components/cards/statistics/statistics";
import RecentFeedbacks from "./components/cards/feedbacks/feedbacks";
import { Link } from "@inertiajs/react";

type pageProps = {
    recentFeedbacks: Feedback[];
}

export default function Dashboard({recentFeedbacks}:pageProps) {
    return (
        <AdminLayout>
            <div className="flex flex-col gap-5">
                <div>
                    <h1 className="mb-5">Statistics</h1>
                    <StatisticsCard />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-5">
                        <h1 className="">Recent Feedback</h1>
                        <Link
                            href="/feedbacks"
                            className="text-xs text-gray-500 underline transition-all duration-300 hover:text-blue-500"
                        >
                            View all feedbacks
                        </Link>
                    </div>
                    <RecentFeedbacks recentFeedbacks={recentFeedbacks} />
                </div>
            </div>
        </AdminLayout>
    )
}
