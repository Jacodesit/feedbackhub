import { Feedback, Stats } from "@/types/feedbackhub";
import AdminLayout from "../../layout/AdminLayout";
import StatisticsCard from "./components/cards/statistics/statistics";
import RecentFeedbacks from "./components/cards/feedbacks/feedbacks";
import TopVotedFeedback from "./components/cards/counts/countsFeedback";
import RecentUsers from "./components/cards/users/users";
import { User } from "@/types";
import CategoryBreakdown from "./components/graph/categorybreakdown";

type pageProps = {
    recentFeedbacks: Feedback[];
    topFeedbacks: Feedback[];
    recentUsers: User[];
    stats: Stats;
}

export default function Dashboard({recentFeedbacks, topFeedbacks, recentUsers, stats}:pageProps) {
    return (
        <AdminLayout>
            <div className="flex flex-col gap-5 ">
                <div>
                    <h1 className="mb-5">Statistics</h1>
                    <StatisticsCard stats={stats} />
                </div>

                <div className="flex gap-3">
                    <div className="w-2/3">
                        <div className="flex items-center justify-between mb-5">
                            <h1 className="">Recent Feedback</h1>

                        </div>
                        <RecentFeedbacks recentFeedbacks={recentFeedbacks} />
                    </div>

                    <div className="w-1/3 flex flex-col">
                        <h1 className="mb-5">Most Voted Feedback</h1>
                        <TopVotedFeedback topFeedbacks={topFeedbacks} />
                    </div>
                </div>

                <div>
                    <h1 className="mb-5">Recent Users</h1>
                    <RecentUsers recentUsers={recentUsers} />
                </div>

                <div className="w-full min-w-0">
                    <h1 className="mb-5">Category Breakdown</h1>
                    <CategoryBreakdown  />
                </div>
            </div>
        </AdminLayout>
    )
}
