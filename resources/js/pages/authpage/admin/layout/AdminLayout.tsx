import { useState } from "react"
import AdminSidebar from "../components/sidebar"
import { PanelLeftClose, PanelRightClose, Search } from "lucide-react"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Logout from "@/components/logout-btn"
// import { Button } from "@/components/ui/button"

interface AdminLayoutProps {
    children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [ open, setOpen ] = useState(false)

    return (
        <div className="flex gap-4 bg-[#fafafa] p-4">
            <AdminSidebar open={open} />

            <main className="w-full h-screen bg-white rounded-lg">
                <header className="border-b px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setOpen(!open)}
                        >
                            { open ? <PanelLeftClose strokeWidth={1.5} /> : <PanelRightClose strokeWidth={1.5} /> }
                        </button>

                        <div>
                            <Field orientation={"horizontal"} className="w-96 border rounded-lg">
                                <Input
                                    type="search"
                                    placeholder="Search feedback title, users"
                                    className="h-8 bg-[#fafafa] border-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                />

                                <div className="pr-3">
                                    <Search size={15} />
                                </div>
                            </Field>
                        </div>
                    </div>

                    <Logout />
                </header>

                {children}
            </main>
        </div>
    )
}
