/**
 * Pure rendering half of the toolStats page. Uses shared UI kit.
 * @module client/view
 */
import type { TranslateNS } from '@deepseek-ai/dsh-client-ui-slots';
import type { ReactNode } from 'react';
/**
 * The translate seat the host injects for this plugin's namespace, taken from the
 * official type so the panel and its registration agree on one key domain.
 */
export type Translate = TranslateNS<'toolStats'>;
export interface PanelProps {
    t: Translate;
}
export declare function ToolStatsPanel({ t }: PanelProps): ReactNode;
