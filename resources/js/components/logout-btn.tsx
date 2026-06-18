import { PageProps } from '@/types/feedbackhub';
import { usePage } from '@inertiajs/react';
import LogoutDialog from './dialog/logout';
import { useState } from 'react';

export default function Logout() {
    const [openDialog, setOpenDialog] = useState(false)

    const { auth } = usePage<PageProps>().props
    const user = auth.user
    return (
        <div>
            <button
                onClick={() => setOpenDialog(true)}
                className={`text-[10px] md:text-sm rounded-lg border border-white/10 px-4 md:px-6 py-2 flex items-center transtion-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)]
                hover:border-white/30 hover:text-white gap-1 ${
                    user ? 'text-white' : ''
                }`}
            >
                Logout
            </button>

            <LogoutDialog
                openDialog={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </div>

    )
}
