import { useForm } from '@inertiajs/react';
import { LogOut } from 'lucide-react';

export default function Logout() {
    const { post, processing } = useForm({});

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        post(route('logout'));
    };

    return (
        <button
            onClick={handleLogout}
            disabled={processing} // or "ghost", "destructive" etc.
            className="border px-6 py-2 flex items-center"
        >
            {processing ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
                <LogOut className="mr-2 h-4 w-4" />
            )}

            Logout
        </button>
    )
}
