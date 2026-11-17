/**
 * Dictionaries for the Tool Stats page.
 *
 * `zh` is the key-set source of truth, as in the official client plugins, and `en` is
 * typed against it: a key translated in one language but not the other fails the build
 * instead of silently rendering the raw key.
 *
 * @module client/locales
 */
/** Dictionary namespace owned by this plugin. */
export declare const NS = "toolStats";
/** Simplified Chinese dictionary (the key-set source of truth). */
export declare const zh: {
    nav: string;
    title: string;
    tool: string;
    calls: string;
    failRate: string;
    deadTools: string;
    failingTools: string;
    recommendations: string;
    empty: string;
    refresh: string;
    loading: string;
    failed: string;
    retry: string;
    totalCalls: string;
    totalFailures: string;
    sessions: string;
    avgLatency: string;
    export: string;
    clear: string;
    confirmClear: string;
    errorBreakdown: string;
    recentCalls: string;
    sessionsUnused: string;
    notFound: string;
    cleared: string;
    tools: string;
};
/** English dictionary, checked complete against the zh key set. */
export declare const en: typeof zh;
