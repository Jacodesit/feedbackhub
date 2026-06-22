import { Button } from "@/components/ui/button"
import { UserReportReason } from "@/types/feedbackhub"
import { Flag } from "lucide-react"
import { Page, useForm } from "@inertiajs/react"
import { toast } from "sonner"

type pageProps = {
    userReasons: Partial<Record<UserReportReason, string>>
    userId: number
}

export default function UserReportForm({userReasons, userId}:pageProps) {
    const reasonOptions = Object.entries(userReasons).map(([value, label]) => ({
        value,
        label,
    }));

    const { data, setData, post, processing, reset } = useForm({
        user_id: userId,
        reason: '',
    })

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('reports.user'), {
            preserveScroll: true,
            onSuccess: (page: Page) => {
                const flash = page.props.flash;

                if (flash?.success) {
                    reset('reason');
                    toast.success(flash.success, {
                        description: 'Thank you for helping keep the community safe.',
                    });
                } else if (flash?.error) {
                    toast.error(flash.error);
                }
            },
            onError: () => {
                toast.error('Please select a reason before submitting.');
            },
        })
    };

    return (
        <form onSubmit={submit}>
            <ul className="flex flex-col gap-1">
                {reasonOptions.map((reason, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-1 border p-2 rounded-md text-xs"
                    >
                        <input
                            type="radio"
                            name="reason"
                            value={reason.value}
                            checked={data.reason === reason.value}
                            onChange={(e) => setData('reason', e.target.value)}
                            required
                        />
                        {reason.label}
                    </li>
                ))}
            </ul>
            <Button
                type="submit"
                disabled={processing}
                className="flex items-center gap-1 transition-all duration-300 cursor-pointer mt-2 w-full bg-destructive hover:bg-red-500"
            >
                <Flag />
                {processing ? 'Reporting...' : 'Report'}
            </Button>
        </form>
    )
}
