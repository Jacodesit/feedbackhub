import { PaginatedUsers } from "@/types/feedbackhub";
import AdminLayout from "../../layout/AdminLayout";
import UsersTable from "./components/table";
import SearchComponent from "../../components/search";
import RoleFilter from "./components/dropdowns/role";
import TimelineFilter from "./components/dropdowns/timeline";

type pageProps = {
    users: PaginatedUsers
}

export default function Users({users}:pageProps) {
    return (
        <AdminLayout>
            <div className="flex justify-end gap-2">
                <SearchComponent />
                <RoleFilter />
                <TimelineFilter />
            </div>
            <UsersTable users={users} />
        </AdminLayout>
    )
}
