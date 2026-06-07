import AdminLayout from "../../../layout/AdminLayout";
import FeedbacksTable from "../../feedbacks/components/table";
import { Button } from "@/components/ui/button";
import { PaginatedFeedbacks, User } from "@/types/feedbackhub";
import { Link } from "@inertiajs/react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

type PageProps = {
    user: Pick<User, "id" | "name" | "email" | "public_id" | "avatar" | "created_at">;
    feedbacks: PaginatedFeedbacks;
    activityCounts: {
        feedbacks: number;
        comments: number;
        votes: number;
    };
}

export default function FullActivity({user, feedbacks, activityCounts}: PageProps) {
    return (
        <AdminLayout>
            <section className="space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-medium uppercase text-gray-500">User Activity</p>
                        <h1 className="text-2xl font-semibold">{user.name}</h1>
                        <p className="text-sm text-gray-500">{user.email} - {user.public_id}</p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={route("admin.users")}>Back to users</Link>
                    </Button>
                </div>
                <Tabs defaultValue="feedbacks" className="">
                    <TabsList className="bg-[#fafafa] border">
                        <TabsTrigger value="feedbacks">Feedbacks ({activityCounts.feedbacks})</TabsTrigger>
                        <TabsTrigger value="comments">Comments ({activityCounts.comments})</TabsTrigger>
                        <TabsTrigger value="votes">Votes ({activityCounts.votes})</TabsTrigger>
                    </TabsList>
                    <TabsContent value="feedbacks">
                        <FeedbacksTable feedbacks={feedbacks} />
                    </TabsContent>
                </Tabs>

            </section>
        </AdminLayout>
    )
}
