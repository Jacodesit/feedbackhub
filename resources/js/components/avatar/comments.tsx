import { PageProps } from "@/types/feedbackhub";
import { usePage } from "@inertiajs/react";

interface AvatarProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const gradients = [
    'from-violet-500 to-indigo-600',
    'from-pink-500 to-rose-600',
    'from-cyan-500 to-blue-600',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-yellow-500 to-amber-600',
    'from-fuchsia-500 to-purple-600',
    'from-sky-500 to-indigo-600',
    'from-green-500 to-emerald-600',
    'from-red-500 to-pink-600',
    'from-blue-500 to-cyan-600',
    'from-purple-500 to-violet-600',
];

const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-32 h-32 text-5xl',
};

const getGradientFromId = (id: number | string): string => {
    const hash = String(id).split('').reduce((acc, char) => {
        return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);
    return gradients[Math.abs(hash) % gradients.length];
};

const Comments = ({ size = 'md', className = '' }: AvatarProps) => {
    const { auth } = usePage<PageProps>().props
    const currentPath = window.location.pathname
    const sizeClass = sizeClasses[size];

    if (auth.user?.avatar) {
        return (
            <div className={`${sizeClass} flex items-center justify-center border-4 border-white rounded-full`}>
                <img
                    src={auth.user.avatar}
                    alt={auth.user.name}
                    className="w-full h-full rounded-full object-cover"
                />
            </div>
        );
    }

    const gradientClass = auth.user?.id
        ? getGradientFromId(auth.user?.id)
        : 'from-violet-500 to-indigo-600';

    return (
        <div className={`${sizeClass} flex items-center justify-center rounded-full bg-gradient-to-br ${gradientClass} ${currentPath === '/profile' ? 'border-4 border-white text-white' : 'border-0 text-white w-12 h-12'} shadow-lg ${className}`}>
            <p className="font-bold">
                {auth.user?.name.charAt(0)?.toUpperCase()}
            </p>
        </div>
    );
};

export default Comments;
