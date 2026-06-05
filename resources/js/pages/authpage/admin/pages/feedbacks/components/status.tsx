import { Button } from "@/components/ui/button"
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select"

export default function StatusDropdown() {
    return (
        <section className="flex items-center gap-1">
            <NativeSelect>
                <NativeSelectOption value="">Update Status</NativeSelectOption>
                <NativeSelectOption value="apple">Open</NativeSelectOption>
                <NativeSelectOption value="banana">In Progress</NativeSelectOption>
                <NativeSelectOption value="blueberry">Completed</NativeSelectOption>
            </NativeSelect>

            <Button variant={"link"} className="">Save</Button>
        </section>

    )
}
