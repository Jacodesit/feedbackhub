import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="bg-background flex min-h-svh overflow-hidden">
            <div className='hidden lg:w-3/5 left-container p-20 lg:flex justify-center items-center mx-auto'>

            </div>
            <div className="flex w-full flex-col justify-center items-center px-6 lg:w-2/5 lg:px-12">
                <div className="mx-auto flex w-full max-w-[350px] flex-col justify-center gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href='/'
                            className="flex flex-col items-center gap-2 font-medium "
                        >
                            <AppLogoIcon />
                        </Link>

                        <div className="space-y-1 text-center">
                            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
                            <p className="text-muted-foreground text-xs">{description}</p>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        {children}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
