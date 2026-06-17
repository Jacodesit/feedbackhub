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
import { router, usePage } from "@inertiajs/react";
import { Copy, FileWarning, MailWarning, MessageSquareX, MoreHorizontal, SlidersHorizontal, UserX } from "lucide-react"

export default function ReasonFilter() {
    const { filters } = usePage().props as any;
    const currentReason = filters?.reason || 'all';

    const handleReasonChange = (reason: string) => {
        router.get(
            window.location.pathname,
            {
                ...filters,
                reason: reason
            },
            {
                preserveState: true,
                replace: true,
                preserveScroll: true
            }
        );
    };

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

                    <DropdownMenuItem onClick={() => handleReasonChange('all')}>
                        Show All
                        {currentReason === 'all' && ' ✓'}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => handleReasonChange('spam')}>
                        <MailWarning />
                        Spam
                        {currentReason === 'spam' && ' ✓'}
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleReasonChange('duplicate_feedback')}>
                        <Copy />
                        Duplicate Feedback
                        {currentReason === 'duplicate_feedback' && ' ✓'}
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleReasonChange('offensive_content')}>
                        <MessageSquareX />
                        Offensive Content
                        {currentReason === 'offensive_content' && ' ✓'}
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleReasonChange('harassment')}>
                        <UserX />
                        Harassment
                        {currentReason === 'harassment' && ' ✓'}
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleReasonChange('misleading_information')}>
                        <FileWarning />
                        Misleading Information
                        {currentReason === 'misleading_information' && ' ✓'}
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleReasonChange('other')}>
                        <MoreHorizontal />
                        Other
                        {currentReason === 'other' && ' ✓'}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
