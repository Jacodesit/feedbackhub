import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    // AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

type pageProps = {
    openDialog: boolean
    onClose: () => void
}

export default function LogoutDialog({openDialog, onClose}:pageProps) {
    const { post, processing } = useForm({});

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        post(route('logout'), {
            onSuccess: () => {
                toast.success('Logout successfully');
            }
        });
    };

    return (
        <AlertDialog
            open={openDialog}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Logging out of your account</AlertDialogTitle>
                <AlertDialogDescription>
                    You will end your session on this device and return to the login screen.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={onClose}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={processing}
                        onClick={handleLogout}
                    >
                        {processing ? 'Logging out' : 'Logout'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
