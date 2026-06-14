import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bug, Gauge, Lightbulb, MessageSquareMore, SlidersHorizontal } from "lucide-react"
import { router, usePage } from "@inertiajs/react"

export default function CategoryFilter() {
    const { filters } = usePage().props as any;
    const currentCategory = filters?.category || 'all';

    const handleCategoryFilter = (category: string) => {
        router.get(
            window.location.pathname,
            {
                ...filters,
                category: category
            },
            {
                preserveState: true,
                replace: true,
                preserveScroll: true
            }
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <SlidersHorizontal />
                    Filter Category
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Category</DropdownMenuLabel>

                    <DropdownMenuItem onClick={() => handleCategoryFilter('all')}>
                        Show All
                        {currentCategory === 'all' && ' ✓'}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => handleCategoryFilter('feature_request')}>
                        <Lightbulb />
                        Feature Request
                        {currentCategory === 'feature_request' && ' ✓'}
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleCategoryFilter('bug_report')}>
                        <Bug />
                        Bug Report
                        {currentCategory === 'bug_report' && ' ✓'}
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleCategoryFilter('performance')}>
                        <Gauge />
                        Performance
                        {currentCategory === 'performance' && ' ✓'}
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleCategoryFilter('ui_ux')}>
                        <Gauge />
                        UI/UX
                        {currentCategory === 'ui_ux' && ' ✓'}
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleCategoryFilter('other')}>
                        <MessageSquareMore />
                        Other
                        {currentCategory === 'other' && ' ✓'}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
