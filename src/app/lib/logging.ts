export function logServerError(context: string, error: unknown) {
  console.error(`[${context}]`, error);
}
