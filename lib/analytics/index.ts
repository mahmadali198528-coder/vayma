export type AnalyticsEvent = { name: string; properties?: Record<string, string> };
export function track(_event: AnalyticsEvent) { /* Add consent-aware provider here. */ }
