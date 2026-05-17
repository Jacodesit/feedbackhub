import { router, usePage, useForm } from "@inertiajs/react";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { PageProps } from "@/types/feedbackhub";
import { toast } from "sonner";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

type pageProps = {
    onClose: () => void
}

export default function EditDetails({onClose}:pageProps) {
    const { auth, csrf_token } = usePage<PageProps>().props
    const csrfToken = csrf_token ?? document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';

    const { data, setData, patch, processing, errors, setError } = useForm({
        name: auth.user?.name,
        email: auth.user?.email,
        avatar: auth.user?.avatar
    })

    const [avatarPreview, setAvatarPreview] = useState(null);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('avatar', 'Please select an image file');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setError('avatar', 'Image size should be less than 2MB');
            return;
        }

        try {
            setUploadingAvatar(true);

            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('avatar', file);

            const response = await fetch(route('profile.avatar.upload'), {
                method: 'POST',
                credentials: 'same-origin',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                const result = await response.json().catch(() => null);
                throw new Error(result?.message || result?.errors?.avatar?.[0] || 'Upload failed');
            }

            const result = await response.json();

            setData('avatar', result.avatar_url);
            e.target.value = '';

            setAvatarPreview(null);
            router.reload({ only: ['auth'] });
            toast.success('Avatar updated successfully!');

        } catch (error) {
            console.error('Error uploading avatar:', error);
            setError('avatar', error instanceof Error ? error.message : 'Failed to upload avatar. Please try again.');
            setAvatarPreview(null);
        } finally {
            setUploadingAvatar(false);
        }
    };

    const handleRemoveAvatar = async () => {
        try {
            const response = await fetch(route('profile.avatar.remove'), {
                method: 'DELETE',
                credentials: 'same-origin',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                const result = await response.json().catch(() => null);
                throw new Error(result?.message || 'Failed to remove avatar');
            }

            setData('avatar', null);
            setAvatarPreview(null);
            router.reload({ only: ['auth'] });
            toast.success('Avatar removed successfully!');
        } catch (error) {
            console.error('Error removing avatar:', error);
            setError('avatar', error instanceof Error ? error.message : 'Failed to remove avatar');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('profile.update'), {
            onSuccess: () => {
                toast.success('Profile updated successfully!');
                onClose()
            },
            onError: () => {
                toast.error('Failed to update profile');
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <FieldGroup className="flex flex-col h-full">
                <div className="flex flex-col gap-5 flex-1">
                    <FieldSet>
                        <Field>
                            <FieldLabel>Profile Picture</FieldLabel>
                            <div className="flex items-center gap-4">
                                <div className="relative group">
                                    {avatarPreview || data.avatar ? (
                                        <img
                                            src={avatarPreview || data.avatar}
                                            alt="Profile"
                                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                                        />
                                    ) : (
                                        <div className="border-2 border-white w-20 h-20 flex items-center justify-center rounded-full bg-violet-500 text-white">
                                            <p className="font-bold text-3xl">
                                                {data.name ? data.name.charAt(0).toUpperCase() : '?'}
                                            </p>
                                        </div>
                                    )}

                                    <label
                                        htmlFor="avatar-upload"
                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-200"
                                    >
                                        <svg
                                            className="w-6 h-6 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    </label>
                                    <input
                                        id="avatar-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleAvatarUpload}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-medium text-gray-700">
                                        Upload a profile picture
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Recommended: JPG, PNG, or GIF. Max 2MB.
                                    </p>
                                    {data.avatar && (
                                        <button
                                            type="button"
                                            onClick={handleRemoveAvatar}
                                            className="text-xs text-red-500 hover:text-red-700 mt-1 text-left"
                                        >
                                            Remove photo
                                        </button>
                                    )}
                                </div>
                            </div>
                            {errors.avatar && (
                                <p className="errors text-sm text-destructive mt-2">{errors.avatar}</p>
                            )}
                        </Field>
                    </FieldSet>

                    <FieldSet>
                        <Field>
                            <FieldLabel>Name</FieldLabel>
                            <Input
                                value={data.name}
                                id="name"
                                autoComplete="off"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
                                placeholder="Enter your full name"
                            />
                            {errors.name && <p className="errors text-sm text-destructive">{errors.name}</p>}
                        </Field>
                    </FieldSet>

                    <FieldSet>
                        <Field>
                            <FieldLabel>Email</FieldLabel>
                            <Input
                                value={data.email}
                                id="email"
                                type="email"
                                autoComplete="off"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('email', e.target.value)}
                                placeholder="Enter your email address"
                            />
                            {errors.email && <p className="errors text-sm text-destructive">{errors.email}</p>}
                        </Field>
                    </FieldSet>
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
                        Close
                    </button>

                    <button
                        type="submit"
                        disabled={processing || uploadingAvatar}
                        className="cursor-pointer px-6 py-2 bg-violet-500 rounded-lg text-sm text-white ease-[cubic-bezier(0.23,1,0.32,1)]
                        hover:-translate-y-1 transition-all duration-300 hover:bg-violet-700 hover:border-violet-700"
                    >
                        {processing ? 'Submitting Feedback' : 'Submit'}
                    </button>
                </div>
            </FieldGroup>
        </form>
    )
}
