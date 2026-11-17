import type { Context } from '@deepseek-ai/cordis';
import type { StatsService } from './index.js';
import { STATS_PANEL_PATH } from './stats.js';
export { STATS_PANEL_PATH };
export declare const STATS_DETAIL_PATH = "/api/stats.detail";
export declare const STATS_EXPORT_PATH = "/api/stats.export";
export declare const STATS_CLEAR_PATH = "/api/stats.clear";
export declare function registerStatsRoutes(ctx: Context, stats: StatsService): void;
