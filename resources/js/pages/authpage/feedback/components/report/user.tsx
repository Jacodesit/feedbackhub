import { Flag } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator";
import UserReportForm from "../forms/user";
import { UserReportReason } from "@/types/feedbackhub";

type pageProps = {
    userReasons: Record<UserReportReason, string>
}

export default function ReportUserPopover({userReasons}:pageProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    className='border bg-gray-100 p-3 rounded-full flex gap-2 items-center transition-all duration-300 hover:bg-red-50 hover:text-destructive hover:border-red-500 cursor-pointer'
                >
                    <Flag size={15}/>
                </button>
            </PopoverTrigger>
            <PopoverContent align="end" side="bottom" className="z-9999">
                <PopoverHeader>
                    <PopoverTitle>Report User</PopoverTitle>
                    <PopoverDescription className="text-xs">Help maintain a constructive and respectful community</PopoverDescription>
                </PopoverHeader>
                <Separator />
                <UserReportForm
                    userReasons={userReasons}
                />
            </PopoverContent>
        </Popover>
    )
}


