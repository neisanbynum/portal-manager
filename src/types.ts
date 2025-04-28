import type { Thunk } from "@neisanworks/types-react"

export type PortalComponent<TProperties = unknown> = {
	id: string
	component: React.FC<TProperties>
	props?: TProperties
}

export type PortalManagerValues = {
	portals: Array<PortalComponent>
	open: Thunk<[PortalComponent]>
	close: Thunk<[string, unknown?], unknown>
	clear: Thunk
	layer: React.RefObject<HTMLDivElement | null>
}