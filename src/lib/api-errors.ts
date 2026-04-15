export function getApiErrorMessage(error: unknown): string {
  const message =
    (error as any)?.response?.data?.message ?? (error as any)?.message ?? '';

  if (Array.isArray(message)) {
    return message.join(', ');
  }

  return typeof message === 'string' ? message : '';
}
