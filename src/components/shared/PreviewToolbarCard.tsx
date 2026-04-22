import type { ReactNode } from 'react';

interface PreviewToolbarCardProps {
  title: ReactNode;
  meta?: ReactNode;
  actions: ReactNode;
  className?: string;
  titleClassName?: string;
  metaClassName?: string;
  actionsClassName?: string;
}

export function PreviewToolbarCard({
  title,
  meta,
  actions,
  className,
  titleClassName,
  metaClassName,
  actionsClassName,
}: PreviewToolbarCardProps) {
  return (
    <div
      className={`mx-auto flex max-w-5xl flex-col gap-4 rounded-[28px] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 ${className || ''}`}
    >
      <div>
        <h1 className={`text-lg font-semibold ${titleClassName || ''}`}>
          {title}
        </h1>
        {meta ? <div className={`text-sm ${metaClassName || ''}`}>{meta}</div> : null}
      </div>
      <div className={`flex flex-col gap-3 sm:flex-row ${actionsClassName || ''}`}>
        {actions}
      </div>
    </div>
  );
}
