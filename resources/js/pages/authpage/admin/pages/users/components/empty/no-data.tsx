import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { MessageSquareMore, MessageCircle, ThumbsUp } from "lucide-react"

type PageProps = {
    tab: string
}

const emptyStateConfig = {
    feedbacks: {
        icon: MessageSquareMore,
        title: "No feedbacks submitted yet",
        description: "This user hasn't shared any feedback or feature requests yet."
    },
    comments: {
        icon: MessageCircle,
        title: "No comments made yet",
        description: "This user hasn't commented on any feedback or discussions yet."
    },
    votes: {
        icon: ThumbsUp,
        title: "No votes cast yet",
        description: "This user hasn't voted on any feedback or suggestions yet."
    }
} as const

type TabKey = keyof typeof emptyStateConfig

export function EmptyData({ tab }: PageProps) {
    const config = emptyStateConfig[tab as TabKey] || emptyStateConfig.feedbacks
    const IconComponent = config.icon

    return (
        <Empty className="">
            <EmptyHeader>
                <EmptyMedia className="bg-gray-200 p-2 rounded-lg">
                    <IconComponent size={20} />
                </EmptyMedia>
                <EmptyTitle>{config.title}</EmptyTitle>
                <EmptyDescription>
                    {config.description}
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}
