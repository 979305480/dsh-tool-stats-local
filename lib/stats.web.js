window.__ModuleLoader__.load({ id: "dsh-tool-stats", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);

// src/client/locales.ts
var NS = "toolStats";
var zh = {
  "nav": "\u5DE5\u5177\u7EDF\u8BA1",
  "title": "\u5DE5\u5177\u7EDF\u8BA1",
  "tool": "\u5DE5\u5177",
  "calls": "\u8C03\u7528\u6B21\u6570",
  "failRate": "\u5931\u8D25\u7387",
  "deadTools": "\u4ECE\u672A\u8C03\u7528\u7684\u5DE5\u5177",
  "failingTools": "\u9AD8\u5931\u8D25\u7387\u5DE5\u5177",
  "recommendations": "\u5EFA\u8BAE",
  "empty": "\u8FD8\u6CA1\u6709\u8BB0\u5F55\u5230\u5DE5\u5177\u8C03\u7528\u3002",
  "refresh": "\u5237\u65B0",
  "loading": "\u6B63\u5728\u52A0\u8F7D\u2026",
  "failed": "\u52A0\u8F7D\u5931\u8D25",
  "retry": "\u91CD\u8BD5",
  "totalCalls": "\u603B\u8C03\u7528",
  "totalFailures": "\u603B\u5931\u8D25",
  "sessions": "\u4F1A\u8BDD\u6570",
  "avgLatency": "\u5E73\u5747\u5EF6\u8FDF",
  "export": "\u5BFC\u51FA CSV",
  "clear": "\u6E05\u7A7A",
  "confirmClear": "\u786E\u5B9A\u6E05\u7A7A\u6240\u6709\u8BB0\u5F55\uFF1F",
  "errorBreakdown": "\u9519\u8BEF\u5206\u7C7B",
  "recentCalls": "\u6700\u8FD1\u8C03\u7528",
  "sessionsUnused": "\u4F1A\u8BDD\u672A\u7528",
  "notFound": "\u672A\u627E\u5230",
  "cleared": "\u7EDF\u8BA1\u5DF2\u6E05\u7A7A",
  "tools": "\u5DE5\u5177"
};
var en = {
  "nav": "Tool Stats",
  "title": "Tool Stats",
  "tool": "Tool",
  "calls": "Calls",
  "failRate": "Failure",
  "deadTools": "Dead tools",
  "failingTools": "Failing tools",
  "recommendations": "Recommendations",
  "empty": "No tool calls recorded yet.",
  "refresh": "Refresh",
  "loading": "Loading\u2026",
  "failed": "Failed to load",
  "retry": "Retry",
  "totalCalls": "Total Calls",
  "totalFailures": "Total Failures",
  "sessions": "Sessions",
  "avgLatency": "Avg Latency",
  "export": "Export CSV",
  "clear": "Clear",
  "confirmClear": "Clear all recorded data?",
  "errorBreakdown": "Error Breakdown",
  "recentCalls": "Recent Calls",
  "sessionsUnused": "sessions unused",
  "notFound": "Not found",
  "cleared": "Statistics cleared",
  "tools": "Tool"
};

// src/client/view.tsx
var import_react2 = require("react");

// src/client/ui.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var T = {
  accent: "var(--dsw-alias-brand-primary)",
  accentHover: "var(--dsw-alias-button-primary-hover)",
  inverted: "var(--dsw-alias-label-primary-inverted)",
  error: "var(--dsw-alias-state-error-primary)",
  success: "var(--dsw-alias-state-success-primary)",
  warning: "var(--dsw-alias-state-warn-primary)",
  bg: "var(--dsw-alias-bg-layer-2)",
  bgHover: "var(--dsw-alias-interactive-bg-hover)",
  border: "var(--dsw-alias-border-l2)",
  text: "var(--dsw-alias-label-primary)",
  muted: "var(--dsw-alias-label-tertiary)",
  surface: "var(--dsw-alias-bg-layer-1)",
  mask: "var(--dsw-alias-bg-mask-1)"
};
var injected = false;
function ensureStyles() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const el = document.createElement("style");
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
function Modal({
  title,
  onClose,
  children,
  footer,
  width = 520
}) {
  (0, import_react.useEffect)(() => {
    ensureStyles();
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: "dsh-modal-overlay",
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 1e3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: T.mask,
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)"
      },
      onClick: onClose,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          className: "dsh-modal-body",
          style: {
            background: T.surface,
            borderRadius: 14,
            boxShadow: "var(--dsw-elevation-prominent)",
            width: `min(92vw, ${width}px)`,
            maxHeight: "85vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          },
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 22px",
                  borderBottom: `1px solid ${T.border}`
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { style: { margin: 0, fontSize: 15, fontWeight: 600 }, children: title }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      style: {
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 20,
                        color: T.muted,
                        padding: "0 4px",
                        lineHeight: 1,
                        borderRadius: 4
                      },
                      "aria-label": "Close",
                      children: "\xD7"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding: 22, overflow: "auto", flex: 1 }, children }),
            footer !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "div",
              {
                style: {
                  padding: "14px 22px",
                  borderTop: `1px solid ${T.border}`,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 10,
                  background: T.bg
                },
                children: footer
              }
            )
          ]
        }
      )
    }
  );
}
function ConfirmDialog({
  title,
  message,
  confirmLabel,
  cancelLabel = "Cancel",
  onConfirm,
  onClose,
  danger
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Modal,
    {
      title,
      onClose,
      width: 420,
      footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { variant: "secondary", onClick: onClose, children: cancelLabel }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          Button,
          {
            variant: danger === true ? "danger" : "primary",
            onClick: () => {
              onConfirm();
              onClose();
            },
            children: confirmLabel
          }
        )
      ] }),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { margin: 0, fontSize: 14, lineHeight: 1.6 }, children: message })
    }
  );
}
function Button({
  variant = "secondary",
  size = "md",
  children,
  style,
  ...rest
}) {
  const base = {
    cursor: "pointer",
    borderRadius: 7,
    fontWeight: 500,
    transition: "all 0.15s ease",
    border: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: size === "sm" ? 12 : 13,
    padding: size === "sm" ? "5px 12px" : "8px 18px",
    fontFamily: "inherit"
  };
  const variants = {
    primary: { background: T.accent, color: T.inverted },
    secondary: {
      background: T.bg,
      color: T.text,
      border: `1px solid ${T.border}`
    },
    danger: {
      background: "transparent",
      color: T.error,
      border: `1px solid ${T.error}`
    },
    ghost: { background: "transparent", color: T.muted, border: "none" }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", style: { ...base, ...variants[variant], ...style }, ...rest, children });
}
function Card({
  title,
  icon,
  children,
  actions,
  style,
  padding = 14
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      style: {
        borderRadius: 10,
        border: `1px solid ${T.border}`,
        background: T.bg,
        overflow: "hidden",
        ...style
      },
      children: [
        (title !== void 0 || actions !== void 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderBottom: title !== void 0 ? `1px solid ${T.border}` : "none"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }, children: [
                icon !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: icon }),
                title
              ] }),
              actions
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding }, children })
      ]
    }
  );
}
function StatCard({
  value,
  label,
  color,
  unit
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      style: {
        flex: 1,
        minWidth: 90,
        textAlign: "center",
        padding: "14px 10px",
        borderRadius: 10,
        border: `1px solid ${T.border}`,
        background: T.bg
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { fontSize: 24, fontWeight: 700, color: color ?? T.text, lineHeight: 1.2 }, children: [
          value,
          unit !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: 13, fontWeight: 500, opacity: 0.7, marginLeft: 2 }, children: unit })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 11, color: T.muted, marginTop: 4 }, children: label })
      ]
    }
  );
}
function Badge({
  children,
  color = "default"
}) {
  const colors = {
    default: { bg: T.bgHover, fg: T.muted },
    success: { bg: "var(--dsw-alias-state-success-tertiary)", fg: T.success },
    error: { bg: "var(--dsw-alias-state-error-secondary)", fg: T.error },
    warning: { bg: "var(--dsw-alias-state-warn-tertiary)", fg: T.warning },
    info: { bg: "var(--dsw-alias-state-business-tertiary)", fg: T.accent }
  };
  const c = colors[color];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "span",
    {
      style: {
        display: "inline-block",
        padding: "2px 9px",
        borderRadius: 10,
        fontSize: 11,
        fontWeight: 600,
        background: c.bg,
        color: c.fg
      },
      children
    }
  );
}
var ToastContext = (0, import_react.createContext)(
  () => {
  }
);
function ToastProvider({ children }) {
  const [toasts, setToasts] = (0, import_react.useState)([]);
  const show = (0, import_react.useCallback)((type, message) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToastContext.Provider, { value: show, children: [
    children,
    toasts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 2e3,
          display: "flex",
          flexDirection: "column",
          gap: 8
        },
        children: toasts.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: "dsh-toast",
            style: {
              padding: "12px 18px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              boxShadow: "var(--dsw-elevation-panel)",
              color: T.inverted,
              background: t.type === "success" ? T.success : t.type === "error" ? T.error : T.accent,
              maxWidth: 360
            },
            children: t.message
          },
          t.id
        ))
      }
    )
  ] });
}
function useToast() {
  return (0, import_react.useContext)(ToastContext);
}
function Spinner({ size = 16 }) {
  ensureStyles();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "span",
    {
      className: "dsh-spin",
      style: {
        display: "inline-block",
        width: size,
        height: size,
        border: `2px solid ${T.border}`,
        borderTopColor: T.accent,
        borderRadius: "50%"
      }
    }
  );
}
function EmptyState({
  icon,
  message
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      style: {
        textAlign: "center",
        padding: "36px 16px",
        color: T.muted
      },
      children: [
        icon !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 36, marginBottom: 10, opacity: 0.4 }, children: icon }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 13 }, children: message })
      ]
    }
  );
}
function SectionTitle({
  icon,
  children,
  actions
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 6,
        marginBottom: 8
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "span",
          {
            style: {
              fontSize: 14,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 6
            },
            children: [
              icon !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: icon }),
              children
            ]
          }
        ),
        actions
      ]
    }
  );
}
var tableStyles = {
  table: {
    borderCollapse: "collapse",
    width: "100%"
  },
  th: {
    textAlign: "left",
    padding: "8px 12px 8px 0",
    fontWeight: 600,
    fontSize: 12,
    color: T.muted,
    borderBottom: `1px solid ${T.border}`
  },
  td: {
    padding: "8px 12px 8px 0",
    fontSize: 13,
    borderBottom: `1px solid ${T.border}`
  },
  clickRow: { cursor: "pointer" }
};
function usePanel(path) {
  const [payload, setPayload] = (0, import_react.useState)(null);
  const [error, setError] = (0, import_react.useState)(null);
  const [tick, setTick] = (0, import_react.useState)(0);
  const reload = (0, import_react.useCallback)(() => setTick((v) => v + 1), []);
  (0, import_react.useEffect)(() => {
    const c = new AbortController();
    setError(null);
    fetch(path, { signal: c.signal }).then(async (r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    }).then((p) => {
      if (!c.signal.aborted) setPayload(p);
    }).catch((e) => {
      if (!c.signal.aborted) setPayload(null), setError(e instanceof Error ? e.message : String(e));
    });
    return () => c.abort();
  }, [tick, path]);
  return (0, import_react.useMemo)(() => ({ payload, error, reload }), [payload, error, reload]);
}

