import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

/**
 * Skeleton loading component with shimmer animation
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
}) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-[#112240] via-[#1d2d50] to-[#112240] bg-[length:200%_100%]';
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        'animate-shimmer',
        className
      )}
      style={style}
      aria-hidden="true"
    />
  );
};

/**
 * Project card skeleton loader
 */
export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-lg bg-[#112240] p-6 ring-1 ring-[#233554]">
      <Skeleton className="mb-3 h-40 w-full" variant="rectangular" />
      <Skeleton className="mb-2 h-6 w-3/4" variant="text" />
      <Skeleton className="mb-4 h-4 w-full" variant="text" />
      <Skeleton className="mb-2 h-4 w-full" variant="text" />
      <Skeleton className="mb-4 h-4 w-2/3" variant="text" />
      <div className="flex gap-3">
        <Skeleton className="h-6 w-16" variant="rectangular" />
        <Skeleton className="h-6 w-16" variant="rectangular" />
        <Skeleton className="h-6 w-20" variant="rectangular" />
      </div>
    </div>
  );
};

/**
 * Grid of project skeletons
 */
export const ProjectsSkeletonGrid: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
};
