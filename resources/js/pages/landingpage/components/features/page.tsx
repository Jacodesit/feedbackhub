import { AudioLines, Bot, Send, Vote } from "lucide-react"

export default function Features() {
    const contents = [
        {
            icon: <Send />,
            features: 'Submit Feedback',
            description: 'Users can share ideas, report issues, and suggest improvements in seconds.'
        },
        {
            icon: <Vote />,
            features: 'Vote on Ideas',
            description: 'Let users upvote the most important feedback so you know what matters most.'
        },
        {
            icon: <AudioLines />,
            features: 'Track Progress',
            description: 'AI groups and summarizes common issues'
        },
        {
            icon: <Bot />,
            features: 'AI Categorization',
            description: 'Automatically organize feedback into categories for faster decision-making.'
        },
    ]
    return (
        <section id="features" className="p-20 bg-black">
            <div className="px-30">
                <div className="mb-15 text-center">
                    <h1 className="font-bold text-3xl text-violet-500">Features</h1>
                    <p className="text-accent">Everything You Need in One Place</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {contents.map((content, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-between p-8 rounded-3xl bg-[#0A0A0C] border border-white/[0.05] transition-all duration-300 hover:border-violet-500/30 hover:bg-[#0E0E10]"
                        >
                            <div className="mb-6">
                                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-violet-500/10 mb-4">
                                    <span className="text-violet-500">{content.icon}</span>
                                </div>
                                <h3 className="text-white font-semibold text-xl tracking-tight leading-none">
                                    {content.features}
                                </h3>
                            </div>
                            <p className="text-white/50 font-normal text-sm leading-relaxed">
                                {content.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
