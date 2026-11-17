import type { Context } from '@deepseek-ai/cordis';
import { ToolStats } from './stats.js';
export declare const name = "dsh-tool-stats";
export interface StatsService {
    record(call: Parameters<ToolStats['record']>[0]): void;
    summary(configuredTools?: string[]): ReturnType<ToolStats['summary']>;
    query(range?: {
        from?: number | undefined;
        to?: number | undefined;
    }, configuredTools?: string[]): ReturnType<ToolStats['summary']>;
    detail(toolName: string): ReturnType<ToolStats['detail']>;
    exportCSV(): string;
    clearData(): void;
}
export declare function apply(ctx: Context): void;
