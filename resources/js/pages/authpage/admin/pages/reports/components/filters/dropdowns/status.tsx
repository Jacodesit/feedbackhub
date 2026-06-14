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
import { CheckCircle2, Circle, FileCheck, MinusCircle, SlidersHorizontal } from "lucide-react"

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
                        Pending
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <FileCheck />
                        Reviewed
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CheckCircle2 />
                        Resolved
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <MinusCircle />
                        Dismissed
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
