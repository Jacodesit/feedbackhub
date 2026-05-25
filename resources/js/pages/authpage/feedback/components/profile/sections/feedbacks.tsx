import { CATEGORY_CONFIG, FeedbackCategory, STATUS_CONFIG } from "@/components/constants/feedback"
import { Feedback, PaginatedFeedbacks } from "@/types/feedbackhub"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { MessageSquareMore, ThumbsUp } from "lucide-react"
import { useEffect, useState } from "react"

dayjs.extend(relativeTime)

type pageProps = {
    feedback: Feedback
    enabled: boolean
}

export default function Feedbacks({feedback, enabled}:pageProps) {
    const [feedbacks, setFeedbacks] = useState<PaginatedFeedbacks | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const fetchFeedbacks = async (url: string) => {
        setIsLoading(true)

        try {
            const response = await fetch(url, {
                headers: {
                    Accept: "application/json",
                },
            })

            if (!response.ok) {
                throw new Error("Unable to load feedbacks")
            }

            setFeedbacks(await response.json())
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (!enabled || !feedback.user?.id) return

        setFeedbacks(null)
        fetchFeedbacks(`/users/${feedback.user.id}/feedbacks`)
    }, [enabled, feedback.user?.id])

    return (
        <section>
            <h5 className="text-gray-500 text-sm mb-2">Feedbacks</h5>

            {isLoading && (
                <div className="border border-dashed rounded-lg h-32 flex items-center justify-center">
                    <p className="text-xs text-gray-500">Loading feedbacks...</p>
                </div>
            )}

            {!isLoading && feedbacks?.data.length === 0 && (
                <div className="border border-dashed rounded-lg h-32 flex items-center justify-center">
                    <p className="text-xs text-gray-500">No posted feedback yet.</p>
                </div>
            )}

            <div className="grid gap-3">
                {feedbacks?.data.map((item) => {
                    const statusConfig = STATUS_CONFIG[item.status] || {
                        label: item.status,
                        className: "bg-gray-100 text-gray-700",
                    }

                    const categoryConfig = CATEGORY_CONFIG[item.category as FeedbackCategory] || {
                        label: item.category,
                        className: "bg-gray-100 text-gray-700",
                    }

                    return (
                        <article
                            key={item.id}
                            className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex flex-wrap gap-1">
                                    <span className={`text-[9px] px-2 py-1 rounded-md border uppercase ${statusConfig.className}`}>
                                        {statusConfig.label}
                                    </span>
                                    <span className={`text-[9px] px-2 py-1 rounded-md font-medium ${categoryConfig.className}`}>
                                        {categoryConfig.label}
                                    </span>
                                </div>
                                <p className="shrink-0 text-xs text-gray-500">
                                    {dayjs(item.created_at).fromNow()}
                                </p>
                            </div>

                            <h1 className="my-3 text-sm font-medium">{item.title}</h1>
                            <p className="line-clamp-2 text-sm text-gray-500">{item.description}</p>

                            <div className="mt-4 flex gap-5 text-gray-600">
                                <div className="flex items-center gap-1">
                                    <ThumbsUp size={16} strokeWidth={1.5} />
                                    <p className="text-sm">{item.votes}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageSquareMore size={17} strokeWidth={1.5} />
                                    <p className="text-sm">{item.comments_count || 0}</p>
                                </div>
                            </div>
                        </article>
                    )
                })}
            </div>

            {!isLoading && feedbacks && feedbacks.last_page > 1 && (
                <div className="mt-4 flex justify-between">
                    <button
                        type="button"
                        onClick={() => fetchFeedbacks(feedbacks.prev_page_url || "")}
                        disabled={!feedbacks.prev_page_url}
                        className="text-xs text-gray-500 disabled:opacity-40"
                    >
                        Previous
                    </button>
                    <p className="text-xs text-gray-500">
                        Page {feedbacks.current_page} of {feedbacks.last_page}
                    </p>
                    <button
                        type="button"
                        onClick={() => fetchFeedbacks(feedbacks.next_page_url || "")}
                        disabled={!feedbacks.next_page_url}
                        className="text-xs text-gray-500 disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            )}
        </section>
    )
}
