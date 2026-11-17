import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Shared UI component kit for dsh plugin panels.
 *
 * Self-contained: imports nothing but React. All styling is inline + CSS custom
 * properties so the components follow the host theme. A single <style> tag injects
 * keyframes the first time any component mounts.
 *
 * @module client/ui
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, } from 'react';
// ─── Theme tokens ──────────────────────────────────────────────
/**
 * Host theme tokens.
 *
 * Every name here is a real dsh token, read out of the shipped stylesheets
 * (`@deepseek-ai/dsh-client-ui-theme`), which define them on `body`. An earlier
 * version used invented names — `--accent`, `--border`, `--bg-primary`,
 * `--text-primary` and friends — that dsh does not define at all. The
 * hardcoded fallbacks then applied in every theme, so each panel rendered its
 * own fixed palette instead of following the host, and the modal and input
 * surfaces stayed white in dark mode.
 *
 * No fallbacks on purpose: if a name were ever missing, the declaration becomes
 * invalid at computed-value time and the property inherits, which degrades
 * gracefully, whereas a hardcoded fallback bakes in a color that is wrong in one
 * of the two themes. `tests/ui-tokens.test.mjs` enforces the name list.
 */
const T = {
    accent: 'var(--dsw-alias-brand-primary)',
    accentHover: 'var(--dsw-alias-button-primary-hover)',
    inverted: 'var(--dsw-alias-label-primary-inverted)',
    error: 'var(--dsw-alias-state-error-primary)',
    success: 'var(--dsw-alias-state-success-primary)',
    warning: 'var(--dsw-alias-state-warn-primary)',
    bg: 'var(--dsw-alias-bg-layer-2)',
    bgHover: 'var(--dsw-alias-interactive-bg-hover)',
    border: 'var(--dsw-alias-border-l2)',
    text: 'var(--dsw-alias-label-primary)',
    muted: 'var(--dsw-alias-label-tertiary)',
    surface: 'var(--dsw-alias-bg-layer-1)',
    mask: 'var(--dsw-alias-bg-mask-1)',
};
// ─── Style injection (once) ────────────────────────────────────
let injected = false;
function ensureStyles() {
    if (injected || typeof document === 'undefined')
        return;
    injected = true;
    const el = document.createElement('style');
    el.textContent = `
@keyframes dsh-fade-in{from{opacity:0}to{opacity:1}}
@keyframes dsh-slide-up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes dsh-spin{to{transform:rotate(360deg)}}
.dsh-modal-overlay{animation:dsh-fade-in .15s ease}
.dsh-modal-body{animation:dsh-slide-up .2s ease}
.dsh-toast{animation:dsh-slide-up .2s ease}
.dsh-spin{animation:dsh-spin .6s linear infinite}
  `;
    document.head.appendChild(el);
}
// ─── Modal ─────────────────────────────────────────────────────
export function Modal({ title, onClose, children, footer, width = 520, }) {
    useEffect(() => {
        ensureStyles();
        const handler = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [onClose]);
    return (_jsx("div", { className: "dsh-modal-overlay", style: {
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: T.mask,
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
        }, onClick: onClose, children: _jsxs("div", { className: "dsh-modal-body", style: {
                background: T.surface,
                borderRadius: 14,
                boxShadow: 'var(--dsw-elevation-prominent)',
                width: `min(92vw, ${width}px)`,
                maxHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }, onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 22px',
                        borderBottom: `1px solid ${T.border}`,
                    }, children: [_jsx("h3", { style: { margin: 0, fontSize: 15, fontWeight: 600 }, children: title }), _jsx("button", { type: "button", onClick: onClose, style: {
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: 20,
                                color: T.muted,
                                padding: '0 4px',
                                lineHeight: 1,
                                borderRadius: 4,
                            }, "aria-label": "Close", children: "\u00D7" })] }), _jsx("div", { style: { padding: 22, overflow: 'auto', flex: 1 }, children: children }), footer !== undefined && (_jsx("div", { style: {
                        padding: '14px 22px',
                        borderTop: `1px solid ${T.border}`,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 10,
                        background: T.bg,
                    }, children: footer }))] }) }));
}
// ─── ConfirmDialog ─────────────────────────────────────────────
export function ConfirmDialog({ title, message, confirmLabel, cancelLabel = 'Cancel', onConfirm, onClose, danger, }) {
    return (_jsx(Modal, { title: title, onClose: onClose, width: 420, footer: _jsxs(_Fragment, { children: [_jsx(Button, { variant: "secondary", onClick: onClose, children: cancelLabel }), _jsx(Button, { variant: danger === true ? 'danger' : 'primary', onClick: () => {
                        onConfirm();
                        onClose();
                    }, children: confirmLabel })] }), children: _jsx("p", { style: { margin: 0, fontSize: 14, lineHeight: 1.6 }, children: message }) }));
}
// ─── Button ────────────────────────────────────────────────────
export function Button({ variant = 'secondary', size = 'md', children, style, ...rest }) {
    const base = {
        cursor: 'pointer',
        borderRadius: 7,
        fontWeight: 500,
        transition: 'all 0.15s ease',
        border: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontSize: size === 'sm' ? 12 : 13,
        padding: size === 'sm' ? '5px 12px' : '8px 18px',
        fontFamily: 'inherit',
    };
    const variants = {
        primary: { background: T.accent, color: T.inverted },
        secondary: {
            background: T.bg,
            color: T.text,
            border: `1px solid ${T.border}`,
        },
        danger: {
            background: 'transparent',
            color: T.error,
            border: `1px solid ${T.error}`,
        },
        ghost: { background: 'transparent', color: T.muted, border: 'none' },
    };
    return (_jsx("button", { type: "button", style: { ...base, ...variants[variant], ...style }, ...rest, children: children }));
}
// ─── Card ──────────────────────────────────────────────────────
export function Card({ title, icon, children, actions, style, padding = 14, }) {
    return (_jsxs("div", { style: {
            borderRadius: 10,
            border: `1px solid ${T.border}`,
            background: T.bg,
            overflow: 'hidden',
            ...style,
        }, children: [(title !== undefined || actions !== undefined) && (_jsxs("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderBottom: title !== undefined ? `1px solid ${T.border}` : 'none',
                }, children: [_jsxs("span", { style: { fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }, children: [icon !== undefined && _jsx("span", { children: icon }), title] }), actions] })), _jsx("div", { style: { padding }, children: children })] }));
}
// ─── StatCard ──────────────────────────────────────────────────
export function StatCard({ value, label, color, unit, }) {
    return (_jsxs("div", { style: {
            flex: 1,
            minWidth: 90,
            textAlign: 'center',
            padding: '14px 10px',
            borderRadius: 10,
            border: `1px solid ${T.border}`,
            background: T.bg,
        }, children: [_jsxs("div", { style: { fontSize: 24, fontWeight: 700, color: color ?? T.text, lineHeight: 1.2 }, children: [value, unit !== undefined && (_jsx("span", { style: { fontSize: 13, fontWeight: 500, opacity: 0.7, marginLeft: 2 }, children: unit }))] }), _jsx("div", { style: { fontSize: 11, color: T.muted, marginTop: 4 }, children: label })] }));
}
// ─── Badge ─────────────────────────────────────────────────────
export function Badge({ children, color = 'default', }) {
    const colors = {
        default: { bg: T.bgHover, fg: T.muted },
        success: { bg: 'var(--dsw-alias-state-success-tertiary)', fg: T.success },
        error: { bg: 'var(--dsw-alias-state-error-secondary)', fg: T.error },
        warning: { bg: 'var(--dsw-alias-state-warn-tertiary)', fg: T.warning },
        info: { bg: 'var(--dsw-alias-state-business-tertiary)', fg: T.accent },
    };
    const c = colors[color];
    return (_jsx("span", { style: {
            display: 'inline-block',
            padding: '2px 9px',
            borderRadius: 10,
            fontSize: 11,
            fontWeight: 600,
            background: c.bg,
            color: c.fg,
        }, children: children }));
}
// ─── Input ─────────────────────────────────────────────────────
export function Input({ style, ...rest }) {
    return (_jsx("input", { ...rest, style: {
            fontSize: 13,
            padding: '8px 12px',
            borderRadius: 7,
            border: `1px solid ${T.border}`,
            background: T.surface,
            color: T.text,
            width: '100%',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            outline: 'none',
            transition: 'border-color 0.15s',
            ...style,
        } }));
}
// ─── Select ────────────────────────────────────────────────────
export function Select({ style, children, ...rest }) {
    return (_jsx("select", { ...rest, style: {
            fontSize: 13,
            padding: '8px 12px',
            borderRadius: 7,
            border: `1px solid ${T.border}`,
            background: T.surface,
            color: T.text,
            cursor: 'pointer',
            fontFamily: 'inherit',
            outline: 'none',
            ...style,
        }, children: children }));
}
// ─── Textarea ──────────────────────────────────────────────────
export function Textarea({ style, ...rest }) {
    return (_jsx("textarea", { ...rest, style: {
            fontSize: 13,
            padding: '8px 12px',
            borderRadius: 7,
            border: `1px solid ${T.border}`,
            background: T.surface,
            color: T.text,
            width: '100%',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            outline: 'none',
            resize: 'vertical',
            lineHeight: 1.5,
            ...style,
        } }));
}
const ToastContext = createContext(() => { });
export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const show = useCallback((type, message) => {
        const id = Date.now() + Math.random();
        setToasts((t) => [...t, { id, type, message }]);
        setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
    }, []);
    return (_jsxs(ToastContext.Provider, { value: show, children: [children, toasts.length > 0 && (_jsx("div", { style: {
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 2000,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                }, children: toasts.map((t) => (_jsx("div", { className: "dsh-toast", style: {
                        padding: '12px 18px',
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 500,
                        boxShadow: 'var(--dsw-elevation-panel)',
                        color: T.inverted,
                        background: t.type === 'success'
                            ? T.success
                            : t.type === 'error'
                                ? T.error
                                : T.accent,
                        maxWidth: 360,
                    }, children: t.message }, t.id))) }))] }));
}
export function useToast() {
    return useContext(ToastContext);
}
// ─── Spinner ───────────────────────────────────────────────────
export function Spinner({ size = 16 }) {
    ensureStyles();
    return (_jsx("span", { className: "dsh-spin", style: {
            display: 'inline-block',
            width: size,
            height: size,
            border: `2px solid ${T.border}`,
            borderTopColor: T.accent,
            borderRadius: '50%',
        } }));
}
// ─── EmptyState ────────────────────────────────────────────────
export function EmptyState({ icon, message, }) {
    return (_jsxs("div", { style: {
            textAlign: 'center',
            padding: '36px 16px',
            color: T.muted,
        }, children: [icon !== undefined && (_jsx("div", { style: { fontSize: 36, marginBottom: 10, opacity: 0.4 }, children: icon })), _jsx("div", { style: { fontSize: 13 }, children: message })] }));
}
// ─── SectionTitle ──────────────────────────────────────────────
export function SectionTitle({ icon, children, actions, }) {
    return (_jsxs("div", { style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 6,
            marginBottom: 8,
        }, children: [_jsxs("span", { style: {
                    fontSize: 14,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                }, children: [icon !== undefined && _jsx("span", { children: icon }), children] }), actions] }));
}
// ─── Table helpers ─────────────────────────────────────────────
export const tableStyles = {
    table: {
        borderCollapse: 'collapse',
        width: '100%',
    },
    th: {
        textAlign: 'left',
        padding: '8px 12px 8px 0',
        fontWeight: 600,
        fontSize: 12,
        color: T.muted,
        borderBottom: `1px solid ${T.border}`,
    },
    td: {
        padding: '8px 12px 8px 0',
        fontSize: 13,
        borderBottom: `1px solid ${T.border}`,
    },
    clickRow: { cursor: 'pointer' },
};
// ─── CodeBlock ─────────────────────────────────────────────────
export function CodeBlock({ children, maxHeight = 200, style, }) {
    return (_jsx("pre", { style: {
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontSize: 12,
            maxHeight,
            overflow: 'auto',
            padding: 10,
            borderRadius: 7,
            background: T.bg,
            border: `1px solid ${T.border}`,
            margin: 0,
            ...style,
        }, children: children }));
}
// ─── ProgressBar ───────────────────────────────────────────────
export function ProgressBar({ pct, color, height = 18, }) {
    return (_jsx("div", { style: {
            width: '100%',
            height,
            background: T.bgHover,
            borderRadius: 5,
            overflow: 'hidden',
            position: 'relative',
        }, children: _jsx("div", { style: {
                width: `${Math.min(pct, 100)}%`,
                height: '100%',
                background: color ?? T.accent,
                borderRadius: 5,
                transition: 'width 0.3s ease',
            } }) }));
}
// ─── Field label ───────────────────────────────────────────────
export function Field({ label, children, hint, }) {
    return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 4 }, children: [_jsx("label", { style: { fontSize: 12, fontWeight: 600, color: T.text }, children: label }), children, hint !== undefined && (_jsx("span", { style: { fontSize: 11, color: T.muted }, children: hint }))] }));
}
// ─── usePanel hook (shared fetch logic) ────────────────────────
export function usePanel(path) {
    const [payload, setPayload] = useState(null);
    const [error, setError] = useState(null);
    const [tick, setTick] = useState(0);
    const reload = useCallback(() => setTick((v) => v + 1), []);
    useEffect(() => {
        const c = new AbortController();
        setError(null);
        fetch(path, { signal: c.signal })
            .then(async (r) => {
            if (!r.ok)
                throw new Error(String(r.status));
            return r.json();
        })
            .then((p) => {
            if (!c.signal.aborted)
                setPayload(p);
        })
            .catch((e) => {
            if (!c.signal.aborted)
                setPayload(null), setError(e instanceof Error ? e.message : String(e));
        });
        return () => c.abort();
    }, [tick, path]);
    return useMemo(() => ({ payload, error, reload }), [payload, error, reload]);
}
