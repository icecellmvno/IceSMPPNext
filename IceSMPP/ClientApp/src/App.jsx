import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from './Components/theme-provider';

const appName = import.meta.env.VITE_APP_NAME || 'IceSMPP';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider defaultTheme="system" storageKey="app-theme">
                <App {...props} />
            </ThemeProvider>
        );
    },
    mixin:{
        
    },
    progress: {
        color: '#4B5563',
    },
});
