import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchComponent() {
    return (
        <div className="mb-2">
            <Field orientation={"horizontal"} className="w-96 border rounded-lg bg-white">
                <Input
                    type="search"
                    placeholder="Search feedback title, users"
                    className="h-10 border-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <div className="pr-3 ">
                    <Search size={15} />
                </div>
            </Field>
        </div>
    )
}
