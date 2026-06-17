import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";

export default function SearchComponent() {
    const currentPath = window.location.pathname;
    const { filters } = usePage().props as any;

    const [search, setSearch] = useState(filters?.search || "");
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const getRouteName = () => {
        if (currentPath === "/admin/feedbacks" || currentPath.startsWith("/admin/feedbacks")) {
            return "admin.index";
        }
        if (currentPath === "/admin/users" || currentPath.startsWith("/admin/users")) {
            return "admin.users";
        }
        if (currentPath === "/admin/reports" || currentPath.startsWith("/admin/reports")) {
            return "admin.reported.feedbacks";
        }
        return window.location.pathname;
    };

    useEffect(() => {
        if (debouncedSearch !== (filters?.search || "")) {
            const routeName = getRouteName();

            router.get(
                route(routeName),
                {
                    search: debouncedSearch || undefined,
                },
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                }
            );
        }
    }, [debouncedSearch]);

    const handleClear = () => {
        setSearch("");
    };

    const getPlaceholder = () => {
        if (currentPath.includes("/admin/feedbacks")) {
            return 'Search User Name, Email, or Feedback Title';
        }
        if (currentPath.includes("/admin/users")) {
            return 'Search User Name, Email, or Public ID';
        }
        if (currentPath.includes("/admin/reports")) {
            return 'Search Reporter, Email, or Feedback Title';
        }
        return 'Search...';
    };

    return (
        <div className="mb-2">
            <Field orientation="horizontal" className="w-96 border rounded-lg bg-white relative">
                <Input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={getPlaceholder()}
                    className="h-10 border-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 pl-3 pr-10"
                />
                <div className="pr-3 absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    {search && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="hover:bg-gray-100 rounded-full p-0.5 transition-colors"
                        >
                        </button>
                    )}
                    <Search size={15} className="text-gray-400" />
                </div>
            </Field>
        </div>
    )
}
