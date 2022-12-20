import React from 'react';

// Enums
import { EAppTabs } from '../enums';

export interface AppTab {
	name: string;
	isActive: boolean;
	component: React.ReactNode;
}

export interface AppTabProps {
	previousIndex: number;
	index: number;
	isActive: boolean;
}

export type AppTabList = {
	[key in EAppTabs]: AppTab;
};
