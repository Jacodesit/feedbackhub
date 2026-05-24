import VisualStaticGraph from "@/components/visual-grap"

export default function Stats() {
    const cards = [
        {name: 'Feedback Submitted', value: '0'},
        {name: 'Total Votes Received', value: '0'},
        {name: 'Comments Posted', value: '0'}
    ]

    return (
        <section>
            <h5 className="text-gray-500 text-sm mb-2">Contribution Stats</h5>
            <div className="grid grid-cols-2 gap-4 w-full">
                {cards.map((card, index) => {
                    const isLastCard = index === cards.length - 1;

                    return (
                        <div
                            key={index}
                            className={`group bg-white border border-gray-100 rounded-3xl p-6
                            shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300
                            hover:border-gray-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.03)]
                            flex justify-between items-center w-full h-32 relative overflow-hidden
                            ${isLastCard ? 'col-span-2' : ''}`}
                        >
                            <div className="flex flex-col justify-center h-full space-y-0.5 z-10 pointer-events-none">
                                <span className="text-gray-400 text-sm font-medium tracking-tight">{card.name}</span>
                                <h1 className="text-4xl font-bold text-gray-900 font-sans tracking-tight">{card.value}</h1>
                            </div>
                            <VisualStaticGraph />
                        </div>
                    )
                })}
            </div>

        </section>
    )
}
