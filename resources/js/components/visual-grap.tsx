export default function VisualStaticGraph() {
    const visualHeights = [40, 65, 25, 50, 85, 35, 100];

    return (
        <div className="flex items-end justify-between gap-[5px] w-32 h-16 pt-2 relative">
            {visualHeights.map((height, index) => (
            <div
                key={index}
                className="relative flex-1 h-full flex items-end group/bar cursor-pointer"
            >
                <div
                    className="w-full bg-gray-50 group-hover:bg-gray-100/40 rounded-full h-full absolute inset-0 transition-colors duration-300 pointer-events-none" />

                <div
                    className="w-full bg-blue-500/50 group-hover/bar:bg-blue-500 rounded-full transition-all duration-300 origin-bottom relative z-10"
                    style={{ height: `${height}%` }}
                >

                <div
                    className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/80 rounded-full opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200" />
                </div>
            </div>
            ))}
        </div>
    )
}
