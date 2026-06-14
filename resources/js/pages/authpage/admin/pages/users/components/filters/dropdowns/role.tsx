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
import { ShieldCheck, SlidersHorizontal, User } from "lucide-react"

export default function RoleFilter() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                >
                    <SlidersHorizontal />
                    Filter Role
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Role</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <User />
                        User
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <ShieldCheck />
                        Admin
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
