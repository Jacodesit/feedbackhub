import { Feedback } from "@/types/feedbackhub";
import Sidebar from "../sidebar";
import ProfileSubLayout from "./sub-layout";
import { useEffect, useRef, useState } from "react";

type SectionKey = "profile" | "stats" | "feedbacks" | "activity" | "settings";

export default function ProfileMainLayout({ feedbacks }: { feedbacks: Feedback[] }) {
    const [activeSection, setActiveSection] = useState<SectionKey>("profile");

    const sectionRefs = {
        profile: useRef<HTMLDivElement>(null),
        stats: useRef<HTMLDivElement>(null),
        feedbacks: useRef<HTMLDivElement>(null),
        activity: useRef<HTMLDivElement>(null),
        settings: useRef<HTMLDivElement>(null),
    };

    useEffect(() => {
        const updateActiveSection = () => {
            const scrollTarget = window.scrollY + window.innerHeight * 0.25;

            let currentSection: SectionKey = "profile";

            (Object.keys(sectionRefs) as SectionKey[]).forEach((sectionKey) => {
                const section = sectionRefs[sectionKey].current;

                if (section && section.offsetTop <= scrollTarget) {
                    currentSection = sectionKey;
                }
            });

            setActiveSection(currentSection);
        };

        updateActiveSection();
        window.addEventListener("scroll", updateActiveSection, { passive: true });
        window.addEventListener("resize", updateActiveSection);

        return () => {
            window.removeEventListener("scroll", updateActiveSection);
            window.removeEventListener("resize", updateActiveSection);
        };
    });

    const scrollToSection = (sectionKey: SectionKey) => {
        setActiveSection(sectionKey);
        sectionRefs[sectionKey].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <main className="flex flex-col gap-10 items-start relative z-10 px-50 py-30">
            <div>
                <h1 className="font-semibold text-4xl">Profile</h1>
                <p className="text-gray-500">Manage your account, track your feedback activity, and view your contributions in one place.</p>
            </div>
            <div className="flex gap-5">
                <div className="sticky top-30 self-start">
                    <Sidebar onNavigate={scrollToSection} activeSection={activeSection} />
                </div>

                <ProfileSubLayout feedbacks={feedbacks} refs={sectionRefs} />
            </div>

        </main>
    );
}
