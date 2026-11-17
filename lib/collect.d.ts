import type { ToolExecution, ToolExecutionResult } from '@deepseek-ai/dsh-tools';
import type { ToolCall } from './types.js';
/** Agent.id 与所属 session 共用同一身份（dsh-agent runtime-types 注释），直接作为会话键。 */
export declare function sessionIdOf(exec: ToolExecution): string;
/** 调用起点表；与采集器实例绑定，避免多个装载实例互相看见起点。 */
export declare class CallTimer {
    private readonly starts;
    /** 记录一次调用开始（tools/pre-execute 里调用）。 */
    start(exec: ToolExecution): void;
    /**
     * 结算一次调用为一条记录（tools/result 里调用）。
     * @returns 可直接入库的一条调用；找不到起点时标 untimed，latencyMs 置 0 占位，
     *   由聚合层排除出百分位 —— 绝不为没计时到的调用伪造一个延迟。
     */
    settle(exec: ToolExecution, result: ToolExecutionResult): ToolCall;
}
