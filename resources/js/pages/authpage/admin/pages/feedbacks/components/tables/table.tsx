import { Feedback, PaginatedFeedbacks } from "@/types/feedbackhub";
import { CATEGORY_CONFIG, FeedbackCategory, STATUS_CONFIG } from '@/components/constants/feedback';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from "react";
import FeedbackDetails from "../details";
import { Link } from "@inertiajs/react";
import { EmptyData } from "../../../users/components/empty/no-data";
import Avatar from "@/components/avatar/profile";

dayjs.extend(relativeTime);

type pageProps = {
    feedbacks: PaginatedFeedbacks
    tab: string
}

export default function FeedbacksTable({feedbacks, tab}:pageProps) {
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
                    {feedbacks.data.map(feedback => {
                        const statusConfig = STATUS_CONFIG[feedback.status] || {
                            label: feedback.status,
                            className: 'bg-gray-100 text-gray-700'
                        };

                        const categoryConfig = CATEGORY_CONFIG[feedback.category as FeedbackCategory] || {
                            label: feedback.category,
                            className: 'bg-gray-100 text-gray-700'
                        };

                        return (
                            <TableRow
                                key={feedback.id}
                            >
                                <TableCell className="flex items-center gap-2">
                                    <Avatar user={feedback.user} size="sm" />
                                    <div>
                                        <h3 className="font-medium text-xs">{feedback.user.name}</h3>
                                        <p className="text-xs text-gray-500">{feedback.user.email}</p>
                                    </div>
                                </TableCell>

                                <TableCell className="text-xs">{feedback.title}</TableCell>

                                <TableCell className="text-xs">{feedback.votes}</TableCell>

                                <TableCell className="text-xs">{feedback.comments_count}</TableCell>

                                <TableCell className='text-xs text-gray-500'>
                                    {dayjs(feedback.created_at).format('MMM D, YYYY')} • {dayjs(feedback.created_at).fromNow()}
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
                                            setSelectedFeedback(feedback);
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

            {feedbacks.data.length === 0 ? (
                <div className="h-screen">
                    <EmptyData tab={tab} />
                </div>

            ) : (
                <div className={`${feedbacks.data.length === 0 ? 'hidden' : 'mt-8'}`}>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                {feedbacks.prev_page_url ? (
                                    <Link
                                        href={`${feedbacks.prev_page_url}&tab=${tab}`}
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

                            {feedbacks.links.map((link, i) => {
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
                                {feedbacks.next_page_url ? (
                                    <Link
                                        href={`${feedbacks.next_page_url}&tab=${tab}`}
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
