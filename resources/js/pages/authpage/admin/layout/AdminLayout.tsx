import { useState } from "react"
import AdminSidebar from "../components/sidebar"
import { PanelLeftClose, PanelRightClose, Search } from "lucide-react"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import AdminHeading from "../components/heading"

interface AdminLayoutProps {
    children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex gap-4 bg-[#fafafa] p-4 min-h-screen">
            <AdminSidebar open={open} />

            <main
                className={`
                    flex flex-col gap-5 flex-1 rounded-lg transition-all duration-300 ease-in-out
                    ${open ? 'ml-[320px]' : 'ml-0'}
                `}
            >
                <header className="px-6 py-5 bg-white shadow-md rounded-lg">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex gap-5">
                            <button onClick={() => setOpen(!open)}>
                                {open ? <PanelLeftClose strokeWidth={1.5} size={20} /> : <PanelRightClose strokeWidth={1.5} size={20} />}
                            </button>

                            <AdminHeading />
                        </div>


                        <div>
                            <Field orientation={"horizontal"} className="w-96 border rounded-lg">
                                <Input
                                    type="search"
                                    placeholder="Search feedback title, users"
                                    className="h-8   border-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                                <div className="pr-3">
                                    <Search size={15} />
                                </div>
                            </Field>
                        </div>
                    </div>
                </header>

                <div className="">
                    {children}
                </div>
            </main>
        </div>
    )
}
