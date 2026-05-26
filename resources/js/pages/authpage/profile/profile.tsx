import AuthenticatedLayout from "@/layouts/auth/authenticated-layout";
import { PaginatedFeedbacks, UserStats } from "@/types/feedbackhub";
import ProfileMainLayout from "./components/layout/main-layout";

type pageProps = {
    feedbacks: PaginatedFeedbacks
    stats: UserStats
}

export default function Profile({feedbacks, stats}:pageProps) {
    return (
        <AuthenticatedLayout>
            <div className="bg-[#fafafa]">
                <ProfileMainLayout feedbacks={feedbacks} stats={stats}/>
            </div>
        </AuthenticatedLayout>
    )
}
