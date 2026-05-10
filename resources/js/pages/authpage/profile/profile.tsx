import AuthenticatedLayout from "@/layouts/auth/authenticated-layout";
import Sidebar from "./components/sidebar";

export default function Profile() {
    return (
        <AuthenticatedLayout>
            <div className="bg-[#fafafa]">
                <section className="w-full  relative px-50 py-35">
                    <Sidebar />
                </section>
            </div>
        </AuthenticatedLayout>
    )
}
