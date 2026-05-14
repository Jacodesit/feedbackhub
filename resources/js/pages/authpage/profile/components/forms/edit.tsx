import { usePage, useForm } from "@inertiajs/react";

import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    SheetFooter,
} from "@/components/ui/sheet"
import { Feedback, PageProps } from "@/types/feedbackhub";
import { Textarea } from "@/components/ui/textarea"

type pageProps = {
    onClose: () => void
    feedback: Feedback
}

export default function EditForm({onClose, feedback}:pageProps) {
    const { categories } = usePage<PageProps>().props

    function formatCategoryLabel(category: string): string {
        const labels: Record<string, string> = {
            'feature_request': 'Feature Request',
            'bug_report': 'Bug Report',
            'ui_ux': 'UI/UX Improvement',
            'performance': 'Performance',
            'other': 'Other'
        };
        return labels[category] || category.replace('_', ' ').toUpperCase();
    }

    const { data, setData, put, processing, errors, reset } = useForm({
        title: feedback.title,
        category: feedback.category,
        description: feedback.description
    })

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        put('/feedbacks', {
            onSuccess: () => {
                reset()
                onClose()
            }
        })
    }

    return (
        <form onSubmit={submit}>
            <FieldGroup className="flex flex-col h-full min-h-[80vh]">
                <div className="flex flex-col gap-5 flex-1">
                    <FieldSet>
                        <Field>
                            <FieldLabel>Title</FieldLabel>
                            <Input
                                value={data.title}
                                id="title"
                                autoComplete="false"
                                onChange={(e) =>setData('title', e.target.value)}
                                placeholder="Enter a title for your feedback"
                            />
                            {errors.title && <p className="errors text-sm text-destructive">{errors.title}</p>}
                        </Field>
                    </FieldSet>

                    <FieldSet>
                        <Field>
                            <FieldLabel>Category</FieldLabel>
                            <Select
                                value={data.category}
                                onValueChange={(value) => setData('category', value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category}
                                            value={category}
                                        >
                                            {formatCategoryLabel(category)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldSet>

                    <FieldSet>
                        <Field>
                            <FieldLabel>Description</FieldLabel>
                            <Textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={6}
                                id="description"
                                placeholder="Add your feedback description here..."
                                className="resize-none"
                            />
                            {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                        </Field>
                    </FieldSet>
                </div>

                <SheetFooter
                    className=" "
                >
                    <button
                        disabled={processing}
                        className="cursor-pointer px-6 py-2 bg-violet-500 rounded-lg text-sm text-white ease-[cubic-bezier(0.23,1,0.32,1)]
                        hover:-translate-y-1 transition-all duration-300 hover:bg-violet-700 hover:border-violet-700"
                    >
                        {processing ? 'Updating Feedback' : 'Update'}
                    </button>

                    <button
                        onClick={onClose}
                        className="cursor-pointer px-6 py-2 text-sm border rounded-lg ease-[cubic-bezier(0.23,1,0.32,1)]
                        hover:-translate-y-1 transition-all duration-300 hover:bg-gray-200 hover:border-white"
                    >
                        Close
                    </button>
                </SheetFooter>
            </FieldGroup>
        </form>

    )
}
