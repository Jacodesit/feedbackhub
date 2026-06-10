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

export default function StatusFilter() {
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
                    <DropdownMenuItem>
                        <Circle />
                        Open
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <LoaderCircle />
                        In Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CircleCheckBig />
                        Completed
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
