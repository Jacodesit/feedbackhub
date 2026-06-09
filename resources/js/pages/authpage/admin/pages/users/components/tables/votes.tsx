import { STATUS_CONFIG } from '@/components/constants/feedback';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PaginatedVotes } from "@/types/feedbackhub"
import { Link } from "@inertiajs/react";
import { EmptyData } from '../empty/no-data';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

type pageProps = {
    votes: PaginatedVotes;
    tab: string
}

export default function VotesTable({ votes, tab }: pageProps) {
    const safeVotes = votes ?? [];

    return (
        <section className="flex flex-col justify-between h-[60vh]">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Feedback</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Voted On</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {safeVotes.data.length > 0 ? (
                        safeVotes.data.map(vote => {
                            const status = vote.feedback?.status;
                            const statusConfig = status
                                ? (STATUS_CONFIG[status] || {
                                    label: status,
                                    className: 'bg-gray-100 text-gray-700'
                                })
                                : {
                                    label: '-',
                                    className: 'bg-gray-100 text-gray-700'
                                };

                            return (
                                <TableRow
                                    key={vote.id}
                                >
                                    <TableCell className="text-xs">{vote.user.name}</TableCell>
                                    <TableCell className="text-xs">{vote.feedback?.title || '-'}</TableCell>
                                    <TableCell className="text-xs">{vote.feedback?.user?.name || '-'}</TableCell>
                                    <TableCell className='text-xs text-gray-500'>
                                        {dayjs(vote.created_at).format('MMM D, YYYY')} • {dayjs(vote.created_at).fromNow()}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`text-[9px] px-3 py-1 rounded-md border uppercase ${statusConfig.className}`}>
                                            {statusConfig.label}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    ) : (
                        <TableRow>

                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {votes.data.length === 0 ? (
                <EmptyData tab={tab}/>
            ) : (
                <div className={`${votes.data.length === 0 ? 'hidden' : 'mt-8'}`}>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                {votes.prev_page_url ? (
                                    <Link
                                        href={`${votes.prev_page_url}&tab=${tab}`}
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

                            {votes.links.map((link, i) => {
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
                                {votes.next_page_url ? (
                                    <Link
                                        href={`${votes.next_page_url}&tab=${tab}`}
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
