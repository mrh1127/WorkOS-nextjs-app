export function logServerError(context: string, error: unknown) {
  console.error(`[${context}]`, error);
  // Optionally send to external logging service like Sentry, LogRocket, etc.
}
