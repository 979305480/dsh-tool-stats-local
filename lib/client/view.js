import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Pure rendering half of the toolStats page. Uses shared UI kit.
 * @module client/view
 */
import { useCallback, useState } from 'react';
import { Badge, Button, Card, ConfirmDialog, EmptyState, Modal, SectionTitle, Spinner, StatCard, ToastProvider, tableStyles, usePanel, useToast, } from './ui.js';
const PANEL_PATH = '/api/stats.panel';
const DETAIL_PATH = '/api/stats.detail';
const EXPORT_PATH = '/api/stats.export';
const CLEAR_PATH = '/api/stats.clear';
function ToolModal({ tool, t, onClose }) {
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    useCallback(() => {
        setLoading(true);
        fetch(`${DETAIL_PATH}?tool=${encodeURIComponent(tool)}`)
            .then(async (r) => { if (r.ok)
            setDetail(await r.json()); })
            .finally(() => setLoading(false));
    }, [tool])();
    return (_jsx(Modal, { title: `${t('tool')}: ${tool}`, onClose: onClose, width: 600, children: loading ? _jsx("div", { style: { display: 'flex', justifyContent: 'center', padding: 20 }, children: _jsx(Spinner, { size: 24 }) })
            : detail === null ? _jsx(EmptyState, { message: t('notFound') })
                : (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 12 }, children: [detail.errorBreakdown.length > 0 && (_jsx(Card, { title: t('errorBreakdown'), children: detail.errorBreakdown.map((e, i) => (_jsxs("div", { style: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }, children: [_jsxs(Badge, { color: "error", children: ["\u00D7", e.count] }), _jsx("span", { style: { fontSize: 12 }, children: e.message })] }, i))) })), _jsx(Card, { title: t('recentCalls'), children: _jsx("table", { style: tableStyles.table, children: _jsx("tbody", { children: detail.recentCalls.slice(0, 15).map((c, i) => (_jsxs("tr", { children: [_jsx("td", { style: tableStyles.td, children: c.success ? _jsx(Badge, { color: "success", children: "\u2713" }) : _jsx(Badge, { color: "error", children: "\u2717" }) }), _jsxs("td", { style: tableStyles.td, children: [c.latencyMs, "ms"] }), _jsx("td", { style: tableStyles.td, children: new Date(c.timestamp).toLocaleTimeString() }), _jsx("td", { style: { ...tableStyles.td, fontSize: 10, opacity: 0.6 }, children: c.errorMessage?.slice(0, 60) })] }, i))) }) }) })] })) }));
}
function ToolStatsPanelInner({ t }) {
    const { payload, error, reload } = usePanel(PANEL_PATH);
    const toast = useToast();
    const [toolModal, setToolModal] = useState(null);
    const [confirmClear, setConfirmClear] = useState(false);
    const handleClear = useCallback(async () => {
        const r = await fetch(CLEAR_PATH, { method: 'POST' });
        if (r.ok) {
            toast('success', t('cleared'));
            reload();
        }
    }, [t, toast, reload]);
    const header = (_jsxs("header", { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }, children: [_jsxs("strong", { style: { fontSize: 15 }, children: ["\uD83D\uDD27 ", t('title')] }), _jsx("span", { style: { flex: 1 } }), _jsx("a", { href: EXPORT_PATH, download: true, children: _jsx(Button, { variant: "secondary", size: "sm", children: t('export') }) }), _jsx(Button, { variant: "danger", size: "sm", onClick: () => setConfirmClear(true), children: t('clear') }), _jsx(Button, { variant: "secondary", size: "sm", onClick: reload, children: t('refresh') })] }));
    if (error !== null)
        return _jsxs("div", { style: { maxWidth: 820 }, children: [header, _jsx(Card, { children: _jsxs("p", { role: "alert", style: { margin: 0, fontSize: 13, color: 'var(--dsw-alias-state-error-primary)' }, children: [t('failed'), ": ", error] }) })] });
    if (payload === null)
        return _jsxs("div", { style: { maxWidth: 820 }, children: [header, _jsx("div", { style: { display: 'flex', justifyContent: 'center', padding: 40 }, children: _jsx(Spinner, { size: 28 }) })] });
    const o = payload.overview;
    return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 820 }, children: [header, payload.alerts.length > 0 && (_jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 6 }, children: payload.alerts.map((a, i) => (_jsx(Card, { style: { borderColor: a.level === 'error' ? 'var(--dsw-alias-state-error-primary)' : 'var(--dsw-alias-state-warn-primary)' }, children: _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [_jsx(Badge, { color: a.level === 'error' ? 'error' : 'warning', children: a.level === 'error' ? '🔴' : '🟡' }), _jsx("strong", { children: a.tool }), _jsx("span", { style: { fontSize: 12 }, children: a.message })] }) }, i))) })), _jsxs("div", { style: { display: 'flex', gap: 10, flexWrap: 'wrap' }, children: [_jsx(StatCard, { value: o.totalCalls, label: t('totalCalls') }), _jsx(StatCard, { value: o.totalFailures, label: t('totalFailures'), color: o.totalFailures > 0 ? 'var(--dsw-alias-state-error-primary)' : undefined }), _jsx(StatCard, { value: `${Math.round(o.overallFailureRate * 100)}%`, label: t('failRate') }), _jsx(StatCard, { value: o.activeSessions, label: t('sessions') }), _jsx(StatCard, { value: o.avgLatencyMs, unit: "ms", label: t('avgLatency') })] }), payload.tools.length === 0 ? _jsx(EmptyState, { icon: "\uD83D\uDCED", message: t('empty') }) : (_jsxs(_Fragment, { children: [_jsx(SectionTitle, { icon: "\uD83D\uDCCA", children: t('tools') }), _jsx(Card, { padding: 0, children: _jsxs("table", { style: tableStyles.table, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { style: tableStyles.th, children: t('tool') }), _jsx("th", { style: tableStyles.th, children: t('calls') }), _jsx("th", { style: tableStyles.th, children: t('failRate') }), _jsx("th", { style: tableStyles.th, children: "p50" }), _jsx("th", { style: tableStyles.th, children: "p95" })] }) }), _jsx("tbody", { children: payload.tools.map((row) => (_jsxs("tr", { style: tableStyles.clickRow, onClick: () => setToolModal(row.tool), children: [_jsx("td", { style: tableStyles.td, children: _jsx("code", { style: { fontSize: 11 }, children: row.tool }) }), _jsx("td", { style: tableStyles.td, children: row.invocations }), _jsxs("td", { style: { ...tableStyles.td, color: row.failureRate > 0.3 ? 'var(--dsw-alias-state-error-primary)' : undefined }, children: [Math.round(row.failureRate * 100), "%"] }), _jsxs("td", { style: tableStyles.td, children: [row.p50Latency, "ms"] }), _jsxs("td", { style: tableStyles.td, children: [row.p95Latency, "ms"] })] }, row.tool))) })] }) })] })), payload.deadTools.length > 0 && (_jsxs(_Fragment, { children: [_jsx(SectionTitle, { icon: "\uD83D\uDC80", children: t('deadTools') }), _jsx(Card, { children: payload.deadTools.map((row) => (_jsxs("div", { style: { marginBottom: 4 }, children: [_jsx("code", { style: { fontSize: 11 }, children: row.tool }), " \u2014 ", row.sessionsSinceLastUse, " ", t('sessionsUnused')] }, row.tool))) })] })), payload.failingTools.length > 0 && (_jsxs(_Fragment, { children: [_jsx(SectionTitle, { icon: "\u26A0\uFE0F", children: t('failingTools') }), _jsx(Card, { children: payload.failingTools.map((row) => (_jsxs("div", { style: { marginBottom: 4 }, children: [_jsx("code", { style: { fontSize: 11 }, children: row.tool }), " \u00B7 ", Math.round(row.failureRate * 100), "%", row.lastError ? ` — ${row.lastError.slice(0, 60)}` : ''] }, row.tool))) })] })), payload.recommendations.length > 0 && (_jsxs(_Fragment, { children: [_jsx(SectionTitle, { icon: "\uD83D\uDCA1", children: t('recommendations') }), _jsx(Card, { children: payload.recommendations.map((row, i) => _jsx("div", { style: { marginBottom: 4 }, children: row.message }, i)) })] })), toolModal !== null && _jsx(ToolModal, { tool: toolModal, t: t, onClose: () => setToolModal(null) }), confirmClear && _jsx(ConfirmDialog, { title: t('clear'), message: t('confirmClear'), confirmLabel: t('clear'), danger: true, onConfirm: handleClear, onClose: () => setConfirmClear(false) })] }));
}
export function ToolStatsPanel({ t }) {
    return _jsx(ToastProvider, { children: _jsx(ToolStatsPanelInner, { t: t }) });
}
