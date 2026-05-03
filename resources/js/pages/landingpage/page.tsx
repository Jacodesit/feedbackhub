import Heading from "@/components/heading";
import Hero from "./components/hero/page";
import ProblemSolution from "./components/problemsolution/page";
import Features from "./components/features/page";
import HowItWorks from "./components/howitworks/page";
import CallToAction from "./components/landingcta/page";
import Footer from "@/components/footer";

export default function LandingPage() {
    return (
        <main>
            <Heading />
            <Hero />
            <ProblemSolution />
            <Features />
            <HowItWorks />
            <CallToAction />
            <Footer />
        </main>
    )
}
