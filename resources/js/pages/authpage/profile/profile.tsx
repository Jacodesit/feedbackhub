import AuthenticatedLayout from "@/layouts/auth/authenticated-layout";
import { Feedback } from "@/types/feedbackhub";
import ProfileMainLayout from "./components/layout/main-layout";

type pageProps = {
    feedbacks: Feedback[]
}

export default function Profile({feedbacks}:pageProps) {
    return (
        <AuthenticatedLayout>
            <div className="bg-[#fafafa]">
                <ProfileMainLayout feedbacks={feedbacks}/>
            </div>
        </AuthenticatedLayout>
    )
}
