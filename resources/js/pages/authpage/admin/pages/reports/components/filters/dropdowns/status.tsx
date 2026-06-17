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
import { CheckCircle2, Circle, FileCheck, MinusCircle, SlidersHorizontal } from "lucide-react"

export default function StatusFilter() {
    const { filters } = usePage().props as any;
    const currentStatus = filters?.status || 'all';

    const handleStatusChange = (status: string) => {
        router.get(
            window.location.pathname,
            {
                ...filters,
                status: status
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
                    Filter Status
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Status</DropdownMenuLabel>

                    <DropdownMenuItem onClick={() => handleStatusChange('all')}>
                        Show All
                        {currentStatus === 'all' && ' ✓'}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => handleStatusChange('pending')}>
                        <Circle />
                        Pending
                        {currentStatus === 'pending' && ' ✓'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange('reviewed')}>
                        <FileCheck />
                        Reviewed
                        {currentStatus === 'reviewed' && ' ✓'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange('resolved')}>
                        <CheckCircle2 />
                        Resolved
                        {currentStatus === 'resolved' && ' ✓'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange('dismissed')}>
                        <MinusCircle />
                        Dismissed
                        {currentStatus === 'dismissed' && ' ✓'}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
