import { PaginatedReports } from "@/types/feedbackhub";
import SearchComponent from "../../components/search";
import AdminLayout from "../../layout/AdminLayout";
import ReportTable from "./components/table";

type pageProps = {
    reports: PaginatedReports
}

export default function Reports({reports}:pageProps) {
    return (
        <AdminLayout>
            <SearchComponent />
            <ReportTable reports={reports} />
        </AdminLayout>
    )
}
