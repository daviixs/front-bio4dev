import { toast } from 'sonner';

export const PORTFOLIO_EDITOR_TOAST_ID = 'portfolio-1-editor-toast';

export const showPortfolioEditorSuccess = (message: string) =>
  toast.success(message, { id: PORTFOLIO_EDITOR_TOAST_ID });

export const showPortfolioEditorError = (message: string) =>
  toast.error(message, { id: PORTFOLIO_EDITOR_TOAST_ID });
