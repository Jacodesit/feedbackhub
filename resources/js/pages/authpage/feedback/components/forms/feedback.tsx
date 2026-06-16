import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Feedback, ReportReason } from "@/types/feedbackhub"
import { useForm, Page } from "@inertiajs/react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

type pageProps = {
    feedback: Feedback
    reasons?: Partial<Record<ReportReason, string>>
    onClose: () => void
}

export default function ReportForm({ feedback, reasons = {}, onClose }: pageProps) {
    const { data, setData, post, processing, reset } = useForm({
        feedback_id: feedback.id,
        reason: '',
        details: ''
    })

    const reasonOptions = Object.entries(reasons).map(([value, label]) => ({
        value,
        label,
    }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        post(route('reports.store'), {
            preserveScroll: true,
            onSuccess: (page: Page) => {
                const flash = page.props.flash;

                if (flash?.success) {
                    reset();
                    toast.success(flash.success, {
                        description: 'Thank you for helping us improve.',
                    });
                    onClose();
                } else if (flash?.error) {
                    toast.error(flash.error, {
                        description: 'You can only report each feedback once.',
                    });
                    onClose()
                }
            },
            onError: (errors: Record<string, string>) => {
                console.error('Validation errors:', errors);
                toast.error('Please select a reason before submitting.', {
                    description: 'All reports require a valid reason.',
                });
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FieldGroup className="flex flex-col gap-4">
                    <FieldSet>
                        <Field>
                            <FieldLabel>Title</FieldLabel>
                            <Input
                                disabled
                                value={feedback.title}
                                id="title"
                                autoComplete="false"
                                className="w-full"
                            />
                        </Field>
                    </FieldSet>

                    <FieldSet>
                        <Field>
                            <FieldLabel>Reason</FieldLabel>
                            <Select
                                value={data.reason}
                                onValueChange={(value) => setData('reason', value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a reason" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {reasonOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldSet>

                    <FieldSet>
                        <Field>
                            <FieldLabel>Details</FieldLabel>
                            <Textarea
                                value={data.details}
                                rows={5}
                                onChange={(e) => setData('details', e.target.value)}
                                placeholder="Reason why you report this feedback"
                                className="resize-none"
                            />
                        </Field>
                    </FieldSet>

                    <Separator />

                    <div className="flex gap-2 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer px-6 py-2 text-sm border rounded-lg ease-[cubic-bezier(0.23,1,0.32,1)]
                            hover:-translate-y-1 transition-all duration-300 hover:bg-gray-200 hover:border-white"
                        >
                            Close
                        </button>

                        <button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer px-6 py-2 bg-gray-900 rounded-lg text-sm text-white ease-[cubic-bezier(0.23,1,0.32,1)]
                            hover:-translate-y-1 transition-all duration-300 hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </FieldGroup>
            </form>
        </div>
    )
}
