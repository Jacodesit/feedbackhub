import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Copy, FileWarning, MailWarning, MessageSquareX, MoreHorizontal, SlidersHorizontal, UserX } from "lucide-react"

export default function ReasonFilter() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                >
                    <SlidersHorizontal />
                    Filter Reason
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Reasons</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <MailWarning />
                        <span>Spam</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Copy />
                        <span>Duplicate Feedback</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <MessageSquareX />
                        <span>Offensive Content</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <UserX />
                        <span>Harassment</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <FileWarning />
                        <span>Misleading Information</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <MoreHorizontal />
                        <span>Other</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
