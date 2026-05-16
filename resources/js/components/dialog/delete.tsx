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
import { Feedback } from "@/types/feedbackhub";
import { router, useForm } from "@inertiajs/react";
import { toast } from "sonner";

type pageProps = {
    feedback: Feedback
    openDialog: boolean
    onClose: () => void
    onDeleted?: () => void
}

export default function DeleteDialog({openDialog, onClose, onDeleted, feedback}:pageProps) {
    const { processing } = useForm({});

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        router.delete(route('feedbacks.destroy', feedback.id ), {
            onSuccess: () => {
                toast.success('Deleted successfully');
                onClose()
                onDeleted?.()
            }
        });
    };

    return (
        <AlertDialog
            open={openDialog}
            onOpenChange={(open) => {
                if (!open) onClose()
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Delete feedback?</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to delete this feedback? This action cannot be undone.
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
                        onClick={handleDelete}
                    >
                        {processing ? 'Deleting' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
