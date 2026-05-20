import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ViewProfile from "@/components/view-profile"
import { Feedback } from "@/types/feedbackhub"
import { EllipsisVertical, Eye } from "lucide-react"
import { useState } from "react"

type pageProps = {
    feedback: Feedback
}

export default function Options({feedback}:pageProps) {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [openView, setOpenView] = useState(false);

    const handleViewProfile = () => {
        setOpenDropdown(false);
        window.setTimeout(() => setOpenView(true), 0);
    }

    return (
        <>
            <DropdownMenu
                open={openDropdown}
                onOpenChange={setOpenDropdown}
            >
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
                        <DropdownMenuItem
                            onSelect={handleViewProfile}
                            className="flex justify-between items-center"
                        >
                            View Profile
                            <Eye />
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <ViewProfile
                open={openView}
                feedback={feedback}
                onClose={() => setOpenView(false)}
            />
        </>
    )
}
