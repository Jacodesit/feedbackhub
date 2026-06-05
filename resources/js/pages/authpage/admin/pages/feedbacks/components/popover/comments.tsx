import Avatar from "@/components/avatar/profile"
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Feedback } from "@/types/feedbackhub"
import { MessageCircle } from "lucide-react"

type pageProps = {
    feedback: Feedback
}

export default function CommentsList({feedback}:pageProps) {
    const comments = feedback.comments ?? [];
    const uniqueCommentUsers = comments.filter((comment, index, self) =>
        index === self.findIndex((item) => item.user.id === comment.user.id)
    );

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    className='border px-4 py-2 rounded-full flex gap-2 items-center transition-all duration-300 hover:bg-black hover:text-white cursor-pointer'
                >
                    <MessageCircle size={15} />
                    <span className='text-sm'>{feedback.comments_count}</span>
                </button>
            </PopoverTrigger>
            <PopoverContent align="start" side="top">
                <PopoverHeader>
                    <PopoverTitle>Comments</PopoverTitle>
                    <PopoverDescription>Users who submits a comment.</PopoverDescription>
                </PopoverHeader>
                <Separator />

                <section className="flex flex-col gap-3 max-h-72 overflow-y-auto">
                    {uniqueCommentUsers.length === 0 ? (
                        <p className="text-sm text-gray-500">No comments yet.</p>
                    ) : (
                        uniqueCommentUsers.map((comment) => (
                            <div key={comment.user.id} className="flex gap-3">
                                <Avatar user={comment.user} className="h-8 w-8" />

                                <div>
                                    <h1 className="text-sm">{comment.user.name}</h1>
                                    <p className="text-[9px] text-gray-500">{comment.user.email}</p>
                                </div>
                            </div>
                        ))
                    )}
                </section>

            </PopoverContent>
        </Popover>
    )
}
