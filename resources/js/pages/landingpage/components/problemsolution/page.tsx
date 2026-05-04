import { ChartBarIncreasing, HeartHandshake, Inbox, Shuffle } from "lucide-react"

export default function ProblemSolution() {
    const contents = [
        {
            icon: <Inbox size={30} />,
            problem: 'Feedback is scattered across multiple platforms',
            solution: 'Centralize all feedback in one system'
        },
        {
            icon: <HeartHandshake size={30} />,
            problem: 'No clear way to prioritize ideas',
            solution: 'Use voting to highlight top priorities'
        },
        {
            icon: <Shuffle size={30} />,
            problem: 'Important issues get overlooked',
            solution: 'Track every idea with clear status updates'
        },
        {
            icon: <ChartBarIncreasing size={30} />,
            problem: 'Teams rely on assumptions instead of data',
            solution: 'Make decisions based on real user input'
        }
    ]
    return (
        <section id="problem-solution" className="p-20 bg-slate-100">
            <div className="px-30">
                <div className="mb-15 text-center">
                    <h1 className="font-bold text-3xl text-violet-500">Problems and Solution</h1>
                    <p>Make Feedback Clear, Not Confusing</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {contents.map((content, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-between p-8 rounded-3xl bg-white border border-slate-100 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5 hover:-translate-y-1"
                        >
                            <div className="mb-4">
                                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-violet-50 mb-4 transition-colors group-hover:bg-violet-100">
                                    <span className="text-violet-500">{content.icon}</span>
                                </div>
                                <h3 className="text-slate-900 font-semibold text-xl tracking-tight leading-tight">
                                    {content.problem}
                                </h3>
                            </div>

                            <p className="text-slate-500 italic font-light text-sm leading-relaxed">
                                {content.solution}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
