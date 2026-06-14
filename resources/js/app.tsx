import '../css/app.css';
import { createInertiaApp, type ResolvedComponent } from '@inertiajs/react';
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

type PageModule = {
    default: ResolvedComponent;
};

const inertiaRoot = document.getElementById('app');
const initialPage = document.querySelector<HTMLScriptElement>(
    'script[data-page="app"][type="application/json"]'
);

if (!inertiaRoot || !initialPage?.textContent) {
    throw new Error(
        'Inertia initial page payload was not found. Make sure config/inertia.php enables use_script_element_for_initial_page and resources/views/app.blade.php includes @inertia.'
    );
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name: string) => {
        const page = await resolvePageComponent<PageModule>(
            `./pages/${name}.tsx`,
            import.meta.glob<PageModule>('./pages/**/*.tsx')
        );

        return page.default;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        if (!themeInitialized) {
            initializeTheme();
            themeInitialized = true;
        }

        root.render(
            <>
                <App {...props} />
                <Toaster richColors position="bottom-right" />
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
