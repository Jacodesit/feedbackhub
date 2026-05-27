import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import DeleteAccountForm from "@/pages/authpage/profile/components/forms/delete";
import { Separator } from "../ui/separator";

type pageProps = {
    openDialog: boolean
    onClose: () => void
}

export default function DeleteAccount({openDialog, onClose, }:pageProps) {
    return (
        <AlertDialog
            open={openDialog}
            onOpenChange={onClose}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Once you delete your account, theres no going back. Please be certain.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Separator />
                <DeleteAccountForm onClose={onClose}/>
            </AlertDialogContent>
        </AlertDialog>
    )
}
