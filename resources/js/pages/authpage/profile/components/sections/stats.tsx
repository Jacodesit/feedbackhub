import { MessageCircle, MessageSquareShare, Vote } from "lucide-react"

export default function Stats() {

    const stats = [
        {icon: <MessageSquareShare strokeWidth={1.5} size={30} />, text: 'Feedback Submitted', data: '0'},
        {icon: <Vote strokeWidth={1.5} size={30} />, text: 'Total Votes Received', data: '0'},
        {icon: <MessageCircle strokeWidth={1.5} size={30} />, text: 'Completed Feedback', data: '0'},
        {icon: <MessageCircle strokeWidth={1.5} size={30} />, text: 'Comments Posted', data: '0'},
    ]

    return (
        <div id="section-stats" className="py-5 px-10 scroll-mt-20">
            <div className="pb-4">
                <h2 className=" font-medium">Stats</h2>
                <p className="text-sm text-gray-400">Contribution/Activity</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="shadow-md p-5 rounded-lg"
                    >
                        <div className="flex justify-end mb-5">
                            <div className="bg-violet-100 inline-flex p-3 rounded-md">
                                {stat.icon}
                            </div>
                        </div>

                        <div>
                            <p className="text-2xl">{stat.data}</p>
                            <p className="text-sm text-gray-500">{stat.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
