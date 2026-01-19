import axios from "axios";

export function logError(
  context: string,
  error: unknown,
  extra?: Record<string, unknown>,
) {
  if (axios.isAxiosError(error)) {
    const resp = error.response;
    console.error(`[${context}] AxiosError:`, {
      message: error.message,
      status: resp?.status,
      data: resp?.data,
      url: error.config?.url,
      method: error.config?.method,
      extra,
    });
    return;
  }

  if (extra) {
    console.error(`[${context}]`, error, extra);
    return;
  }

  console.error(`[${context}]`, error);
}

export function getErrorMessage(error: unknown, fallback: string) {
  // Axios errors often contain useful info in `response.data`
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as any;
    if (data?.message) return data.message;
    if (error.message) return error.message;
    return fallback;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
