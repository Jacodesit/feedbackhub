import { Feedback } from "@/types/feedbackhub"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

type pageProps = {
    recentFeedbacks: Feedback[]
}

dayjs.extend(relativeTime);

export default function RecentFeedbacks({recentFeedbacks}:pageProps) {
    return (
        <section className="rounded-md flex flex-col gap-2">
            {recentFeedbacks.map(recentFeedbacks => (
                <div
                    key={recentFeedbacks.id}
                    className="bg-white p-5"
                >
                    <h1>{recentFeedbacks.title}</h1>
                    <p>{recentFeedbacks.user.name}</p>
                    <p>{recentFeedbacks.category}</p>
                    <p>{recentFeedbacks.status}</p>
                    <p className='text-xs text-gray-500'>
                        {dayjs(recentFeedbacks.created_at).format('MMM D, YYYY')} • {dayjs(recentFeedbacks.created_at).fromNow()}
                    </p>
                </div>
            ))}
        </section>
    )
}
