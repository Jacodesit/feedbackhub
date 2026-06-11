import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Feedback, PaginatedFeedbacks } from "@/types/feedbackhub";
import { CATEGORY_CONFIG, FeedbackCategory, STATUS_CONFIG } from '@/components/constants/feedback';
import Avatar from "@/components/avatar/profile";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { EmptyData } from "../../../users/components/empty/no-data";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import FeedbackDetails from "../details";

dayjs.extend(relativeTime);

type pageProps = {
    pinnedFeedbacks: PaginatedFeedbacks
    tab: string
}

export default function PinnedFeedbacksTable({pinnedFeedbacks, tab}:pageProps) {
    const [viewSelected, setViewSelectedDetails] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

    return (
        <section className={`flex flex-col justify-between`}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Votes</TableHead>
                        <TableHead>Comments</TableHead>
                        <TableHead>Posted</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pinnedFeedbacks.data.map(pinnedFeedback => {
                        const statusConfig = STATUS_CONFIG[pinnedFeedback.status] || {
                            label: pinnedFeedback.status,
                            className: 'bg-gray-100 text-gray-700'
                        };

                        const categoryConfig = CATEGORY_CONFIG[pinnedFeedback.category as FeedbackCategory] || {
                            label: pinnedFeedback.category,
                            className: 'bg-gray-100 text-gray-700'
                        };

                        return (
                            <TableRow
                                key={pinnedFeedback.id}
                            >
                                <TableCell className="flex items-center gap-2">
                                    <Avatar user={pinnedFeedback.user} size="sm" />
                                    <div>
                                        <h3 className="font-medium text-xs">{pinnedFeedback.user.name}</h3>
                                        <p className="text-xs text-gray-500">{pinnedFeedback.user.email}</p>
                                    </div>
                                </TableCell>

                                <TableCell className="text-xs">{pinnedFeedback.title}</TableCell>

                                <TableCell className="text-xs">{pinnedFeedback.votes}</TableCell>

                                <TableCell className="text-xs">{pinnedFeedback.comments_count}</TableCell>

                                <TableCell className='text-xs text-gray-500'>
                                    {dayjs(pinnedFeedback.created_at).format('MMM D, YYYY')} • {dayjs(pinnedFeedback.created_at).fromNow()}
                                </TableCell>

                                <TableCell>
                                    <span className={`text-[9px] px-3 py-1 rounded-md font-medium ${categoryConfig.className}`}>
                                        {categoryConfig.label}
                                    </span>
                                </TableCell>

                                <TableCell>
                                    <span className={`text-[9px] px-3 py-1 rounded-md border uppercase ${statusConfig.className}`}>
                                        {statusConfig.label}
                                    </span>
                                </TableCell>

                                <TableCell>
                                    <button
                                        onClick={() => {
                                            setViewSelectedDetails(true)
                                            setSelectedFeedback(pinnedFeedback);
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

            {pinnedFeedbacks.data.length === 0 ? (
                <div className=" flex justify-center items-center h-[60vh]">
                    <EmptyData tab={tab} />
                </div>
            ) : (
                <div className={`${pinnedFeedbacks.data.length === 0 ? 'hidden' : 'mt-8'}`}>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                {pinnedFeedbacks.prev_page_url ? (
                                    <Link
                                        href={`${pinnedFeedbacks.prev_page_url}&tab=${tab}`}
                                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5"
                                        preserveScroll
                                    >
                                        Previous
                                    </Link>
                                ) : (
                                    <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 gap-1 pl-2.5 opacity-50 pointer-events-none">
                                        Previous
                                    </span>
                                )}
                            </PaginationItem>

                            {pinnedFeedbacks.links.map((link, i) => {
                                if (link.label.includes('Previous') || link.label.includes('Next')) return null;

                                if (link.label === "...") {
                                    return (
                                        <PaginationItem key={i}>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    );
                                }

                                return (
                                    <PaginationItem key={i}>
                                        {link.url ? (
                                            <Link
                                                href={`${link.url}&tab=${tab}`}
                                                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10 ${
                                                    link.active
                                                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                        : "hover:bg-accent hover:text-accent-foreground"
                                                }`}
                                                preserveScroll
                                            >
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10 opacity-50 pointer-events-none">
                                                {link.label}
                                            </span>
                                        )}
                                    </PaginationItem>
                                );
                            })}

                            <PaginationItem>
                                {pinnedFeedbacks.next_page_url ? (
                                    <Link
                                        href={`${pinnedFeedbacks.next_page_url}&tab=${tab}`}
                                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pr-2.5"
                                        preserveScroll
                                    >
                                        Next
                                    </Link>
                                ) : (
                                    <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 gap-1 pr-2.5 opacity-50 pointer-events-none">
                                        Next
                                    </span>
                                )}
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}

            {selectedFeedback && (
                <FeedbackDetails
                    open={viewSelected}
                    onClose={() => setViewSelectedDetails(false)}
                    feedback={selectedFeedback}
                />
            )}
        </section>
    )
}
