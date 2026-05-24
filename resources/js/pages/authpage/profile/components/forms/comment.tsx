
import Avatar from "@/components/avatar/profile"
import AuthDialog from "@/components/dialog/error"
import {
    // Field,
    FieldGroup,
    // FieldDescription,
    // FieldGroup,
    // FieldLabel,
    // FieldLegend,
    // FieldSeparator,
    // FieldSet,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { Feedback, PageProps } from "@/types/feedbackhub"
import { useForm, usePage } from "@inertiajs/react"
import { Loader2, Send } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type pageProps = {
    feedback: Feedback
}
export default function CommentForm({feedback}:pageProps) {
    const currentPath = window.location.pathname
    const { auth } = usePage<PageProps>().props
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
                <FieldGroup className="flex border rounded-full px-3 py-2">
                    {auth.user?.avatar ? (
                        <div className=" w-10 h-10 flex items-center justify-center rounded-full shadow-lg">
                            <img
                                src={auth.user.avatar}
                                alt={auth.user.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        </div>
                    ) : (
                        <Avatar user={auth.user} size="md"/>
                    )}

                    <Input
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        id="comment"
                        placeholder="Add a comment..."
                        className="flex-1 bg-slate-50 py-4 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />

                    <button
                        disabled={processing}
                        className="group flex items-center justify-center cursor-pointer w-10 h-10 border rounded-full bg-white ease-[cubic-bezier(0.23,1,0.32,1)] transition-all duration-300 hover:border-black"
                    >
                        {processing ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <Send size={20} className="duration-300 transition-all text-gray-500 group-hover:text-black" />
                        )}
                    </button>
                </FieldGroup>


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
