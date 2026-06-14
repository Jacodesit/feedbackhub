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
import { ArrowDownWideNarrow, ArrowUpNarrowWide, SlidersHorizontal } from "lucide-react"
import { router, usePage } from "@inertiajs/react"

export default function TimelineFilter() {
    const { filters } = usePage().props as any;
    const currentSort = filters?.sort || 'newest';

    const handleSort = (sort: string) => {
        router.get(
            window.location.pathname,
            {
                ...filters,
                sort: sort
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
                <Button variant="outline">
                    <SlidersHorizontal />
                    Filter Timeline
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Timeline</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleSort('newest')}>
                        <ArrowDownWideNarrow />
                        Newest to Oldest
                        {currentSort === 'newest' && ' ✓'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort('oldest')}>
                        <ArrowUpNarrowWide />
                        Oldest to Newest
                        {currentSort === 'oldest' && ' ✓'}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
