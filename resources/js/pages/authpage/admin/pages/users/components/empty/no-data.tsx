import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    // EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { MessageSquareMore } from "lucide-react"

export function EmptyData() {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia className="bg-gray-200 p-2 rounded-lg">
                    <MessageSquareMore size={20} />
                </EmptyMedia>
                <EmptyTitle>No comments submitted yet</EmptyTitle>
                <EmptyDescription>
                    This user hasn't shared any feedback or feature requests yet.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}
