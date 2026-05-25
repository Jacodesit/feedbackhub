// resources/js/Components/Avatar.tsx

interface AvatarProps {
    user?: {
        id?: number;
        name: string;
        avatar?: string | null;
    } | null;
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
    md: 'w-10 h-10 text-xl',
    lg: 'w-32 h-32 text-5xl',
};

const getGradientFromId = (id: number | string): string => {
    const hash = String(id).split('').reduce((acc, char) => {
        return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);
    return gradients[Math.abs(hash) % gradients.length];
};

export default function Avatar({ user, size = 'md', className = '' }: AvatarProps) {
    const sizeClass = sizeClasses[size];
    const currentPath = window.location.pathname;
    const borderClass = currentPath === '/profile' ? '  ' : 'border-0';
    const baseClass = `${sizeClass} box-border shrink-0 overflow-hidden flex items-center justify-center rounded-full ${borderClass} shadow-lg ${className}`;

    if (!user) {
        return (
            <div className={`${baseClass} bg-gray-300`}>
                <p className="font-bold text-gray-500">?</p>
            </div>
        );
    }

    if (user.avatar) {
        return (
            <div className={baseClass}>
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full object-cover"
                />
            </div>
        );
    }

    const gradientClass = user.id
        ? getGradientFromId(user.id)
        : 'from-violet-500 to-indigo-600';

    return (
        <div className={`${baseClass} bg-gradient-to-br ${gradientClass} text-white`}>
            {/* <p className="font-bold">
                {user.name?.charAt(0)?.toUpperCase() || '?'}
            </p> */}
            <img src="/images/profile-placeholder.jpg" alt="profile-placeholder" />
        </div>
    );
}
