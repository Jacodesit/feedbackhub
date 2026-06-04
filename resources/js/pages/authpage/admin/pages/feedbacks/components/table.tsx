import { PaginatedFeedbacks } from "@/types/feedbackhub";
import { CATEGORY_CONFIG, FeedbackCategory, STATUS_CONFIG } from '@/components/constants/feedback';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

type pageProps = {
    feedbacks: PaginatedFeedbacks
}

export default function FeedbacksTable({feedbacks}:pageProps) {
    return (
        <section>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Likes</TableHead>
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
                                <TableCell className="text-xs">{feedback.user.name}</TableCell>

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
                                    <button className="text-blue-600 hover:underline text-xs">View</button>
                                </TableCell>
                            </TableRow>
                        )

                    })}
                </TableBody>
            </Table>
            <div className="mt-8">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href={feedbacks.prev_page_url || "#"}
                                className={!feedbacks.prev_page_url ? "pointer-events-none opacity-50" : ""}
                            />
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
                                    <PaginationLink
                                        href={link.url || "#"}
                                        isActive={link.active}
                                    >
                                        {link.label}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}

                        <PaginationItem>
                            <PaginationNext
                                href={feedbacks.next_page_url || "#"}
                                className={!feedbacks.next_page_url ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </section>

    )
}
