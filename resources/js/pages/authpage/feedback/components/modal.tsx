import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
} from "@/components/ui/dialog"

type pageProps = {
    open: boolean;
    onClose: () => void;
}

export default function PostModal({open, onClose}:pageProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onClose}
        >
            <DialogContent className="flex ">
                <div className="w-1/2 p-10">
                    <img src="/images/feedback.svg" alt="Feedback" />
                </div>

                <div className="w-1/2 p-5">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Share your feedback</DialogTitle>
                        <DialogDescription>
                            Submit ideas, report issues, or suggest improvements to help shape better products.
                        </DialogDescription>
                    </DialogHeader>
                </div>
            </DialogContent>
        </Dialog>
    )
}


