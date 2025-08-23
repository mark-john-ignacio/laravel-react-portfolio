import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import React from 'react';

class GlobalErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error: any, info: any) {
         
        console.error('GlobalErrorBoundary caught an error', error, info);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="px-6 py-32 text-center text-[#8892b0]">
                    <h1 className="mb-4 text-2xl font-semibold text-[#e6f1ff]">Something went wrong.</h1>
                    <p className="mb-6 text-sm">An unexpected error occurred. Try refreshing the page.</p>
                    <button onClick={() => window.location.reload()} className="rounded border border-[#64ffda] px-6 py-3 font-mono text-sm text-[#64ffda] hover:bg-[#64ffda]/10">
                        Reload
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <GlobalErrorBoundary>
                <App {...props} />
            </GlobalErrorBoundary>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
