import {
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { SquarePen, Trash } from "lucide-react"
import { useState } from "react";
import EditSheet from "./sheet"
import { Feedback } from "@/types/feedbackhub";

type pageProps = {
    feedback: Feedback
    onFeedbackUpdate?: (updatedFeedback: Feedback) => void
}

export default function EditDeleteButtons({feedback, onFeedbackUpdate}:pageProps) {
    const [editSheet, setEditSheet] = useState(false);

    const handleClose = () => {
        setEditSheet(false);
    }

    const currentPath = window.location.pathname

    return (
        <div
            className={`${currentPath !== '/feedback' ? 'flex gap-2' : 'hidden'}`}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => setEditSheet(true)}
                            className='flex items-center gap-2 py-2 px-3 border rounded-lg transition-all duration-300 transform hover:text-green-500 hover:-translate-y-1 cursor-pointer'
                        >
                            <SquarePen
                                size={15}
                                strokeWidth={1.5}
                            />
                            <p className='text-sm'>Edit</p>
                        </button>
                    </TooltipTrigger>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button className='flex items-center gap-2 py-2 px-3 border rounded-lg transition-all duration-300 transform hover:text-red-500 hover:-translate-y-1 cursor-pointer'>
                            <Trash
                                size={15}
                                strokeWidth={1.5}
                                className=''
                            />
                            <p className='text-sm'>Delete</p>
                        </button>
                    </TooltipTrigger>
                </Tooltip>
            </TooltipProvider>

            <EditSheet
                open={editSheet}
                onClose={handleClose}
                feedback={feedback}
                onFeedbackUpdate={onFeedbackUpdate}
            />
        </div>
    )
}
