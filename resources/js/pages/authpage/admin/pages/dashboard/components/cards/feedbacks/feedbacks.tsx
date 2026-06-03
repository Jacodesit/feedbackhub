import { CATEGORY_CONFIG, FeedbackCategory, STATUS_CONFIG } from '@/components/constants/feedback';
import Avatar from "@/components/avatar/profile";
import { Feedback } from "@/types/feedbackhub"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

type pageProps = {
    recentFeedbacks: Feedback[]
}

dayjs.extend(relativeTime);

export default function RecentFeedbacks({recentFeedbacks}:pageProps) {
    return (
        <section className="rounded-md grid grid-cols-2 gap-3">
            {recentFeedbacks.map(recentFeedbacks => {
                const statusConfig = STATUS_CONFIG[recentFeedbacks.status] || {
                    label: recentFeedbacks.status,
                    className: 'bg-gray-100 text-gray-700'
                };

                const categoryConfig = CATEGORY_CONFIG[recentFeedbacks.category as FeedbackCategory] || {
                    label: recentFeedbacks.category,
                    className: 'bg-gray-100 text-gray-700'
                };

                return (
                    <div
                        key={recentFeedbacks.id}
                        className={`relative bg-white p-5 flex flex-col gap-5 shadow-md rounded-lg
                        before:absolute before:left-0 before:top-[15%] before:h-[70%] before:w-[0.2rem] before:rounded-r-md
                        ${statusConfig.borderClass}`}
                    >
                        <div className='flex justify-between items-center'>
                            {recentFeedbacks.user.avatar ? (
                                <div className="w-10 h-10 flex items-center justify-center rounded-full shadow-lg">
                                    <img
                                        src={recentFeedbacks.user.avatar}
                                        alt={recentFeedbacks.user.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </div>
                            ) : (
                                <Avatar user={recentFeedbacks.user} className="h-10 w-10" />
                            )}

                            <span className={`text-[9px] px-3 py-1 rounded-md border uppercase ${statusConfig.className}`}>
                                {statusConfig.label}
                            </span>
                        </div>

                        <div>
                            <h1 className='text-lg font-medium'>{recentFeedbacks.title}</h1>
                        </div>

                        <div className='flex items-center justify-between border-t border-t-zinc-50'>
                            <div className='flex flex-col py-2'>
                                <p className='text-sm'>{recentFeedbacks.user.name}</p>
                                <p className='text-[0.6em] text-gray-500'>
                                    {dayjs(recentFeedbacks.created_at).format('MMM D, YYYY')} • {dayjs(recentFeedbacks.created_at).fromNow()}
                                </p>
                            </div>

                            <span className={`text-[9px] px-3 py-1 rounded-md font-medium ${categoryConfig.className}`}>
                                {categoryConfig.label}
                            </span>
                        </div>
                    </div>
                )
            })}

        </section>
    )
}
