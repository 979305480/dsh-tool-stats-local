import type { ToolCall, ToolCounter, DeadTool, FailingTool, Recommendation, DailyToolTrend, ToolDetail, Alert, ToolStatsOverview } from './types.js';
export declare function aggregate(calls: ToolCall[]): Map<string, ToolCounter>;
export declare function findDeadTools(configuredTools: string[], calls: ToolCall[], threshold?: number): DeadTool[];
export declare function findFailingTools(calls: ToolCall[], threshold?: number): FailingTool[];
export declare function recommend(configuredTools: string[], calls: ToolCall[], deadThreshold?: number, estimatedTokensPerTool?: number): Recommendation[];
/** Build daily trend for a specific tool. */
export declare function dailyTrend(calls: ToolCall[], toolName: string): DailyToolTrend[];
/** Detailed view for a single tool. */
export declare function toolDetail(calls: ToolCall[], toolName: string): ToolDetail | null;
/** Generate alerts for failing tools. */
export declare function generateAlerts(calls: ToolCall[], threshold?: number): Alert[];
/** Compute overview stats. */
export declare function overview(calls: ToolCall[]): ToolStatsOverview;
