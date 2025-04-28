import React from 'react';
import type { PortalManagerValues } from './types';
import { type HTMLProperties, type Thunk } from '@neisanworks/types-react';
export declare const PortalContext: React.Context<PortalManagerValues | null>;
export declare const PortalManager: React.FC<Pick<HTMLProperties<HTMLDivElement>, 'children' | 'className'>>;
export declare const usePortalManager: Thunk<[], PortalManagerValues>;
