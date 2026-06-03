import Avatar from "@/components/avatar/profile";
import { User } from "@/types";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

type pageProps = {
    recentUsers: User[]
}

dayjs.extend(relativeTime);

export default function RecentUsers({recentUsers}:pageProps) {
    return (
        <section className="rounded-md grid grid-cols-4 gap-3">
            {recentUsers.map(recentUser => (
                <div
                    key={recentUser.id}
                    className="bg-white px-5 py-[29px] rounded-lg shadow-md flex flex-col justify-center items-center text-center gap-3"
                >
                    <Avatar user={recentUser} className="h-18 w-18" />

                    <div>
                        <h1>{recentUser.name}</h1>
                        <p className='text-[0.6em] text-gray-500'>
                            Joined {dayjs(recentUser.created_at).format('MMM D, YYYY')}
                        </p>
                    </div>


                </div>
            ))}
        </section>
    )
}
