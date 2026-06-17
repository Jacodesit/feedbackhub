import { Button } from "@/components/ui/button"
import { UserReportReason } from "@/types/feedbackhub"
import { Flag } from "lucide-react"

type pageProps = {
    userReasons: Partial<Record<UserReportReason, string>>
}

export default function UserReportForm({userReasons}:pageProps) {
    const reasonOptions = Object.entries(userReasons).map(([value, label]) => ({
        value,
        label,
    }));

    return (
        <form>
            <ul className="flex flex-col gap-1">
                {reasonOptions.map((reason, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-1 border p-2 rounded-md text-xs"
                    >
                        <input type="radio" name="report_reason" value={reason.value} required />
                        {reason.label}
                    </li>
                ))}
            </ul>
            <Button
                className="flex items-center gap-1 transition-all duration-300 cursor-pointer mt-2 w-full bg-destructive hover:bg-red-500"
            >
                <Flag />
                Report
            </Button>
        </form>
    )
}
