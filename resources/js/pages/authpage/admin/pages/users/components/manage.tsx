import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type pageProps = {
    open: boolean
    onClose: () => void
}

export default function ManageAccount({open, onClose}:pageProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">Manage User Account</DialogTitle>
                    <DialogDescription>
                        Choose an action for this account. Some actions are reversible, while others are permanent.
                    </DialogDescription>
                </DialogHeader>
                <section className="flex flex-col gap-2">

                    {/* Suspend */}
                    <button className="text-left cursor-pointer">
                        <Card className="transition-all duration-300 hover:bg-destructive/80 group hover:border-white">
                            <CardHeader className="p-3 group-hover:text-white">
                                <CardTitle className="text-base mb-1 font-medium">Suspend User</CardTitle>
                                <CardDescription className="text-xs group-hover:text-white">
                                    Temporarily restrict this user's access to the platform. The user will be unable to sign in until the suspension is removed.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </button>

                    {/* Delete */}
                    <button className="text-left ">
                        <Card className="cursor-pointer transition-all duration-300 hover:bg-destructive group hover:border-white">
                            <CardHeader className="p-3">
                                <CardTitle className="text-base mb-1 font-medium group-hover:text-white">Delete User</CardTitle>
                                <CardDescription className="text-xs group-hover:text-white">
                                    Permanently remove this user and all associated data, including feedback, comments, and votes. This action cannot be undone.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </button>
                </section>

                <DialogFooter className="justify-end flex gap-2">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Proceed</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


