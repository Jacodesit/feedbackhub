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

export default function TimelineFilter() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                >
                    <SlidersHorizontal />
                    Filter Timeline
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Timeline</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <ArrowDownWideNarrow />
                        Newest to Oldest
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <ArrowUpNarrowWide />
                        Oldest to Newest
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
