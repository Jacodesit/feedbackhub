import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ViewProfile from "@/components/view-profile"
import { Feedback, PageProps, ReportReason } from "@/types/feedbackhub"
import { EllipsisVertical, Eye, Flag } from "lucide-react"
import { useState } from "react"
import ReportFeedback from "./report"
import { usePage } from "@inertiajs/react"

type pageProps = {
    feedback: Feedback
    reasons: Record<ReportReason, string>
}

export default function Options({feedback, reasons}:pageProps) {
    const { auth } = usePage<PageProps>().props
    const user = auth.user;

    const [openDropdown, setOpenDropdown] = useState(false);
    const [openView, setOpenView] = useState(false);

    const [reportFeedback, setReportFeedback] = useState(false);

    const handleViewProfile = () => {
        setOpenDropdown(false);
        window.setTimeout(() => setOpenView(true), 0);
    }

    const handleReportFeedback = () => {
        setOpenDropdown(false);
        window.setTimeout(() => setReportFeedback(true), 0);
    }

    const canReport = user && user.id !== feedback.user.id;
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

                <DropdownMenuContent className="w-46" align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            onSelect={handleViewProfile}
                            className="flex justify-between items-center"
                        >
                            View Profile
                            <Eye />
                        </DropdownMenuItem>
                        {canReport && (
                            <DropdownMenuItem
                                onSelect={handleReportFeedback}
                                className='flex justify-between items-center'
                            >
                                Report Feedback
                                <Flag />
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <ViewProfile
                open={openView}
                feedback={feedback}
                onClose={() => setOpenView(false)}
            />

            <ReportFeedback
                open={reportFeedback}
                feedback={feedback}
                reasons={reasons}
                onClose={() => setReportFeedback(false)}
            />
        </>
    )
}
