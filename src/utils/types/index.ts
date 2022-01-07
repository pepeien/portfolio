/**
 * @description A method that return a React component.
 */
export type ComponentGetter = () => React.ReactNode;

/**
 * @description A common prop that both accepts a standalone React component
 * or a method that must be run in other to retrieve a React component.
 */
export type ComponentAsProp = React.ReactNode | ComponentGetter;

/**
 * @description A common component onclick event handler type.
 */
export type ComponentClickEvent = (event: React.MouseEvent) => void;
