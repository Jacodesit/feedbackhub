import { Database, Edit3, MessagesSquare, Monitor } from "lucide-react"

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-5 px-0 lg:p-20 bg-slate-100">
            <div className="px-5 md:px-28 lg:px-30">
                <div className="mb-5 md:mb-10 lg:mb text-center">
                    <h1 className="font-bold text-2xl lg:text-5xl mb-3 lg:mb-5 text-violet-500">How It Works</h1>
                    <p className="text-sm md:text-base">Simple Steps. Real Results.</p>
                </div>

                <div className="flex flex-col gap-5 w-full">
                    <div className="lg:flex">
                        <div className="w-full lg:w-1/2 flex  rounded-3xl bg-white border border-slate-100">
                            <div className="flex justify-center items-center p-8 border-r bg-black text-white rounded-tl-3xl rounded-bl-3xl">
                                <p className="text-sm md:text-xl">1</p>
                            </div>
                            <div className="p-8">
                                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-violet-50 transition-colors group-hover:bg-violet-100">
                                    <Edit3 className="text-violet-500" />
                                </div>

                                <h3 className="font-semibold text-sm md:text-xl tracking-tight leading-none my-4">
                                    Submit Feedback
                                </h3>
                                <p className="italic font-light text-xs md:text-sm leading-relaxed">Share your ideas, report issues, or suggest features in seconds.</p>
                            </div>
                        </div>
                        <div className="lg:w-1/2"></div>
                    </div>

                    <div className="lg:flex">
                        <div className="lg:w-1/2"></div>
                        <div className="w-full lg:w-1/2  flex rounded-3xl bg-white border border-slate-100" >
                            <div className="flex justify-center items-center p-8 border-r bg-black text-white rounded-tl-3xl rounded-bl-3xl" >
                                <p className="text-sm md:text-xl">2</p>
                            </div>
                            <div className="p-8">
                                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-violet-50 transition-colors group-hover:bg-violet-100">
                                    <Database className="text-violet-500"/>
                                </div>
                                <h3 className="font-semibold text-sm md:text-xl tracking-tight leading-none my-4">
                                    System Collects Data
                                </h3>
                                <p className="italic font-light text-xs md:text-sm leading-relaxed">All feedback is stored in one organized system</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:flex">
                        <div className="w-full lg:w-1/2  flex rounded-3xl bg-white border border-slate-100" >
                            <div className="flex justify-center items-center p-8 border-r bg-black text-white rounded-tl-3xl rounded-bl-3xl">
                                <p className="text-sm md:text-xl">3</p>
                            </div>
                            <div className="p-8">
                                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-violet-50 transition-colors group-hover:bg-violet-100">
                                    <MessagesSquare className="text-violet-500"/>
                                </div>
                                <h3 className="font-semibold text-sm md:text-xl tracking-tight leading-none my-4">
                                    Vote and Discuss
                                </h3>
                                <p className="italic font-light text-xs md:text-sm leading-relaxed">Users vote on feedback and leave comments to highlight what matters most.</p>
                            </div>
                        </div>
                        <div className="lg:w-1/2"></div>
                    </div>

                    <div className="lg:flex">
                        <div className="lg:w-1/2"></div>
                        <div className="w-full lg:w-1/2  flex rounded-3xl bg-white border border-slate-100" >
                            <div className="flex justify-center items-center p-8 border-r bg-black text-white rounded-tl-3xl rounded-bl-3xl">
                                <p className="text-sm md:text-xl">4</p>
                            </div>
                            <div className="p-8">
                                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-violet-50 transition-colors group-hover:bg-violet-100">
                                    <Monitor className="text-violet-500"/>
                                </div>
                                <h3 className="font-semibold text-sm md:text-xl tracking-tight leading-none my-4">
                                    Track Progress
                                </h3>
                                <p className="italic font-light text-xs md:text-sm leading-relaxed">Follow updates as feedback moves from open to completed.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
