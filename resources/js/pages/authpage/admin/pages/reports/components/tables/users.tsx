import Avatar from "@/components/avatar/profile"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Sheet,
    SheetContent,
    SheetHeader,
} from "@/components/ui/sheet"
import { STATUS_CONFIG, REASON_CONFIG } from "@/components/constants/reports";
import { PaginatedUserReports, UserReport } from "@/types/feedbackhub"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from "react";

dayjs.extend(relativeTime)

type pageProps = {
    userReports: PaginatedUserReports
}

export default function ReportedUsersTable({userReports}:pageProps) {
    const [openReport, setOpenReport] = useState(false);
    const [selectedReport, setSelectedReport] = useState<UserReport | null>(null)

    return (
        <section className="flex flex-col justify-between">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Reporter</TableHead>
                        <TableHead>Reported User</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Reported At</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userReports.data.map(report => {
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

                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar user={report.user} size="sm" />
                                        <div>
                                            <h3 className="font-medium text-xs">{report.user.name}</h3>
                                            <p className="text-xs text-gray-500">{report.user.email}</p>
                                        </div>
                                    </div>
                                </TableCell>

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
                <UserReportDetails
                    open={openReport}
                    onClose={() => setOpenReport(false)}
                    report={selectedReport}
                />
            )}

        </section>
    )
}

type userReportDetailsProps = {
    open: boolean
    onClose: () => void
    report: UserReport
}

function UserReportDetails({report, open, onClose}: userReportDetailsProps) {
    const statusConfig = STATUS_CONFIG[report.status] || {
        label: report.status,
        className: 'bg-gray-100 text-gray-700'
    };

    const reasonConfig = REASON_CONFIG[report.reason] || {
        label: report.reason,
        className: 'bg-gray-100 text-gray-700'
    };

    return (
        <Sheet
            open={open}
            onOpenChange={onClose}
        >
            <SheetContent className="w-[35%] sm:max-w-none flex flex-col bg-[#fafafa] max-h-screen overflow-y-auto">
                <div className="flex flex-col gap-5">
                    <SheetHeader className="bg-white p-5 rounded-xl">
                        <div className="flex justify-between">
                            <Avatar user={report.reporter} className="h-18 w-18" />
                            <p className="h-fit text-[9px] border border-blue-500 text-blue-500 bg-blue-50 px-2 py-1 rounded-md">Reporter</p>
                        </div>

                        <section>
                            <h1 className="font-medium text-2xl">{report.reporter.name}</h1>
                            <div className="flex flex-col gap-2">
                                <p className="text-gray-500 text-xs">{report.reporter.email} - {report.reporter.public_id}</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-1">
                                        <span className={`h-fit text-[9px] px-3 py-1 rounded-md font-medium ${reasonConfig.className}`}>
                                            {reasonConfig.label}
                                        </span>
                                        <span className={`h-fit text-[9px] px-3 py-1 rounded-md font-medium ${statusConfig.className}`}>
                                            {statusConfig.label}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-xs">{dayjs(report.created_at).format('MMM D, YYYY')} - {dayjs(report.created_at).fromNow()}</p>
                                </div>
                            </div>
                        </section>
                    </SheetHeader>

                    <section className="flex flex-col justify-between">
                        <p className="text-sm text-gray-500 mb-2 px-5">Reported User</p>
                        <div className="bg-white p-5 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Avatar user={report.user} className="h-14 w-14" />
                                <div>
                                    <p className="uppercase text-gray-700 text-[9px] font-semibold mb-1">Account</p>
                                    <h2 className="font-medium">{report.user.name}</h2>
                                    <p className="text-xs text-gray-500">{report.user.email} - {report.user.public_id}</p>
                                </div>
                            </div>

                            <div className="mt-5">
                                <p className="uppercase text-gray-700 text-[9px] font-semibold mb-1">Joined</p>
                                <p className="font-light text-sm">{dayjs(report.user.created_at).format('MMM D, YYYY')}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </SheetContent>
        </Sheet>
    )
}
