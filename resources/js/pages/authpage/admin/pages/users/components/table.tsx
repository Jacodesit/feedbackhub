import Avatar from "@/components/avatar/profile"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup } from "@/components/ui/field"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminUser, PaginatedUsers } from "@/types/feedbackhub"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import UserDetails from "./details"
import { useState } from "react"

dayjs.extend(relativeTime);

type pageProps = {
    users: PaginatedUsers
}

export default function UsersTable({users}:pageProps) {
    const [viewProfile, setViewProfile] =  useState(false)
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)

    return (
        <section>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead>Profile</TableHead>
                        <TableHead>Public ID</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Votes</TableHead>
                        <TableHead>Feedbacks</TableHead>
                        <TableHead>Comments</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.data.map(user => (
                        <TableRow
                            key={user.id}
                            className=""
                        >
                            <TableCell>
                                <FieldGroup>
                                    <Field>
                                        <Checkbox />
                                    </Field>
                                </FieldGroup>
                            </TableCell>

                            <TableCell className="flex items-center gap-2">
                                <Avatar user={user} size="sm" />
                                <div>
                                    <h3 className="font-medium text-xs">{user.name}</h3>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                            </TableCell>

                            <TableCell className="text-xs">{user.public_id}</TableCell>

                            <TableCell>
                                <div>
                                    <p className="font-medium text-xs">{dayjs(user.created_at).format('MMM D, YYYY')}</p>
                                    <p className="text-xs text-gray-500">{dayjs(user.created_at).fromNow()}</p>
                                </div>
                            </TableCell>

                            <TableCell className="text-xs">{user.total_votes_received ?? 0}</TableCell>

                            <TableCell className="text-xs">{user.feedbacks_count}</TableCell>

                            <TableCell className="text-xs">{user.comments_count}</TableCell>

                            <TableCell
                                className="text-xs"
                            >
                                {!user.is_admin ? 'User' : 'Admin'}
                            </TableCell>

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
                    ))}
                </TableBody>
            </Table>

            <div className="mt-8">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href={users.prev_page_url || "#"}
                                className={!users.prev_page_url ? "pointer-events-none opacity-50" : ""}
                            />
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
                                href={users.next_page_url || "#"}
                                className={!users.next_page_url ? "pointer-events-none opacity-50" : ""}
                            />
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
