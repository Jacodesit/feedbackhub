
import AuthDialog from "@/components/dialog/error"
import {
    Field,
    // FieldDescription,
    // FieldGroup,
    // FieldLabel,
    // FieldLegend,
    // FieldSeparator,
    // FieldSet,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { Feedback } from "@/types/feedbackhub"
import { useForm } from "@inertiajs/react"
import { Loader2, Send } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type pageProps = {
    feedback: Feedback
}
export default function CommentForm({feedback}:pageProps) {
    const currentPath = window.location.pathname
    const [showAuth, setShowAuth] = useState(false);
    const [authHeadline, setAuthHeadline] = useState('');
    const [authSubtext, setAuthSubtext] = useState('');

    const {data, post, setData, processing, reset} = useForm({
        content: ''
    })

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('feedbacks.comments.store', feedback.id), {
            onError: (errors) => {
                if (errors.auth) {
                    setAuthHeadline('Sign in required')
                    setAuthSubtext('This action is available only to authenticated or logged in users. Log in to proceed.')
                    setShowAuth(true)
                }
            },

            onSuccess: () => [
                reset(),
                toast.success('Commented successfully')
            ],
            preserveScroll: true
        })
    }
    return (
        <div className={`${currentPath === '/feedback' ? 'flex-1' : 'hidden'}`}>
            <form onSubmit={submit} className='w-full flex gap-2'>
                <Field className='w-full'>
                    <Input
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        id="comment"
                        placeholder="Add a comment..."
                        className="flex-1"
                    />
                </Field>

                <button
                    disabled={processing}
                    className="cursor-pointer py-2 px-3 border rounded-lg ease-[cubic-bezier(0.23,1,0.32,1)]
                    hover:-translate-y-1 transition-all duration-300 hover:bg-gray-200 hover:border-white"
                >
                    {processing ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
            </form>

            <AuthDialog
                openDialog={showAuth}
                onClose={() => setShowAuth(false)}
                authHeadline={authHeadline}
                authSubtext={authSubtext}
            />
        </div>
    )
}
