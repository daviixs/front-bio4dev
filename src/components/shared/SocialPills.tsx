import { Pencil } from 'lucide-react';
import { FaLink } from 'react-icons/fa6';

import { cn } from '@/components/ui/utils';
import type { RenderableSocialLink } from '@/lib/socialIcons';

type SocialPillsSurface = 'light' | 'dark';

interface SocialPillsProps {
  items: RenderableSocialLink[];
  surface?: SocialPillsSurface;
  className?: string;
  itemClassName?: string;
  iconContainerClassName?: string;
  labelClassName?: string;
  iconSize?: number;
  editMode?: boolean;
  onItemClick?: (item: RenderableSocialLink, index: number) => void;
  onEditItem?: (item: RenderableSocialLink, index: number) => void;
  editButtonClassName?: string;
}

const SURFACE_STYLES: Record<SocialPillsSurface, string> = {
  light:
    'border-slate-200 bg-white/75 text-slate-700 hover:border-slate-300 hover:bg-white',
  dark: 'border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10',
};

const ICON_SURFACE_STYLES: Record<SocialPillsSurface, string> = {
  light: 'bg-slate-900/5 text-current',
  dark: 'bg-white/10 text-current',
};

export function SocialPills({
  items,
  surface = 'dark',
  className,
  itemClassName,
  iconContainerClassName,
  labelClassName,
  iconSize = 18,
  editMode = false,
  onItemClick,
  onEditItem,
  editButtonClassName,
}: SocialPillsProps) {
  if (!items.length) return null;

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {items.map((item, index) => {
        const Icon = typeof item.Icon === 'function' ? item.Icon : FaLink;
        const isButton = Boolean(onItemClick) || !item.url;
        const interactiveClassName = cn(
          'inline-flex min-h-11 items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          SURFACE_STYLES[surface],
          itemClassName,
        );
        const content = (
          <>
            <span
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                ICON_SURFACE_STYLES[surface],
                iconContainerClassName,
              )}
            >
              <Icon size={iconSize} />
            </span>
            <span className={cn('truncate', labelClassName)}>{item.label}</span>
          </>
        );

        return (
          <div key={item.id} className="relative group">
            {isButton ? (
              <button
                type="button"
                onClick={() => onItemClick?.(item, index)}
                className={interactiveClassName}
                aria-label={item.label}
              >
                {content}
              </button>
            ) : (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={interactiveClassName}
                aria-label={item.label}
              >
                {content}
              </a>
            )}

            {editMode && onEditItem && (
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onEditItem(item, index);
                }}
                className={cn(
                  'absolute -top-1 -right-1 rounded-full border border-slate-200 bg-white p-0.5 text-slate-700 opacity-0 shadow-md transition-all group-hover:opacity-100 hover:bg-blue-50',
                  editButtonClassName,
                )}
                title={`Editar ${item.label}`}
                aria-label={`Editar ${item.label}`}
              >
                <Pencil className="h-2.5 w-2.5" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
