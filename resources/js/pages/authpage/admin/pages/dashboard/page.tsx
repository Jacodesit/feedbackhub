import { Feedback } from "@/types/feedbackhub";
import AdminLayout from "../../layout/AdminLayout";
import StatisticsCard from "./components/cards/statistics/statistics";
import RecentFeedbacks from "./components/cards/feedbacks/feedbacks";

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
                    <h1 className="mb-5">Recent Feedback</h1>
                    <RecentFeedbacks recentFeedbacks={recentFeedbacks} />
                </div>
            </div>
        </AdminLayout>
    )
}
