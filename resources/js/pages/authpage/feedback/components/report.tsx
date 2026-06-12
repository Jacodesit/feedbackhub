import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";
import { Flag } from "lucide-react";
import { Feedback, ReportReason } from "@/types/feedbackhub";
import ReportForm from "./forms/report";

type pageProps = {
    open: boolean
    onClose: () => void
    feedback: Feedback
    reasons: Record<ReportReason, string>
}

export default function ReportFeedback({open, onClose, feedback, reasons}:pageProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onClose}
        >
            <DialogContent className="">
                <DialogHeader className="">
                    <div className="bg-black w-15 rounded-lg flex justify-center items-center p-4 mb-4">
                        <Flag className="text-white" size={25} />
                    </div>
                    <DialogTitle className="text-2xl">Report Feedback</DialogTitle>
                    <DialogDescription>
                        Report this feedback for review by our moderation team. Please provide a reason for reporting to help us take appropriate action.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <ReportForm feedback={feedback} reasons={reasons} onClose={onClose}/>
            </DialogContent>
        </Dialog>
    )
}


