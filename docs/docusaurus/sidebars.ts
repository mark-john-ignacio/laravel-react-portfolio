import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
    // Main documentation sidebar organized by category
    docs: [
        'intro',
        {
            type: 'category',
            label: '📐 Design',
            items: ['design/brittany-chiang-redesign', 'design/visual-comparison', 'design/redesign-summary', 'design/hero-spacing-fix'],
        },
        {
            type: 'category',
            label: '🧩 UI Components',
            items: ['ui-components/ui-improvements', 'ui-components/ui-visual-reference', 'ui-components/quick-start-ui'],
        },
        {
            type: 'category',
            label: '🐛 Bug Fixes',
            items: [
                'bug-fixes/modal-scroll-fix',
                'bug-fixes/modal-showmore-fix',
                'bug-fixes/scrollbar-fix',
                'bug-fixes/scroll-fix-tldr',
                'bug-fixes/quick-fix-reference',
            ],
        },
        {
            type: 'category',
            label: '🖱️ Features (Deprecated)',
            items: ['features/custom-cursor-guide', 'features/cursor-visual-guide', 'features/cursor-quick-ref', 'features/cursor-removed'],
        },
    ],
};

export default sidebars;
