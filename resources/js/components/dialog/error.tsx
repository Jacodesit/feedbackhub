import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Link } from "@inertiajs/react"

type pageProps = {
    openDialog: boolean
    onClose: () => void
    authHeadline: string
    authSubtext: string
}

export default function AuthDialog({openDialog, onClose, authHeadline, authSubtext}:pageProps) {
    return (
        <AlertDialog
            open={openDialog}
            onOpenChange={(open) => {
                if (!open) onClose()
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{authHeadline}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {authSubtext}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={onClose}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <Link
                        href="/login"
                    >
                        <AlertDialogAction>
                            Login
                        </AlertDialogAction>
                    </Link>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
