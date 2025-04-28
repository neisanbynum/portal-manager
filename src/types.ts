import type { Thunk } from '@neisanworks/types-react'

export type PortalComponent<TComponent extends React.FC<any>> = {
	id: string
	component: TComponent
	props?: React.ComponentProps<TComponent>
}

export type PortalManagerValues = {
	portals: Array<PortalComponent<React.FC>>
	open: Thunk<[PortalComponent<React.FC>]>
	close: Thunk<[string, unknown?], unknown>
	clear: Thunk
	layer: React.RefObject<HTMLDivElement | null>
}
