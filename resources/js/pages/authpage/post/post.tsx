import AuthenticatedLayout from "@/layouts/auth/authenticated-layout";

export default function Posts() {
    return (
        <AuthenticatedLayout>
            <div>
                This is post page
            </div>
        </AuthenticatedLayout>
    )
}
