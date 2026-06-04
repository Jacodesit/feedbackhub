import { CATEGORY_CONFIG, FeedbackCategory, STATUS_CONFIG } from '@/components/constants/feedback';
import { Feedback } from "@/types/feedbackhub"

type pageProps = {
    topFeedbacks: Feedback[]
}

export default function TopVotedFeedback({topFeedbacks}:pageProps) {
    return (
        <section className="rounded-md flex-1 flex flex-col gap-3">
            {topFeedbacks.map((topFeedback, index ) => {
                const statusConfig = STATUS_CONFIG[topFeedback.status] || {
                    label: topFeedback.status,
                    className: 'bg-gray-100 text-gray-700'
                };

                const categoryConfig = CATEGORY_CONFIG[topFeedback.category as FeedbackCategory] || {
                    label: topFeedback.category,
                    className: 'bg-gray-100 text-gray-700'
                };
                return (
                    <div
                        key={topFeedback.id}
                        className="bg-white px-5 py-3 rounded-lg shadow-md flex items-center flex-1"
                    >
                        <div className='flex flex-col gap-4 w-4/5'>
                            <div className='flex items-center gap-2'>
                                <span className="text-[10px] text-gray-500 font-bold border h-6 w-6 rounded-full p-3 flex justify-center items-center bg-zinc-100">
                                    #{index + 1}
                                </span>
                                <h1 className='text-base font-medium'>{topFeedback.title}</h1>
                            </div>

                            <div className='flex gap-1'>
                                <span className={`text-[8px] px-3 py-1 rounded-md border uppercase ${statusConfig.className}`}>
                                    {statusConfig.label}
                                </span>
                                <span className={`text-[8px] px-3 py-1 rounded-md font-medium ${categoryConfig.className}`}>
                                    {categoryConfig.label}
                                </span>
                            </div>
                        </div>
                        <div className='flex items-center justify-center w-1/5'>
                            <div>
                                <h1 className='text-4xl'>{topFeedback.votes}</h1>
                                <p className='text-gray-500 text-xs font-medium'>Votes</p>
                            </div>
                        </div>

                    </div>
                )
            })}
        </section>
    )
}
