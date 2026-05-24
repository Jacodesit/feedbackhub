import { Feedback } from "@/types/feedbackhub"

type pageProps = {
    feedback: Feedback
}

export default function Feedbacks({feedback}:pageProps) {
    return (
        <section>
            <h5 className="text-gray-500 text-sm mb-2">Feedbacks</h5>
            <div>
                <h1>{feedback.title}</h1>
                <p>{feedback.description}</p>
            </div>
        </section>
    )
}
