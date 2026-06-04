import { PaginatedFeedbacks } from "@/types/feedbackhub";
import AdminLayout from "../../layout/AdminLayout";
import FeedbacksTable from "./components/table";

type pageProps = {
    feedbacks: PaginatedFeedbacks
}

export default function Feedbacks({feedbacks}:pageProps) {
    return (
        <AdminLayout>
            <FeedbacksTable feedbacks={feedbacks} />
        </AdminLayout>
    )
}
