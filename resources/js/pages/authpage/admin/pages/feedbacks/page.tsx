import { PaginatedFeedbacks } from "@/types/feedbackhub";
import AdminLayout from "../../layout/AdminLayout";
import FeedbacksTable from "./components/table";
import SearchComponent from "../../components/search";
import StatusFilter from "./components/dropdowns/status";
import CategoryFilter from "./components/dropdowns/category";
import TimelineFilter from "./components/dropdowns/timeline";

type pageProps = {
    feedbacks: PaginatedFeedbacks
}

export default function Feedbacks({feedbacks}:pageProps) {
    return (
        <AdminLayout>
            <div className="flex justify-end gap-2">
                <SearchComponent />
                <TimelineFilter />
                <StatusFilter />
                <CategoryFilter />
            </div>
            <FeedbacksTable feedbacks={feedbacks} />
        </AdminLayout>
    )
}
