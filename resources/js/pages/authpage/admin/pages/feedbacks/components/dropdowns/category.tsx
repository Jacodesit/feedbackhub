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
import { Bug, Gauge, Lightbulb, MessageSquareMore, SlidersHorizontal } from "lucide-react"

export default function CategoryFilter() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                >
                    <SlidersHorizontal />
                    Filter Category
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Category</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Lightbulb />
                        Feature Request
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Bug />
                        Bug Report
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Gauge />
                        Performance
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <MessageSquareMore />
                        Other
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
