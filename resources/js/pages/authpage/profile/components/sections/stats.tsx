import { UserStats } from "@/types/feedbackhub"
import VisualStaticGraph from "@/components/visual-grap";

export default function Stats({ stats }: { stats: UserStats }) {
    const cards = [
        {   text: 'Feedback Submitted', data: stats.feedbacks_count },
        {   text: 'Total Votes Received', data: stats.total_votes_received },
        {   text: 'Completed Feedback', data: stats.completed_feedbacks_count },
        {   text: 'Comments Posted', data: stats.comments_count },
        {   text: 'Comments Received', data: stats.total_comments_received },
    ]

    return (
        <div id="section-stats" className="py-5 px-10 scroll-mt-20">
            <div className="pb-4">
                <h2 className=" font-medium">Stats</h2>
                <p className="text-sm text-gray-400">Contribution/Activity</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {cards.map((stat, index) => {
                    const isLastCard = index === cards.length - 1;

                    return (
                        <div
                            key={index}
                            className={`group rounded-lg  border-slate-100 bg-white shadow-sm border p-6 transition-all duration-300
                                hover:border-gray-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.03)]
                                flex justify-between items-center w-full h-32 relative overflow-hidden
                                ${isLastCard ? 'col-span-2' : ''}`}
                        >
                            <div className="flex flex-col justify-center h-full space-y-0.5 z-10 pointer-events-none">
                                <span className="text-gray-400 text-sm font-medium tracking-tight">{stat.text}</span>
                                <h1 className="text-4xl font-bold text-gray-900 font-sans tracking-tight">{stat.data}</h1>
                            </div>
                            <VisualStaticGraph />
                        </div>
                    )

                })}
            </div>
        </div>
    )
}
