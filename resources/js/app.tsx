// app.tsx
import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { route as routeFn } from 'ziggy-js';
import { initializeTheme } from './hooks/use-appearance';
import { Toaster } from '@/components/ui/sonner';

declare global {
    const route: typeof routeFn;
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

let themeInitialized = false;

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        if (!themeInitialized) {
            initializeTheme();
            themeInitialized = true;
        }

        root.render(
            <>
                <App {...props} />
                <Toaster richColors position="top-right" />
            </>

        );
    },
    progress: {
        color: '#4B5563',
    },
});
