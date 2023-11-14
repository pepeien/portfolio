export interface Redirector {
    title: string;
    target: string;
    isActive?: boolean;
    isComponentDriven?: boolean;
    willRedirectOutside?: boolean;
}
