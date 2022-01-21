export interface Redirector {
	title: string;
	path: string;
	isActive?: boolean;
	willRedirectOutside?: boolean;
}
