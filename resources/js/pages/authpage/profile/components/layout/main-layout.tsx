import { Feedback } from "@/types/feedbackhub";
import Sidebar from "../sidebar";
import ProfileSubLayout from "./sub-layout";

type pageProps = {
    feedbacks: Feedback[]
}

export default function ProfileMainLayout({feedbacks}:pageProps) {
    return (
        <main className="flex gap-5 items-start relative z-10">
            <Sidebar />
            <ProfileSubLayout feedbacks={feedbacks}/>
        </main>
    )
}
