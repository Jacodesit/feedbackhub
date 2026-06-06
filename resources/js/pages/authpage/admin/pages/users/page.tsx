import { PaginatedUsers } from "@/types/feedbackhub";
import AdminLayout from "../../layout/AdminLayout";
import UsersTable from "./components/table";

type pageProps = {
    users: PaginatedUsers
}

export default function Users({users}:pageProps) {
    return (
        <AdminLayout>
            <UsersTable users={users} />
        </AdminLayout>
    )
}
