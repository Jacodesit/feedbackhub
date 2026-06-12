import { usePage, useForm } from "@inertiajs/react";

import {
    Field,
    // FieldDescription,
    FieldGroup,
    FieldLabel,
    // FieldLegend,
    // FieldSeparator,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    // SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { PageProps } from "@/types/feedbackhub";
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import AuthDialog from "@/components/dialog/error";
import { toast } from "sonner";

type pageProps = {
    onClose: () => void
}

export default function PostForm({onClose}:pageProps) {
    const { categories } = usePage<PageProps>().props

    const [showAuth, setShowAuth] = useState(false);
    const [authHeadline, setAuthHeadline] = useState('');
    const [authSubtext, setAuthSubtext] = useState('');


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

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        category: '',
        description: ''
    })

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/feedbacks', {
            onError: (errors) => {
                if (errors.auth) {
                    setAuthHeadline('Sign in required')
                    setAuthSubtext('This action is available only to authenticated or logged in users. Log in to proceed.')
                    setShowAuth(true)
                }
            },

            onSuccess: () => {
                toast.success('Feedback successfully posted.')
                reset()
                onClose()
            }
        })
    }

    return (
        <section>
            <form onSubmit={submit}>
                <FieldGroup className="flex flex-col">
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

                    <Separator />

                    <div
                        className="flex gap-2 justify-end"
                    >
                        <button
                            onClick={onClose}
                            className="cursor-pointer px-6 py-2 text-sm border rounded-lg ease-[cubic-bezier(0.23,1,0.32,1)]
                            hover:-translate-y-1 transition-all duration-300 hover:bg-gray-200 hover:border-white"
                        >
                            Close
                        </button>

                        <button
                            disabled={processing}
                            className="cursor-pointer px-6 py-2 bg-gray-900 rounded-lg text-sm text-white ease-[cubic-bezier(0.23,1,0.32,1)]
                            hover:-translate-y-1 transition-all duration-300 hover:bg-black"
                        >
                            {processing ? 'Submitting Feedback' : 'Submit'}
                        </button>
                    </div>
                </FieldGroup>
            </form>

            <AuthDialog
                openDialog={showAuth}
                onClose={() => setShowAuth(false)}
                authHeadline={authHeadline}
                authSubtext={authSubtext}
            />
        </section>
    )
}
