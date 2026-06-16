import { Button } from "@/components/ui/button"
import { Flag } from "lucide-react"

export default function UserReportForm() {
    const reasons = [
        { label: 'Spam or Promotional Activity', name: 'report_reason', value: 'spam_or_promotional_activity' },
        { label: 'Harassment or Bullying', name: 'report_reason', value: 'harassment_or_bullying' },
        { label: 'Hate Speech or Offensive Behavior', name: 'report_reason', value: 'hate_speech_or_offensive_behavior' },
        { label: 'Impersonation', name: 'report_reason', value: 'impersonation' },
        { label: 'Misleading or Fraudulent Activity', name: 'report_reason', value: 'misleading_or_fraudulent_activity' },
        { label: 'Repeated Community Guidelines Violations', name: 'report_reason', value: 'repeated_community_guidelines_violations' },
        { label: 'Other', name: 'report_reason', value: 'other'},
    ]

    return (
        <form>
            <ul className="flex flex-col gap-1">
                {reasons.map((reason, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-1 border p-2 rounded-md"
                    >
                        <input type="radio" name={reason.name} value={reason.value} required />
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

// spam_or_promotional_activity
// harassment_or_bullying
// hate_speech_or_offensive_behavior
// impersonation
// misleading_or_fraudulent_activity
// repeated_community_guidelines_violations
// other
