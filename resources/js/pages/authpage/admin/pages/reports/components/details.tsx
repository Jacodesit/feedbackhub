import { STATUS_CONFIG, REASON_CONFIG } from "@/components/constants/reports";
import Avatar from "@/components/avatar/profile"
import {
    Sheet,
    SheetContent,
    SheetHeader,
} from "@/components/ui/sheet"
import { Report } from "@/types/feedbackhub"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import VotesList from "../../feedbacks/components/popover/votes";
import CommentsList from "../../feedbacks/components/popover/comments";

dayjs.extend(relativeTime);

type pageProps = {
    open: boolean
    onClose: () => void
    report: Report
}

export default function ReportDetails({report, open, onClose}:pageProps) {
    if(!report) return null;

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
            <SheetContent className=" w-[35%] sm:max-w-none flex flex-col justify-between bg-[#fafafa] max-h-screen overflow-y-auto">
                <div className="flex flex-col gap-5">
                    <SheetHeader className="bg-white p-5 rounded-xl">
                        <div className="flex justify-between ">
                            <Avatar user={report.reporter} className="h-18 w-18" />
                            <p className="h-fit text-[9px] border border-blue-500 text-blue-500 bg-blue-50 px-2 py-1 rounded-md">Reporter</p>
                        </div>

                        <section>
                            <h1 className="font-medium text-2xl">{report.reporter.name}</h1>
                            <div className="flex flex-col gap-2">
                                <p className="text-gray-500 text-xs">{report.reporter.email} • {report.reporter.public_id}</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-1">
                                        <span className={`h-fit text-[9px] px-3 py-1 rounded-md font-medium ${reasonConfig.className}`}>
                                            {reasonConfig.label}
                                        </span>
                                        <span className={`h-fit text-[9px] px-3 py-1 rounded-md font-medium ${statusConfig.className}`}>
                                            {statusConfig.label}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-500 text-xs">{dayjs(report.created_at).format('MMM D, YYYY')} • {dayjs(report.created_at).fromNow()}</p>
                                    </div>
                                </div>

                            </div>
                        </section>
                    </SheetHeader>

                    <section className="flex flex-col justify-between">
                        <p className="text-sm text-gray-500 mb-2 px-5">Reporters Reason</p>
                        <div className="bg-white p-5 w-fit rounded-xl mb-2">
                            <p className="uppercase text-gray-700 text-[9px] font-semibold mb-1">Reason</p>
                            <h2 className="font-light text-sm">{report.details}</h2>
                        </div>

                        <p className="text-sm text-gray-500 mb-2 px-5">Reported Feedback</p>
                        <div className="bg-white px-5 pt-3 w-fit rounded-t-xl">
                            <p className="uppercase text-gray-700 text-[9px] font-semibold mb-1">Title</p>
                            <h2 className="font-medium ">{report.feedback?.title ?? '—'}</h2>
                        </div>

                        <div className="bg-white p-5 rounded-tr-xl rounded-b-xl">
                            <div className='mb-5'>
                                <p className="uppercase text-gray-700 text-[9px] font-semibold mb-1">Description</p>
                                <p className="font-light text-sm">{report.feedback?.description ?? 'No description'}</p>
                            </div>

                            <div className="flex gap-2 justify-between">
                                <div>
                                    <p className="uppercase text-gray-700 text-[9px] font-semibold mb-1">Interactions</p>
                                    <div className=''>
                                        <div className='flex items-center justify-between gap-2'>
                                            <VotesList feedback={report.feedback}/>
                                            <CommentsList feedback={report.feedback}/>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="uppercase text-gray-700 text-[9px] font-semibold mb-1">Author</p>
                                    <h2 className="font-medium ">{report.feedback?.user?.name ?? 'Unknown author'}</h2>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </SheetContent>
        </Sheet>
    )
}
