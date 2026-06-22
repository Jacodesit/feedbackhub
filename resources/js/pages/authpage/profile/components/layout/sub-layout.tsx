import { RefObject } from "react";
import { PaginatedFeedbacks, UserStats } from "@/types/feedbackhub";
import Feedbacks from "../sections/feedbacks";
import Profile from "../sections/profile";
import Stats from "../sections/stats";
import Activity from "../sections/activity";
import Settings from "../sections/settings";

type SubLayoutProps = {
    feedbacks: PaginatedFeedbacks;
    stats: UserStats;
    refs: {
        profile: RefObject<HTMLDivElement | null>;
        stats: RefObject<HTMLDivElement | null>;
        feedbacks: RefObject<HTMLDivElement | null>;
        activity: RefObject<HTMLDivElement | null>;
        settings: RefObject<HTMLDivElement | null>;
    };
}

export default function ProfileSubLayout({ feedbacks, stats, refs }: SubLayoutProps) {
    return (
        <section className="bg-white rounded-lg shadow-md p-6 lg:p-10 flex flex-col gap-5 w-full">
            <div id="spy-profile" ref={refs.profile} className="scroll-mt-50"><Profile /></div>
            <div id="spy-stats" ref={refs.stats} className="scroll-mt-20"><Stats stats={stats} /></div>
            <div id="spy-feedbacks" ref={refs.feedbacks} className="scroll-mt-20"><Feedbacks feedbacks={feedbacks}/></div>
            <div id="spy-activity" ref={refs.activity} className="scroll-mt-20"><Activity /></div>
            <div id="spy-settings" ref={refs.settings} className="scroll-mt-20"><Settings /></div>
        </section>
    );
}
