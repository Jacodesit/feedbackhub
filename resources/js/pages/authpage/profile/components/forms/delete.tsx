import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useForm } from "@inertiajs/react";
import { TriangleAlert } from "lucide-react";
import { toast } from "sonner";

type pageProps = {
    onClose: () => void
}

export default function DeleteAccountForm({onClose}:pageProps) {
    const { data, setData, delete: destroy, processing, errors, reset } = useForm({
        password: '',
    })

    const submit = (e:React.FormEvent) => {
        e.preventDefault()
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Your account deleted successfully!')
                onClose()
            },
            onFinish: () => {
                reset('password')
            },
        })
    }

    return (
        <form onSubmit={submit}>
            <FieldGroup className="flex flex-col h-full">
                <FieldSet className="">
                    <Field>
                        <FieldLabel className="font-normal flex gap-1 text-gray-500">To confirm, type your<span className="font-medium text-black">password</span></FieldLabel>
                        <Input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            id="new-password"
                            placeholder="Enter your password to proceed"
                        />
                        {errors.password && <p className="errors text-xs text-destructive">{errors.password}</p>}
                    </Field>
                </FieldSet>

                <div className="bg-destructive/10 p-3 text-destructive rounded-md border-l-4 border-l-destructive">
                    <p
                        className="flex gap-1 text-xs"
                    >
                        <TriangleAlert size={13} />
                        This action permanently deletes your account and all associated data.
                    </p>
                </div>

                <Separator />

                <div
                    className="flex gap-2 justify-end"
                >
                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer px-6 py-2 text-sm border rounded-lg ease-[cubic-bezier(0.23,1,0.32,1)]
                        hover:-translate-y-1 transition-all duration-300 hover:bg-gray-200 hover:border-white"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer px-6 py-2 bg-destructive rounded-lg text-sm text-white ease-[cubic-bezier(0.23,1,0.32,1)]
                        hover:-translate-y-1 transition-all duration-300"
                    >
                        {processing ? 'Deleting account...' : 'Delete account'}
                    </button>
                </div>
            </FieldGroup>
        </form>
    )
}
