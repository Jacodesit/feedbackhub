import { PageProps } from '@/types/feedbackhub';
import { useForm, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';

export default function Logout() {
    const { auth } = usePage<PageProps>().props
    const user = auth.user

    const { post, processing } = useForm({});

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        post(route('logout'));
    };

    return (
        <button
            onClick={handleLogout}
            disabled={processing}
            className={`text-sm rounded-lg border border-white/10 px-6 py-2 flex items-center transtion-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)]
            hover:border-white/30 hover:text-white gap-1 ${
                user ? 'text-white' : ''
            }`}
        >
            {processing ? (
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
                <LogOut className="mr-2 h-4 w-4" />
            )}

            Logout
        </button>
    )
}
