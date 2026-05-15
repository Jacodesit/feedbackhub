import {
    Sheet,
    // SheetClose,
    SheetContent,
    SheetDescription,
    // SheetFooter,
    SheetHeader,
    SheetTitle,
    // SheetTrigger,
} from "@/components/ui/sheet"
import { Feedback } from "@/types/feedbackhub"
import EditForm from "./forms/edit"

type pageProps = {
    open: boolean
    onClose: () => void
    feedback: Feedback
    onFeedbackUpdate?: (updatedFeedback: Feedback) => void
}

export default function EditSheet({ open, onClose, feedback, onFeedbackUpdate}: pageProps) {
    return (
        <Sheet
            open={open}
            onOpenChange={onClose}
        >
            <SheetContent>
                <SheetHeader className="mb-6">
                    <SheetTitle className="text-2xl">Edit Feedback</SheetTitle>
                    <SheetDescription>Make changes to your feedback here. Click update when you're done.</SheetDescription>
                </SheetHeader>
                <EditForm
                    feedback={feedback}
                    onClose={onClose}
                    onFeedbackUpdate={onFeedbackUpdate}
                />
            </SheetContent>
        </Sheet>
    )
}
