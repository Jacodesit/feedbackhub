import { Feedback } from "@/types/feedbackhub";
import Feedbacks from "../sections/feedbacks";
import Profile from "../sections/profile";
import Stats from "../sections/stats";
import Activity from "../sections/activity";
import Settings from "../sections/settings";

type pageProps = {
    feedbacks: Feedback[]
}

export default function ProfileSubLayout({feedbacks}:pageProps) {
    return (
        <section className="w-4/5 bg-white rounded-lg shadow-md p-10 flex flex-col gap-5">
            <Profile />
            <Stats />
            <Feedbacks feedbacks={feedbacks}/>
            <Activity />
            <Settings />
        </section>
    )
}
