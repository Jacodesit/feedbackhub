import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";
import { UserRoundPen } from "lucide-react";
import EditDetails from "../forms/details";

type pageProps = {
    open: boolean;
    onClose: () => void;
}

export default function EditAccount({open, onClose}:pageProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onClose}
        >
            <DialogContent className="">
                <DialogHeader className="">
                    <div className="bg-black w-15 rounded-lg flex justify-center items-center p-4 mb-4">
                        <UserRoundPen className="text-white" size={25} />
                    </div>
                    <DialogTitle className="text-2xl">Edit Account Details</DialogTitle>
                    <DialogDescription>
                        Update your personal information and keep your account details up to date.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <EditDetails onClose={onClose}/>
            </DialogContent>
        </Dialog>
    )
}


