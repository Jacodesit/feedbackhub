import Footer from "@/components/footer"
import Heading from "@/components/heading"
import { Toaster } from "@/components/ui/sonner"

interface AuthenticatedLayoutProps  {
    children: React.ReactNode
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
    return (
        <div className="">
            <Heading />
            <Toaster position="top-right" />
            <main className="">
                {children}
            </main>
            <Footer />
        </div>
    )
}
