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
import { router, usePage } from "@inertiajs/react";
import { ShieldCheck, SlidersHorizontal, User } from "lucide-react"

export default function RoleFilter() {
    const { filters } = usePage().props as any;
    const currentRole = filters?.role || 'all';

    const handleRoleChange = (role: string) => {
            router.get(
                window.location.pathname,
                {
                    ...filters,
                    role: role
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
                <Button
                    variant="outline"
                >
                    <SlidersHorizontal />
                    Filter Role
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Role</DropdownMenuLabel>

                    <DropdownMenuItem onClick={() => handleRoleChange('all')}>
                        Show All
                        {currentRole === 'all' && ' ✓'}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => handleRoleChange('user')}>
                        <User />
                        User
                        {currentRole === 'user' && ' ✓'}
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleRoleChange('admin')}>
                        <ShieldCheck />
                        Admin
                        {currentRole === 'admin' && ' ✓'}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
