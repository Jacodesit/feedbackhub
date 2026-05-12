import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
} from "@/components/ui/dialog"
import PostForm from "./form";
import { Separator } from "@/components/ui/separator";
import { MessageSquareMore } from "lucide-react";

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
            <DialogContent className="">
                <DialogHeader className="">
                    <div className="bg-black w-15 rounded-lg flex justify-center items-center p-4 mb-4">
                        <MessageSquareMore className="text-white" size={25} />
                    </div>
                    <DialogTitle className="text-2xl">Share your feedback</DialogTitle>
                    <DialogDescription>
                        Submit ideas, report issues, or suggest improvements to help shape better products.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <PostForm

                    onClose={onClose}
                />
            </DialogContent>
        </Dialog>
    )
}


