import AdminLayout from "../../layout/AdminLayout";
import LeaderboardTable from "./components/table";
import { PaginatedUsers } from "@/types/feedbackhub";

type pageProps = {
    users: PaginatedUsers
}

export default function Leaderboard({users}: pageProps) {
    return (
        <AdminLayout>
            <LeaderboardTable users={users}/>
        </AdminLayout>
    )
}
