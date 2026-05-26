import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

type pageProps = {
    onClose: () => void
}

export default function EditPassword({onClose}:pageProps) {
    const { data, setData, processing, errors, put } = useForm({
        current_password: '',
        password: '',
        password_confirmation: ''
    })

    const submit = (e:React.FormEvent) => {
        e.preventDefault()
        put(route('password.update'), {
            onSuccess: () => [
                toast.success('Password updated successfully!'),
                onClose()
            ]
        })
    }

    return (
        <form onSubmit={submit}>
            <FieldGroup className="flex flex-col h-full">
                <FieldSet>
                    <Field>
                        <FieldLabel>Current Password</FieldLabel>
                        <Input
                            type="password"
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            id="current-password"
                            placeholder="Current password here..."
                        />
                        {errors.current_password && <p className="errors text-xs text-destructive">{errors.current_password}</p>}
                    </Field>
                </FieldSet>

                <FieldSet>
                    <Field>
                        <FieldLabel>New Password</FieldLabel>
                        <Input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            id="new-password"
                            placeholder="New password here..."
                        />
                        {errors.password && <p className="errors text-xs text-destructive">{errors.password}</p>}
                    </Field>
                </FieldSet>

                <FieldSet>
                    <Field>
                        <FieldLabel>Confirm New Password</FieldLabel>
                        <Input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            id="confirm-password"
                            placeholder="New password here..."
                        />
                        {errors.password_confirmation && <p className="errors text-xs text-destructive">{errors.password_confirmation}</p>}
                    </Field>
                </FieldSet>

                <Separator />

                <div
                    className="flex gap-2 justify-end"
                >
                    <button
                        onClick={onClose}
                        className="cursor-pointer px-6 py-2 text-sm border rounded-lg ease-[cubic-bezier(0.23,1,0.32,1)]
                        hover:-translate-y-1 transition-all duration-300 hover:bg-gray-200 hover:border-white"
                    >
                        Close
                    </button>

                    <button
                        disabled={processing}
                        className="cursor-pointer px-6 py-2 bg-gray-900 rounded-lg text-sm text-white ease-[cubic-bezier(0.23,1,0.32,1)]
                        hover:-translate-y-1 transition-all duration-300 hover:bg-black"
                    >
                        {processing ? 'Changing password...' : 'Change password'}
                    </button>
                </div>
            </FieldGroup>
        </form>
    )
}
