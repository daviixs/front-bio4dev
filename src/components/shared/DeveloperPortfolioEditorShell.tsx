import type { ReactNode } from 'react';
import {
  getDeveloperTemplateName,
  type DeveloperTemplateType,
} from '@/features/developer-create/shared';
import { PreviewToolbarCard } from '@/components/shared/PreviewToolbarCard';

export const developerEditorChrome = {
  root: 'developer-theme-scope flex min-h-screen flex-col bg-white',
  page: 'bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.12),transparent_34%)] bg-slate-50',
  previewToolbar:
    'border border-indigo-200/80 bg-white/94 text-slate-900 shadow-[0_24px_60px_-36px_rgba(79,70,229,0.35)] backdrop-blur',
  previewToolbarTitle: 'text-slate-900',
  previewToolbarMeta: 'text-slate-500',
  previewToolbarPrimary:
    'border border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700',
  previewToolbarSecondary:
    'border border-slate-200 bg-white text-slate-900 hover:bg-slate-100',
};

export function getDeveloperEditorCanvasClass(
  templateType: DeveloperTemplateType,
) {
  if (templateType === 'template_02') {
    return 'bg-[#050505]';
  }

  if (templateType === 'template_03') {
    return 'bg-[#0d0d0d]';
  }

  return 'bg-[#c5b9b7]';
}

interface DeveloperPortfolioEditorShellProps {
  title: ReactNode;
  templateType: DeveloperTemplateType;
  slug: string;
  actions: ReactNode;
  children: ReactNode;
  metaNote?: ReactNode;
}

export function DeveloperPortfolioEditorShell({
  title,
  templateType,
  slug,
  actions,
  children,
  metaNote,
}: DeveloperPortfolioEditorShellProps) {
  return (
    <div className={developerEditorChrome.root}>
      <div
        className={`px-4 pt-5 sm:px-6 sm:pt-6 ${developerEditorChrome.page}`}
      >
        <PreviewToolbarCard
          title={title}
          meta={
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>{getDeveloperTemplateName(templateType)}</span>
              <span className="text-slate-300">·</span>
              <span className="font-mono text-[13px]">bio4.dev/{slug}</span>
              {metaNote ? (
                <>
                  <span className="text-slate-300">·</span>
                  {metaNote}
                </>
              ) : null}
            </div>
          }
          className={developerEditorChrome.previewToolbar}
          titleClassName={developerEditorChrome.previewToolbarTitle}
          metaClassName={developerEditorChrome.previewToolbarMeta}
          actions={actions}
        />
      </div>

      <div className={getDeveloperEditorCanvasClass(templateType)}>
        {children}
      </div>
    </div>
  );
}
