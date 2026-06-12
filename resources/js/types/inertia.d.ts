import { PageProps as InertiaPageProps } from '@inertiajs/react';

declare module '@inertiajs/react' {
    interface PageProps extends InertiaPageProps {
        flash?: {
            success?: string;
            error?: string;
            info?: string;
            warning?: string;
        };
    }
}