// src/client/view.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var PANEL_PATH = "/api/stats.panel";
var DETAIL_PATH = "/api/stats.detail";
var EXPORT_PATH = "/api/stats.export";
var CLEAR_PATH = "/api/stats.clear";
function ToolModal({ tool, t, onClose }) {
  const [detail, setDetail] = (0, import_react2.useState)(null);
  const [loading, setLoading] = (0, import_react2.useState)(true);
  (0, import_react2.useCallback)(() => {
    setLoading(true);
    fetch(`${DETAIL_PATH}?tool=${encodeURIComponent(tool)}`).then(async (r) => {
      if (r.ok) setDetail(await r.json());
    }).finally(() => setLoading(false));
  }, [tool])();
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Modal, { title: `${t("tool")}: ${tool}`, onClose, width: 600, children: loading ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "flex", justifyContent: "center", padding: 20 }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Spinner, { size: 24 }) }) : detail === null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(EmptyState, { message: t("notFound") }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
    detail.errorBreakdown.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { title: t("errorBreakdown"), children: detail.errorBreakdown.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Badge, { color: "error", children: [
        "\xD7",
        e.count
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { fontSize: 12 }, children: e.message })
    ] }, i)) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { title: t("recentCalls"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("table", { style: tableStyles.table, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tbody", { children: detail.recentCalls.slice(0, 15).map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("tr", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { style: tableStyles.td, children: c.success ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Badge, { color: "success", children: "\u2713" }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Badge, { color: "error", children: "\u2717" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("td", { style: tableStyles.td, children: [
        c.latencyMs,
        "ms"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { style: tableStyles.td, children: new Date(c.timestamp).toLocaleTimeString() }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { style: { ...tableStyles.td, fontSize: 10, opacity: 0.6 }, children: c.errorMessage?.slice(0, 60) })
    ] }, i)) }) }) })
  ] }) });
}
function ToolStatsPanelInner({ t }) {
  const { payload, error, reload } = usePanel(PANEL_PATH);
  const toast = useToast();
  const [toolModal, setToolModal] = (0, import_react2.useState)(null);
  const [confirmClear, setConfirmClear] = (0, import_react2.useState)(false);
  const handleClear = (0, import_react2.useCallback)(async () => {
    const r = await fetch(CLEAR_PATH, { method: "POST" });
    if (r.ok) {
      toast("success", t("cleared"));
      reload();
    }
  }, [t, toast, reload]);
  const header = /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("header", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("strong", { style: { fontSize: 15 }, children: [
      "\u{1F527} ",
      t("title")
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { flex: 1 } }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("a", { href: EXPORT_PATH, download: true, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Button, { variant: "secondary", size: "sm", children: t("export") }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Button, { variant: "danger", size: "sm", onClick: () => setConfirmClear(true), children: t("clear") }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Button, { variant: "secondary", size: "sm", onClick: reload, children: t("refresh") })
  ] });
  if (error !== null) return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { maxWidth: 820 }, children: [
    header,
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { role: "alert", style: { margin: 0, fontSize: 13, color: "var(--dsw-alias-state-error-primary)" }, children: [
      t("failed"),
      ": ",
      error
    ] }) })
  ] });
  if (payload === null) return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { maxWidth: 820 }, children: [
    header,
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "flex", justifyContent: "center", padding: 40 }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Spinner, { size: 28 }) })
  ] });
  const o = payload.overview;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 14, maxWidth: 820 }, children: [
    header,
    payload.alerts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: payload.alerts.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { style: { borderColor: a.level === "error" ? "var(--dsw-alias-state-error-primary)" : "var(--dsw-alias-state-warn-primary)" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Badge, { color: a.level === "error" ? "error" : "warning", children: a.level === "error" ? "\u{1F534}" : "\u{1F7E1}" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: a.tool }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { fontSize: 12 }, children: a.message })
    ] }) }, i)) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StatCard, { value: o.totalCalls, label: t("totalCalls") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StatCard, { value: o.totalFailures, label: t("totalFailures"), color: o.totalFailures > 0 ? "var(--dsw-alias-state-error-primary)" : void 0 }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StatCard, { value: `${Math.round(o.overallFailureRate * 100)}%`, label: t("failRate") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StatCard, { value: o.activeSessions, label: t("sessions") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StatCard, { value: o.avgLatencyMs, unit: "ms", label: t("avgLatency") })
    ] }),
    payload.tools.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(EmptyState, { icon: "\u{1F4ED}", message: t("empty") }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { icon: "\u{1F4CA}", children: t("tools") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { padding: 0, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("table", { style: tableStyles.table, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: tableStyles.th, children: t("tool") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: tableStyles.th, children: t("calls") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: tableStyles.th, children: t("failRate") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: tableStyles.th, children: "p50" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: tableStyles.th, children: "p95" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tbody", { children: payload.tools.map((row) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("tr", { style: tableStyles.clickRow, onClick: () => setToolModal(row.tool), children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { style: tableStyles.td, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { style: { fontSize: 11 }, children: row.tool }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { style: tableStyles.td, children: row.invocations }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("td", { style: { ...tableStyles.td, color: row.failureRate > 0.3 ? "var(--dsw-alias-state-error-primary)" : void 0 }, children: [
            Math.round(row.failureRate * 100),
            "%"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("td", { style: tableStyles.td, children: [
            row.p50Latency,
            "ms"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("td", { style: tableStyles.td, children: [
            row.p95Latency,
            "ms"
          ] })
        ] }, row.tool)) })
      ] }) })
    ] }),
    payload.deadTools.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { icon: "\u{1F480}", children: t("deadTools") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { children: payload.deadTools.map((row) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { marginBottom: 4 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { style: { fontSize: 11 }, children: row.tool }),
        " \u2014 ",
        row.sessionsSinceLastUse,
        " ",
        t("sessionsUnused")
      ] }, row.tool)) })
    ] }),
    payload.failingTools.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { icon: "\u26A0\uFE0F", children: t("failingTools") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { children: payload.failingTools.map((row) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { marginBottom: 4 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("code", { style: { fontSize: 11 }, children: row.tool }),
        " \xB7 ",
        Math.round(row.failureRate * 100),
        "%",
        row.lastError ? ` \u2014 ${row.lastError.slice(0, 60)}` : ""
      ] }, row.tool)) })
    ] }),
    payload.recommendations.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SectionTitle, { icon: "\u{1F4A1}", children: t("recommendations") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { children: payload.recommendations.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { marginBottom: 4 }, children: row.message }, i)) })
    ] }),
    toolModal !== null && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ToolModal, { tool: toolModal, t, onClose: () => setToolModal(null) }),
    confirmClear && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ConfirmDialog, { title: t("clear"), message: t("confirmClear"), confirmLabel: t("clear"), danger: true, onConfirm: handleClear, onClose: () => setConfirmClear(false) })
  ] });
}
function ToolStatsPanel({ t }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ToastProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ToolStatsPanelInner, { t }) });
}

// src/client/index.tsx
var inject = ["slots", "locale"];
function apply(ctx) {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "dsh-tool-stats: dictionaries");
  ctx.slots.inject("settings.section", () => ctx.slots.register(
    {
      name: "settings.section",
      id: "tool-stats",
      order: 42,
      label: () => ctx.locale.bind(NS)("nav"),
      locale: NS
    },
    ToolStatsPanel
  ));
}
return module.exports; } });
//# sourceMappingURL=stats.web.js.map
