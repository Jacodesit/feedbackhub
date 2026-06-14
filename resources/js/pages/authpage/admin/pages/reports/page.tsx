import { PaginatedReports } from "@/types/feedbackhub";
import SearchComponent from "../../components/search";
import AdminLayout from "../../layout/AdminLayout";
import ReportTable from "./components/table";
import StatusFilter from "./components/filters/dropdowns/status";
import ReasonFilter from "./components/filters/dropdowns/reasons";

type pageProps = {
    reports: PaginatedReports
}

export default function Reports({reports}:pageProps) {
    return (
        <AdminLayout>
            <div className="flex justify-end gap-2">
                <SearchComponent />
                <ReasonFilter />
                <StatusFilter />
            </div>
            <ReportTable reports={reports} />
        </AdminLayout>
    )
}
