import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, Eye } from "lucide-react"

export default function Options() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="px-5 outline-0 cursor-pointer "
                    aria-label="Open feedback options"
                >
                    <EllipsisVertical size={20} />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex justify-between items-center">
                        View Profile
                        <Eye />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
