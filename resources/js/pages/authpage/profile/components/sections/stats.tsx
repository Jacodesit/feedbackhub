import { MessageCircle, MessageSquareShare, Vote } from "lucide-react"
import { UserStats } from "@/types/feedbackhub"

export default function Stats({ stats }: { stats: UserStats }) {
    const cards = [
        { icon: <MessageSquareShare strokeWidth={1.5} size={30} />, text: 'Feedback Submitted', data: stats.feedbacks_count },
        { icon: <Vote strokeWidth={1.5} size={30} />, text: 'Total Votes Received', data: stats.total_votes_received },
        { icon: <MessageCircle strokeWidth={1.5} size={30} />, text: 'Completed Feedback', data: stats.completed_feedbacks_count },
        { icon: <MessageCircle strokeWidth={1.5} size={30} />, text: 'Comments Posted', data: stats.comments_count },
        { icon: <MessageCircle strokeWidth={1.5} size={30} />, text: 'Comments Received', data: stats.total_comments_received },
    ]

    return (
        <div id="section-stats" className="py-5 px-10 scroll-mt-20">
            <div className="pb-4">
                <h2 className=" font-medium">Stats</h2>
                <p className="text-sm text-gray-400">Contribution/Activity</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {cards.map((stat, index) => (
                    <div
                        key={index}
                        className="group relative bg-white border border-slate-100 p-6 rounded-2xl transition-all duration-300 shadow-md hover:border-violet-200 hover:shadow-xl "
                    >
                        <div className="flex justify-between items-start mb-6">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                {stat.text}
                            </p>

                            <div className="bg-violet-50 text-violet-600 inline-flex p-2.5 rounded-xl transition-colors duration-300 group-hover:bg-violet-600 group-hover:text-white">
                                {stat.icon}
                            </div>
                        </div>

                        <div>
                            <p className="text-4xl font-bold tracking-tight text-slate-900">
                                {stat.data}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
