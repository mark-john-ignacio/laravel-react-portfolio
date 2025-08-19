import { Head, Link } from '@inertiajs/react';
import Timeline, { type TimelineItem } from '@/components/Timeline';

const resumeItems: TimelineItem[] = [
    {
        id: 1,
        title: 'Senior Software Engineer',
        company: 'Acme Corp',
        from: '2022',
        to: 'Present',
        description: 'Working on full-stack features using Laravel, React, and TypeScript. Focus on performance and DX improvements.',
    },
    {
        id: 2,
        title: 'Frontend Engineer',
        company: 'Brightside Studio',
        from: '2019',
        to: '2022',
        description: 'Built interactive UIs with React and Tailwind, collaborated with designers and backend teams.',
    },
    {
        id: 3,
        title: 'Software Developer (Intern)',
        company: 'Startup Labs',
        from: '2018',
        to: '2019',
        description: 'Implemented features and assisted in testing and deployment pipelines.',
    },
];

export default function About() {
    return (
        <>
            <Head title="About" />
            <div className="mx-auto max-w-4xl p-6">
                <h1 className="mb-2 text-2xl font-semibold">About</h1>
                <p className="mb-4 text-gray-700 dark:text-gray-300">I build web applications with a focus on developer experience and performance. Below is a quick timeline of recent roles — pull from your resume PDF or replace these entries with real content.</p>
                <div className="mb-6">
                    <a href="/storage/resume.pdf" target="_blank" rel="noreferrer" className="inline-block rounded bg-sky-600 px-4 py-2 text-white">Download Resume (PDF)</a>
                </div>

                <Timeline items={resumeItems} />

                <div className="mt-6">
                    <Link href={route('projects.index')} className="text-sky-600 underline">
                        View projects
                    </Link>
                </div>
            </div>
        </>
    );
}
