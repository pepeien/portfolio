import React from 'react';

// Enums
import { EAppTabs } from '../enums';

export interface AppTab {
	isActive: boolean;
	component: React.ReactNode;
}

export type AppTabList = {
	[key in EAppTabs]: AppTab;
};
