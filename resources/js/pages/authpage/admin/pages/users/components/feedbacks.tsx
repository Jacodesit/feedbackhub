import { CATEGORY_CONFIG, FeedbackCategory, STATUS_CONFIG } from "@/components/constants/feedback"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { AdminUser } from "@/types/feedbackhub"
import { MessageSquareMore, ThumbsUp } from "lucide-react"
// import { Button } from "@/components/ui/button"

dayjs.extend(relativeTime)

type pageProps = {
    user: AdminUser
}

export default function RecentFeedbacks({user}:pageProps) {
    return (
        <section>
            <h5 className="text-gray-500 text-sm mb-2">Recent Feedbacks</h5>
            <div className="grid gap-3">
                {user.feedbacks?.map((item) => {
                    const statusConfig = STATUS_CONFIG[item.status] || {
                        label: item.status,
                        className: "bg-gray-100 text-gray-700",
                    }

                    const categoryConfig = CATEGORY_CONFIG[item.category as FeedbackCategory] || {
                        label: item.category,
                        className: "bg-gray-100 text-gray-700",
                    }

                    return (
                        <section
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
                        </section>
                    )
                })}
            </div>

            {/* <div className="text-center mt-3">
                {user.feedbacks_count > user.feedbacks.length && (
                    <Link
                        href={route("admin.users.feedbacks", {user: user.id})}
                        className="text-blue-500 cursor-pointer text-xs font-medium hover:border-b hover:border-blue-500"
                    >
                        View Full Activity
                    </Link>
                )}
            </div> */}
        </section>
    )
}
