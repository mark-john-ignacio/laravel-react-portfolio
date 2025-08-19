import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export type TimelineItem = {
    id: number | string;
    title: string;
    company?: string;
    from?: string;
    to?: string;
    description?: string;
};

export default function Timeline({ items }: { items: TimelineItem[] }) {
    return (
        <div className="space-y-6">
            {items.map((item, idx) => (
                <Card key={item.id} className="transform transition-transform duration-500 motion-safe:hover:-translate-y-1">
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                {item.company && <div className="text-sm text-gray-600">{item.company}</div>}
                            </div>
                            <Badge variant="secondary">{item.from}{item.to ? ` — ${item.to}` : ' — Present'}</Badge>
                        </div>
                        {item.description && <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{item.description}</p>}
                    </div>
                </Card>
            ))}
        </div>
    );
}
