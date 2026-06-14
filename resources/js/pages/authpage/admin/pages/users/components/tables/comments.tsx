import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PaginatedComments } from "@/types/feedbackhub"
import { Link } from "@inertiajs/react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { EmptyData } from "../empty/no-data";

dayjs.extend(relativeTime);

type pageProps = {
    comments: PaginatedComments
    tab: string
}

export default function CommentsTable({comments, tab}:pageProps) {
    console.log('CommentsTable received:', comments);
    return (
        <section className="flex flex-col justify-between">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Feedback</TableHead>
                        <TableHead>Comment</TableHead>
                        <TableHead>Posted</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {comments.data.length > 0 ? (
                        comments.data.map(comment => (
                            <TableRow key={comment.id}>
                                <TableCell className="text-xs">{comment.user?.name}</TableCell>
                                <TableCell className="text-xs">{comment.feedback?.title ?? 'Deleted feedback'}</TableCell>
                                <TableCell className="text-xs max-w-[200px] truncate" title={comment.content}>
                                    {comment.content}
                                </TableCell>
                                <TableCell className='text-xs text-gray-500'>
                                    {dayjs(comment.created_at).format('MMM D, YYYY')} • {dayjs(comment.created_at).fromNow()}
                                </TableCell>
                                <TableCell className="text-xs">Posted</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>

                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {comments.data.length === 0 ? (
                <EmptyData tab={tab}/>
            ) : (
                <div className="mt-8">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                {comments.prev_page_url ? (
                                    <Link
                                        href={`${comments.prev_page_url}&tab=${tab}`}
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

                            {comments.links.map((link, i) => {
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
                                {comments.next_page_url ? (
                                    <Link
                                        href={`${comments.next_page_url}&tab=${tab}`}
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

        </section>
    )
}
