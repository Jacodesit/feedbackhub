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
import { ThumbsUp } from "lucide-react"

type pageProps = {
    feedback: Feedback
}

export default function VotesList({feedback}:pageProps) {
    const voters = feedback.feedback_votes ?? [];

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    className='border px-4 py-2 rounded-full flex gap-2 items-center transition-all duration-300 hover:bg-black hover:text-white cursor-pointer'
                >
                    <ThumbsUp size={15}/>
                    <span className='text-sm'>{feedback.votes}</span>
                </button>
            </PopoverTrigger>
            <PopoverContent align="start" side="top">
                <PopoverHeader>
                    <PopoverTitle>Liked by</PopoverTitle>
                    <PopoverDescription>List of users votes this feedback</PopoverDescription>
                </PopoverHeader>
                <Separator />

                <section className="flex flex-col gap-3 max-h-72 overflow-y-auto">
                    {voters.length === 0 ? (
                        <p className="text-sm text-gray-500">No votes yet.</p>
                    ) : (
                        voters.map((vote) => (
                            <div key={vote.id} className="flex items-center gap-3">
                                <Avatar user={vote.user} className="h-8 w-8" />
                                <div>
                                    <h1 className="text-sm">{vote.user.name}</h1>
                                    <p className="text-[9px] text-gray-500">{vote.user.email}</p>
                                </div>
                            </div>
                        ))
                    )}
                </section>


            </PopoverContent>
        </Popover>
    )
}
