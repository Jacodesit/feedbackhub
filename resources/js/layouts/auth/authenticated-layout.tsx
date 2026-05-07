import Heading from "@/components/heading"

interface AuthenticatedLayoutProps  {
    children: React.ReactNode
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
    return (
        <div className="">
            <Heading />
            <main className="">
                {children}
            </main>
        </div>
    )
}
