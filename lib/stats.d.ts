import type { ToolCall, PanelPayload, ToolDetail, TimeRange } from './types.js';
export declare const STATS_PANEL_PATH = "/api/stats.panel";
export declare class ToolStats {
    private projectDir;
    private store;
    constructor(projectDir: string);
    record(call: ToolCall): void;
    summary(configuredTools?: string[]): PanelPayload;
    /** Query calls with optional time range. */
    query(range?: TimeRange, configuredTools?: string[]): PanelPayload;
    /** Get detailed stats for one tool. */
    detail(toolName: string): ToolDetail | null;
    /** Export all calls as CSV. */
    exportCSV(): string;
    /** Clear all recorded data. */
    clearData(): void;
}
