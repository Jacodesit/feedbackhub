
import {
    Field,
    // FieldDescription,
    // FieldGroup,
    // FieldLabel,
    // FieldLegend,
    // FieldSeparator,
    FieldSet,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export default function CommentForm() {
    return (
        <div className='min-w-0 flex-1'>
            <form className='flex w-full gap-2'>
                <FieldSet className='min-w-0 flex-1'>
                    <Field className='min-w-0'>
                        <Input
                            id="comment"
                            placeholder="Add a comment..."
                            className="w-full"
                        />
                    </Field>
                </FieldSet>

                <button
                    className="cursor-pointer py-2 px-3 border rounded-lg ease-[cubic-bezier(0.23,1,0.32,1)]
                    hover:-translate-y-1 transition-all duration-300 hover:bg-gray-200 hover:border-white"
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    )
}
