import AdminLayout from "../../../layout/AdminLayout";
import FeedbacksTable from "../../feedbacks/components/table";
import { Button } from "@/components/ui/button";
import { PaginatedComments, PaginatedFeedbacks, PaginatedVotes, User } from "@/types/feedbackhub";
import { Link } from "@inertiajs/react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import CommentsTable from "./tables/comments";
import VotesTable from "./tables/votes";
import { useState } from "react";

type PageProps = {
    user: Pick<User, "id" | "name" | "email" | "public_id" | "avatar" | "created_at">;
    feedbacks: PaginatedFeedbacks;
    comments: PaginatedComments;
    votes: PaginatedVotes;
    activityCounts: {
        feedbacks: number;
        comments: number;
        votes: number;
    };
    activeTab?: string;
}

export default function FullActivity({user, feedbacks, comments, activityCounts, votes, activeTab = 'feedbacks'}: PageProps) {
    const [currentTab, setCurrentTab] = useState(activeTab);

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
                <Tabs
                    value={currentTab}
                    onValueChange={setCurrentTab}
                >
                    <TabsList className="bg-[#fafafa] border">
                        <TabsTrigger className="text-xs" value="feedbacks">Feedbacks ({activityCounts.feedbacks})</TabsTrigger>
                        <TabsTrigger className="text-xs" value="comments">Comments ({activityCounts.comments})</TabsTrigger>
                        <TabsTrigger className="text-xs" value="votes">Votes ({activityCounts.votes})</TabsTrigger>
                    </TabsList>
                    <TabsContent value="feedbacks">
                        <FeedbacksTable feedbacks={feedbacks} tab="feedbacks" />
                    </TabsContent>
                    <TabsContent value="comments">
                        <CommentsTable comments={comments} tab="comments" />
                    </TabsContent>
                    <TabsContent value="votes">
                        <VotesTable votes={votes} tab="votes" />
                    </TabsContent>
                </Tabs>
            </section>
        </AdminLayout>
    )
}
