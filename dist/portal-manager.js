import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { isFC } from 'types-react';
import React from 'react';
import { cn } from '@sglara/cn';
export const PortalContext = React.createContext(null);
export const PortalManager = ({ children, className }) => {
    const layer = React.useRef(null);
    const [portals, setPortals] = React.useState([]);
    const open = React.useCallback((portal) => {
        setPortals((prev) => (prev.some((p) => p.id === portal.id) ? prev : [...prev, portal]));
    }, []);
    const close = React.useCallback((id, val) => {
        setPortals((prev) => prev.filter((p) => p.id !== id));
        return val;
    }, []);
    const clear = React.useCallback(() => setPortals([]), []);
    const values = React.useMemo(() => ({ portals, open, close, clear, layer }), [portals, open, close, clear, layer]);
    return (_jsxs(PortalContext.Provider, { value: values, children: [children, _jsx("div", { id: 'portal-root', ref: layer, className: cn('fixed top-0 left-0 z-100 w-screen h-screen pointer-events-none', className), children: portals
                    .filter(({ component }) => isFC(component))
                    .map(({ id, component, props }) => {
                    const Component = React.memo(component);
                    return _jsx(Component, { ...(props ?? {}) }, id);
                }) })] }));
};
export const usePortalManager = () => {
    const context = React.useContext(PortalContext);
    if (!context)
        throw new Error('usePortalManager must be used within a PortalManager');
    return context;
};
