import Avatar from "@/components/avatar/profile"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminUser, PaginatedUsers } from "@/types/feedbackhub"
import { useState } from "react"
import UserDetails from "../../users/components/details"
import { Link } from "@inertiajs/react"

type pageProps = {
    users: PaginatedUsers
}

export default function LeaderboardTable({users}:pageProps) {
    const [viewProfile, setViewProfile] =  useState(false)
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)

    return (
        <section className="flex flex-col justify-between">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Votes</TableHead>
                        <TableHead>Feedbacks</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.data.map((user, index) => {
                        const currentPage = users.current_page || 1;
                        const perPage = users.per_page || 10;
                        const rank = (currentPage - 1) * perPage + index + 1;

                        const rankDisplay = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;

                        return (
                            <TableRow key={user.id}>
                                <TableCell className="text-xs font-medium">{rankDisplay}</TableCell>
                                <TableCell className="flex items-center gap-2">
                                    <Avatar user={user} size="sm" />
                                    <div>
                                        <h3 className="font-medium text-xs">{user.name}</h3>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </TableCell>

                                <TableCell className="text-xs">{user.total_votes_received || 0}</TableCell>
                                <TableCell className="text-xs">{user.feedbacks_count}</TableCell>
                                <TableCell>
                                    <button
                                        onClick={() => {
                                        setViewProfile(true)
                                        setSelectedUser(user)
                                    }}
                                        className="text-blue-600 hover:underline text-xs"
                                    >
                                        View
                                    </button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            <div className={`${users.data.length === 0 ? 'hidden' : 'mt-8'}`}>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            {users.prev_page_url ? (
                                <Link
                                    href={`${users.prev_page_url}}`}
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

                        {users.links.map((link, i) => {
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
                                            href={`${link.url}`}
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
                            {users.next_page_url ? (
                                <Link
                                    href={`${users.next_page_url}`}
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

            {selectedUser && (
                <UserDetails
                    open={viewProfile}
                    onClose={() => setViewProfile(false)}
                    user={selectedUser}
                />
            )}
        </section>
    )
}
