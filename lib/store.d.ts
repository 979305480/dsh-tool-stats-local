import type { ToolCall } from './types.js';
export declare class StatsStore {
    private readonly projectDir;
    private readonly statsDir;
    private readonly callsPath;
    /**
     * 目录已就绪的标志。record() 走的是 tools/result 观察器 —— 那段代码运行在
     * registry 的同步派发循环里（core/tools notifyResult），每次调用都要付它的开销。
     * 实测 Windows 上单次 appendFileSync 约 0.6ms，其中 existsSync 约 0.1ms；
     * 目录一旦建好就不会凭空消失，所以这个 stat 只需付一次。
     */
    private dirReady;
    constructor(projectDir: string);
    private ensureDir;
    append(call: ToolCall): void;
    readAll(): ToolCall[];
    query(from?: number, to?: number): ToolCall[];
    clear(): void;
}
