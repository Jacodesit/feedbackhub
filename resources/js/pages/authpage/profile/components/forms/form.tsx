
import {
    Field,
    // FieldDescription,
    // FieldGroup,
    // FieldLabel,
    // FieldLegend,
    // FieldSeparator,
    FieldSet,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { Feedback } from "@/types/feedbackhub"
import { useForm } from "@inertiajs/react"
import { Loader2, Send } from "lucide-react"
import { toast } from "sonner"

type pageProps = {
    feedback: Feedback
}
export default function CommentForm({feedback}:pageProps) {
    const currentPath = window.location.pathname

    const {data, post, setData, processing, reset} = useForm({
        content: ''
    })

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('feedbacks.comments.store', feedback.id), {
            onSuccess: () => [
                reset(),
                toast.success('Commented successfully')
            ],
            preserveScroll: true
        })
    }
    return (
        <div className={`${currentPath === '/feedback' ? 'min-w-0 flex-1' : 'hidden'}`}>
            <form onSubmit={submit} className='flex w-full gap-2'>
                <FieldSet className='min-w-0 flex-1'>
                    <Field className='min-w-0'>
                        <Input
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            id="comment"
                            placeholder="Add a comment..."
                            className="w-full"
                        />
                    </Field>
                </FieldSet>

                <button
                    disabled={processing}
                    className="cursor-pointer py-2 px-3 border rounded-lg ease-[cubic-bezier(0.23,1,0.32,1)]
                    hover:-translate-y-1 transition-all duration-300 hover:bg-gray-200 hover:border-white"
                >
                    {processing ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
            </form>
        </div>
    )
}
