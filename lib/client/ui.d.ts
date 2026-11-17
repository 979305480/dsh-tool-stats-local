/**
 * Shared UI component kit for dsh plugin panels.
 *
 * Self-contained: imports nothing but React. All styling is inline + CSS custom
 * properties so the components follow the host theme. A single <style> tag injects
 * keyframes the first time any component mounts.
 *
 * @module client/ui
 */
import type { ButtonHTMLAttributes, CSSProperties, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';
export declare function Modal({ title, onClose, children, footer, width, }: {
    title: string;
    onClose: () => void;
    children: ReactNode;
    footer?: ReactNode;
    width?: number;
}): ReactNode;
export declare function ConfirmDialog({ title, message, confirmLabel, cancelLabel, onConfirm, onClose, danger, }: {
    title: string;
    message: string;
    confirmLabel: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onClose: () => void;
    danger?: boolean;
}): ReactNode;
export declare function Button({ variant, size, children, style, ...rest }: {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md';
    children: ReactNode;
    style?: CSSProperties;
} & ButtonHTMLAttributes<HTMLButtonElement>): ReactNode;
export declare function Card({ title, icon, children, actions, style, padding, }: {
    title?: string;
    icon?: string;
    children: ReactNode;
    actions?: ReactNode;
    style?: CSSProperties;
    padding?: number;
}): ReactNode;
export declare function StatCard({ value, label, color, unit, }: {
    value: string | number;
    label: string;
    color?: string;
    unit?: string;
}): ReactNode;
export declare function Badge({ children, color, }: {
    children: ReactNode;
    color?: 'default' | 'success' | 'error' | 'warning' | 'info';
}): ReactNode;
export declare function Input({ style, ...rest }: {
    style?: CSSProperties;
} & InputHTMLAttributes<HTMLInputElement>): ReactNode;
export declare function Select({ style, children, ...rest }: {
    style?: CSSProperties;
    children: ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>): ReactNode;
export declare function Textarea({ style, ...rest }: {
    style?: CSSProperties;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>): ReactNode;
interface ToastItem {
    id: number;
    type: 'success' | 'error' | 'info';
    message: string;
}
export declare function ToastProvider({ children }: {
    children: ReactNode;
}): ReactNode;
export declare function useToast(): (type: ToastItem['type'], message: string) => void;
export declare function Spinner({ size }: {
    size?: number;
}): ReactNode;
export declare function EmptyState({ icon, message, }: {
    icon?: string;
    message: string;
}): ReactNode;
export declare function SectionTitle({ icon, children, actions, }: {
    icon?: string;
    children: ReactNode;
    actions?: ReactNode;
}): ReactNode;
export declare const tableStyles: {
    table: {
        borderCollapse: "collapse";
        width: "100%";
    };
    th: {
        textAlign: "left";
        padding: string;
        fontWeight: 600;
        fontSize: 12;
        color: string;
        borderBottom: string;
    };
    td: {
        padding: string;
        fontSize: 13;
        borderBottom: string;
    };
    clickRow: {
        cursor: "pointer";
    };
};
export declare function CodeBlock({ children, maxHeight, style, }: {
    children: string;
    maxHeight?: number;
    style?: CSSProperties;
}): ReactNode;
export declare function ProgressBar({ pct, color, height, }: {
    pct: number;
    color?: string;
    height?: number;
}): ReactNode;
export declare function Field({ label, children, hint, }: {
    label: string;
    children: ReactNode;
    hint?: string;
}): ReactNode;
export declare function usePanel<P>(path: string): {
    payload: P | null;
    error: string | null;
    reload: () => void;
};
export {};
