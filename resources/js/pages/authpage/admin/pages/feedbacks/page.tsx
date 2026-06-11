import { PaginatedFeedbacks } from "@/types/feedbackhub";
import AdminLayout from "../../layout/AdminLayout";
import FeedbacksTable from "./components/tables/table";
import SearchComponent from "../../components/search";
import StatusFilter from "./components/dropdowns/status";
import CategoryFilter from "./components/dropdowns/category";
import TimelineFilter from "./components/dropdowns/timeline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PinnedFeedbacksTable from "./components/tables/pinned";
import { router } from "@inertiajs/react";

type pageProps = {
    feedbacks: PaginatedFeedbacks
    pinnedFeedbacks: PaginatedFeedbacks
    tab: string
}

export default function Feedbacks({feedbacks, tab, pinnedFeedbacks}:pageProps) {
    const handleTabChange = (newTab: string) => {
        router.get('/admin/feedbacks',
            { tab: newTab },
            {
                preserveState: false,
                preserveScroll: false,
                replace: true
            }
        );
    };

    return (
        <AdminLayout>
            <div className="gap-2">
                <Tabs value={tab} onValueChange={handleTabChange}>
                    <section className="flex justify-between">
                        <TabsList className="">
                            <TabsTrigger value="feedback">Feedbacks</TabsTrigger>
                            <TabsTrigger value="pinned">Pinned Feedbacks</TabsTrigger>
                        </TabsList>
                        <div className="flex gap-2">
                            <SearchComponent />
                            <TimelineFilter />
                            <StatusFilter />
                            <CategoryFilter />
                        </div>
                    </section>

                    <TabsContent value="feedback">
                        <FeedbacksTable feedbacks={feedbacks} tab={tab} />
                    </TabsContent>
                    <TabsContent value="pinned">
                        <PinnedFeedbacksTable pinnedFeedbacks={pinnedFeedbacks} tab={tab} />
                    </TabsContent>
                </Tabs>

            </div>
        </AdminLayout>
    )
}
