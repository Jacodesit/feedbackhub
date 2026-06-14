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
import { Circle, CircleCheckBig, LoaderCircle, SlidersHorizontal } from "lucide-react"
import { router, usePage } from "@inertiajs/react"

export default function StatusFilter() {
    const { filters } = usePage().props as any;
    const currentStatus = filters?.status || 'all'; // Default to show all

    const handleStatusFilter = (status: string) => {
        router.get(
            window.location.pathname,
            {
                ...filters, // Keep existing filters (search, sort, tab)
                status: status
            },
            {
                preserveState: true,
                replace: true,
                preserveScroll: true
            }
        );
    };

    const getStatusIcon = (status: string) => {
        switch(status) {
            case 'open': return <Circle />;
            case 'in_progress': return <LoaderCircle />;
            case 'completed': return <CircleCheckBig />;
            default: return null;
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <SlidersHorizontal />
                    Filter Status
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Status</DropdownMenuLabel>

                    <DropdownMenuItem onClick={() => handleStatusFilter('all')}>
                        Show All
                        {currentStatus === 'all' && ' ✓'}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => handleStatusFilter('open')}>
                        <Circle />
                        Open
                        {currentStatus === 'open' && ' ✓'}
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleStatusFilter('in_progress')}>
                        <LoaderCircle />
                        In Progress
                        {currentStatus === 'in_progress' && ' ✓'}
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleStatusFilter('completed')}>
                        <CircleCheckBig />
                        Completed
                        {currentStatus === 'completed' && ' ✓'}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
