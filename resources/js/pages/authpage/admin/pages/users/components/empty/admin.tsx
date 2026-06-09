import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Lock } from "lucide-react";

export default function AdminEmpty() {
    return (
        <Empty className="">
            <EmptyHeader>
                <EmptyMedia className="bg-gray-200 p-2 rounded-lg">
                    <Lock size={20} />
                </EmptyMedia>
                <EmptyTitle>Administrator</EmptyTitle>
                <EmptyDescription>
                    Administrative accounts do not have community contribution statistics.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}
