import { PaginatedReports, PaginatedUserReports } from "@/types/feedbackhub";
import SearchComponent from "../../components/search";
import AdminLayout from "../../layout/AdminLayout";
import ReportTable from "./components/table";
import StatusFilter from "./components/filters/dropdowns/status";
import ReasonFilter from "./components/filters/dropdowns/reasons";
import TimelineFilter from "../users/components/filters/dropdowns/timeline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { router } from "@inertiajs/react";
import ReportedUsersTable from "./components/tables/users";

type pageProps = {
    reports: PaginatedReports
    tab: string
    userReports: PaginatedUserReports
}

export default function Reports({reports, tab, userReports}:pageProps) {
        const handleTabChange = (newTab: string) => {
            router.get('/admin/reports',
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
                            <TabsTrigger value="feedback">Reported Feedbacks</TabsTrigger>
                            <TabsTrigger value="user">Reported Users</TabsTrigger>
                        </TabsList>
                        <div className="flex justify-end gap-2">
                            <SearchComponent />
                            <TimelineFilter />
                            <ReasonFilter />
                            <StatusFilter />
                        </div>
                    </section>
                    <TabsContent value="feedback">
                        <ReportTable reports={reports} />
                    </TabsContent>
                    <TabsContent value="user">
                        <ReportedUsersTable userReports={userReports} />
                    </TabsContent>
                </Tabs>
            </div>

        </AdminLayout>
    )
}
