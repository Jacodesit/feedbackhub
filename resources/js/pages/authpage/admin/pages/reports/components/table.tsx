import Avatar from "@/components/avatar/profile"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { STATUS_CONFIG, REASON_CONFIG } from "@/components/constants/reports";
import { PaginatedReports, Report } from "@/types/feedbackhub"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from "react";
import ReportDetails from "./details";

dayjs.extend(relativeTime)

type pageProps = {
    reports: PaginatedReports
}

export default function ReportTable({reports}:pageProps) {
    const [openReport, setOpenReport] = useState(false);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null)

    return (
        <section className="flex flex-col justify-between">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Reporter</TableHead>
                        <TableHead>Feedback Title</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Reported At</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reports.data.map(report => {
                        const statusConfig = STATUS_CONFIG[report.status] || {
                            label: report.status,
                            className: 'bg-gray-100 text-gray-700'
                        };

                        const reasonConfig = REASON_CONFIG[report.reason] || {
                            label: report.reason,
                            className: 'bg-gray-100 text-gray-700'
                        };

                        return (
                            <TableRow
                                key={report.id}
                            >
                                <TableCell className="flex items-center gap-2">
                                    <Avatar user={report.reporter} size="sm" />
                                    <div>
                                        <h3 className="font-medium text-xs">{report.reporter.name}</h3>
                                        <p className="text-xs text-gray-500">{report.reporter.email}</p>
                                    </div>
                                </TableCell>

                                <TableCell className="text-xs">{report.feedback.title}</TableCell>

                                <TableCell>
                                    <span className={`text-[9px] px-3 py-1 rounded-md font-medium ${reasonConfig.className}`}>
                                        {reasonConfig.label}
                                    </span>
                                </TableCell>

                                <TableCell>
                                    <div>
                                        <p className="font-medium text-xs">{dayjs(report.created_at).format('MMM D, YYYY')}</p>
                                        <p className="text-xs text-gray-500">{dayjs(report.created_at).fromNow()}</p>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <span className={`text-[9px] px-3 py-1 rounded-md font-medium ${statusConfig.className}`}>
                                        {statusConfig.label}
                                    </span>
                                </TableCell>

                                <TableCell>
                                    <button
                                        onClick={() => {
                                            setOpenReport(true)
                                            setSelectedReport(report)
                                        }}
                                        className="text-blue-600 hover:underline text-xs"
                                    >
                                        View
                                    </button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

            {selectedReport && (
                <ReportDetails
                    open={openReport}
                    onClose={() => setOpenReport(false)}
                    report={selectedReport}
                />
            )}

        </section>
    )
}
