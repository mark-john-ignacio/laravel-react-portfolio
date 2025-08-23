import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import * as React from 'react';

export interface SocialLinkRow {
  id: number | string;
  platform: string;
  display_name?: string | null;
  url: string;
  icon?: string | null;
  is_active: boolean;
  sort_order?: number | null;
}

// Extracted actions cell to adhere to React Hooks rules (no hooks inside table definition inline functions)
function ActionsCell({ id }: { id: number | string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex justify-end gap-1">
      <Button asChild size="sm" variant="outline">
        <Link href={`/admin/portfolio/social-links/${id}/edit`}>Edit</Link>
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="destructive">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Social Link</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this social link.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => router.delete(`/admin/portfolio/social-links/${id}`, { onFinish: () => setOpen(false) })}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export const socialLinkColumns: ColumnDef<SocialLinkRow>[] = [
  {
    accessorKey: 'platform',
    header: () => <span className="text-[11px]">Platform</span>,
    cell: ({ row }) => <span className="font-medium text-xs">{row.original.platform}</span>,
  },
  {
    accessorKey: 'display_name',
    header: () => <span className="text-[11px]">Display Name</span>,
    cell: ({ row }) => <span className="text-xs text-muted-foreground truncate max-w-[180px]" title={row.original.display_name || ''}>{row.original.display_name || ''}</span>,
  },
  {
    accessorKey: 'url',
    header: () => <span className="text-[11px]">URL</span>,
    cell: ({ row }) => (
      <a href={row.original.url} target="_blank" rel="noreferrer" className="underline text-primary text-[11px] max-w-[240px] truncate inline-block" title={row.original.url}>{row.original.url}</a>
    ),
  },
  {
    accessorKey: 'is_active',
    header: () => <span className="text-[11px]">Status</span>,
    cell: ({ row }) => row.original.is_active ? (
      <Badge variant="secondary" className="text-[10px]">Active</Badge>
    ) : (
      <Badge variant="outline" className="text-[10px]">Inactive</Badge>
    ),
  },
  {
    accessorKey: 'sort_order',
    header: () => <span className="text-[11px]">Sort</span>,
    cell: ({ row }) => <span className="text-xs tabular-nums">{row.original.sort_order ?? 0}</span>,
    sortingFn: 'alphanumeric',
  },
  {
    id: 'actions',
    header: () => <span className="text-[11px]">Actions</span>,
    enableSorting: false,
    cell: ({ row }) => <ActionsCell id={row.original.id} />,
  },
];
