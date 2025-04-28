import { isFC, type HTMLProperties, type Thunk } from 'types-react'
import React from 'react'
import { cn } from '@sglara/cn'
import type { PortalManagerValues, PortalComponent } from './types'


export const PortalContext = React.createContext<PortalManagerValues | null>(null)

export const PortalManager: React.FC<Pick<HTMLProperties<HTMLDivElement>, 'children' | 'className'>> = ({
	children,
	className
}) => {
	const layer = React.useRef<HTMLDivElement>(null)
	const [portals, setPortals] = React.useState<Array<PortalComponent>>([])

	const open: Thunk<[PortalComponent]> = React.useCallback((portal) => {
		setPortals((prev) => (prev.some((p) => p.id === portal.id) ? prev : [...prev, portal]))
	}, [])

	const close: Thunk<[string, unknown?], unknown> = React.useCallback((id: string, val?: unknown) => {
		setPortals((prev) => prev.filter((p) => p.id !== id))
		return val
	}, [])

	const clear: Thunk = React.useCallback(() => setPortals([]), [])

	const values = React.useMemo(() => ({ portals, open, close, clear, layer }), [portals, open, close, clear, layer])

	return (
		<PortalContext.Provider value={values}>
			{children}
			<div
				id='portal-root'
				ref={layer}
				className={cn('fixed top-0 left-0 z-100 w-screen h-screen pointer-events-none', className)}
			>
				{portals
					.filter(({ component }) => isFC(component))
					.map(({ id, component, props }) => {
						const Component = React.memo(component)
						return <Component key={id} {...(props ?? {})} />
					})}
			</div>
		</PortalContext.Provider>
	)
}

export const usePortalManager: Thunk<[], PortalManagerValues> = () => {
	const context = React.useContext(PortalContext)
	if (!context) throw new Error('usePortalManager must be used within a PortalManager')
	return context
}
