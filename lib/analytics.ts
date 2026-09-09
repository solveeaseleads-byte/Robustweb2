export type EventName = 'search'|'tool_open'|'recommendation_click'|'lead_start'|'lead_submit'|'solution_click'|'feedback';
export type AnalyticsEvent = { name:EventName; sessionId:string; toolSlug?:string; query?:string; metadata?:Record<string,unknown>; at:string };

export function newSessionId(){ return `se_${Date.now()}_${Math.random().toString(36).slice(2,9)}`; }
