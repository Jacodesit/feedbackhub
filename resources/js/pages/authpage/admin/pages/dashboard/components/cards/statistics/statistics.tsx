import { Hourglass, MessageCircleMore, MessageSquareMore, Users } from "lucide-react"

export default function StatisticsCard() {
    const cards = [
        { name: 'Total Feedback', icon: <MessageSquareMore size={20} />, data: '199' },
        { name: 'Total Users', icon: <Users size={20} />, data: '200' },
        { name: 'Total Commments', icon: <MessageCircleMore size={20} />, data: '900' },
        { name: 'Awaiting Review', icon: <Hourglass size={20} /> , data: '120' },
    ]
    return (
        <section
            className="grid grid-cols-4 gap-3"
        >
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg p-7 flex flex-col gap-5 shadow-md"
                >
                    <div className="flex justify-between">
                        <div className="border h-12 w-12 rounded-md p-5 flex justify-center items-center bg-zinc-100">
                            <i>{card.icon}</i>
                        </div>
                        <p className="text-4xl">{card.data || '0'}</p>
                    </div>

                    <h1 className="font-medium text-sm text-gray-500">{card.name}</h1>
                </div>
            ))}
        </section>
    )
}
