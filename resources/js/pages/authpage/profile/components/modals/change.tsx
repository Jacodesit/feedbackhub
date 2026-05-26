import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";
import { Lock } from "lucide-react";
import EditPassword from "../forms/password";

type pageProps = {
    open: boolean;
    onClose: () => void;
}

export default function ChangePassword({open, onClose}:pageProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onClose}
        >
            <DialogContent className="">
                <DialogHeader className="">
                    <div className="bg-black w-15 rounded-lg flex justify-center items-center p-4 mb-4">
                        <Lock className="text-white" size={25} />
                    </div>
                    <DialogTitle className="text-2xl">Change account password</DialogTitle>
                    <DialogDescription>
                        Update your password to keep your account secure and protected.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <EditPassword onClose={onClose}/>
            </DialogContent>
        </Dialog>
    )
}


